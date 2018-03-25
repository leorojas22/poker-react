const mongoose 	= require(process.cwd() + "/db.js");
const BaseModel = require(process.cwd() + "/models/BaseModel.js");
const Tournament = require(process.cwd() + "/models/Tournament.js");
const User = require(process.cwd() + "/models/User.js");

const schema = new mongoose.Schema({
	tournament: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Tournament',
		required: [true, 'Tournament is required.']
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: [true, 'User is required.']
	},
	name: {
		type: String,
		required: [true, 'Name is required.']
	},
	chip_count: {
		type: Number,
		min: [0, 'Negative numbers are not allowed']
	},
	finished: Date,
	deleted: Date
}, {
	timestamps: {
		createdAt: 'created',
		updatedAt: 'updated'
	}
});

class TournamentPlayer extends BaseModel {
	static searchableProperties() {
		return [
			'user',
			'tournament'
		];
	}

	static settableProperties() {
		return [
			'user',
			'tournament',
			'name',
			'chip_count',
			'finished',
			'deleted'
		];
	}

	static create(data) {	

		if(typeof data.tournament !== 'undefined') {

			let populateChipCount = typeof data.chip_count === 'undefined' ? 
				Tournament.find({ _id: data.tournament }).then((result) => {
					if(result.length === 1 && typeof result[0].starting_chips !== 'undefined') {
						data.chip_count = result[0].starting_chips;
					}

					return data;
				})
			:
			Promise.resolve(data);

			return populateChipCount.then(dataWithChipCount => super.create(dataWithChipCount));
		}
		else {
			return Promise.reject("Tournament is required.");
		}
	}

	setPropertyValues(values) {

		if(typeof values.finished !== 'undefined' && !this.finished && values.finished === true) {
			// Player has not yet been marked as finished
			values.finished = new Date();
			values.chip_count = 0;
		}
		else if(typeof values.finished !== 'undefined' && values.finished === false) {
			values.finished = null;
		}
		else if(this.finished) {
			// Make sure chip count remains 0 if the player is finished
			values.finished = this.finished;
			values.chip_count = 0;
		}
		


		console.log(values);
		return super.setPropertyValues(values);
	}

	toJson() {
		return {
			id			: this._id,
			user		: (this.user instanceof User) 		? this.user.toJson() 		: this.user,
			tournament	: (this.tournament instanceof User) ? this.user.toJson() 		: this.user,
			name		: typeof this.name !== 'undefined' 			? this.name 		: "",
			chip_count	: typeof this.chip_count !== 'undefined' 	? this.chip_count 	: 0,
			finished	: typeof this.finished !== 'undefined' 		? this.finished 	: null,
			created		: typeof this.created !== 'undefined' 		? this.created 		: null,
			updated		: typeof this.updated !== 'undefined' 		? this.updated 		: null,
		}
	}

	static search(searchValues) {
		if(typeof searchValues.orderBy === 'undefined') {
			searchValues.orderBy = {
				chip_count: 'desc',
				finished: 'desc',
				name: 'asc'
			}
		}

		return super.search(searchValues);
	}

	static displayName() {
		return "Tournament Player";
	}

}

schema.loadClass(TournamentPlayer);

module.exports = mongoose.model("TournamentPlayer", schema);
