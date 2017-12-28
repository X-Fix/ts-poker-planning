import React from 'react';
import { connect } from 'react-redux';
import isEmpty 	from 'lodash/isEmpty';
import keys 	from 'lodash/keys';
import map 		from 'lodash/map';
import { apiRequests } from '../api';
import { CARDS } from '../utilities/constants';
import { getQueryParam } from '../utilities/helperMethods';

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

		this.state = {
			autoJoinRoomName: getQueryParam("autoJoinRoomName")
		};

		this.joinRoom = this.joinRoom.bind(this);
		this.createRoom = this.createRoom.bind(this);
	}

	componentDidMount() {
		this.refs.txtParticipantName.addEventListener('keyup', function (event) {
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
			roomName = this.state.autoJoinRoomName || this.refs.txtRoomName.value;

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
				{
					isEmpty(this.state.autoJoinRoomName) ?
					<div>
						<label className="lbl room-name">Room Name</label>
						<input className="txt room-name" ref="txtRoomName" type="text" placeholder="Room name" tabIndex="1" autoFocus />
						<label className="lbl participant-name">Your Name</label>
						<input className="txt participant-name" ref="txtParticipantName" type="text" placeholder="Your name" tabIndex="2" />
						<label className="lbl card-type" htmlFor="ddCardType">Card Type:</label>
						<select className="dd card-type" ref="ddCardType" name="ddCardType">
							{ cardTypeOptions }
						</select>
						<div className="btn create-room" tabIndex="4" onClick={this.createRoom}>Create Room</div>
					</div>
					:
					<div>
						<label className="lbl room-name">Room Name</label>
						<div className="dsply room-name">{this.state.autoJoinRoomName}</div>
						<label className="lbl participant-name">Your Name</label>
						<input className="txt participant-name" ref="txtParticipantName" type="text" placeholder="Your name" tabIndex="2" autoFocus />
					</div>
				}
				<div className="btn join-room" tabIndex="3" onClick={this.joinRoom}>Join Room</div>
			</div>
		);
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(JoinRoom);
