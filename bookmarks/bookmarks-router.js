const express = require('express')
const uuid = require('uuid/v4')
const logger = require('../src/logger')
const { bookmarks } = require('../src/store')


const bookmarksRouter = express.Router()
const bodyParser = express.json()

bookmarksRouter
  .route('/bookmarks')
  .get((req, res) => {
    // returns a list of bookmarks
    res.json(bookmarks)
  })
  .post(bodyParser, (req, res) => {
    // accepts a JSON object representing a bookmark and adds it to the list of bookmarks after validation.
    const { title, url, rating, desc } = req.body;
  
    if (!title) {
      logger.error(`Title is required`);
      return res
        .status(400)
        .send('Invalid data');
    }
    
    if (!url) {
      logger.error(`URL is required`);
      return res
        .status(400)
        .send('Invalid data');
    }
    
    if (!rating) {
      logger.error(`Rating is required`);
      return res
        .status(400)
        .send('Invalid data');
    }

    if (!desc) {
      logger.error(`Desc is required`);
      return res
        .status(400)
        .send('Invalid data');
    }

    const id = uuid();
  
    const bookmark = {
      id,
      title,
      url,
      rating,
      desc
    };
  
    bookmarks.push(bookmark);
  
    logger.info(`Bookmark with id ${id} created`);
  
    res
      .status(201)
      .location(`http://localhost:8000/bookmark/${id}`)
      .json(bookmark);
  })

bookmarksRouter
  .route('/bookmarks/:id')
  .get((req, res) => {
    // returns a single bookmark with the given ID, return 404 Not Found if the ID is not valid
    const { id } = req.params;
    const bookmark = bookmarks.find(b => b.id == id);
  
    // make sure we found a bookmark
    if (!bookmark) {
      logger.error(`Bookmstk with id ${id} not found.`);
      return res
        .status(404)
        .send('Bookmark Not Found');
    }
  
    res.json(bookmark);
  })
  .delete((req, res) => {
    // deletes the bookmark with the given ID.
    const { id } = req.params;

    const bookmarkIndex = bookmarks.findIndex(b => b.id == id);
  
    if (bookmarkIndex === -1) {
      logger.error(`Bookmark with id ${id} not found.`);
      return res
        .status(404)
        .send('Not Found');
    }
  
    bookmarks.splice(bookmarkIndex, 1);
  
    logger.info(`Bookmark with id ${id} deleted.`);
    res
      .status(204)
      .end();
  })

module.exports = bookmarksRouter