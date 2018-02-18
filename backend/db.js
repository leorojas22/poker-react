const mongoose = require("mongoose");
mongoose.Promise = Promise;

mongoose.connect("mongodb://localhost:27017/sandbox_poker", {
	//useMongoClient: true,
	auth: { user: 'leo', password: 'leo'},
	promiseLibrary: global.Promise
}).catch( (err) => {
	console.log(err);
})

module.exports = mongoose;
