const API_ENDPOINTS = {
	joinRoom: "/joinRoom",
	createRoom: '/createRoom',
	leaveRoom: '/leaveRoom'
};

const CARDS = {
	fibonacci: ["?", "1", "2", "3", "5", "8", "13", "21"],
	consecutive: ["?", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"]
};

const ERROR_MESSAGES = {
	createRoom: {
		409: "A room with that name already exists"
	},
	joinRoom: {
		404: "No room exists with that name",
		409: "A participant with that name already exists in this room"
	}
};

export { 
	API_ENDPOINTS,
	CARDS,
	ERROR_MESSAGES
};