const express = require('express');
const multer = require('multer');
const router = express.Router();
const Profile = require('../models/Profile'); // Import the Profile model
const cloudinary = require('../config/cloudConfig');

// Set up multer for handling multipart/form-data
const storage = multer.memoryStorage(); // Use memory storage for temporary uploads
const upload = multer({ storage }); // Configure multer to use in-memory storage

// Create Profile Endpoint
router.post('/api/profiles', upload.single('image'), async (req, res) => {
  try {
    // Check if the file is uploaded
    // if (!req.file) {
    //   return res.status(400).json({ message: "No file uploaded" });
    // }

    // // Upload image to Cloudinary
    // const result = await cloudinary.uploader.upload_stream((error, result) => {
    //   if (error) return res.status(500).json({ message: "Cloudinary upload failed", error });
    //   return result;
    // }).end(req.file.buffer);
    console.log('----------clicked')

    // Destructure request body
    const {
      name, surname, age, gender, height, colour, nativePlace, bodyType, physicalStatus,
      contactNumber, email, dob, placeOfBirth, timeOfBirth, dosham, star, rasi, padam,
      gothram, fatherName, motherName, fatherOccupation, motherOccupation, sisters,
      brothers, familyStatus, familyType, partnerHeight, partnerAge, partnerCaste,
      partnerEducation, partnerLocation, partnerWorking, partnerCountry, paidAmount,
      agentName, profileId,image
    } = req.body;

    // Create new profile object
    const newProfile = new Profile({
      name, surname, age, gender, height, colour, nativePlace, bodyType, physicalStatus,
      contactNumber, email, dob, placeOfBirth, timeOfBirth, dosham, star, rasi, padam,
      gothram, fatherName, motherName, fatherOccupation, motherOccupation, sisters,
      brothers, familyStatus, familyType, partnerHeight, partnerAge, partnerCaste,
      partnerEducation, partnerLocation, partnerWorking, partnerCountry, paidAmount,
      agentName, profileId,
      image, // Store the image URL from Cloudinary
    });

    // Save profile to database
    const savedProfile = await newProfile.save();
    res.status(201).json(savedProfile);
  } catch (error) {
    console.error("Error saving profile:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Fetch All Profiles with Pagination
router.get('/api/allprofiles', async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 10; // Default to 10 profiles per page
  const skip = (page - 1) * limit; // Calculate the number of profiles to skip

  try {
    const totalProfiles = await Profile.countDocuments(); // Get total number of profiles
    const profiles = await Profile.find().skip(skip).limit(limit); // Fetch profiles with pagination

    res.json({
      totalProfiles,
      totalPages: Math.ceil(totalProfiles / limit),
      currentPage: page,
      profiles,
    });
  } catch (error) {
    console.error("Error fetching profiles:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Fetch Profile by ID Endpoint
router.get('/api/profiles/:id', async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Delete Profile Endpoint
router.delete('/api/deleteprofile/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProfile = await Profile.findByIdAndDelete(id);
    if (!deletedProfile) return res.status(404).json({ message: 'Profile not found' });
    res.status(200).json({ message: 'Profile deleted successfully' });
  } catch (error) {
    console.error("Error deleting profile:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
