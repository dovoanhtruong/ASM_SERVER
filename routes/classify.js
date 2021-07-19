var express = require('express')
var router = express.Router();
var ClassifyControllers = require('../Controllers/Classify')
// const authenication=require('../Middle/authenication')

router.get('/', function(req, res, next) {
    const Classify=ClassifyControllers.get()
    res.render('Classify', { Classify: Classify });
  });

  // router.get('/edit/:id', function(req, res, next) {
  //   const{params:{id}}=req  
  //   const Classify=ClassifyControllers.getOne(id);
  //   res.render('Classify', { Classify: Classify });
  // });

  router.get("/edit/:Id", function(req, res, next) {
    const{params:{Id}}=req
    const EditClassify=ClassifyControllers.getOne(Id)
    res.render('EditClassify', { Classify: EditClassify });
  });
  module.exports = router;

