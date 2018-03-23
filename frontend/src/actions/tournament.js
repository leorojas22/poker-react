import Tournament from '../models/Tournament';

export function tournamentListLoading(status) {
	return {
		type: 'TOURNAMENT_LIST_LOADING',
		status
	}
}

export function tournamentList(tournaments) {
	return {
		type: 'TOURNAMENT_LIST_LOADED',
		tournaments
	}
}

export function savingTournament(status) {
	return {
		type: 'TOURNAMENT_IS_SAVING',
		status
	}
}

export function tournamentErrors(errors) {
	return {
		type: 'TOURNAMENT_ERRORS',
		errors
	}
}

export function selectedTournament(tournament) {
	return {
		type: 'TOURNAMENT_SELECTED',
		tournament
	}
}

export function selectTournamentErrors(errors) {
	return {
		type: 'TOURNAMENT_SELECTED_ERRORS',
		errors
	}
}

export function loadFullTournament(tournamentID) {
	return (dispatch) => {

		Tournament.find({ id: tournamentID }).then(tournament => {
			return dispatch(selectedTournament(tournament));
		})
		.catch(err => {
			return dispatch(selectTournamentErrors(err));
		});
	}
}

export function createTournament(tournamentObj) {
	return (dispatch) => {

		// Validate the information in the tournament object
		var errors = Tournament.validate(tournamentObj);
		if(errors.length > 0) {
			return dispatch(tournamentErrors(errors));
		}

		// Tournament is currently saving...
		dispatch(savingTournament(true));

		console.log("TEST");
		// Clear tournament errors
		dispatch(tournamentErrors([]));
		
		Tournament.create(tournamentObj).then(tournament => {

			// Tournament finished saving
			dispatch(savingTournament(false));

			// Select the tournament
			return dispatch(selectedTournament(tournament));
		})
		.catch(err => {
			console.log("ERRORS");
			console.log(err);
			// Tournament finished saving
			dispatch(savingTournament(false));

			// Set errors
			return dispatch(tournamentErrors(err));
		})
	}
}


export function loadTournamentList() {
	return (dispatch) => {

		// Show that the tournament list is loading
		dispatch(tournamentListLoading(true));
		Tournament.find().then(tournament => {

			// Tournament list no longer loading
			dispatch(tournamentListLoading(false));

			// Return tournament list
			return dispatch(tournamentList(tournament));
		})
		.catch(err => {

			// Tournament list is no longer loading
			dispatch(tournamentListLoading(false));

			// Return empty tournament list
			return dispatch(tournamentList([]));
		});
	}
}
