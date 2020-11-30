import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";

const mapStyles = {
  // trying to get width to change dynamically
  maxWidth: "100%",
  maxHeight: "100%",
  borderRadius: "8px",
  marginLeft: 14,
  marginBottom: 50,
  boxShadow: "0px 2px 5px 0.5px #E3E3E3",
};

const containerStyle = {
  maxWidth: "23%",
  maxHeight: "30%",
};

export class GoogleMap extends Component {
  state = {
    showingInfoWindow: false, // Hides or shows the InfoWindow
    activeMarker: {}, // Shows the active marker upon click
    selectedPlace: {}, // Shows the InfoWindow to the selected place upon a marker
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  render() {
    if (Object.keys(this.props.coords).length === 0) {
      return null;
    }
    return (
      <Map
        google={this.props.google}
        zoom={12}
        style={mapStyles}
        initialCenter={this.props.coords}
        containerStyle={containerStyle}
      >
        <Marker onClick={this.onMarkerClick} name={this.props.title} />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API,
})(GoogleMap);
