module.exports = function(passport){
  const router = require('express').Router();
  
  router.get('', (req, res) => {
    let data = {};
    if(req.session.hasOwnProperty('passport')){
      data.authenticated = true;
      data.expiration = req.session.cookie._expires;
      data.profile = req.session.passport.user.profile;
    }else{
      data.authenticated = false;
    }
    res.json(data);
  });
  
  router.get(
    '/spotify',
    passport.authenticate('spotify')
  );
  router.get(
    '/spotify/callback',
    passport.authenticate('spotify', { failureRedirect: '/' }),
    (req, res) => {
      //set session to expire along with spotify oauth token
      req.session.cookie.expires = new Date(Date.now() + 3600000);
      console.log(req.session.passport.user.accessToken);
      res.redirect('/'); 
    }
  );
  
  return router;
};