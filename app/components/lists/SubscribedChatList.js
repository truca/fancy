import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import FilterableList from '../../containers/FilterableList';
import { SubscribedChat } from '../items/SubscribedChat';

const SubscribedChatList = ({ subscribedChats }) => {
	return (
		<div>
			<h2>Chats Suscritos</h2>
			<FilterableList items={subscribedChats} item={SubscribedChat} path="chats" />
		</div>
	);
};

SubscribedChatList.propTypes = {
	subscribedChats: PropTypes.array
};

const mapStateToProps = (state) => {
	return {
		subscribedChats: state.subscribedChats
	};
};

const mapDispatchToProps = () => {
	return {};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SubscribedChatList);
