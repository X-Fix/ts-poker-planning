const _ = require("lodash");
const path = require("path");
const bodyParser = require('body-parser');
const compression = require('compression');
const express = require("express");
const app = express();
const router = express.Router();
const expressRoutes = require('./routes/expressRoutes');
const errorHandler = require('./utilities/errorHandler');

app.use(compression());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function serveIndex(req, res) {
	res.sendFile(path.join(__dirname, "../public/index.html"));
}

// If production, use static file caching
// Else allow for file updates to reflect without restarting server
if (process.env.NODE_ENV === "production") {
	app.get("/", serveIndex);
} else {
	router.get("/", serveIndex);
}

_.forEach(_.keys(expressRoutes), (routeName) => {
	app.post("/"+routeName, (req, res) => {
		try {
			expressRoutes[routeName](req, res);
		} catch (e) {
			errorHandler.handle(e, {response: res});
			console.log(e.type, e.message, e.status, e.stack);
		}
	})
});

app.post("/createRoom", expressRoutes.createRoom);
app.post("/joinRoom", expressRoutes.joinRoom);

module.exports = app;
