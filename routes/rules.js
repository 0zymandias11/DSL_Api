const express = require('express');
const { createRules, getRules, updateRules, deleteRules, getUser } = require('../controller/rulesController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, createRules);

router.get('/', auth, getRules);

router.get('/user', auth, getUser);


router.put('/:id', auth, updateRules);

router.delete('/:id', auth, deleteRules);

module.exports = router;
