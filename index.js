const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000;
const app = express();

//middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.og5by.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const bikeCollection = client.db('bikerLabs').collection('bike')

        app.get('/bike', async (req, res) => {
            const query = {};
            const cursor = bikeCollection.find(query);
            const bikes = await cursor.toArray();
            res.send(bikes);
        })
    }
    finally {

    }

}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Bike is running');
})

app.listen(port, () => {
    console.log('listening on port', port);
})