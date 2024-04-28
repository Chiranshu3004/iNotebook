const mongoose = require('mongoose');
const mongoURI= "mongodb://localhost:27017/inotebook"

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