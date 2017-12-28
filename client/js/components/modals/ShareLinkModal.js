import React from 'react';
import { connect } from 'react-redux';
import isEqual 	from 'lodash/isEqual';
import { modalActions } from '../../actionCreators';
import ModalWrapper from './ModalWrapper';

const mapStateToProps = ({ modals, room }) => {
	return {
		shareLinkModalIsOpen: modals.shareLinkModalIsOpen,
		roomName: room.name
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		closeModal: () => {dispatch(modalActions.closeModal({
			modalName: "shareLink"
		}))}
	}
}

class ShareLinkModal extends React.Component {

	constructor(props) {
		super(props);
	}

	shouldComponentUpdate(nextProps) {
		return !isEqual(nextProps, this.props);
	}

	componentDidUpdate(prevProps) {
		// onModalOpen
		// set textElement.value to the joinRoom link
		// select() the text in preparation of copy
		if (!prevProps.shareLinkModalIsOpen && this.props.shareLinkModalIsOpen) {
			const shareLinkElement = document.getElementById("txtShareLinkText");
			shareLinkElement.value = window.location.origin + "/#/JoinRoom?autoJoinRoomName="+encodeURI(this.props.roomName);
			shareLinkElement.select();
		}
	}

	render() {

		const {
			shareLinkModalIsOpen,
			closeModal
		} = this.props;

		return (
			<ModalWrapper isOpen={shareLinkModalIsOpen} onClose={closeModal} title={"Share Link"}>
				{"Share the link below with anyone you wish to join the room"}
				<input id="txtShareLinkText" className="txt share-link-text" />
			</ModalWrapper>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ShareLinkModal);
