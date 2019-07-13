const router = require('express').Router();
const tweetBank = require('../tweetBank');


router.post('/', function(req, res) {
  tweetBank.add(req.body.name, req.body.text);
  res.redirect('/');
});


module.exports = router;
