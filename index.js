const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const app = express();

mongoose.connect('mongodb://localhost:27017/bball_app_dev',{useNewUrlParser: true})

app.get('/', (req, res) => {
  res.send('hello world')
})


const PORT = process.env.PORT || 9000
app.listen(PORT, () => { 
  console.log(`App running at port ${PORT}`)
})