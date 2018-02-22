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

export function user(state = false, action) {
	switch(action.type) {
		case 'USER_LOGGED_IN':
		case 'USER_SIGNUP_COMPLETE':
			return action.user;
		default:
			return state;
	}
}
