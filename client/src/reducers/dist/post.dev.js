"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _types = require("../actions/types");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {}
}; // eslint-disable-next-line import/no-anonymous-default-export

function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var type = action.type,
      payload = action.payload;

  switch (type) {
    case _types.GET_POSTS:
      return _objectSpread({}, state, {
        posts: payload,
        loading: false
      });

    case _types.GET_POST:
      return _objectSpread({}, state, {
        post: payload,
        loading: false
      });

    case _types.ADD_POST:
      return _objectSpread({}, state, {
        posts: [payload].concat(_toConsumableArray(state.posts)),
        loading: false
      });

    case _types.DELETE_POST:
      return _objectSpread({}, state, {
        posts: state.posts.filter(function (post) {
          return post._id !== payload;
        }),
        loading: false
      });

    case _types.POST_ERROR:
      return _objectSpread({}, state, {
        error: payload,
        loading: false
      });

    case _types.UPDATE_LIKES:
      return _objectSpread({}, state, {
        posts: state.posts.map(function (post) {
          return post._id === payload.postId ? _objectSpread({}, post, {
            likes: payload.likes
          }) : post;
        }),
        loading: false
      });

    case _types.ADD_COMMENT:
      return _objectSpread({}, state, {
        post: _objectSpread({}, state.post, {
          comments: payload
        }),
        loading: false
      });

    case _types.REMOVE_COMMENT:
      return _objectSpread({}, state, {
        post: _objectSpread({}, state.post, {
          comments: state.post.comments.filter(function (comment) {
            return comment._id !== payload;
          })
        }),
        loading: false
      });

    default:
      return state;
  }
}