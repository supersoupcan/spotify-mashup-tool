const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const config = require('./config');

const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;

const auth = require('./routes/auth');
const api = require('./routes/api');

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended : true}));
server.use(express.static(path.resolve(__dirname, 'static')));

server.use(session({
  secret : "welcome to the new you",
  resave : true,
  saveUninitialized : true
}));

server.use(passport.initialize());
server.use(passport.session());

passport.use(new SpotifyStrategy({
  clientID : config.SPOTIFY_CLIENT_ID,
  clientSecret : config.SPOTIFY_CLIENT_SECRET,
  callbackURL : config.BASE_URL + '/auth/spotify/callback',
}, function(accessToken, refreshToken, expires_in, profile, done){
  return done(null, { accessToken, profile });
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

server.use('/auth', auth(passport));
server.use('/api', api);

module.exports = server;