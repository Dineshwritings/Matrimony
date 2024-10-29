// server/models/Profile.js
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  height: { type: String, required: true },
  colour: { type: String, required: true },
  nativePlace: { type: String, required: true },
  bodyType: { type: String, required: true },
  physicalStatus: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true },
  dob: { type: Date, required: true },
  placeOfBirth: { type: String, required: true },
  timeOfBirth: { type: String, required: true },
  dosham: { type: String, required: true },
  star: { type: String, required: true },
  rasi: { type: String, required: true },
  padam: { type: String, required: true },
  gothram: { type: String, required: true },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  sisters: { type: Number, required: true },
  brothers: { type: Number, required: true },
  familyStatus: { type: String, required: true },
  familyType: { type: String, required: true },
  partnerHeight: { type: String, required: true },
  partnerAge: { type: Number, required: true },
  partnerCaste: { type: String, required: true },
  partnerEducation: { type: String, required: true },
  partnerLocation: { type: String, required: true },
  partnerWorking: { type: String, required: true },
  partnerCountry: { type: String, required: true },
  paidAmount: { type: Number, required: true },
  agentName: { type: String, required: true },
  profileId: { type: String, required: true },
  image: {
    type: String,
    required: true,
  },
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
