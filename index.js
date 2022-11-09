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
      const reviewCollection = database.collection("reviews");
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
    app.post('/services/:id',async (req, res)=>{
      const review=req.body;
      const rev=await reviewCollection.insertOne(review);
      console.log(rev);
    });
    app.get('/reviews',async (req, res)=>{
      const query={};
      const cursor=reviewCollection.find(query);
      const reviews=await cursor.toArray();
      res.send(reviews);
    });
    
    app.get('/myreviews/:id',async (req, res)=>{
      const id = req.params.id;
      const query={_id:ObjectId(id)};
      const cursor=reviewCollection.findOne(query);
      const reviewone=await cursor;
      res.send(reviewone);
    });
    app.put('/update/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const user = req.body;
      const option = {upsert: true};
      const updatedReview = {
          $set: {
              text: user.text
              
          }
      }
      const result = await reviewCollection.updateOne(query, updatedReview, option);
      res.send(result);
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