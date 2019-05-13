import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { withRouter } from 'react-router-dom';
import icon from '../assets/img/baseline-restaurant-24px.svg';

const MapList = ({ google, restaurants }) => {
  return (
    <Map
      google={google}
      initialCenter={{
        lat: 48.855269,
        lng: 2.345856,
      }}
      zoom={13}
    >
      {/* {this.state.datas.lenght > 0 */}
      {restaurants.map((marker, index) => (
        <Marker
          key={index}
          name="Your position"
          position={{ lat: marker.latitude, lng: marker.longitude }}
          icon={icon}
          style={{ color: 'red' }}
        />
      ))}
    </Map>
  );
};

export default withRouter(
  GoogleApiWrapper({
    apiKey: 'AIzaSyBJWOhhYJVHkzShIFen7id4uZdFtooV4Xg',
  })(MapList)
);
