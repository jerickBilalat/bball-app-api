const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const requireLogin = require('../middleware/requireLogin')
const PlayerModel = require('../models/playerModel')

// utils
const {
  calculateWinningPercentage,
  calculateTotalGamesPlayed,
  capitalize
} = require('./utils')

router.get('/', getAllPlayersHanlder)
router.post('/create_player',
  requireLogin,
  createPlayerHandler)


function getAllPlayersHanlder(req, res, next) {
  PlayerModel
    .find()
    .sort("name")
    .exec( (err, players) => {

      if(err) return next(err)

      const playerList = players.map( player => {
        return {
          _id: player._id,
          wins: player.wins,
          losses: player.losses,
          name: capitalize(player.name),
          winningPercentage: calculateWinningPercentage(player.wins, player.losses),
          gamesPlayed: calculateTotalGamesPlayed(player.wins, player.losses),
        }
      })
      res.send(playerList)
    })
}

function createPlayerHandler(req, res, next) {
  PlayerModel
    .create(req.body, (err, player) => {
      if(err) return next(err)
      res.send(player)
    })
}

module.exports = router;