// Função que formata number para moeda
export const formatMoney = (value) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

// Função para permitir apenas moeda no input, mostrando sempre o valor formatado
export const moneyMask = (value) => {
  // Remove tudo que não é número
  let newValue = value.replace(/\D/g, '');

  // Caso o valor seja vazio, retorna vazio
  if (!newValue || newValue === '0') {
    return 'R$ 0,00';
  }

  // Remove zeros a esquerda
  newValue = newValue.replace(/^0+/, '');

  // Caso o valor seja de centavos, adiciona o zero a esquerda
  if (newValue.length === 1) {
    return `R$ 0,0${newValue}`;
  }

  if (newValue.length === 2) {
    return `R$ 0,${newValue}`;
  }

  return `R$ ${newValue.replace(/\D/g, '').replace(/(\d{1,})(\d{2})$/, '$1,$2')}`;
}