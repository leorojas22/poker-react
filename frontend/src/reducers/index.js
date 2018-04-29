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
	tournamentCreated,
	tournamentIsLoading,
	tournamentSelectedError,
	tournamentStarting,
	tournamentTimeElapsed
} from './tournament';

import {
	playerErrors,
	playerSaving,
	playerListLoading,
	playerList,
	playerSelected,
	playerModalOpen,
	playerModalType
} from './tournamentPlayer';

import { toggleModal } from './modal';

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
	listLoading				: tournamentListLoading,
	list					: tournamentList,
	selectedTournament		: tournamentSelected,
	playerModalOpen			: toggleModal("playerModal"),
	tournamentIsLoading		: tournamentIsLoading,
	tournamentSelectedError : tournamentSelectedError,
	tournamentStarting		: tournamentStarting,
	tournamentTimeElapsed	: tournamentTimeElapsed
});

const tournamentFormState = combineReducers({
	errors			: tournamentErrors,
	isSaving		: tournamentIsSaving,
	name			: handleFormInputReducer("tournament_name"),
	startingChips	: handleFormInputReducer("starting_chips"),
	buyIn			: handleFormInputReducer("buy_in"),
	blindLevelTime	: handleFormInputReducer("blind_level_time"),
	payoutType		: handleFormInputReducer("payout_type", 1),
	payoutAmount	: handleFormInputReducer("payout_amount"),
	tournamentCreated: tournamentCreated
});

const tournamentPlayerState = combineReducers({
	isSaving			: playerSaving,
	errors				: playerErrors,
	isLoading			: playerListLoading,
	players				: playerList,
	selectedPlayer		: playerSelected,
	playerModalType		: playerModalType,
	playerName			: handleFormInputReducer("player_name"),
	chipCount			: handleFormInputReducer("chip_count"),
	playerFinished		: handleFormInputReducer("player_finished"),
	confirmDeleteModal 	: toggleModal("confirmDeletePlayerModal")
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
