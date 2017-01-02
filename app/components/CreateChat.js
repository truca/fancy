import React, { PropTypes, Component } from 'react';
import ChatForm from './elements/ChatForm';
import { connect } from 'react-redux';
import languages from '../translate.js';
import fU from '../Utils.js';
import * as actions from '../actions';

class CreateChat extends Component {
	createChat(data) {
		this.props.initU().post('chats', actions.noAction, actions.noAction, actions.noAction, data, {Authorization: this.props.user.token} );
	}
	render() {
		return (
			<div id="createChat">
        <h2>{languages[this.props.language].crear_chat.crear_chat}</h2>
        <ChatForm item={{}} buttonText={languages[this.props.language].crear_chat.enviar} buttonAction={this.createChat.bind(this)} />
			</div>
		);
	}
}

CreateChat.propTypes = {
	register: PropTypes.func,
	registerWithMail: PropTypes.func,
	language: PropTypes.string,
	initU: PropTypes.func,
	user: PropTypes.object,
};

const mapStateToProps = (state) => {
	return {
		language: state.language,
		user: state.user,
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
)(CreateChat);
