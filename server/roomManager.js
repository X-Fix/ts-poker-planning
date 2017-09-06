const _ = require('lodash');
let _rooms = [];

module.exports.getRooms = function() {
	return _rooms;
}

module.exports.setRooms = function(rooms) {
	_rooms = rooms;
}

module.exports.removeRoom = function(roomName) {
	_rooms = _.filter(_rooms, (room) => {
		return !_.isEqual(room.name, roomName);
	});
	console.log("Room [" + roomName + "] removed");
}