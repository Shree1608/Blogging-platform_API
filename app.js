const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv= require('dotenv').config();

const categoryRoute = require('./api/routes/categories');
const adminRoute = require('./api/routes/admin');
const blogRoute = require('./api/routes/blogs');
const UserRoute  = require('./api/routes/users');

mongoose.set('strictQuery' , false)
mongoose.connect("mongodb://bhagyashreec:G5xdLxWpR0Dy9L9x0159@15.206.7.200:28017/bhagyashreec?authMechanism=DEFAULT&authSource=admin");
mongoose.Promise = global.Promise

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



app.get('/' , (req ,res , next) =>{

    res.status(200).json({
        mesage : 'get request to /categories',
      
    }) ;
});
 app.use('/categories',categoryRoute);
 app.use('/admin' , adminRoute);
 app.use('/blogs',blogRoute);
 app.use('/user', UserRoute );


module.exports = app ; 