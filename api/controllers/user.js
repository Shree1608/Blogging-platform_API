
const { response } = require('express');
const Blog = require('../models/blog');

exports.SearchBytitle = (req,res,next) => {
    const regex = new RegExp(req.params.title , 'i' );
    const title = req.params.title
    Blog.find({title : regex, isDeleted:false}).exec()
    .then( result => {
        if(result.length >=1){
            res.status(200).json(result)
        }
        else{
            res.status(404).json({
                message:"blog not found"
            })
        }
        
    })

   
   
}
exports.Latest_Blog = (req,res,next) =>{
    Blog.find({isDeleted : false}).sort({createdAt : -1})
    .populate('category')
    .exec()
    .then( docs =>{
        res.status(200).json({
            count : docs.length ,
            blogs : docs.map(doc =>{
                return{
                    blog : doc
                }
            })
        })
    }).catch(err =>{
        res.status(500).json({
            error : err
        })
    })
}

exports.SearchByslug = (req,res ,next) =>{
    const slug = req.params.slug ;
    Blog.find({ slug : slug , isDeleted:false})
    .exec()
    .then( data => {
        if(data.length >= 1){
            res.status(200).json({data})
        }else{
            res.status(404).json({
                message:"not found"
            })
        }
        
    })
    .catch(err =>{
        res.status(500).json({
            error : err
        })
    })
}

exports.searchByquery = (req ,res ,next)=>{
    const title = req.query.title ;
    if(title){
        const regex = new RegExp(title , 'i');
        Blog.find({title : regex , isDeleted:false})
        .then(result =>{
            res.status(200).json(result)
        })
    }else{
       res.status(404).json({
        message: 'not found'
       })
    }
}


exports.getBlog = (req ,res , next)=>{
    const title = req.params.title;
    Blog.findOne({ title}).exec()
    .then(data => {
        if(data){
            res.status(200).json({data});
        }else{
            res.status(404).json({ 
                message : 'id not found'
            });
        }
    }).catch(err =>{
        res.status(500).json({
            error :err
        })
    })
}