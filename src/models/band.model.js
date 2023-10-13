import mongoose from 'mongoose';

// Crea el esquema (schema)
const bandSchema = new mongoose.Schema( {
  color: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: String,
    required: true,
  },
} );

// Crea una tabla llamada "Bands" y habilita las consultas en la misma.
export default mongoose.model( 'Bands', bandSchema );