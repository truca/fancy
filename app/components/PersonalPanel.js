import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import languages from '../translate.js';
import { Link } from 'react-router';

class PersonalPanel extends Component {
	render() {
		return (
			<div id="panel">
				<h2>{languages[this.props.language].panel_personal.perfil}</h2>

				<div id="links">
					<div><Link to="/chatsPersonales">{languages[this.props.language].panel_personal.chats_personales}</Link></div>
					<div><Link to="/chatsPropios">{languages[this.props.language].panel_personal.administrar_chats}</Link></div>
					<div><Link to="/perfil">{languages[this.props.language].panel_personal.perfil}</Link></div>
				</div>
			</div>
		);
	}
}

PersonalPanel.propTypes = {
	user: PropTypes.object,
	initU: PropTypes.func,
	params: PropTypes.object,
	userInspected: PropTypes.object,
	history: PropTypes.object,
	language: PropTypes.string,
};

const mapStateToProps = (state) => {
	return {
		user: state.user,
		userInspected: state.userInspected,
		language: state.language,
	};
};

const mapDispatchToProps = () => {
	return { };
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PersonalPanel);
