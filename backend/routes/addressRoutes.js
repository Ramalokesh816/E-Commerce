const express = require("express");
const router = express.Router();

const { saveAddress } = require("../controllers/addressController");

router.post("/save", saveAddress);

module.exports = router;