const BaseController = require(process.cwd() + "/controllers/BaseController.js");


const modelList = {
	user				: require(process.cwd() + "/models/User.js"),
	tournament			: require(process.cwd() + "/models/Tournament.js"),
	tournamentPlayer	: require(process.cwd() + "/models/TournamentPlayer.js")
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
			throw new Error("Invalid model name: "+this.modelKey);
		}

		if(typeof this.Model.schema.paths.user !== 'undefined') {
			this.filterByUser = true;
		}

		if(this.filterByUser && typeof req.user === 'undefined') {
			throw new Error("Access denied.");
		}

	}

	create() {
		var writeData = this.req.body;

		if(this.filterByUser) {
			writeData.user = this.req.user._id;
		}
	
		return this.Model.create(writeData).then((model) => {
			model.afterCreateHook(this.req, this.res);
			return this.respond(true, model.toJson());
		})
		.catch((err) => {
			console.log(err);
			return this.respond(false, err);
		})

	}

	read() {
		var self = this;
		var searchData = this.req.query;

		if(this.filterByUser) {
			searchData.user = this.req.user._id;
		}

		return this.Model.search(searchData).then((models) => {
			var filteredModels = models.map((model, index) => {
				return model.toJson();
			});

			if(typeof searchData.id !== 'undefined') {
				// Return single object instead of array when searching by id
				filteredModels = filteredModels.shift();
			}

			return self.respond(true, filteredModels);
		})
		.catch(err => {
			return self.respond(false, err);
		});

	}

}

module.exports = CrudController;
