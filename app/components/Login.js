import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { setLoginType } from '../actions';
const firebase = require('firebase/app');
require('firebase/auth');
//	import languages from '../translate.js';

class Login extends Component {
	componentDidMount() {
		this.props.loginType('login');
	}
	render() {
		return (
			<div id="login" className="bg-img-green page">
				<img className="logo" src="img/iso-blanco2.svg" ></img>
				<input ref="mail" type="text" placeholder={this.props.languages[this.props.language].ingreso.email} /><br />
				<input ref="pass" type="password" placeholder={this.props.languages[this.props.language].ingreso.clave} /><br />
				<Link className="reset" to="/reset">Reset Password</Link>
				<button style={{display: 'none'}} className="btn btn-primary w50 l" onClick={this.props.loginWithGoogle.bind(this)} >
					<i className="fa fa-google-plus" aria-hidden="true"></i>
				</button>
				<button className="btn btn-primary w100 r" onClick={this.props.loginWithFacebook.bind(this)} >
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
//	{this.props.languages[this.props.language].ingreso.reset_password}
Login.propTypes = {
	loginWithMail: PropTypes.func,
	login: PropTypes.func,
	loginType: PropTypes.func,
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

const mapDispatchToProps = (dispatch) => {
	return {
		loginType: (type) => { dispatch(setLoginType(type)); },
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
			if(typeof facebookConnectPlugin !== 'undefined') {
				facebookConnectPlugin.login(['public_profile'], (result) => {
					const provider = firebase.auth.FacebookAuthProvider.credential(result.authResponse.accessToken);
					console.log('Facebook success: ' + JSON.stringify(result));

					firebase.auth().signInWithCredential(provider)
						.then(res => {
							console.log('Firebase success: ' + JSON.stringify(res));
						})
						.catch(function(error) {
							//	const errorCode = error.code;
							const errorMessage = error.message;
							console.log('Firebase failure: ' + JSON.stringify(error));
							if(errorMessage == 'The email address is already in use by another account.') {
								alert('Esta dirección de email ya esta en uso');
							}else if(errorMessage == 'The password is invalid or the user does not have a password.') {
								alert('La contraseña es incorrecta o el usuario no tiene una');
							}else if(errorMessage == 'There is no user record corresponding to this identifier. The user may have been deleted.') {
								alert('No hay un usuario con estas credenciales. Por favor regístrate');
							}

							//	var email = error.email;
							//	var credential = error.authResponse;
							reject(error);
						});
				}, (err) => {
					console.log(JSON.stringify(err));
				});
			}

			const provider = new firebase.auth.FacebookAuthProvider();
			provider.addScope('email');
			firebase.auth().signInWithPopup(provider).then(function(result) {
				const token = result.credential.accessToken;
				const user = result.user;
				console.log('Facebook Success, ' + token + ', ' + JSON.stringify(user));
			}).catch(function(error) {
				/*	const errorCode = error.code;
				const errorMessage = error.message;
				const email = error.email;
				const credential = error.credential;*/
				console.log('Facebook Error ' + JSON.stringify(error));
			});
		},
		loginWithGoogle: () => {
			const provider = new firebase.auth.GoogleAuthProvider();
			provider.addScope('https://www.googleapis.com/auth/plus.login');

			firebase.auth().signInWithPopup(provider).then(function(result) {
				const token = result.credential.accessToken;
				const user = result.user;
				console.log('Google Success, ' + token + ', ' + JSON.stringify(user));
			}).catch(function(error) {
				/*	const errorCode = error.code;
				const errorMessage = error.message;
				const email = error.email;
				const credential = error.credential;*/
				console.log('Google Error ' + JSON.stringify(error));
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
