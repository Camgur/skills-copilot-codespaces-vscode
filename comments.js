// Create web server
var express = require('express');
var router = express.Router();
var Comment = require('../models/Comment');
var User = require('../models/User');
var Post = require('../models/Post');

// Get all comments
router.get('/', function(req, res, next) {
  Comment.find().populate('author').populate('post').exec(function(err, comments) {
    if (err) return next(err);
    res.json(comments);
  });
});

// Get single comment by id
router.get('/:id', function(req, res, next) {
  Comment.findById(req.params.id).populate('author').populate('post').exec(function(err, comment) {
    if (err) return next(err);
    res.json(comment);
  });
});

// Create new comment
router.post('/', function(req, res, next) {
  var comment = new Comment({
    content: req.body.content,