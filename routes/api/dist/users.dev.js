"use strict";

var express = require('express');

var router = express.Router();

var gravatar = require('gravatar');

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

var config = require('config');

var _require = require('express-validator'),
    check = _require.check,
    validationResult = _require.validationResult;

var User = require('../../models/User'); // @route   POST api/users
// @desc    Register user
// @access  Public


router.post('/', [check('name', 'Name is required').not().isEmpty(), check('email', 'Please include a valid email').isEmail(), check('password', 'Please enter a password with 6 or more characters').isLength({
  min: 6
})], function _callee(req, res) {
  var errors, _req$body, name, email, password, user, avatar, salt, payload;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));

        case 3:
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password;
          _context.prev = 4;
          _context.next = 7;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 7:
          user = _context.sent;

          if (!user) {
            _context.next = 10;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            errors: [{
              msg: 'User already exists'
            }]
          }));

        case 10:
          // Get user gravatar
          avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
          });
          user = new User({
            name: name,
            email: email,
            avatar: avatar,
            password: password
          }); // Hash password

          _context.next = 14;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 14:
          salt = _context.sent;
          _context.next = 17;
          return regeneratorRuntime.awrap(bcrypt.hash(password, salt));

        case 17:
          user.password = _context.sent;
          _context.next = 20;
          return regeneratorRuntime.awrap(user.save());

        case 20:
          // Return jsonwebtoken
          payload = {
            user: {
              id: user.id
            }
          };
          jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
          }, function (err, token) {
            if (err) throw err;
            res.json({
              token: token
            });
          });
          _context.next = 28;
          break;

        case 24:
          _context.prev = 24;
          _context.t0 = _context["catch"](4);
          console.error(_context.t0.message);
          res.status(500).send('Server error');

        case 28:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 24]]);
});
module.exports = router;