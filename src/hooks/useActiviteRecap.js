import { useState, useEffect } from "react";
import { axiosInstance } from "../axios";

const useActiviteRecap = () => {
  const [activites, setActivites]         = useState([]);
  const [totalDivision, setTotalDivision] = useState({});
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState(null);

  useEffect(() => {
    axiosInstance
      .get("/recap/activite/?upload_id=3")
      .then((res) => {
        // Si l'API retourne un tableau direct
        if (Array.isArray(res.data)) {
          setActivites(res.data);
        } else {
          setActivites(res.data.activites || []);
          setTotalDivision(res.data.total_division || {});
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { activites, totalDivision, loading, error };
};

export default useActiviteRecap;