import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export const Event = ({ item, path }) =>
	<div>
		<Link to={path}>{item.name}</Link>
	</div>;

Event.propTypes = {
	item: PropTypes.object,
	path: PropTypes.string
};
