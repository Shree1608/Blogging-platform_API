const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

module.exports = async (req,res,next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const admin = await Admin.find({}).exec();
       
        if (token == admin [0],token){
            const decoded = jwt.verify(token , process.env.JWT_KEY)
            req.adminData = decoded; 
        }else{
            return res.status(401).json({
                message : 'token invalid'
            });
        }
        next();
    }catch(error){
        return res.status(401).json({
            message : 'Auth Failed'
        });
    }
}