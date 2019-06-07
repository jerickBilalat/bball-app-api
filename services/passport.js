const passport = require('passport');
const User = require('../models/userModel');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');


const secret = "pinoybball2019"


// Create local strategy
const localOptions = { usernameField: 'name' };
const localLogin = new LocalStrategy(localOptions, function(name, password, done) {
  console.log('local login')
  // Verify this name and password, call done with the user
  // if it is the correct name and password
  // otherwise, call done with false
  User.findOne({ name: name }, function(err, user) {

    if (err) { return done(err); }
    if (!user) { return done(null, false); }

    // compare passwords - is `password` equal to user.password?
    user.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false); }

      return done(null, user);
    });
  });
});

// todo jwt strategy currently not working
// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: secret
};

// Create JWT strategy
passport.use(new JwtStrategy(jwtOptions, function(jwt_payload, done) {
  console.log("hit jwt login route")
  User.findOne({id: jwt_payload.sub}, function(err, user) {
      if (err) {
        console.log(err)
          return done(err, false);
      }
      if (user) {
          return done(null, user);
      } else {
          return done(null, false);
          // or you could create a new account
      }
  });
}));

// Tell passport to use this strategy
passport.use(localLogin);