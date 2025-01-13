import defaultAxios from "axios";
import { useCallback, useState } from "react";
import { SELECTED_UNIT_ID, TOKEN } from "../constants";

const useAxios = () => {
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async ({
    url,
    method = "get",
    data = null,
    headers = {},
  }) => {
    try {
      const token = localStorage.getItem(TOKEN);
      const selectedUnitId = localStorage.getItem(SELECTED_UNIT_ID);
      const axios = defaultAxios.create({
        baseURL: "http://localhost:3010", // TODO: Substituir com o valor do backend via .env
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "x-unit-id": selectedUnitId,
        },
      });

      const response = await axios.request({
        url,
        method,
        data,
        headers,
      });
      return response;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, [])

  return { loading, fetchData };
};

export default useAxios;
