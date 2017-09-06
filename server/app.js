const _ = require("lodash");
const path = require("path");
const bodyParser = require('body-parser');
const compression = require('compression');
const express = require("express");
const app = express();
const router = express.Router();
const roomManager = require("./roomManager");

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());

router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.post("/createRoom", function(req, res) {
	let roomName = req.body.roomName,
		participantName = req.body.participantName;

	if (!_.isEmpty(_.find(roomManager.getRooms(), {name: roomName}))) {
		res.status(409).end();
		return;
	}

	let newRoom = {
		name: roomName,
		owner: participantName,
		participants: [
			{
				name: participantName,
				itemScore: null
			}
		],
		item: null
	};
	
	roomManager.setRooms(_.concat(roomManager.getRooms(), newRoom));

	res.json({
		room: newRoom,
		timeStamp: Date.now()
	});
});

app.post("/joinRoom", function(req, res) {
	let roomName = req.body.roomName,
		participantName = req.body.participantName;

	let room = _.find(roomManager.getRooms(), {name: roomName});

	if (_.isEmpty(room)) {
		res.status(404).end();
		return;
	}

	if (!_.isEmpty(_.find(room.participants, {name: participantName}))) {
		res.status(409).end();
		return;
	}

	room.participants = _.concat(room.participants, {name: participantName, itemScore: null});

	res.json({
		room: room,
		timeStamp: Date.now()
	});
});

module.exports = app;
