const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (data) => {
  const { name, email, password } = data;

  const existing = await User.findOne({ email });
  if (existing) throw { status: 400, message: "User already exists" };

  const hashedPassword = await bcrypt.hash(password, 10);

  return await User.create({
    name,
    email,
    password: hashedPassword
  });
};

exports.loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) throw { status: 400, message: "Invalid credentials" };

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw { status: 400, message: "Invalid credentials" };

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { token };
};