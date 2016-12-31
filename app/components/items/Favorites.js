import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { toggleFavorite } from '../../actions';
import * as actions from '../../actions';
import fU from '../../Utils.js';

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
	render() {
		return (
			<div className="item">
				<Link to={this.props.path}>{this.props.item.name}</Link>
				<i onClick={this.deleteFavorite.bind(this)}
					className="fa fa-star right" aria-hidden="true"></i>
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
};

const mapStateToProps = (state) => {
	return {
		user: state.user
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		toggleFavorite: eventID => dispatch(toggleFavorite(eventID)),
		initU: () => { return fU(dispatch); }
	};
};

module.exports = connect( mapStateToProps, mapDispatchToProps )(Favorites);
