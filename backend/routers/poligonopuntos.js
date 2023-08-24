const express = require('express');
const cors = require('cors');
const pool = require('../database/db.js');



const routerPoligonosPuntos = express.Router();

routerPoligonosPuntos.use(express.json());
routerPoligonosPuntos.use(cors());

//get all poligonos and puntos
routerPoligonosPuntos.get('/', async (req, res) => {
  try {
    const query = `
    SELECT
      pl.id_poligono,
      pl.nombre_poligono,
      pt.id_punto,
      pt.latitud,
      pt.longitud
    FROM poligonos pl
    JOIN puntos pt ON pl.id_poligono = pt.id_poligono;
    `;

    const result = await pool.query(query);

    // Organizar datos
    const featuresMap = new Map();

    result.rows.forEach(row => {
      if (!featuresMap.has(row.id_poligono)) {
        featuresMap.set(row.id_poligono, {
          type: 'Feature',
          properties: {
            name: row.nombre_poligono,
          },
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [parseFloat(row.longitud), parseFloat(row.latitud)]
              ]
            ],
          },
        });
      } else {
        const existingFeature = featuresMap.get(row.id_poligono);
        existingFeature.geometry.coordinates[0].push([
          parseFloat(row.longitud),
          parseFloat(row.latitud),
        ]);
      }
    });

    const featuresArray = [...featuresMap.values()];

    const geoJsonResponse = {
      type: "FeatureCollection",
      features: featuresArray.map(feature => {
        return {
          type: "Feature",
          properties: {
            name: feature.properties.name,
          },
          geometry: {
            coordinates: [feature.geometry.coordinates[0]],
            type: "Polygon", // Cambio de ubicación del campo "type"
          },
        };
      })
    };

    res.json(geoJsonResponse);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al obtener los datos');
  }
});

module.exports = routerPoligonosPuntos;