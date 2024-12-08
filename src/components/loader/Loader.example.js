import React from 'react';
import { useLoader } from '../../hooks/useLoader';
import Button from '../button/Button';

// Exemplo de uso do Loader
const LoaderExample = () => {
  const { showLoader, hideLoader } = useLoader();

  const handleClick = () => {
    showLoader();
    setTimeout(() => {
      hideLoader();
    }, 2000);
  };

  return (
    <Button onClick={handleClick}>Mostrar Loader</Button>
  );
};

export default LoaderExample;