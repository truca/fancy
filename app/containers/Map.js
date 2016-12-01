import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
const GoogleMapsLoader = require('google-maps');
import * as actions from '../actions';
import fU from '../Utils.js';

let map = null;
let Google = null;

class MapContainer extends Component {
	componentDidMount() {
		this.props.initU().get('chats.json', actions.noAction, actions.setEvents, actions.noAction);

		GoogleMapsLoader.KEY = 'AIzaSyABifHRllp38ueVG59B9AeOgdIZpL6TaNs';
		GoogleMapsLoader.load(function(google) {
			Google = google;
			let myLatLng = {lat: -25.363, lng: 131.044};
			map = new google.maps.Map(document.getElementById('map'), { zoom: 4, center: myLatLng, zoomControl: true });
			myLatLng = new google.maps.Marker({ position: myLatLng, map: map, title: 'Hello World!' });
		});
	}
	componentDidUpdate() {
		this.props.events.forEach((event) => {
			let marker = {lat: event.lat, lng: event.lng};
			marker = new Google.maps.Marker({ position: marker, map: map, title: 'Hello World!' });
		});
	}
	render() {
		return (
			<div>
			  <div id="map" style={{ height: '350px', margin: '0px -15px', marginBottom: '0px'}}></div>
			</div>
		);
	}
}

MapContainer.propTypes = {
	filter: PropTypes.string,
	onFilter: PropTypes.func,
	events: PropTypes.array,
	initU: PropTypes.func
};

const mapStateToProps = (state) => {
	return {
		filter: state.filter,
		events: state.events
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
