import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export const OwnChat = ({ item, path }) =>
	<div>
		<Link to={path}>{item.name}</Link>
	</div>;

OwnChat.propTypes = {
	item: PropTypes.object,
	path: PropTypes.string
};
