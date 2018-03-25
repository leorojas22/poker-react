const moment = require("moment");
const mongoose = require(process.cwd() + "/db.js");
class BaseModel {


	static validate(data) {
		return [];
	}

	static filterWriteData(data) {
		var writeData = {};
		var settableProperties = this.settableProperties();

		for(let x in settableProperties) {
			let property = settableProperties[x];
			if(typeof data[property] !== 'undefined') {
				writeData[property] = data[property];
			}
		}

		return writeData;
	}

	static create(data) {
		let writeData = this.filterWriteData(data);

		let errors = this.validate(writeData);
		console.log(errors);
		if(errors.length == 0) {

			console.log(writeData);
			var model = new this(writeData);
			return model.save();
		}
		else {
			return Promise.reject(errors);
		}
	}

	static searchableProperties() {
		return [];
	}

	static settableProperties() {
		return [];
	}

	delete(permanant = false) {
		if(!permanant) {
			this.deleted = new Date();
			return this.save();
		}
		else {
			return this.remove();
		}
	}

	undelete() {
		this.deleted = undefined;
		return this.save();
	}

	toJson() {
		return {};
	}

	static search(searchValues) {
		var searchableProperties = this.searchableProperties();
		var where = {};

		if(typeof searchValues.id !== 'undefined' && mongoose.Types.ObjectId.isValid(searchValues.id)) {
			where._id = searchValues.id;
		}
		else if(typeof searchValues.id !== 'undefined' && !mongoose.Types.ObjectId.isValid(searchValues.id)) {
			return Promise.reject("Invalid object id.");
		}

		if(typeof searchValues.date !== 'undefined' && searchableProperties.indexOf("created") !== -1) {
			console.log(moment(searchValues.date).toDate());
			console.log(new Date());
			var dayStart 	= moment(searchValues.date).utc().startOf("day");
			var dayEnd 		= moment(searchValues.date).utc().endOf("day");

			where['created'] = {
				$gte: dayStart.toDate(),
				$lte: dayEnd.toDate()
			}
		}

		var orderBy = false;
		if(typeof searchValues.orderBy !== 'undefined') {
			orderBy = searchValues.orderBy;
		}

		for(var x in searchableProperties) {
			var property = searchableProperties[x];
			if(typeof searchValues[property] !== 'undefined') {
				where[property] = searchValues[property];
			}
		}

		where.deleted = undefined;
		var returnVal = this.find(where);
		if(orderBy) {
			returnVal.sort(orderBy);
		}
		else {
			console.log("NO ORDER");
		}

		return returnVal;
	}

	setPropertyValues(propertyValues) {
		var settableProperties = this.constructor.settableProperties();
		for(var x in settableProperties) {
			var property = settableProperties[x];
			if(typeof propertyValues[property] !== 'undefined') {
				this[property] = propertyValues[property];
			}
		}

		return this;
	}

	static displayName() {
		return "";
	}

	afterCreateHook(req, res) {
		
	}

}

module.exports = BaseModel;
