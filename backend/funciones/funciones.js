const { DateTime } = require('luxon');
const db = require('../database/db.js');


function obtenerFechayHora(seleccion) {
  const zonaHoraria = 'America/Caracas';

  const fechaOhora = DateTime.now().setZone(zonaHoraria);

  if (seleccion === "fecha") {
    return fechaOhora.toFormat('yyyy-MM-dd');
  } else if (seleccion === "hora") {
    return fechaOhora.toFormat('HH:mm:ss');
  } else {
    return "Lo que intenta seleccionar no existe"
  }
}

function auditar(operacion, id_usuario) {

  try {
    const fechaActual = obtenerFechayHora("fecha");
    const horaActual = obtenerFechayHora("hora");

    db.query("INSERT INTO auditorias (operacion,id_usuario,fecha,hora) VALUES (UPPER($1),$2,CAST($3 as date),CAST($4 as time))",
      [operacion, id_usuario, fechaActual, horaActual]);
  } catch (err) {
    console.error(err.message);
  }

}

function convertirMayusculas(campos, datos) {
  const datosMayusculas = { ...datos };

  campos.forEach(campo => {
    if (datosMayusculas[campo]) {
      datosMayusculas[campo] = datosMayusculas[campo].toUpperCase();
    }
  });

  return datosMayusculas;
}

function errorHandler(err, req, res, next) {
  console.error(err.stack); 

  if (err instanceof Error && err.message) {
    res.status(400).json({ error: err.message });
  } else {
    res.status(500).json({ error: 'Ha ocurrido un error inesperado.' });
  }
}





module.exports = { obtenerFechayHora, auditar, convertirMayusculas, errorHandler };