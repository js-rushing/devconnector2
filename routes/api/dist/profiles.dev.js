"use strict";

var express = require('express');

var router = express.Router(); // @route   GET api/profile
// @desc    Test route
// @access  Public

router.get('/', function (req, res) {
  return res.send('Profile route');
});
module.exports = router;