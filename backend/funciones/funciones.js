const { DateTime } = require('luxon');

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


  module.exports = {obtenerFechayHora};