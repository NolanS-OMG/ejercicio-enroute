const ResistanceImageAndResult = ( params ) => {

  const { resistance } = params;

  const { band_one, band_two, band_three, multiplier, tolerance, value, tolerance_value } = resistance;

  const getNumbreWithPrtefix = (number) => {
    let prefixes = [ '', 'k', 'M', 'G' ]
    for( let i=0; i<3; i++ ) {
      if( number < Math.pow(10, (i+1)*3) ) {
        return (number/Math.pow(10, (i)*3)).toString() + ' ' + prefixes[i];
      }
    }
  }
  
  return (
    <div className="calculation-viewer-container">
          <div className='resistance-img-container'>
            <div className='resistance-img'>
              <div className='resistance-img-base'></div>
              <div className='resistance-img-wood-one'></div>
              <div className='resistance-img-wood-left-one'></div>
              <div className='resistance-img-wood-left-two'></div>
              <div className='resistance-img-wood-right-one'></div>
              <div className='resistance-img-wood-right-two'></div>
              { band_one ? <div className='band-one' style={{background: band_one}}></div> : ''}
              { band_two ? <div className='band-two' style={{background: band_two}}></div> : ''}
              { band_three !== 'none' ? <div className='band-three' style={{background: band_three}}></div> : ''}
              { multiplier ? <div className='multiplier' style={{background: multiplier}}></div> : ''}
              { tolerance ? <div className='tolerance' style={{background: tolerance}}></div> : ''}
            </div>
          </div>
          <div className="value-container">
            <h4>{value >= 0 ? getNumbreWithPrtefix(value) : ''}Ohms {` \u00b1${tolerance_value}%`}</h4>
          </div>
          
        </div>
  );
}

export default ResistanceImageAndResult;