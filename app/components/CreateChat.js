import React, { PropTypes, Component } from 'react';
import ChatForm from './elements/ChatForm';
import { connect } from 'react-redux';
//	import languages from '../translate.js';
import fU from '../Utils.js';
import * as actions from '../actions';

class CreateChat extends Component {
	createChat(data) {
		this.props.initU().post('chats', actions.noAction, (res) => {
			console.log('Create event success');
			console.log(JSON.stringify(res));
			this.props.history.push('/mapa');
			uploadSavedImage(res, this.props.user,
				this.props.languages[this.props.language].imagen.exito,
				this.props.languages[this.props.language].imagen.error
			);
			return actions.createChat(res);
		}, (err) => {
			console.log('Create event error');
			console.log(JSON.stringify(err));
			return actions.noAction(err);
		}, data, {Authorization: this.props.user.token} );
	}
	render() {
		return (
			<div id="createChat">
        <h2>{this.props.languages[this.props.language].crear_chat.crear_chat}</h2>
        <ChatForm item={{}} buttonText={this.props.languages[this.props.language].crear_chat.enviar} buttonAction={this.createChat.bind(this)} />
			</div>
		);
	}
}

CreateChat.propTypes = {
	register: PropTypes.func,
	registerWithMail: PropTypes.func,
	language: PropTypes.string, languages: PropTypes.object,
	initU: PropTypes.func,
	user: PropTypes.object,
	history: PropTypes.object,
};

const mapStateToProps = (state) => {
	return {
		language: state.language, languages: state.languages,
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
