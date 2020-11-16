"use strict";

var express = require('express');

var router = express.Router(); // @route   GET api/posts
// @desc    Test route
// @access  Public

router.get('/', function (req, res) {
  return res.send('Post route');
});
module.exports = router;