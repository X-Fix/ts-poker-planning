import React from 'react';
import { connect } from 'react-redux';
import { find, isEmpty, isEqual, map } from 'lodash';
import { apiRequests } from '../actions';
import { CARDS } from '../utilities/constants';

const Item = (itemName) => {
	return {
		name: itemName,
		isLocked: false,
		dateCreated: Date.now()
	};
};

let onEnter = (event, fn) => {
	if (event.keyCode === 13) {
		event.preventDefault();
		fn();
	}
};

const mapStateToProps = ({ participant, room }) => {
	return {
		participant,
		room
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		subscribe: apiRequests.subscribe,
		createItem: (object) => {
			apiRequests.createItem(object);
			dispatch({
				type: "CREATE_ITEM",
				payload: object
			});
		},
		setItemScore: (object) =>{
			apiRequests.setItemScore(object);
			dispatch({
				type: "SET_ITEM_SCORE",
				payload: object
			});
		},
		kickParticipant: (object) => {
			apiRequests.kickParticipant(object);
			dispatch({
				type: "KICK_PARTICIPANT",
				payload: object
			});
		}
	};
};

class PokerRoom extends React.Component {

	constructor(props) {
		super(props);

		this.setItemScore = this.setItemScore.bind(this);
		this.createItem = this.createItem.bind(this);
		this.kickParticipant = this.kickParticipant.bind(this);
		this.makeCardComponent = this.makeCardComponent.bind(this);
		this.makeParticipantComponent = this.makeParticipantComponent.bind(this);
	}

	componentDidMount() {
		this.props.subscribe({
			roomId: this.props.room.id,
			participantId: this.props.participant.id
		});

		if (isEmpty(this.refs.txtItemName)) return;

		this.refs.txtItemName.addEventListener('keyup', (event) =>{onEnter(event, this.createItem);});
		this.refs.txtItemName.focus();
	}

	shouldComponentUpdate(nextProps) {
		// Only update if properties have changed
		// Normally use '===' comparison but updates could be sync from server
		if (!isEqual(this.props.room, nextProps.room) ||
			!isEqual(this.props.participant, nextProps.participant)) {
			return true;
		}
		return false;
	}

	componentDidUpdate(prevProps) {
		// Attach event handlers to elements that may not have existed in previous render
		if (isEmpty(this.refs.txtItemName)) return;

		// Only attach event handlers if elements are freshly rendered (avoid duplicate events)
		if (!prevProps.room.item.isLocked && this.props.room.item.isLocked) {
			this.refs.txtItemName.addEventListener('keyup', (event) =>{onEnter(event, this.createItem);});
		}
	}

	// Create new item to be pokered
	// Event only accessible to room owner
	createItem() {
		const itemName = this.refs.txtItemName.value.trim();

		if (!isEqual(this.props.participant.id, this.props.room.ownerId) || isEmpty(itemName)) return;

		this.props.createItem({
			roomId: this.props.room.id,
			participantId: this.props.participant.id,
			item: new Item(itemName)
		});
	}

	// Set this participant's score for current item
	setItemScore(event) {
		let itemScore = event.target.dataset.value;

		if (itemScore === this.props.participant.itemScore) itemScore = null;

		this.props.setItemScore({
			roomId: this.props.room.id,
			participantId: this.props.participant.id,
			itemScore: itemScore
		});
	}

	// Remove target participant from room
	// Event only accessible to room owner
	kickParticipant(event) {
		const targetId = event.target.dataset.value;

		if (!isEqual(this.props.room.ownerId, this.props.participant.id)) return;

		this.props.kickParticipant({
			roomId: this.props.room.id,
			participantId: this.props.participant.id,
			targetId: targetId
		});
	}

	// Generates poker card component for the provided card score
	// Can be abstracted to a separate functional component
	makeCardComponent(cardScore, index) {
		let className = "poker-card";
		const disabled = isEmpty(this.props.room.item.name) || this.props.room.item.isLocked;

		if (this.props.participant.itemScore === cardScore) {
			className += " selected";
		}
		if (disabled) {
			className += " disabled";
		}

		return (<div key={index} className={className} onClick={disabled ? null : this.setItemScore} data-value={cardScore}>{cardScore}</div>);
	}

	// Generates participant card component for the provided participant
	// Can be abstracted to a separate functional component
	makeParticipantComponent(participant, index) {

		// Various boolean values used to determine wether to show relevant element or not
		const thisIsOwner = isEqual(participant.id, this.props.room.ownerId);
		const thisIsMe = isEqual(participant.id, this.props.participant.id);
		const iAmOwner = isEqual(this.props.participant.id, this.props.room.ownerId);
		const canKick = (iAmOwner && !thisIsOwner);
		const hasScore = !isEmpty(participant.itemScore);
		const showScore = (hasScore && this.props.room.item.isLocked);

		return (
			<div key={index} className="participant-card">
				<div className="participant-card__participant-icons">
					{
						thisIsOwner ?
						<span className="glyph tower"/>
						: null
					}
					{
						thisIsMe ?
						<span className="glyph chevron-right"/>
						: null
					}
				</div>
				<div className="participant-card__name">{participant.name}</div>
				{
					canKick ?
					<div className="btn kick-participant" data-value={participant.id} onClick={this.kickParticipant}>Kick</div>
					: null
				}

				{
					showScore ?
					<div className="participant-card__item-score">{participant.itemScore}</div>
					:
					hasScore ?
					<div className="participant-card__item-icons">
						<span className="glyph ok"/>
					</div>
					: null
				}
			</div>
		);
	}

	// Renders the html for the entire 'Poker Room' page
	// Dependencies = [cardComponent, participantComponent]
	render() {

		// Card components generated from a list of values in the selected CARDS constant
		// CARDS constant selected using same value selected when creating the room
		const cardComponents = map(CARDS[this.props.room.cardType], this.makeCardComponent);
		// Participant components generated from the list of participants subscribed to the room
		const participantComponents = map(this.props.room.participants, this.makeParticipantComponent);

		// Various boolean values used to determine wether to show relevant element or not
		const isOwner = isEqual(this.props.participant.id, this.props.room.ownerId);
		const itemEmpty = isEmpty(this.props.room.item.name);
		const itemLocked = itemEmpty ? true : this.props.room.item.isLocked;

		return (
			<div>
				<div className="poker-cards-container">
					{ cardComponents }
					{
						isOwner ?
						<div className="create-item-container">
							{
								itemEmpty || itemLocked ?
								<input className="txt item-name" ref="txtItemName" type="text" placeholder="Item name" label="Item name" />
								: null
							}
							{
								itemEmpty ?
								<div className="btn create-item" onClick={this.createItem}>Create Item</div>
								:
								itemLocked ?
								<div className="btn create-item" onClick={this.createItem}>Next Item</div>
								:
								null
							}
						</div>
						: null
					}
				</div>
				<div className="participant-panel">
					<div className="participant-panel__header">{"Current item: " + (itemEmpty ? "None" : this.props.room.item.name)}</div>
					{ participantComponents }
				</div>
			</div>
		);
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PokerRoom);