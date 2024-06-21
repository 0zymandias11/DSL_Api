const express = require('express');
const{registerUser, loginUser, loadLogin, loadRegister, logoutUser} = require('../controller/registerUser');
const router = express.Router();
const auth = require('../middleware/auth');


router.get('/register', loadRegister);
router.post('/register', registerUser);
// router.post('/dashboard', auth, );
router.get('/login', loadLogin);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
module.exports = router;