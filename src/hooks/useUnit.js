import { useContext } from "react";
import { UnitContext } from "../contexts/unitContext";

export const useUnit = () => {
  return useContext(UnitContext);
};