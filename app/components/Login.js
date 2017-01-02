import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
const firebase = require('firebase/app');
require('firebase/auth');
//	import languages from '../translate.js';

class Login extends Component {
	render() {
		return (
			<div className="bg-img-green page">
				<img className="logo" src="app/img/iso-blanco2.svg" ></img>
				<input ref="mail" type="text" placeholder={this.props.languages[this.props.language].ingreso.email} /><br />
				<input ref="pass" type="password" placeholder={this.props.languages[this.props.language].ingreso.clave} /><br />
				<button className="btn btn-primary w50 l" onClick={this.props.loginWithGoogle.bind(this)} >
					<i className="fa fa-google-plus" aria-hidden="true"></i>
				</button>
				<button className="btn btn-primary w50 r" onClick={this.props.loginWithFacebook.bind(this)} >
					<i className="fa fa-facebook" aria-hidden="true"></i>
				</button>
				<button style={{marginTop: '15px'}} className="btn btn-primary" onClick={this.props.login.bind(this)}>
					{this.props.languages[this.props.language].ingreso.ingresar} <span><i className="fa fa-chevron-right" aria-hidden="true"></i></span>
				</button>

				<div><Link className="centered" to="/registro">
					{this.props.languages[this.props.language].ingreso.registro}
				</Link></div>
			</div>
		);
	}
}

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
	return {
		login() {
			if(this.refs.mail.value === '') {
				alert('Debe ingresar el email antes de proseguir');
			}else if(this.refs.mail.value.indexOf('@') === -1 || this.refs.mail.value.indexOf('.') === -1) {
				alert('Debe ingresar un email válido');
			}else if(this.refs.pass.value === '') {
				alert('La contraseña no puede ser vacía');
			}else if(this.refs.pass.value.length < 8) {
				alert('La contraseña debe tener al menos 8 caracteres');
			}else {
				this.props.loginWithMail(this.refs.mail.value, this.refs.pass.value);
			}
		},
		loginWithFacebook: () => {
			const provider = new firebase.auth.FacebookAuthProvider();
			provider.addScope('email');
			firebase.auth().signInWithPopup(provider).then(function(result) {
				const token = result.credential.accessToken;
				const user = result.user;
				console.log('Facebook Success', token, user);
			}).catch(function(error) {
				const errorCode = error.code;
				const errorMessage = error.message;
				const email = error.email;
				const credential = error.credential;
				console.log('Facebook Error', errorCode, errorMessage, email, credential);
			});
		},
		loginWithGoogle: () => {
			const provider = new firebase.auth.GoogleAuthProvider();
			provider.addScope('https://www.googleapis.com/auth/plus.login');

			firebase.auth().signInWithPopup(provider).then(function(result) {
				const token = result.credential.accessToken;
				const user = result.user;
				console.log('Google Success', token, user);
			}).catch(function(error) {
				const errorCode = error.code;
				const errorMessage = error.message;
				const email = error.email;
				const credential = error.credential;
				console.log('Google Error', errorCode, errorMessage, email, credential);
			});
		},
		loginWithMail: (mail, pass) => {
			if (firebase.apps.length === 0) {
				const config = {
					apiKey: 'AIzaSyDw-u_c-vvKMtoE-Ha0KjBgXbCPcSUWENs',
					authDomain: 'clanapp-d35d2.firebaseapp.com',
					databaseURL: 'https://clanapp-d35d2.firebaseio.com',
					storageBucket: 'clanapp-d35d2.appspot.com',
					messagingSenderId: '935866938730'
				};
				firebase.initializeApp(config);
			}

			firebase.auth().signInWithEmailAndPassword(mail, pass)
				.then(function(user) {
					console.log('Login results: ', user);
				})
				.catch(function(error) {
					// Handle Errors here.
					const errorCode = error.code;
					const errorMessage = error.message;
					if (errorCode === 'auth/wrong-password') {
						alert('Wrong password.');
					} else {
						alert(errorMessage);
					}
					console.log('mail login error', error);
					return;
				});
		}
	};
};

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(Login);
