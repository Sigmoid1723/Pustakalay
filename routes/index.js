const express = require('express');
const Book = require('../models/recentBook'); 
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const books = await Book.find();

        res.render('index', { books });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching PDF URLs');
    }
});

module.exports = router;
