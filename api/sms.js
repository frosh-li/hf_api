var Sms = {};

Sms.info = function(req, res, next){
	return res.json({
		status:200,
		msg:'i am a test controller'
	});
};


module.exports = Sms;