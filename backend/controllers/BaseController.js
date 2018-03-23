class BaseController {

	constructor(req, res) {
		this.req = req;
		this.res = res;
	}

	parseError(err) {
		var errors = [];
		if(typeof err.errors !== 'undefined') {
			for(var key in err.errors) {
				if(typeof err.errors[key].message !== 'undefined') {
					errors.push(err.errors[key].message);
				}
			}
		}
		else if(typeof err.message !== 'undefined') {
			errors.push(err.message);
		}
		else {
			errors = err;
		}
		
		return errors;
	}

	respond(result, body) {

		if(result) {
			return this.res.json({ result, body });
		}
		else {

			if(this.req.method == "OPTIONS") {
				return this.res.json({ result: true });
			}
			else {
				return this.res.status(400).json({
					result,
					message: this.parseError(body)
				});
			}
		}
	}
}

module.exports = BaseController;
