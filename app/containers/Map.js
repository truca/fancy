import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
const GoogleMapsLoader = require('google-maps');
import * as actions from '../actions';
import { Link } from 'react-router';
import fU from '../Utils.js';
import $ from 'jquery';
import R from 'ramda';
import addLocationButton from '../addLocationButton';

class MapContainer extends Component {
	constructor(props) {
		super(props);
		this.state = { category: null, map: null, markers: [], markerCluster: {} };
	}
	componentDidMount() {
		//	tratar de reutilizar un mapa ya existente
		/*	!this.props.map ?
			this.createMap(this.props.position ? this.props.position : { lat: 0, lon: 0 })
			: this.props.map;*/
		this.createMap(this.props.position ? this.props.position : { lat: 0, lon: 0 });

		this.getPosition((position) => {
			this.props.setPosition(position);
			//	recentrar
			this.createMap(position);
			//	this.props.map.setCenter({ lat: position.lat, lng: position.lon });
			//	this.props.marker.setPosition({ lat: position.lat, lng: position.lon });

			this.props.initU().get('chats.json?lat=' + position.lat + '&lng=' + position.lon, actions.noAction, actions.setEvents, actions.noAction);
			this.props.initU().get('categories.json', actions.noAction, actions.setCategories, actions.noAction);
			this.props.initU().get('user/categories/favorites.json', actions.noAction, actions.setFavoritesCategories, actions.noAction, {Authorization: this.props.user.token});
		});
	}
	componentWillReceiveProps(nextProps) {
		const events = R.sort((a, b) => a - b, R.map(event => event.id, this.props.events));
		const nEvents = R.sort((a, b) => a - b, R.map(event => event.id, nextProps.events));
		if(!R.equals(events, nEvents)) {
			this.drawMarkers(this, nextProps.events);
		}

		if(nextProps.map && nextProps.map === this.props.map) {
			this.drawMarkers(this, this.props.events);
		}
	}
	getPosition(callback) {
		if (navigator.geolocation) {
			//	console.log("POSITION");
			navigator.geolocation.getCurrentPosition(position => {
				//	alert('lat: ' + position.coords.latitude + ', lon: ' + position.coords.longitude);
				callback({ lat: position.coords.latitude, lon: position.coords.longitude  });
			}, () => {
				//	alert('Error:' + JSON.stringify(error));
				$.get('http://ipinfo.io', response => {
					const loc = response.loc.split(',');
					callback({lat: parseFloat(loc[0], 10), lon: parseFloat(loc[1], 10)});
				}, 'jsonp');
			}, {
				timeout: 10000
			});
		} else {
			$.get('http://ipinfo.io', response => {
				const loc = response.loc.split(',');
				callback({lat: parseFloat(loc[0], 10), lon: parseFloat(loc[1], 10)});
			}, 'jsonp');
			alert(this.props.languages[this.props.language].mapa.geolocalizacion_no_soportada);
		}
	}
	createMap(position) {
		GoogleMapsLoader.KEY = 'AIzaSyABifHRllp38ueVG59B9AeOgdIZpL6TaNs';
		GoogleMapsLoader.load(function(google) {
			//	Google = google;
			const myLatLng = {lat: position.lat, lng: position.lon};
			const map = new google.maps.Map(document.getElementById('map'), {
				zoom: 11,
				center: myLatLng,
				zoomControl: true,
				mapTypeControl: false,
				gestureHandling: 'greedy'
			});

			const myMarker = new google.maps.Marker({
				map: map,
				animation: google.maps.Animation.DROP,
				position: myLatLng
			});

			addLocationButton(map, myMarker);
			this.props.setMap(map);
			this.props.setMarker(myMarker);
		}.bind(this));
	}
	changeFilter() {
		this.drawMarkers(this, this.props.events);
	}
	drawMarkers(self, events) {
		console.log('drawMarkers events', events);
		GoogleMapsLoader.load(function(google) {
			self.state.markers.forEach(marker => marker.setMap(null));

			const newMarkers = [];
			events.forEach(function(event) {
				const filteredByName = event.name.toLowerCase().indexOf(self.refs.filter.value.toLowerCase()) != -1;
				const filteredByCategory = (!self.state.category && self.state.category != 0) || (self.state.category == -2 && !!R.find(favoritesCategory => favoritesCategory.id == event.category.id, self.props.favoritesCategories) ) || self.state.category == -1 || self.state.category == event.category.id;
				if( filteredByCategory && filteredByName ) {
					let marker = {lat: event.lat, lng: event.lng};
					let icon = event.hot ? 'app/img/icons/hot' : 'app/img/icons';
					icon += event.category.icon != '/icons/thumb/missing.png' && event.category.icon !== null ? '/' + event.category.icon : '/blank.png';
					marker = new google.maps.Marker({ position: marker, icon, map: self.props.map, title: 'Hello World!' }); // icon: 'img/icons/' + event.category.icon,
					marker.event = event;
					marker.addListener('click', () => {
						if(self.props.user) {
							self.props.history.push('/chats/' + marker.event.id);
						}else{
							alert(self.props.languages[self.props.language].mapa.alerta_necesitas_estar_conectado);
						}
					});
					newMarkers.push(marker);
				}
			});
			const options = {gridSize: 50, maxZoom: 15, styles: [
				{ height: 37, url: 'app/img/icons/blank.png', width: 32 }
			]};

			if(Object.keys(self.state.markerCluster).length == 0) {
				self.setState({ markerCluster: new MarkerClusterer(self.props.map, newMarkers, options)});
			}else{
				self.state.markerCluster.clearMarkers();
				self.state.markerCluster.addMarkers(newMarkers);
			}

			self.setState({markers: newMarkers});
		});
	}
	changeCategory() {
		this.setState({ category: parseInt(this.refs.category.value, 10) }, () => { this.drawMarkers(this, this.props.events); });
	}
	render() {
		return (
			<div id="mapa" className="page">
				<div id="map">
					<i className="fa fa-cog fa-spin fa-3x fa-fw"></i>
					<span className="sr-only">{this.props.languages[this.props.language].mapa.cargando}</span>
				</div>
				<div className="dropdown">
					<div>
						<Link to="/create/chats">
							<i style={{color: 'white', width: this.props.user ? '30px' : '0'}} className="fa fa-plus fa-2x"></i>
						</Link>
						<input style={{width: `calc(100% - ${this.props.user ? 30 : 0}px)`}} ref="filter" type="text" placeholder={this.props.languages[this.props.language].lista.filtrar} onChange={this.changeFilter.bind(this)}></input>
					</div>
					<select ref="category" onChange={ this.changeCategory.bind(this) }>
						<option value={-1} >{this.props.languages[this.props.language].mapa.todas_las_categorias}</option>
						{this.props.user ? (<option value={-2} >{this.props.languages[this.props.language].mapa.mis_categorias}</option>) : ''}
						{this.props.categories.map((category) => { return (<option key={category.id} value={category.id} >{category.name}</option>); })}
					</select>
				</div>
			</div>
		);
	}
}

//	this.props.languages[this.props.language].mapa.todas_las_categorias
MapContainer.propTypes = {
	filter: PropTypes.string,
	map: PropTypes.object,
	position: PropTypes.object,
	marker: PropTypes.object,
	setMap: PropTypes.func,
	setPosition: PropTypes.func,
	setMarker: PropTypes.func,
	onFilter: PropTypes.func,
	events: PropTypes.array,
	categories: PropTypes.array,
	initU: PropTypes.func,
	user: PropTypes.object,
	history: PropTypes.object,
	favoritesCategories: PropTypes.array,
	language: PropTypes.string, languages: PropTypes.object,
};

const mapStateToProps = (state) => {
	return {
		map: state.map,
		position: state.position,
		marker: state.marker,
		user: state.user,
		filter: state.filter,
		events: state.events,
		categories: state.categories,
		language: state.language, languages: state.languages,
		favoritesCategories: state.favoritesCategories,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		initU: () => { return fU(dispatch); },
		setMap: map => { dispatch(actions.setMap(map)); },
		setMarker: marker => { dispatch(actions.setMarker(marker)); },
		setPosition: position => { dispatch(actions.setPosition(position)); }
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MapContainer);
