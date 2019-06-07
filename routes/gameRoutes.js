const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const GameModel = require('../models/gameModel')
const PlayerModel = require('../models/playerModel')

const requireLogin = require('../middleware/requireLogin');

const passport = require('passport')


router.get('/', getAllGames)
router.post('/create_game',
  requireLogin,
  createGame)



  
function getAllGames(req, res, next) {
  GameModel
    .find()
    .sort("updatedAt")
    .exec( (err, games) => {
      if(err) return next(err)

      res.send({gameList: games, mostPlayedGameType: getMostPlayedGameType(games)})
    })
}

function getMostPlayedGameType(gamesCollection) {
  let gameTypes = [0,0,0]
  let mostPlayedGameType = 3

  gamesCollection.forEach( gameRecord => {
    switch (gameRecord.winners.length) {
      case 3:
        gameTypes[0] += 1
        break
      case 4:
        gameTypes[1] += 1
        break
      case 5:
        gameTypes[2] += 1
        break
      default:
        throw new Error("Team length must be 3,4,or 5")
    }
  })
  
  switch(gameTypes.lastIndexOf(Math.max(...gameTypes))) {
    case 0:
        mostPlayedGameType = 3
      break
    case 1:
        mostPlayedGameType = 4
      break
    case 2:
        mostPlayedGameType = 5
      break
    default:
      throw new Error("team types is not valid")
  }

  return mostPlayedGameType
}


function createGame(req, res, next) {
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