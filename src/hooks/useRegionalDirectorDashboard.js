// // hooks/useRegionalDirectorDashboard.js
// import { useState, useEffect, useCallback } from "react";
// import { fetchRegionalDirectorDashboard } from "../recapApi";

// const useRegionalDirectorDashboard = (autoFetch = true) => {
//   const [dashboardData, setDashboardData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [lastUpdate, setLastUpdate] = useState(null);

//   const fetchData = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetchRegionalDirectorDashboard();
//       if (response.data?.success) {
//         setDashboardData(response.data.data);
//         setLastUpdate(new Date());
//       } else {
//         setError(response.data?.error || "Erreur de chargement des données");
//       }
//     } catch (err) {
//       console.error("Erreur chargement dashboard région:", err);
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

//   // Données dérivées
//   const region = dashboardData?.region || {};
//   const stats = dashboardData?.statistiques_generales || {};
//   const structures = dashboardData?.structures || [];
//   const perimetres = dashboardData?.perimetres || [];
//   const familles = dashboardData?.familles || {};

//   return {
//     // Données brutes
//     dashboardData,
//     region,
//     stats,
//     structures,
//     perimetres,
//     familles,
    
//     // États
//     loading,
//     error,
//     lastUpdate,
    
//     // Actions
//     refreshData: fetchData,
    
//     // Vérifications
//     hasData: !!dashboardData,
//     hasStructures: structures.length > 0,
//     hasPerimetres: perimetres.length > 0,
    
//     // Calculs utiles
//     totalProjets: stats.projets || 0,
//     totalValides: stats.valides || 0,
//     totalSoumis: stats.soumis?.total || 0,
//     totalRejetes: stats.rejetes?.total || 0,
//     totalEnCours: stats.en_cours || 0,
//     tauxValidation: stats.taux_validation || 0,
//     budgetTotal: stats.budget_total || 0,
//     topPerimetres: perimetres.slice(0, 5),
//     topFamilles: familles.top_10 || [],
//   };
// };

// export default useRegionalDirectorDashboard;
// hooks/useRegionalDirectorDashboard.js


// hooks/useRegionalDirectorDashboard.js
import { useState, useEffect, useCallback } from "react";
import { fetchRegionalDirectorDashboard } from "../recapApi";

const useRegionalDirectorDashboard = (autoFetch = true) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchRegionalDirectorDashboard();
      if (response.data?.success) {
        setDashboardData(response.data.data);
        setLastUpdate(new Date());
      } else {
        setError(response.data?.error || "Erreur de chargement des données");
      }
    } catch (err) {
      console.error("Erreur chargement dashboard région:", err);
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

  // Données dérivées
  const region = dashboardData?.region || {};
  const stats = dashboardData?.statistiques_generales || {};
  const structures = dashboardData?.structures || [];
  const perimetres = dashboardData?.perimetres || [];
  const familles = dashboardData?.familles || {};

  return {
    dashboardData,
    region,
    stats,
    structures,
    perimetres,
    familles,
    loading,
    error,
    lastUpdate,
    refreshData: fetchData,
    hasData: !!dashboardData,
    hasStructures: structures.length > 0,
    hasPerimetres: perimetres.length > 0,
    totalProjets: stats.projets || 0,
    totalValidesDR: stats.valides?.directeur_region || 0,
    totalValidesDivisionnaire: stats.valides?.divisionnaire || 0,
    totalValides: stats.valides?.total || 0,
    totalSoumis: stats.soumis || 0,
    totalRejetes: stats.rejetes?.total || 0,
    totalRejetesRegion: stats.rejetes?.directeur_region || 0,
    totalRejetesDivisionnaire: stats.rejetes?.divisionnaire || 0,
    totalAnnules: stats.annules || 0,
    totalEnCours: stats.en_cours || 0,
    tauxValidationDR: stats.taux_validation_dr || 0,
    tauxValidationGlobal: stats.taux_validation_global || 0,
    budgetTotal: stats.budget_total || 0,
    topPerimetres: (perimetres || []).slice(0, 5),
    topFamilles: familles.top_10 || [],
  };
};

export default useRegionalDirectorDashboard;