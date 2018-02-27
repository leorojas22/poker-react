import { ajaxHelper } from '../helpers/ajax';
import parseError from '../helpers/parseError';

class Tournament {
	static find(where = {}) {
		return ajaxHelper("/model/tournament", {
			method: 'GET',
			body: where
		})
		.catch(err => {
			console.log(err);
			var errors = parseError(err, "Error fetching tournament list.");
			return Promise.reject(errors);
		})
	}
}

export default Tournament;
