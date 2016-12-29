import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import FilterableList from '../../containers/FilterableList';
import Evento from '../items/Event';
import * as actions from '../../actions';
import fU from '../../Utils.js';

class PersonalChatList extends Component {
	componentDidMount() {
		this.props.initU().get('user/chats/personal.json', actions.noAction, actions.setPersonalChats, actions.noAction, {Authorization: this.props.user.token});
	}
	render() {
		return (
			<div id="list">
				<h2>Chats Personales</h2>
				<FilterableList items={this.props.personalChats} item={Evento} path="chats" />
			</div>
		);
	}
}

PersonalChatList.propTypes = {
	personalChats: PropTypes.array,
	initU: PropTypes.func,
	user: PropTypes.object,
};

const mapStateToProps = (state) => {
	return {
		personalChats: state.personalChats,
		user: state.user
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
)(PersonalChatList);
