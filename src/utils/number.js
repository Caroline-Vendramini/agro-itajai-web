export const stringToNumber = (value) => {
  if (typeof value === "number") {
    return value; // Se já for número, retorna o mesmo
  }

  if (typeof value === "string") {
    // Substituir apenas vírgula por ponto decimal
    const normalizedValue = value
      .replace(/\.(?=\d{3}(,|$))/g, "") // Remove pontos como separadores de milhares
      .replace(",", "."); // Substitui vírgula por ponto decimal

    return parseFloat(normalizedValue.replace(/[^\d.-]/g, "")); // Converte para número
  }

  throw new Error("Invalid input: expected a string or number.");
}
