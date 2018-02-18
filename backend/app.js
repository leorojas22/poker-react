const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const mongoose = require(process.cwd() + "/db.js");
const cookieParser = require("cookie-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(helmet());
app.use(cookieParser());

app.get("/", (req, res) => {
	res.send("HI");
});

const routes = require(process.cwd() + "/routes.js");

routes(app);

app.listen(3000, () => {
	console.log("Started");
});
