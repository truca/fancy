import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { filterTable, filterTableCategory } from '../actions';
import ItemList from '../components/ItemList';
import R from 'ramda';
//	import languages from '../translate.js';

class FilterableList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			active_category: -1
		};
	}
	filterCategory(items) {
		if(this.state.active_category == -1) return items;
		return R.filter(item => item.category.id == this.state.active_category, items);
	}
	changeCategory() {
		this.setState({ active_category: parseInt(this.refs.category.value, 10) });
	}
	render() {
		let input;
		let filteredItems = this.filterCategory(this.props.items);

		return (
			<div className="filterable-table">
				<div className="row">
					<input
						value={this.props.filter}
						ref={node => {input = node;}}
						onChange={() => this.props.onFilter(input.value)}
						placeholder={this.props.languages[this.props.language].lista.filtrar} />
					<ItemList filter={this.props.filter} items={filteredItems} item={this.props.item} path={this.props.path} />
					<div className="dropdown">
						<select ref="category" onChange={ this.changeCategory.bind(this) }>
							<option value={-1} >{this.props.languages[this.props.language].lista.todas_las_categorias}</option>
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
	onFilter: PropTypes.func,
	language: PropTypes.string, languages: PropTypes.object,
};

const mapStateToProps = (state) => {
	return {
		filter: state.filter,
		filterCategory: state.filterCategory,
		language: state.language, languages: state.languages,
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
