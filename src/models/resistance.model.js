import mongoose from 'mongoose';

// Crea el esquema (schema)
const resistanceSchema = new mongoose.Schema( {
  band_one: {
    type: String,
    required: true,
  },
  band_two: {
    type: String,
    required: true,
  },
  band_three: {
    type: String,
    required: true,
  },
  multiplier: {
    type: String,
    required: true,
  },
  tolerance: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  tolerance_value: {
    type: Number,
    required: true,
  },
} );

// Crea una tabla llamada "Resistances" y habilita las consultas en la misma.
export default mongoose.model( 'Resistances', resistanceSchema );