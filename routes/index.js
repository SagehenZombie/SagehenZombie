var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('user',{winner:req.query.winner});
});

router.get('/polygon', function(req, res, next) {
  res.render('polygon');
});

module.exports = router;
