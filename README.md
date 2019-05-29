# mysql-router

![Build Status](https://img.shields.io/travis/Bioblaze/mysql-router.svg)
![dependencies](https://img.shields.io/david/Bioblaze/mysql-router.svg)
![dev dependencies](https://img.shields.io/david/dev/Bioblaze/mysql-router.svg)

[![Downloads](https://img.shields.io/npm/dm/mysql-router.svg)](https://www.npmjs.com/package/mysql-router)
[![Downloads](https://img.shields.io/npm/dt/mysql-router.svg)](https://www.npmjs.com/package/mysql-router)
[![npm version](https://img.shields.io/npm/v/mysql-router.svg)](https://www.npmjs.com/package/mysql-router)
[![License](https://img.shields.io/npm/l/mysql-router.svg)](https://github.com/Bioblaze/mysql-router/blob/master/LICENSE)

[![Code Climate](https://codeclimate.com/github/Bioblaze/mysql-router/badges/gpa.svg)](https://codeclimate.com/github/Bioblaze/mysql-router)
[![Discord Chat](https://img.shields.io/discord/165374225320771586.svg)](https://discord.gg/T8uVhzU)
[![PayPal](https://img.shields.io/badge/paypal-donate-yellow.svg)](https://paypal.me/BioblazePayne)  

Mysql is a trademark or registered trademark of Oracle Corporation in the U.S. and/or other countries. "mysql-router" is not operated by, sponsored by, or affiliated with Oracle Corporation in any way.

## Install
```bash
$ npm install mysql-router
```

## Information

Documentation on Object Class Structure & Functions can be found at the Official [Github Pages](https://bioblaze.github.io/mysql-router/)

Tutorials, Guides, and More can be Found at the Official [Github Wiki](https://github.com/Bioblaze/mysql-router/wiki)

If any information is Lacking please Post a Question in the [Github Issues](https://github.com/Bioblaze/mysql-router/issues) Section.

Example Code: <TBA>

Example Project: <In Development>

## Usage of Mysql Router

### Configure

#### Config Options

##### Without SSL
```javascript
var mysql = require('mysql-router');
mysql.StartPool({
  connectionLimit: 100,
  host: "127.0.0.1",
  post: 3306,
  user: "test",
  password: "test",
  database: "test",
  charset: "utf8mb4", // Note: This is very Specific to Discord. Just saying.
});
```

##### With SSL
```javascript
var mysql = require('mysql-router');
var fs = require('fs');
var path = require('path');
mysql.StartPool({
  connectionLimit: 100,
  host: "127.0.0.1",
  post: 3306,
  user: "test",
  password: "test",
  database: "test",
  charset: "utf8mb4", // Note: This is very Specific to Discord. Just saying.
  ssl: {
    ca: fs.readFileSync(path.join(__dirname, 'ssl', 'server-ca.pem')),
    key: fs.readFileSync(path.join(__dirname, 'ssl', 'client-key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'ssl', 'client-cert.pem'))
  }
});
```

## Issue

If any Issues Please Submit them on the Github!

## Example

### /index.js
```javascript
var mysql = require('mysql-router');
var util = require('util');
mysql.StartPool({
  connectionLimit: 100,
  host: "127.0.0.1",
  post: 3306,
  user: "test",
  password: "test",
  database: "test",
  charset: "utf8mb4", // Note: This is very Specific to Discord. Just saying.
});

mysql.Query(`CREATE TABLE Persons (
    PersonID int,
    LastName varchar(255),
    FirstName varchar(255),
    Address varchar(255),
    City varchar(255)
);`, []).then((d) => {
  console.log(`Data from Query: ${${util.inspect(d, false, null)}}`);
}).catch((e) => {
  console.log(${util.inspect(e, false, null)});
})
```
