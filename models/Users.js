const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // for password hashing

const Schema = mongoose.Schema;

// Define the User Schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensure usernames are unique
    trim: true, // Remove extra spaces
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure emails are unique
    lowercase: true, // Store email in lowercase
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Minimum password length
  },
  location: {
    type: String, // Location of the user
    required: true,
  },
  skills: {
    type: [String], // Array of skills for artisans
    default: [],
  },
  role: {
    type: String,
    enum: ['client', 'artisan'], // Only client or artisan roles allowed
    required: true,
  },
  // Additional fields can be added based on requirements
  profilePicture: {
    type: String, // URL to a profile picture (optional)
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash the password before saving the user to the database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Only hash if password is modified or is new

  try {
    // Generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // Hash the password
    this.password = await bcrypt.hash(this.password, salt);
    next(); // Continue saving user
  } catch (err) {
    next(err); // Error during hashing
  }
});

// Method to compare entered password with the hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // Compare hash and entered password
};

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
