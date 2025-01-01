// Função para formar a data em formato brasileiro
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
}

// Função para formar a data em formato YYYY-MM-DD
export const formatDateToISO = (date = new Date()) => {
  return new Date(date).toISOString().split('T')[0];
}