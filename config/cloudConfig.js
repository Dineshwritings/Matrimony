// config/cloudinaryConfig.js
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: 'dyebgieff',
  api_key: '885263469914134',
  api_secret: 'MAiOJaZKVr9jddndvAbTUoAnEo8',
});

module.exports = cloudinary;
