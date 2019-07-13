const express = require('express')
const tweetBank = require('../tweetBank');
const userRoutes = require('./user');
const tweetsRoutes = require('./tweets');
const router = express.Router();


router.get('/', function(req, res) {
  res.render('index.html', { tweets: tweetBank.list(), showForm: true })
});

router.use('/users', userRoutes);
router.use('/tweets', tweetsRoutes);

module.exports = router;
