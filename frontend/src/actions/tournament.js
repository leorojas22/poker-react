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

export function tournamentIsLoading(status) {
	return {
		type: 'TOURNAMENT_LOADING',
		status
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

export function tournamentCreated(created) {
	return {
		type: 'TOURNAMENT_CREATED',
		created
	}
}

export function loadFullTournament(tournamentID) {
	return (dispatch) => {

		dispatch(tournamentIsLoading(true));
		dispatch(selectTournamentErrors(false));
		return Tournament.find({ id: tournamentID }).then(tournament => {
			if(typeof tournament.id === 'undefined') {
				return Promise.reject(["Tournament not found."]);
			}

			dispatch(selectedTournament(tournament));
			dispatch(tournamentIsLoading(false));
			return Promise.resolve();
		})
		.catch(err => {
			console.log(err);
			dispatch(selectTournamentErrors(err));
			return Promise.reject();
		});
	}
}

export function saveTournament(tournamentObj) {
	return (dispatch) => {

		// Validate the information in the tournament object
		var errors = Tournament.validate(tournamentObj);
		if(errors.length > 0) {
			dispatch(tournamentErrors(errors));
			return Promise.reject(errors);
		}

		// Tournament is currently saving...
		dispatch(savingTournament(true));

		// Clear tournament errors
		dispatch(tournamentErrors([]));
		
		let funcName = typeof tournamentObj.id === 'undefined' ? "create" : "update";

		return Tournament[funcName](tournamentObj).then(tournament => {

			// Tournament finished saving
			dispatch(savingTournament(false));

			// Select the tournament
			dispatch(selectedTournament(tournament));

			return Promise.resolve(tournament);
		})
		.catch(err => {
			console.log("ERRORS");
			console.log(err);
			// Tournament finished saving
			dispatch(savingTournament(false));

			// Set errors
			dispatch(tournamentErrors(err));

			return Promise.reject(err);
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
