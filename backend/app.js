const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const axios = require('axios'); // Import axios
const { Parser } = require('json2csv');
const fs = require('fs');
const path = require('path')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
//
const uri = "mongodb+srv://reetuparnarc:qVoObJ12XWvIaCLE@cluster0.m47uqml.mongodb.net/my_website";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';

let db; // Declare db variable

async function run() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    db = client.db('my_website');
    const collection = db.collection('data_uml');
    const usersCollection = db.collection('users');

    // Fetch all items
    app.get('/items', async (req, res) => {
      try {
        const items = await collection.find().toArray();
        res.json(items);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

    // Fetch all data for report (admin access)
    app.get('/admin/genReport', async (req, res) => {
      try {
        const data = await collection.find().toArray();
        res.json(data); // Send data as JSON
      } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving data from MongoDB');
      }
    });

    // Add new field to the collection
    app.post('/addField', async (req, res) => {
      const { fieldName, fieldType } = req.body;
    
      if (!fieldName || !fieldType) {
        return res.status(400).json({ message: 'Field name and type are required' });
      }
    
      try {
        // Update query to add new field with default value
        const updateQuery = { $set: { [fieldName]: getDefaultValue(fieldType) } };
    
        // Update all documents in the collection with the new field
        await collection.updateMany({}, updateQuery);
    
        // Log the activity
        const activityLog = {
          timestamp: new Date(),
          operation: 'Add Field',
          fieldName,
          fieldType,
        };
    
        const logResult = await db.collection('activity_logs').insertOne(activityLog);
        console.log('Activity logged:', logResult);
    
        res.status(200).json({ message: 'Field added successfully', success: true });
      } catch (error) {
        console.error('Error adding field to DB:', error);
        res.status(500).json({ message: 'Server error', error });
      }
    });

    const getDefaultValue = (fieldType) => {
      switch (fieldType) {
        case 'String':
          return '';
        case 'Number':
          return 0;
        case 'Boolean':
          return false;
        default:
          return null;
      }
    };

    // Update an asset by ID
    // Update an asset by ID
app.put('/edit_asset/:id', async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    // Fetch the old data before updating
    const oldData = await collection.findOne({ _id: new ObjectId(id) });

    if (!oldData) {
      return res.status(404).json({ message: 'Asset not found' });
    }

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Asset not found' });
    }

    // Log the activity
    const changes = Object.keys(updateData).reduce((acc, key) => {
      if (updateData[key] != oldData[key]) {
        acc[key] = { old: oldData[key], new: updateData[key] };
      }
      return acc;
    }, {});

    const logEntry = {
      timestamp: new Date(),
      operation: 'edit_asset',
      employeeName: updateData['Employee Name'] || 'Unknown Employee', // Adjust this based on your data structure
      changes,
    };

    await db.collection('activity_logs').insertOne(logEntry);

    res.json({ message: 'Asset updated successfully' });
  } catch (error) {
    console.error('Error updating asset:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

app.get('/activity_logs', async (req, res) => {
  try {
    const logs = await db.collection('activity_logs').find().toArray();
    res.json(logs);
  } catch (error) {
    console.error('Error fetching activity logs:', error);
    res.status(500).json({ message: 'Error fetching activity logs' });
  }
});


    // Fetch employee list
    app.get('/employee', async (req, res) => {
      try {
        const projection = {
          'Employee Name': 1,
          'PH_NO': 1,
          'Domain ID': 1,
          // Add other columns as needed
        };

        const data = await collection.find({}, { projection }).toArray();
        res.json(data);
      } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching data from the database");
      }
    });

    // Fetch asset details by ID
    app.get('/get_asset/:id', async (req, res) => {
      try {
        const item = await collection.findOne(
          { _id: new ObjectId(req.params.id) },
          {
            projection: {
              Make: 1,
              ITEMS: 1,
              'Model No': 1,
              'M/C Serial No': 1,
              Processor: 1,
              Speed: 1,
              RAM: 1,
              HDD: 1,
              SSD: 1,
              PORT: 1,
              Monitor: 1,
              'Mac Address': 1,
              'Operating System': 1,
              'OS Lic Key': 1,
              'MS Office/Libre Office': 1,
              'MS Office License No': 1,
              'Model Year': 1,
              'P O Number': 1,
              'Invoice No': 1,
              'Invoice Date': 1,
              'Invoice Amount': 1,
              'Supplier Name During Purchase': 1,
              'Warranty/AMC Expiry Date': 1,
              'If any AMC, Put Service Provider Name': 1,
              'AMC Period': 1,
              'AMC TYPE': 1,
              Remarks: 1,
            },
          }
        );
        if (!item) {
          return res.status(404).json({ error: 'Asset not found' });
        }
        res.json(item);
      } catch (err) {
        console.error('Error fetching asset details:', err);
        res.status(500).json({ error: 'Error fetching asset details' });
      }
    });

    // Add new asset


app.post('/add_asset', async (req, res) => {
  const newItem = req.body;

  if (!newItem['Employee Name']) {
    return res.status(400).json({ message: 'Employee Name is required' });
  }

  try {
    const result = await collection.insertOne(newItem);

    // Log the addition in activity_logs collection
    const logEntry = {
      timestamp: new Date(),
      operation: 'add_asset',
      employeeName: newItem['Employee Name'],
      changes: { ...newItem },
    };

    await db.collection('activity_logs').insertOne(logEntry);

    res.status(201).json({ message: 'Asset added successfully', id: result.insertedId });
  } catch (error) {
    console.error('Error adding new asset:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});



    // Delete an asset by ID
    app.delete('/delete_asset/:id', async (req, res) => {
      const { id } = req.params;
    
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
      }
    
      try {
        // Find the asset before deletion to log its data
        const asset = await collection.findOne({ _id: new ObjectId(id) });
    
        if (!asset) {
          return res.status(404).json({ message: 'Asset not found' });
        }
    
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
    
        if (result.deletedCount === 0) {
          return res.status(404).json({ message: 'Asset not found' });
        }
    
        // Log the deletion in activity_logs collection
        const logEntry = {
          timestamp: new Date(),
          operation: 'delete_asset',
          employeeName: req.body.employeeName, // Assumes employeeName is passed in the request body
          changes: { ...asset },
        };
    
        await db.collection('activity_logs').insertOne(logEntry);
    
        res.json({ message: 'Asset deleted successfully' });
      } catch (error) {
        console.error('Error deleting asset:', error);
        res.status(500).json({ message: 'Server error', error });
      }
    });

    // Fetch dashboard data
    app.get('/api/dashboard-data', async (req, res) => {
      try {
        if (!db) {
          return res.status(500).json({ message: 'Database not initialized' });
        }

        const collection = db.collection('data_uml');

        // Get total number of documents
        const totalAssets = await collection.countDocuments();

        // Get total assigned assets
        

        // Calculate total unassigned assets
        const totalUnassignedAssets = await collection.countDocuments({ Scraped: { $in: ["yes", "Yes"] }});

        const totalAssignedAssets = totalAssets - totalUnassignedAssets;


        // Assume you have a separate collection for employees
        const totalEmployees = await db.collection('data_uml').countDocuments();

        res.json({
          totalAssets,
          totalAssignedAssets,
          totalUnassignedAssets,
          totalEmployees
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ message: 'Server error' });
      }
    });

    // Fetch employee list for login purposes
    app.get('/emplist', async (req, res) => {
      try {
        const projection = {
          'Location Name': 1,
          'Plant': 1,
          'Asset No': 1,
          'Department': 1,
          'Employee Name': 1,
          'Domain ID': 1,
          'EMAIL ID': 1,
          'PH_NO': 1,
          'Make': 1,
          'ITEMS': 1,
          'Model No': 1,
          'M/C Serial No': 1,
          'Processor': 1,
          'Speed': 1,
          'RAM': 1,
          'HDD': 1,
          'Monitor': 1,
          'Mac Address': 1,
          'Operating System': 1,
          'MS Office/Libre Office': 1,
          'Invoice Date': 1,
          'Warranty/AMC Expiry Date': 1,
          'Role': 1,
          'pswd': 1
        };

        const data = await collection.find().toArray();

        res.json({ data: data });
      } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching data from the database");
      }
    });

    app.post('/deleteField', async (req, res) => {
      console.log('Request body:', req.body); // Log request body
      const { fields } = req.body;
    
      if (!fields || !Array.isArray(fields)) {
        return res.status(400).json({ message: 'Fields array is required' });
      }
    
      try {
        // Construct the update query to unset (delete) fields
        const updateQuery = fields.reduce((acc, fieldName) => {
          acc.$unset[fieldName] = "";
          return acc;
        }, { $unset: {} });
    
        // Update all documents in the collection to unset specified fields
        await collection.updateMany({}, updateQuery);
    
        // Log the activity of deleting fields
        const activityLog = {
          timestamp: new Date(),
          operation: 'Delete Field',
          fields, // Log the deleted fields
        };
    
        // Insert the activity log into the 'activity_logs' collection
        const logResult = await db.collection('activity_logs').insertOne(activityLog);
        console.log('Activity logged:', logResult);
    
        res.status(200).json({ message: 'Fields deleted successfully', success: true });
      } catch (error) {
        console.error('Error deleting fields from DB:', error);
        res.status(500).json({ message: 'Internal Server Error', error });
      }
    });
    

    // app.post('/change-password', async (req, res) => {
    //   const { employeeName, newPassword } = req.body;
    
    //   if (!employeeName || !newPassword) {
    //     return res.status(400).json({ message: 'Employee Name and New Password are required' });
    //   }
    
    //   try {
    //     const result = await collection.updateOne(
    //       { 'Employee Name': employeeName },
    //       { $set: { pswd: newPassword } }
    //     );
    
    //     if (result.matchedCount === 0) {
    //       return res.status(404).json({ message: 'Employee not found' });
    //     }
    
    //     res.json({ message: 'Password updated successfully' });
    //   } catch (error) {
    //     console.error('Error updating password:', error);
    //     res.status(500).json({ message: 'Server error', error });
    //   }
    // });
    app.post('/change-password', async (req, res) => {
      const { employeeName, currentPassword, newPassword } = req.body;
    
      if (!employeeName || !currentPassword || !newPassword) {
        return res.status(400).json({ message: 'Employee Name, Current Password, and New Password are required' });
      }
    
      try {
        const user = await collection.findOne({ 'Employee Name': employeeName });
        
        if (!user) {
          return res.status(404).json({ message: 'Employee not found' });
        }
    
        if (user.pswd !== currentPassword) {
          return res.status(401).json({ message: 'Current password is incorrect' });
        }
    
        const result = await collection.updateOne(
          { 'Employee Name': employeeName },
          { $set: { pswd: newPassword } }
        );
    
        if (result.matchedCount === 0) {
          return res.status(404).json({ message: 'Employee not found' });
        }
    
        res.json({ success: true, message: 'Password updated successfully' });
      } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ message: 'Server error', error });
      }
    });
    
    
    app.post('/add_asset', async (req, res) => {
      const newItem = req.body;

      if (!newItem['Employee Name']) {
        return res.status(400).json({ message: 'Employee Name is required' });
      }

      try {
        const result = await collection.insertOne(newItem);
        res.status(201).json({ message: 'Asset added successfully', id: result.insertedId });
      } catch (error) {
        console.error('Error adding new asset:', error);
        res.status(500).json({ message: 'Server error', error });
      }
    })

    let users = [];

    // Function to fetch users from /emplist endpoint
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:${PORT}/emplist`);
        users = response.data.data.map((user) => ({
          employeeName: user['Employee Name'],
          _id: user._id,
          locationName: user['Location Name'],
          plant: user['Plant'],
          department: user['Department'],
          domainID: user['Domain ID'],
          phNo: user['PH_NO'],
          role: user['Role'],
          pswd: user['pswd']
        }));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    // Fetch users when the server starts
    fetchUsers();

    app.post('/auth/login', async (req, res) => {
      const { username, password } = req.body;
    
      try {
        const user = await collection.findOne({ 'Employee Name': username, 'pswd': password });
    
        if (user) {
          res.json({ success: true, user });
        } else {
          res.json({ success: false });
        }
      } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error', error });
      }
    });
    app.post('/verify_user', async (req, res) => {
      const { employeeName, password } = req.body;
    
      try {
        const user = await collection.findOne({ 'Employee Name': employeeName, pswd: password });
        console.log(user);
        if (!user) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
    
        res.json({ isAdmin: user["Role"] === 'admin' });
      } catch (error) {
        console.error('Error verifying user:', error);
        res.status(500).json({ message: 'Server error', error });
      }
    });
    
    app.post('/change_roles', async (req, res) => {
      const { currentAdmin, newAdmin } = req.body;
    
      try {
        // Update current admin to user
        await collection.updateOne(
          { 'Employee Name': currentAdmin },
          { $set: { Role: 'user' } }
        );
    
        // Update new admin to admin
        await collection.updateOne(
          { 'Employee Name': newAdmin },
          { $set: { Role: 'admin' } }
        );
    
        res.json({ message: 'Roles changed successfully' });
      } catch (error) {
        console.error('Error changing roles:', error);
        res.status(501).json({ message: 'Server error', error });
      }
    });
    app.get('/download_csv', async (req, res) => {
      let client;
    
      try {
        client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        const database = client.db('my_website');
        const collection = database.collection('data_uml');
    
        const data = await collection.find().toArray();
        if (!data || data.length === 0) {
          return res.status(404).send('No data found');
        }
    
        const fields = Object.keys(data[0]).filter(field => field !== '_id' && field !== 'pswd');
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(data);
    
        res.setHeader('Content-disposition', 'attachment; filename=data_uml.csv');
        res.set('Content-Type', 'text/csv');
        res.status(200).send(csv);
      } catch (error) {
        console.error('Error generating CSV:', error);
        res.status(500).send('Error generating CSV');
      } finally {
        if (client) {
          client.close();
        }
      }
    });

  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
  
}



run().catch(console.dir);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});