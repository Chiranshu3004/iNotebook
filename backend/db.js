const mongoose = require('mongoose');
const mongoURI= "mongodb+srv://agarwalchiranshu2003:8WQ8C9iTeDOaWBgr@cluster0.kskn6qf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectToMongo = ()=>{
    // ab yaha pe mongoURI se mongoDB se connect karenge
    // ab mongoose.connect mei call back use nhi kr sakte isliye hamne then and catch use kiya hai
    mongoose.connect(mongoURI)
    .then(()=>{
        console.log("Connected to Mongo Successfully");
    })
    .catch((err)=>{
        console.log(err);
    })
}

module.exports = connectToMongo;