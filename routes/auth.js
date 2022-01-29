const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

router.post('/' , authController.handleLogin);

router.get('/' , authController.getdata);

module.exports = router;