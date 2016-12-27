import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import fU from '../Utils.js';
import * as actions from '../actions';
import ChatForm from './elements/ChatForm';

class UpdateChat extends Component {
	componentDidMount() {
		this.props.initU().get('chats/' + this.props.params.id + '.json', actions.noAction, actions.setChat, actions.noAction);
	}
	render() {
		return (
			<div>
				<h2>Actualizar Chat</h2>
				<ChatForm chat={this.props.chat}/>
			</div>
		);
	}
}

UpdateChat.propTypes = {
	register: PropTypes.func,
	registerWithMail: PropTypes.func,
	chat: PropTypes.object,
	params: PropTypes.object,
	initU: PropTypes.func
};

const mapStateToProps = (state) => {
	return {
		chat: state.chat,
		categories: state.categories
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
)(UpdateChat);
