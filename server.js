const express = require('express');
const connectDB = require('./config/db');
const authRoute = require('./routes/auth');
const profileRoute = require('./routes/profiles');
const profileRoutes = require('./routes/profileRoutes');
const cors = require('cors');
const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());

// Allow all origins
app.use(cors()); // This will enable CORS for all origins

app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Routes
app.use('/api/auth', authRoute);
app.use('/api/profiles', profileRoute);
app.use('/', profileRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
