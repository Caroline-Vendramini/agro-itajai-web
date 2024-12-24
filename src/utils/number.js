import { ignoreNaN } from "./money";

export const stringToNumber = (value) => {
  if (!value) {
    return 0;
  }
  if (typeof value === "number") {
    return value;
  }
  const result = parseFloat(value.replace(/\./g, "").replace(",", ".").replace(/[^\d.-]/g, ""));
  return ignoreNaN(result);
};
