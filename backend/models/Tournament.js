const mongoose 		= require(process.cwd() + "/db.js");
const BaseModel 	= require(process.cwd() + "/models/BaseModel.js");
const User 			= require(process.cwd() + "/models/User.js");

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
		min: [2, 'Invalid payout type.']	
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

	static searchableProperties() {
		return [
			'user'
		];
	}

	static settableProperties() {
		return [
			'user',
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
			starting_chips		: this.starting_chips,
			buyin				: this.buyin,
			started				: this.started,
			completed			: this.completed,
			last_start_time		: this.last_start_time,
			paused				: this.paused,
			blind_level_time	: this.blind_level_time,
			time_elapsed		: this.time_elapsed,
			payout_type			: this.payout_type,
			payout_type_amount	: this.payout_type_amount,
			created				: this.created,
			updated				: this.updated
		}
	}
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
