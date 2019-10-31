import React from 'react';
import { withRouter } from 'react-router-dom';
import { Map as LeafletMap, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';

const favoriteIcon = new L.Icon({
  iconUrl: require('../assets/img/favoriteIcon.svg'),
  iconRetinaUrl: require('../assets/img/favoriteIcon.svg'),
});

const icon = new L.Icon({
  iconUrl: require('../assets/img/baseline-restaurant-24px.svg'),
  iconRetinaUrl: require('../assets/img/baseline-restaurant-24px.svg'),
});

const MapList = ({ google, restaurants, favorites }) => {
  const position = [48.855269, 2.345856];
  return (
    <LeafletMap zoom={13} style={{ height: '100vh' }} center={position}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {restaurants.map(restaurant => (
        <Marker
          key={restaurant.id}
          name="Your position"
          position={{ lat: restaurant.latitude, lng: restaurant.longitude }}
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
    </LeafletMap>
  );
};

export default withRouter(MapList);
