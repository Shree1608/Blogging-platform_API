const mongoose = require('mongoose');

const Category = require('../models/category');
const Blog = require('../models/blog');

// exports.AddCategory = (req , res,next)=>{
//     const category = new Category({
//         _id : new mongoose.Types.ObjectId(),
//         categoryName : req.body.categoryName
//     });
//     category
//     .save()
    
//     .then(result =>{
//         console.log(result);
//         res.status(201).json({
//             message : 'created category successfully',
//             CreatedCategory : {
//                 _id : result._id,
//                 categoryName : result.categoryName 
//             }
//         })
//     })
//     .catch(err =>{
//         console.log(err);
//         res.status(500).json({
//             error : err
//         });
//     });
// }

exports.AddCategory = (req , res ,next)=>{
    const doc = { categoryName } = req.body
    Category.find({categoryName :doc.categoryName})
    .exec()
    .then(result =>{
        if(result.length >=1){
            res.status(409).json({
                message : "already exits"
            })
        }else{
            const category = new Category({
                _id : new mongoose.Types.ObjectId(),
                categoryName : doc.categoryName
            });
            category.save()
            .then(result =>{
                console.log(result);
                res.status(200).json({
                    message : 'Category created successfully',
                    createdCategory : {
                        _id : result._id,
                        categoryName : result.categoryName
                    }
            })
        
         })
        }
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error : err
        });
    });       
}
exports.getAllCategory = (req,res, next)=>{
    Category.find()
    .exec()
    .then(docs =>{
        res.status(200).json({
            count : docs.length ,
            categoryName : docs.map(doc =>{
                return{
                    _id : doc._id,
                    categoryName : doc.categoryName
                }
            })
        });
    })
    .catch(err =>{
        res.status(500).json({
            error : err
        })
    });
}
exports.UpdateCategory = (req ,res ,next)=>{
    const id = req.params.categoryId
    
    Category.findByIdAndUpdate(id ,{$set :req.body})
    .then( result =>{
        res.status(200).json({
            message : "updated" ,
            request : {
                type : 'GET' ,
                url : 'http://localhost:8000'+id
            }
        })
        
    }).catch(err => res.status(500).json({error : err}))
 }
 exports.DeleteCategory = (req ,res ,next)=>{
    const id = req.params.categoryId
    
    Category.findByIdAndDelete({_id : id})
   
    .then( result =>{
        if (result) {
            res.status(200).json({
                message : "deleted" ,
                request : {
                    type : 'POST' ,
                    url : 'http://localhost:8000'+id
                }
            })    
        }else{
            res.status(404).json({
                message : "already deleted"
            })
        }
    }).catch(err => res.status(500).json({error : err}))
 }