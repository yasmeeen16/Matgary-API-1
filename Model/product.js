var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var product = new Schema ({
  _id: { type: Schema.ObjectId, auto: true },
  Ename:String,
  Aname:String,
  modelnumber:String,
  brandArabic:String,
  brandEnglish:String,
  offer:{
    Aname:{type:String,default:0},
    Ename:{type:String,default:0},
    img:{type:String,default:0}

  },
  imgs:[String],
  price1:String,
  price2:String,
  catId:{
         type:Schema.ObjectId,
         ref:"Category"
     },
  subcatId:{
            type:Schema.ObjectId,
            ref:"subCategory"
        },

  discount:String,
  discriptionEnglish:String,
  discriptionArabic:String,
  tagsArabic:[String],
  tagsEnglish:[String],
  freeshipping:Number,
  heighlightEnglish:String,
  heighlightArabic:String,
  specificationEnglish:String,
  specificationArabic:String,
  quantity:Number,
  sellingquantity:Number,
  status:Number,
  time:{
    type:Date,
    Default:Date.now()
  }

});

mongoose.model("product",product);
