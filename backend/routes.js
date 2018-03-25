const BaseController = require(process.cwd() + "/controllers/BaseController.js");
const CrudController = require(process.cwd() + "/controllers/CrudController.js");
const UserController = require(process.cwd() + "/controllers/UserController.js");
const verifyJWTMiddleware = require(process.cwd() + "/middleware/verifyJWT.js");


const crudRoute = (req, res, cb) => {
	try {
		let crudController = new CrudController(req, res);
		return cb(crudController);
	}
	catch(e) {
		console.log(e);
		res.status(400);
		let controller = new BaseController(req, res);
		return controller.respond(false, e);
	}
}

module.exports = (app) => {

	app.post("/model/user/login", (req, res) => {
		let userController = new UserController(req, res);
		return userController.login();
	});

	app.use("/model/user/status", verifyJWTMiddleware);
	app.get("/model/user/status", (req, res) => {
		// If it gets past the middleware, we are logged in
		return res.json({ result: true, user: req.user.toJson() });
	});

	app.use("/model/:modelName", verifyJWTMiddleware);
	app.get("/model/:modelName", (req, res) => crudRoute(req, res, (controller) => {
		return controller.read();
	}));

	app.post("/model/:modelName", (req, res) => crudRoute(req, res, (controller) => {
		return controller.create();
	}));

	app.patch("/model/:modelName/:modelID", (req, res) => crudRoute(req, res, (controller) => {
		return controller.update();
	}));

	app.delete("/model/:modelName/:modelID", (req, res) => crudRoute(req, res, (controller) => {
		return controller.delete();
	}));
}
