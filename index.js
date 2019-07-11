const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

if(config.util.getEnv('NODE_CONFIG_ENV') === "development") {
  const morgan = require('morgan')
}

const config = require('config')
const app = express();




// routes
const PlayerRoutes = require("./routes/playerRoutes")
const GameRoutes = require("./routes/gameRoutes")
const AuthRoutes = require('./routes/authRoutes')

mongoose.connect(config.get('dbURI'),{useNewUrlParser: true}).then( () => {
  console.log(`Connected to ${config.get('dbURI')}`)
}).catch( error => {
  console.error('Cannot connect to database', error)
  process.exit(1)
})

// passport service
require('./services/passport')

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json({type: '*/*'}));

if(config.util.getEnv('NODE_CONFIG_ENV') === "development") {
  app.use(morgan('tiny'))
}


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
  if(config.util.getEnv('NODE_CONFIG_ENV') === "development") {
    console.log(`App running in ${config.util.getEnv('NODE_CONFIG_ENV')} at port ${PORT}, connecting to ${config.get('dbURI')}`)
  }
})