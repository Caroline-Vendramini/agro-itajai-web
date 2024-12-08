import React from 'react';
import Button from './Button';

// Exemplo de uso do componente Button
const ButtonExample = () => {
  return (
    <div>
      <Button onClick={() => alert('Botão clicado!')}>Clique aqui</Button>
    </div>
  );
};

export default ButtonExample;