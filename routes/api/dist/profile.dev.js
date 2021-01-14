"use strict";

var express = require('express');

var request = require('request');

var config = require('config');

var router = express.Router();

var auth = require('../../middleware/auth');

var _require = require('express-validator'),
    check = _require.check,
    validationResult = _require.validationResult;

var Profile = require('../../models/Profile');

var User = require('../../models/User');

var Post = require('../../models/Post'); // @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private


router.get('/me', auth, function _callee(req, res) {
  var profile;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Profile.findOne({
            user: req.user.id
          }).populate('user', ['name', 'avatar']));

        case 3:
          profile = _context.sent;

          if (profile) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            msg: 'There is no profile for this user'
          }));

        case 6:
          res.json(profile);
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0.message);
          res.status(500).send('Server Error');

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
}); // @route   POST api/profile
// @desc    Create or update user profile
// @access  Private

router.post('/', [auth, [check('status', 'Status is required').not().isEmpty(), check('skills', 'Skills is required').not().isEmpty()]], function _callee2(req, res) {
  var errors, _req$body, company, website, location, bio, status, githubusername, skills, youtube, facebook, twitter, instagram, linkedin, profileFields, profile;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));

        case 3:
          _req$body = req.body, company = _req$body.company, website = _req$body.website, location = _req$body.location, bio = _req$body.bio, status = _req$body.status, githubusername = _req$body.githubusername, skills = _req$body.skills, youtube = _req$body.youtube, facebook = _req$body.facebook, twitter = _req$body.twitter, instagram = _req$body.instagram, linkedin = _req$body.linkedin; // Build profile object

          profileFields = {};
          profileFields.user = req.user.id;
          if (company) profileFields.company = company;
          if (website) profileFields.website = website;
          if (location) profileFields.location = location;
          if (bio) profileFields.bio = bio;
          if (status) profileFields.status = status;
          if (githubusername) profileFields.githubusername = githubusername;

          if (skills) {
            profileFields.skills = skills.split(',').map(function (skill) {
              return skill.trim();
            });
          } // Build social object


          profileFields.social = {};
          if (youtube) profileFields.social.youtube = youtube;
          if (twitter) profileFields.social.twitter = twitter;
          if (facebook) profileFields.social.facebook = facebook;
          if (linkedin) profileFields.social.linkedin = linkedin;
          if (instagram) profileFields.social.instagram = instagram;
          _context2.prev = 19;
          _context2.next = 22;
          return regeneratorRuntime.awrap(Profile.findOne({
            user: req.user.id
          }));

        case 22:
          profile = _context2.sent;

          if (!profile) {
            _context2.next = 28;
            break;
          }

          _context2.next = 26;
          return regeneratorRuntime.awrap(Profile.findOneAndUpdate({
            user: req.user.id
          }, {
            $set: profileFields
          }, {
            "new": true
          }));

        case 26:
          profile = _context2.sent;
          return _context2.abrupt("return", res.json(profile));

        case 28:
          // Create
          profile = new Profile(profileFields);
          _context2.next = 31;
          return regeneratorRuntime.awrap(profile.save());

        case 31:
          res.json(profile);
          _context2.next = 38;
          break;

        case 34:
          _context2.prev = 34;
          _context2.t0 = _context2["catch"](19);
          console.error(_context2.t0.message);
          res.status(500).send('Server Error');

        case 38:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[19, 34]]);
}); // @route   GET api/profile
// @desc    Get all profiles
// @access  Public

router.get('/', function _callee3(req, res) {
  var profiles;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Profile.find().populate('user', ['name', 'avatar']));

        case 3:
          profiles = _context3.sent;
          res.json(profiles);
          _context3.next = 11;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0.message);
          res.status(500).send('Server Error');

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get('/user/:user_id', function _callee4(req, res) {
  var profile;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Profile.findOne({
            user: req.params.user_id
          }).populate('user', ['name', 'avatar']));

        case 3:
          profile = _context4.sent;

          if (profile) {
            _context4.next = 6;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            msg: 'Profile not found'
          }));

        case 6:
          res.json(profile);
          _context4.next = 15;
          break;

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0.message);

          if (!(_context4.t0.kind == 'ObjectId')) {
            _context4.next = 14;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            msg: 'Profile not found'
          }));

        case 14:
          res.status(500).send('Server Error');

        case 15:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 9]]);
}); // @route   DELETE api/profile
// @desc    Delete profile, user, & posts
// @access  Private

router["delete"]('/', auth, function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Post.deleteMany({
            user: req.user.id
          }));

        case 3:
          _context5.next = 5;
          return regeneratorRuntime.awrap(Profile.findOneAndRemove({
            user: req.user.id
          }));

        case 5:
          _context5.next = 7;
          return regeneratorRuntime.awrap(User.findOneAndRemove({
            _id: req.user.id
          }));

        case 7:
          res.json({
            msg: 'User deleted'
          });
          _context5.next = 16;
          break;

        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](0);
          console.error(_context5.t0.message);

          if (!(_context5.t0.kind == 'ObjectId')) {
            _context5.next = 15;
            break;
          }

          return _context5.abrupt("return", res.status(400).json({
            msg: 'Profile not found'
          }));

        case 15:
          res.status(500).send('Server Error');

        case 16:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 10]]);
}); // @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private

router.put('/experience', [auth, [check('title', 'Title is required').not().isEmpty(), check('company', 'Company is required').not().isEmpty(), check('from', 'From date is required').not().isEmpty()]], function _callee6(req, res) {
  var errors, _req$body2, title, company, location, from, to, current, description, newExp, profile;

  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context6.next = 3;
            break;
          }

          return _context6.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));

        case 3:
          _req$body2 = req.body, title = _req$body2.title, company = _req$body2.company, location = _req$body2.location, from = _req$body2.from, to = _req$body2.to, current = _req$body2.current, description = _req$body2.description;
          newExp = {
            title: title,
            company: company,
            location: location,
            from: from,
            to: to,
            current: current,
            description: description
          };
          _context6.prev = 5;
          _context6.next = 8;
          return regeneratorRuntime.awrap(Profile.findOne({
            user: req.user.id
          }));

        case 8:
          profile = _context6.sent;
          profile.experience.unshift(newExp);
          _context6.next = 12;
          return regeneratorRuntime.awrap(profile.save());

        case 12:
          res.json(profile);
          _context6.next = 19;
          break;

        case 15:
          _context6.prev = 15;
          _context6.t0 = _context6["catch"](5);
          console.error(_context6.t0.message);
          res.status(500).send('Server Error');

        case 19:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[5, 15]]);
}); // @route   DELETE api/profile/experience/:exp_id
// @desc    Delete profile experience
// @access  Private

router["delete"]('/experience/:exp_id', auth, function _callee7(req, res) {
  var profile, removeIndex;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(Profile.findOne({
            user: req.user.id
          }));

        case 3:
          profile = _context7.sent;
          // Get remove index
          removeIndex = profile.experience.map(function (item) {
            return item.id;
          }).indexOf(req.params.exp_id);
          profile.experience.splice(removeIndex, 1);
          _context7.next = 8;
          return regeneratorRuntime.awrap(profile.save());

        case 8:
          res.json(profile);
          _context7.next = 15;
          break;

        case 11:
          _context7.prev = 11;
          _context7.t0 = _context7["catch"](0);
          console.error(_context7.t0.message);
          res.status(500).send('Server Error');

        case 15:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 11]]);
}); // @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private

router.put('/education', [auth, [check('school', 'School is required').not().isEmpty(), check('degree', 'Degree is required').not().isEmpty(), check('fieldofstudy', 'Field of study date is required').not().isEmpty(), check('from', 'From date is required').not().isEmpty()]], function _callee8(req, res) {
  var errors, _req$body3, school, degree, fieldofstudy, from, to, current, description, newEdu, profile;

  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context8.next = 3;
            break;
          }

          return _context8.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));

        case 3:
          _req$body3 = req.body, school = _req$body3.school, degree = _req$body3.degree, fieldofstudy = _req$body3.fieldofstudy, from = _req$body3.from, to = _req$body3.to, current = _req$body3.current, description = _req$body3.description;
          newEdu = {
            school: school,
            degree: degree,
            fieldofstudy: fieldofstudy,
            from: from,
            to: to,
            current: current,
            description: description
          };
          _context8.prev = 5;
          _context8.next = 8;
          return regeneratorRuntime.awrap(Profile.findOne({
            user: req.user.id
          }));

        case 8:
          profile = _context8.sent;
          profile.education.unshift(newEdu);
          _context8.next = 12;
          return regeneratorRuntime.awrap(profile.save());

        case 12:
          res.json(profile);
          _context8.next = 19;
          break;

        case 15:
          _context8.prev = 15;
          _context8.t0 = _context8["catch"](5);
          console.error(_context8.t0.message);
          res.status(500).send('Server Error');

        case 19:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[5, 15]]);
}); // @route   DELETE api/profile/education/:edu_id
// @desc    Delete profile education
// @access  Private

router["delete"]('/education/:edu_id', auth, function _callee9(req, res) {
  var profile, removeIndex;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return regeneratorRuntime.awrap(Profile.findOne({
            user: req.user.id
          }));

        case 3:
          profile = _context9.sent;
          // Get remove index
          removeIndex = profile.education.map(function (item) {
            return item.id;
          }).indexOf(req.params.edu_id);
          profile.education.splice(removeIndex, 1);
          _context9.next = 8;
          return regeneratorRuntime.awrap(profile.save());

        case 8:
          res.json(profile);
          _context9.next = 15;
          break;

        case 11:
          _context9.prev = 11;
          _context9.t0 = _context9["catch"](0);
          console.error(_context9.t0.message);
          res.status(500).send('Server Error');

        case 15:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 11]]);
}); // @route   GET api/profile/github/:username
// @desc    Get user repos from Github
// @access  Public

router.get('/github/:username', function (req, res) {
  try {
    // const options = {
    //   uri: `https://api.github.com/users/${
    //     req.params.username
    //   }/repos?per_page=5&sort=created:ascending&client_id=${config.get(
    //     'githubClientId'
    //   )}&client_secret=${config.get('githubSecret')}`,
    //   method: 'GET',
    //   headers: { 'user-agent': 'node.js' },
    // }
    var options = {
      uri: encodeURI("https://api.github.com/users/".concat(req.params.username, "/repos?per_page=5&sort=created:asc")),
      method: 'GET',
      headers: {
        'user-agent': 'node.js',
        Authorization: "token ".concat(config.get('githubToken'))
      }
    };
    request(options, function (error, response, body) {
      if (error) console.error(error);

      if (response.statusCode !== 200) {
        return res.status(404).json({
          msg: 'No Github profile found'
        });
      }

      res.json(JSON.parse(body));
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;