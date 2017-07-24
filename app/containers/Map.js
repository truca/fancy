import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
const GoogleMapsLoader = require('google-maps');
import * as actions from '../actions';
import fU from '../Utils.js';
import $ from 'jquery';
import R from 'ramda';

class MapContainer extends Component {
	constructor(props) {
		super(props);
		this.state = { category: null, map: null, markers: [], markerCluster: {} };
	}
	componentDidMount() {
		this.props.initU().get('categories.json', actions.noAction, actions.setCategories, actions.noAction);
		if(this.props.user) this.props.initU().get('user/categories/favorites.json', actions.noAction, actions.setFavoritesCategories, actions.noAction, {Authorization: this.props.user.token});
		this.drawMap(this.props.position ? this.props.position : {lat: 0, lon: 0}, this.drawMarkers, this);
		this.getPosition((position) => {
			if(!this.props.position) this.drawMap(position, this.drawMarkers, this);
			this.props.setPosition(position);
			this.props.initU().get('chats.json?lat=' + position.lat + '&lng=' + position.lon, actions.noAction, actions.setEvents, actions.noAction);
		});
	}
	componentWillReceiveProps(nextProps) {
		const events = R.sort((a, b) => a - b, R.map(event => event.id, this.props.events));
		const nEvents = R.sort((a, b) => a - b, R.map(event => event.id, nextProps.events));
		if(!R.equals(events, nEvents)) {
			this.drawMarkers(this, nextProps.events);
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
	drawMap(position, drawMarkers, self) {
		console.log(self);
		function addYourLocationButton(mapa, marker) {
			const controlDiv = document.createElement('div');
			const firstChild = document.createElement('button');
			const secondChild = document.createElement('div');

			firstChild.style.backgroundColor = '#fff';
			firstChild.style.border = 'none';
			firstChild.style.outline = 'none';
			firstChild.style.width = '28px';
			firstChild.style.height = '28px';
			firstChild.style.borderRadius = '2px';
			firstChild.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
			firstChild.style.cursor = 'pointer';
			firstChild.style.marginRight = '10px';
			firstChild.style.padding = '0px';
			firstChild.title = 'Your Location';
			controlDiv.appendChild(firstChild);

			secondChild.style.margin = '5px';
			secondChild.style.width = '18px';
			secondChild.style.height = '18px';
			secondChild.style.backgroundImage = 'url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-1x.png)';
			secondChild.style.backgroundSize = '180px 18px';
			secondChild.style.backgroundPosition = '0px 0px';
			secondChild.style.backgroundRepeat = 'no-repeat';
			secondChild.id = 'you_location_img';
			firstChild.appendChild(secondChild);

			google.maps.event.addListener(mapa, 'dragend', function() {
				$('#you_location_img').css('background-position', '0px 0px');
			});

			firstChild.addEventListener('click', function() {
				let imgX = '0';
				const animationInterval = setInterval(function() {
					if(imgX == '-18') imgX = '0';
					else imgX = '-18';
					$('#you_location_img').css('background-position', imgX + 'px 0px');
				}, 500);
				if(navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(function(pos) {
						const latlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
						marker.setPosition(latlng);
						mapa.setCenter(latlng);
						clearInterval(animationInterval);
						$('#you_location_img').css('background-position', '-144px 0px');
					});
				}else{
					clearInterval(animationInterval);
					$('#you_location_img').css('background-position', '0px 0px');
				}
			});

			controlDiv.index = 1;
			self.state.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
		}

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


			this.setState({ map }, function() {
				addYourLocationButton(map, myMarker);
				drawMarkers(self, self.props.events);
			});
		}.bind(self));
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
					marker = new google.maps.Marker({ position: marker, icon, map: self.state.map, title: 'Hello World!' }); // icon: 'img/icons/' + event.category.icon,
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
				self.setState({ markerCluster: new MarkerClusterer(self.state.map, newMarkers, options)});
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
					<input ref="filter" type="text" placeholder={this.props.languages[this.props.language].lista.filtrar} onChange={this.changeFilter.bind(this)}></input>
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
	onFilter: PropTypes.func,
	setPosition: PropTypes.func,
	events: PropTypes.array,
	categories: PropTypes.array,
	initU: PropTypes.func,
	user: PropTypes.object,
	position: PropTypes.object,
	history: PropTypes.object,
	favoritesCategories: PropTypes.array,
	language: PropTypes.string, languages: PropTypes.object,
};

const mapStateToProps = (state) => {
	return {
		user: state.user,
		position: state.position,
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
		setPosition: (position) => { dispatch(actions.setPosition(position)); }
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MapContainer);
