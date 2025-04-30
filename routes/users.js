// models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define User schema
const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String },
  skills: [String], // Array of skills
  role: { type: String, enum: ['client', 'artisan'], required: true }
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;

