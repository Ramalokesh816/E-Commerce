const User = require("../models/User");
const bcrypt = require("bcryptjs");

/* REGISTER USER */

const registerUser = async (req, res) => {

  const { name, email, password } = req.body;

  try {

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    res.json({ message: "User registered successfully" });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};


/* LOGIN USER */

const loginUser = async (req, res) => {

  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = {
  registerUser,
  loginUser
};