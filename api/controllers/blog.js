const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const slugs = require('mongoose-slug-updater')

mongoose.plugin(slug)
mongoose.plugin(slugs)

const Blog = require('../models/blog');


exports.All_Blogs = (req,res,next)=>{
    
    const date = new Date();
    Blog.find({isDeleted : false})
    .populate( "category")
    .exec()
    
    .then(docs =>{
        const response = {
            count : docs.length ,
            blogs : docs.map(doc =>{
                return{
                    _id : doc._id ,
                    title : doc.title,
                    slug: doc.slug,
                    category : doc.category,
                    description : doc.description,
                    blogImage : doc.blogImage,
                    createdBy :doc.createdBy,
                    createdAt : Date()

                }
            })
        };
        res.status(200).json(response);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
             error : err
        })
    })
}



exports.Add_New_Blog = (req,res,next) =>{
    const admin_id = req.adminData.adminId;
    console.log(req.adminData.adminId)
    console.log(req.file);
    const date = new Date();
    let data = { title, category, description, blogImage } = req.body;
    Blog.find({title : data.title})
    
    .exec()
    .then(result => {
        if(result.length >= 1){
            res.status(404).json({
                message : 'Blog title is already exist'
            });
        } else {
            const blog = new Blog({
                _id: new mongoose.Types.ObjectId(),
                title : data.title,
                slug : data.slug,
                category : data.category,
                description : data.description,
                blogImage : req.file.path,
                createdBy :admin_id,
                createdAt : Date()

            });
            blog.save()
            .then(result => {
                console.log(result);
                res.status(200).json({
                    message : 'Created blog successfully',
                    createdBlog : {
                        _id : result._id,
                        title : result.title,
                        category : result.category,
                        description : result.description,
                        blogImage : result.blogImage,
                        created_by : admin_id,
                        createdAt : Date(),
                       
                      
                        request: {
                            type : "GET",
                            url : 'http://localhost:8000/blogs/' + result._id
                        }
                    }
                });
            })
            .catch(err =>{
                console.log(err);
                res.status(500).json({
                    error : err
                });
            });
        }
    })
}

exports.get_blogbyId = (req,res,next) =>{
    const id = req.params.blogId;
    Blog.findById(id)
    .exec()
    .then(doc =>{
        if(doc.isDeleted == false){
            res.status(200).json({
                Blog : doc ,
            });
        }else{
            res.status(404).json({messge : "no record found"})
        }
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error:err});
})
}

exports.delete_blog =(req ,res,next) =>{
    const admin_id = req.adminData.adminId ;
    const id = req.params.blogId;
    
    Blog.findByIdAndUpdate({_id :id},{ deletedBy : admin_id,deletedAt :new Date(),isDeleted:true})

    .exec()
    .then(result =>{
        if(result.isDeleted ==true ){
            res.status(410).json({
                message : "it's already deleted" ,
           })
        }
        else{
            res.status(200).json({message : "deleted" ,
               id : result._id ,
               title : result.title ,
               deletedBy :admin_id ,
               deletedAt : new Date(),
               isDeleted : true
        })
        }    
        }).catch(err =>{
        console.log(err);
        res.status(500).json({error:err});
})
}
exports.Update_blog = (req ,res ,next)=>{
    const admin_id = req.adminData.adminId ;
    const id = req.params.blogId
    const data = req.body;
    data.updatedBy = admin_id;
    data.updatedAt = new Date();
    Blog.findOne({ _id : id}).exec()
    .then(result1 =>{
        if(result1.isDeleted == true){
            res.status(420).json({
                message :"id not found"
            })
        }
        else{
            
    Blog.find({title : data.title , isDeleted:false}).exec()
    .then( result1 => {
        if(result1.length >= 1 ){
            res.status(409).json({
                message : 'Blog title is already updated'
                
            });
        } else {
            delete data.isDeleted
            Blog.findByIdAndUpdate(id ,{$set :data})
            .then( result => {
                res.status(200).json({
                message: 'Blog updated successfully',
                updatedBy : admin_id,
                updatedAt : new Date(),
                
        });
    }).catch(err => res.status(500).json({error : err}))
}
 })
        }
    })



}