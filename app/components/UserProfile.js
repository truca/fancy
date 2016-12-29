import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import fU from '../Utils.js';

class UserProfile extends Component {
	componentDidMount() {
		this.props.initU().get('users/' + this.props.params.id, actions.noAction, actions.noAction, actions.noAction);
	}
	createChat() {
		console.log('creando chat');
	}
	render() {
		return (
			<div id="userProfile">
				<h2>Perfil de usuario</h2>
				<img className="avatar" src={'http://servel.ml' + ((this.props.user && this.props.user.image) || '/assets/default-avatar.jpg')} />
				<div className="userData">
					<div>
						<span>Nombre:</span> <span className="right">{(this.props.user && this.props.user.name) || 'No disponible'}</span>
					</div>
					<div>
						<span>Edad:</span> <span className="right">{(this.props.user && this.props.user.age) || 'No disponible'}</span>
					</div>
					<div>
						<span>País:</span> <span className="right">{(this.props.user && this.props.user.country) || 'No disponible'}</span>
					</div>
					<div>
						<span>Género:</span> <span className="right">{(this.props.user && this.props.user.gender) || 'No disponible'}</span>
					</div>
				</div>
				<button onClick={this.createChat} >Chatear</button>
			</div>
		);
	}
}

UserProfile.propTypes = {
	user: PropTypes.object,
	initU: PropTypes.func,
	params: PropTypes.object
};

const mapStateToProps = (state) => {
	return {
		user: state.user
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		initU: () => { return fU(dispatch); }
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserProfile);
