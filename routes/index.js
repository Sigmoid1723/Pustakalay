const express = require('express')
const router = express.Router()
const RecentBook = require('../models/recentBook')

router.get('/', async (req,res) => {
    const recentBooks = await RecentBook.find({})
                                        .populate('bookId')
                                        .sort({lastVisited: -1})
                                        .limit(5)
    
    res.render('index',{ recentBooks })
})

module.exports = router
