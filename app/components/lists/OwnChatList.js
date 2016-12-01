import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import FilterableList from '../../containers/FilterableList';
import { OwnChat } from '../items/OwnChat';

const OwnChatList = ({ ownChats }) => {
	return (
		<div>
			<h2>Chats Propios</h2>
			<FilterableList items={ownChats} item={OwnChat} path="chats/config" />
		</div>
	);
};

OwnChatList.propTypes = {
	ownChats: PropTypes.array
};

const mapStateToProps = (state) => {
	return {
		ownChats: state.ownChats
	};
};

const mapDispatchToProps = () => {
	return {};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(OwnChatList);
