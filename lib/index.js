'use strict';
const moment = require('moment');
const _mysql = require('mysql');
var util = require('util');

var _instance = null;
/**
 * [Mysql description]
 * @class Mysql
 */
class Mysql {
  constructor() {
    this.pool = null;
  }
  /**
   * This starts up the Pool of Connections ready for Plugins and Files to access.
   * @function StartPool
   * @param {[type]} options This is the Same Official Options as the mysql Node Module.
   */
  StartPool(options) {
    _instance.pool = _mysql.createPool(options);
  }
  /**
   * Query will execute a Mysql Statement from the connection pool, then release the connection automatically saving memory.
   * @function Query
   * @param {[type]} sql  This is the Sql. Normal Mysql.
   * @param {Array} data Data is a Array associated to the Sql, this can be Empty.
   * @returns {Promise} Returns a Promise that contains the Response for the Queried Data.
   */
  Query(sql, data) {
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
  /**
   * Provide the Time in a ISO 8601 Format for Mysql.
   * @function setDate
   * @param {[type]} d (Optional) If given it will convert it to a ISO 8601 Format for mysql, if left blank it will use the Current Time.
   * @returns {string} Returns Date/Time to a ISO 8601 usable by Mysql.
   */
  setDate(d) {
    return moment(d).format('YYYY-MM-DD HH:mm:ss');
  }
  /**
   * Provide the Time in a Human Readable Format.
   * @function getDate
   * @param  {[type]} d (Optional) If given it will conver it to a Human Readable Format, if left blank it will use the Current Time.
   * @returns {string} Returns ISO 8601 to a Human Readable Format.
   */
  getDate(d) {
    return moment(d).format('MMMM Do YYYY, h:mm:ss a');
  }
}

module.exports = function() {
  return _instance || (_instance = new Mysql());
}();
