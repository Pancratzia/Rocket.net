import React, { useState, useEffect } from "react";
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

const data = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        name: "Poligono 1",
      },
      geometry: {
        coordinates: [
          [
            [-69.36667928156903, 10.069865576316772],
            [-69.36624736588685, 10.062380875843743],
            [-69.3599413969249, 10.048006362344225],
            [-69.35311712914381, 10.047921304148645],
            [-69.35648607146587, 10.064932497776695],
            [-69.36667928156903, 10.069865576316772],
          ],
        ],
        type: "Polygon",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Poligono 2",
      },
      geometry: {
        coordinates: [
          [
            [-69.30958002836468, 10.073097552397883],
            [-69.30828428131763, 10.060509673609943],
            [-69.29333999870886, 10.056086788871795],
            [-69.29031658893254, 10.073437758523625],
            [-69.30958002836468, 10.073097552397883],
          ],
        ],
        type: "Polygon",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Poligono 3",
      },
      geometry: {
        coordinates: [
          [
            [-69.35553585696508, 10.084154067702016],
            [-69.34240562022202, 10.0755640386718],
            [-69.31424471773379, 10.084749407763908],
            [-69.28867530933974, 10.079306257679491],
            [-69.31433110087023, 10.09061770092363],
            [-69.35553585696508, 10.084154067702016],
          ],
        ],
        type: "Polygon",
      },
    },
  ],
};

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

function Mapa() {
  const [markerPosition, setMarkerPosition] = useState([10.0736, -69.3214]);
  const [mapCenter, setMapCenter] = useState([10.0736, -69.3214]);

  const handleMapClick = (lat, lng) => {
    setMarkerPosition([lat, lng]);
    setMapCenter([lat, lng]);
  };

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