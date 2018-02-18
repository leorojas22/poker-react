const mongoose 		= require(process.cwd() + "/db.js");
const User 			= require(process.cwd() + "/models/User.js");
const BaseModel 	= require(process.cwd() + "/models/BaseModel.js");
const generateUUID 	= require(process.cwd() + "/helpers/GenerateUUID.js");
const moment		= require("moment");
const baseURL		= require(process.cwd() + "/helpers/BaseUrl.js");

const schema = new mongoose.Schema({
	code: {
		type: String
	},
	user: { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'User',
		required: [true, 'User is required.']
	},
	expires: { 
		type: Date,
		default: new Date(Date.now() + (60*60*1000))
	},
	deleted: Date
}, {
	timestamps: {
		createdAt: 'created',
		updatedAt: 'updated'
	}
});


class ResetCode extends BaseModel {
	static searchableProperties() {
		return ['name', 'user'];
	}

	static settableProperties() {
		return ['name', 'user'];
	}

	static generateForUser(email) {
		var self = this;

		if(!email) {
			return Promise.reject("Email is required.");
		}

		// Find the user's ID based off the email
		return User.findOne({ email, deleted: undefined }).then((user) => {
			if(user) {
				// Check if they have a reset code already
				return Promise.all([user, self.findOne({ user: user._id, deleted: undefined })]);	
			}
			return Promise.reject("User not found.");
		})
		.then(result => {
			var resetCode 	= result[1];
			var user 		= result[0];
			var promises 	= [user];

			if((resetCode && moment(resetCode.expires).isBefore(moment())) || !resetCode) {
				// Does not have a valid resetCode - create a new one
				var newResetCode = new self({ code: generateUUID(), user: user._id });
				promises.push(newResetCode.save());

				if(resetCode) {
					promises.push(resetCode.delete(true));
				}

			}
			else if(resetCode) {
				promises.push(resetCode);
			}

			return Promise.all(promises);
		});
	}

	toJson() {

		var user = this.user;
		if(user instanceof User) {
			user = user.toJson();
		}

		return {
			user	: user,
			expires	: this.expires,
			code	: this.code,
			created	: this.created
		};
	}

	send() {
		return User.findOne({ _id: this.user, deleted: undefined }).then((user) => {
			var viewFile = process.cwd() + "/views/email/forgotpassword.ejs";
			var viewData = {
				resetURL	: baseURL("reset-password?code="+this.code),
				email		: user.email
			}

			return user.sendEmail(false, "Password Reset: Workout Log", viewData, viewFile);
		});
	}
}

schema.loadClass(ResetCode);

module.exports = mongoose.model("ResetCode", schema);
