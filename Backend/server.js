const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDatabase = require('./config/connectDB');
const userRoutes = require('./Routes/userRoutes');
const postRoutes = require('./Routes/postRoutes');

connectDatabase();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

app.listen(8080, (req, res) => {
    console.log(`Server is running on PORT 8080`);
});