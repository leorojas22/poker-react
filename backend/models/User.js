const bcrypt 		= require("bcrypt");
const mongoose 		= require(process.cwd() + "/db.js");
const BaseModel 	= require(process.cwd() + "/models/BaseModel.js");
const jwt 			= require("jsonwebtoken");
const jwtKey 		= "%Jke>E937S67kA7h`w)T,*v";
const generateUUID 	= require(process.cwd() + "/helpers/GenerateUUID.js");
const sendEmail		= require(process.cwd() + "/helpers/SendEmail.js");
const moment		= require("moment");

const schema = new mongoose.Schema({
	email: { 
		type: String,
		required: [true, 'Email is required.'],
		validate: {
			validator: (email) => {
				var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
				return emailRegex.test(email);
			},
			message: "The email field must be a valid email."
		}
	},
	password: {
		type: String,
		required: [true, 'Password is required.']
	},
	session_key: String,
	deleted: Date
}, {
	timestamps: {
		createdAt: 'created',
		updatedAt: 'updated'
	}
});

schema.index({ email: 1, deleted: -1 }, { unique: true });


schema.pre("save", function(next) {
	// Check that the email is unique

	var self = this;

	if(this.session_key == "") {
		this.session_key = generateUUID();
	}

	this.constructor.findOne({ 
		email: self.email, 
		deleted: undefined, 
		_id: { $ne: self._id } 
	}).then((user) => {
		if(user) {
			next(new Error("There is already a user with that email address."));
		}
		else {
			next();
		}
	});
});

class User extends BaseModel {

	static create(userData) {
		var email 			= typeof userData.email !== 'undefined' ? userData.email : "";
		var password 		= typeof userData.password !== 'undefined' ? userData.password : "";
		var confirmPassword = typeof userData.confirmPassword !== 'undefined' ? userData.confirmPassword : "";

		if(password == confirmPassword) {
			var user = new this({ email: email });
			console.log(email);
			return user.setPassword(password).then((user) => {
				console.log(user);
				return user.save();
			});
		}
		else {
			return Promise.reject("Password does not match confirmation.");
		}
	}

	static searchableProperties() {
		return ['email'];
	}

	static settableProperties() {
		return ['email'];
	}

	static encryptPassword(password) {
		var saltRounds = 10;
		return bcrypt.hash(password, saltRounds);
	}

	setPassword(password) {
		var self = this;
		if(typeof password !== 'undefined' && (password+"").length >= 4) {
			console.log(password);
			return User.encryptPassword(password).then((hash) => {
				self.password = hash;
				return self;
			});
		}

		return Promise.reject("Password must be at least 4 characters long.");
	}

	static authenticate(email, password) {
		var authenticatedUser = null;
		return this.findOne({ email, deleted: undefined }).then((user) => {
			// Validate password
			if(user) {
				console.log(user);
				return Promise.all([user, bcrypt.compare(password, user.password)]);
			}
			return Promise.reject("Invalid credentials.");
		})
		.then((result) => {
			var authenticated = result[1];
			var user = result[0];
			return authenticated ? user : Promise.reject("Invalid credentials.");
		});
	}

	getJWT() {
		var obj = { 
			user_id		: this._id,
			session_key	: this.session_key,
			exp			: Math.floor((Date.now() / 1000) + (60*60))
		};
		console.log(obj);
		return jwt.sign(obj, jwtKey);
	}

	setJWTCookie(res) {
		res.cookie("access_token", this.getJWT(), { httpOnly: true, expires: new Date(Date.now() + (1000*60*60*24*30)), domain: 'pokertournament.com' });
	}

	static verifyJWT(token) {
		try {
			var decoded = jwt.verify(token, jwtKey);
			console.log(decoded);
			return this.findOne({ _id: decoded.user_id, deleted: undefined }).then((user) => {
				if(user.session_key == decoded.session_key) {
					return Promise.all([user, decoded]);
				}

				return Promise.reject();
			});
		}
		catch(err) {
			console.log(err);
			return Promise.reject();
		}
	}

	toJson() {
		return {
			id		: this._id,
			email	: this.email,
			created	: this.created,
			updated	: this.updated
		};
	}

	sendEmail(from, subject, viewData, viewFilePath) {
		var to = "leorojas22@gmail.com"; // this.email
		return sendEmail(to, from, subject, viewData, viewFilePath);
	}

	static displayName() {
		return "User";
	}

}

schema.loadClass(User);

module.exports = mongoose.model("User", schema);
