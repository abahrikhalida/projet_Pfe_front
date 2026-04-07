import { useState, useEffect } from "react";
import { fetchRecapFamille } from "../recapApi";

const useFamilleRecap = () => {
  const [familles, setFamilles]           = useState([]);
  const [totalDivision, setTotalDivision] = useState({});
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState(null);

  useEffect(() => {
    fetchRecapFamille()
      .then((res) => {
        setFamilles(res.data.familles);
        setTotalDivision(res.data.total_division_production);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { familles, totalDivision, loading, error };
};

export default useFamilleRecap;