"use strict";

var express = require('express');

var router = express.Router();

var _require = require('express-validator'),
    check = _require.check,
    validationResult = _require.validationResult;

var auth = require('../../middleware/auth');

var Post = require('../../models/Post');

var Profile = require('../../models/Profile');

var User = require('../../models/User'); // @route   POST api/posts
// @desc    Create a post
// @access  Private


router.post('/', [auth, [check('text', 'Text is required').not().isEmpty()]], function _callee(req, res) {
  var errors, user, newPost, post;
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
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(User.findById(req.user.id).select('-password'));

        case 6:
          user = _context.sent;
          newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
          });
          _context.next = 10;
          return regeneratorRuntime.awrap(newPost.save());

        case 10:
          post = _context.sent;
          res.json(post);
          _context.next = 18;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](3);
          console.error(_context.t0.message);
          res.status(500).send('Server Error');

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 14]]);
}); // @route   GET api/posts
// @desc    Get all posts
// @access  Private

router.get('/', auth, function _callee2(req, res) {
  var posts;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Post.find().sort({
            date: -1
          }));

        case 3:
          posts = _context2.sent;
          res.json(posts);
          _context2.next = 11;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0.message);
          res.status(500).send('Server Error');

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // @route   GET api/posts/:id
// @desc    Get post by ID
// @access  Private

router.get('/:id', auth, function _callee3(req, res) {
  var post;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Post.findById(req.params.id));

        case 3:
          post = _context3.sent;

          if (post) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            msg: 'Post not found'
          }));

        case 6:
          res.json(post);
          _context3.next = 15;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0.message);

          if (!(_context3.t0.kind === 'ObjectId')) {
            _context3.next = 14;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            msg: 'Post not found'
          }));

        case 14:
          res.status(500).send('Server Error');

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 9]]);
}); // @route   DELETE api/posts/:id
// @desc    Delete a post
// @access  Private

router["delete"]('/:id', auth, function _callee4(req, res) {
  var post;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Post.findById(req.params.id));

        case 3:
          post = _context4.sent;

          if (post) {
            _context4.next = 6;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            msg: 'Post not found'
          }));

        case 6:
          if (!(post.user.toString() !== req.user.id)) {
            _context4.next = 8;
            break;
          }

          return _context4.abrupt("return", res.status(401).json({
            msg: 'User not authorized'
          }));

        case 8:
          _context4.next = 10;
          return regeneratorRuntime.awrap(post.remove());

        case 10:
          res.json({
            msg: 'Post removed'
          });
          _context4.next = 19;
          break;

        case 13:
          _context4.prev = 13;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0.message);

          if (!(_context4.t0.kind === 'ObjectId')) {
            _context4.next = 18;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            msg: 'Post not found'
          }));

        case 18:
          res.status(500).send('Server Error');

        case 19:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 13]]);
}); // @route   PUT api/posts/like/:id
// @desc    Like a post
// @access  Private

router.put('/like/:id', auth, function _callee5(req, res) {
  var post;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Post.findById(req.params.id));

        case 3:
          post = _context5.sent;

          if (!(post.likes.filter(function (like) {
            return like.user.toString() === req.user.id;
          }).length > 0)) {
            _context5.next = 6;
            break;
          }

          return _context5.abrupt("return", res.status(400).json({
            msg: 'Post already liked'
          }));

        case 6:
          post.likes.unshift({
            user: req.user.id
          });
          _context5.next = 9;
          return regeneratorRuntime.awrap(post.save());

        case 9:
          res.json(post.likes);
          _context5.next = 16;
          break;

        case 12:
          _context5.prev = 12;
          _context5.t0 = _context5["catch"](0);
          console.error(_context5.t0.message);
          res.status(500).send('Server Error');

        case 16:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 12]]);
}); // @route   PUT api/posts/unlike/:id
// @desc    Unlike a post
// @access  Private

router.put('/unlike/:id', auth, function _callee6(req, res) {
  var post, removeIndex;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(Post.findById(req.params.id));

        case 3:
          post = _context6.sent;

          if (!(post.likes.filter(function (like) {
            return like.user.toString() === req.user.id;
          }).length === 0)) {
            _context6.next = 6;
            break;
          }

          return _context6.abrupt("return", res.status(400).json({
            msg: 'Post has not yet been liked'
          }));

        case 6:
          // Get remove index
          removeIndex = post.likes.map(function (like) {
            return like.user.toString();
          }).indexOf(req.user.id);
          post.likes.splice(removeIndex, 1);
          _context6.next = 10;
          return regeneratorRuntime.awrap(post.save());

        case 10:
          res.json(post.likes);
          _context6.next = 17;
          break;

        case 13:
          _context6.prev = 13;
          _context6.t0 = _context6["catch"](0);
          console.error(_context6.t0.message);
          res.status(500).send('Server Error');

        case 17:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 13]]);
}); // @route   POST api/posts/comment/:id
// @desc    Comment on a post
// @access  Private

router.post('/comment/:id', [auth, [check('text', 'Text is required').not().isEmpty()]], function _callee7(req, res) {
  var errors, user, post, newComment;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context7.next = 3;
            break;
          }

          return _context7.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));

        case 3:
          _context7.prev = 3;
          _context7.next = 6;
          return regeneratorRuntime.awrap(User.findById(req.user.id).select('-password'));

        case 6:
          user = _context7.sent;
          _context7.next = 9;
          return regeneratorRuntime.awrap(Post.findById(req.params.id));

        case 9:
          post = _context7.sent;
          newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
          };
          post.comments.unshift(newComment);
          _context7.next = 14;
          return regeneratorRuntime.awrap(post.save());

        case 14:
          res.json(post.comments);
          _context7.next = 21;
          break;

        case 17:
          _context7.prev = 17;
          _context7.t0 = _context7["catch"](3);
          console.error(_context7.t0.message);
          res.status(500).send('Server Error');

        case 21:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[3, 17]]);
}); // @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Delete comment on a post
// @access  Private

router["delete"]('/comment/:id/:comment_id', auth, function _callee8(req, res) {
  var post, comment, removeIndex;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return regeneratorRuntime.awrap(Post.findById(req.params.id));

        case 3:
          post = _context8.sent;
          // Pull out comment
          comment = post.comments.find(function (comment) {
            return comment.id === req.params.comment_id;
          }); // Make sure comment exists

          if (comment) {
            _context8.next = 7;
            break;
          }

          return _context8.abrupt("return", res.status(404).json({
            msg: 'Comment does not exist'
          }));

        case 7:
          if (!(comment.user.toString() !== req.user.id)) {
            _context8.next = 9;
            break;
          }

          return _context8.abrupt("return", res.status(401).json({
            msg: 'User not authorized'
          }));

        case 9:
          // Get remove index
          removeIndex = post.comments.map(function (comment) {
            return comment.user.toString();
          }).indexOf(req.user.id);
          post.comments.splice(removeIndex, 1);
          _context8.next = 13;
          return regeneratorRuntime.awrap(post.save());

        case 13:
          res.json(post.comments);
          _context8.next = 20;
          break;

        case 16:
          _context8.prev = 16;
          _context8.t0 = _context8["catch"](0);
          console.error(_context8.t0.message);
          res.status(500).send('Server Error');

        case 20:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 16]]);
});
module.exports = router;