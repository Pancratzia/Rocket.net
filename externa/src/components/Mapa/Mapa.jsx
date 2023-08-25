import React, { useState, useEffect } from "react";
import axios from 'axios';

import {
  MapContainer,
  Marker,
  Polygon,
  Popup,
  TileLayer,
  Tooltip,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";



const invertCoordinates = (coordinates) =>
  coordinates.map((coord) => [coord[1], coord[0]]);

function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      onMapClick(lat, lng);
    },
  });

  return null;
}

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.flyTo(center, zoom);
  return null;
}

function Mapa({ currentPosition }) {
  const [markerPosition, setMarkerPosition] = useState([10.0736, -69.3214]);
  const [mapCenter, setMapCenter] = useState([10.0736, -69.3214]);
  const [data, setData] = useState({ type: "FeatureCollection", features: [] });

  const handleMapClick = (lat, lng) => {
    setMarkerPosition([lat, lng]);
    setMapCenter([lat, lng]);
  };

  useEffect(() => {

    axios.get('http://localhost:3000/api/poligonospuntos')
    .then(res => {
        setData(res.data);
      })
    .catch(error => {
        console.error('Error al obtener los datos de la API', error);
      });

    if (currentPosition) {
      setMarkerPosition([currentPosition.lat, currentPosition.lng]);
      setMapCenter([currentPosition.lat, currentPosition.lng]);
    }
  }, [currentPosition]);


  return (
    <MapContainer
      center={mapCenter}
      zoom={14}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapClickHandler onMapClick={handleMapClick} />
      <ChangeView center={mapCenter} zoom={14} />
      {data.features.map((feature, index) => (
        <Polygon
          key={index}
          positions={invertCoordinates(feature.geometry.coordinates[0])}
        >
          <Tooltip>{feature.properties.name}</Tooltip>
        </Polygon>
      ))}
      <Marker position={markerPosition}>
        <Popup>Estás Aquí</Popup>
      </Marker>
    </MapContainer>
  );
}

export default Mapa;
