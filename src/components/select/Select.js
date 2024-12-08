import React from 'react';
import './Select.css'; // Assuming you will create a CSS file for styling

const Select = ({ options, id, name, value, placeholder, onChange }) => {
  return (
    <div className="select-container">
      <input
        list={id}
        name={name}
        value={value.value ?? value}
        placeholder={placeholder}
        onChange={onChange}
        className="select-input"
      />
      <datalist id={id} className="select-datalist">
        {options.map((option) => (
          <option key={option.value ?? option} value={option.value ?? option} className="select-option">{option.label ?? ''}</option>
        ))}
      </datalist>
    </div>
  );
};

export default Select;
