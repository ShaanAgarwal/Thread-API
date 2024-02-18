const mongoose = require('mongoose');

const connectDatabase = async () => {
    try {
        await mongoose.connect('mongodb+srv://agarwalshaan27:XAGYUH3Qo8yAhusA@cluster0.qahmdsu.mongodb.net/');
        console.log("Successfully connected to database");
    } catch (error) {
        console.log("Error connecting to database.");
        console.log(error);
    };
};

module.exports = connectDatabase;