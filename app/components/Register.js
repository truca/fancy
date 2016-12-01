import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
const firebase = require('firebase/app');
require('firebase/auth');

class Register extends Component {
	render() {
		return (
			<div>
				<h2>Registro</h2>

				<span>Usuario</span><br />
				<input ref="mail" type="text" placeholder="ejemplo@mail.com" /><br />
				<span>Contraseña</span><br />
				<input ref="pass" type="password" /><br />
				<span>Repita Contraseña</span><br />
				<input ref="pass_conf" type="password" /><br />
				<button style={{marginTop: '15px'}} className="btn btn-primary" onClick={this.props.register.bind(this)}>
					Registrarse
				</button>

				<div><Link to="/conexion">Conectarse</Link></div>
			</div>
		);
	}
}

Register.propTypes = {
	register: PropTypes.func,
	registerWithMail: PropTypes.func
};

const mapStateToProps = () => {
	return {};
};

const mapDispatchToProps = () => {
	return {
		register() {
			if(this.refs.mail.value === '') {
				alert('Debe ingresar el email antes de proseguir');
			}else if(this.refs.mail.value.indexOf('@') === -1 || this.refs.mail.value.indexOf('.') === -1) {
				alert('Debe ingresar un email válido');
			}else if(this.refs.pass.value === '') {
				alert('La contraseña no puede ser vacía');
			}else if(this.refs.pass.value.length < 8) {
				alert('La contraseña debe tener al menos 8 caracteres');
			}else if(this.refs.pass.value !== this.refs.pass_conf.value) {
				alert('La contraseña y su confirmación deben ser iguales');
			}else {
				this.props.registerWithMail(this.refs.mail.value, this.refs.pass.value);
			}
		},
		registerWithMail: (mail, pass) => {
			if (firebase.apps.length === 0) {
				const config = {
					apiKey: 'AIzaSyABifHRllp38ueVG59B9AeOgdIZpL6TaNs',
					authDomain: 'test-auth-27d2f.firebaseapp.com',
					databaseURL: 'https://test-auth-27d2f.firebaseio.com',
					storageBucket: 'test-auth-27d2f.appspot.com',
					messagingSenderId: '508207233116'
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
								alert('Wrong password.');
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
						alert('Wrong password.');
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
