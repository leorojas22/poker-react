import { combineReducers } from 'redux';

import { 
	user, 
	userSignUpHasErrors, 
	userSignUpIsProcessing,
	userLoginHasErrors,
	userLoggedInChecked
} from './user';

import { handleFormInputReducer } from './forminput';

import {
	tournamentListLoading,
	tournamentList
} from './tournament';

var signUpPageState = combineReducers({
	email			: handleFormInputReducer("email"),
	password		: handleFormInputReducer("password"),
	confirmPassword	: handleFormInputReducer("confirmPassword"),
	errors			: userSignUpHasErrors,
	processing		: userSignUpIsProcessing
});

var loginPageState = combineReducers({
	email		: handleFormInputReducer("email"),
	password	: handleFormInputReducer("password"),
	errors		: userLoginHasErrors
});

var tournamentsState = combineReducers({
	listLoading	: tournamentListLoading,
	list		: tournamentList
});

export default combineReducers({
	user,
	loginChecked: userLoggedInChecked,
	signUpPage: signUpPageState,
	loginPage: loginPageState,
	tournaments: tournamentsState
	/*
	userSignUpHasErrors,
	userSignUpIsProcessing,
	userSignUpEmail				: handleFormInputReducer("email"),
	userSignUpPassword			: handleFormInputReducer("password"),
	userSignUpConfirmPassword	: handleFormInputReducer("confirmPassword")
	*/
});
