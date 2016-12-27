import React, { PropTypes } from 'react';

const ItemList = ({ items, item, filter, path }) => {
	let Item = item;
	const filterLC = filter.toLowerCase();

	return (
		<div className="right_col" role="main">
			<div className="full-title">
				<h2>{name}</h2>
			</div>
			<div>
				<div>
					<div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
						{items.map((element, i) => {
							const nameLC = (element.name).toLowerCase();
							if (nameLC.indexOf(filterLC) !== -1) return (<Item key={i} item={element} path={path + '/' + element.id} />);
							return (null);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

ItemList.propTypes = {
	name: PropTypes.string,
	path: PropTypes.string,
	items: PropTypes.array,
	item: PropTypes.func,
	filter: PropTypes.string
};

module.exports = ItemList;
