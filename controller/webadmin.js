var express = require('express');
var Router = express.Router();
var BodyParser = require('body-parser');
var expressValidato = require('express-validator');
var BodyParserMid = BodyParser.urlencoded();//middle ware to get data from request body
const path = require('path');
const fs = require("fs");
var mongoose = require("mongoose");

require("../Model/Category");

var categoryDataModel = mongoose.model("Category");
var   subCategoryModel= mongoose.model("subCategory")
require("../Model/product");
var productModel = mongoose.model("product");

var multer = require("multer");//to upload file
var uploadMid = multer({dest:"./public/imgs"});

Router.get('/addCategory',function(req,resp,next){
  //resp.json({msg:"add"});
  resp.render("content/addcatt.ejs");
});
var categoryModel = mongoose.model("Category");
Router.get('/',function(req,resp,next){

  categoryModel.find({}, function(err, categories) {
    //console.log(categories[0].img);
    resp.render("content/cat.ejs",{  categories:  categories});
                    //resp.render("content/listCat.ejs",{  categories:  categories});
                    //resp.json({  categories:  categories});
                });


});
Router.post('/addCategory',[BodyParserMid,uploadMid.single('img')],function(req,resp,next){
//resp.json(req.file);
//   var Ename = req.body.Ename;
//   var Aname = req.body.Aname;
   var img = req.file;
// //resp.json(req.file)
  if(!img){
    resp.json({msg:"upload your img "})
  }else{
  req.checkBody('Ename','english name is empty').notEmpty();
  req.checkBody('Aname','arabic name is empty').notEmpty();

  let errors = req.validationErrors();
  if(errors){
    resp.json(errors);
  }else{


                ext=img.originalname;
                ext2=ext.split('.');
                console.log(img.path);
                console.log(img.destination);
                // // console.log(img.destination+"/"+img.filename+'.'+ext2[1]);
                // // var NewPath = img.destination+"/"+img.filename+'.'+ext2[1];
                fs.renameSync(req.file.path,path.join(req.file.destination,req.file.filename+"."+ext2[1]  ));
                console.log(img.path);
                // resp.json(req.file);
                img = req.file.filename+'.'+ext2[1];
                console.log(img);

      categoryDataModel.find({Ename:req.body.Ename ,Aname:req.body.Aname}, function(err, category) {
                            if(category.length > 0){
                              resp.json({ msg : "duplicate category" });
                            }else{
                              var myCategory = new categoryDataModel({
                                Ename:req.body.Ename,
                                Aname: req.body.Aname,
                                img:img,
                                time:new Date()
                              });
                              myCategory.save(function(err,doc){
                                if(err){
                                  resp.json(err);
                              }else{
                                  console.log("saved")
                                  resp.json(doc);
                              }
                              });
                            }
                          });
                  }
                }
});

Router.get('/allCategory',function(req,resp,next){

    categoryModel.find({}, function(err, categories) {
                      //resp.render("content/listCat.ejs",{  categories:  categories});
                      resp.json({  categories:  categories});
                  });

});
/////////////////////////////////My Project////////////////////////////////////////
//all sub categories bage
Router.get('/ListOfsubCategory',function(req,resp,next){

 //console.log(catId);
 categoryDataModel.find({},function(err, categories) {
    subCategoryModel.find({}, function(err, subcategories) {

                    resp.render("content/subcat.ejs",{categories:categories,subcategories: subcategories});
                  });
})
});

// bage sub categories for spacific category.....
Router.get('/allsubCategory/:catId',function(req,resp,next){

 //console.log(catId);
 categoryDataModel.find({},function(err, categories) {
    subCategoryModel.find({catId:req.params.catId}, function(err, subcategories) {
                    //resp.json({  subcategories: subcategories});
                    resp.render("content/subcat2.ejs",{subcategories: subcategories,categories:categories});
                  });
                })

});
//list all products
Router.get('/allproducts',function(req,resp,next){

 //console.log(catId);
    productModel.find({}, function(err, products) {
                    //resp.json({  products: products});
                      resp.render("content/table.ejs",{products:products});
                  });

});
module.exports=Router;
