const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const GameModel = require('../models/gameModel')
const PlayerModel = require('../models/playerModel')

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
  const {winners, losers} = req.body

  // update player stats
  winners.forEach( playerId => {
    PlayerModel
      .findByIdAndUpdate(playerId, { $inc: {wins: 1} })
      .exec((err) => {
        if(err) return next(err);
      })
  });

  losers.forEach( playerId => {
    PlayerModel
      .findByIdAndUpdate(playerId, { $inc: {losses: 1} })
      .exec((err) => {
        if(err) return next(err);
      })
  })
  
  // create game
  GameModel
    .create(req.body, (err, game) => {
      if(err) return next(err)
      res.send(game)
    })
}

module.exports = router;