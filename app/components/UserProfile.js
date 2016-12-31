import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import fU from '../Utils.js';
import axios from 'axios';

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
				<h2>Perfil de usuario</h2>
				<img className="avatar" src={'http://138.197.8.69/' + ((this.props.userInspected && this.props.userInspected.image) || '/assets/default-avatar.jpg')} />
				<div className="userData">
					<div>
						<span>Nombre:</span> <span className="right">{(this.props.userInspected && this.props.userInspected.name) || 'No disponible'}</span>
					</div>
					<div>
						<span>Edad:</span> <span className="right">{(this.props.userInspected && this.props.userInspected.age) || 'No disponible'}</span>
					</div>
					<div>
						<span>País:</span> <span className="right">{(this.props.userInspected && this.props.userInspected.country) || 'No disponible'}</span>
					</div>
					<div>
						<span>Género:</span> <span className="right">{(this.props.userInspected && this.props.userInspected.gender) || 'No disponible'}</span>
					</div>
				</div>
				<button onClick={this.createChat.bind(this)} >Chatear</button>
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
};

const mapStateToProps = (state) => {
	return {
		user: state.user,
		userInspected: state.userInspected
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
