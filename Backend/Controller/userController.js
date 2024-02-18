const sendVerificationMail = require("../Utils/sendEmail");
const User = require("../models/userSchema");
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered", success: false });
        };
        const newUser = new User({ name, email, password });
        newUser.verificationToken = '12345';
        await newUser.save();
        await sendVerificationMail(email, newUser.verificationToken);
        return res.status(200).json({ message: "User successfully registered", success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    };
};

const verifyToken = async (req, res) => {
    try {
        const token = req.params.token;
        const user = await User.findOne({ verificationToken: token });
        if (!user) {
            return res.status(404).json({ message: "Invalid token", success: false });
        };
        user.verified = true;
        await user.save();
        return res.status(200).json({ message: "Email verified successfully", success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    };
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        };
        if (user.password != password) {
            return res.status(404).json({ message: "Invalid Password", success: false });
        };
        const token = jwt.sign({ userId: user._id }, 'aklsdjflakdsjfl');
        return res.status(200).json({ message: "User logged in successfully", success: true, token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    };
};

const getAllUsers = async (req, res) => {
    try {
        const loggedInUserId = req.params.userId;
        await User.find({
            _id: {
                $ne: loggedInUserId,
            }
        }).then((users) => {
            return res.status(200).json({ message: "Retrieving users in application", users, success: true });
        }).catch((error) => {
            console.log(error);
            return res.status(500).json({ message: "Error in retrieving users", success: false });
        });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: "Internal Server Error", success: false });
    };
};

const followUser = async (req, res) => {
    try {
        const { currentUserId, selectedUserId } = req.body;
        await User.findByIdAndUpdate(selectedUserId, {
            $push: { followers: currentUserId },
        });
        return res.status({ message: "Followed User", success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    };
};

const unfollowUser = async (req, res) => {
    try {
        const { loggedInUserId, targetUserId } = req.body;
        await User.findByIdAndUpdate(targetUserId, {
            $pull: {
                followers: loggedInUserId,
            },
        });
        return res.status(200).json({ message: "Unfollowed User", success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    };
};

const getUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        };
        return res.status(200).json({ message: "Retrieving details of users", user, success: false });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    };
};

module.exports = { registerUser, verifyToken, loginUser, getAllUsers, followUser, unfollowUser, getUser };