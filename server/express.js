const _ = require("lodash");
const path = require("path");
const compression = require('compression');
const express = require("express");
const app = express();
const expressRoutes = require('./routes/expressRoutes');
const errorHandler = require('./utilities/errorHandler');
const PRODUCTION = (process.env.NODE_ENV === "production");

function serveIndex(req, res) {
	const indexFileName = PRODUCTION ? "index.html" : "index.dev.html";
	res.sendFile(path.join(__dirname, "../public", indexFileName));
}

app.use(compression());
app.use(express.static("public", { index: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", serveIndex);

_.forEach(_.keys(expressRoutes), (routeName) => {
	app.post("/"+routeName, (req, res) => {
		try {
			expressRoutes[routeName](req, res);
		} catch (e) {
			errorHandler.handle(e, {response: res});
			console.log(e.type, e.message, e.status, e.stack||"");
		}
	})
});

module.exports = app;
