const SelectInput = ( params ) => {
  const { list, object, changeObjectFunction, keyToChange } = params;
  if(object[keyToChange] === 'none') {
    return(<></>);
  }
  const capitalizeString = (str) => {
    return str[0].toUpperCase() + str.slice(1);
  }
  const isList = list ? list.length > 0 : false;
  if( !isList ) {
    return ( <div>Loading...</div> );
  }
  const blackTextBackground = ['white', 'orange', 'yellow', 'silver', 'gold'];
  const options = list.map( (element, index) => {
    return (
    <option 
      style={{background:element.color, color: blackTextBackground.toString().search(element.color) < 0 ? 'white':'black'}}
      value={element.color} 
      key={index}
      >
        {capitalizeString(element.color)}
      </option>)
  } );

  const labelValue = keyToChange.search('band')>=0 ? (keyToChange.search('one')>=0 ? '1\u00B0': keyToChange.search('two')>=0? '2\u00B0':'3\u00B0') + 'Band' : keyToChange.charAt(0).toUpperCase() + keyToChange.slice(1);
  
  return (
    <div className="select-container">
      <label>{labelValue + ':'}</label>
      <select style={{background: object[keyToChange], color: blackTextBackground.toString().search(object[keyToChange]) < 0 ? 'white':'black'}} onChange={ (event) => {
        let copyOfObject = { ...object };
        copyOfObject[ keyToChange ] = event.target.value;
        changeObjectFunction( {...copyOfObject} );
      } }> {options} </select>
    </div>
  )
}

export default SelectInput;