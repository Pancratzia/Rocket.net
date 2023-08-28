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



const invertirCoordenadas = (coordinates) =>
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

function CambiarVista({ center, zoom }) {
  const map = useMap();
  map.flyTo(center, zoom);
  return null;
}


function Mapa({ posicionActual }) {
  const [marcaPosicion, setMarcarPosicion] = useState([10.0736, -69.3214]);
  const [centrarMapa, setCentrarMapa] = useState([10.0736, -69.3214]);
  const [data, setData] = useState({ type: "FeatureCollection", features: [] });


  const handleMapClick = (lat, lng) => {
    setMarcarPosicion([lat, lng]);
    setCentrarMapa([lat, lng]);
  };

  useEffect(() => {

    axios.get('http://localhost:3000/api/poligonospuntos')
    .then(res => {
        setData(res.data);
      })
    .catch(error => {
        console.error('Error al obtener los datos de la API', error);
      });

    if (posicionActual) {
      setMarcarPosicion([posicionActual.lat, posicionActual.lng]);
      setcentrarMapa([posicionActual.lat, posicionActual.lng]);

    }
  }, [posicionActual]);


  return (
    <MapContainer
      center={centrarMapa}
      zoom={14}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapClickHandler onMapClick={handleMapClick} />
      <CambiarVista center={centrarMapa} zoom={14} />
      {data.features.map((feature, index) => (
        <Polygon
          key={index}
          positions={invertirCoordenadas(feature.geometry.coordinates[0])}
        >
          <Tooltip>{feature.properties.name}</Tooltip>
        </Polygon>
      ))}
      <Marker position={marcaPosicion}>
        <Popup>Estás Aquí</Popup>
      </Marker>
    </MapContainer>
  );
}

export default Mapa;
