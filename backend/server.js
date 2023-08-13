const express = require('express');
const app = express();
const port = 3000;


//  Router
const routerAuditoria = require('./routers/auditoria.js');
app.use('/api/cursos/auditoria',routerAuditoria); 

const routerPoligonos = require('./routers/poligonos.js');
app.use('/api/cursos/poligonos',routerPoligonos); 

const routerPuntos = require('./routers/puntos.js');
app.use('/api/cursos/puntos',routerPuntos); 

app.listen(port, () => {
    console.log(`El servidor esta escuchando en el puerto ${port}`);
})