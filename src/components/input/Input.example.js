import { useState } from 'react';
import Input from './Input';

// Exemplo de uso do componente Input
const InputExample = () => {
  const [value, setValue] = useState('');
  const handleInputChange = (e) => {
    console.log(e.target.value);
    setValue(e.target.value);
  }
  return (
    <Input
      type="text"
      label={"Nome"}
      placeholder="Digite seu nome aqui"
      value={value}
      onChange={handleInputChange}
    />
  );
};

export default InputExample;