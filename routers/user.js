const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const auth = require('../middleware/auth.js');


router.post('/user/register', UserController.register);
router.post('/user/login', UserController.login);
router.get('/user/logout', auth, UserController.logout);



module.exports = router