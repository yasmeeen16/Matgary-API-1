//Create http server
var express = require('express');

var server = express();
var mongoose = require('mongoose');
require('dotenv').config();
//var bcrypt = require('bcrypt');
var expressValidator = require('express-validator');
server.use(expressValidator());
var path = require("path");
//database connection
const CONNECTION_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Matgary';
mongoose.promise = global.promise;
mongoose.connect(CONNECTION_URI
  ,{ useNewUrlParser: true }
);

const PORT = process.env.PORT || 8090 ;
server.set('views', path.join(__dirname, 'views'));
server.set("view engine","ejs");
server.set("views","./views");
server.use(express.static(path.join(__dirname, 'public')));

var RouteCategory = require('./controller/category');
server.use('/category',RouteCategory);
require('./Model/Category');
server.use("/",RouteCategory);

var RouteProduct = require('./controller/product');
server.use('/product',RouteProduct);
require('./Model/product');

var RoutesubCategory = require('./controller/subCategory');
server.use('/subcategory',RoutesubCategory);
require('./Model/subCategory');

server.listen(PORT,function(){
  console.log('server listen at port number '+PORT);
});
