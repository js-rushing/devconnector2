"use strict";

var express = require('express');

var app = express();
app.get('/', function (req, res) {
  return res.send('API Running');
});
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  return console.log("Server started on port ".concat(PORT));
});