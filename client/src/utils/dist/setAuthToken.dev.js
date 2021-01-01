"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var setAuthToken = function setAuthToken(token) {
  if (token) {
    _axios["default"].defaults.headers.common['x-auth-token'] = token;
  } else {
    delete _axios["default"].defaults.headers.common['x-auth-token'];
  }
};

var _default = setAuthToken;
exports["default"] = _default;