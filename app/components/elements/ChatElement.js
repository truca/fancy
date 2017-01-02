import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import {Socket} from 'phoenix-socket';
import R from 'ramda';
import fU from '../../Utils.js';
import * as actions from '../../actions';
//	import languages from '../../translate.js';

class ChatElement extends Component {
	constructor(props) {
		super(props);
		this.state = { chatData: {}, channel: null, messages: [], favorite: false };
	}
	componentDidMount() {
		const socket = new Socket('ws://138.197.8.69/socket', {params: { token: this.props.user.token }});
		const box = document.getElementById('messages-container');

		socket.connect();

		//  connect to socket
		const channel = socket.channel('chat:' + this.props.params.id, {});

		channel.join()
		.receive('ok', resp => {
			console.log('Joined successfully', resp);
			this.setState({ chatData: resp.data, messages: resp.data.messages });
		})
		.receive('error', resp => { console.log('Unable to join', resp); });

		channel.on('message:new', payload => {
			console.log(payload);
			this.setState({ messages: R.append(payload, this.state.messages) });
		});

		this.setState({ channel });

		box.scrollTop = box.scrollHeight;

		/*	this.props.initU().get('chats/' + this.state.chatData.id + '/subscribe',
			actions.noAction, actions.noAction, actions.noAction, data, {Authorization: this.props.user.token});*/
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
	}
	viewUser(userID) {
		console.log(userID);
		const r = confirm('¿Deseas ver el perfil de este usuario?');
		if (r == true) {
			this.props.history.push('/profile/' + userID);
		}
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
		return (
			<div id="chat" className="page">
				<div className="title">
					<h2>{this.state.chatData.name || 'Chat'}</h2>
					<i className={this.state.favorite ? 'fa fa-star' : 'fa fa-star-o'} aria-hidden="true" onClick={this.toggleFavorite.bind(this, this.state.chatData.id || -1 )} ></i>
				</div>
				<div>
					<span>{this.state.chatData.description}</span>
				</div>
				<div id="messages-container" style={{height: '80%', overflowY: 'scroll'}}>
					{this.state.messages.map((message, i) => {
						return (<div key={i} className={this.props.user.id == message.user_id ? 'right' : 'left' }>
											<div onClick={ this.viewUser.bind(this, message.user_id) }>{message.name || 'Anónimo' }:</div>
											<div>{message.content}</div>
										</div>); })
					}
				</div>
				<div className="bg-green input-div">
					<input ref="message" type="text" placeholder={this.props.languages[this.props.language].chat.escribe_un_mensaje} />
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
	history: PropTypes.object,
	initU: PropTypes.func,
	language: PropTypes.string, languages: PropTypes.object,
};

const mapStateToProps = (state) => {
	return {
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
)(ChatElement);
