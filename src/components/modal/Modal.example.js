import React from "react";
import useModal from "../../hooks/useModal";
import Button from "../button/Button";
import Modal from "./Modal";

// Exemplo de uso do Modal
const ModalExample = () => {
  const { isModalOpen, toggleModal, openModal, closeModal } = useModal();

  return (
    <div>
      <Button onClick={toggleModal}>Abrir Modal</Button>
      <Modal show={isModalOpen} onClose={toggleModal}>
        <Modal.Title>Título do Modal</Modal.Title>
        <Modal.Content>Este é o conteúdo do Modal.</Modal.Content>
        <Modal.Footer>
          <Button variant="cancel" onClick={toggleModal}>
            Fechar Modal
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalExample;
