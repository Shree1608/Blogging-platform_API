const express = require("express");
const router = require('express').Router();
const checkAuth = require('../middleware/check-auth');

const AdminController = require("../controllers/admin");

router.post("/signup" , AdminController.admin_signup);

router.post('/login' ,AdminController.admin_login);

router.get('/' ,AdminController.get_all_admin);

router.post('/logout' ,checkAuth ,AdminController.Logout)

module.exports = router;