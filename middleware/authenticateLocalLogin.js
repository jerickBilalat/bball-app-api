const UserCollection = require('../models/userModel')

module.exports = function (req, res, next) {
  const {name, password} = req.body
  // todo sanitize input
  UserCollection.findOne({name}, (err, user) => {
    if(err) return res.status(400).send(err)
    if(!user) return res.status(400).send({error: {message: "Invalid Name or Password"}})

    user.comparePassword( password, (err, isMatch) => {
      if(err) return res.status(400).send(err)
      if(!isMatch) return res.status(401).send({error: {message: "Invalid Password"}})
      req.user = user
      return next()
    })

  })
}