import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import FilterableList from '../../containers/FilterableList';
import { Event } from '../items/Event';
import * as actions from '../../actions';
import fU from '../../Utils.js';

class EventList extends Component {
	componentDidMount() {
		this.props.initU().get('chats.json', actions.noAction, actions.setEvents, actions.noAction);
	}
	render() {
		return (
			<div>
				<h2>Eventos</h2>
				<FilterableList items={this.props.events} item={Event} path="chats" />
			</div>
		);
	}
}

EventList.propTypes = {
	events: PropTypes.array,
	initU: PropTypes.func
};

const mapStateToProps = (state) => {
	return {
		events: state.events
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		initU: () => { return fU(dispatch); }
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EventList);
