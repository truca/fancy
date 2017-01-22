import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { toggleFavorite } from '../../actions';
import * as actions from '../../actions';
import fU from '../../Utils.js';
import R from 'ramda';

class Evento extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {}
	toggleFavorite() {
		if(this.props.item.favorite) {
			this.props.initU().delete('chats/' + this.props.item.id + '/subscribe.json',
				actions.noAction,
				() => { return { type: 'TOGGLE_FAVORITE', favorite: { chat_id: this.props.item.id, subscribed: false }}; },
				actions.noAction, {}, {Authorization: this.props.user.token});
		}else {
			this.props.initU().post('chats/' + this.props.item.id + '/subscribe.json',
				actions.noAction,
				() => { return { type: 'TOGGLE_FAVORITE', favorite: { chat_id: this.props.item.id, subscribed: true }}; },
				actions.noAction, {}, {Authorization: this.props.user.token});
		}
	}
	getSubtext(orderBy) {
		switch(orderBy) {
			case 'no': return '';
			case 'distance': return this.props.item.distance.toPrecision(3) + ' kilometros';
			case 'liked':
				let result = '';
				if(typeof R.find(R.propEq('id', this.props.item.category.id), this.props.favoritesCategories) !== 'undefined') {
					result = (<span className="liked">{this.props.item.category.name}</span>);
				}else{
					result = (<span>{this.props.item.category.name}</span>);
				}
				return result;
			case 'date': return '12/02/2017 17:30';
			default: return '';
		}
	}
	render() {
		const subtext = this.getSubtext(this.props.orderBy);
		return (
			<div className="item">
				<img className="profilePic" src={ 'http://138.197.8.69' + this.props.item.image }></img>
				<div className="text">
					<Link style={{cursor: 'pointer'}} to={this.props.user ? this.props.path : null}>{this.props.item.name}</Link>
					<span>{subtext}</span>
				</div>
				<i onClick={this.toggleFavorite.bind(this)}
					className={ this.props.item.favorite ? 'fav fa fa-star right' : 'fav fa fa-star-o right'} aria-hidden="true"></i>
			</div>
		);
	}
}

Evento.propTypes = {
	item: PropTypes.object,
	path: PropTypes.string,
	toggleFavorite: PropTypes.func,
	user: PropTypes.object,
	initU: PropTypes.func,
	orderBy: PropTypes.string,
	favoritesCategories: PropTypes.array,
};

const mapStateToProps = (state) => {
	return {
		user: state.user,
		orderBy: state.orderBy,
		favoritesCategories: state.favoritesCategories,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		toggleFavorite: eventID => dispatch(toggleFavorite(eventID)),
		initU: () => { return fU(dispatch); }
	};
};

module.exports = connect( mapStateToProps, mapDispatchToProps )(Evento);
