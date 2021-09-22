var express = require('express');
var router = express.Router();
var UserController = require('../Controllers/User');
var jwt=require('jsonwebtoken');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post("/",async function(req, res, next) {
  const {username,password}=req.body;
  const check =await UserController.login(username,password)
  if(check){
    const access_token=jwt.sign({id:1,name:'DVAT'},process.env.JWT_SECRET_KEY)
    req.session.access_token=access_token
    res.redirect("/Home")
  }
else{
  res.redirect('/')
}
});
router.get('/logout', function(req, res, next) {
  res.redirect('/')
});
module.exports = router;
