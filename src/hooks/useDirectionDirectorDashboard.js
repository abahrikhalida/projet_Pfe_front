// // hooks/useDirectionDirectorDashboard.js
// import { useState, useEffect, useCallback } from "react";
// import { fetchDirectionDirectorDashboard } from "../recapApi";

// const useDirectionDirectorDashboard = (autoFetch = true) => {
//   const [dashboardData, setDashboardData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [lastUpdate, setLastUpdate] = useState(null);

//   const fetchData = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetchDirectionDirectorDashboard();
//       if (response.data?.success) {
//         setDashboardData(response.data.data);
//         setLastUpdate(new Date());
//       } else {
//         setError(response.data?.error || "Erreur de chargement des données");
//       }
//     } catch (err) {
//       console.error("Erreur chargement dashboard direction:", err);
//       setError(err.response?.data?.error || err.message || "Erreur de connexion");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     if (autoFetch) {
//       fetchData();
//     }
//   }, [autoFetch, fetchData]);

//   // Données dérivées pour faciliter l'utilisation
//   const direction = dashboardData?.direction || {};
//   const stats = dashboardData?.statistiques_generales || {};
//   const departements = dashboardData?.departements || [];
//   const famillesDirections = dashboardData?.familles_directions || {};

//   return {
//     // Données brutes
//     dashboardData,
//     direction,
//     stats,
//     departements,
//     famillesDirections,
    
//     // États
//     loading,
//     error,
//     lastUpdate,
    
//     // Actions
//     refreshData: fetchData,
    
//     // Vérifications
//     hasData: !!dashboardData,
//     hasDepartements: departements.length > 0,
    
//     // Calculs utiles
//     totalProjets: stats.projets || 0,
//     totalValides: stats.valides || 0,
//     totalSoumis: stats.soumis?.total || 0,
//     totalRejetes: stats.rejetes?.total || 0,
//     totalEnCours: stats.en_cours || 0,
//     tauxValidation: stats.taux_validation || 0,
//     budgetTotal: stats.budget_total || 0,
//   };
// };

// export default useDirectionDirectorDashboard;
// hooks/useDirectionDirectorDashboard.js
import { useState, useEffect, useCallback } from "react";
import { fetchDirectionDirectorDashboard } from "../recapApi";

const useDirectionDirectorDashboard = (autoFetch = true) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchDirectionDirectorDashboard();
      if (response.data?.success) {
        setDashboardData(response.data.data);
        setLastUpdate(new Date());
      } else {
        setError(response.data?.error || "Erreur de chargement des données");
      }
    } catch (err) {
      console.error("Erreur chargement dashboard direction:", err);
      setError(err.response?.data?.error || err.message || "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [autoFetch, fetchData]);

  const direction = dashboardData?.direction || {};
  const stats = dashboardData?.statistiques_generales || {};
  const departements = dashboardData?.departements || [];
  const famillesDirections = dashboardData?.familles_directions || {};

  return {
    dashboardData,
    direction,
    stats,
    departements,
    famillesDirections,
    loading,
    error,
    lastUpdate,
    refreshData: fetchData,
    hasData: !!dashboardData,
    hasDepartements: departements.length > 0,
    
    // Calculs avec les nouveaux champs
    totalProjets: stats.projets || 0,
    totalValidesDD: stats.valides?.directeur_direction || 0,
    totalValidesDivisionnaire: stats.valides?.divisionnaire || 0,
    totalValides: stats.valides?.total || 0,
    totalSoumis: stats.soumis || 0,
    totalRejetes: stats.rejetes?.total || 0,
    totalRejetesDirection: stats.rejetes?.directeur_direction || 0,
    totalRejetesDivisionnaire: stats.rejetes?.divisionnaire || 0,
    totalAnnules: stats.annules || 0,
    totalEnCours: stats.en_cours || 0,
    tauxValidationDD: stats.taux_validation_dd || 0,
    tauxValidationGlobal: stats.taux_validation_global || 0,
    budgetTotal: stats.budget_total || 0,
  };
};

export default useDirectionDirectorDashboard;