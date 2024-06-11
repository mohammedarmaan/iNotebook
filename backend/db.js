
// Import mongoose

const mongoose = require('mongoose')

const mongoURI = "mongodb+srv://armaan0243:test123@cluster0.rlf0pkw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectToMongo = () => {
    mongoose.connect(mongoURI)
    .then(() => {
        console.log('connected to mongo')
    })
}

module.exports = connectToMongo;

