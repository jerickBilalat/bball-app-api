const jwt = require('jwt-simple')
const User = require('../models/userModel')
const router = require('express').Router()
const passport = require('passport')
const passportService = require('../services/passport')

// todo put secret in the env
const secret = "pinoybball#2019"

const requireSignIn = passport.authenticate('local', {session: false})

router.post('/signin', requireSignIn, signIn )
router.post('/signup', signUp)

function signIn(req, res, next) {
  res.send({token: generateToken(req.user)})
}

function signUp(req, res, next) {
  const {name, password} = req.body
  // todo validation
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
      res.json({token: generateToken(user)})
    })

  })
}

function generateToken(user) {
  const timestamp = new Date().getTime()
  const expirationForOneDay = timestamp + 86400000 
  return jwt.encode({ sub: user.id, iat: timestamp, admin: true, exp: expirationForOneDay }, secret);
}

module.exports = router