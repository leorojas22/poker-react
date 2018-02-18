export const ajaxHelper = (url, options) => {

	if(typeof options.credentials === 'undefined') {
		options.credentials = 'include';
	}

	if(typeof options.method !== 'undefined' && (options.method == 'POST' || options.method == 'PUT')) {
		if(typeof options.headers !== 'undefined' && typeof options.headers['Content-Type'] === 'undefined') {
			// Content-Type header not set, but headers are set
			options.headers['Content-Type'] = 'application/json';
		}
		else if(typeof options.headers === 'undefined') {
			// No headers set
			options.headers = {
				'Content-Type': 'application/json'
			}
		}

		if(typeof options.body !== 'undefined' && typeof options.body !== 'String') {
			// body not a string
			options.body = JSON.stringify(options.body);
		}
	}

	return fetch(API_URL+url, options)
	.then((data) => {
		return data.json();
	})
	.then((data) => {
		if(data.result) {
			return Promise.resolve(data);
		}
		else {
			return Promise.reject(data);
		}
	});
}
