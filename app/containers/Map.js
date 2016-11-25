import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Map from '../components/Map';
const GoogleMapsLoader = require('google-maps');

class MapContainer extends Component {
    componentDidMount() {
        GoogleMapsLoader.KEY = 'AIzaSyABifHRllp38ueVG59B9AeOgdIZpL6TaNs';
        GoogleMapsLoader.load(function(google) {
            let myLatLng = {lat: -25.363, lng: 131.044};
            const map = new google.maps.Map(document.getElementById('map'), { zoom: 4, center: myLatLng, zoomControl: true });
            myLatLng = new google.maps.Marker({ position: myLatLng, map: map, title: 'Hello World!' });
        });
    }
    render() {
        return (
            <div>
              <div id="map" style={{ height: '350px', margin: '0px -15px', marginBottom: '0px'}}></div>
              <Map />
            </div>
        );
    }
}

MapContainer.propTypes = {
    filter: PropTypes.string,
    onFilter: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        filter: state.filter
    };
};

export default connect(
    mapStateToProps
)(MapContainer);
