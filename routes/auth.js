const express = require('express');
const{registerUser, loginUser, loadLogin, loadRegister, logoutUser} = require('../controller/registerUser');
const router = express.Router();


router.get('/register', loadRegister);
router.post('/register', registerUser);
router.get('/login', loadLogin);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
module.exports = router;