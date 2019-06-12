const calculateWinningPercentage = (wins,losses) => {
  wins = Number.parseInt(wins);
  losses = Number.parseInt(losses);
  let totalGamesPlayed = wins + losses;
  return wins !== 0 ? Number.parseFloat(wins * 100 / totalGamesPlayed).toFixed(2): "0.00";
}

const calculateTotalGamesPlayed = (wins,losses) => {
  wins = Number.parseInt(wins);
  losses = Number.parseInt(losses);
  return (wins + losses).toFixed();
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {
  calculateWinningPercentage,
  calculateTotalGamesPlayed,
  capitalize
}