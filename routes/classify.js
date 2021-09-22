var express = require('express')
var router = express.Router();
var ClassifyControllers = require('../Controllers/Classify')
// const authenication=require('../Middle/authenication')

router.get('/',async function(req, res, next) {
    const Classify=await ClassifyControllers.get()
    res.render('Classify', { Classify: Classify });
  });
  router.get('/Home', function(req, res, next) {
    res.redirect('/Home')
  });
  router.get('/Product', function(req, res, next) {
    res.redirect('/Product')
  });



  router.get("/edit/:id",async function(req, res, next) {
    const{params:{id}}=req
    const EditClassify=await ClassifyControllers.getOne(id)
    res.render('EditClassify', { Classify: EditClassify });
  });

  router.delete("/delete/:Id",async function(req, res, next) {
const{
  params:{Id},
}=req;
await ClassifyControllers.delete(Id)
res.json({result:true})
  });

  router.post("/update/:id",async function(req, res, next) {
    let {params,body}=req
    await ClassifyControllers.update(params,body)
    res.redirect('/Classify')
   });
   router.post("/insert", function(req, res, next) {
    let {body}=req
    ClassifyControllers.insert(body)
    res.redirect('/Classify')
   });
  module.exports = router;

