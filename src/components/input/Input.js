import React from 'react';
import './Input.css';

const Input = ({ readOnly = false, list, required = false, autoFocus = false, label, type, name, value, onChange, placeholder, outerClassname = '', lableClassname = '', innerClassname = '' }) => {
  return (
    <div className={`input-container ${outerClassname}`}>
      {label && <label htmlFor={name} className={`input-label ${lableClassname}`}>{label}</label>}
      <input
        readOnly={readOnly}
        list={list}
        required={required}
        type={type}
        name={name}
        value={value}
        autoFocus={autoFocus}
        onChange={onChange}
        placeholder={placeholder}
        className={`input-field ${innerClassname}`}
      />
    </div>
  );
};

export default Input;
