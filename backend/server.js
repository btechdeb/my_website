const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const port = 3000;

// MongoDB connection URL and database name
const url = 'mongodb://localhost:27017';
const dbName = 'my_website';
const collectionName = 'columns';

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Fetch data from MongoDB and render it
app.get('/', async (req, res) => {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log("Connected to database");

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const data = await collection.find({}).toArray();

        res.render('index', { data: data });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error connecting to the database");
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
