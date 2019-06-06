const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const PlayerModel = require('../models/playerModel')

const passport = require('passport')
const passportService = require('../services/passport')
// passport middlewares
const requireAuth = passport.authenticate('jwt', { session: false });

router.get('/', getAllPlayers)
router.post('/create_player', requireAuth, createPlayer)

function getAllPlayers(req, res, next) {
  PlayerModel
    .find()
    .sort("name")
    .exec( (err, players) => {
      if(err) return next(err)
      res.send(players)
    })
}

function createPlayer(req, res, next) {
  PlayerModel
    .create(req.body, (err, player) => {
      if(err) return next(err)
      res.send(player)
    })
}

module.exports = router;