const express = require('express');
const path = require('path');
const filterFiles = require('../filterFiles');
const router = express.Router();

const directoryToServe = path.join(__dirname, '../public/books');

// Use one route handler for both root and dynamic paths
router.use('/*', (req, res, next) => {
    const subDir = req.params[0] || '';

    const directoryToFilter = path.join(directoryToServe, subDir);

    filterFiles(directoryToFilter)(req, res, next);
}, (req, res) => {
    const fileList = req._files;

    res.render('books/index', { files: fileList, baseUrl: req.baseUrl });
});

module.exports = router;
