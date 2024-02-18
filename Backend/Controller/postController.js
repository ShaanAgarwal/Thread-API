const Post = require('../models/postSchema');

const createPost = async (req, res) => {
    try {
        const { content, userId } = req.body;
        const newPostData = {
            user: userId,
        };
        if (content) {
            newPostData.content = content;
        };
        const newPost = new Post(newPostData);
        await newPost.save();
        return res.status(200).json({ message: "New Post saved successfully", success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    };
};

const likePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const userId = req.params.userId;
        const post = await Post.findById(postId).populate("user", "name");
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            {
                $addToSet: {
                    likes: userId,
                },
            },
            { new: true },
        );
        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found", success: false });
        };
        updatedPost.user = post.user;
        return res.status(200).json({ message: "Post successfully liked", updatedPost, success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    };
};

const unlikePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const userId = req.params.userId;
        const post = await Post.findById(postId).populate("user", "name");
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            {
                $pull: {
                    likes: userId,
                }
            },
            { new: true },
        );
        updatedPost.user = post.user;
        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found", success: false });
        };
        return res.status(200).json({ message: "Post successfully unliked", updatedPost, success: false });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    };
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("user", "name").sort({ createdAt: -1 });
        return res.status(200).json({ message: "Retrieving all posts", posts, success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    };
};

module.exports = { createPost, likePost, unlikePost, getAllPosts };