import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import FilterableList from '../../containers/FilterableList';
import Evento from '../items/Event';
import * as actions from '../../actions';
import fU from '../../Utils.js';

class OwnChatList extends Component {
	componentDidMount() {
		this.props.initU().get('chats.json', actions.noAction, actions.setEvents, actions.noAction);
	}
	render() {
		return (
			<div id="list">
				<h2>Chats Propios</h2>
				<FilterableList items={this.props.ownChats} item={Evento} path="chats/config" />
			</div>
		);
	}
}

OwnChatList.propTypes = {
	ownChats: PropTypes.array,
	initU: PropTypes.func
};

const mapStateToProps = (state) => {
	return {
		ownChats: state.ownChats
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
)(OwnChatList);
