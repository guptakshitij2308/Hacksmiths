const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Admin must have a name"],
    },
    email: {
      type: String,
      required: [true, "Admin must have an email"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Admin must have a password"],
      minlength: 6,
      select: false,
    }
  },
  { timestamps: true }
);

// ✅ Hash password before saving
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// ✅ Allow only one admin in the entire system
adminSchema.pre("save", async function (next) {
  const existingAdmin = await this.constructor.findOne();
  if (existingAdmin && existingAdmin._id.toString() !== this._id.toString()) {
    return next(new Error("Only one admin is allowed."));
  }
  next();
});

// ✅ Password check method
adminSchema.methods.correctPassword = async function (entered, actual) {
  return await bcrypt.compare(entered, actual);
};

module.exports = mongoose.model("Admin", adminSchema);
