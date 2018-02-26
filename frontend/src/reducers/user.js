export function userSignUpHasErrors(state = [], action) {
	switch(action.type) {
		case 'USER_SIGNUP_ERROR':
			return action.signupErrors;
		default:
			return state;
	}
}

export function userSignUpIsProcessing(state = false, action) {
	switch(action.type) {
		case 'USER_SIGNUP_PROCESSING':
			return action.signupIsProcessing;
		default:
			return state;
	}
}

export function userLoggedInChecked(state = false, action) {
	switch(action.type) {
		case 'USER_LOGGEDIN_CHECKED':
			console.log("TESTING@####");
			console.log(action.checked);
			return action.checked;
		default: 
			return state;
	}
}

export function userLoginHasErrors(state = [] , action) {
	switch(action.type) {
		case 'USER_LOGIN_ERROR':
			return action.errors;
		default:
			return state;
	}
}

export function user(state = false, action) {
	switch(action.type) {
		case 'USER_LOGGED_IN':
		case 'USER_SIGNUP_COMPLETE':
			return action.user;
		default:
			return state;
	}
}
