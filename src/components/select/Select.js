import React from 'react';
import Input from '../input/Input';

const Select = ({ options, id, name, label, value, placeholder, onChange, outerClassname }) => {
  return (
    <div >
      <Input
        outerClassname={outerClassname}
        list={id}
        name={name}
        label={label}
        value={value.value ?? value}
        placeholder={placeholder}
        onChange={onChange}
      />
      <datalist id={id}>
        {options.map((option) => (
          <option key={option.value ?? option} value={option.value ?? option}>{option.label ?? ''}</option>
        ))}
      </datalist>
    </div>
  );
};

export default Select;
