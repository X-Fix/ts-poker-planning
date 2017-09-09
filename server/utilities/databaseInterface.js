const _ = require('lodash');
const HTTP_STATUS = require('./constants').HTTP_STATUS;
const ERRORS = require('./constants').ERRORS;

let _rooms = {};

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

const TIMEOUT_LIMIT = 1000;

const db = {

    getRoomId: function(roomName) {
        const roomIds = _.keys(_rooms);

        let currentRoomId;
        for (let i = 0; i < roomIds.length; i++) {
            currentRoomId = roomIds[i];
            if (_.isEqual(_rooms[currentRoomId].name, roomName)) {
                return currentRoomId;
            }
        }
        return null;
    },

    checkOutRoom: function(roomId) {
        const room = _rooms[roomId];

        if (room === undefined) {
            throw {
                type: ERRORS.CLIENT_ERROR,
                message: "Invalid roomId for 'checkOutRoom'",
                status: HTTP_STATUS.BAD_REQUEST
            };
        }

        let timer = 0;
        while (room.isLocked) {
            sleep(5);
            timer += 5;
            if (timer >= TIMEOUT_LIMIT) {
                room.isLocked = false;
                throw {
                    type: ERRORS.SERVER_ERROR,
                    message: "Room lock timeout ( "+TIMEOUT_LIMIT+"s )",
                    status: HTTP_STATUS.GATEWAY_TIMEOUT
                };
            }   
        }

        room.isLocked = true;
        return room;
    },

    checkInRoom: function(roomId) {
        const room = _rooms[roomId];

        if (_.isEmpty(room)) {
            throw {
                type: ERRORS.CLIENT_ERROR,
                message: "Invalid roomId for 'checkInRoom'",
                status: HTTP_STATUS.BAD_REQUEST
            }
        }

        room.isLocked = false;
    },

    saveRoom: function(room) {
        _rooms[room.id] = room;
        return room;
    },

    deleteRoom: function(roomId) {
        delete _rooms[roomId];
    }
}

module.exports = db;