import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { toggleFavorite } from '../../actions';

class Evento extends Component {
	render() {
		return (
			<div className="item">
				<Link to={this.props.path}>{this.props.item.name}</Link>
				<i onClick={this.props.toggleFavorite.bind(this, this.props.item.id)}
					className={ this.props.item.favorite ? 'fa fa-star right' : 'fa fa-star-o right'} aria-hidden="true"></i>
			</div>
		);
	}
}

Evento.propTypes = {
	item: PropTypes.object,
	path: PropTypes.string,
	toggleFavorite: PropTypes.func
};

const mapStateToProps = () => {
	return {  };
};

const mapDispatchToProps = (dispatch) => {
	return {
		toggleFavorite: eventID => dispatch(toggleFavorite(eventID))
	};
};

module.exports = connect( mapStateToProps, mapDispatchToProps )(Evento);
