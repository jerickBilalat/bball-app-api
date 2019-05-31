const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gameSchema = new Schema({
  winners: Array,
  losers: Array
}, {timestamps: true}
)

const Game = mongoose.model('Game', gameSchema)

module.exports = Game