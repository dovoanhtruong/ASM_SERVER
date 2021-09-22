var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config()
var session = require('express-session');
const mongoose=require('mongoose');
require('./models/userModel')
require('./models/classifyModels')
require('./models/productModels')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var classifyRouter = require('./routes/classify');
var homeRouter = require('./routes/Home');
var productRouter = require('./routes/Product');
var productAPIRouter = require('./routes/Product_api');

var app = express();
mongoose.connect(process.env.MONGODB, {useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log('>>> DB connected'))
.catch((err)=> console.log('DB error',err))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

var hbs=require('hbs')
hbs.registerHelper('soSanh',function(a,b,t){
  return a.toString()== b.toString();
})
hbs.registerHelper('formatDate',function(a,t){
  let date =new Date(a)
  let month = date.getMonth() +1
  let year =date.getFullYear()
  month =month.toString().length == 1 ? '0' + month:month
  let day = date.getDate().toString.length==1 ? '0' + date.getDate().toString():  date.getDate().toString()
  return day + '/' + month + '/' +year
})

hbs.registerHelper('formatDate1',function(a,t){
  let date =new Date(a)
  let month = date.getMonth() +1
  let year =date.getFullYear()
  month =month.toString().length == 1 ? '0' + month:month
  let day = date.getDate().toString.length==1 ? date.getDate().toString():  date.getDate().toString()
  return year + '-' + month + '-' + day
})

hbs.registerHelper('soThuTu',function(v,t){
  return v + 1
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.JWT_SECRET_KEY,
  resave: true,
  saveUninitialized:true,
  cookie:{secure:false}
}));

app.use('/', indexRouter);
app.use('/users', usersRouter)
app.use('/Classify', classifyRouter);
app.use('/Home', homeRouter);
app.use('/Product', productRouter);
app.use('/api', productAPIRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
