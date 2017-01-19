import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
const firebase = require('firebase/app');
require('firebase/auth');
//	import languages from '../translate.js';

class Login extends Component {
	sendReset() {
		firebase.auth().sendPasswordResetEmail(this.refs.mail.value)
			.then(res => {alert('La clave ha sido reseteada exitosamente, revise su email.'); console.log(res); })
			.catch(err => {alert('Hubo un error reseteando su clave'); console.log(err); });
	}
	render() {
		return (
			<div className="bg-img-green page">
				<img className="logo" src="app/img/iso-blanco2.svg" ></img>
				<input ref="mail" type="text" placeholder={this.props.languages[this.props.language].ingreso.email} /><br />

				<button style={{marginTop: '15px'}} className="btn btn-primary" onClick={this.sendReset.bind(this)}>
					RESET PASSWORD
				</button>

				<div><Link className="centered" to="/registro">
					{this.props.languages[this.props.language].registro.ingreso}
				</Link></div>
			</div>
		);
	}
}
//  {this.props.languages[this.props.language].reset.password}
Login.propTypes = {
	loginWithMail: PropTypes.func,
	login: PropTypes.func,
	loginWithGoogle: PropTypes.func,
	loginWithFacebook: PropTypes.func,
	language: PropTypes.string, languages: PropTypes.object,
};

const mapStateToProps = (state) => {
	return {
		language: state.language,
		languages: state.languages,
	};
};

const mapDispatchToProps = () => {
	return { };
};

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(Login);
