import React from 'react';
import './Button.css';

// Variants: primary, cancel, info, success, warning, danger
const Button = ({ title, small = false, onClick, children, type = 'button', variant = 'primary', className = '' }) => {
  return (
    <button type={type} title={title} className={`button button-${variant} ${className} ${small ? 'button-small' : ''}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;