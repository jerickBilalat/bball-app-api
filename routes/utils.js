const calculateWinningPercentage = (wins,losses) => {
  wins = Number.parseInt(wins);
  losses = Number.parseInt(losses);
  let totalGamesPlayed = wins + losses;
  return wins !== 0 ? Number.parseFloat(wins * 100 / totalGamesPlayed).toFixed(2): "0.00";
}

const calculateTotalGamesPlayed = (wins,losses) => {
  wins = Number.parseInt(wins);
  losses = Number.parseInt(losses);
  return wins + losses;
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getMostPlayedGameType(gamesCollection) {
  let gameTypes = [0,0,0]
  let mostPlayedGameType = 3
  
  gamesCollection.forEach( gameRecord => {
    if(gameRecord.winners.length === 0) return mostPlayedGameType
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

module.exports = {
  calculateWinningPercentage,
  calculateTotalGamesPlayed,
  capitalize,
  getMostPlayedGameType
}