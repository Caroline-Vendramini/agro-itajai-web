import React from 'react';
import './Button.css';

// Variants: primary, cancel, info, success, warning, danger
const Button = ({ onClick, children, type = 'button', variant = 'primary', className = '' }) => {
  return (
    <button type={type} className={`button button-${variant} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;