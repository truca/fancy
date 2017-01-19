import React, { Component, PropTypes } from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import * as actions from '../actions';
import fU from '../Utils.js';
import axios from 'axios';
//	import languages from '../translate.js';

class Profile extends Component {
	componentDidMount() {
		this.props.initU().get('categories.json', actions.noAction, actions.setCategories, actions.noAction);
		this.props.initU().get('/user/categories/favorites.json', actions.noAction, actions.setFavoritesCategories, actions.noAction);
	}
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
			actions.noAction,
			(res) => { alert('El usuario ha sido editado correctamente'); return actions.setUser(res); },
			() => { alert('El usuario no pudo ser editado'); return { type: NO_ACTION }; }, data, {Authorization: this.props.user.token});
		this.props.history.push('/');
	}
	updateCategory(categoryID) {
		//	console.log(categoryID, this.refs['category-' + categoryID].checked);
		axios.defaults.headers.common.Authorization = this.props.user.token;
		if(this.refs['category-' + categoryID].checked) {
			//	POST con un objeto { favorite: { category_id: categoryID }} a /user/categories/favorites
			axios.post('http://138.197.8.69/user/categories/favorites', { favorite: { category_id: categoryID }})
				.then(res => console.log('success', res))
				.catch(err => console.log('error', err));
		}else{
			axios.delete('http://138.197.8.69/user/categories/favorites/' + categoryID)
				.then(res => console.log('success', res))
				.catch(err => console.log('error', err));
		}
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
				<h2>{this.props.languages[this.props.language].perfil.perfil}</h2>
				<div>
					<input ref="name" type="text" placeholder={this.props.languages[this.props.language].perfil.nombre} defaultValue={this.props.user && this.props.user.name} />
				</div>
				<div>
					<select ref="age" defaultValue={this.props.user && this.props.user.age}>
						<option>{this.props.languages[this.props.language].perfil.edad}</option>
						{ R.map(function(anio) { return (<option key={anio}>{anio}</option>); }, ages) }
					</select>
				</div>
				<div>
					<select ref="gender" defaultValue={this.props.user && this.props.user.gender}>
						<option>{this.props.languages[this.props.language].perfil.genero}</option>
						<option value="m">MASCULINO</option>
						<option value="f">FEMENINO</option>
					</select>
				</div>
				<div>
					<select ref="language" defaultValue={this.props.user && this.props.user.language}>
						<option>{this.props.languages[this.props.language].perfil.lenguaje}</option>
						<option value={0}>ESPAÑOL</option>
						<option value={1}>ENGLISH</option>
					</select>
				</div>
				<div>
					<select ref="country" defaultValue={this.props.user && this.props.user.country}>
						<option>{this.props.languages[this.props.language].perfil.pais}</option>
						<option value={0}>CHILE</option>
						<option value={1}>ARGENTINA</option>
					</select>
				</div>
				<div>
					<input type="text" placeholder={this.props.languages[this.props.language].perfil.avatar} defaultValue={this.props.user && this.props.user.image} />
				</div>
				<div>
					<h4>Favorite Categories</h4>
				</div>
				<div className="notifications">
					{this.props.categories.map((category) => {
						return (
							<div key={category.id}>
								<span>{category.name.toUpperCase()}</span>
								<input ref={'category-' + category.id} type="checkbox" defaultChecked={R.find(R.propEq('id', category.id), this.props.favoritesCategories)} style={{float: 'right'}} onChange={this.updateCategory.bind(this, category.id)} />
							</div>
						);
					})}
				</div>
				<button onClick={this.updateUser.bind(this)} >{this.props.languages[this.props.language].perfil.enviar_cambios}</button>
			</div>
		);
	}
}

Profile.propTypes = {
	initU: PropTypes.func,
	user: PropTypes.object,
	categories: PropTypes.array,
	favoritesCategories: PropTypes.array,
	history: PropTypes.object,
	language: PropTypes.string, languages: PropTypes.object,
};

const mapStateToProps = (state) => {
	return {
		language: state.language, languages: state.languages,
		user: state.user,
		categories: state.categories,
		favoritesCategories: state.favoritesCategories,
	};
};

/*
Notifications
<div className="notifications">
	<span>{this.props.languages[this.props.language].perfil.notificaciones}</span> <input type="checkbox" style={{float: 'right'}}/>
</div>
*/

const mapDispatchToProps = (dispatch) => {
	return {
		initU: () => { return fU(dispatch); }
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Profile);
