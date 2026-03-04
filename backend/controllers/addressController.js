const Address = require("../models/Address");

/* SAVE ADDRESS */

const saveAddress = async (req, res) => {

  try {

    const { userId, name, phone, street, city, pincode } = req.body;

    const address = new Address({
      userId,
      name,
      phone,
      street,
      city,
      pincode
    });

    await address.save();

    res.json({
      message: "Address saved successfully",
      address
    });

  } catch (error) {

    res.status(500).json({
      message: "Error saving address"
    });

  }

};

module.exports = { saveAddress };