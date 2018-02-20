import { combineReducers } from 'redux';

import { 
	user, 
	userSignUpHasErrors, 
	userSignUpIsProcessing,
	userSignUpEnterEmail,
	userSignUpEnterPassword,
	userSignUpEnterConfirmPassword,
	handleFormInputReducer
} from './user';

var signUpPageState = {
	email: handleFormInputReducer("email"),
	password: handleFormInputReducer("password"),
	confirmPassword: handleFormInputReducer("confirmPassword"),
	errors: userSignUpHasErrors,
	processing: userSignUpIsProcessing
}

console.log(signUpPageState);

export default combineReducers({
	user,
	signUpPage: combineReducers({
		email: handleFormInputReducer("email"),
		password: handleFormInputReducer("password"),
		confirmPassword: handleFormInputReducer("confirmPassword"),
		errors: userSignUpHasErrors,
		processing: userSignUpIsProcessing
	})
	/*
	userSignUpHasErrors,
	userSignUpIsProcessing,
	userSignUpEmail				: handleFormInputReducer("email"),
	userSignUpPassword			: handleFormInputReducer("password"),
	userSignUpConfirmPassword	: handleFormInputReducer("confirmPassword")
	*/
});
