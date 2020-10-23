//install dependencies
const express = require('express');
const { v4: uuid } = require('uuid');
const logger = require('../logger');
const bookmarks = require('../store');

//set up router and parser
const bookmarkRouter = express.Router();
const bodyParser = express.json();

//logic
function handleGetBookmarks(req, res) {
    console.log('getting bookmarks')
    res
        .status(200)
        .json(bookmarks);
}

//Routers
bookmarkRouter
    .route('/bookmarks')
    .get(handleGetBookmarks);
//export
module.exports = bookmarkRouter;