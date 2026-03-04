const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      email,
      password: hashedPassword
    });

    await admin.save();

    res.json({ message: "Admin registered successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const loginAdmin = async (req, res) => {

  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (!admin) {
    return res.status(400).json({ message: "Admin not found" });
  }

  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    { id: admin._id },
    "secretkey",
    { expiresIn: "1d" }
  );

  res.json({ token });
};

module.exports = { loginAdmin, registerAdmin };