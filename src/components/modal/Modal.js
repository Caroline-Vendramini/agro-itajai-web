import React from 'react';
import './Modal.css';

const Container = ({ show, onClose, children, zIndex, width, maxWidth, height, minHeight }) => {
  if (!show) {
    return null;
  }

  return (
    <div style={{
      zIndex: zIndex,
    }} className="modal-overlay">
      <div className="modal-container" style={{
        width: width || 'auto',
        maxWidth: maxWidth || 'auto',
        height: height || 'auto',
        minHeight: minHeight || 'auto',
      }}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

const Title = ({ children, width }) => {
  return <h1 className="modal-title" style={{
    width: width || 'auto'
  }}>{children}</h1>;
}

const Content = ({ children, width }) => {
  return <div className="modal-content" style={{
    width: width || 'auto'
  }}>{children}</div>;
}

const Footer = ({ children, width }) => {
  return <div className="modal-footer" style={{
    width: width || 'auto'
  }}>{children}</div>;
}

// Exporta o componente Modal e os subcomponentes Title, Content e Footer no padrão de composition

const Modal = ({ show, onClose, children, zIndex = 0, width, maxWidth, height, minHeight }) => {
  return (
    <Container zIndex={zIndex} show={show} onClose={onClose} width={width} maxWidth={maxWidth} height={height} minHeight={minHeight}>
      {children}
    </Container>
  );
}

Modal.Title = Title;
Modal.Content = Content;
Modal.Footer = Footer;

export default Modal;