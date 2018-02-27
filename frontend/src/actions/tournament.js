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

export function loadTournamentList() {
	return (dispatch) => {
		dispatch(tournamentListLoading(true));
		Tournament.find().then(tournaments => {
			dispatch(tournamentListLoading(false));
			return dispatch(tournamentList(tournaments));
		})
		.catch(err => {
			dispatch(tournamentListLoading(false));
			return dispatch(tournamentList([]));
		});
	}
}
