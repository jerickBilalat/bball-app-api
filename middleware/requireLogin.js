const jwt = require('jwt-simple')
const config = require('config')


module.exports = function auth(req, res, next) {
  const token = req.get('x-auth-token')
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.decode(token, config.get('jwtSecret'));
    req.user = decoded;
    next();
  }
  catch (ex) {
    console.log(ex)
    res.status(400).send('Invalid token.');
  }
}