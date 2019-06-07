const jwt = require('jwt-simple')


module.exports = function auth(req, res, next) {
  const token = req.get('x-auth-token')
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.decode(token, 'pinoybball2019');
    req.user = decoded;
    next();
  }
  catch (ex) {
    console.log(ex)
    res.status(400).send('Invalid token.');
  }
}