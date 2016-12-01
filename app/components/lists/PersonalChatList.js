import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import FilterableList from '../../containers/FilterableList';
import { PersonalChat } from '../items/PersonalChat';

const PersonalChatList = ({ personalChats }) => {
	return (
		<div>
			<h2>Chats Personales</h2>
			<FilterableList items={personalChats} item={PersonalChat} path="chats" />
		</div>
	);
};

PersonalChatList.propTypes = {
	personalChats: PropTypes.array
};

const mapStateToProps = (state) => {
	return {
		personalChats: state.personalChats
	};
};

const mapDispatchToProps = () => {
	return {};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PersonalChatList);
