const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gameSchema = new Schema({
  winners: [{
    type: Schema.Types.ObjectId,
    ref: 'Player'
  }],
  losers: [{
    type: Schema.Types.ObjectId,
    ref: 'Player'
  }],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, {timestamps: true}
)

const GameModel = mongoose.model('Game', gameSchema)

module.exports = GameModel