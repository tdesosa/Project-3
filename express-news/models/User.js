const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  profilePic: String,
  news: [],
});


module.exports = mongoose.model('User', UserSchema);