const mongoose = require('mongoose');

// Mongoose schema for recently visited PDFs
const recentBookSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('RecentlyVisited', recentBookSchema);
