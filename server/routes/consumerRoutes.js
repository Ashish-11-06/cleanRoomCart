const express = require('express');
const { registerConsumer, loginConsumer, getConsumers, getConsumerProfile } = require('../controllers/consumerController');
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router();

router.post('/signup', registerConsumer);
router.post('/login', loginConsumer);
router.get('/list', getConsumers); 
// router.get('/me', authMiddleware, getConsumerProfile); 


module.exports = router;


