const express = require('express');
const app = express();
const port = 3000;


//  Router
const routerAuditoria = require('./routers/auditoria.js');
app.use('/api/auditoria',routerAuditoria); 

const routerPoligonos = require('./routers/poligonos.js');
app.use('/api/poligonos',routerPoligonos); 

const routerPuntos = require('./routers/puntos.js');
app.use('/api/puntos',routerPuntos); 


app.get('/', (req, res)=>{
    res.send('Prueba de funcionamiento de backend 🖥️')
});

   
app.listen(port, () => {
    console.log(`El servidor esta escuchando en el puerto ${port}`);
})