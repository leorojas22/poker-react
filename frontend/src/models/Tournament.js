import { ajaxHelper } from '../helpers/ajax';
import parseError from '../helpers/parseError';
import BaseModel from './BaseModel';

class Tournament extends BaseModel {
	static get displayName() {
		return "tournament";
	}

	static get modelName() {
		return "tournament";
	}


	static validate(data = {}) {
		var requiredProps = {
			name: 'Tournament Name',
			starting_chips: 'Starting Chips',
			buyin: 'Buy In',
			blind_level_length: 'Blind Level Length',
			payout_type: 'Payout Type',
			payout_amount: 'Pay Top Amount'
		}

		var numericProps = {
			starting_chips: 'Starting Chips',
			buyin: 'Buy In',
			blind_level_length: 'Blind Level Length',
			payout_type: 'Payout Type',
			payout_amount: 'Pay Top Amount'
		}

		var errors = [];
		console.log(data);

		for(let property in requiredProps) {
			if(typeof data[property] !== 'undefined' && (data[property]+"").trim() === "") {
				errors.push(requiredProps[property]+" is required.");
			}
		}

		for(let property in numericProps) {
			if(typeof data[property] !== 'undefined' && isNaN(data[property])) {
				errors.push(numericProps[property]+" must be a number.");
			}
		}

		return errors;

	}
}

// Class constants
Object.defineProperty(Tournament, 'PAYOUT_TYPE_PERCENTAGE', {
	value: 1,
	writable: false
});

Object.defineProperty(Tournament, 'PAYOUT_TYPE_FIXED', {
	value: 2,
	writable: false
});


export default Tournament;
