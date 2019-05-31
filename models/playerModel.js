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
    type: String,
    required: true
  },
  losses: {
    type: String,
    required: true 
  }
})

playerSchema.virtual('winningPercentage').get(() => {
  const wins = Number.parseInt(this.wins),
        losses = Number.parseInt(this.losses),
        totalGamesPlayed = wins + losses;
  return wins !== 0 ? Number.parseFloat(wins * 100 / totalGamesPlayed).toFixed(2): "0.00";
})

playerSchema.virtual('gamesPlayed').get(() => {
  const wins = Number.parseInt(this.wins),
        losses = Number.parseInt(this.losses);
  return (wins + losses).toFixed();
})

const PlayerModel = mongoose.model( 'Player', playerSchema)

module.exports = PlayerModel