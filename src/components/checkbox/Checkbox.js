import React from 'react';
import './Checkbox.css';

const Checkbox = ({ label, checked, onChange, id }) => {
  return (
    <div className="checkbox-container">
      <label htmlFor={id} className="checkbox-label">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="checkbox-input"
        />
        {label}
      </label>
    </div>
  );
};

export default Checkbox;