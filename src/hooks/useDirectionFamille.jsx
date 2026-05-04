import { useState, useEffect } from "react";
import { fetchRecapeDirectionFamille } from "../recapApi";

const useDirectionFamilleRecap = () => {
  const [directions, setDirections]         = useState([]);
  const [totalGlobal, setTotalGlobal] = useState({});
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);

  useEffect(() => {
    fetchRecapeDirectionFamille()
      .then((res) => {
        setDirections(res.data.detail);
        setTotalGlobal(res.data.total_global);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { directions, totalGlobal, loading, error };
};

export default useDirectionFamilleRecap;