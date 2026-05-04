// hooks/useProjetChampsModifiables.js
import { useState } from "react";
import { fetchChampsModifiables } from "../recapApi";

const useProjetChampsModifiables = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const searchProject = async (codeDivision) => {
    if (!codeDivision || !codeDivision.trim()) {
      setError("Veuillez entrer un CPTE ANALY");
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const response = await fetchChampsModifiables(codeDivision.trim());
      setData(response.data);
    } catch (err) {
      console.error("Erreur:", err);
      if (err.response?.status === 404) {
        setError(`Projet "${codeDivision}" non trouvé`);
      } else if (err.response?.status === 401) {
        setError("Session expirée. Veuillez vous reconnecter.");
      } else {
        setError(err.response?.data?.error || "Erreur lors du chargement");
      }
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const resetSearch = () => {
    setData(null);
    setError(null);
    setHasSearched(false);
  };

  return {
    data,
    loading,
    error,
    hasSearched,
    searchProject,
    resetSearch,
    totalModifications: data?.total_modifications || 0,
    versionActuelle: data?.version_actuelle,
    versionPrecedente: data?.version_precedente,
    champsModifiables: data?.champs_modifiables || [],
    message: data?.message,
  };
};

export default useProjetChampsModifiables;