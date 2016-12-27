import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { filterTable, filterTableCategory } from '../actions';
import ItemList from '../components/ItemList';
//	import R from 'ramda';

class FilterableList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			active_category: null
		};
	}
	changeCategory() {}
	render() {
		let input;

		return (
			<div className="filterable-table">
				<div className="row">
					<input
						value={this.props.filter}
						ref={node => {input = node;}}
						onChange={() => this.props.onFilter(input.value)}
						placeholder="Filtrar" />
					<ItemList filter={this.props.filter} items={this.props.items} item={this.props.item} path={this.props.path} />
					<div className="dropdown">
						<select ref="category" onChange={ this.changeCategory.bind(this) }>
							<option value={-1} >Todas las Categorías</option>
							{this.props.categories.map((category) => { return (<option key={category.id} value={category.id} >{category.name}</option>); })}
						</select>
					</div>
				</div>
			</div>
		);
	}
}

//	<ItemList filter={this.props.filter} items={this.props.items} item={this.props.item} path={this.props.path} />

FilterableList.defaultProps = {
	categories: []
};

FilterableList.propTypes = {
	filter: PropTypes.string,
	path: PropTypes.string,
	items: PropTypes.array,
	categories: PropTypes.array,
	item: PropTypes.func,
	onFilter: PropTypes.func
};

const mapStateToProps = (state) => {
	return {
		filter: state.filter,
		filterCategory: state.filterCategory,
		categories: state.categories
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onFilter: filterText => dispatch(filterTable(filterText)),
		onFilterCategory: filterCategoryId => dispatch(filterTableCategory(filterCategoryId))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FilterableList);
