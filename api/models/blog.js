const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const slugs = require('mongoose-slug-updater')

mongoose.plugin(slug)
mongoose.plugin(slugs)


const blogSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId ,
    title : {
        type : String ,
        required : true
    },
    slug :{
      type : String ,
      slug : "title"
     },
   description : {
        type : String ,
        required : true
   },
   category :{
        type :mongoose.Schema.Types.ObjectId , 
        ref : 'Category' 
   },
   
   createdBy : {
         type : String 
   },
   createdAt : {
      type : Date ,
      
      
   },
   updatedAt : {
      type : Date ,
      
   },
   updatedBy : {
      type: String,
     
   },
   deletedAt :{
      type : Date ,
      
      
   },
   deletedBy :{
      type : String,
      
   },
   blogImage : {
    type : String ,
    required : true
   },
  
   isDeleted : { type : Boolean, default: false},
},
   { versionKey : false})

   module.exports = mongoose.model('Blog' , blogSchema);