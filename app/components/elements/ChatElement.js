import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import {Socket} from 'phoenix-socket';
import R from 'ramda';
import fU from '../../Utils.js';
import * as actions from '../../actions';
import momentTimezone from 'moment-timezone';

class ChatElement extends Component {
	constructor(props) {
		super(props);
		this.state = { chatData: {}, channel: null, messages: [], favorite: false, open: false };
	}
	componentDidMount() {
		const socket = new Socket('ws://138.197.8.69/socket', {params: { token: this.props.user.token }});
		const box = document.getElementById('messages-container');

		socket.connect();

		//  connect to socket
		const channel = socket.channel('chat:' + this.props.params.id, {});

		channel.join()
		.receive('ok', function(resp) {
			console.log('Joined successfully', resp);
			const found = R.find(event => event.id == resp.data.id, this.props.events);
			this.setState({ chatData: R.merge(resp.data, found), messages: resp.data.messages });
		}.bind(this))
		.receive('error', resp => { console.log('Unable to join', resp); });

		channel.on('message:new', payload => {
			console.log(payload);
			this.setState({ messages: R.append(payload, this.state.messages) });
		});

		this.setState({ channel });

		box.scrollTop = box.scrollHeight;
	}
	componentDidUpdate() {
		const box = document.getElementById('messages-container');
		box.scrollTop = box.scrollHeight;
	}
	sendMessage() {
		console.log('enviando', this.refs.message.value);
		if(this.refs.message.value.length > 0) {
			this.state.channel.push('message:new', { user_id: this.props.user.id, name: this.props.user.name || 'Anónimo', content: this.refs.message.value })
				.receive('ok', resp => { console.log('succ', resp); })
				.receive('error', resp => { console.log('err', resp); });
		}
		this.refs.message.value = '';
		document.getElementById('message').focus();
		document.getElementById('message').select();
	}
	viewUser(userID) {
		console.log(userID);
		const r = confirm(this.props.languages[this.props.language].alert.corfirmar_ver_perfil_usuario);
		if (r == true) {
			this.props.history.push('/profile/' + userID);
		}
	}
	block() {
		const r = confirm(this.props.languages[this.props.language].alert.corfirmar_bloquear_usuario);
		if (r == true) {
			//	userID es actualmente la id del evento, hay que cambiar eso.
			this.props.initU().post('users/' + this.props.userInspected.id + '/block',
				actions.noAction, function(res) {
					console.log(res);
					this.props.history.push('/');
					return actions.noAction();
				}.bind(this), actions.noAction, {}, {Authorization: this.props.user.token});
		}
	}
	toggleOpen() {
		this.setState({ open: !this.state.open });
	}
	toggleFavorite(eventID) {
		// hacer el cambio remoto
		console.log(eventID);
		if(this.state.favorite) {
			this.props.initU().delete('chats/' + this.state.chatData.id + '/subscribe.json',
				actions.noAction, actions.noAction, actions.noAction, {}, {Authorization: this.props.user.token});
		}else {
			this.props.initU().post('chats/' + this.state.chatData.id + '/subscribe.json',
				actions.noAction, actions.noAction, actions.noAction, {}, {Authorization: this.props.user.token});
		}
		this.setState({ favorite: !this.state.favorite });
	}
	render() {
		let name = 'Chat';
		if( this.state.chatData.type == 'private' ) {
			if( this.state.chatData.users[0].id == this.props.user.id ) {
				name = this.state.chatData.users[1].name || 'Anónimo';
			}else { name = this.state.chatData.users[0].name || 'Anónimo'; }
		}else { name = this.state.chatData.name || 'Chat'; }

		return (
			<div id="chat" className="page">
				<div className="title">
					<h2>{name}</h2>
					{this.state.chatData.type == 'private' ?
						<i className="fa fa-ban" style={{marginLeft: '3px'}} aria-hidden="true" onClick={this.block.bind(this)} ></i>
						: null
					}
					<i className={this.state.favorite ? 'fa fa-star' : 'fa fa-star-o'} aria-hidden="true" onClick={this.toggleFavorite.bind(this, this.state.chatData.id || -1 )} ></i>
				</div>
				<div>
					<i id="open" onClick={this.toggleOpen.bind(this)} className={this.state.open ? 'fa fa-sort-asc' : 'fa fa-sort-desc'} aria-hidden="true"></i>
				</div>
				<div id="event-data" style={{display: this.state.open ? 'block' : 'none'}}>
					<h5>{this.props.languages[this.props.language].chat.descripcion}</h5>
					<span>{this.state.chatData.description ?
							this.state.chatData.description
							: this.props.languages[this.props.language].chat.no_disponible
						}</span>
					<h5>{this.props.languages[this.props.language].chat.direccion}</h5>
					<span>{this.state.chatData.address ?
						this.state.chatData.address
						: this.props.languages[this.props.language].chat.no_disponible
					}</span>
				<h5>{this.props.languages[this.props.language].chat.fecha_y_hora}</h5>
					<span>{this.state.chatData.occurrence ?
							momentTimezone(this.state.chatData.occurrence).tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('YYYY-MM-DD HH:mm')
							: this.props.languages[this.props.language].chat.no_disponible
					}</span>
				</div>
				<div id="messages-container" style={{height: this.state.open ? '40%' : '80%', overflowY: 'scroll', paddingBottom: '70px'}}>
					{this.state.messages.map((message, i) => {
						return (<div key={i} className={this.props.user.id == message.user_id ? 'right' : 'left' }>
											<div onClick={ this.viewUser.bind(this, message.user_id) }>{message.name || 'Anónimo' }:</div>
											<div>{message.content}</div>
										</div>); })
					}
				</div>
				<div className="bg-green input-div">
					<input id="message" ref="message" type="text" placeholder={this.props.languages[this.props.language].chat.escribe_un_mensaje} />
					<span onClick={this.sendMessage.bind(this)}>
						<i className="fa fa-paper-plane fa-2x" aria-hidden="true"></i>
					</span>
				</div>
			</div>
		);
	}
}

ChatElement.propTypes = {
	params: PropTypes.object,
	user: PropTypes.object,
	events: PropTypes.array,
	history: PropTypes.object,
	initU: PropTypes.func,
	userInspected: PropTypes.object,
	language: PropTypes.string, languages: PropTypes.object,
};

const mapStateToProps = (state) => {
	return {
		events: state.events,
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
)(ChatElement);
