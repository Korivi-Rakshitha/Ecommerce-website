const express = require('express');
const { register, login, getProfile, updateProfile, googleLogin } = require('../controllers/authController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/google-login', googleLogin);
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);

module.exports = router;
