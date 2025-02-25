const express = require('express');
const { registerConsumer, loginConsumer } = require('../controllers/consumerController');

const router = express.Router();

//only for the consumer side routes of the application
router.post('/signup', registerConsumer);
router.post('/login', loginConsumer);

module.exports = router;