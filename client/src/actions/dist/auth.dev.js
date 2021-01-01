"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.login = exports.register = exports.loadUser = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _alert = require("./alert");

var _types = require("./types");

var _setAuthToken = _interopRequireDefault(require("../utils/setAuthToken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Load User
var loadUser = function loadUser() {
  return function _callee(dispatch) {
    var res;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (localStorage.token) {
              (0, _setAuthToken["default"])(localStorage.token);
            }

            _context.prev = 1;
            _context.next = 4;
            return regeneratorRuntime.awrap(_axios["default"].get('/api/auth'));

          case 4:
            res = _context.sent;
            dispatch({
              type: _types.USER_LOADED,
              payload: res.data
            });
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](1);
            dispatch({
              type: _types.AUTH_ERROR
            });

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 8]]);
  };
}; // Register User


exports.loadUser = loadUser;

var register = function register(_ref) {
  var name = _ref.name,
      email = _ref.email,
      password = _ref.password;
  return function _callee2(dispatch) {
    var config, body, res, errors;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            config = {
              headers: {
                'Content-Type': 'application/json'
              }
            };
            body = JSON.stringify({
              name: name,
              email: email,
              password: password
            });
            _context2.prev = 2;
            _context2.next = 5;
            return regeneratorRuntime.awrap(_axios["default"].post('/api/users', body, config));

          case 5:
            res = _context2.sent;
            dispatch({
              type: _types.REGISTER_SUCCESS,
              payload: res.data
            });
            dispatch(loadUser());
            _context2.next = 17;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](2);
            _context2.next = 14;
            return regeneratorRuntime.awrap(_context2.t0.response.data.errors);

          case 14:
            errors = _context2.sent;

            if (errors) {
              errors.forEach(function (error) {
                return dispatch((0, _alert.setAlert)(error.msg, 'danger'));
              });
            }

            dispatch({
              type: _types.REGISTER_FAIL
            });

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[2, 10]]);
  };
}; // Login User


exports.register = register;

var login = function login(email, password) {
  return function _callee3(dispatch) {
    var config, body, res, errors;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            config = {
              headers: {
                'Content-Type': 'application/json'
              }
            };
            body = JSON.stringify({
              email: email,
              password: password
            });
            _context3.prev = 2;
            _context3.next = 5;
            return regeneratorRuntime.awrap(_axios["default"].post('/api/auth', body, config));

          case 5:
            res = _context3.sent;
            dispatch({
              type: _types.LOGIN_SUCCESS,
              payload: res.data
            });
            dispatch(loadUser());
            _context3.next = 17;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](2);
            _context3.next = 14;
            return regeneratorRuntime.awrap(_context3.t0.response.data.errors);

          case 14:
            errors = _context3.sent;

            if (errors) {
              errors.forEach(function (error) {
                return dispatch((0, _alert.setAlert)(error.msg, 'danger'));
              });
            }

            dispatch({
              type: _types.LOGIN_FAIL
            });

          case 17:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[2, 10]]);
  };
}; // Logout / Clear Profile


exports.login = login;

var logout = function logout() {
  return function (dispatch) {
    dispatch({
      type: _types.LOGOUT
    });
  };
};

exports.logout = logout;