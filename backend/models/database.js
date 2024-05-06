const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
	wincount : Number
})
const leaderSchema = new Schema({
    game_id: String,
	rank : Number,
	game_mode : String,
	winner  : String,
	player   : String,
	wincount : Number
})
const GameSchema = new Schema({
    game_id : String,		
	rank :     Number,
	game_mode : String,
	winner : String,
	player : String,
	wincount : Number
})
const Game_modeSchema = new Schema({
    game_id : String ,  	
	mode3x3	: Number,
	mode4x4	: Number,
	with_ai	: Number,
	with_player : Number
})

const User = mongoose.model('profiles', UserSchema);
const Leader = mongoose.model('leaderboard', leaderSchema);
const Game = mongoose.model('game',GameSchema );
const Game_mode = mongoose.model('game_mode',Game_modeSchema );
module.exports = User, Leader, Game, Game_mode;