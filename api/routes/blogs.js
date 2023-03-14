const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

const blogController = require('../controllers/blog');

const storage = multer.diskStorage({
    destination: function(req ,file,cb){
        cb(null , './uploads/');
    },
    filename: function(req ,file,cb){
        cb(null , new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req , file , cb) =>{
    // reject a file

    if(file.mimetype === 'image/jpeg' ||  file.mimetype === 'image/png'){
        cb(null , true);
    }else{ 
        cb(null , false);
    }
};
const upload = multer({
    storage: storage,
    limits : {
    fileSize: 1024 * 1024 * 5
   },
   fileFilter : fileFilter
});

router.post('/',checkAuth,upload.single('blogImage'),blogController.Add_New_Blog) ;

router.get('/',blogController.All_Blogs);

router.get('/:blogId',blogController.get_blogbyId);

router.delete('/:blogId',checkAuth,blogController.delete_blog);

router.patch('/:blogId',checkAuth,blogController.Update_blog);
module.exports = router;