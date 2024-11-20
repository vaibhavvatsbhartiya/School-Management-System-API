const mongoose = require('mongoose');
require('dotenv').config();

 
const uri = process.env.MONGO_URI

const connectToDatabase = async () =>{
    try{
        await mongoose.connect(uri);
        console.log('Connected to MongoDB Atlas');
    }catch(err){
        console.log(`MongoDB Error: ${err}`);
    }
}

module.exports = connectToDatabase;