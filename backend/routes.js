const CrudController = require(process.cwd() + "/controllers/CrudController.js");
const UserController = require(process.cwd() + "/controllers/UserController.js");
const verifyJWTMiddleware = require(process.cwd() + "/middleware/verifyJWT.js");


module.exports = (app) => {

	app.post("/model/user/login", (req, res) => {
		var userController = new UserController(req, res);
		return userController.login();
	});

	app.use("/model/user/status", verifyJWTMiddleware);
	app.get("/model/user/status", (req, res) => {
		// If it gets past the middleware, we are logged in
		return res.json({ result: true, user: req.user.toJson() });
	});

	app.use("/model/:modelName", verifyJWTMiddleware);
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
