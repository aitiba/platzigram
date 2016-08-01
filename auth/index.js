var LocalStrategy = require('passport-local').Strategy;
var platzigram = require('platzigram-client');
var config = require('../config');

var client = platzigram.createClient(config.client);

exports.localStrategy = new LocalStrategy((username, password, done) => {
  console.log('local');
  client.auth(username, password, (err, token) => {
    if (err) {
      console.log("err1")
      return done(null, false, { message: 'username and password not found' });
    }

    client.getUser(username, (err, user) => {
      if (err) {
        console.log("err2")
        return done(null, false, { message: `an error ocurred: ${err.message}` })
      }

      user.token = token;
      return done(null, user);
    })
  })
})

exports.serializeUser = function (user, done) {
  console.log('se');
  done(null, {
    username: user.username,
    token: user.token
  });
}

exports.deserializeUser = function (user, done) {
  console.log('de');
  client.getUser(user.username, (err, usr) => {
    usr.token = user.token;
    done(err, usr);
  })
}