const mongoose = require('mongoose')
const Schema = mongoose.Schema

const playerSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: 1,
    minlength: 2
  },
  wins: {
    type: Number,
    required: true
  },
  losses: {
    type: Number,
    required: true 
  }
})
// todo delete?
// playerSchema.virtual('winningPercentage').get(() => {
//   const totalGamesPlayed = this.wins + this.losses
//   return this.wins !== 0 ? Number.parseFloat(this.wins * 100 / totalGamesPlayed).toFixed(2): "0.00";
// })

// playerSchema.virtual('gamesPlayed').get(() => {
//   return this.wins + this.losses
// })

const PlayerModel = mongoose.model( 'Player', playerSchema)

module.exports = PlayerModel