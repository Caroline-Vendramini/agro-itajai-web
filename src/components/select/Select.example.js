import React, { useState } from 'react';
import Select from './Select';

const SelectExample = () => {
  const [selectedOption, setSelectedOption] = useState('');

  // Options pode ser um array de strings ou um array de objetos
  // const options = [
  //   'João Pedro Oliveira',
  //   'Maria da Silva',
  //   'José da Silva Sauro',
  // ];

  const options2 = [
    { value: 'João Pedro Oliveira', label: 'Cabeça branca' },
    { value: 'Maria da Silva', label: 'Maria' },
    { value: 'José da Silva Sauro', label: 'Zoinho' },
  ];

  const handleChange = (selected) => {
    setSelectedOption(selected.target.value);
  };

  // TODO refact
  return (
    <Select
      id={'select'}
      label="Selecione um nome"
      options={options2}
      value={selectedOption}
      onChange={handleChange}
    />
  );
};

export default SelectExample;
