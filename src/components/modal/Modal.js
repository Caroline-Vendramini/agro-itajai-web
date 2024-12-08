import React from 'react';
import './Modal.css';

const Container = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

const Title = ({ children }) => {
  return <h1 className="modal-title">{children}</h1>;
}

const Content = ({ children }) => {
  return <p className="modal-content">{children}</p>;
}

const Footer = ({ children }) => {
  return <div className="modal-footer">{children}</div>;
}

// Exporta o componente Modal e os subcomponentes Title, Content e Footer no padrão de composition

const Modal = ({ show, onClose, children }) => {
  return (
    <Container show={show} onClose={onClose}>
      {children}
    </Container>
  );
}

Modal.Title = Title;
Modal.Content = Content;
Modal.Footer = Footer;

export default Modal;