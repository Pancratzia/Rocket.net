const express = require('express');
const app = express();
const port = 3000;


//  Router
const routerAuditoria = require('./routers/auditoria.js');
app.use('/api/cursos/auditoria',routerAuditoria); 

const routerPoligonos = require('./routers/poligonos.js');
app.use('/api/cursos/programacion',routerPoligonos); 


app.listen(port, () => {
    console.log(`El servidor esta escuchando en el puerto ${port}`);
})