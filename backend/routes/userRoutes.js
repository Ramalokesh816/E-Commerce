const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserProfile,
  updateProfileImage
} = require("../controllers/userController");


/* REGISTER */
router.post("/register", registerUser);


/* LOGIN */
router.post("/login", loginUser);


/* GET USER PROFILE */
router.get("/:id", getUserProfile);


/* UPDATE PROFILE IMAGE */
router.put("/profile-image/:id", updateProfileImage);


module.exports = router;