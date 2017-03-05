import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import fU from '../Utils.js';
import * as actions from '../actions';
import ChatForm from './elements/ChatForm';
//	import languages from '../translate.js';

class UpdateChat extends Component {
	componentDidMount() {
		this.props.initU().get('chats/' + this.props.params.id + '.json', actions.noAction, actions.setChat, actions.noAction);
	}
	updateChat(data) {
		this.props.initU().put('chats/' + this.props.params.id, actions.noAction, (res) => {
			this.props.history.push('/mapa');
			return actions.updateChat(res);
		}, actions.noAction, data, {Authorization: this.props.user.token} );
	}
	render() {
		return (
			<div id="updateChat">
				<h2>{this.props.languages[this.props.language].actualizar_chat.actualizar_chat}</h2>
				<ChatForm item={this.props.chat} buttonText={this.props.languages[this.props.language].actualizar_chat.enviar} buttonAction={this.updateChat.bind(this)} />
			</div>
		);
	}
}

UpdateChat.propTypes = {
	register: PropTypes.func,
	registerWithMail: PropTypes.func,
	chat: PropTypes.object,
	params: PropTypes.object,
	initU: PropTypes.func,
	user: PropTypes.object,
	language: PropTypes.string, languages: PropTypes.object,
	history: PropTypes.object,
};

const mapStateToProps = (state) => {
	return {
		chat: state.chat,
		categories: state.categories,
		user: state.user,
		language: state.language, languages: state.languages,
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
