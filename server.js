require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');

const userRouter = require('./routers/userRouter');
const categoryRouter = require('./routers/categoryRouter');
const uploadRouter = require('./routers/upload');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(fileUpload({
    useTempFiles: true,
}))

app.use('/user', userRouter)
app.use('/api', categoryRouter)
app.use('/api', uploadRouter);


// kết nối đến mongodb  
const URI = process.env.MONGODB_URL;

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(result => {
    console.log("Connected to MongoDB");
}).catch(err => {
    if (err) throw err;
})

app.get('/', (req, res) => {
    res.json({ msg: 'Welcome to the ecommerce website!! ' })
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('Server listening on port', PORT);
})
