import React from 'react';
import { connect } from 'react-redux';
import { isEmpty, keys, map } from 'lodash';
import { apiRequests } from '../actions';
import { CARDS } from '../utilities/constants';

const mapStateToProps = ({ requests }) => {
	return { 
		joinRoomRequest: requests.joinRoom,
		createRoomRequest: requests.createRoom
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		createRoom: apiRequests.createRoom,
		joinRoom: apiRequests.joinRoom
	}
}

class JoinRoom extends React.Component {

	constructor(props) {
		super(props);

		this.joinRoom = this.joinRoom.bind(this);
		this.createRoom = this.createRoom.bind(this);
	}

	componentDidMount() {
		this.refs.txtRoomName.addEventListener('keyup', function (event) {
			if (event.keyCode === 13) {
				event.preventDefault();
				this.joinRoom();
			}
		}.bind(this));
	}

	// Join an existing poker room matching the given name
	// A participant is created with the given name
	joinRoom() {
		const participantName = this.refs.txtParticipantName.value,
			roomName = this.refs.txtRoomName.value;

		if (isEmpty(participantName) || isEmpty(roomName)) return;

		this.props.joinRoom({
			participantName,
			roomName
		});
	}

	// Create a new poker room with the givent name
	// Automatically joins room after creating a participant with the given name
	createRoom() {
		const participantName = this.refs.txtParticipantName.value.trim(),
			roomName = this.refs.txtRoomName.value.trim(),
			cardType = this.refs.ddCardType.value;

		if (isEmpty(participantName) || isEmpty(roomName)) return;

		this.props.createRoom({
			participantName,
			roomName,
			cardType
		});
	}
	
	// Renders the html for the entire 'Join Room' page
	// Dependencies = none
	render() {
		// Populate the cardType drop down with options listed as keys in the CARDS constant
		const cardTypeOptions = map(keys(CARDS), (cardType, index) =>{
			return <option key={index} value={cardType}>{cardType}</option>;
		});

		return (
			<div className="join-room-container">
				<input className="txt participant-name" ref="txtParticipantName" type="text" placeholder="Your name" label="Your name" tabIndex="1" autoFocus />
				<input className="txt room-name" ref="txtRoomName" type="text" placeholder="Room name" label="Room name" tabIndex="2" />
				<div className="btn join-room" tabIndex="3" onClick={this.joinRoom}>Join Room</div>
				<div className="btn create-room" tabIndex="4" onClick={this.createRoom}>Create Room</div>
				<label className="lbl card-type" htmlFor="ddCardType">Card Type:</label>
				<select className="dd card-type" ref="ddCardType" name="ddCardType">
					{ cardTypeOptions }
				</select>
			</div>
		);
	}
	
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinRoom);