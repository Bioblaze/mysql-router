'use strict';
const moment = require('moment');
const _mysql = require('mysql');
var util = require('util');

var _instance = null;

class Mysql {
  constructor() {
    this.pool = null;
  }
  StartPool(options) {
    _instance.pool = _mysql.createPool(options);
  }
  Promise(sql, data) {
    return new Promise((res, rej) => {
      if (!_instance.pool) {
        return rej("Please StartPool before making Requests.");
      } else {
        _instance.pool.getConnection(function(err, conn) {
          if (err) console.log(`Mysql Error: ${util.inspect(err, false, null)}`);
          var _sql = conn.format(sql, data);
          conn.query(_sql, function(err, rows) {
            if (err) console.log(`Mysql Query Error: ${util.inspect(err, false, null)}`);
            conn.release();
            if (err) return rej(err);
            return res(rows);
          });
        });
      }
    });
  }
  setDate(d) {
    return moment(d).format('YYYY-MM-DD HH:mm:ss');
  }
  getDate(d) {
    return moment(d).format('MMMM Do YYYY, h:mm:ss a');
  }
}

module.exports = function() {
  return _instance || (_instance = new Mysql());
}();
