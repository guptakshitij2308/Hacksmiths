const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// JWT Generator

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

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

  // ✅ Check required fields
  if (
    !name ||
    !email ||
    !password ||
    !skillsOffered ||
    !skillsWanted ||
    !availability ||
    typeof isPublic === "undefined"
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    // ✅ Handle profile image
    let profilePhoto = "";
    if (req.file && req.file.path) {
      profilePhoto = req.file.path;
    } else {
      profilePhoto = ""; // Allow default/fallback image (optional)
    }

    const hashedPwd = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPwd,
      role: role || "user",
      profilePhoto,
      skillsOffered: Array.isArray(skillsOffered)
        ? skillsOffered
        : [skillsOffered],
      skillsWanted: Array.isArray(skillsWanted) ? skillsWanted : [skillsWanted],
      availability: Array.isArray(availability) ? availability : [availability],
      isPublic,
    });

    const token = generateToken(newUser._id, newUser.role);

    res.status(201).json({
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        profilePhoto: newUser.profilePhoto,
      },
      token,
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// @route   POST /api/auth/login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password are required" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id, user.role);

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePhoto: user.profilePhoto,
      },
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login error" });
  }
};
