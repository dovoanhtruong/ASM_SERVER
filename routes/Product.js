var express = require('express')
var router = express.Router();
var ProductControllers = require('../Controllers/Product')
var ClassifyControllers = require('../Controllers/Classify')
const socketAPI = require('../SocketIO/socket_api')
// var upload=require('../Middle/upload')

router.get('/', async function(req, res, next) {
    const Product=await ProductControllers.get()
    res.render('Product', { Product: Product });
    
  });
  router.get('/Home', function(req, res, next) {
    res.redirect('/Home')
  });
  router.get('/Classify', function(req, res, next) {
    res.redirect('/Classify')
  });


  router.get("/edit/:id",async function(req, res, next) {
    const{params:{id}}=req
    const EditProduct=await ProductControllers.getOne(id)
    const Classify=await ClassifyControllers.get();
    res.render('EditProduct', { Product: EditProduct ,Classify:Classify});
  });

  router.delete("/delete/:id",async function(req, res, next) {
    const{
      params:{id},
    }=req;
    await ProductControllers.delete(id)
    socketAPI.sendNofication('Delete Product')
    res.json({result:true})
      });

      router.post("/update/:id",async function(req, res, next) {
       let {params,body}=req
      //  if(file){
      //    let Image='http://192.168.1.5:3000/images/'+file.originalname
      //    body={...body,Image}
      //  }
      
       await ProductControllers.update(params,body)
       socketAPI.sendNofication('Update Product')
       res.redirect('/Product')
      });

      router.post("/insert",async function(req, res, next) {
        let {body}=req
        await ProductControllers.insert(body)
        socketAPI.sendNofication('Add Product')
        res.redirect('/Product')
       });
module.exports = router;