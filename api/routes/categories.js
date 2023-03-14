const express = require("express");
const router = require('express').Router();
const checkAuth = require('../middleware/check-auth');

const CategoryController = require("../controllers/category");

router.post('/', CategoryController.AddCategory);

router.get('/',CategoryController.getAllCategory);

router.patch('/:categoryId' ,CategoryController.UpdateCategory);

router.delete('/:categoryId',CategoryController.DeleteCategory);

module.exports = router;