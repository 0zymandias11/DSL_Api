const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const loadLogin = async(req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../views/login.html'));
    } catch(err) {
        console.log(err);
    }
}
const loginUser = async(req, res) => {
    const {email, password} = req.body;
    try {
        let user = await User.findOne({email: email});
        console.log(user);

        if(!user)
            res.status(400).json({msg: "Invalid Creds"});
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            res.status(400).json({msg: 'Wrong Password !'});
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, 
            process.env.JWT_SECRET,
            { expiresIn: 360000 },
            (err, token)=>{
                if(err) throw err;
                res.status(201).json({token: token});
            }
        );
    } catch(err) {
        console.log(err.message);
        res.json({msg: "Invalid Credentials"});
    }
}

const loadRegister = async(req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../views/register.html'));
    } catch(err) {
        console.log(err);
    }
}

const registerUser = async(req, res) => {

        const {name, email, password} = req.body;
        try{
            let user = await User.findOne({email: email}); 

            if(user)
                return res.status(400).json({msg: "User already Exists"});
            
            const salt = await bcrypt.genSalt(10);
            let hashed_password = await bcrypt.hash(password, salt);

            user = new User({
                name: name,
                email: email,
                password: hashed_password
            });

            await user.save();
            
            const payload = {
                user: {
                    id: user.id,
                }
            };

            jwt.sign(payload, process.env.JWT_SECRET,{expiresIn: 360000},
                (err, token)=>{
                    if(err) throw err;
                    res.status(200).json({token: token});
                }
            );

        }catch(err) {
            console.log(err);
            res.status(500).json({msg: 'Server error !'});
    }

}

const logoutUser = async(req, res)=>{
    try{
        res.status(201).redirect('/api/dsl_proj/login')
    }catch(err){
        console.log(err);
        res.status(500).send("server error !!");
    }
}

module.exports = {
    loginUser, 
    registerUser,
    loadLogin,
    loadRegister,
    logoutUser
};
