import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export const SubscribedChat = ({ item, path }) =>
	<div className="item">
		<Link to={path}>{item.name}</Link>
	</div>;

SubscribedChat.propTypes = {
	item: PropTypes.object,
	path: PropTypes.string
};
