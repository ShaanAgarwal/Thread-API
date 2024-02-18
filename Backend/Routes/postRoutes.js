const express = require('express');
const { createPost, likePost, unlikePost, getAllPosts } = require('../Controller/postController');
const router = express.Router();

router.post('/create-post', createPost);
router.put('/posts/:postId/:userId/like', likePost);
router.put('/posts/:postId/:userId/unlike', unlikePost);
router.get('/get-posts', getAllPosts);

module.exports = router;