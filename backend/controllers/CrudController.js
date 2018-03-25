const BaseController = require(process.cwd() + "/controllers/BaseController.js");


const modelList = {
	user				: require(process.cwd() + "/models/User.js"),
	tournament			: require(process.cwd() + "/models/Tournament.js"),
	tournamentPlayer	: require(process.cwd() + "/models/TournamentPlayer.js")
};

class CrudController extends BaseController {

	constructor(req, res) {
		super(req, res);

		this.filterByUser = false;

		this.modelKey = typeof req.params.modelName !== 'undefined' ? req.params.modelName : null;
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

	update() {
		let writeData = this.req.body;
		let searchData = {};

		if(this.filterByUser) {
			writeData.user 	= this.req.user._id;
			searchData.user = writeData.user;
		}

		if(typeof this.req.params.modelID === 'undefined' || (typeof this.req.params.modelID !== 'undefined' && this.req.params.modelID === "")) {
			throw new Error("A " + this.Model.displayName() + " ID is required.");
		}

		// Validate data sent based on model
		let validationErrors = this.Model.validate(writeData);
		if(validationErrors.length > 0) {
			return this.respond(false, validationErrors);
		}

		// Data validated - continue with save

		// Find the non-deleted model based on the ID and if applicable, user ID
		searchData._id 		= this.req.params.modelID;
		searchData.deleted 	= undefined;

		return this.Model.find(searchData).then((result) => {
			if(result.length === 1) {
				// Found model to update
				return result[0];
			}
			else {
				// Somehow multiple models found with this id - prevent from continuing
				return Promise.reject("Multiple " + this.Model.displayName() + " with that ID found.");
			}
		})
		.then((model) => {
			// Update model
			return model.setPropertyValues(writeData).save();
		})
		.then(model => {
			return this.respond(true, model.toJson());
		})
		.catch(err => {
			console.log(err);
			return this.respond(false, err);
		});
	}

	delete() {
		this.req.body = {
			deleted: new Date()
		}

		return this.update();
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
