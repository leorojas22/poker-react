const mongoose 		= require(process.cwd() + "/db.js");
const BaseModel 	= require(process.cwd() + "/models/BaseModel.js");
const User 			= require(process.cwd() + "/models/User.js");
//const TournamentPlayer = require(process.cwd() + "/models/TournamentPlayer.js");

const schema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: [true, 'User is required.']
	},
	name: {
		type: String,
		required: [true, 'Tournament name required.']
	},
	starting_chips: { 
		type: Number,
		min: [0, 'Negative starting chips is not allowed.']		
	},
	buyin: {
		type: Number,
		min: [0, 'Negative buy in is not allowed.']
	},
	started: Date,
	completed: Date,
	last_start_time: Date,
	paused: Date,
	blind_level_time: {
		type: Number,
		min: [0, 'Negative blind level time is not allowed.']
	},
	time_elapsed: {
		type: Number,
		min: [0, 'Negative time elapsed time is not allowed.']
	},
	payout_type: {
		type: Number,
		min: [1, 'Invalid payout type.'],
		max: [2, 'Invalid payout type.']	
	},
	payout_type_amount: {
		type: Number,
		min: [0, 'Negative payout type amount time is not allowed.']
	},
	deleted: Date
}, {
	timestamps: {
		createdAt: 'created',
		updatedAt: 'updated'
	}
});

class Tournament extends BaseModel {


	static validate(data) {

		var errors = [];

		var numericCheck = {
			starting_chips: 'Starting Chips',
			buyin: 'Buy In',
			payout_type: 'Payout Type',
			payout_type_amount: 'Payout Amount'
		}

		for(let property in numericCheck) {
			if(typeof data[property] !== 'undefined' && isNaN(data[property])) {
				let displayName = numericCheck[property];
				errors.push(displayName+" must be a numeric value.");
			}
		}

		return errors;
	}

	static searchableProperties() {
		return [
			'user'
		];
	}

	static settableProperties() {
		return [
			'user',
			'name',
			'starting_chips',
			'buyin',
			'started',
			'completed',
			'last_start_time',
			'paused',
			'blind_level_time',
			'time_elapsed',
			'payout_type',
			'payout_type_amount'
		];
	}

	toJson() {
		return {
			id					: this._id,
			user				: (this.user instanceof User) ? this.user.toJson() : this.user,
			name				: this.name,
			starting_chips		: this.starting_chips,
			buyin				: this.buyin,
			started				: typeof this.started !== 'undefined' ? this.completed : false,
			completed			: typeof this.completed !== 'undefined' ? this.completed : false,
			last_start_time		: typeof this.last_start_time !== 'undefined' ? this.last_start_time : null,
			paused				: typeof this.paused !== 'undefined' ? this.paused : false,
			blind_level_time	: this.blind_level_time,
			time_elapsed		: typeof this.time_elapsed !== 'undefined' ? this.time_elapsed : 0,
			payout_type			: this.payout_type,
			payout_type_amount	: this.payout_type_amount,
			created				: this.created,
			updated				: this.updated,
			players				: []//this.getPlayers()
		}
	}

	/*
	async getPlayers(json = false) {
		return await TournamentPlayer.find({
			deleted: null,
			tournament: this._id
		}).then(players => {
			console.log("TEST");
			console.log(players);
			if(players.length > 0) {
				if(json) {
					return players.map((player, index) => {
						return player.toJson();
					});
				}
				else {
					return players;
				}
			}

			return [];
		});
	
	}
	*/
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

schema.loadClass(Tournament);

module.exports = mongoose.model("Tournament", schema);
