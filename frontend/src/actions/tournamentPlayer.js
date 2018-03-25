import TournamentPlayer from '../models/TournamentPlayer';

import { toggleModal } from './modal';

export const playerErrors = (errors) => ({
	type: 'PLAYER_ERRORS',
	errors
});

export const savingPlayer = (status) => ({
	type: 'PLAYER_SAVING',
	status
});

export const loadingPlayerList = (status) => ({
	type: 'PLAYER_LIST_LOADING',
	status
});

export const playerList = (playerList) => ({
	type: 'PLAYER_LIST',
	playerList
})

export const selectPlayer = (player) => ({
	type: 'PLAYER_SELECTED',
	player
});

export function openPlayerModal(status) {
	return {
		type: 'PLAYER_MODAL_OPEN',
		status
	}
}

export function setPlayerModalType(modalType) {

	console.log(modalType);
	return {
		type: 'PLAYER_MODAL_TYPE',
		modalType
	}
}

export const savePlayer = (player) => {
	return (dispatch) => {
		let errors = TournamentPlayer.validate(player);
		if(errors.length > 0) {
			console.log(errors);
			return dispatch(playerErrors(errors));
		}
		
		let funcName = typeof player.id === 'undefined' ? "create" : (typeof player.deleted === 'undefined' ? "update" : "delete");

		dispatch(playerErrors([]));
		dispatch(savingPlayer(true));
		TournamentPlayer[funcName](player).then(result => {
			dispatch(savingPlayer(false));
			dispatch(toggleModal(false, "playerModal"));
			dispatch(toggleModal(false, "confirmDeletePlayerModal"));
			return dispatch(loadPlayers(player.tournament));
		})
		.catch(err => {
			console.log(err);
			dispatch(savingPlayer(false));
			dispatch(playerErrors(err));
			return Promise.reject(err);
		});
	}
}

export const loadPlayers = (tournamentID) => {
	return (dispatch) => {
		
		dispatch(loadingPlayerList(true));
		TournamentPlayer.find({ tournament: tournamentID }).then(players => {
			dispatch(loadingPlayerList(false));
			return dispatch(playerList(players));
		})
		.catch(err => {
			dispatch(loadingPlayerList(false));
			return dispatch(playerList([]));
		});
	}
} 
