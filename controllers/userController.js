const Users = require('../models/userModel');
const bcrypt = require('bcrypt');

const userCtrl = {
    register: async(req, res) => {
        try {
            const { name, email, password } = req.body;

            const user = await Users.findOne({ email })
            if (user) return res.status(400).json({ msg: "This email already exists" });
            
            if(password.length < 6) 
            return res.status(400).json({ msg: "password must be at least 6 characters" });
            
            const passwordHash = await bcrypt.hash(password,10);
            const newUser = new Users({
                name, email, password: passwordHash
            })
            await newUser.save();
            return res.json({ newUser });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = userCtrl;