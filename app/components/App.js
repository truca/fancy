import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions';
import fU from '../Utils.js';
const axios = require('axios');
const firebase = require('firebase/app');
require('firebase/auth');
import R from 'ramda';

class App extends Component {
	componentDidMount() {
		this.props.initU().setPush(this.props.history.push);
		this.props.initU().get('languages.json', actions.noAction, actions.setLanguages, actions.noAction);

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
	goMap() {
		if(this.props.shouldUpdateData) {
			return;
		}
		this.props.history.push('/mapa');
	}
	render() {
		return (
			<div className="container">
				<div className="row">
					<div id="mySidenav" className="sidenav">
						<ul>
							<a className="closebtn" onClick={this.props.closeNav} style={{cursor: 'pointer'}}>&times;</a>
							<li><Link onClick={this.props.closeNav} to="/mapa">{this.props.languages[this.props.language].menu.mapa}</Link></li>
							<li><Link onClick={this.props.closeNav} to="/lista">{this.props.languages[this.props.language].menu.lista}</Link></li>
							{this.props.user ? (
								<div>
									<li><Link onClick={this.props.closeNav} to="/chatsSuscritos">{this.props.languages[this.props.language].menu.chats_suscritos}</Link></li>
									<li><Link onClick={this.props.closeNav} to="/chatsRecientes">{this.props.languages[this.props.language].lista.chats_mios}</Link></li>
									<li><Link onClick={this.props.closeNav} to="/chatsPersonales">{this.props.languages[this.props.language].menu.chats_personales}</Link></li>
									<li><Link onClick={this.props.closeNav} to="/panelPersonal">{this.props.languages[this.props.language].menu.panel_personal}</Link></li>
									<li><a style={{cursor: 'pointer'}} onClick={this.props.logout}>{this.props.languages[this.props.language].menu.desconectarse}</a></li>
								</div>
							) : (
								<div>
									<li><Link onClick={this.props.closeNav} to="/conexion">{this.props.languages[this.props.language].menu.conexion}</Link></li>
									<li><Link onClick={this.props.closeNav} to="/registro">{this.props.languages[this.props.language].menu.registro}</Link></li>
								</div>
							)}
							<li><Link onClick={this.props.closeNav} to="/acerca">{this.props.languages[this.props.language].menu.acerca}</Link></li>
						</ul>
						<select ref="language" onChange={this.props.setLanguage.bind(this)} defaultValue={this.props.language} >
							{Object.keys(this.props.languages).map((language, i) => <option key={i} value={language} >{language.toUpperCase()}</option> )}
						</select>
					</div>
					<div id="nav" className="bg-green">
						<span className="back" onClick={this.goMap.bind(this)}>
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
	loginType: PropTypes.string,
	shouldUpdateData: PropTypes.bool,
	user: PropTypes.object,
	logout: PropTypes.func,
	initU: PropTypes.func,
	history: PropTypes.object,
	userHandler: PropTypes.func,
	openNav: PropTypes.func,
	closeNav: PropTypes.func,
	language: PropTypes.string, languages: PropTypes.object,
	setLanguage: PropTypes.func,
};

const mapStateToProps = (state) => {
	return {
		user: state.user,
		loginType: state.loginType,
		shouldUpdateData: state.shouldUpdateData,
		language: state.language,
		languages: state.languages,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setLanguage() {
			dispatch(actions.setLanguage(this.refs.language.value));
		},
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
			//	To handle the errors for social login
			firebase.auth().getRedirectResult().then(function(result) {
				//	success case will be handled with onAuthStateChanged.
				console.log(result);
			}).catch(function(error) {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log('error', errorCode, errorMessage);
			});

			firebase.auth().onAuthStateChanged(function(user) {
				if(user && user.providerData.length === 1) {
					console.log('changed', { user });
					axios.post(self.props.initU().apiUrl + 'users/sign_in.json', { user: R.merge(user.providerData[0], { uid: user.uid }) })
						.then(userRegister => {
							console.log('THEN sign_in', {user: userRegister.data} );
							dispatch(actions.setUser(userRegister.data.data));
							if(localStorage.getItem('clanapp_user_token')) {
								console.log('localStorage Token >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
								console.log(localStorage.getItem('clanapp_user_token'));
								self.props.initU().put('user',
									actions.noAction, actions.setUser, actions.noAction, { user: {notify: localStorage.getItem('clanapp_user_token') }},
										{Authorization: self.props.user.token});
							}else{ console.log('NOT localStorage Token >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>'); }

							if(self.props.loginType == 'register') {
								self.props.history.push('/perfil');
							}else{
								self.props.history.push('/mapa');
							}
						})
						.catch(errorRegister => {
							console.log('CATCH sign_in', errorRegister);
							axios.post(self.props.initU().apiUrl + 'users/sign_up.json', {user: R.merge(user.providerData[0], { uid: user.uid }) })
								.then(userLogin => {
									console.log('THEN sign_up', {user: userLogin.data.data});
									dispatch(actions.setUser(userLogin.data.data));
									dispatch(actions.setShouldUpdateData(true));
									if(localStorage.getItem('clanapp_user_token')) {
										console.log('localStorage Token >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
										console.log(localStorage.getItem('clanapp_user_token'));
										self.props.initU().put('user',
											actions.noAction, actions.setUser, actions.noAction, { user: {notify: localStorage.getItem('clanapp_user_token') }},
												{Authorization: self.props.user.token});
									}else{ console.log('NOT localStorage Token >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>'); }

									self.props.history.push('/perfil');
									//	self.props.history.push('/mapa');
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
