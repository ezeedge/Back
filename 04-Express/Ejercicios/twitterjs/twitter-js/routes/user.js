const router = require('express').Router();
const tweetBank = require('../tweetBank');

router.get('/', function(req, res) {
  res.send('entraste a la pagina de usuarios')
});

router.get('/:name', function(req, res) {
  const tweets = tweetBank.find(function(tweet) {
    return tweet.name === req.params.name;
  })
  res.render('index.html', { tweets, showForm: false })
});

module.exports = router;
