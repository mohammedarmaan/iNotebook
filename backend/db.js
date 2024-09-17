
// Import mongoose
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env
const mongoose = require('mongoose')

// const mongoURI = 
const connectToMongo = () => {
    mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected to mongo')
    })
}

module.exports = connectToMongo;

