import mongoose from 'mongoose';

// Crea el esquema (schema)
const multiplierSchema = new mongoose.Schema( {
  color: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: Number,
    required: true,
  },
} );

// Crea una tabla llamada "Multipliers" y habilita las consultas en la misma.
export default mongoose.model( 'Multipliers', multiplierSchema );