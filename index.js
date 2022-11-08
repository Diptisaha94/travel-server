const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;
// middle wares
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://travel:AdminTul@cluster0.yyxrk8i.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
      const database = client.db("tour");
      const serviceCollection = database.collection("services");
      // Query for a movie that has the title 'The Room'
      app.get('/service',async(req,res)=>{
        const query = {};
      const cursor = serviceCollection.find(query);
    const services = await cursor.limit(3).toArray();
    res.send(services);
      });
      app.get('/services',async(req,res)=>{
        const query = {};
      const cursor = serviceCollection.find(query);
    const services = await cursor.toArray();
    res.send(services);
      });
      app.get('/services/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const service = await serviceCollection.findOne(query);
        res.send(service);
    });
    } finally {
    
    }
  }
  run().catch((err)=>{
    console.log(err);
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })