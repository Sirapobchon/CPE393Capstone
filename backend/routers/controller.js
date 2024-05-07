const {User, Leader, Game, Game_mode} = require('../models/database');
//const Leader = require('../models/database');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

function genrateToken(body) {
    const {_id, firstname, lastname, username, email} = body;
    //const { player, wincount} = body2;
    return jwt.sign({_id, firstname, lastname, username, email}, process.env.secretJWT, {
        expiresIn: "1d",
    })
}

module.exports = { 
    userRegister:(req, res) => {
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
        const { username } = req.query; // Extract the username from the query parameters
        User.findOne({ username }) // Find the user by username
          .then((user) => {
            if (!user) {
              return res.status(404).json({ success: 0, message: 'User not found' });
            }
            return res.json({ success: 1, user });
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
            return res.status(500).json({ success: 0, message: 'Failed to fetch user data' });
          });
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
    },
    userLeaderboard:(req, res) => {
        User.find()
        .then((User) => {
            const transformedLeader = User.map((User) => {
                return { username: User.username, winCount: User.wincount }
            })
            return res.json({
                success: 1,
                Leader: transformedLeader
            })
        })
    },
    putLeaderboard: (req, res) => {
        const { username } = req.body; // Assuming the email is sent in the request body
        User.findOneAndUpdate(
          { email : username }, // Find the user by email
          { $inc: { wincount: 1 } }, // Increment the winCount by 1
          { new: true } // Return the updated document
        )
          .then((updatedUser) => {
            if (!updatedUser) {
              return res.status(404).json({ success: 0, message: 'User not found' });
            }
            return res.json({ success: 1, message: 'Win count incremented successfully', updatedUser });
          })
          .catch((error) => {
            console.error('Error updating win count:', error);
            return res.status(500).json({ success: 0, message: 'Failed to update win count' });
          });
      },
      
    userEdit:(req, res) => {
        const body = req.body;
        User.updateOne({ _id: body._id }, {
            $set: {
                username: body.username,
                email: body.email
            }
        }).then(() => {
            return res.json({
                success: 1,
            })
        })
    }
}
