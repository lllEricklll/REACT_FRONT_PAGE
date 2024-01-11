import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

export function Reportes() {
  const [deleteId, setDeleteId] = useState(""); // Estado para el número de ID a eliminar
  const [deleteMessage, setDeleteMessage] = useState(""); // Estado para el mensaje de eliminación

  const handleDeleteInputChange = (event) => {
    setDeleteId(event.target.value);
  };

  const handleDeleteButtonClick = async () => {
    try {
      // Realiza la solicitud DELETE a la API utilizando el número de ID ingresado
      const response = await axios.delete(
        `http://localhost:5066/api/informacionRed/${deleteId}`
      );

      // Maneja la respuesta según tus necesidades
      console.log("Respuesta de la API:", response.data);
      setDeleteMessage("Elemento eliminado correctamente");

      // Establece un temporizador para borrar el mensaje después de 7 segundos
      setTimeout(() => {
        setDeleteMessage("");
      }, 7000);
    } catch (error) {
      console.error("Error al eliminar el elemento:", error);
      setDeleteMessage("Error al eliminar el elemento");

      // Establece un temporizador para borrar el mensaje de error después de 7 segundos
      setTimeout(() => {
        setDeleteMessage("");
      },4000);
    }
  };

  return (
    <Container>
      <h1>Eliminar</h1>
      <DeleteContainer>
        <label>Eliminar por ID:</label>
        <DeleteInput
          type="text"
          placeholder="Ingrese el ID a eliminar"
          value={deleteId}
          onChange={handleDeleteInputChange}
        />
        <DeleteButton onClick={handleDeleteButtonClick}>Eliminar</DeleteButton>
        {deleteMessage && <DeleteMessage>{deleteMessage}</DeleteMessage>}
      </DeleteContainer>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DeleteContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  label {
    margin-bottom: 8px;
  }
`;

const DeleteInput = styled.input`
  padding: 8px;
  margin-bottom: 8px;
`;

const DeleteButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const DeleteMessage = styled.p`
  margin-top: 10px;
  color: green;
  font-weight: bold;
`;
