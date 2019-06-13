const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const GameModel = require('../models/gameModel')
const PlayerModel = require('../models/playerModel')

const requireLogin = require('../middleware/requireLogin');

const passport = require('passport')

//utils
const {capitalize, getMostPlayedGameType} = require('./utils');


router.get('/', getAllGames)
router.post('/create_game',
  requireLogin,
  createGameHandler)



  
function getAllGames(req, res, next) {
  GameModel
    .find()
    .populate('winners')
    .populate('losers')
    .populate('createdBy')
    .populate('updatedBy')
    .sort("updatedAt")
    .exec( (err, games) => {
      if(err) return next(err)

      const gameList = games.map(gameItem => {
        let game = {}
        game._id = gameItem._id
        game.createdBy = capitalize(gameItem.createdBy.name)
        game.updatedBy = capitalize(gameItem.updatedBy.name)
        game.winners = gameItem.winners.map( player => capitalize(player.name))
        game.losers = gameItem.losers.map( player => capitalize(player.name))
        game.createdAt = gameItem.createdAt
        game.updatedAt = gameItem.updatedAt
        return game
      })

      res.send({gameList, mostPlayedGameType: getMostPlayedGameType(games)})
    })
}

function createGameHandler(req, res, next) {
  const {winners, losers} = req.body,
        {sub: creatorId, admin} = req.user
  
  if(!admin) return res.status(401).send({error: {message: "User is not an admin"}})
  console.log(req.user)
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
    .create({winners, losers, createdBy: creatorId, updatedBy: creatorId}, (err, game) => {
      if(err) return next(err)
      res.send(game)
    })
}

module.exports = router;