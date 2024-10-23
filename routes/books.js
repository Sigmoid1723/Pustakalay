const express = require('express');
const path = require('path');
const filterFiles = require('../filterFiles');
const router = express.Router();
const RecentlyVisited = require('../models/recentBook')

const directoryToServe = path.join(__dirname, '../public/books');

// Use one route handler for both root and dynamic paths
router.use('/*', (req, res, next) => {
    const subDir = req.params[0] || '';

    const directoryToFilter = path.join(directoryToServe, subDir);

    filterFiles(directoryToFilter)(req, res, next);
}, async (req, res) => {
    const fileList = req._files;

    // Store only unique relative PDF file paths in Mongoose
    const uniquePaths = new Set();
    for (const file of fileList) {
        const relativePath = file.path.replace(directoryToServe, '');
        const url = `${req.baseUrl}`;
        /* /${relativePath}`; */
        if (!uniquePaths.has(url)) {
            uniquePaths.add(url);
            try {
                const existingUrl = await RecentlyVisited.findOne({ url });
                if (!existingUrl) {
                    const newUrl = new RecentlyVisited({ url });
                    await newUrl.save();
                }
            } catch (err) {
                console.error('Error storing recently visited URL:', err);
            }
        }
    }

    res.render('books/index', { files: fileList, baseUrl: req.baseUrl });
});

module.exports = router;
