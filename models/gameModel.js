const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gameSchema = new Schema({
  winners: [{
    type: Schema.Types.ObjectId
  }],
  losers: [{
    type: Schema.Types.ObjectId
  }]
}, {timestamps: true}
)

const GameModel = mongoose.model('Game', gameSchema)

module.exports = GameModel