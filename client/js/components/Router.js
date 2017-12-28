/**
 * So ReactRouter documentation sucks giant balls and the library adds some bullshit '?k=stupidhashthingy' to the
 * end of the URL so it can link to your browser history correctly or something I've never needed to use.
 * So I threw it out 3 projects ago and now I use my own version.
 *
 * It takes a string value for the current page from a reducer that updates when the window.hash changes
 * so every time you use window.location it updates which page is rendered. Uses the same /#/ work-around as
 * React(stupid)Router to stop you actually redirecting anywhere (this is an SPA after all)
 *
 * It also doubles up as a bouncer for apps that require login of sorts (like this one)
 * Just subscribe it to whichever reducer tracks your logged-on status ('participant' in this case) and redirect
 * as necessary when that status changes
 */
import React from 'react';
import { connect } from 'react-redux';
import isEmpty 	from 'lodash/isEmpty';
import isEqual 	from 'lodash/isEqual';

import { getStorageItem } from '../utilities/helperMethods';
import { REQUEST_STATES } from '../utilities/constants';
import { apiRequests } from '../api';

import PokerRoom from './PokerRoom';
import JoinRoom from './JoinRoom';

const mapStateToProps = ({ page, participant, requests }) => {
	return {
		page,
		participant,
		requests
	}
}

const authCheck = ({ page, participant, requests }) => {
	if (isEmpty(participant)){
		const roomId = getStorageItem("roomId");
		const participantId = getStorageItem("participantId");

		// If mounting after a page refresh and details were stored in session storage
		if (!isEmpty(roomId) && !isEmpty(participantId)) {
			// Attempt to re-join same room again
			if (isEqual(requests.joinRoom, REQUEST_STATES.READY)) {
				apiRequests.joinRoom({roomId, participantId});
			}
		// If details were not stored and joinRoom request isn't busy
		} else if (isEqual(page, "PokerRoom") && !isEqual(requests.joinRoom, REQUEST_STATES.BUSY)) {
			// Boot to the log in screen
			window.location = "/#/JoinRoom";
		}
	} else {
		if (isEqual(page, "JoinRoom")) {
			window.location = "/#/PokerRoom";
		}
	}
}

const pages = {
	PokerRoom: <PokerRoom />,
	JoinRoom: <JoinRoom />
}

class Router extends React.Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		authCheck(this.props);
	}

	componentDidUpdate() {
		authCheck(this.props);
	}

	shouldComponentUpdate(nextProps) {
		if (!isEqual(nextProps.page, this.props.page) ||
			!isEqual(nextProps.participant, this.props.participant) ||
			!isEqual(nextProps.requests, this.props.requests)) {
			return true;
		}
		return false;
	}

	render() {
		return (
			<div className="mainBackground">
			{
				pages[this.props.page] ?
				pages[this.props.page]
				:
				<div style={{marginTop: 100, textAlign: "center"}} >Page Not Found</div>
			}
			</div>
		);
	}
}

export default connect(mapStateToProps)(Router);