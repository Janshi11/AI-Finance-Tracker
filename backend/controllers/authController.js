// backend/controllers/authController.js

const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER

const registerUser = async (req, res) => {

  try {

    const {
      firstName,
      lastName,
      phone,
      email,
      password
    } = req.body;

    // CHECK EXISTING USER

    const userExists = await User.findOne({ email });

    if (userExists) {

      return res.status(400).json({
        message: "User already exists"
      });

    }

    // HASH PASSWORD

    const hashedPassword =
      await bcrypt.hash(password, 10);

    // CREATE USER

    const user = await User.create({

      firstName,
      lastName,
      phone,
      email,

      password: hashedPassword

    });

    res.status(201).json({

      message: "User registered successfully",

      user

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

// LOGIN

const loginUser = async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;

    // FIND USER

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        message: "Invalid credentials"
      });

    }

    // CHECK PASSWORD

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid credentials"
      });

    }

    // TOKEN

    const token = jwt.sign(

      {
        id: user._id
      },

      "secretkey",

      {
        expiresIn: "7d"
      }

    );

    res.json({

      message: "Login successful",

      token,

      user

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
