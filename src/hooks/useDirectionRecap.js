// src/hooks/useDirectionRecap.js
import { useState, useEffect } from "react";
import { fetchRecapDirection } from "../recapApi";

const useDirectionRecap = () => {
  const [directions, setDirection]             = useState([]);
  const [totalDivision, setTotalDivision] = useState({});
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState(null);

  useEffect(() => {
    // fetchRecapDirection()
    fetchRecapDirection()
      .then((res) => {
        setDirection(res.data.directions);
        setTotalDivision(res.data.total_division);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { directions, totalDivision, loading, error };
};

export default useDirectionRecap;