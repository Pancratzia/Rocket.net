const { DateTime } = require('luxon');
const db = require('../database/db.js');

// const { validateAudit } = require('../validaciones/validAudit.js');

function obtenerFechayHora(seleccion) {
    const zonaHoraria = 'America/Caracas';
    
    const fechaOhora = DateTime.now().setZone(zonaHoraria);

    if (seleccion === "fecha") {
      return fechaOhora.toFormat('yyyy-MM-dd');
    } else if(seleccion === "hora"){
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
			[operacion,id_usuario,fechaActual,horaActual]);
	} catch (err) {
		console.error(err.message);
	}
	
  }





  module.exports = {obtenerFechayHora, auditar};