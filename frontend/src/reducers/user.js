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

export function handleFormInputReducer(fieldName) {
	return (state = "", action) => {
		switch(action.type) {
			case 'USER_SIGNUP_FORM_INPUT':
				if(action.name == fieldName) {
					
					return action.value;
				}
			default:
				return state;
		}
	}
}

export function userSignUpFormInput(state = "", action) {
	switch(action.type) {
		case 'USER_SIGNUP_FORM_INPUT':
			console.log(action.field.target.value);
			return action.field.target.value;
		default:
			return state;
	}
}

export function userSignUpEnterEmail(state = "", action) {
	switch(action.type) {
		case 'USER_SIGNUP_EMAIL':
			return action.email.target.value;
		default:
			return state;
	}
}


export function userSignUpEnterPassword(state = "", action) {
	switch(action.type) {
		case 'USER_SIGNUP_PASSWORD':
			return action.password.target.value;
		default:
			return state;
	}
}

export function userSignUpEnterConfirmPassword(state = "", action) {
	switch(action.type) {
		case 'USER_SIGNUP_CONFIRM_PASSWORD':
			return action.confirmPassword.target.value;
		default:
			return state;
	}
}


export function user(state = false, action) {
	switch(action.type) {
		case 'USER_SIGNUP_COMPLETE':
			return action.user;
		default:
			return state;
	}
}
