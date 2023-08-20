import React from "react";

import { MapContainer, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import Cobertura from './Cobertura';
import Ubicacion from "./Ubicacion";


const Mapview = () => {

    return <MapContainer center={{lat:'10.06579131089762', lng:'-69.3330328233702'}} zoom={13}>
                <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'/>
                <Cobertura/>
                <Ubicacion/>
           </MapContainer>
};

export default Mapview;