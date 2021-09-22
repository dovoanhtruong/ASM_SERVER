var express = require('express')
var router = express.Router();
var ProductControllers = require('../Controllers/Product')
var ClassifyControllers = require('../Controllers/Classify')
var UserController = require('../Controllers/User');
var jwt=require('jsonwebtoken');
const socketAPI = require('../SocketIO/socket_api')
// var upload=require('../Middle/upload')
const client = require('twilio')(process.env.ACCOUNT_SID3, process.env.AUTH_TOKEN3)


router.post("/login",async function(req, res, next) {
  const {username,password}=req.body;
  const user =await UserController.login(username,password)
  if(user){
    const access_token=jwt.sign(user,process.env.JWT_SECRET_KEY)
    req.session.access_token=access_token
    // res.redirect("/product")
     res.status(200).json({status: true});
  }
else{
  // res.redirect("/")
   res.status(401).json({status: false});
}
});

//REGISter
router.post("/register",async function(req,res,next){
  const {username,password,password_confirmation}=req.body;
  const user=await UserController.register(username,password,password_confirmation);
  if(user){
    res.status(200).json({status: true,user});
  }else{
    res.status(404).json({status:false,user});
  }
});

router.get('/Product', async function(req, res, next) {
    const Product=await ProductControllers.get()
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.json({ danhSach: Product });
});

router.post("/insert",async function(req, res, next) {
  let {body}=req
  await ProductControllers.insert(body)
  socketAPI.sendNofication('Add Product')
  res.json({result:true});
 });

 router.get("/delete/:id",async function(req, res, next) {
  const{
    params:{id},
  }=req;
  console.log(id)
  await ProductControllers.delete(id)
  socketAPI.sendNofication('Delete Product')
  res.json({result:true})
    });

    router.post("/update/:id",async function(req, res, next) {
      let {params,body}=req
      
      await ProductControllers.update(params,body)
      socketAPI.sendNofication('Update Product')
      
     });

  router.get("/Product/:id",async function(req, res, next) {
    const{params:{id}}=req
    const Product=await ProductControllers.getOne(id)
    const Classify=await ClassifyControllers.get();
    res.json(Product);
  });

  router.get("/socket",async function(req, res, next) {
    const {msg} = req.body
    socketAPI.sendNofication(msg)
res.status(200).json({status: true});
  });
  router.get("/socket_view",async function(req, res, next) {
  res.render('socket')
  });

  router.post('/test',async function(req, res, next) {

    let {body}=req
    console.log(body)
    if (body.phonenumber) {
      await
      client
      .verify
      .services(process.env.SERVICE_ID3)
      .verifications
      .create({
          to: `+${body.phonenumber}`,
          channel: req.query.channel==='call' ? 'call' : 'sms' 
      })
      .then(data => {
        res.status(200).json({status: true});
          // res.status(200).send({
          //     message: "Verification is sent!!",
          //     phonenumber: body.phonenumber,
          //     data
          // })
      }) 
   } else {
    await
   res.status(400).json({status: false});
      // res.status(400).send({
      //     message: "Wrong phone number :(",
      //     phonenumber: body.phonenumber,
      //     data
      // })
   }
  });
  router.get('/verity', function(req, res, next) {
    if (req.query.phonenumber && (req.query.code).length === 4) {
      client
          .verify
          .services(process.env.SERVICE_ID3)
          .verificationChecks
          .create({
              to: `+${req.query.phonenumber}`,
              code: req.query.code
          })
          .then(data => {
              if (data.status === "approved") {
                  res.status(200).json({
                    status:true,
                      message: "User is Verified!!",
                      data
                  })
              }
          })
  } else {
      res.status(400).json({
          status:false,
          message: "Wrong phone number or code :(",
          phonenumber: req.query.phonenumber,
          data
      })
  }
  });
module.exports = router;