const express = require('express');
const router = express.Router();
const authController = require('../controller/logoutController');

router.get('/' , authController.handleLogout);

module.exports = router;