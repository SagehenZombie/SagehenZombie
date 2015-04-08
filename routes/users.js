var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('user');
});
router.post('/',function(req,res){
  res.cookie('name',req.body.name);
  res.cookie('avatar',req.body.avatar);
  res.redirect(303,'/')
})
module.exports = router;
