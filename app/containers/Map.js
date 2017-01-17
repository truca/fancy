import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
const GoogleMapsLoader = require('google-maps');
import * as actions from '../actions';
import fU from '../Utils.js';
import $ from 'jquery';
//	import languages from '../translate.js';

let map = null;
//	let loader = GoogleMapsLoader;
//	let Google = null;

class MapContainer extends Component {
	constructor(props) {
		super(props);
		this.state = { category: null, markers: [], map: null };
	}
	componentDidMount() {
		this.props.initU().get('chats.json', actions.noAction, actions.setEvents, actions.noAction);
		this.props.initU().get('categories.json', actions.noAction, actions.setCategories, actions.noAction);
		//	loader = GoogleMapsLoader;

		window.events = this.props.events;

		const chicago = {lat: 41.85, lng: -87.65};

		function CenterControl(controlDiv, mapa) {
			const controlUI = document.createElement('div');
			const controlText = document.createElement('div');
		  // Set CSS for the control border.
			controlUI.style.backgroundColor = '#fff';
			controlUI.style.border = '2px solid #fff';
			controlUI.style.borderRadius = '3px';
			controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
			controlUI.style.cursor = 'pointer';
			controlUI.style.marginBottom = '22px';
			controlUI.style.textAlign = 'center';
			controlUI.title = 'Click to recenter the mapa';
			controlDiv.appendChild(controlUI);

			// Set CSS for the control interior.
			controlText.style.color = 'rgb(25,25,25)';
			controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
			controlText.style.fontSize = '16px';
			controlText.style.lineHeight = '38px';
			controlText.style.paddingLeft = '5px';
			controlText.style.paddingRight = '5px';
			controlText.innerHTML = 'Center Map';
			controlUI.appendChild(controlText);

		  // Setup the click event listeners: simply set the mapa to Chicago.
			controlUI.addEventListener('click', function() {
				mapa.setCenter(chicago);
			});
		}

		/*	function initMap() {
		  map = new google.maps.Map(document.getElementById('map'), {
		    zoom: 12,
		    center: chicago
		  });

		  // Create the DIV to hold the control and call the CenterControl() constructor
		  // passing in this DIV.
		  var centerControlDiv = document.createElement('div');
		  var centerControl = new CenterControl(centerControlDiv, map);

		  centerControlDiv.index = 1;
		  map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
		}*/

		$.get('http://ipinfo.io', response => {
			const loc = response.loc.split(',');
			const position = {lat: parseFloat(loc[0], 10), lon: parseFloat(loc[1], 10)};
			//	console.log(position);
			GoogleMapsLoader.KEY = 'AIzaSyABifHRllp38ueVG59B9AeOgdIZpL6TaNs';
			GoogleMapsLoader.load((google) => {
				const markers = [];
				const centerControlDiv = document.createElement('div');
				//	Google = google;
				const myLatLng = {lat: position.lat, lng: position.lon};
				map = new google.maps.Map(document.getElementById('map'), { zoom: 11, center: myLatLng, zoomControl: true, mapTypeControl: false });

				const centerControl = new CenterControl(centerControlDiv, map);
				console.log(centerControl);

				centerControlDiv.index = 1;
				map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
				//	myLatLng = new google.maps.Marker({ position: myLatLng, map: map, title: 'Hello World!' });


				window.events.forEach((event) => {
					//	console.log('filtering', this.state.category, event.category.id, !this.state.category || this.state.category == event.category.id);
					if((!this.state.category && this.state.category != 0) || this.state.category == -1 || this.state.category == event.category.id) {
						let marker = {lat: event.lat, lng: event.lng};
						marker = new google.maps.Marker({ position: marker, map: map, title: 'Hello World!' }); // icon: 'app/img/icons/' + event.category.icon,
						marker.event = event;
						marker.addListener('click', () => {
							if(this.props.user) this.props.history.push('/chats/' + marker.event.id);
						});
						markers.push(marker);
					}
				});
				this.setState({ markers, map });
			});
		}, 'jsonp');
	}
	componentDidUpdate() {
		window.events = this.props.events;
		this.state.markers.forEach((marker) => {
			if(!((!this.state.category && this.state.category != 0) || this.state.category == -1 || this.state.category == marker.event.category.id)) {
				marker.setMap(null);
			}else{
				marker.setMap(this.state.map);
			}
		});
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
