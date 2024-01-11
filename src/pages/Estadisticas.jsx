import styled from "styled-components";
import React, { useState } from "react";
import axios from "axios";


const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FormContainer = styled.div`
  background-color: #EDF2E2;
  padding: 4px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 450px; /* Ajustado el ancho del contenedor del formulario */
`;

const InputContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;

  div {
    margin-bottom: 15px;
    display: flex;
    flex-direction: column; /* Cambiado a columna para colocar el texto arriba */
  }

  label {
    margin-bottom: 5px;
    font-size: 15px; /* Tamaño de fuente aumentado */
  }

  input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
`;

const ButtonContainer = styled.div`
  text-align: center;
  margin-top: 20px; /* Agregado espacio arriba del botón */

  button {
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;
export function Estadisticas() {
  const [formData, setFormData] = useState({
    ip: '',
    mascara: '',
    gateway: '',
    sector: '',
    tipo: '',
    nombre: '',
    mac: '',
    numero_de_serie: '',
    switch: '',
    puerto: '',
    ptO_RED: '',
    usuario: '',
    contrasena: '',
    cb: '',
    marca: '',
    modelo: '',
  });

  const insertUrl = 'http://localhost:5066/api/informacionRed/Insertar';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveChanges = async () => {
    try {
      await axios.post(insertUrl, formData);
      alert('Dato insertado correctamente');
    } catch (error) {
      console.error('Error al insertar datos:', error);
    }
  };

  return (
    <Container>
      <h1>Redes</h1>
      <FormContainer>
        <h2>Insertar Datos</h2>
        <form>
          <InputContainer>
            <div>
              <label>IP:</label>
              <input
                type="text"
                name="ip"
                value={formData.ip}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>MASCARA:</label>
              <input
                type="text"
                name="mascara"
                value={formData.mascara}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Gateway:</label>
              <input
                type="text"
                name="gateway"
                value={formData.gateway}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Sector:</label>
              <input
                type="text"
                name="sector"
                value={formData.sector}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Tipo:</label>
              <input
                type="text"
                name="tipo"
                value={formData.tipo}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Nombre:</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Mac:</label>
              <input
                type="text"
                name="mac"
                value={formData.mac}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Numero de Serie:</label>
              <input
                type="text"
                name="numero_de_serie"
                value={formData.numero_de_serie}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Swicth:</label>
              <input
                type="text"
                name="switch"
                value={formData.switch}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Puerto:</label>
              <input
                type="text"
                name="puerto"
                value={formData.puerto}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Punto de Red:</label>
              <input
                type="text"
                name="ptO_RED"
                value={formData.ptO_RED}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Usuario:</label>
              <input
                type="text"
                name="usuario"
                value={formData.usuario}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Contraseña:</label>
              <input
                type="text"
                name="contrasena"
                value={formData.contrasena}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Control de bienes:</label>
              <input
                type="text"
                name="cb"
                value={formData.cb}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Marca:</label>
              <input
                type="text"
                name="marca"
                value={formData.marca}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Modelo:</label>
              <input
                type="text"
                name="modelo"
                value={formData.modelo}
                onChange={handleInputChange}
              />
            </div>
            </InputContainer>
          <ButtonContainer>
            <button type="button" onClick={handleSaveChanges}>
              Guardar cambios
            </button>
          </ButtonContainer>
        </form>
      </FormContainer>
    </Container>
  );
}
