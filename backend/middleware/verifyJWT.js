const User = require(process.cwd() + "/models/User.js");
const moment = require("moment");

module.exports = (req, res, next) => {

	if(req.method == "OPTIONS") {
		return res.json({ result: true });
	}
	else if(typeof req.params.modelName !== 'undefined' && req.params.modelName == "user") {
		next();
		return true;
	}


	if(typeof req.cookies.access_token !== 'undefined') {	
		User.verifyJWT(req.cookies.access_token).then((result) => {
			var jwt = result[1];
			req.user = result[0];

			// Check if need to refresh token
			var expires = moment(new Date(jwt.exp*1000));
			var now = moment();
			var minutesRemaining = expires.diff(now, 'minutes');
			if(minutesRemaining < 10) {
				// Only 10 minutes remaining on token - Refresh it
				req.user.setJWTCookie(res);
			}

			next();
		})
		.catch((err) => {
			console.log(err);
			res.status(400);
			res.json({ result: false, message: "Access Denied" });
		});
	}
	else {
		res.status(400);
		res.json({ result: false, message: "Access Denied" });
	}

}
