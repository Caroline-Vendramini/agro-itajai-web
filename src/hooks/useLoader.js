import { useContext } from "react";
import { LoaderContext } from "../contexts/loaderContext";

export const useLoader = () => {
  return useContext(LoaderContext);
};