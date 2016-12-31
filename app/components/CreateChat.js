import React, { PropTypes, Component } from 'react';
import ChatForm from './elements/ChatForm';
import { connect } from 'react-redux';


class CreateChat extends Component {
	render() {
		return (
			<div id="createChat">
        <h2>Crear Chat</h2>
        <ChatForm chat={{}}/>
			</div>
		);
	}
}

CreateChat.propTypes = {
	register: PropTypes.func,
	registerWithMail: PropTypes.func
};

const mapStateToProps = () => {
	return {};
};

const mapDispatchToProps = () => {
	return {
		register() {		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateChat);
