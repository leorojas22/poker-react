const BaseController 	= require(process.cwd() + "/controllers/BaseController.js");
const User 				= require(process.cwd() + "/models/User.js");

class UserController extends BaseController {
	 
	login() {
		var loginData = this.req.body;
		var self = this;

		return User.authenticate(loginData.email, loginData.password).then(user => {
			user.setJWTCookie(self.res);
			return self.respond(true, user.toJson());	
		})
		.catch(err => {
			return self.respond(false, err);
		});
	}
	

}

module.exports = UserController;
