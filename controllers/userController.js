const Users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userCtrl = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            const user = await Users.findOne({ email })
            if (user) return res.status(400).json({ msg: "This email already exists" });

            if (password.length < 6)
                return res.status(400).json({ msg: "password must be at least 6 characters" });

            const passwordHash = await bcrypt.hash(password, 10);
            const newUser = new Users({
                name, email, password: passwordHash
            })
            await newUser.save();
            const accessToken = createAccessToken({ id: newUser._id });
            const refreshToken = createRefreshToken({ id: newUser._id });
            // result cookies
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                path: '/user/refresh_token',
            })

            return res.json({ msg: "Register success" });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    login: async (req, res) => {
        try {
            const {email, password} = req.body;

            const user = await Users.findOne({ email})
            if(!user) return res.status(400).json({msg: "User does not exist!"})

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: "Incorrect password"});

            return res.json({msg: "Login successful"});
            
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    refreshToken: async (req, res) => {
        try {
            const rf_token = await req.cookies.refreshToken;
            if (!rf_token) return res.status(400).json({ msg: "Please login or register" });

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) return res.status(400).json({ msg: "Login or register now" });
                const accessToken = createAccessToken({ id: user.id })
                //result json
                return res.json({accessToken})
            })

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }

    }
}
const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
}

const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}

module.exports = userCtrl;