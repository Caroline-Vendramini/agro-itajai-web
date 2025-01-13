import { useCallback, useState } from "react";
import { LoaderContext } from "../contexts/loaderContext";

export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const showLoader = useCallback(() => setLoading(true), []);
  const hideLoader = useCallback(() => setLoading(false), []);

  return (
    <LoaderContext.Provider value={{ loading, showLoader, hideLoader }}>
      {children}
    </LoaderContext.Provider>
  );
};