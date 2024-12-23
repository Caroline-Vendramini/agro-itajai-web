import { useEffect, useState } from "react";
import { SELECTED_UNIT_ID, TOKEN } from "../constants";
import { UnitContext } from "../contexts/unitContext";
import useAxios from "../hooks/useAxios";
import useStorage from "../hooks/useStorage";

export const UnitProvider = ({ children }) => {
  const [units, setUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const { storedValue, setValue } = useStorage(SELECTED_UNIT_ID, null);
  const { fetchData } = useAxios();

  useEffect(() => {
    const token = localStorage.getItem(TOKEN);
    if (!token) {
      return;
    }

    fetchData({
      url: "/store",
    })
      .then((response) => {
        setUnits(response.data);
        const selected = response.data.find(
          (unit) => unit.id.toString() === storedValue
        );
        if (selected) {
          setSelectedUnit(selected);
        }
        if (!selected) {
          setSelectedUnit(response.data[0]);
          setValue(response.data[0].id);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const setUnit = (unit) => {
    setSelectedUnit(unit);
    setValue(unit.id);
  };

  return (
    <UnitContext.Provider
      value={{ units, selectedUnit, setSelectedUnit: setUnit }}
    >
      {children}
    </UnitContext.Provider>
  );
};
