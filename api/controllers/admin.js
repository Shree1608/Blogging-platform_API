const mongoose = require('mongoose');
const dotenv= require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Admin = require('../models/admin');



exports.admin_signup = (req ,res,next ) =>{
    Admin.find({email : req.body.email})
    .exec()
    .then(admin =>{
      if (admin.length>=1) {
          return res.status(409).json({
              message: "user exixtes"
          });
      }else{
          bcrypt.hash(req.body.password , 10,(err , hash)=>{
              if (err){
                  return res.status(500).json({
                      error : err
                  });
              }else{
                  const admin =new Admin({
                      _id : new mongoose.Types.ObjectId(),
                      email : req.body.email,
                      password : hash,
                      token : " "
                     });
                  admin
                  .save()
                  .then(result =>{
                      res.status(201).json({
                          message : 'User created'
                      });
                  }).catch(err =>{
                      console.log(err);
                      res.status(500).json({
                          error : err
                      });
                  });   
              }
          })
         
      }
    })
}
exports.get_all_admin = (req,res,next)=>{
    Admin.find()
    .exec()
    .then(docs =>{
        const response = {
            count : docs.length 
        };
        res.status(200).json(docs);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
             error : err
        })
    })
}

exports.admin_login =(req ,res ,next)=>{
    Admin.find({ email:req.body.email})
    .exec()
    .then(admin =>{
        if(admin.length<1){
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
        bcrypt.compare(req.body.password , admin[0].password ,(err ,result)=>{
            if (err) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            if(result){
                const token = jwt.sign(
                    {
                      email:admin[0].email ,
                      adminId:admin[0]._id 
                    },
                   process.env.JWT_KEY,           
                    ); 
                    Admin.findOneAndUpdate({_id : admin[0]._id},{$set : {token : token}})
                    .exec()  
                return res.status(200).json({
                    message : "Auth successful",
                    token : token
                });
            }
            res.status(401).json({
                message: 'Auth failed'
            })
        })
    })
}

exports.Logout = (req , res , next) =>{
    const admin = req.adminData.adminId 
    Admin.findByIdAndUpdate (admin ,{$set : {token : null}})
    .exec()
    .then(res.status(200).json({
        message : "user logout"
    })).catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        })
    })
}


