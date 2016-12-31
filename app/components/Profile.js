import React, { Component, PropTypes } from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import * as actions from '../actions';
import fU from '../Utils.js';

class Profile extends Component {
	updateUser() {
		const data = {
			user: {
				name: this.refs.name.value || null,
				gender: this.refs.gender.value || null,
				country: this.refs.country.value || null,
				age: this.refs.age.value || null,
				language: this.refs.language.value || null,
			}
		};
		console.log(data);
		this.props.initU().put('user',
			actions.noAction, actions.setUser, actions.noAction, data, {Authorization: this.props.user.token});
	}
	render() {
		const ages = [];
		let age = 10;

		while(age < 100) {
			ages.push(age);
			age++;
		}

		return (
			<div id="profile">
				<h2>Perfil</h2>
				<div className="notifications">
					<span>NOTIFICACIONES</span> <input type="checkbox" style={{float: 'right'}}/>
				</div>
				<div>
					<input ref="name" type="text" placeholder="NOMBRE" defaultValue={this.props.user && this.props.user.name} />
				</div>
				<div>
					<select ref="age" defaultValue={this.props.user && this.props.user.age}>
						<option disabled >EDAD</option>
						{ R.map(function(anio) { return (<option key={anio}>{anio}</option>); }, ages) }
					</select>
				</div>
				<div>
					<select ref="gender" defaultValue={this.props.user && this.props.user.gender}>
						<option disabled >GÉNERO</option>
						<option value="m">MASCULINO</option>
						<option value="f">FEMENINO</option>
					</select>
				</div>
				<div>
					<select ref="language" defaultValue={this.props.user && this.props.user.language}>
						<option disabled >LENGUAJE</option>
						<option value={0}>ESPAÑOL</option>
						<option value={1}>ENGLISH</option>
					</select>
				</div>
				<div>
					<select ref="country" defaultValue={this.props.user && this.props.user.country}>
						<option disabled >PAÍS</option>
						<option value={0}>CHILE</option>
						<option value={1}>ARGENTINA</option>
					</select>
				</div>
				<div>
					<input type="text" placeholder="AVATAR" defaultValue={this.props.user && this.props.user.image} />
				</div>
				<button onClick={this.updateUser.bind(this)} >Enviar Cambios</button>
			</div>
		);
	}
}

Profile.propTypes = {
	initU: PropTypes.func,
	user: PropTypes.object
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
)(Profile);
