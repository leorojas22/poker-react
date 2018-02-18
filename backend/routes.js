const CrudController = require(process.cwd() + "/controllers/CrudController.js");

module.exports = (app) => {
	app.get("/user", (req, res) => {		

		try {
			var crudController = new CrudController(req, res, {
				model: "user"
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
