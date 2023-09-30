const express = require('express');
const app = express();
const port = 3000;
const {verificarJWT} = require('./middleware/verificarToken')
const cors = require('cors');

app.use(cors({
    credentials: true, 
  }));

//  Router
const routerAuditoria = require('./routers/auditoria.js');
app.use('/api/auditoria',verificarJWT,routerAuditoria); 

const routerClientes = require('./routers/clientes.js');
app.use('/api/clientes', routerClientes);

const routerPoligonos = require('./routers/poligonos.js');
app.use('/api/poligonos',routerPoligonos); 

const routerPuntos = require('./routers/puntos.js');
app.use('/api/puntos',routerPuntos); 

const routerPoligonosPuntos = require('./routers/poligonopuntos.js');
app.use('/api/poligonospuntos',routerPoligonosPuntos);

const routerUsuarios = require('./routers/usuarios.js');
app.use('/api/usuarios',routerUsuarios);

const routerSedes = require('./routers/sedes.js');
app.use('/api/sedes',routerSedes);

const routerSedesDepartamento = require('./routers/sedesdepartamentos.js');
app.use('/api/sedesdepartamentos',routerSedesDepartamento);

const routerPlanes = require('./routers/planes.js');
app.use('/api/planes',routerPlanes);
 
const routerDocumentos = require('./routers/documentos.js');
app.use('/api/documentos', routerDocumentos);

const routerLogin = require('./routers/login.js');
app.use('/api/login', routerLogin);

const routerRecuperarClave = require('./routers/recuperar_clave.js');
app.use('/api/recuperar-clave', routerRecuperarClave);



//Prueba de funcionamiento
app.get('/', (req, res)=>{
    res.send('Prueba de funcionamiento de backend 🖥️')
});

   
app.listen(port, () => {
    console.log(`El servidor esta escuchando en el puerto ${port}`);
})