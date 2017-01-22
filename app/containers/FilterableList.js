import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
//	import { filterTable, filterTableCategory } from '../actions';
import ItemList from '../components/ItemList';
import R from 'ramda';
import fU from '../Utils.js';
//	import languages from '../translate.js';

class FilterableList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			active_category: -1,
			order_by: 'no'
		};
	}
	componentDidMount() {
		this.props.initU().get('/user/categories/favorites.json', actions.noAction, actions.setFavoritesCategories, actions.noAction);
	}
	filterCategory(items) {
		if(this.state.active_category == -1) return items;
		return R.filter(item => item.category.id == this.state.active_category, items);
	}
	changeCategory() {
		this.setState({ active_category: parseInt(this.refs.category.value, 10) });
	}
	orderItems(items) {
		if(this.props.orderBy == 'no') return R.sortBy(R.prop('name'), items);
		else if(this.props.orderBy == 'distance') {
			return R.sortBy(R.prop('distance'), items);
		}else if(this.props.orderBy == 'liked') {
			if( typeof this.props.favoritesCategories === 'undefined' || this.props.favoritesCategories.length == 0 ) return items;
			return R.sort(function(a, b) {
				const foundA = R.find(R.propEq('id', a.category.id), this.props.favoritesCategories);
				const foundB = R.find(R.propEq('id', b.category.id), this.props.favoritesCategories);
				if(typeof foundA === 'undefined' && typeof foundB !== 'undefined') return 1;
				if(typeof foundA !== 'undefined' && typeof foundB === 'undefined') return -1;
				return 0;
			}.bind(this), items);
		}
		return R.sortBy(R.prop('name'), items);
	}
	render() {
		let input;
		const filteredItems = this.filterCategory(this.props.items);
		const orderedItems = this.orderItems(filteredItems);

		return (
			<div className="filterable-table">
				<div className="row">
					<input
						value={this.props.filter}
						ref={node => {input = node;}}
						onChange={() => this.props.onFilter(input.value)}
						placeholder={this.props.languages[this.props.language].lista.filtrar} />
					<ItemList filter={this.props.filter} items={orderedItems} item={this.props.item} path={this.props.path} />
					<div className="dropdown">
						<select ref="order" onChange={ this.props.changeOrder.bind(this) } defaultValue={this.props.order_by}>
							<option value="no" selected={this.props.orderBy == 'no'}>Don't Sort</option>
							<option value="distance" selected={this.props.orderBy == 'distance'} >Distance</option>
							{this.props.user ?
								(<option value="liked" selected={this.props.orderBy == 'liked'}>Liked Categories</option>) : null
							}
						</select>
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

//	Ordenar por fecha de evento
//	<option value="date" selected={this.props.orderBy == 'date'}>Event date</option>
//	<ItemList filter={this.props.filter} items={this.props.items} item={this.props.item} path={this.props.path} />

FilterableList.defaultProps = {
	categories: []
};

FilterableList.propTypes = {
	filter: PropTypes.string,
	order_by: PropTypes.string,
	orderBy: PropTypes.string,
	path: PropTypes.string,
	items: PropTypes.array,
	filterCategory: PropTypes.array,
	favoritesCategories: PropTypes.array,
	categories: PropTypes.array,
	item: PropTypes.func,
	onFilter: PropTypes.func,
	changeOrder: PropTypes.func,
	initU: PropTypes.func,
	user: PropTypes.object,
	language: PropTypes.string, languages: PropTypes.object,
};

const mapStateToProps = (state) => {
	return {
		filter: state.filter,
		filterCategory: state.filterCategory,
		language: state.language, languages: state.languages,
		categories: state.categories,
		orderBy: state.orderBy,
		user: state.user,
		favoritesCategories: state.favoritesCategories,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onFilter: filterText => dispatch(actions.filterTable(filterText)),
		changeOrder: function() { console.log('args, this', arguments, this); return dispatch(actions.orderChats(this.refs.order.value)); },
		onFilterCategory: filterCategoryId => dispatch(actions.filterTableCategory(filterCategoryId)),
		initU: () => fU(dispatch)
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FilterableList);
