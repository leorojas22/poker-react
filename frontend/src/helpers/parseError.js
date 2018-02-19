// Ensure that all errors are arrays

const parseError = (err, defaultMessage) => {
	var errors = [];
	
	if(typeof err.message !== 'undefined') {
		if(Array.isArray(err.message)) {
			errors = err.message
		}
		else {
			errors = [err.message]
		}
	}
	else {
		errors = [defaultMessage];
	}

	return errors;
}

export default parseError;
