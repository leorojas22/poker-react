const CrudController = require(process.cwd() + "/controllers/CrudController.js");
const UserController = require(process.cwd() + "/controllers/UserController.js");

module.exports = (app) => {

	app.get("/user/login", (req, res) => {
		var userController = new UserController(req, res);
		return userController.login();
	});

	app.get("/model/:modelName", (req, res) => {		

		var modelName = req.params.modelName;
		try {
			var crudController = new CrudController(req, res, {
				model: modelName
			});
			return crudController.read();
		}
		catch(e) {
			console.log(e);
			res.status(400);
			return res.json({ result: false, message: "Error" });
		}

	});

	app.post("/model/:modelName", (req, res) => {
		var modelName = req.params.modelName;
		try {
			var crudController = new CrudController(req, res, {
				model: modelName
			});
			return crudController.create();
		}
		catch(e) {
			console.log(e);
			res.status(400);
			return res.json({ result: false, message: "Error" });
		}
	});
}
