import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
const GoogleMapsLoader = require('google-maps');
import * as actions from '../actions';
import fU from '../Utils.js';
import languages from '../translate.js';

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
		navigator.geolocation.getCurrentPosition((location) => {
			GoogleMapsLoader.KEY = 'AIzaSyABifHRllp38ueVG59B9AeOgdIZpL6TaNs';
			GoogleMapsLoader.load((google) => {
				const markers = [];
				//	Google = google;
				const myLatLng = {lat: location.coords.latitude, lng: location.coords.longitude};
				map = new google.maps.Map(document.getElementById('map'), { zoom: 11, center: myLatLng, zoomControl: true, mapTypeControl: false });
				//	myLatLng = new google.maps.Marker({ position: myLatLng, map: map, title: 'Hello World!' });


				window.events.forEach((event) => {
					//	console.log('filtering', this.state.category, event.category.id, !this.state.category || this.state.category == event.category.id);
					if((!this.state.category && this.state.category != 0) || this.state.category == -1 || this.state.category == event.category.id) {
						let marker = {lat: event.lat, lng: event.lng};
						marker = new google.maps.Marker({ position: marker, map: map, title: 'Hello World!' });
						marker.event = event;
						marker.addListener('click', () => {
							//	console.log('markerClick', marker.event);
							this.props.history.push('/chats/' + marker.event.id);
						});
						markers.push(marker);
					}
				});
				this.setState({ markers, map });
			});
		});
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
					<span className="sr-only">{languages[this.props.language].mapa.cargando}</span>
			  </div>
				<div className="dropdown">
					<select ref="category" onChange={ this.changeCategory.bind(this) }>
						<option value={-1} >{languages[this.props.language].mapa.todas_las_categorias}</option>
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
	history: PropTypes.object,
	language: PropTypes.string,
};

const mapStateToProps = (state) => {
	return {
		filter: state.filter,
		events: state.events,
		categories: state.categories,
		language: state.language,
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
