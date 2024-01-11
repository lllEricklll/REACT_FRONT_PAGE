import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

export function Productos() {
  const [selectedOption, setSelectedOption] = useState(""); // Estado para la opción seleccionada
  const [searchValue, setSearchValue] = useState(""); // Estado para el valor de búsqueda
  const [responseData, setResponseData] = useState(null); // Estado para almacenar la respuesta de la API

  const options = [
    { value: 'ipo', label: 'IP busqueda' },
    { value: 'mac', label: 'Mac busqueda' },
    { value: 'cb', label: 'Control de Bienes busqueda' },
    { value: 'num_serie', label: 'Numero de serie busqueda' },
  ];

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchButtonClick = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5066/api/informacionRed/${selectedOption}/${searchValue}`
      );

      setResponseData(response.data);
      console.log("Respuesta de la API:", response.data);
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };

  const handleResetButtonClick = () => {
    setSelectedOption("");
    setSearchValue("");
    setResponseData(null);
  };

  return (
    <Container>
      <h1>Busquedas:</h1>
      <SearchContainer>
        <select value={selectedOption} onChange={handleOptionChange}>
          <option>Seleccionar opción de búsqueda</option>
          <option value="ipo">IP busqueda</option>
          <option value="mac">Mac busqueda</option>
          <option value="cb">Control de Bienes busqueda</option>
          <option value="num_serie">Numero de serie busqueda</option>
        </select>
        <input
          type="text"
          placeholder="Ingrese el valor de búsqueda"
          value={searchValue}
          onChange={handleSearchInputChange}
        />
        <button onClick={handleSearchButtonClick}>Buscar</button>
      </SearchContainer>

      {responseData && (
        <ResultContainer>
          <h2>Resultado de la búsqueda:</h2>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>IP</th>
                <th>Máscara</th>
                <th>Gateway</th>
                <th>Sector</th>
                <th>Tipo</th>
                <th>Nombre</th>
                <th>MAC</th>
                <th>Número de Serie</th>
                <th>Switch</th>
                <th>Puerto</th>
                <th>PtO_RED</th>
                <th>Usuario</th>
                <th>Contraseña</th>
                <th>CB</th>
                <th>Marca</th>
                <th>Modelo</th>
              </tr>
            </thead>
            <tbody>
              {responseData.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.ip}</td>
                  <td>{item.mascara}</td>
                  <td>{item.gateway}</td>
                  <td>{item.sector}</td>
                  <td>{item.tipo}</td>
                  <td>{item.nombre}</td>
                  <td>{item.mac}</td>
                  <td>{item.numero_de_serie}</td>
                  <td>{item.switch}</td>
                  <td>{item.puerto}</td>
                  <td>{item.ptO_RED}</td>
                  <td>{item.usuario}</td>
                  <td>{item.contrasena}</td>
                  <td>{item.cb}</td>
                  <td>{item.marca}</td>
                  <td>{item.modelo}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <button onClick={handleResetButtonClick}>Reiniciar</button>
        </ResultContainer>
      )}
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Cambiado a flex-start */
  background-color: #EDF3F;
  position: relative;
  padding-bottom: 20px; /* Añadido espacio en la parte inferior para el fondo */
  overflow-x: auto; /* Añadido para permitir desplazamiento horizontal */
`;

const Table = styled.table`
  width: 100%;
  margin-left: 500px; /* Añadido margen izquierdo de 10 píxeles */
  border-collapse: collapse;
  background-color: #EDF3F;

  th, td {
    border: 1px solid #000;
    padding: 8px;
    text-align: left;
  }

  thead th {
    background-color: #007bff;
    color: #fff;
  }

  tbody {
    tr:nth-child(odd) {
      background-color: #C0C0C0;
    }

    tr:nth-child(even) {
      background-color: #DCDCDC;
    }
  }
`;


const SearchContainer = styled.div`
  margin-top: 10px;

  select,
  input {
    padding: 8px;
    margin-right: 10px;
  }

  button {
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 10px;
  }
`;

const ResultContainer = styled.div`
  margin-top: 20px;

  h2 {
    margin-bottom: 10px;
  }

  button {
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
  }
`;
