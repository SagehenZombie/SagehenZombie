var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.cookies.name);
  if(!req.cookies.name){
    res.redirect('users');
  }
  else {
    res.render('play');
  }
});

router.get('/polygon', function(req, res, next) {
  res.render('polygon');
});

module.exports = router;
