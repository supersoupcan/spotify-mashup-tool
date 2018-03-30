const router = require('express').Router();
const axios = require('axios');

const testData = require('../testData');

router.get('/search*', (req, res) => {
  axios.request({
    url : 'https://api.spotify.com/v1/search',
    headers : {
      'Authorization' : 'Bearer ' + req.session.passport.user.accessToken
    },
    params : req.query
  })
  .catch(err => {
    if (err) throw err;
  })
  .then(spotifyRes => {
    res.json(spotifyRes.data);
  });


/*
  res.json({
    artists : testData.artists
  });
*/
  
});

router.get('/artist/:id/albums', (req, res) => {
  axios.request({
    url : 'https://api.spotify.com/v1/artists/' + req.params.id + '/albums',
    headers : {
      'Authorization' : 'Bearer ' + req.session.passport.user.accessToken
    },
    params : req.query
  }).catch(err => {
    if(err) throw err;
  }).then(spotifyRes => {
    res.json(spotifyRes.data);
  });
});

router.get('/albums', (req, res) => {
  axios.request({
    url : 'https://api.spotify.com/v1/albums',
    headers : {
      'Authorization' : 'Bearer ' + req.session.passport.user.accessToken
    },
    params : req.query
  })
  .catch(err => {
    if (err) throw err;
  })
  .then(spotifyRes => {
    res.json(spotifyRes.data);
  });
});

router.get('/audio-features', (req, res) => {
  axios.request({
    url : 'https://api.spotify.com/v1/audio-features',
    params : req.query,
    headers : {
      'Authorization' : 'Bearer ' + req.session.passport.user.accessToken
    },
  })
  .catch(err => {
    if(err) throw err;
  })
  .then(spotifyRes => {
    res.json(spotifyRes.data);
  });
});

module.exports = router;



//Search for Artist -> Retrive Artist ID
//Get all of Artists Albums
//Get IDS for all tracks on all ARTISTS Albums
//Make track info requests for each track (1 call per 100);