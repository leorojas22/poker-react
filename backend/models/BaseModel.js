const moment = require("moment");

class BaseModel {

	static create(data) {
		var model = new this(data);
		return model.save();
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

	static search(where) {
		var searchableProperties = this.searchableProperties();
		if(typeof where.date !== 'undefined' && searchableProperties.indexOf("created") !== -1) {
			var dayStart 	= moment(where.date).startOf("day");
			var dayEnd 		= moment(where.date).endOf("day");
			where['created'] = {
				"$gte": dayStart.toDate(),
				"$lte": dayEnd.toDate()
			}

			delete where.date;
		}
		else {
			console.log("no date");
		}

		console.log(where);

		
		var orderBy = false;
		if(typeof where.orderBy !== 'undefined') {
			orderBy = where.orderBy;
			delete where.orderBy;
		}

		var returnVal = this.find(where);
		if(orderBy) {
			console.log(orderBy);
			returnVal.sort(orderBy);
		}
		else {
			console.log("NO ORDER");
		}

		return returnVal;
	}

	setPropertyValues(propertValues) {
		var settableProperties = this.constructor.settableProperties();
		for(var x in settableProperties) {
			var property = settableProperties[x];
			if(typeof propertValues[property] !== 'undefined') {
				this[property] = propertValues[property];
			}
		}

		return this;
	}

	static displayName() {
		return "";
	}

}

module.exports = BaseModel;
