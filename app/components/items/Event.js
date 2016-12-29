import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { toggleFavorite } from '../../actions';
import * as actions from '../../actions';
import fU from '../../Utils.js';

class Evento extends Component {
	constructor(props) {
		super(props);
		this.state = {
			favorite: false
		};
	}
	componentDidMount() {
		//	get al favorito del local
		this.props.initU().get('chats/' + this.props.item.id + '/subscribe.json',
			actions.noAction, actions.noAction, actions.noAction, {}, {Authorization: this.props.user.token});
		this.setState({ favorite: true });
	}
	toggleFavorite(eventID) {
		console.log(eventID);
		if(this.state.favorite) {
			this.props.initU().delete('chats/' + eventID + '/subscribe.json',
				actions.noAction, actions.noAction, actions.noAction, {}, {Authorization: this.props.user.token});
		}else {
			this.props.initU().post('chats/' + eventID + '/subscribe.json',
				actions.noAction, actions.noAction, actions.noAction, {}, {Authorization: this.props.user.token});
		}
		this.setState({ favorite: !this.state.favorite });
	}
	render() {
		return (
			<div className="item">
				<Link to={this.props.path}>{this.props.item.name}</Link>
				<i onClick={this.toggleFavorite.bind(this, this.props.item && this.props.item.id)}
					className={ this.state.favorite ? 'fa fa-star right' : 'fa fa-star-o right'} aria-hidden="true"></i>
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

module.exports = connect( mapStateToProps, mapDispatchToProps )(Evento);
