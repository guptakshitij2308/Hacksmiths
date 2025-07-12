const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// JWT Generator
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @route   POST /api/auth/register
exports.registerUser = async (req, res) => {
  const {
    name,
    email,
    password,
    skillsOffered,
    skillsWanted,
    availability,
    isPublic,
    role,
  } = req.body;

  if (
    !name ||
    !email ||
    !password ||
    !skillsOffered?.length ||
    !skillsWanted?.length ||
    !availability?.length ||
    isPublic === undefined
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPwd,
      role: role || "user",
      skillsOffered,
      skillsWanted,
      availability,
      isPublic,
    });

    const token = generateToken(newUser._id, newUser.role);

    res.status(201).json({
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @route   POST /api/auth/login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id, user.role);

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Login error" });
  }
};
