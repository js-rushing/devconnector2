"use strict";

var express = require('express');

var connectDB = require('./config/db');

var app = express(); // Connect Database

connectDB(); // Init Middleware

app.use(express.json({
  extended: false
}));
app.get('/', function (req, res) {
  return res.send('API Running');
}); // Define Routes

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  return console.log("Server started on port ".concat(PORT));
});