const BaseController = require(process.cwd() + "/controllers/BaseController.js");


const modelList = {
	user: require(process.cwd() + "/models/User.js"),
};

class CrudController extends BaseController {

	constructor(req, res, options) {
		super(req, res);

		this.filterByUser = false;

		this.modelKey = typeof options.model !== 'undefined' ? options.model : null;
		if(this.modelKey && typeof modelList[this.modelKey] !== 'undefined') {
			this.Model = modelList[this.modelKey];
		}
		else {
			throw new Error("Invalid model name");
		}

		if(typeof this.Model.schema.paths.user !== 'undefined') {
			this.filterByUser = true;
		}

		if(this.filterByUser && typeof req.user === 'undefined') {
			throw new Error("Access denied.");
		}

	}

	create() {
		var writeData = this.req.query;

		if(this.filterByUser) {
			writeData.user = this.req.user._id;
		}
	
		return this.Model.create(writeData).then((model) => {
			return this.respond(true, model.toJson());
		})
		.catch((err) => {
			return this.respond(false, err);
		})

	}

}

module.exports = CrudController;
