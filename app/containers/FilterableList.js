import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { filterTable } from '../actions';
import ItemList from '../components/ItemList';

const FilterableList = ({ filter, onFilter, items, item, path }) => {
	let input;

	return (
		<div className="filterable-table">
			<input
				value={filter}
				ref={node => {input = node;}}
				onChange={() => onFilter(input.value)} />

			<ItemList filter={filter} items={items} item={item} path={path} />
		</div>
	);
};

FilterableList.propTypes = {
	filter: PropTypes.string,
	path: PropTypes.string,
	items: PropTypes.array,
	item: PropTypes.func,
	onFilter: PropTypes.func
};

const mapStateToProps = (state) => {
	return {
		filter: state.filter
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onFilter: filterText => dispatch(filterTable(filterText))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FilterableList);
