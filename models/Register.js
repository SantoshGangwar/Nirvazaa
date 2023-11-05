const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  image: String,
  phoneNumber: String,
});

const Register = mongoose.model('Register', registerSchema);
module.exports = Register; 
