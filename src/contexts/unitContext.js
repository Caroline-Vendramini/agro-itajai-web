import { createContext } from "react";

export const UnitContext = createContext({
  units: [],
  selectedUnit: null,
  setSelectedUnit: () => { }
});