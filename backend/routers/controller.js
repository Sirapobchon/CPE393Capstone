const User = require('../models/database');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

function genrateToken(body) {
    const {_id, firstname, lastname, username, email} = body;
    return jwt.sign({_id, firstname, lastname, username, email}, process.env.secretJWT, {
        expiresIn: "1d",
    })
}

module.exports = { userRegister:(req, res) => {
    const body = req.body;
    body.password = bcrypt.hashSync(body.password, 10);
    User.findOne({ email: body.email}).then((user) => {
        if(user){
            return res.json({
                success: 0,
                message: "Email Already Exists"
            })
        }
        else{
            User.findOne({ username: body.username}).then((username) => {
                if(username){
                    return res.json({
                        success: 0,
                        message: "Username Already Exists"
                    })
                }
                else{
                    User.insertMany([body]).then((result) => {
                        return res.json({
                            success: 1,
                            users : result
                        })
                    })
                }
            })
        }
    })
},
getUsers: (req, res) => {
    User.find().then((users) => {
        return res.json({
            success: 1,
            users: users
        })
    })
},
userLogin:(req, res) => {
    const { email, password } = req.body;
    User.findOne({ email:email})
    .then((user) => {
        if(user){
            bcrypt.compare(password, user.password).then((match) =>{
                if(match){
                    const jsontoken = genrateToken(user);
                    return res.json({
                        success: 1,
                        token: jsontoken,
                        users: user,
                    })
                } else {
                    return res.json({
                        success: 0,
                        message: "Invalid Username or Password"
                    })
                }
            })
        } else {
            return res.json({
                success: 0,
                message: "Invalid Username or Password"
            })
        }
    })
    }
}