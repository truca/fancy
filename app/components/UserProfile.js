import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import fU from '../Utils.js';
import axios from 'axios';
import R from 'ramda';
//	import languages from '../translate.js';

class UserProfile extends Component {
	componentDidMount() {
		this.props.initU().get('users/' + this.props.params.id, actions.noAction, actions.setUserInspected, actions.noAction, {Authorization: this.props.user.token});
		this.props.initU().get('user/block', actions.noAction, actions.setBlock, (err) => {
			console.log('error getting block', err);
			return actions.noAction(err);
		}, {Authorization: this.props.user.token});
		this.props.initU().get('user/blocked', actions.noAction, actions.setBlocked, (err) => {
			console.log('error getting blocked', err);
			return actions.noAction(err);
		}, {Authorization: this.props.user.token});
	}
	createChat() {
		console.log('creando chat');
		const key = 'Authorization';
		axios.defaults.headers.common[key] = this.props.user.token;

		axios.post('http://138.197.8.69/user/chats/personal', { user_id: this.props.userInspected.id }).then(chat => {
			console.log('chat', chat);
			this.props.history.push('/chats/' + chat.data.id );
		});
	}
	block() {
		const r = confirm('¿Deseas bloquear a este usuario? No podrás volver a hablar con él ni él contigo');
		if (r == true) {
			//	userID es actualmente la id del evento, hay que cambiar eso.
			this.props.initU().post('users/' + this.props.userInspected.id + '/block',
				actions.noAction, (res) => {
					console.log(res);
					return actions.addBlock({ active: true, to_id: this.props.userInspected.id, from_id: this.props.user.id });
				}, actions.noAction, {}, {Authorization: this.props.user.token});
		}
	}
	unblock() {
		const r = confirm('¿Deseas desbloquear a este usuario? ambos podrán volver a hablar con el otro');
		if (r == true) {
			//	userID es actualmente la id del evento, hay que cambiar eso.
			this.props.initU().delete('users/' + this.props.userInspected.id + '/block',
				actions.noAction, function(res) {
					console.log(res);
					return actions.removeBlock(this.props.userInspected.id);
				}.bind(this), actions.noAction, {}, {Authorization: this.props.user.token});
		}
	}
	render() {
		//	block means i blocked, blocked meand the other user blocked me.
		const block = R.find(blockAux => blockAux.to_id == this.props.userInspected.id, this.props.block);
		const blocked = R.find(blockedAux => blockedAux.from_id == this.props.userInspected.id, this.props.blocked);

		let buttons = null;
		if(blocked) {
			buttons = null;
		}else if(block) {
			buttons = (
				<button onClick={block ? this.unblock.bind(this) : this.block.bind(this) } >
					{block ? 'Desbloquear Usuario' : 'Bloquear usuario'}
				</button>
			);
		}else{
			buttons = (
				<div>
					<button onClick={this.createChat.bind(this)} >
						{this.props.languages[this.props.language].perfil_de_usuario.chatear}
					</button>
					<button onClick={block ? this.unblock.bind(this) : this.block.bind(this) } >
						{block ? 'Desbloquear Usuario' : 'Bloquear usuario'}
					</button>
				</div>
			);
		}

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
				{buttons}
			</div>
		);
	}
}

UserProfile.propTypes = {
	block: PropTypes.array,
	blocked: PropTypes.array,
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
		block: state.block,
		blocked: state.blocked,
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
