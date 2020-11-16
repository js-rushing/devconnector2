"use strict";

var jwt = require('jsonwebtoken');

var config = require('config');

module.exports = function (req, res, next) {
  // Get token from header
  var token = req.header('x-auth-token'); // Check if no token

  if (!token) {
    return res.status(401).json({
      msg: 'No token, authorization denied'
    });
  } // Verify token


  try {
    var decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({
      msg: 'Token is not valid'
    });
  }
};