const express = require('express');
const auth = require('../middleware/auth');
const Profile = require('../models/Profile');

const router = express.Router();

// Get Profiles with Filter & Search
router.get('/', auth, async (req, res) => {
    const { date, region, state, search } = req.query;
    let filters = {};
    if (date) filters.createdAt = { $gte: new Date(date) };
    if (region) filters.region = region;
    if (state) filters.state = state;
    if (search) filters.name = { $regex: search, $options: 'i' };

    const profiles = await Profile.find(filters);
    res.json(profiles);
});

module.exports = router;
