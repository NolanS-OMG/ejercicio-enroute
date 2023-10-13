import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';

import authRoutes from "./routes/auth.routes.js";

const app = express();

// Para visualizar en consola todas las peticiones al servidor
app.use( morgan('dev') );
// Para habilitar el uso del formato JSON
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: false }) );

app.use( cors() );

// app.options('*',cors());



// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*"); 
//   res.header("Access-Control-Allow-Methods", "*");
//   res.header("Access-Control-Allow-Headers", "*"); 
//   next();
// });

// Añade las rutas, todos con el prefijo /api
app.use( "/api", authRoutes );

export default app;