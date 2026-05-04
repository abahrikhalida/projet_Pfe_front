// // hooks/useProjetVersion.js
// import { useState, useEffect } from "react";
// import { fetchComparaisonProjet } from "../recapApi";

// const useProjetVersion = (codeDivision) => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [hasSearched, setHasSearched] = useState(false);

//   const searchProject = async (code) => {
//     if (!code || !code.trim()) {
//       setError("Veuillez entrer un code division");
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     setHasSearched(true);

//     try {
//       const response = await fetchComparaisonProjet(code.trim());
//       setData(response.data);
//       setError(null);
//     } catch (err) {
//       console.error("Error fetching project version:", err);
      
//       // Gestion des erreurs
//       if (err.response) {
//         if (err.response.status === 404) {
//           setError(`Projet "${code}" introuvable`);
//         } else if (err.response.status === 401) {
//           setError("Session expirée. Veuillez vous reconnecter.");
//         } else {
//           setError(err.response?.data?.error || "Erreur lors du chargement");
//         }
//       } else if (err.request) {
//         setError("Impossible de contacter le serveur");
//       } else {
//         setError(err.message || "Une erreur est survenue");
//       }
//       setData(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetSearch = () => {
//     setData(null);
//     setError(null);
//     setHasSearched(false);
//   };

//   return { 
//     data, 
//     loading, 
//     error, 
//     hasSearched,
//     searchProject,
//     resetSearch,
//     hasPrevious: data?.version_precedente !== null,
//     currentProject: data?.projet_actuel?.data,
//     previousProject: data?.version_precedente?.data
//   };
// };

// export default useProjetVersion;
// useProjetVersion.js
import { useState } from "react";
import { fetchComparaisonProjet } from "../recapApi";

const useProjetVersion = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const searchProject = async (code) => {
    if (!code || !code.trim()) {
      setError("Veuillez entrer un code division");
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      console.log("Recherche du projet:", code);
      const response = await fetchComparaisonProjet(code.trim());
      console.log("Réponse reçue:", response.data);
      setData(response.data);
    } catch (err) {
      console.error("Erreur détaillée:", err);
      
      if (err.response?.status === 404) {
        setError(`Projet "${code}" non trouvé. Vérifiez le code division.`);
      } else if (err.response?.status === 401) {
        setError("Session expirée. Veuillez vous reconnecter.");
      } else if (err.response?.status === 500) {
        setError("Erreur serveur. Veuillez réessayer plus tard.");
      } else {
        setError(err.response?.data?.error || err.message || "Erreur lors du chargement");
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

  // Structure des données selon l'API
  return {
    data,
    loading,
    error,
    hasSearched,
    searchProject,
    resetSearch,
    hasPrevious: data?.version_precedente !== null,
    currentProject: data?.projet_actuel?.data,
    previousProject: data?.version_precedente?.data,
    message: data?.message,
  };
};

export default useProjetVersion;