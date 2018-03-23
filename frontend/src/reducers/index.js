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
	tournamentList,
	tournamentIsSaving,
	tournamentSelected,
	tournamentErrors,
} from './tournament';

import {
	playerErrors,
	playerSaving,
	playerListLoading,
	playerList,
	playerSelected,
	playerModalOpen
} from './tournamentPlayer';

const signUpPageState = combineReducers({
	email			: handleFormInputReducer("email"),
	password		: handleFormInputReducer("password"),
	confirmPassword	: handleFormInputReducer("confirmPassword"),
	errors			: userSignUpHasErrors,
	processing		: userSignUpIsProcessing
});

const loginPageState = combineReducers({
	email		: handleFormInputReducer("email"),
	password	: handleFormInputReducer("password"),
	errors		: userLoginHasErrors
});

const tournamentsState = combineReducers({
	listLoading			: tournamentListLoading,
	list				: tournamentList,
	selectedTournament	: tournamentSelected,
	playerModalOpen		: playerModalOpen,
	playerName			: handleFormInputReducer("player_name")
});

const tournamentFormState = combineReducers({
	errors			: tournamentErrors,
	isSaving		: tournamentIsSaving,
	name			: handleFormInputReducer("tournament_name"),
	startingChips	: handleFormInputReducer("starting_chips"),
	buyIn			: handleFormInputReducer("buy_in"),
	blindLevelTime	: handleFormInputReducer("blind_level_time"),
	payoutType		: handleFormInputReducer("payout_type", 1),
	payoutAmount	: handleFormInputReducer("payout_amount")
});

const tournamentPlayerState = combineReducers({
	isSaving			: playerSaving,
	errors				: playerErrors,
	isLoading			: playerListLoading,
	players				: playerList,
	selectedPlayer		: playerSelected
});

export default combineReducers({
	user,
	loginChecked		: userLoggedInChecked,
	signUpPage			: signUpPageState,
	loginPage			: loginPageState,
	tournaments			: tournamentsState,
	tournamentForm		: tournamentFormState,
	tournamentPlayers	: tournamentPlayerState
});
