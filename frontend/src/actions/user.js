import User from '../models/User.js';

export function userSignUpError(errors) {
	return {
		type: 'USER_SIGNUP_ERROR',
		signupErrors: errors
	}
}

export function userLoggedIn(user) {
	return {
		type: 'USER_LOGGED_IN',
		user
	}
}

export function userSignUpProcessing(status) {
	return {
		type: 'USER_SIGNUP_PROCESSING',
		signupIsProcessing: status
	}
}

export function userSignUpComplete(user) {
	return {
		type: 'USER_SIGNUP_COMPLETE',
		user
	}
}

export function userSignUpEmail(email) {
	return {
		type: 'USER_SIGNUP_EMAIL',
		email
	}
}


export function userSignUpPassword(password) {
	return {
		type: 'USER_SIGNUP_PASSWORD',
		password
	}
}


export function userSignUpConfirmPassword(confirmPassword) {
	return {
		type: 'USER_SIGNUP_CONFIRM_PASSWORD',
		confirmPassword
	}
}

export function userLoginError(errors) {
	return {
		type: 'USER_LOGIN_ERROR',
		errors
	}
}

export function userSignUpHandleInput(field) {
	return {
		type: 'USER_SIGNUP_FORM_INPUT',
		name: field.target.name,
		value: field.target.value
	}
}

export function userLoggedInChecked(checked) {
	console.log("CHECKED");
	console.log(checked);
	return {
		type: 'USER_LOGGEDIN_CHECKED',
		checked: checked
	}
}

export function userLogin(email, password) {
	return (dispatch) => {
		dispatch(userLoginError([]));
		User.login(email, password).then(user => {
			return dispatch(userLoggedIn(user));
		})
		.catch(err => {
			console.log(err);
			dispatch(userLoggedIn(false));
			return dispatch(userLoginError(err));
		});
	}
}

export function userSignUp(obj) {
	return (dispatch) => {
		dispatch(userSignUpProcessing(true));
		dispatch(userSignUpError([]));

		User.create(obj).then(user => {
			dispatch(userSignUpProcessing(false));
			dispatch(userSignUpComplete(user));
			return userLogin(obj.email, obj.password);
		})
		.catch(err => {
			return dispatch(userSignUpError(err));
		});

	}
}

export function checkLoggedIn() {
	return (dispatch) => {
		User.isLoggedIn().then(result => {
			dispatch(userLoggedIn(result.user));
			return dispatch(userLoggedInChecked(true));
		})
		.catch(err => {
			dispatch(userLoggedIn(false));
			return dispatch(userLoggedInChecked(true)); 
		})
	}
}
