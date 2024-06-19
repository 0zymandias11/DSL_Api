require('dotenv').config()
const mongoose = require('mongoose');

const connectDB = (url) =>{
    mongoose.connect(url).then(()=>{
        console.log("Connected to DB !!")
    }).catch((err)=>{
        console.log(err);
    })
};

module.exports = connectDB;