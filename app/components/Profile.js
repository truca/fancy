import React, { Component, PropTypes } from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import * as actions from '../actions';
import fU from '../Utils.js';
import axios from 'axios';
import ToggleButton from 'react-toggle-button';
import * as types from '../actions/types';

class Profile extends Component {
	componentDidMount() {
		this.props.initU().get('https://restcountries.eu/rest/v1/all', actions.noAction, actions.setCountries, actions.noAction);
		this.props.initU().get('categories.json', actions.noAction, actions.setCategories, actions.noAction);
		if( this.props.user && this.props.user.token) {
			this.props.initU().get('user/categories/favorites.json', actions.noAction, actions.setFavoritesCategories, actions.noAction, {Authorization: this.props.user.token});
		}
	}
	componentWillReceiveProps(nextProps) {
		if(nextProps.categories.length != this.props.categories.length) this.props.setCategories(nextProps.categories);
	}
	updateCategory(category, value) {
		console.log('Update Category', category, value);
		axios.defaults.headers.common.Authorization = this.props.user.token;
		if(value) {
			//	POST con un objeto { favorite: { category_id: categoryID }} a /user/categories/favorites
			this.props.addFavoriteCategory(category);
			axios.post('http://138.197.8.69/user/categories/favorites', { favorite: { category_id: category.id }})
				.then(res => console.log('success', res))
				.catch(err => console.log('error', err));
		}else{
			this.props.removeFavoriteCategory(category.id);
			axios.delete('http://138.197.8.69/user/categories/favorites/' + category.id)
				.then(res => console.log('success', res))
				.catch(err => console.log('error', err));
		}
	}
	setUser() {
		this.props.initU().get('user', actions.noAction, actions.setUser, actions.noAction, {Authorization: this.props.user.token});
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
				<div className="profilePic">
					<img id="portrait" src={ 'http://138.197.8.69' + this.props.user.image } ></img>
					<div id="changeImage">
						<button onClick={ typeof capturePhotoUser !== 'undefined' ? capturePhotoUser.bind(this, this.props.user, this.setUser.bind(this), this.props.languages[this.props.language].imagen.exito, this.props.languages[this.props.language].imagen.error, pictureSource.CAMERA) : ()=>{} }>
							<i className="fa fa-camera" aria-hidden="true"></i>
						</button>
						<button onClick={ typeof capturePhotoUser !== 'undefined' ? capturePhotoUser.bind(this, this.props.user, this.setUser.bind(this), this.props.languages[this.props.language].imagen.exito, this.props.languages[this.props.language].imagen.error, pictureSource.PHOTOLIBRARY) : ()=>{} }>
							<i className="fa fa-th" aria-hidden="true"></i>
						</button>
					</div>
				</div>
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
						<option value="m">{this.props.languages[this.props.language].perfil.hombre}</option>
						<option value="f">{this.props.languages[this.props.language].perfil.mujer}</option>
					</select>
				</div>
				<div>
					<select ref="language" defaultValue={this.props.user && this.props.user.language}>
						<option>{this.props.languages[this.props.language].perfil.lenguaje}</option>
						{Object.keys(this.props.languages).map(language => {
							return (<option key={language}>{language.toUpperCase()}</option>);
						})}
					</select>
				</div>
				<div>
					<select ref="country" defaultValue={this.props.user && this.props.user.country}>
						<option>{this.props.languages[this.props.language].perfil.pais}</option>
						{this.props.countries.map(country => {
							return (<option key={country.name}>{country.name.toUpperCase()}</option>);
						})}
					</select>
				</div>
				<div>
					<h4>{this.props.languages[this.props.language].perfil.categorias_favoritas}</h4>
				</div>
				<div className="notifications">
					{this.props.categories.map((category) => {
						console.log('Categories', this);
						let toggleValue = R.find(R.propEq('id', category.id), this.props.favoritesCategories) || false;
						const name = R.find(categoryName => categoryName.code == this.props.acronym, category.category_names);
						return (
							<div key={category.id} style={{marginBottom: '5px'}}>
								<span>{ typeof name !== 'undefined' ? name.name.toUpperCase() : category.name.toUpperCase()}</span>
								<span style={{float: 'right'}}>
									<ToggleButton
										value={ toggleValue }
									  onToggle={(value) => { console.log('dis', this); this.updateCategory(category, !value).bind(this); }}
									/>
								</span>
							</div>
						);
					})}
				</div>
				<button onClick={this.props.updateUser.bind(this)} >{this.props.languages[this.props.language].perfil.enviar_cambios}</button>
			</div>
		);
	}
}

Profile.propTypes = {
	initU: PropTypes.func,
	addFavoriteCategory: PropTypes.func,
	removeFavoriteCategory: PropTypes.func,
	user: PropTypes.object,
	categories: PropTypes.array,
	favoritesCategories: PropTypes.array,
	history: PropTypes.object,
	language: PropTypes.string, languages: PropTypes.object,
	countries: PropTypes.array,
	updateUser: PropTypes.func,
	setCategories: PropTypes.func,
	acronym: PropTypes.string,
};

const mapStateToProps = (state) => {
	return {
		language: state.language, languages: state.languages,
		user: state.user,
		acronym: state.languageAcronym.acronym,
		categories: state.categories,
		countries: state.countries,
		shouldUpdateData: state.shouldUpdateData,
		favoritesCategories: state.favoritesCategories,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		initU: () => { return fU(dispatch); },
		setCategories: (categories) => { dispatch(actions.setCategories(categories)); },
		addFavoriteCategory: (category) => { dispatch(actions.addFavoriteCategory(category)); },
		removeFavoriteCategory: (categoryID) => { dispatch(actions.removeFavoriteCategory(categoryID)); },
		updateUser: function() {
			dispatch(actions.setShouldUpdateData(false));
			const data = {
				user: {
					name: this.refs.name && this.refs.name.value || null,
					gender: this.refs.gender && this.refs.gender.value || null,
					country: this.refs.country && this.refs.country.value || null,
					age: this.refs.age && this.refs.age.value || null,
					language: this.refs.language && this.refs.language.value || null,
				}
			};
			console.log(data);
			this.props.initU().put('user',
				actions.noAction,
				(res) => { alert(this.props.languages[this.props.language].alert.perfil_exito_edicion); return actions.setUser(res); },
				() => { alert(this.props.languages[this.props.language].alert.perfil_error_edicion); return { type: types.NO_ACTION }; }, data, {Authorization: this.props.user.token});
			this.props.history.push('/');
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Profile);
