import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from 'axios';

export function Diagramas() {
  const [updateId, setUpdateId] = useState("");
  const [formData, setFormData] = useState({
    ip: "",
    mascara: "",
    gateway: "",
    sector: "",
    tipo: "",
    nombre: "",
    mac: "",
    numero_de_serie: "",
    switch: "",
    puerto: "",
    ptO_RED: "",
    usuario: "",
    contrasena: "",
    cb: "",
    marca: "",
    modelo: "",
  });
  const [showModal, setShowModal] = useState(false);
  const prevUpdateIdRef = useRef();

  useEffect(() => {
    // Almacena el valor anterior de updateId
    prevUpdateIdRef.current = updateId;
  }, [updateId]);

  useEffect(() => {
    // Verifica si showModal es verdadero y updateId ha cambiado
    if (showModal && prevUpdateIdRef.current !== updateId) {
      handleFetchData();
    }
  }, [showModal]);

  const handleFetchData = async () => {
    try {
      if (!updateId) {
        console.error('ID de actualización vacío');
        return;
      }

      const response = await axios.get(
        `http://localhost:5066/api/informacionRed/idi/${updateId}`
      );

      // Muestra los datos en la consola
      console.log('Datos traídos desde la API:', response.data);

      // Actualiza el estado formData con los datos recuperados
      setFormData(response.data[0]); // Asumiendo que response.data es un array

      // Muestra el modal solo si se recuperaron datos
      setShowModal(true);
    } catch (error) {
      console.error('Error al realizar la búsqueda de id:', error);
      // Muestra el mensaje de error completo en la consola
      console.error(
        'Detalles del error:',
        error.response || error.request || error.message
      );

      // No se recuperaron datos, así que no se muestra el modal
      setShowModal(false);
    }
  };

  const handleUpdateIdChange = (event) => {
    setUpdateId(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveChanges = async () => {
    try {
      // Usa el estado formData directamente para la solicitud PUT
      const response = await axios.put(
        `http://localhost:5066/api/informacionRed/act/${updateId}`,
        formData
      );
  
      console.log("Respuesta de la API:", response.data);
  
      // Cerrar el modal después de guardar cambios
      handleCloseModal();
    } catch (error) {
      console.error("Error al guardar cambios:", error);
    }
  };
  

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container>
      <h1>Actualizar Red:</h1>
      <UpdateContainer>
        <label htmlFor="updateId">Ingrese el ID a actualizar:</label>
        <input
          type="text"
          id="updateId"
          name="updateId"
          placeholder="ID"
          value={updateId}
          onChange={handleUpdateIdChange}
        />
        <button onClick={handleFetchData}>
          Buscar Datos
        </button>
        {showModal && (
  <Modal>
    <FormContainer>
      <InputContainer>
        <div>
          <label htmlFor="ip">IP:</label>
          <input
            type="text"
            id="ip"
            name="ip"
            value={formData.ip}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="mascara">Máscara:</label>
          <input
            type="text"
            id="mascara"
            name="mascara"
            value={formData.mascara}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="gateway">Gateway:</label>
          <input
            type="text"
            id="gateway"
            name="gateway"
            value={formData.gateway}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="sector">Sector:</label>
          <input
            type="text"
            id="sector"
            name="sector"
            value={formData.sector}
            onChange={handleInputChange}          
          />
        </div>
        <div>
          <label htmlFor="tipo">Tipo:</label>
          <input
            type="text"
            id="tipo"
            name="tipo"
            value={formData.tipo}
            onChange={handleInputChange}          
          />
        </div>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}          
          />
        </div>
        <div>
          <label htmlFor="mac">Mac:</label>
          <input
            type="text"
            id="mac"
            name="mac"
            value={formData.mac}
            onChange={handleInputChange}          
          />
        </div>
        <div>
          <label htmlFor="numero_de_serie">Numero de serie:</label>
          <input
            type="text"
            id="numero_de_serie"
            name="numero_de_serie"
            value={formData.numero_de_serie}
            onChange={handleInputChange}          
          />
        </div>
        <div>
          <label htmlFor="switch">Switch:</label>
          <input
            type="text"
            id="switch"
            name="switch"
            value={formData.switch}
            onChange={handleInputChange}          
          />
        </div>
        <div>
          <label htmlFor="puerto">Puerto:</label>
          <input
            type="text"
            id="puerto"
            name="puerto"
            value={formData.puerto}
            onChange={handleInputChange}          
          />
        </div>  
        <div>
          <label htmlFor="ptO_RED">Punto de red:</label>
          <input
            type="text"
            id="ptO_RED"
            name="ptO_RED"
            value={formData.ptO_RED}
            onChange={handleInputChange}          
          />
        </div>  
        <div>
          <label htmlFor="usuario">Usuario:</label>
          <input
            type="text"
            id="usuario"
            name="usuario"
            value={formData.usuario}
            onChange={handleInputChange}          
          />
        </div> 
        <div>
          <label htmlFor="contrasena">Contraseña:</label>
          <input
            type="text"
            id="contrasena"
            name="contrasena"
            value={formData.contrasena}
            onChange={handleInputChange}          
          />
        </div> 
        <div>
          <label htmlFor="cb">Control de bienes:</label>
          <input
            type="text"
            id="cb"
            name="cb"
            value={formData.cb}
            onChange={handleInputChange}          
          />
        </div>
        <div>
          <label htmlFor="marca">Marca:</label>
          <input
            type="text"
            id="marca"
            name="marca"
            value={formData.marca}
            onChange={handleInputChange}          
          />
        </div>
        <div>
          <label htmlFor="modelo">Modelo:</label>
          <input
            type="text"
            id="modelo"
            name="modelo"
            value={formData.modelo}
            onChange={handleInputChange}          
          />
        </div>
        <CloseButton onClick={handleCloseModal}>Cerrar</CloseButton>
        <SaveButton onClick={handleSaveChanges}>Guardar</SaveButton>
      </InputContainer>
    </FormContainer>
  </Modal>
    )}
     </UpdateContainer>
    </Container>
  );
}

const UpdateContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  label {
    margin-bottom: 8px;
  }

  input {
    padding: 8px;
    margin-bottom: 8px;
  }

  button {
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CloseButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  height: 4vh;
  width: 10vh;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 55px;
  text-align: center; /* Cambio aquí */

  &:disabled {
    cursor: auto;
  }
`;

const SaveButton = styled.button`
  background-color: #28a745;
  color: #fff;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  height: 4vh;
  width: 10vh;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 55px;

  &:disabled {
    cursor: auto;
  }
`;



const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(253, 254, 254, 0.7);
  display: flex;
  flex-direction: column; /* Añadido para centrar el botón */
  align-items: center;
  justify-content: center;
  overflow-y: auto;
`;


const FormContainer = styled.div`
  background-color: #EDF2E2;
  padding: 4px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 450px;
`;

const InputContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;

  div {
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
  }

  label {
    margin-bottom: 5px;
    font-size: 15px;
  }

  input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
`;