import { ajaxHelper } from '../helpers/ajax';
import parseError from '../helpers/parseError';

class BaseModel {

	static get displayName() {
		return "model";
	}

	static get modelName() {
		throw new Error("Model name not set.");
	}

	static find(where = {}) {
		console.log(where);
		return ajaxHelper("/model/"+this.modelName, {
			method: 'GET',
			params: where
		})
		.then(result => {
			return result.body;
		})
		.catch(err => {
			console.log(err);
			let errors = parseError(err, "Error fetching "+this.displayName+".");
			return Promise.reject(errors);
		})
	}

	static create(props = {}) {
		return ajaxHelper("/model/"+this.modelName, {
			method: 'POST',
			body: props
		})
		.then(result => {
			return result.body;
		})
		.catch(err => {
			console.log(err);
			let errors = parseError(err, "Error creating "+this.displayName+".'");
			return Promise.reject(errors);
		})
	}

	static validate(data = {}) {
		return [];
	}

}

export default BaseModel;
