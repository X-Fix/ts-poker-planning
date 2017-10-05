const _             = require("lodash");
const http          = require("http").Server(require("./express"));
const io            = require("socket.io")(http);
const errorHandler  = require('./utilities/errorHandler');
const jobRunner     = require('./utilities/jobRunner');
const socketRoutes  = require('./routes/socketRoutes');

io.on("connection", function(socket) {
    console.log("User connected", socket.conn.id);
    let _roomId;

    _.forEach(_.keys(socketRoutes), (routeName) => {
        socket.on(routeName, (data) => {

        	switch (routeName) {
        		case "subscribe":
        			_roomId = data.roomId;
        			break;
        		case "disconnect":
        			data = {
        				roomId: _roomId
        			}
        			break;
        	}

            try {
                socketRoutes[routeName](data, socket, io);
            } catch (e) {
            	errorHandler.handle(e, { socket: socket, io: io});
            	console.log(e.type, e.message, e.status, e.stack);
            }
        })
    });
});

jobRunner();

module.exports = http;
