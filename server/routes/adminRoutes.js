const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin, getInterestedUsers } = require('../controllers/adminController');

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/interested-users', getInterestedUsers)

module.exports = router;