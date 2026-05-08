// backend/routes/authRoutes.js

const express = require("express");

const router = express.Router();

const {

  registerUser,
  loginUser

} = require("../controllers/authController");

// TEST ROUTE

router.get("/check", (req, res) => {

  res.send("Auth route working ✅");

});

// REGISTER

router.post("/register", registerUser);

// LOGIN

router.post("/login", loginUser);

module.exports = router;
