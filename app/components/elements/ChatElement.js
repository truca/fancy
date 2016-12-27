import React, { PropTypes, Component } from 'react';
import {Socket} from 'phoenix-socket';

class ChatElement extends Component {
	constructor(props) {
		super(props);
		this.state = { channel: null, messages: [
			{user: {name: 'Juan Pablo', id: 1}, message: 'Hola! ¿cómo estás?'},
			{user: {name: 'Juan Pablo', id: 1}, message: 'Hola! ¿cómo estás?'},
			{user: {name: 'Juan Pablo', id: 1}, message: 'Hola! ¿cómo estás?'},
			{user: {name: 'Juan Pablo', id: 1}, message: 'Hola! ¿cómo estás?'},
			{user: {name: 'Juan Pablo', id: 1}, message: 'Hola! ¿cómo estás?'},
			{user: {name: 'Juan Pablo', id: 1}, message: 'Hola! ¿cómo estás?'},
			{user: {name: 'Juan Pablo', id: 1}, message: 'Hola! ¿cómo estás?'},
			{user: {name: 'Juan Pablo', id: 1}, message: 'Hola! ¿cómo estás?'},
			{user: {name: 'Juan Pablo', id: 1}, message: 'Hola! ¿cómo estás?'},
			{user: {name: 'Juan Pablo', id: 1}, message: 'Hola! ¿cómo estás?'},
			{user: {name: 'Juan Pablo', id: 1}, message: 'Hola! ¿cómo estás?'},
			{user: {name: 'Juan Pablo', id: 1}, message: 'Hola! ¿cómo estás?'},
			{user: {name: 'Juan Pablo', id: 1}, message: 'Hola! ¿cómo estás?'},
			{user: {name: 'Juan Pablo', id: 1}, message: 'Hola! ¿cómo estás?'},
			{user: {name: 'Juan Pablo', id: 1}, message: 'Hola! ¿cómo estás?'},
			{user: {name: 'Juan Pablo', id: 1}, message: 'Hola! ¿cómo estás?'},
			{user: {name: 'Juan Pablo', id: 1}, message: 'Hola! ¿cómo estás?'},
			{user: {name: 'Juan Pablo', id: 1}, message: 'Hola! ¿cómo estás?'},
			{user: {name: 'Juan Pablo', id: 1}, message: 'Hola! ¿cómo estás?'},
			{user: {name: 'Juan Pablo', id: 1}, message: 'Hola! ¿cómo estás?'},
			{user: {name: 'Juan Pablo', id: 1}, message: 'Hola! ¿cómo estás?'},
			{user: {name: 'Juan Pablo', id: 1}, message: 'Hola! ¿cómo estás?'},
			{user: {name: 'Juan Pablo', id: 1}, message: 'Hola! ¿cómo estás?'},
			{user: {name: 'Juan Pablo', id: 1}, message: 'Hola! ¿cómo estás?'},
			{user: {name: 'Juan Pablo', id: 1}, message: 'Hola! ¿cómo estás?'}
		]};
	}
	componentDidMount() {
		const socket = new Socket('ws://138.197.8.69/socket', {params: {token: window.userToken}});
		socket.connect();

		//  connect to socket
		const channel = socket.channel('chat:' + this.props.params.id, {});

		channel.join()
	    .receive('ok', resp => { console.log('Joined successfully', resp); })
	    .receive('error', resp => { console.log('Unable to join', resp); });

		this.setState({ channel });
		//	channel.push("call:new", { line_id: line_id })
	}
	send() {
		console.log('enviando', this.refs.message.value);
		this.state.channel.push('message:new', { message: { name: 'username', content: 'hahaha go kill yourself' } })
			.receive('ok', resp => { console.log('succ', resp); })
			.receive('error', resp => { console.log('err', resp); });
	}
	render() {
		return (
			<div id="chat" className="page">
				<div>
					<h2>Chat</h2>
				</div>
				<div className="messages-container" style={{height: '80%', overflowY: 'scroll'}}>
					{this.state.messages.map((message, i) => { return (<div key={i}><div>{message.user.name}:</div><div>{message.message}</div></div>); })}
				</div>
				<div className="bg-green input-div">
					<input ref="message" type="text" placeholder="Escribe un mensaje .." style={{display: 'inline', width: '90%'}} />
					<span onClick={this.send.bind(this)} style={{display: 'inline', width: '15%', color: 'white'}}>
						<i className="fa fa-paper-plane fa-2x" aria-hidden="true"></i>
					</span>
				</div>
			</div>
		);
	}
}

ChatElement.propTypes = {
	params: PropTypes.object
};

export default ChatElement;
