// Função que remove caracteres especiais e acentos de uma string para facilitar a busca
export const removeSpecialCharacters = (str) => {
  return str.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]/g, '');
}

// Função que busca uma string em outra, ignorando acentos e caracteres especiais
export const searchString = (str, search) => {
  return removeSpecialCharacters(str || '').includes(removeSpecialCharacters(search || ''));
}