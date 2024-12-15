import { useState } from "react";

const useStorage = (key, initialValue, storageType = "localStorage") => {
  const storage =
    storageType === "localStorage" ? localStorage : sessionStorage;

  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = storage.getItem(key);
      return item ? typeof item === 'object' ? JSON.parse(item) : item : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      storage.setItem(key, typeof item === 'object' ? JSON.stringify(value) : value);
    } catch (error) {
      console.error(error);
    }
  };

  const removeValue = () => {
    try {
      storage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue, removeValue];
};

export default useStorage;
