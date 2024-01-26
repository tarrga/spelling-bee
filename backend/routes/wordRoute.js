const express = require('express');
const router = express.Router();
const { gameStart, postWord } = require('../controllers/wordController');

router.get('/', gameStart);
router.post('/', postWord);

module.exports = router;
