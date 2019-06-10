const jwt = require('jwt-simple')
const router = require('express').Router()

const User = require('../models/userModel')
const authenticateLocalLogin = require('../middleware/authenticateLocalLogin');

// todo put secret in the env
const secret = "pinoybball2019"


router.post('/signin',
  authenticateLocalLogin,
  signInHandler )

router.post('/signup', signUpHandler)














function signInHandler(req, res, next) {
  const {name, _id} = req.user,
        token = generateToken(req.user)
  res.send({user: {name, _id}, token })
}

function signUpHandler(req, res, next) {
  const {name, password} = req.body
  // todo validation or sanitize input
  User.findOne({name}, (err, existingUser) => {

    if(err) return next(err)
    if(existingUser) return res.status(422).send({error: "Player name is alraedy in use"})
    
    // todo player sync with existing player record
    // if(Player.findOne({name}, (err, player) => {...}))

    const user = new User({
      name,
      password
    })

    user.save(err => {
      if(err) return next(err)
      res.json({user: {name: user.name, _id: user._id}, token: generateToken(user)})
    })

  })
}

function generateToken(user) {
  const timestamp = new Date().getTime()
  if(user.admin) {
    const oneDay = timestamp + 86400000
    return jwt.encode({ sub: user._id, iat: timestamp, admin: true, exp: oneDay }, secret)
  }
  
  return jwt.encode({ sub: user._id, iat: timestamp}, secret)
}

module.exports = router