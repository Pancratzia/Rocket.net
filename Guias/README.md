# Product Backlog - RocketNet Software de Gestión

<h4 style="color:red;">Objetivo Final: <span style= "font-weight: 500 !important;"> Entregar un M.V.P en el tiempo estipulado que cumpla con la mayoría de los requisitos solicitados en el backlog</span><h4/>

## Autenticación y Gestión de Usuarios
- Implementar el inicio de sesión con nombre de usuario, contraseña y verificación de captcha.
- Cifrar las contraseñas en la Base de Datos para garantizar la seguridad.
- Crear diferentes roles de usuario: Administrador, Tipo 1 (Jefes de Sedes), Tipo 2 (Usuarios con Permisos de Creación de Archivos) y Tipo 3 (Usuarios de solo lectura).
- Utilizar Auth0 para el servicio de autenticación.

## Comunicación y Archivos
- Mostrar el estado de la comunicación entre las sedes (Conectado, Con Fallas, Sin Conexión).
- Permitir que los empleados suban y visualicen archivos relacionados con su sede y departamento.
- Establecer permisos para que los usuarios puedan crear o visualizar archivos según su rol y departamento.
- Permitir a los directores acceder a todos los archivos subidos en la plataforma.
- Soportar la carga de archivos en formatos Word, PowerPoint, Excel y PDF.

## Gestión de Empleados
- Crear un módulo que muestre el personal de cada sede con información sobre el departamento y extensión telefónica.
- Permitir a los administradores ver a todos los empleados de todas las sedes.
- Permitir a los administradores crear, eliminar y modificar sedes y usuarios de todos los tipos.
- Permitir a los usuarios de Tipo 1 crear empleados de Tipo 2 y Tipo 3 y realizar operaciones CRUD con ellos.

## Gestión de Clientes
- Crear un módulo para guardar información relevante sobre los clientes con planes contratados.
- Almacenar información sobre la ubicación, nombre y datos de contacto de cada cliente.
- Registrar el estado del servicio del cliente (activo, inactivo o retirado).

## Control de Acceso a Archivos
- Implementar controles de acceso para restringir la consulta y descarga de archivos según los roles de usuario y los departamentos.
- Almacenar los archivos en el servidor seleccionado para el almacenamiento y permitir visualizarlos dentro del sistema.

## Mensajería Interna
- Desarrollar un sistema de mensajería interna para que los administradores se comuniquen con los usuarios de Tipo 1.
- Permitir el envío de archivos adjuntos en los mensajes con una limitación de tamaño.

## Auditoría de Movimientos
- Crear un módulo de auditoría que solo pueda ser consultado por usuarios administradores.
- Mostrar las operaciones realizadas por los diferentes usuarios dentro del software.

## Reportes y Estadísticas
- Implementar reportes que puedan ser consultados por administradores, usuarios de Tipo 1 y algunos usuarios de compra y venta.
- Mostrar estadísticas relevantes en la página principal interna (Dashboard) para diferentes tipos de usuarios.

## Página Externa de Consulta de Cobertura
- Crear una página externa y ajena al sistema de gestión para que los trabajadores y clientes verifiquen la cobertura de servicio.
- Permitir que los usuarios ingresen su dirección para verificar la cobertura y mostrar un mapa con las zonas de cobertura resaltadas en formato GeoJson.
- Agregar un botón de contacto en caso de que exista cobertura para iniciar un chat en WhatsApp.

## Consulta Interna de Cobertura
- Desarrollar un módulo dentro del sistema de gestión para consultar la cobertura sin salir del sistema.
- Permitir que los administradores y usuarios de Tipo 1 puedan acceder a la consulta de cobertura.

## Integración con APIs
- Utilizar APIs gratuitas de terceros para resolver problemas específicos en el desarrollo o mejorar ciertas funcionalidades (por ejemplo, asistente virtual).

## Diseño de Interfaz de Usuario
- Crear una interfaz de usuario atractiva, intuitiva y responsive utilizando React y React Router.
- Garantizar una experiencia de usuario fluida y coherente en todas las páginas y secciones del sistema.

## Base de Datos
- Utilizar PostgreSQL como la base de datos para almacenar de manera segura la información del sistema.
- Diseñar una estructura de base de datos que permita un almacenamiento estructurado y eficiente de los datos empresariales.

## Alojamiento y Despliegue
- Utilizar el servicio Render para alojar la aplicación web.
- Garantizar un entorno confiable, escalable y de alto rendimiento para ejecutar la aplicación de RocketNet.

## Control de Versiones
- Mantener un sistema de control de versiones utilizando Git y GitHub.
- Facilitar la colaboración efectiva en equipo y la gestión del código fuente.

## Metodología de Desarrollo
- Aplicar la metodología ágil Scrum para el desarrollo del software.
- Dividir el equipo de desarrollo en grupos de backend y frontend, con representantes principales en cada grupo.
- Realizar entregas de avances periódicos al cliente, con duraciones de sprint determinadas según las necesidades y la evolución del proyecto.

## Pruebas y Aseguramiento de Calidad
- Implementar pruebas unitarias y de integración para garantizar la calidad del código.
- Realizar pruebas exhaustivas antes de cada entrega al cliente para detectar y corregir errores.

## Documentación
- Generar documentación técnica y de usuario para facilitar el mantenimiento y el uso del software.
- Proporcionar guías y manuales para los diferentes roles de usuario.

## Seguridad y Privacidad
- Implementar medidas de seguridad para proteger la información de los usuarios y clientes.
- Garantizar la privacidad de los datos almacenados en el sistema.

## Mejoras Futuras (Opcional)
- Considerar la posibilidad de agregar nuevos módulos y funcionalidades en futuras iteraciones del proyecto.
- Evaluar el feedback de los usuarios y clientes para identificar áreas de mejora.

## Asistente Virtual Avanzado (Opcional)
- Explorar la integración de un asistente virtual más avanzado utilizando tecnologías de procesamiento del lenguaje natural y aprendizaje automático.

# Prioridades

| Requerimiento                                        | Prioridad | Estado     |
|------------------------------------------------------|-----------|------------|
| Autenticación y Gestión de Usuarios                  | Alta      | Pendiente  |
| Comunicación y Archivos                              | Alta      | Pendiente  |
| Gestión de Empleados                                 | Alta      | Pendiente  |
| Gestión de Clientes                                  | Media     | Pendiente  |
| Control de Acceso a Archivos                         | Media     | Pendiente  |
| Mensajería Interna                                  | Baja      | Pendiente  |
| Auditoría de Movimientos                            | Media     | Pendiente  |
| Reportes y Estadísticas                             | Alta      | Pendiente  |
| Página Externa de Consulta de Cobertura             | Alta      | Pendiente  |
| Consulta Interna de Cobertura (Opcional)             | Baja      | Pendiente  |
| Integración con APIs                                 | Baja      | Pendiente  |
| Diseño de Interfaz de Usuario                       | Alta      | Pendiente  |
| Base de Datos                                       | Alta      | Pendiente  |
| Alojamiento y Despliegue                            | Media     | Pendiente  |
| Control de Versiones                                | Media     | Pendiente  |
| Metodología de Desarrollo                           | Alta      | Pendiente  |
| Pruebas y Aseguramiento de Calidad                  | Alta      | Pendiente  |
| Documentación                                      | Media     | Pendiente  |
| Seguridad y Privacidad                             | Alta      | Pendiente  |
| Mejoras Futuras (Opcional)                         | Baja      | Pendiente  |
| Asistente Virtual Avanzado (Opcional)               | Baja      | Pendiente  |
