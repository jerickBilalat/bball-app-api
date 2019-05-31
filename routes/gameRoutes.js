const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const GameModel = require('../models/gameModel')

router.get('/', getAllGames)
router.post('/create_game', createGame)

function getAllGames(req, res, next) {
  GameModel
    .find()
    .sort("updatedAt")
    .exec( (err, games) => {
      if(err) return next(err)
      res.send(games)
    })
}

function createGame(req, res, next) {
  GameModel
    .create(req.body, (err, game) => {
      if(err) return next(err)
      res.send(game)
    })
}

module.exports = router;