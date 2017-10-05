const _ = require('lodash');
const HTTP_STATUS = require('./constants').HTTP_STATUS;
const ERRORS = require('./constants').ERRORS;

const errorHandler = {

	handle: function(error, { response, socket, io }) {
		console.log(error.message, error.stack||"");
		if (socket && io) {

			if (io.sockets.connected[socket.conn.id]) {
				io.sockets.connected[socket.conn.id]
				.emit("broke", error);
			}

		} else if (response) {
			if (error.stack) {
				response.status(500);
				response.send({
					stack: error.stack
				});
			} else {
				response.status(error.status);
				response.send({
					message: error.status,
					errorType: error.type
				});
			}
		}
	}

}

module.exports = errorHandler;