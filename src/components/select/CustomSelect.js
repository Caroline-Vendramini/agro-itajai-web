import React from 'react';
import Select from 'react-select';
import './CustomSelect.css';

const customStyles = {
  control: (provided) => ({
    ...provided,
    minHeight: '40px',
    borderRadius: '8px',
    borderColor: '#ccc',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#888',
    },
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: '8px',
    marginTop: '4px',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#007bff' : state.isFocused ? '#f0f0f0' : null,
    color: state.isSelected ? '#fff' : '#333',
    '&:active': {
      backgroundColor: '#007bff',
      color: '#fff',
    },
  }),
};

const CustomSelect = ({ label, options, value, onChange, placeholder, isMulti,
  isClearable, isDisabled, isSearchable, isLoading, className, required, onMenuOpen, onMenuClose,
  maxMenuHeight
}) => {
  return (
    <div className={`select-container ${className}`}>
      {label && <label className='select-label'>{label}</label>}
      <Select
        required={required}
        isMulti={isMulti}
        isClearable={isClearable}
        isDisabled={isDisabled}
        isSearchable={isSearchable}
        isLoading={isLoading}
        styles={customStyles}
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onMenuOpen={onMenuOpen}
        onMenuClose={onMenuClose}
        maxMenuHeight={maxMenuHeight}
      />
    </div>
  );
};

export default CustomSelect;