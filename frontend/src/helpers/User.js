import { ajaxHelper } from './ajax';
import parseError from './parseError';

class User {
	static create(obj) {
		return ajaxHelper("/user", {
			method: 'POST',
			body: {
				email			: obj.email,
				password		: obj.password,
				confirmPassword	: obj.confirmPassword
			}
		})
		.catch(err => {
			console.log(err);
			var errors = parseError(err, "Unable to sign up at this time.");
			return Promise.reject(errors);
		})
	}

	static login(email, password) {
		return ajaxHelper("/user/login", {
			method: 'POST',
			body: {
				email		: email,
				password	: password,
			}
		})
		.catch(err => {
			console.log(err);
			var errors = parseError(err, "Unable to login at this time.");
			return Promise.reject(errors);
		})
	}

	static isLoggedIn() {
		return ajaxHelper("/user/status", {
			method: 'POST',
			body: {}
		})
		.then(result => {
			return Promise.resolve(true);
		})
		.catch(err => {
			return Promise.resolve(false);
		});
	}
}

export default User;
