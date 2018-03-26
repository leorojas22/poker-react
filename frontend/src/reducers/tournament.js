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

export function tournamentIsSaving(state = false, action) {
	switch(action.type) {
		case 'TOURNAMENT_IS_SAVING':
			return action.status;
		default:
			return state;
	}
}

export function tournamentSelected(state = false, action) {
	switch(action.type) {
		case 'TOURNAMENT_SELECTED':
			return action.tournament;
		default:
			return state;
	}
}

export function tournamentErrors(state = [], action) {
	switch(action.type) {
		case 'TOURNAMENT_ERRORS':
			return action.errors;
		default:
			return state;
	}
}

export function tournamentSelectedError(state = false, action) {
	switch(action.type) {
		case 'TOURNAMENT_SELECTED_ERRORS':
			return action.errors;
		default:
			return state;
	}
}

export function tournamentCreated(state = false, action) {
	switch(action.type) {
		case 'TOURNAMENT_CREATED':
			return action.created;
		default:
			return state;
	}
}

export function tournamentIsLoading(state = false, action) {
	switch(action.type) {
		case 'TOURNAMENT_LOADING':
			return action.status;
		default:
			return state;
	}
}

