import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export const PersonalChat = ({ item, path }) =>
	<div>
		<Link to={path}>{item.name}</Link>
	</div>;

PersonalChat.propTypes = {
	item: PropTypes.object,
	path: PropTypes.string
};
