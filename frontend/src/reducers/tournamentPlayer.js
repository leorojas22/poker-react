export const playerErrors = (state = [], action) => {
	switch(action.type) {
		case 'PLAYER_ERRORS':
			return action.errors;
		default:
			return state;
	}
}

export const playerSaving = (state = false, action) => {
	switch(action.type) {
		case 'PLAYER_SAVING':
			return action.status;
		default:
			return state;
	}
}

export const playerListLoading = (state = false, action) => {
	switch(action.type) {
		case 'PLAYER_LIST_LOADING':
			return action.status;
		default:
			return state;
	}
}

export const playerList = (state = [], action) => {
	switch(action.type) {
		case 'PLAYER_LIST':
			return action.playerList;
		default:
			return state;
	}
}

export const playerSelected = (state = [], action) => {
	switch(action.type) {
		case 'PLAYER_SELECTED':
			return action.player;
		default:
			return state;
	}
}

export function playerModalOpen(state = false, action) {
	switch(action.type) {
		case 'PLAYER_MODAL_OPEN':
			return action.status;
		default:
			return state;
	}
}

