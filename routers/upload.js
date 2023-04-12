const router = require('express').Router();
const cloudinary = require('cloudinary');

const auth = require('../middlewares/auth');
const authAdmin = require('../middlewares/authAdmin');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET_KEY
})

router.post('/upload', (req, res) => {
    try {
        console.log(req.files)
        res.json("checking upload")
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
})

module.exports = router;