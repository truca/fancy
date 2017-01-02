import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import fU from '../Utils.js';
import axios from 'axios';
//	import languages from '../translate.js';

class UserProfile extends Component {
	componentDidMount() {
		this.props.initU().get('users/' + this.props.params.id, actions.noAction, actions.setUserInspected, actions.noAction);
	}
	createChat() {
		console.log('creando chat');
		const key = 'Authorization';
		axios.defaults.headers.common[key] = this.props.user.token;
		/*	axios.get('http://138.197.8.69/user/chats/personal').then(chat => {
			console.log('chat', chat);
			//	this.props.history.push('/chats/' + chat.id );
		});*/

		axios.post('http://138.197.8.69/user/chats/personal', { user_id: this.props.userInspected.id }).then(chat => {
			console.log('chat', chat);
			this.props.history.push('/chats/' + chat.data.id );
		});
		/*	this.props.initU().post('user/chats/personal',
			actions.noAction,
			response => { this.props.history.push('/chats/' + response.id ); return { type: 'NO_ACTION' }; },
			actions.noAction, { user_id: this.props.userInspected.id }, {Authorization: this.props.user.token});*/
	}
	render() {
		return (
			<div id="userProfile">
				<h2>{this.props.languages[this.props.language].perfil_de_usuario.perfil_de_usuario}</h2>
				<img className="avatar" src={'http://138.197.8.69/' + ((this.props.userInspected && this.props.userInspected.image) || '/assets/default-avatar.jpg')} />
				<div className="userData">
					<div>
						<span>{this.props.languages[this.props.language].perfil_de_usuario.nombre}:</span>
						<span className="right">{(this.props.userInspected && this.props.userInspected.name) || 'No disponible'}</span>
					</div>
					<div>
						<span>{this.props.languages[this.props.language].perfil_de_usuario.edad}:</span>
						<span className="right">{(this.props.userInspected && this.props.userInspected.age) || 'No disponible'}</span>
					</div>
					<div>
						<span>{this.props.languages[this.props.language].perfil_de_usuario.pais}:</span>
						<span className="right">{(this.props.userInspected && this.props.userInspected.country) || 'No disponible'}</span>
					</div>
					<div>
						<span>{this.props.languages[this.props.language].perfil_de_usuario.genero}:</span>
						<span className="right">{(this.props.userInspected && this.props.userInspected.gender) || 'No disponible'}</span>
					</div>
				</div>
				<button onClick={this.createChat.bind(this)} >
					{this.props.languages[this.props.language].perfil_de_usuario.chatear}
				</button>
			</div>
		);
	}
}

UserProfile.propTypes = {
	user: PropTypes.object,
	initU: PropTypes.func,
	params: PropTypes.object,
	userInspected: PropTypes.object,
	history: PropTypes.object,
	language: PropTypes.string, languages: PropTypes.object,
};

const mapStateToProps = (state) => {
	return {
		user: state.user,
		userInspected: state.userInspected,
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
)(UserProfile);
