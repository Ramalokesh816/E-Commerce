const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  name: String,
  phone: String,
  street: String,
  city: String,
  pincode: String

});

module.exports = mongoose.model("Address", addressSchema);