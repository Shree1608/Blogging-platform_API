const express = require("express");
const router = express.Router();
const mongoose = require('mongoose') ;



const UserController = require('../controllers/user');


router.get('/search/:title', UserController.SearchBytitle);

router.get('/query',UserController.searchByquery);

router.get('/blogs',UserController.Latest_Blog);

router.get('/:slug',UserController.SearchByslug);


module.exports = router;