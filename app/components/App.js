import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions';
import fU from '../Utils.js';
const axios = require('axios');
const firebase = require('firebase/app');
require('firebase/auth');

class App extends Component {
	componentDidMount() {
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
		this.props.userHandler(this);
	}
	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-3">
						<div>
							<h4>Nav</h4>
							<ul>
								<li><Link to="/mapa">Mapa</Link></li>
								<li><Link to="/lista">Lista</Link></li>
								{this.props.user ? (
									<div>
										<li><Link to="/chatsPersonales">Chats Personales</Link></li>
										<li><Link to="/chatsSuscritos">Chats Suscritos</Link></li>
										<li><Link to="/panelPersonal">Panel Personal</Link></li>
										<li><a style={{cursor: 'pointer'}} onClick={this.props.logout}>Desconectarse</a></li>
									</div>
								) : (
									<div>
										<li><Link to="/conexion">Conexión</Link></li>
										<li><Link to="/registro">Registro</Link></li>
									</div>
								)}
								<li><Link to="/acerca">Acerca</Link></li>
							</ul>
						</div>
					</div>
					<div className="col-md-9">
						{ this.props.children }
					</div>
				</div>
			</div>
		);
	}
}

App.propTypes = {
	children: PropTypes.object,
	user: PropTypes.object,
	logout: PropTypes.func,
	initU: PropTypes.func,
	history: PropTypes.object,
	userHandler: PropTypes.func
};

const mapStateToProps = (state) => {
	return {
		user: state.user
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		logout: () => {
			firebase.auth().signOut();
			dispatch(actions.logout());
		},
		initU: () => { return fU(dispatch); },
		userHandler: (self) => {
			firebase.auth().onAuthStateChanged(function(user) {
				if(user && user.providerData.length === 1) {
					console.log('changed', {user: user.providerData[0]});
					axios.post(self.props.initU().apiUrl + '/users/sign_in.json', {user: user.providerData[0]})
						.then(userRegister => {
							console.log('THEN sign_in', {user: userRegister.data} );
							dispatch(actions.setUser(userRegister.data));
							//	self.props.history.push(null, '/mapa');
							//	self.context.router.push(null, '/mapa');
						})
						.catch(errorRegister => {
							console.log('CATCH sign_in', errorRegister);
							axios.post(self.props.initU().apiUrl + '/users/sign_up.json', {user: user.providerData[0]})
								.then(userLogin => {
									console.log('THEN sign_up', {user: userLogin.data});
									dispatch(actions.setUser(userLogin.data));
									//	self.props.history.push(null, '/mapa');
									//	self.context.router.push(null, '/mapa');
								})
								.catch(errorLogin => { console.log('CATCH sign_up', errorLogin); });
						});
				}else{
					console.log('changed', user);
				}
			});
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
