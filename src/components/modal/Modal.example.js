import React, { useState } from 'react';
import Modal from './Modal';
import Button from '../button/Button';

// Exemplo de uso do Modal
const ModalExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Button onClick={toggleModal}>Abrir Modal</Button>
      {isOpen && (
        <Modal show={isOpen} onClose={toggleModal}>
          <Modal.Title>Título do Modal</Modal.Title>
          <Modal.Content>Este é o conteúdo do Modal.</Modal.Content>
          <Modal.Footer><Button variant='cancel' onClick={toggleModal}>Fechar Modal</Button></Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default ModalExample;
