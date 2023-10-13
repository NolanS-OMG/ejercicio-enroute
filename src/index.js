// La configuración de la app se ejecuta y luego se importa
import app from './app.js';

import { connectDB } from './db.js';
import { dataBaseCheck } from './controllers/auth.controller.js';

// Se conecta la base de datos
connectDB();
// Asegura que los valores para 'Bands', 'Multipliers' y 'Tolerances' y si no los tiene los inserta
dataBaseCheck();

// Se abre la API en el puerto 3000
app.listen( '4000' );
console.log( 'Server on port: ', 4000 );