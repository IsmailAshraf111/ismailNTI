const User = require('../models/adminLoginModel');
const auth = require('../config/auth');
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 1); 

  const myUser = await User.create({ username, password: hashedPassword });

  res.status(201).json({ message: 'User created successfully', myUser });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const myUser = await User.findOne({ username });
  if (!myUser) {
    return res.status(400).send('User not found');
  }
console.log(password)
console.log(myUser.password)
  const isMatch = await bcrypt.compare(password, myUser.password)//auth.compare(password, myUser.password);
  console.log(isMatch);
  if (!isMatch) {
    return res.status(400).send('Incorrect password');
  }

  const tokenObject = { username: myUser.username, userType: 'admin' };
  const token = auth.createToken(tokenObject);

  res.status(200).json({ message: 'Login successful', token });
};

exports.getUsers = async (req, res) => {
  const myUsers = await User.find();
  res.status(200).json(myUsers);
};
