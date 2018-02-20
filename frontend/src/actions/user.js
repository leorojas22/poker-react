import User from '../helpers/User.js';

export function userSignUpError(errors) {
	return {
		type: 'USER_SIGNUP_ERROR',
		signupErrors: errors
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

export function userSignUpHandleInput(field) {
	return {
		type: 'USER_SIGNUP_FORM_INPUT',
		name: field.target.name,
		value: field.target.value
	}
}

export function userSignUp(obj) {
	return (dispatch) => {
		dispatch(userSignUpProcessing(true));
		dispatch(userSignUpError([]));

		User.create(obj).then(user => {
			dispatch(userSignUpProcessing(false));
			return dispatch(userSignUpComplete(user));
		})
		.catch(err => {
			return dispatch(userSignUpError(err));
		});

	}
}
