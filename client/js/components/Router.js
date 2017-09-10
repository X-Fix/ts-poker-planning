/**
 * So ReactRouter documentation sucks giant balls and the library adds some bullshit '?k=stupidhashthingy' to the 
 * end of the URL so it can link to your browser history correctly or something I've never needed to use.
 * So I threw it out 3 projects ago and now I use my own version.
 * 
 * It takes a string value for the current page from a reducer that updates when the window.hash changes
 * so every time you window.location it updates which page is rendered. USes the same /#/ work-around as 
 * React(stupid)Router to stop you actually redirecting anywhere (this is an SPA after all)
 *
 * It also doubles up as a bouncer for apps that require login of sorts (like this one)
 * Just subscribe it to whichever reducer tracks your logged-on status ('participant' in this case) and redirect
 * as necessary when that status changes
 */
import React from 'react';
import { connect } from 'react-redux';
import { isEmpty, isEqual } from 'lodash';
import PokerRoom from './PokerRoom';
import JoinRoom from './JoinRoom';

const mapStateToProps = ({ page, participant }) => {
	return { 
		page,
		participant
	}
}

const Router = ({ page, participant }) => {

	if (isEmpty(participant.id)){
		if (!isEqual(page, "JoinRoom")) {
			window.location = "/#/JoinRoom";
		}
	}

	const pages = {
		PokerRoom: <PokerRoom />,
		JoinRoom: <JoinRoom />
	}
	
	return pages[page] || <div style={{marginTop: 100, textAlign: "center"}} >Page Not Found</div>;
}

export default connect(mapStateToProps)(Router);