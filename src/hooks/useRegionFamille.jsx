import { useState, useEffect } from "react";
import { axiosInstance } from "../axios";

const useRegionFamilleRecap = () => {
  const [regions, setRegions]         = useState([]);
  const [totalGlobal, setTotalGlobal] = useState({});
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);

  useEffect(() => {
    axiosInstance
      .get("/recap/region-famille/?upload_id=3")
      .then((res) => {
        setRegions(res.data.detail);
        setTotalGlobal(res.data.total_global);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { regions, totalGlobal, loading, error };
};

export default useRegionFamilleRecap;