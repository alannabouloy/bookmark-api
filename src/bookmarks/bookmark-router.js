//install dependencies
const express = require('express');
const { v4: uuid } = require('uuid');
const logger = require('../logger');
const bookmarks = require('../store');

//set up router and parser
const bookmarkRouter = express.Router();
const bodyParser = express.json();

//logic
//get bookmarks
function handleGetBookmarks(req, res) {
    console.log('getting bookmarks')
    res
        .status(200)
        .json(bookmarks);
}
//function to handle invalidRequest
function invalidRequest(res, message){
    logger.error(`Inavlid request: ${message}`);
    return res
        .status(400)
        .send(`Invalid request: ${message}`)
}
//post bookmarks
function handlePostBookmarks(req, res) {
    //set variables from request
    const { title, url, desc = false, rating = false } = req.body;
    //validate variables
    //title  of 1 or more is required 
    if(!title){
        return invalidRequest(res, 'title required');
    }
    //title must be a string
    if(typeof title !== 'string'){
       return invalidRequest(res, 'title must be a string');
    }
    //url is required
    if(!url){
        return invalidRequest(res, 'url required');
    }
    //url must be a string
    if(typeof url !== 'string'){
        return invalidRequest(res, 'url must be a string');
    }
    //url must be at least 5 in length
    if(url.length < 5){
        return invalidRequest(res, 'url must be at least 5 characters in length');
    }
    //url must include http protocol
    if(!url.includes('http://') && !url.includes('https://')){
        return invalidRequest(res, 'url must include valid http protocol');
    }
    //desc is optional but must be a string of minimum length 1
    if(desc){
        if(typeof desc !== 'string'){
            return invalidRequest(res, 'desc must be a string');
        }
    }
    //rating is optional but must be a number between 1 and 5
    if(rating){
        if(isNaN(rating)){
            return invalidRequest(res, 'rating must be a number');
        }
        if(rating < 1 || rating > 5) {
            return invalidRequest(res, 'rating must be between 1 and 5');
        }
    }

    const id = uuid();

    const bookmark = {
        id,
        title,
        url,
        desc,
        rating
    };

    bookmarks.push(bookmark);
    logger.info(`Bookmark was created with id ${id}`);
    res
        .status(201)
        .location(`http://localhost:8000/bookmarks/${id}`)
        .json(bookmark);
}
//get individual bookmark
function handleGetBookmark(req, res){
    const { id } = req.params;
    console.log(id);

    const bookmark = bookmarks.find(b => b.id == id);

    if(!bookmark) {
        logger.error(`Bookmark with id ${id} could not be found`)
        return res
            .status(404)
            .send('Bookmark Not Found');
    }

    res
        .status(200)
        .json(bookmark);
}
//delete bookmark
function handleDeleteBookmark(req, res){
    const {id} = req.params;
    const index = bookmarks.findIndex(b => b.id == id);

    if(index === -1) {
        logger.error(`Bookmark with id ${id} could not be found`);
        return res
            .status(404)
            .send('Bookmark Not Found');
    }

    bookmarks.splice(index, 1);
    logger.info(`Bookmark with id ${id} has been deleted`);
    res
        .status(204)
        .end();
}

//Routers
bookmarkRouter
    .route('/bookmarks')
    .get(handleGetBookmarks)
    .post(bodyParser, handlePostBookmarks);

bookmarkRouter
    .route('/bookmarks/:id')
    .get(handleGetBookmark)
    .delete(handleDeleteBookmark);
//export
module.exports = bookmarkRouter;