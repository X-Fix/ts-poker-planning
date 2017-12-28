import React from 'react';
import { connect } from 'react-redux';
import { actionCreator } from '../actions';
import { isEqual } from '../utilities/lodash';

const mapStateToProps = ({ reducerA, reducerB }) => {
	return {
		reducerA,
		reducerB
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		doAction: actionCreator.doAction
	}
}

class ComponentName extends React.Component {

	constructor(props) {
		super(props);
	}

	shouldComponentUpdate(nextProps) {
		return !isEqual(nextProps, this.props);
	}

	render() {
		return (
			<div/>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ComponentName);
