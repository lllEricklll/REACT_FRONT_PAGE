import React, { useState } from 'react';

const BusquedaGeneral = ({ onSearch }) => {
  const [termino] = useState('');

  const handleSearch = () => {
    onSearch(termino);
  };



  return (
    <div>
        <br></br>
        <br></br>
    <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};

export default BusquedaGeneral;
