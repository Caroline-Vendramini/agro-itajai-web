import { stringToNumber } from "./number";

// Função que formata number para moeda
export const formatMoney = (value) => {
  if (typeof value === "string") {
    return moneyMask(value);
  }
  if (!value) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(0);
  }
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

// Função para permitir apenas moeda no input, mostrando sempre o valor formatado
export const moneyMask = (value) => {
  // Remove tudo que não é número
  let newValue = value.replace(/\D/g, "");

  // Caso o valor seja vazio, retorna vazio
  if (!newValue || newValue === "0") {
    return "R$ 0,00";
  }

  // Remove zeros a esquerda
  newValue = newValue.replace(/^0+/, "");

  // Caso o valor seja de centavos, adiciona o zero a esquerda
  if (newValue.length === 1) {
    return `R$ 0,0${newValue}`;
  }

  if (newValue.length === 2) {
    return `R$ 0,${newValue}`;
  }

  return `R$ ${newValue
    .replace(/\D/g, "")
    .replace(/(\d{1,})(\d{2})$/, "$1,$2")}`;
};

export const roundToTwo = (num) => Math.round(num * 100) / 100;

// Função que formata moeda para number
export const moneyToNumber = (value) => {
  if (!value) {
    return 0;
  }
  if (typeof value === "number") {
    return value;
  }
  const result = stringToNumber(value.replace("R$", ""));
  return ignoreNaN(result);
};

// Função que ignora NaN e retorna 0
export const ignoreNaN = (value) => {
  if (isNaN(value)) {
    return 0;
  }
  return value;
};

export const profitMargin = (cost, price) => {
  const profit = roundToTwo(
    ignoreNaN(
      ((moneyToNumber(price) - moneyToNumber(cost)) / moneyToNumber(price)) *
      100
    )
  )
  if (profit === Number.NEGATIVE_INFINITY) {
    return "Margem de lucro indefinida"
  }
  return profit + "%"

};
