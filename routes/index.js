var express = require('express');
var router = express.Router();
// mongod --dbpath=data --bind_ip 127.0.0.1
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
