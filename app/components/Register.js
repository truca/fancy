import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { setLoginType, setShouldUpdateData } from '../actions';
const firebase = require('firebase/app');
require('firebase/auth');
//	import languages from '../translate.js';

class Register extends Component {
	componentDidMount() {
		this.props.loginType('register');
	}
	render() {
		return (
			<div id="register" className="bg-img-green page">
				<img className="logo" src="app/img/iso-blanco2.svg" ></img>
				<input ref="mail" type="text" placeholder={this.props.languages[this.props.language].registro.email} /><br />
				<input ref="pass" type="password" placeholder={this.props.languages[this.props.language].registro.clave} /><br />
				<input ref="pass_conf" type="password" placeholder={this.props.languages[this.props.language].registro.confirmar_clave} /><br />
				<Link className="reset" to="/reset">Reset Password</Link>
				<button className="btn btn-primary w50 l" onClick={this.props.loginWithGoogle.bind(this)} >
					<i className="fa fa-google-plus" aria-hidden="true"></i>
				</button>
				<button className="btn btn-primary w50 r" onClick={this.props.loginWithFacebook.bind(this)} >
					<i className="fa fa-facebook" aria-hidden="true"></i>
				</button>
				<button style={{marginTop: '15px'}} className="btn btn-primary" onClick={this.props.register.bind(this)}>
					{this.props.languages[this.props.language].registro.registrarse} <span><i className="fa fa-chevron-right" aria-hidden="true"></i></span>
				</button>

				<div><Link className="centered" to="/conexion">{this.props.languages[this.props.language].registro.ingreso}</Link></div>
			</div>
		);
	}
}
//	{this.props.languages[this.props.language].ingreso.reset_password}
Register.propTypes = {
	register: PropTypes.func,
	loginType: PropTypes.func,
	registerWithMail: PropTypes.func,
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
		register() {
			dispatch(setShouldUpdateData(true));
			if(this.refs.mail.value === '') {
				alert(this.props.languages[this.props.language].alert.login_mail_no_ingresado);
			}else if(this.refs.mail.value.indexOf('@') === -1 || this.refs.mail.value.indexOf('.') === -1) {
				alert(this.props.languages[this.props.language].alert.login_mail_invalido);
			}else if(this.refs.pass.value === '') {
				alert(this.props.languages[this.props.language].alert.login_clave_vacia);
			}else if(this.refs.pass.value.length < 8) {
				alert(this.props.languages[this.props.language].alert.login_clave_muy_corta);
			}else if(this.refs.pass.value !== this.refs.pass_conf.value) {
				alert(this.props.languages[this.props.language].alert.registro_error_claves_iguales);
			}else {
				this.props.registerWithMail(this.refs.mail.value, this.refs.pass.value);
			}
		},
		loginWithFacebook: () => {
			const provider = new firebase.auth.FacebookAuthProvider();

			firebase.auth().signInWithRedirect(provider).then(function() {
				firebase.auth().getRedirectResult().then(function(result) {
					console.log('success ' + JSON.stringify(result));
				}).catch(function(error) {
					console.log('error ' + JSON.stringify(error));
				});
			});
		},
		loginWithGoogle: () => {
			const provider = new firebase.auth.GoogleAuthProvider();

			firebase.auth().signInWithRedirect(provider).then(function() {
				firebase.auth().getRedirectResult().then(function(result) {
					console.log('success ' + JSON.stringify(result));
				}).catch(function(error) {
					console.log('error ' + JSON.stringify(error));
				});
			});
		},
		registerWithMail: (mail, pass) => {
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

			firebase.auth().createUserWithEmailAndPassword(mail, pass)
				.then(function(resultsRegister) {
					console.log('Resultados registro ', resultsRegister);
					firebase.auth().signInWithEmailAndPassword(mail, pass)
						.then(function(user) {
							console.log('Login user: ', user);
							//	dispatch(actions.setUser(user.providerData[0]));
							//	push(null, '/mapa');
							//	console.log(firebase.auth().currentUser);
						})
						.catch(function(error) {
							// Handle Errors here.
							const errorCode = error.code;
							const errorMessage = error.message;
							if (errorCode === 'auth/wrong-password') {
								alert(this.props.languages[this.props.language].alert.registro_clave_incorrecta);
							} else {
								alert(errorMessage);
							}
							//	console.log('mail login error', error);
							//	dispatch(actions.logout());
							return;
						});
				})
				.catch(function(error) {
					// Handle Errors here.
					console.log(error);
					const errorCode = error.code;
					const errorMessage = error.message;

					if (errorCode === 'auth/wrong-password') {
						alert(this.props.languages[this.props.language].alert.registro_clave_incorrecta);
					} else {
						alert(errorMessage);
					}
					console.log('mail login error', error);
					return;
				});

			/*	firebase.auth().onAuthStateChanged(function(user) {
				if(user && user.providerData.length === 1) {
					console.log('changed', {user: user.providerData[0]});
					dispatch(actions.setUser(user.providerData[0]));
				}else{
					console.log('changed', user);
					dispatch(actions.logout());
				}
			});*/
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Register);
