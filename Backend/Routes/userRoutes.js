const express = require('express');
const { registerUser, verifyToken, loginUser, getAllUsers, followUser, unfollowUser, getUser } = require('../Controller/userController');
const router = express.Router();

router.post('/register', registerUser);
router.get('/verify/:token', verifyToken);
router.post('/login', loginUser);
router.get('users/:userId', getAllUsers);
router.post('/follow', followUser);
router.post('/unfollow', unfollowUser);
router.get('/profile/:userId', getUser);

module.exports = router;