import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${({ theme }) => theme.bgtotal};
  background-size: cover;
  background-position: center;
`;

const Sidebar = styled.div`
  width: 100%;
  max-width: 100%;
  background-color: ${(props) => props.theme.bg};
  position: sticky;
  top: 0;
  overflow-y: auto;
  height: 100vh;
`;

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;

  th,
  td {
    border: 1px solid #fff;
    padding: 8px;
    text-align: left;
    background-color: #f2f2f2;
  }

  th {
    background-color: #f2f2f2;
  }

  tbody {
    tr:nth-child(odd) {
      background-color: #c0c0c0;
    }

    tr:nth-child(even) {
      background-color: #dcdcdc;
    }
  }
`;

const SuccessMessage = styled.div`
  background-color: #4caf50;
  color: #fff;
  padding: 5px; /* Ajusta el padding para hacerlo más pequeño */
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 1000; /* Asegura que esté en la parte superior */
  transition: opacity 0.5s ease; /* Agrega una transición de opacidad */
  opacity: ${(props) => (props.visible ? 1 : 0)};
  border-radius: 5px; /* Ajusta el radio de borde para hacerlo rectangular */
`;


export function Home() {
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filasAgregadas, setFilasAgregadas] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSearchGeneral = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5066/api/informacionRed/busquedaGeneral/');
      setResultados(response.data);
    } catch (error) {
      console.error('Error al realizar la búsqueda general:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearchGeneral();
  }, []); 


  const handleAgregar = async (filaSeleccionada) => {
    try {
      const { id } = filaSeleccionada;
      await axios.post(`http://localhost:5066/api/informacionRed/operacionCompleta?id=${id}`);
      setSuccessMessage(`Operación completa para la fila con ID ${id}.`);
      setFilasAgregadas([...filasAgregadas, filaSeleccionada]);
    } catch (error) {
      console.error('Error al realizar la operación:', error);
    }
  };

  const SuccessMessageWrapper = ({ message, onTimeout }) => {
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        onTimeout();
      }, 1500); // Establece el tiempo de duración en milisegundos (en este caso, 1.5 segundos)
  
      return () => {
        clearTimeout(timeoutId);
      };
    }, [onTimeout]);
  
    return <SuccessMessage visible={message !== ''}>{message}</SuccessMessage>;
  };

  return (
    <Container>
     <Sidebar>
        <div>
          <h1>Búsqueda General</h1>
          <br/>
          {loading && <p>Cargando resultados...</p>}
  
          {resultados.length > 0 && (
            <div style={{ width: '100%' }}>
              <TableContainer>
                <div className="excel-table-container">
                  <StyledTable>
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
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resultados.map((resultado, index) => (
                        <tr key={index}>
                          <td>{resultado.id}</td>
                          <td>{resultado.ip}</td>
                          <td>{resultado.mascara}</td>
                          <td>{resultado.gateway}</td>
                          <td>{resultado.sector}</td>
                          <td>{resultado.tipo}</td>
                          <td>{resultado.nombre}</td>
                          <td>{resultado.mac}</td>
                          <td>{resultado.numero_de_serie}</td>
                          <td>{resultado.switch}</td>
                          <td>{resultado.puerto}</td>
                          <td>{resultado.ptO_RED}</td>
                          <td>{resultado.usuario}</td>
                          <td>{resultado.contrasena}</td>
                          <td>{resultado.cb}</td>
                          <td>{resultado.marca}</td>
                          <td>{resultado.modelo}</td>
                          <td>
                            <button onClick={() => handleAgregar(resultado)}>Añadir</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </StyledTable>
                </div>
              </TableContainer>
            </div>
          )}
          {resultados.length === 0 && !loading && <p>No se encontraron resultados.</p>}
        </div>
      </Sidebar>
      {successMessage && (
  <SuccessMessageWrapper message={successMessage} onTimeout={() => setSuccessMessage('')} />
  )}
    </Container>
  );
}
