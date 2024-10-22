const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recentBookSchema = new Schema({
    bookId: { type: String, required: true },
    filePath: {type: String, required: true},
    lastVisited: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RecentBook', recentBookSchema);
