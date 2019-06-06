const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const app = express();

// routes
const PlayerRoutes = require("./routes/playerRoutes")
const GameRoutes = require("./routes/gameRoutes")
const AuthRoutes = require('./routes/authRoutes')

mongoose.connect('mongodb://localhost:27017/bball_app_dev',{useNewUrlParser: true})

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(morgan('tiny'));

// routes
app.use('/api/auth', AuthRoutes)
app.use('/api/players', PlayerRoutes)
app.use('/api/games', GameRoutes)

// default route
app.get('/', (req, res) => {
  res.send('hello world')
})


const PORT = process.env.PORT || 9000
app.listen(PORT, () => { 
  console.log(`App running at port ${PORT}`)
})