import Resistance from '../models/resistance.model.js';
import Band from '../models/band.model.js';
import Multiplier from '../models/multiplier.model.js';
import Tolerance from '../models/tolerance.model.js';

// Añade y calcula una resistencia
export const setResistance = async (req, res) => {
  console.log( 'OLAAA' );
  console.log( 'req', req );
  const resistance = req.body.band_one ? req.body : req.query;
  console.log( resistance );

  try {
    // BANDS
    let digits = '';
    const bands = [
      'band_one', 'band_two', 'band_three'
    ];
    for(let i=0; i<bands.length; i++) {
      if( bands[i] in resistance ) {
        let digitObj = await getBandValueByColor( resistance[bands[i]] );
        if( digitObj.message === 'Founded' ) {
          digits = digits + digitObj.value;
        } else if(resistance[bands[i] !== 'band_three']){
          return res.status(400).json( { message: digitObj.message } );
        }
      }
    }

    // MULTIPLIER
    const multObj = await getMultiplierValueByColor( resistance.multiplier );
    let multiplierRetrived = 1;
    if( multObj.message === 'Founded' ) {
      multiplierRetrived = multObj.value;
    } else {
      return res.status(400).json( { message: multObj.message } );
    }
    const calculatedValue = parseInt(digits)*multiplierRetrived;

    // TOLERANCE
    const toleranceObj = await getToleranceValueByColor( resistance.tolerance );
    let toleranceValueRetrievied = 1;
    if( toleranceObj.message === 'Founded' ) {
      toleranceValueRetrievied = toleranceObj.value;
    } else {
      return res.status(400).json( { message: toleranceObj.message } );
    }
  
    // Asegura que la resistencia no sea una ya insertada
    const checkResistance = await returnResistance(resistance);
    if( checkResistance ) {
      return res.status(400).json( { message: 'Resistance already exists' } );
    }

    let findRes = {
      band_one: resistance.band_one, band_two: resistance.band_two,
      multiplier: resistance.multiplier,
      tolerance: resistance.tolerance,
    }
    if( resistance.band_three ) {
      findRes.band_three = resistance.band_three;
    }

    // Se crea la nueva resistencia
    const newResistance = new Resistance( 
      { ...findRes, value: calculatedValue, tolerance_value: toleranceValueRetrievied }
    );
    // Se guarda
    await newResistance.save();
    res.status(200).json( {...newResistance} );
  } catch (error) {
    res.status(500).json( { message: error.message } );
  }
};

// Obtiene el valor de un 'Band' según su color
const getBandValueByColor = async (color) => {
  try {
    const bandFound = await Band.findOne( {color} );
    if( !bandFound ) {
      return { message: 'Color for Band does not exists' };
    }
    return { value: bandFound.value, message: 'Founded' };
  } catch(error) {
    console.log(error);
    return {
      message: error.message
    };
  }
}
// Obtiene el valor de un 'Multiplier' según su color
const getMultiplierValueByColor = async (color) => {
  try {
    const multiplierFound = await Multiplier.findOne( {color} );
    if( !multiplierFound ) {
      return { message: 'Color for Multiplier does not exists' };
    }
    return { value: multiplierFound.value, message: 'Founded' };
  } catch(error) {
    console.log(error);
    return {
      message: error.message
    };
  }
}
// Obtiene el valor de un 'Tolerance' según su color
const getToleranceValueByColor = async (color) => {
  try {
    const toleranceFound = await Tolerance.findOne( {color} );
    if( !toleranceFound ) {
      return { message: 'Color for Tolerance does not exists' };
    }
    return { value: toleranceFound.value, message: 'Founded' };
  } catch(error) {
    console.log(error);
    return {
      message: error.message
    };
  }
}

// Busca y devuelve una sola resistencia
const returnResistance = async (resistance) => {
  let findRes = {
    band_one: resistance.band_one, band_two: resistance.band_two, band_three: resistance.band_three,
    multiplier: resistance.multiplier,
    tolerance: resistance.tolerance,
  }
  const resistanceFound = await Resistance.findOne( findRes );
  return resistanceFound;
}
// Busca y devuelve todas las resistencias
const returnAllResistances = async () => {
  const allResistancesFounded = await Resistance.find( {} );
  return allResistancesFounded;
}

// Obtiene una resistencia
export const getResistance = async (req, res) => {
  const resistance = req.body.band_one ? req.body : req.query;
  try {
    const resistanceFound = await returnResistance(resistance);
    if( !resistanceFound ) {
      return res.status(400).json( { message: "Resistance not Found" } );
    }
    if( !resistance.band_three && resistanceFound.band_three ) {
      console.log('ASIES');
    }
    res.status(200).json( resistanceFound );
  } catch (error) {
    res.status(500).json( { message: error.message } );
  }
};

// Obtiene todas las resistencias
export const getAllResistances = async (req, res) => {
  try {
    const allResistancesFounded = await returnAllResistances();
    if( allResistancesFounded.length === 0 ) {
      return res.status(400).json( { message: "No Resistances found" } );
    }
    res.status(200).json( allResistancesFounded );
  } catch(error) {
    res.status(500).json( { message: error.message } );
  }
}

// Devuelve todos los 'Bands'
const returnBands = async (req,res) => {
  const allBandsFounded = await Band.find( {} );
  return allBandsFounded;
}
// Obtiene todos los 'Bands'
export const getAllBands = async (req, res) => {
  try {
    const allBandsFounded = await returnBands();
    if( !allBandsFounded ) {
      return res.status(400).json( { message: "No Bands found" } );
    }
    res.status(200).json( allBandsFounded );
  } catch(error) {
    res.status(500).json( { message: error.message } );
  }
};

// Devuelve todos los 'Multipliers'
const returnMultipliers = async (req,res) => {
  const allMultipliersFounded = await Multiplier.find( {} );
  return allMultipliersFounded;
};
// Obtiene todos los 'Multipliers'
export const getAllMultipliers = async (req, res) => {
  try {
    const allMultipliersFounded = await returnMultipliers();
    if( !allMultipliersFounded ) {
      return res.status(400).json( { message: "No Multipliers found" } );
    }
    res.status(200).json( allMultipliersFounded );
  } catch(error) {
    res.status(500).json( { message: error.message } );
  }
};

// Devuelve todos los 'Tolerances'
const returnTolerances = async (req,res) => {
  const allTolerancesFounded = await Tolerance.find( {} );
  return allTolerancesFounded;
};
// Obtiene todos los 'Tolerances'
export const getAllTolerances = async (req, res) => {
  try {
    const allTolerancesFounded = await returnTolerances();
    if( !allTolerancesFounded ) {
      return res.status(400).json( { message: "No Tolerances found" } );
    }
    res.status(200).json( allTolerancesFounded );
  } catch(error) {
    res.status(500).json( { message: error.message } );
  }
};

// Inserta todos los 'Bands'
const putAllBands = async () => {
  try {
    await Band.create(
      [
        { color: 'black', value: 0 },
        { color: 'brown', value: 1 },
        { color: 'red', value: 2 },
        { color: 'orange', value: 3 },
        { color: 'yellow', value: 4 },
        { color: 'green', value: 5 },
        { color: 'blue', value: 6 },
        { color: 'purple', value: 7 },
        { color: 'gray', value: 8 },
        { color: 'white', value: 9 },
      ]
    );
    return 'Created';
  } catch(error) {
    console.log( error );
    return error;
  }
};
// Inserta todos los 'Multipliers'
const putAllMultipliers = async () => {
  try {
    await Multiplier.create(
      [
        { color: 'black', value: Math.pow(10,0) },
        { color: 'brown', value: Math.pow(10,1) },
        { color: 'red', value: Math.pow(10,2) },
        { color: 'orange', value: Math.pow(10,3) },
        { color: 'yellow', value: Math.pow(10,4) },
        { color: 'green', value: Math.pow(10,5) },
        { color: 'blue', value: Math.pow(10,6) },
        { color: 'purple', value: Math.pow(10,7) },
        { color: 'gray', value: Math.pow(10,8) },
        { color: 'white', value: Math.pow(10,9) },
        { color: 'gold', value: Math.pow(10,-1) },
        { color: 'silver', value: Math.pow(10,-2) },
      ]
    );
    return 'Created';
  } catch(error) {
    console.log( error );
    return error;
  }
};
// Inserta todos los 'Tolerances'
const putAllTolerances = async () => {
  try {
    await Tolerance.create(
      [
        { color: 'brown', value: 1 },
        { color: 'red', value: 2 },
        { color: 'green', value: 0.5 },
        { color: 'blue', value: 0.25 },
        { color: 'purple', value: 0.1 },
        { color: 'gray', value: 0.05 },
        { color: 'gold', value: 5 },
        { color: 'silver', value: 10 },
      ]
    );
    return 'Created';
  } catch(error) {
    console.log( error );
    return error;
  }
};

// Asegura que los valores para 'Bands', 'Multipliers' y 'Tolerances' y si no los tiene los inserta
export const dataBaseCheck = async () => {

  // BANDS
  const bands = await returnBands();
  if( bands.length === 0 ) {
    const response = await putAllBands();
    console.log(response);
  } else {
    console.log('bands ->', bands);
  }

  // MULTIPLIERS
  const multipliers = await returnMultipliers();
  if( multipliers.length === 0 ) {
    const response = await putAllMultipliers();
    console.log(response);
  } else {
    console.log('multipliers ->', multipliers);
  }

  // TOLERANCES
  const tolerances = await returnTolerances();
  if( tolerances.length === 0 ) {
    const response = await putAllTolerances();
    console.log(response);
  } else {
    console.log('tolerances ->', tolerances);
  }

}
