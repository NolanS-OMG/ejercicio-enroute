import { useEffect, useState } from 'react';
import './index.css';

import axios from 'axios';
import SelectInput from './components/SelectInput.jsx';

import ResistanceImageAndResult from './components/ResistanceImageAndResult.jsx'

const baseURL = 'http://localhost:4000/api';

function App() {

  const getAllBandsValues = async () => {
    await axios.get( `${baseURL}/bands` ).then( async (response) => {
      setAllBandsValues( response.data );
    } ).catch( error => {
      console.log( 'error ->', error );
      if (error.response) {
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
      setAllBandsValues([]);
    } );
  };
  const getAllMultipliersValues = async () => {
    await axios.get( `${baseURL}/multipliers` ).then( async (response) => {
      setAllMultipliersValues( response.data );
    } ).catch( error => {
      console.log( 'error ->', error );
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
      setAllMultipliersValues([]);
    } );
  };
  const getAllTolerancesValues = async () => {
    await axios.get( `${baseURL}/tolerances` ).then( async (response) => {
      setAllTolerancesValues( response.data );
    } ).catch( error => {
      console.log( 'error ->', error );
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
      setAllTolerancesValues([]);
    } );
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getResistance = async (sendResistance) => {
    let hasError = false;
    await axios.get( `${baseURL}/resistance`, {
      params: sendResistance
    } ).then( response => {
      setResistance(response.data);
    } ).catch( (error) => {
      if( error.response.data ) {
        if( error.response.data.message === 'Resistance not Found' ) {
          hasError = true;
        }
      } else {
        console.log( 'GET RESISTANCE ERROR ->', error );
      }
    } );
    if(hasError) {
      await postResistance(sendResistance);
    }
  };

  const postResistance = async (sendResistance) => {

    await axios.post(  `${baseURL}/resistance`, sendResistance, {
      headers: {},
      params: sendResistance,
    } ).then( response => {
      console.log( response.data._doc );
      setResistance( response.data._doc );
    } ).catch( error => console.log( 'POST RESISTANCE ERROR ->', error) );
  }

  const [ resistance, setResistance ] = useState( {
    band_one: 'black',
    band_two: 'black',
    band_three: 'none',
    multiplier: 'black',
    tolerance: 'brown',
  } );

  const changeResistance = (newResistance) => {
    setResistance(newResistance);
    getResistance( newResistance );
  } 

  const [allBandsValues, setAllBandsValues] = useState([]);
  const [allMultipliersValues, setAllMultipliersValues] = useState([]);
  const [allTolerancesValues, setAllTolerancesValues] = useState([]);

  const [isThreeBands, setIsThreeBands] = useState( false );

  useEffect( () => {
    console.log(resistance);
    if( typeof resistance.value !== typeof 1 ) {
      getResistance( resistance );
    }
    if(isThreeBands) {
      if( resistance.band_three === 'none' ) {
        getResistance( {
          ...resistance, band_three: 'black'
        } );
      }
    } else {
      if(resistance.band_three !== 'none') {
        getResistance( {
          ...resistance, band_three: 'none'
        } );
      }
    }
  }, [isThreeBands, resistance, getResistance] )

  // useEffect( () => {
  //   console.log(resistance);
    // if( typeof resistance.value !== typeof 1 ) {
    //   getResistance( resistance );
    // }
  // }, [resistance, getResistance] );

  useEffect( () => {
    if( allBandsValues.length === 0 ) {
      getAllBandsValues();
    }
  }, [allBandsValues] );

  useEffect( () => {
    if( allMultipliersValues.length === 0 ) {
      getAllMultipliersValues();
    }
  }, [allMultipliersValues] );

  useEffect( () => {
    if( allTolerancesValues.length === 0 ) {
      getAllTolerancesValues();
    }
  }, [allTolerancesValues] );

  if( !resistance ) {
    return (
    <div className='full-screen'>
      <div className='container'>
        Loading...
      </div>
    </div>
  )
  }

  const allSelects = Object.keys(resistance).map( ( keyElem ) => {
    if( keyElem === 'value' || keyElem === 'tolerance_value' || keyElem === '__v' || keyElem === '_id' ) {
      return;
    }
    return <SelectInput 
      key={keyElem} 
      list={ keyElem.search('band')>=0 ? allBandsValues : keyElem === 'multiplier' ? allMultipliersValues: keyElem === 'tolerance' ? allTolerancesValues : [] } 
      object={resistance}
      changeObjectFunction={changeResistance}
      keyToChange={keyElem}
      ></SelectInput>
  } )

  return (
    <div className='full-screen'>
      <div className='container'>
        <div className='tabs-container'>
          <button disabled={!isThreeBands} onClick={() => {setIsThreeBands(false)}}>2 bands</button>
          <button disabled={isThreeBands} onClick={() => {setIsThreeBands(true)}}>3 bands</button>
        </div>
        <h4>Electronic color code</h4>
        <p>Calculate the resistance value by its colors</p>
        {allSelects}
        <ResistanceImageAndResult 
          resistance={resistance}
        />
      </div>
    </div>
  )
}

export default App
