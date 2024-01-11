import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as XLSX from 'xlsx';

const Excel = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5066/api/informacionRed/Excel/BusquedaGeneralExcel');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  const handleDelete = async (id_excel) => {
    try {
      console.log(`Deleting item with ID: ${id_excel}`);
      const response = await fetch(`http://localhost:5066/api/informacionRed/Excel/${id_excel}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        console.log(`Item with ID ${id_excel} deleted successfully.`);
        // Reload or fetch the updated data if needed
        const updatedData = data.filter(item => item.iD_EXCEL !== id_excel);
        setData(updatedData);
      } else {
        console.error(`Error deleting item with ID ${id_excel}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };
  

  const handleDownloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');
    XLSX.writeFile(wb, 'Informacion_Red.xlsx');
  };

  return (
    <TableContainer>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <StyledTable>
          <thead>
            <br/>
            <br/>
            <br/>
            <tr>
              <th>ID_EXCEL</th>
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
            {data.map((item) => (
             <tr key={item.iD_EXCEL}>
                <td>{item.iD_EXCEL}</td>
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
                <td>
                <button onClick={() => handleDelete(item.iD_EXCEL)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      )}
       <DownloadButton onClick={handleDownloadExcel}>Descargar Excel</DownloadButton>
    </TableContainer>
  );
};

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  height: 100vh;
  
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-top: 20px;

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }

  tbody {
    tr:nth-child(odd) {
      background-color: #f9f9f9;
    }

    tr:nth-child(even) {
      background-color: #fff;
    }
  }
`;

const DownloadButton = styled.button`
  margin-top: 20px;
  padding: 10px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  cursor: pointer;
`;
export default Excel;
