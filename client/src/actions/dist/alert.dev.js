"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setAlert = void 0;

var _uuid = require("uuid");

var _types = require("./types");

// dispatch is made available by thunk middleware
var setAlert = function setAlert(msg, alertType) {
  var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3000;
  return function (dispatch) {
    var id = (0, _uuid.v4)();
    dispatch({
      type: _types.SET_ALERT,
      payload: {
        msg: msg,
        alertType: alertType,
        id: id
      }
    });
    setTimeout(function () {
      return dispatch({
        type: _types.REMOVE_ALERT,
        payload: id
      });
    }, timeout);
  };
};

exports.setAlert = setAlert;