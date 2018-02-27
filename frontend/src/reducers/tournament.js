export function tournamentListLoading(state = true, action) {
	switch(action.type) {
		case 'TOURNAMENT_LIST_LOADING':
			return action.status;
		default:
			return state;
	}
}

export function tournamentList(state = [], action) {
	switch(action.type) {
		case 'TOURNAMENT_LIST_LOADED':
			return action.tournaments;
		default:
			return state;
	}
}
