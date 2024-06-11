const connectToMongo = require('./db')
const express = require('express')


connectToMongo();


const app = express()
const port = 5000

app.use(express.json())    // to use req.body use this middleware


// Available routes we'll link routes here
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))



// app.use('/api/auth', require('./routes/auth')) means that any requests to /api/auth will be handled by the routes defined in ./routes/auth.

app.get('/', (req, res) => {
  res.send("hello")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})