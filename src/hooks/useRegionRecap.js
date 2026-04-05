// src/hooks/useRegionRecap.js
import { useState, useEffect } from "react";
import { fetchRecapRegion } from "../recapApi";

const useRegionRecap = () => {
  const [regions, setRegions]             = useState([]);
  const [totalDivision, setTotalDivision] = useState({});
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState(null);

  useEffect(() => {
    // fetchRecapRegion()
    fetchRecapRegion(3)
      .then((res) => {
        setRegions(res.data.regions);
        setTotalDivision(res.data.total_division);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { regions, totalDivision, loading, error };
};

export default useRegionRecap;