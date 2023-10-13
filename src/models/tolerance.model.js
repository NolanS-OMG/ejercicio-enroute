import mongoose from 'mongoose';


// Crea el esquema (schema)
const toleranceSchema = new mongoose.Schema( {
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

// Crea una tabla llamada "Tolerances" y habilita las consultas en la misma.
export default mongoose.model( 'Tolerances', toleranceSchema );