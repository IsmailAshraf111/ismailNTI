const User = require("../models/userModel");
const auth = require("../config/auth");
const bcrypt = require("bcrypt");

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, role = "user" } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    const hashedPassword = await auth.hashPassword(password);
    // const user = await User.create({ username, email, password: hashedPassword, role });

    const user = await User.create({ username, email, password: hashedPassword, role });

    const token = auth.createToken({
      userId: user._id,
      username: user.username,
      role: user.role,
    });

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }

  // const hashedPassword = await bcrypt.hash(password, 1);

  // const myUser = await User.create({ username, password: hashedPassword });

  // res.status(201).json({ message: 'User created successfully', myUser });
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send("User not found");
    }
    console.log(password);
    console.log(user.password);
    const isMatch = await auth.compare(password, user.password); //auth.compare(password, myUser.password);
    console.log(isMatch);
    if (!isMatch) {
      return res.status(400).send("Incorrect password");
    }
    const token = auth.createToken({
      userId: user._id,
      username: user.username,
      role: user.role,
    });

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
  // const tokenObject = { username: myUser.username, userType: 'admin' };
  // const token = auth.createToken(tokenObject);

  // res.status(200).json({ message: 'Login successful', token });
};

exports.getUsers = async (req, res) => {
  const myUsers = await User.find();
  res.status(200).json(myUsers);
};
