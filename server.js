const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

const indexRouter = require('./routes/index');
const booksRouter = require('./routes/books');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', './layouts/layout');

app.use(expressLayouts);
app.use(express.static('public'));

app.use('/', indexRouter);
app.use('/books', booksRouter);

app.listen(process.env.PORT || 3000)
