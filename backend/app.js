const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./config/db');
const path = require('path');
const { ObjectId, MongoClient } = require('mongodb'); // Import MongoClient from mongodb
const cors = require('cors');
dotenv.config();
connectDB();


const app = express();
const url = 'mongodb://localhost:27017'; // Replace with your MongoDB URL
const dbName = 'my_website'; // Replace with your database name
const collectionName = 'uml_data'; // Replace with your collection name

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use(cors());
// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Route handling
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.get('/userDashboard', (req, res) => {
  res.render('userDashboard');
});

app.get('/adminDashboard', (req, res) => {
  res.render('adminDashboard');
});

app.get('/admin/addAsset', (req, res) => {
  res.render('addAsset'); // Render the page for adding asset
});

app.get('/admin/genReport', async (req, res) => {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const data = await collection.find({}).toArray();

    res.render('genReport', { data: data });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data from MongoDB');
  } finally {
    await client.close();
  }
});

app.post('/admin/addAsset', (req, res) => {
  const formData = req.body;
  const existingObjectID = req.body.existingObjectID;

  // Check if existingObjectID is provided
  if (!existingObjectID) {
    return res.status(400).send("Existing ObjectID is required");
  }

  // Check if existingObjectID is a valid hexadecimal string
  if (!ObjectId.isValid(existingObjectID)) {
    return res.status(400).send("Invalid ObjectID");
  }

  const collection = mongoose.connection.collection('columns');
  collection.updateOne(
    { _id: new ObjectId(existingObjectID) },
    { $push: { formData: formData } },
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error updating data in the database");
      } else {
        console.log("Form data added successfully to existing ObjectID:", existingObjectID);
        res.status(200).send("Form data added successfully!");
      }
    }
  );
});
// Display edit form
app.get('/edit_asset/:id', async (req, res) => {
    const client = new MongoClient(url);
    try {
        await client.connect();
        const db = client.db(dbName);
        const item = await db.collection('uml_data').findOne({ _id: new ObjectId(req.params.id) });
        if (!item) {
            return res.status(404).send('Asset not found');
        }
        res.render('edit', { item }); // Corrected variable name to 'item'
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving asset');
    } finally {
        await client.close();
    }
});
// Handle form submission
app.post('/update_asset/:id', async (req, res) => {
    const client = new MongoClient(url);
    try {
        await client.connect();
        const db = client.db(dbName);
        const updateData = req.body;
        await db.collection('uml_data').updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: updateData }
        );
        res.redirect('/admin/genReport'); // Redirect to the homepage or any other page after update
    } finally {
        await client.close();
    }
});

app.get('/emplist', async (req, res) => {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Specify the columns you want to include in the projection
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
    };


    const data = await collection.find({}, { projection }).toArray();
    console.log(data)
    res.json({ data: data})
    //res.render('emplist', { data: data });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching data from the database");
  } finally {
    await client.close();
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
