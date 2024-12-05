const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const adminLoginSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});




module.exports = mongoose.model('Admin', adminLoginSchema)