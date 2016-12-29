import React, { PropTypes, Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions';
import fU from '../Utils.js';
const axios = require('axios');
const firebase = require('firebase/app');
require('firebase/auth');

class App extends Component {
	componentDidMount() {
		const anchor = document.getElementById('main');
		if(anchor.addEventListener) anchor.addEventListener('click', this.props.closeNav, false);

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
		this.props.userHandler(this);
	}
	goBack() {
		browserHistory.goBack();
	}
	render() {
		return (
			<div className="container">
				<div className="row">
					<div id="mySidenav" className="sidenav">
						<ul>
							<a className="closebtn" onClick={this.props.closeNav} style={{cursor: 'pointer'}}>&times;</a>
							<li><Link onClick={this.props.closeNav} to="/mapa">Mapa</Link></li>
							<li><Link onClick={this.props.closeNav} to="/lista">Lista</Link></li>
							{this.props.user ? (
								<div>
									<li><Link onClick={this.props.closeNav} to="/chatsSuscritos">Chats Suscritos</Link></li>
									<li><Link onClick={this.props.closeNav} to="/chatsPersonales">Chats Personales</Link></li>
									<li><Link onClick={this.props.closeNav} to="/panelPersonal">Panel Personal</Link></li>
									<li><a style={{cursor: 'pointer'}} onClick={this.props.logout}>Desconectarse</a></li>
								</div>
							) : (
								<div>
									<li><Link onClick={this.props.closeNav} to="/conexion">Conexión</Link></li>
									<li><Link onClick={this.props.closeNav} to="/registro">Registro</Link></li>
								</div>
							)}
							<li><Link to="/acerca">Acerca</Link></li>
						</ul>
					</div>
					<div id="nav" className="bg-green">
						<span className="back" onClick={this.goBack}>
							<i className="fa fa-chevron-left fa-2x" aria-hidden="true"></i>
						</span>
						<Link to="/"><img className="logo" src="app/img/logo-blanco2.svg" ></img></Link>
						<span className="menu" onClick={this.props.openNav}>
							<i className="fa fa-bars fa-2x" aria-hidden="true"></i>
						</span>
					</div>
					<div id="main" className="">
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
	userHandler: PropTypes.func,
	openNav: PropTypes.func,
	closeNav: PropTypes.func
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
		openNav: () => {
			/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
			document.getElementById('mySidenav').style.width = '250px';
			//	document.getElementById('main').style.marginLeft = '250px';
			document.body.style.backgroundColor = 'rgba(0,0,0,0.4)';
		},
		closeNav: () => {
			/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
			document.getElementById('mySidenav').style.width = '0';
			//	document.getElementById('main').style.marginLeft = '0';
			document.body.style.backgroundColor = 'white';
		},
		userHandler: (self) => {
			firebase.auth().onAuthStateChanged(function(user) {
				if(user && user.providerData.length === 1) {
					console.log('changed', {user: user.providerData[0]});
					axios.post(self.props.initU().apiUrl + 'users/sign_in.json', {user: user.providerData[0]})
						.then(userRegister => {
							console.log('THEN sign_in', {user: userRegister.data} );
							dispatch(actions.setUser(userRegister.data));
							console.log('Hola');
							self.props.history.push('/mapa');
							//	self.props.history.push(null, '/mapa');
							//	self.context.router.push(null, '/mapa');
						})
						.catch(errorRegister => {
							console.log('CATCH sign_in', errorRegister);
							axios.post(self.props.initU().apiUrl + 'users/sign_up.json', {user: user.providerData[0]})
								.then(userLogin => {
									console.log('THEN sign_up', {user: userLogin.data});
									dispatch(actions.setUser(userLogin.data));
									console.log('Hola');
									self.props.history.push('/mapa');
									//	self.props.history.push(null, '/mapa');
									//	self.context.router.push(null, '/mapa');
								})
								.catch(errorLogin => { console.log('CATCH sign_up', errorLogin); });
						});
				}else{
					console.log('changed', user);
					self.props.history.push('/mapa');
				}
			});
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
