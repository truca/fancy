import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { toggleFavorite } from '../../actions';
import * as actions from '../../actions';
import fU from '../../Utils.js';
import momentTimezone from 'moment-timezone';

class Favorites extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		//	get al favorito del local
		console.log('GET Favorite', {Authorization: this.props.user.token});
		this.props.initU().get('chats/' + this.props.item.id + '/subscribe.json',
			actions.noAction, actions.toggleFavorite, actions.noAction, {Authorization: this.props.user.token});
	}
	deleteFavorite() {
		this.props.initU().delete('chats/' + this.props.item.id + '/subscribe.json',
			actions.noAction,
			() => { return { type: 'DELETE_FAVORITE', favorite: { chat_id: this.props.item.id, subscribed: false }}; },
			actions.noAction, {}, {Authorization: this.props.user.token});
	}
	getSubtext(orderBy) {
		switch(orderBy) {
			case 'no': return '';
			case 'distance': return this.props.item.distance.toPrecision(3) + ' km';
			case 'liked':
				let result = '';
				if(typeof R.find(R.propEq('id', this.props.item.category.id), this.props.favoritesCategories) !== 'undefined') {
					result = (<span className="liked">{this.props.item.category.name}</span>);
				}else{
					result = (<span>{this.props.item.category.name}</span>);
				}
				return result;
			case 'date': return this.props.item.occurrence ? momentTimezone(this.props.item.occurrence).tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('YYYY-MM-DD HH:mm') : null;
			default: return '';
		}
	}
	render() {
		const subtext = this.getSubtext(this.props.orderBy);
		return (
			<div className="item">
				<img className="profilePic" src={ 'http://138.197.8.69' + this.props.item.image }></img>
				<div className="text">
					<Link style={{cursor: 'pointer'}} to={this.props.path}>{this.props.item.name}</Link>
					<span>{subtext}</span>
				</div>
				<i onClick={this.deleteFavorite.bind(this)}
					className="fav fa fa-star right" aria-hidden="true"></i>
			</div>
		);
	}
}

Favorites.propTypes = {
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

module.exports = connect( mapStateToProps, mapDispatchToProps )(Favorites);
