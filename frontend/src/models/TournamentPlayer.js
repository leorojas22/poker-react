import BaseModel from './BaseModel';

class TournamentPlayer extends BaseModel {
	static get displayName() {
		return "tournament player";
	}

	static get modelName() {
		return "tournamentPlayer";
	}

	static validate(data = {}) {
		let errors = [];

		let hasName = typeof data.name !== 'undefined';
		let hasID = typeof data.id !== 'undefined';
		
		// Name is required if its one of the data elemnts given or if no ID is passed in the data object
		if(
			(hasName && data.name.trim() == "") || 
			(!hasName && (!hasID || (hasID && data.id.trim() == "")))
		) {
			errors.push("Name is required.");
		}

		// If chip count provided, it must be a number greater than 0
		if(typeof data.chip_count !== 'undefined' && (isNaN(data.chip_count) || (!isNaN(data.chip_count) && data.chip_count < 0))) {
			errors.push("Chip count must be a positive number.");
		}

		if(typeof data.tournament === 'undefined' || (typeof data.tournament !== 'undefined' && data.tournament.trim() == "")) {
			errors.push("Tournament is required.");
		}

		return errors;
	}
}

export default TournamentPlayer;
