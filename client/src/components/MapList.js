import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { withRouter } from 'react-router-dom';
import favoriteIcon from '../assets/img/favoriteIcon.svg';
import icon from '../assets/img/baseline-restaurant-24px.svg';

const MapList = ({ google, restaurants, favorites }) => {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <Map
        google={google}
        initialCenter={{
          lat: 48.855269,
          lng: 2.345856,
        }}
        zoom={13}
      >
        {restaurants.map(restaurant => (
          <Marker
            key={restaurant.id}
            name="Your position"
            position={{ lat: restaurant.latitude, lng: restaurant.longitude }}
            // icon={favoriteIcon}
            icon={
              favorites.length
                ? favorites.find(elt => elt.id === restaurant.id)
                  ? favoriteIcon
                  : icon
                : icon
            }
            title={restaurant.name}
          />
        ))}
      </Map>
    </div>
  );
};

export default withRouter(
  GoogleApiWrapper({
    apiKey: 'AIzaSyBJWOhhYJVHkzShIFen7id4uZdFtooV4Xg',
  })(MapList)
);
