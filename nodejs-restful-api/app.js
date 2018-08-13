require('dotenv').config();
const express = require('express'),
  app = express(),
  db = require('./db');

  // Add headers
  app.use((req, res, next) => {

      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT);

      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', true);

      // Pass to next layer of middleware
      next();
  });

const controllersPath = './controllers/',
  UserController = require(controllersPath + 'UserController'),
  ProductController = require(controllersPath + 'ProductController'),
  DepartmentController = require(controllersPath + 'DepartmentController');

app.use('/users', UserController);
app.use('/products', ProductController);
app.use('/departments', DepartmentController);

module.exports = app;
