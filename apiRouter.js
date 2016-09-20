/**
	所有的路由都写在这里面
*/
var express           = require('express');
var smsController   = require('./api/sms');
var config            = require('./config');

var router            = express.Router();

router.get('/info/', smsController.info);

module.exports = router;