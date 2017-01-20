import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
const GoogleMapsLoader = require('google-maps');
import * as actions from '../actions';
import fU from '../Utils.js';
import $ from 'jquery';
//	import languages from '../translate.js';

let map = null;
let markers = [];
let markerCluster = {};
//	let loader = GoogleMapsLoader;
//	let Google = null;

class MapContainer extends Component {
	constructor(props) {
		super(props);
		this.state = { category: null, markers: [], map: null };
	}
	componentDidMount() {
		$.get('http://ipinfo.io', response => {
			const loc = response.loc.split(',');
			const position = {lat: parseFloat(loc[0], 10), lon: parseFloat(loc[1], 10)};
			this.props.initU().get('chats.json?lat=' + position.lat + '&lng=' + position.lon, actions.noAction, actions.setEvents, actions.noAction);
			this.props.initU().get('categories.json', actions.noAction, actions.setCategories, actions.noAction);
		}, 'jsonp');

		//	loader = GoogleMapsLoader;
		window.events = this.props.events;
		this.drawMap();
		this.drawMarkers();
	}
	componentDidUpdate() {
		window.events = this.props.events;
		this.drawMarkers();
	}
	drawMap() {
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
					navigator.geolocation.getCurrentPosition(function(position) {
						const latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
						marker.setPosition(latlng);
						map.setCenter(latlng);
						clearInterval(animationInterval);
						$('#you_location_img').css('background-position', '-144px 0px');
					});
				}else{
					clearInterval(animationInterval);
					$('#you_location_img').css('background-position', '0px 0px');
				}
			});

			controlDiv.index = 1;
			map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
		}

		$.get('http://ipinfo.io', response => {
			const loc = response.loc.split(',');
			const position = {lat: parseFloat(loc[0], 10), lon: parseFloat(loc[1], 10)};
			//	console.log(position);
			GoogleMapsLoader.KEY = 'AIzaSyABifHRllp38ueVG59B9AeOgdIZpL6TaNs';
			GoogleMapsLoader.load((google) => {
				//	Google = google;
				const myLatLng = {lat: position.lat, lng: position.lon};
				map = new google.maps.Map(document.getElementById('map'), { zoom: 11, center: myLatLng, zoomControl: true, mapTypeControl: false });

				const myMarker = new google.maps.Marker({
					map: map,
					animation: google.maps.Animation.DROP,
					position: myLatLng
				});
				addYourLocationButton(map, myMarker);

				/*	const centerControl = new CenterControl(centerControlDiv, map);
				console.log(centerControl);

				centerControlDiv.index = 1;
				map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);*/
				//	myLatLng = new google.maps.Marker({ position: myLatLng, map: map, title: 'Hello World!' });

				this.setState({ map });
			});
		}, 'jsonp');
	}
	changeFilter() {
		this.drawMarkers();
	}
	drawMarkers() {
		GoogleMapsLoader.load(function(google) {
			console.log(google);
			markers.forEach(marker => marker.setMap(null));

			const newMarkers = [];
			window.events.forEach((event) => {
				//	console.log('filtering', this.state.category, event.category.id, !this.state.category || this.state.category == event.category.id);
				if(((!this.state.category && this.state.category != 0) || this.state.category == -1 || this.state.category == event.category.id) && event.name.indexOf(this.refs.filter.value) != -1 ) {
					let marker = {lat: event.lat, lng: event.lng};
					marker = new google.maps.Marker({ position: marker, map: this.state.map, title: 'Hello World!' }); // icon: 'img/icons/' + event.category.icon,
					marker.event = event;
					marker.addListener('click', () => {
						if(this.props.user) this.props.history.push('/chats/' + marker.event.id);
					});
					newMarkers.push(marker);
				}
			});
			const options = {gridSize: 50, maxZoom: 15, styles: [
				{ height: 37, url: 'img/icons/blank.png', width: 32 }
			]};

			if(Object.keys(markerCluster).length == 0) {
				markerCluster = new MarkerClusterer(this.state.map, newMarkers, options);
			}else{
				markerCluster.clearMarkers();
				markerCluster.addMarkers(newMarkers);
			} //	markerCluster.setMap(null);
			//	console.log(markerCluster);
			//	markerCluster.map = null;

			markers = newMarkers;
			/*	markers.forEach(function(marker) {
				if((!this.state.category && this.state.category != 0) || this.state.category == -1 || this.state.category == marker.event.category.id) {
					marker.setMap(this.state.map);
				}else{
					marker.setMap(null);
				}
			}.bind(this));*/
		}.bind(this));
	}
	changeCategory() {
		this.setState({ category: this.refs.category.value });
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
						{this.props.categories.map((category) => { return (<option key={category.id} value={category.id} >{category.name}</option>); })}
					</select>
				</div>
			</div>
		);
	}
}

MapContainer.propTypes = {
	filter: PropTypes.string,
	onFilter: PropTypes.func,
	events: PropTypes.array,
	categories: PropTypes.array,
	initU: PropTypes.func,
	user: PropTypes.object,
	history: PropTypes.object,
	language: PropTypes.string, languages: PropTypes.object,
};

const mapStateToProps = (state) => {
	return {
		user: state.user,
		filter: state.filter,
		events: state.events,
		categories: state.categories,
		language: state.language, languages: state.languages,
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
)(MapContainer);
