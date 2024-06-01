const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors')

connectToMongo();
const app = express()
// 5000 isliye kiya kyuki 3000 pr react chalegi to abhi iss problem ko solve krke chalo
const port = 5000

const corsOptions = {
  origin: 'https://i-notebook-client.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // enable credentials (cookies, authorization headers, etc.)
};

//routes ko esse bhi call kar sakte hai but diikat kya hogi yadi sabhi ko index.js mei daal denge to bahut saari files ho jayegi or fir kabhi error sahi krte samay bahut dikkat hogi isliye hm alag se route ka folder bana k rakhte hai 
// app.get('/', (req, res) => {
//   res.send('Hello Chiranshu!')
// })

// yeh api ko client side mei fetch krne k liye use hoti hai
app.use(cors())
// yadi mujhe req.body ko use karna hai  app.use(express.json()) likhna padeag
app.use(express.json())

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})
