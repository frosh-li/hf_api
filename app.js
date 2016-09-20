var express = require('express');
var app = express();
require('colors');
var fs = require('fs');
var logger = require('./common/logger');
var path = require('path');

var bodyParser = require('body-parser')

var session = require('express-session');

var apiRouter = require('./apiRouter.js');

global.request = require('request');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true,limit:'1mb' }));
app.use(bodyParser.json({limit: '1mb'}));

// parse application/json
app.use(bodyParser.json());
/*
app.use(session({
	secret: '1234567890QWERTY',
	name: 'srs',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
	cookie: {maxAge: 80000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
	resave: false,
	saveUninitialized: true,
}));
*/

/*
app.use(session({
    store: new FileStore(),
    secret: '1234567890QWERTY',
    resave: true,
	cookie: {maxAge: 1000*60*30},
    saveUninitialized: true
  })
);
*/

logger.info('Current NODE_ENV', JSON.stringify(process.env.NODE_ENV));


//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.use(require('response-time')());
app.use('/api/', apiRouter);

app.listen(10081, function () {
    logger.info('server listening on port 10081');
    logger.info('You can debug your app with http://127.0.0.1:10081');
    logger.info('');
  });

