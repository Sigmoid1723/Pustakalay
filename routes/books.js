const express = require('express');
const path = require('path');
const filterFiles = require('../filterFiles'); // Your custom filter function
const RecentBook = require('../models/recentBook'); // Assuming this is your schema
const router = express.Router();

const directoryToServe = path.join(__dirname, '../public/books');

router.use('/*', (req, res, next) => {
    const subDir = req.params[0] || '';
    const directoryToFilter = path.join(directoryToServe, subDir);

    // Apply the filterFiles function first
    filterFiles(directoryToFilter)(req, res, async () => {
        const fileList = req._files; // Assuming the filtered files are saved in `req._files`
        const bookId = path.basename(req.url, path.extname(req.url)); // Extract bookId (file name without extension)
        const filePath = path.join(directoryToFilter, `${bookId}.pdf`); // Assuming the book is a PDF

        console.log(`Accessing book: ${bookId}`);

        try {
            // Update or create a new RecentBook entry using async/await
            await RecentBook.findOneAndUpdate(
                { bookId },
                { bookId, filePath, lastVisited: Date.now() },
                { upsert: true, new: true }
            );
            console.log('Recent book entry updated');
        } catch (err) {
            console.error('Error updating recent book:', err);
        }

        // After updating RecentBook, render the file list
        res.render('books/index', { files: fileList, baseUrl: req.baseUrl });
    });
});

module.exports = router;
