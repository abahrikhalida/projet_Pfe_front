// hooks/useDashboardStats.js

// import { useState, useEffect, useCallback } from "react";
// import { fetchDashboardCounters, fetchDashboardProjetsPmt } from "../recapApi";

// const useDashboardStats = () => {
//   const [counters, setCounters] = useState({
//     regions: 0,
//     directions: 0,
//     familles: 0,
//     departements: 0,
//     perimetres: 0,
//     familles_directions: 0,
//   });
  
//   const [projetsStats, setProjetsStats] = useState({
//     annee_pmt: null,
//     projets_total: 0,
//     cout_total: 0,
//     projets_valides: 0,
//     projets_soumis: 0,
//   });
  
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [lastUpdate, setLastUpdate] = useState(null);

//   // Fonction pour rafraîchir les données
//   const refreshData = useCallback(async () => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       // Appels parallèles
//       const [countersRes, projetsRes] = await Promise.all([
//         fetchDashboardCounters(),
//         fetchDashboardProjetsPmt()
//       ]);
      
//       // Traitement des compteurs
//       if (countersRes.data?.success) {
//         setCounters({
//           regions: countersRes.data.data?.regions || 0,
//           directions: countersRes.data.data?.directions || 0,
//           familles: countersRes.data.data?.familles || 0,
//           departements: countersRes.data.data?.departements || 0,
//           perimetres: countersRes.data.data?.perimetres || 0,
//           familles_directions: countersRes.data.data?.familles_directions || 0,
//         });
//       }
      
//       // Traitement des projets PMT
//       if (projetsRes.data?.success) {
//         setProjetsStats({
//           annee_pmt: projetsRes.data.data?.annee_pmt || null,
//           projets_total: projetsRes.data.data?.projets_total || 0,
//           cout_total: projetsRes.data.data?.cout_total || 0,
//           projets_valides: projetsRes.data.data?.projets_valides || 0,
//           projets_soumis: projetsRes.data.data?.projets_soumis || 0,
//         });
//       }
      
//       setLastUpdate(new Date());
      
//     } catch (err) {
//       console.error("Erreur chargement dashboard stats:", err);
//       setError(err.response?.data?.message || err.message || "Erreur de chargement");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // Chargement initial
//   useEffect(() => {
//     refreshData();
//   }, [refreshData]);

//   // Calculs dérivés utiles pour le dashboard
//   const totalFamilles = (counters.familles || 0) + (counters.familles_directions || 0);
//   const budgetTotalMilliers = projetsStats.cout_total || 0;
//   const tauxAvancement = projetsStats.projets_total > 0 
//     ? Math.round((projetsStats.projets_valides / projetsStats.projets_total) * 100)
//     : 0;
//   const budgetUtilise = (projetsStats.projets_valides / (projetsStats.projets_total || 1)) * budgetTotalMilliers;
//   const budgetRestant = budgetTotalMilliers - budgetUtilise;

//   return {
//     // Données brutes
//     counters,
//     projetsStats,
//     loading,
//     error,
//     lastUpdate,
//     refreshData,
    
//     // Données calculées (utiles pour le dashboard)
//     totalFamilles,
//     budgetTotalMilliers,
//     tauxAvancement,
//     budgetUtilise,
//     budgetRestant,
//   };
// };

// export default useDashboardStats;
// hooks/useDashboardStats.js






















// import { useState, useEffect, useCallback } from "react";
// import { fetchDashboardCounters, fetchDashboardProjetsPmt, fetchUsers } from "../recapApi";

// const useDashboardStats = (autoFetch = true) => {
//   const [counters, setCounters] = useState({
//     regions: 0,
//     directions: 0,
//     familles: 0,
//     departements: 0,
//     perimetres: 0,
//     familles_directions: 0,
//   });
  
//   const [projetsStats, setProjetsStats] = useState({
//     annee_pmt: null,
//     projets_total: 0,
//     cout_total: 0,
//     projets_valides: 0,
//     projets_soumis: 0,
//   });
  
//   const [users, setUsers] = useState({
//     total: 0,
//     list: [],
//     byRole: {
//       chef: 0,
//       agent: 0,
//       directeur: 0,
//       directeur_region: 0,
//       directeur_direction: 0,
//       responsable_structure: 0,
//       responsable_departement: 0,
//       divisionnaire: 0,
//     }
//   });
  
//   const [loading, setLoading] = useState(true);
//   const [loadingCounters, setLoadingCounters] = useState(false);
//   const [loadingProjets, setLoadingProjets] = useState(false);
//   const [loadingUsers, setLoadingUsers] = useState(false);
//   const [error, setError] = useState(null);
//   const [lastUpdate, setLastUpdate] = useState(null);

//   // Récupérer uniquement les compteurs
//   const fetchCountersOnly = useCallback(async () => {
//     setLoadingCounters(true);
//     try {
//       const response = await fetchDashboardCounters();
//       if (response.data?.success) {
//         setCounters({
//           regions: response.data.data?.regions || 0,
//           directions: response.data.data?.directions || 0,
//           familles: response.data.data?.familles || 0,
//           departements: response.data.data?.departements || 0,
//           perimetres: response.data.data?.perimetres || 0,
//           familles_directions: response.data.data?.familles_directions || 0,
//         });
//       }
//     } catch (err) {
//       console.error("Erreur chargement compteurs:", err);
//       setError(err.response?.data?.message || err.message);
//     } finally {
//       setLoadingCounters(false);
//     }
//   }, []);

//   // Récupérer uniquement les stats projets
//   const fetchProjetsOnly = useCallback(async () => {
//     setLoadingProjets(true);
//     try {
//       const response = await fetchDashboardProjetsPmt();
//       if (response.data?.success) {
//         setProjetsStats({
//           annee_pmt: response.data.data?.annee_pmt || null,
//           projets_total: response.data.data?.projets_total || 0,
//           cout_total: response.data.data?.cout_total || 0,
//           projets_valides: response.data.data?.projets_valides || 0,
//           projets_soumis: response.data.data?.projets_soumis || 0,
//         });
//       }
//     } catch (err) {
//       console.error("Erreur chargement projets PMT:", err);
//       setError(err.response?.data?.message || err.message);
//     } finally {
//       setLoadingProjets(false);
//     }
//   }, []);

//   // Récupérer uniquement les utilisateurs
//   const fetchUsersOnly = useCallback(async () => {
//     setLoadingUsers(true);
//     try {
//       const response = await fetchUsers();
//       if (response.data?.status === 'success') {
//         const usersList = response.data.users || [];
//         const totalUsers = response.data.total_users || 0;
        
//         // Compter les utilisateurs par rôle
//         const byRole = {
//           chef: 0,
//           agent: 0,
//           directeur: 0,
//           directeur_region: 0,
//           directeur_direction: 0,
//           responsable_structure: 0,
//           responsable_departement: 0,
//           divisionnaire: 0,
//         };
        
//         usersList.forEach(user => {
//           const role = user.role;
//           if (byRole.hasOwnProperty(role)) {
//             byRole[role]++;
//           }
//         });
        
//         setUsers({
//           total: totalUsers,
//           list: usersList,
//           byRole: byRole,
//         });
//       }
//     } catch (err) {
//       console.error("Erreur chargement utilisateurs:", err);
//       // Ne pas setError global pour les utilisateurs car c'est optionnel
//       // setError(err.response?.data?.message || err.message);
//     } finally {
//       setLoadingUsers(false);
//     }
//   }, []);

//   // Rafraîchir toutes les données
//   const refreshData = useCallback(async () => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       await Promise.all([
//         fetchCountersOnly(),
//         fetchProjetsOnly(),
//         fetchUsersOnly()
//       ]);
//       setLastUpdate(new Date());
//     } catch (err) {
//       console.error("Erreur rafraîchissement:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, [fetchCountersOnly, fetchProjetsOnly, fetchUsersOnly]);

//   // Chargement initial
//   useEffect(() => {
//     if (autoFetch) {
//       refreshData();
//     }
//   }, [autoFetch, refreshData]);

//   // Calculs dérivés
//   const totalFamilles = (counters.familles || 0) + (counters.familles_directions || 0);
//   const budgetTotalMilliers = projetsStats.cout_total || 0;
//   const tauxAvancement = projetsStats.projets_total > 0 
//     ? Math.round((projetsStats.projets_valides / projetsStats.projets_total) * 100)
//     : 0;
//   const budgetUtilise = (projetsStats.projets_valides / (projetsStats.projets_total || 1)) * budgetTotalMilliers;
//   const budgetRestant = budgetTotalMilliers - budgetUtilise;
  
//   // Projets en cours = soumis - validés
//   const projetsEnCours = projetsStats.projets_soumis - projetsStats.projets_valides;
  
//   // Pourcentage du budget utilisé
//   const pourcentageBudgetUtilise = budgetTotalMilliers > 0 
//     ? Math.round((budgetUtilise / budgetTotalMilliers) * 100)
//     : 0;

//   // Nombre total d'utilisateurs (alias pratique)
//   const totalUsers = users.total;

//   return {
//     // Données brutes
//     counters,
//     projetsStats,
//     users,
//     loading,
//     loadingCounters,
//     loadingProjets,
//     loadingUsers,
//     error,
//     lastUpdate,
    
//     // Actions
//     refreshData,
//     fetchCountersOnly,
//     fetchProjetsOnly,
//     fetchUsersOnly,
    
//     // Données calculées
//     totalFamilles,
//     budgetTotalMilliers,
//     tauxAvancement,
//     budgetUtilise,
//     budgetRestant,
//     projetsEnCours,
//     pourcentageBudgetUtilise,
//     totalUsers,
    
//     // Vérifications utiles
//     hasData: projetsStats.projets_total > 0,
//     hasCounters: counters.regions > 0 || counters.directions > 0,
//     hasUsers: users.total > 0,
//   };
// };

// export default useDashboardStats;
















// import { useState, useEffect, useCallback } from "react";
// import { 
//   fetchDashboardCounters, 
//   fetchDashboardProjetsPmt, 
//   fetchDashboardProjetsByYear,  // ← AJOUTER CET IMPORT
//   fetchUsers 
// } from "../recapApi";

// const useDashboardStats = (autoFetch = true) => {
//   const [counters, setCounters] = useState({
//     regions: 0,
//     directions: 0,
//     familles: 0,
//     departements: 0,
//     perimetres: 0,
//     familles_directions: 0,
//   });
  
//   const [projetsStats, setProjetsStats] = useState({
//     annee_pmt: null,
//     projets_total: 0,
//     cout_total: 0,
//     projets_valides: 0,
//     projets_soumis: 0,
//   });
  
//   // ← AJOUTER CET ÉTAT POUR LES PROJETS PAR ANNÉE
//   const [projetsByYear, setProjetsByYear] = useState([]);
  
//   const [users, setUsers] = useState({
//     total: 0,
//     list: [],
//     byRole: {
//       chef: 0,
//       agent: 0,
//       directeur: 0,
//       directeur_region: 0,
//       directeur_direction: 0,
//       responsable_structure: 0,
//       responsable_departement: 0,
//       divisionnaire: 0,
//     }
//   });
  
//   const [loading, setLoading] = useState(true);
//   const [loadingCounters, setLoadingCounters] = useState(false);
//   const [loadingProjets, setLoadingProjets] = useState(false);
//   const [loadingProjetsByYear, setLoadingProjetsByYear] = useState(false); // ← AJOUTER
//   const [loadingUsers, setLoadingUsers] = useState(false);
//   const [error, setError] = useState(null);
//   const [lastUpdate, setLastUpdate] = useState(null);

//   // Récupérer uniquement les compteurs
//   const fetchCountersOnly = useCallback(async () => {
//     setLoadingCounters(true);
//     try {
//       const response = await fetchDashboardCounters();
//       if (response.data?.success) {
//         setCounters({
//           regions: response.data.data?.regions || 0,
//           directions: response.data.data?.directions || 0,
//           familles: response.data.data?.familles || 0,
//           departements: response.data.data?.departements || 0,
//           perimetres: response.data.data?.perimetres || 0,
//           familles_directions: response.data.data?.familles_directions || 0,
//         });
//       }
//     } catch (err) {
//       console.error("Erreur chargement compteurs:", err);
//       setError(err.response?.data?.message || err.message);
//     } finally {
//       setLoadingCounters(false);
//     }
//   }, []);

//   // Récupérer uniquement les stats projets PMT
//   const fetchProjetsOnly = useCallback(async () => {
//     setLoadingProjets(true);
//     try {
//       const response = await fetchDashboardProjetsPmt();
//       if (response.data?.success) {
//         setProjetsStats({
//           annee_pmt: response.data.data?.annee_pmt || null,
//           projets_total: response.data.data?.projets_total || 0,
//           cout_total: response.data.data?.cout_total || 0,
//           projets_valides: response.data.data?.projets_valides || 0,
//           projets_soumis: response.data.data?.projets_soumis || 0,
//         });
//       }
//     } catch (err) {
//       console.error("Erreur chargement projets PMT:", err);
//       setError(err.response?.data?.message || err.message);
//     } finally {
//       setLoadingProjets(false);
//     }
//   }, []);

//   // ← AJOUTER CETTE FONCTION POUR RÉCUPÉRER LES PROJETS PAR ANNÉE
//   const fetchProjetsByYearOnly = useCallback(async () => {
//     setLoadingProjetsByYear(true);
//     try {
//       const response = await fetchDashboardProjetsByYear();
//       if (response.data?.success) {
//         setProjetsByYear(response.data.data || []);
//       }
//     } catch (err) {
//       console.error("Erreur chargement projets par année:", err);
//       // Ne pas setError global pour cette donnée car c'est optionnel
//     } finally {
//       setLoadingProjetsByYear(false);
//     }
//   }, []);

//   // Récupérer uniquement les utilisateurs
//   const fetchUsersOnly = useCallback(async () => {
//     setLoadingUsers(true);
//     try {
//       const response = await fetchUsers();
//       if (response.data?.status === 'success') {
//         const usersList = response.data.users || [];
//         const totalUsers = response.data.total_users || 0;
        
//         // Compter les utilisateurs par rôle
//         const byRole = {
//           chef: 0,
//           agent: 0,
//           directeur: 0,
//           directeur_region: 0,
//           directeur_direction: 0,
//           responsable_structure: 0,
//           responsable_departement: 0,
//           divisionnaire: 0,
//         };
        
//         usersList.forEach(user => {
//           const role = user.role;
//           if (byRole.hasOwnProperty(role)) {
//             byRole[role]++;
//           }
//         });
        
//         setUsers({
//           total: totalUsers,
//           list: usersList,
//           byRole: byRole,
//         });
//       }
//     } catch (err) {
//       console.error("Erreur chargement utilisateurs:", err);
//     } finally {
//       setLoadingUsers(false);
//     }
//   }, []);

//   // Rafraîchir toutes les données
//   const refreshData = useCallback(async () => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       await Promise.all([
//         fetchCountersOnly(),
//         fetchProjetsOnly(),
//         fetchProjetsByYearOnly(),  // ← AJOUTER CETTE LIGNE
//         fetchUsersOnly()
//       ]);
//       setLastUpdate(new Date());
//     } catch (err) {
//       console.error("Erreur rafraîchissement:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, [fetchCountersOnly, fetchProjetsOnly, fetchProjetsByYearOnly, fetchUsersOnly]);

//   // Chargement initial
//   useEffect(() => {
//     if (autoFetch) {
//       refreshData();
//     }
//   }, [autoFetch, refreshData]);

//   // Calculs dérivés
//   const totalFamilles = (counters.familles || 0) + (counters.familles_directions || 0);
//   const budgetTotalMilliers = projetsStats.cout_total || 0;
//   const tauxAvancement = projetsStats.projets_total > 0 
//     ? Math.round((projetsStats.projets_valides / projetsStats.projets_total) * 100)
//     : 0;
//   const budgetUtilise = (projetsStats.projets_valides / (projetsStats.projets_total || 1)) * budgetTotalMilliers;
//   const budgetRestant = budgetTotalMilliers - budgetUtilise;
  
//   // Projets en cours = soumis - validés
//   const projetsEnCours = projetsStats.projets_soumis - projetsStats.projets_valides;
  
//   // Pourcentage du budget utilisé
//   const pourcentageBudgetUtilise = budgetTotalMilliers > 0 
//     ? Math.round((budgetUtilise / budgetTotalMilliers) * 100)
//     : 0;

//   // Nombre total d'utilisateurs (alias pratique)
//   const totalUsers = users.total;

//   return {
//     // Données brutes
//     counters,
//     projetsStats,
//     projetsByYear,        // ← AJOUTER
//     users,
//     loading,
//     loadingCounters,
//     loadingProjets,
//     loadingProjetsByYear, // ← AJOUTER
//     loadingUsers,
//     error,
//     lastUpdate,
    
//     // Actions
//     refreshData,
//     fetchCountersOnly,
//     fetchProjetsOnly,
//     fetchProjetsByYearOnly, // ← AJOUTER
//     fetchUsersOnly,
    
//     // Données calculées
//     totalFamilles,
//     budgetTotalMilliers,
//     tauxAvancement,
//     budgetUtilise,
//     budgetRestant,
//     projetsEnCours,
//     pourcentageBudgetUtilise,
//     totalUsers,
    
//     // Vérifications utiles
//     hasData: projetsStats.projets_total > 0,
//     hasCounters: counters.regions > 0 || counters.directions > 0,
//     hasProjetsByYear: projetsByYear.length > 0, // ← AJOUTER
//     hasUsers: users.total > 0,
//   };
// };

// export default useDashboardStats;




// import { useState, useEffect, useCallback } from "react";
// import { 
//   fetchDashboardCounters, 
//   fetchDashboardProjetsPmt, 
//   fetchDashboardProjetsByYear,
//   fetchDashboardTopRegion,  // ← AJOUTER CET IMPORT
//   fetchUsers 
// } from "../recapApi";

// const useDashboardStats = (autoFetch = true) => {
//   const [counters, setCounters] = useState({
//     regions: 0,
//     directions: 0,
//     familles: 0,
//     departements: 0,
//     perimetres: 0,
//     familles_directions: 0,
//   });
  
//   const [projetsStats, setProjetsStats] = useState({
//     annee_pmt: null,
//     projets_total: 0,
//     cout_total: 0,
//     projets_valides: 0,
//     projets_soumis: 0,
//   });
  
//   // État pour les projets par année
//   const [projetsByYear, setProjetsByYear] = useState([]);
  
//   // ← AJOUTER ÉTAT POUR TOP 5 RÉGIONS
//   const [topRegions, setTopRegions] = useState([]);
  
//   const [users, setUsers] = useState({
//     total: 0,
//     list: [],
//     byRole: {
//       chef: 0,
//       agent: 0,
//       directeur: 0,
//       directeur_region: 0,
//       directeur_direction: 0,
//       responsable_structure: 0,
//       responsable_departement: 0,
//       divisionnaire: 0,
//     }
//   });
  
//   const [loading, setLoading] = useState(true);
//   const [loadingCounters, setLoadingCounters] = useState(false);
//   const [loadingProjets, setLoadingProjets] = useState(false);
//   const [loadingProjetsByYear, setLoadingProjetsByYear] = useState(false);
//   const [loadingTopRegions, setLoadingTopRegions] = useState(false); // ← AJOUTER
//   const [loadingUsers, setLoadingUsers] = useState(false);
//   const [error, setError] = useState(null);
//   const [lastUpdate, setLastUpdate] = useState(null);

//   // Récupérer uniquement les compteurs
//   const fetchCountersOnly = useCallback(async () => {
//     setLoadingCounters(true);
//     try {
//       const response = await fetchDashboardCounters();
//       if (response.data?.success) {
//         setCounters({
//           regions: response.data.data?.regions || 0,
//           directions: response.data.data?.directions || 0,
//           familles: response.data.data?.familles || 0,
//           departements: response.data.data?.departements || 0,
//           perimetres: response.data.data?.perimetres || 0,
//           familles_directions: response.data.data?.familles_directions || 0,
//         });
//       }
//     } catch (err) {
//       console.error("Erreur chargement compteurs:", err);
//       setError(err.response?.data?.message || err.message);
//     } finally {
//       setLoadingCounters(false);
//     }
//   }, []);

//   // Récupérer uniquement les stats projets PMT
//   const fetchProjetsOnly = useCallback(async () => {
//     setLoadingProjets(true);
//     try {
//       const response = await fetchDashboardProjetsPmt();
//       if (response.data?.success) {
//         setProjetsStats({
//           annee_pmt: response.data.data?.annee_pmt || null,
//           projets_total: response.data.data?.projets_total || 0,
//           cout_total: response.data.data?.cout_total || 0,
//           projets_valides: response.data.data?.projets_valides || 0,
//           projets_soumis: response.data.data?.projets_soumis || 0,
//         });
//       }
//     } catch (err) {
//       console.error("Erreur chargement projets PMT:", err);
//       setError(err.response?.data?.message || err.message);
//     } finally {
//       setLoadingProjets(false);
//     }
//   }, []);

//   // Récupérer les projets par année
//   const fetchProjetsByYearOnly = useCallback(async () => {
//     setLoadingProjetsByYear(true);
//     try {
//       const response = await fetchDashboardProjetsByYear();
//       if (response.data?.success) {
//         setProjetsByYear(response.data.data || []);
//       }
//     } catch (err) {
//       console.error("Erreur chargement projets par année:", err);
//     } finally {
//       setLoadingProjetsByYear(false);
//     }
//   }, []);

//   // ← AJOUTER FONCTION POUR RÉCUPÉRER TOP 5 RÉGIONS
//   const fetchTopRegionsOnly = useCallback(async () => {
//     setLoadingTopRegions(true);
//     try {
//       const response = await fetchDashboardTopRegion();
//       if (response.data?.success) {
//         setTopRegions(response.data.data || []);
//       }
//     } catch (err) {
//       console.error("Erreur chargement top régions:", err);
//     } finally {
//       setLoadingTopRegions(false);
//     }
//   }, []);

//   // Récupérer uniquement les utilisateurs
//   const fetchUsersOnly = useCallback(async () => {
//     setLoadingUsers(true);
//     try {
//       const response = await fetchUsers();
//       if (response.data?.status === 'success') {
//         const usersList = response.data.users || [];
//         const totalUsers = response.data.total_users || 0;
        
//         // Compter les utilisateurs par rôle
//         const byRole = {
//           chef: 0,
//           agent: 0,
//           directeur: 0,
//           directeur_region: 0,
//           directeur_direction: 0,
//           responsable_structure: 0,
//           responsable_departement: 0,
//           divisionnaire: 0,
//         };
        
//         usersList.forEach(user => {
//           const role = user.role;
//           if (byRole.hasOwnProperty(role)) {
//             byRole[role]++;
//           }
//         });
        
//         setUsers({
//           total: totalUsers,
//           list: usersList,
//           byRole: byRole,
//         });
//       }
//     } catch (err) {
//       console.error("Erreur chargement utilisateurs:", err);
//     } finally {
//       setLoadingUsers(false);
//     }
//   }, []);

//   // Rafraîchir toutes les données
//   const refreshData = useCallback(async () => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       await Promise.all([
//         fetchCountersOnly(),
//         fetchProjetsOnly(),
//         fetchProjetsByYearOnly(),
//         fetchTopRegionsOnly(),  // ← AJOUTER CETTE LIGNE
//         fetchUsersOnly()
//       ]);
//       setLastUpdate(new Date());
//     } catch (err) {
//       console.error("Erreur rafraîchissement:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, [fetchCountersOnly, fetchProjetsOnly, fetchProjetsByYearOnly, fetchTopRegionsOnly, fetchUsersOnly]);

//   // Chargement initial
//   useEffect(() => {
//     if (autoFetch) {
//       refreshData();
//     }
//   }, [autoFetch, refreshData]);

//   // Calculs dérivés
//   const totalFamilles = (counters.familles || 0) + (counters.familles_directions || 0);
//   const budgetTotalMilliers = projetsStats.cout_total || 0;
//   const tauxAvancement = projetsStats.projets_total > 0 
//     ? Math.round((projetsStats.projets_valides / projetsStats.projets_total) * 100)
//     : 0;
//   const budgetUtilise = (projetsStats.projets_valides / (projetsStats.projets_total || 1)) * budgetTotalMilliers;
//   const budgetRestant = budgetTotalMilliers - budgetUtilise;
  
//   // Projets en cours = soumis - validés
//   const projetsEnCours = projetsStats.projets_soumis - projetsStats.projets_valides;
  
//   // Pourcentage du budget utilisé
//   const pourcentageBudgetUtilise = budgetTotalMilliers > 0 
//     ? Math.round((budgetUtilise / budgetTotalMilliers) * 100)
//     : 0;

//   // Nombre total d'utilisateurs (alias pratique)
//   const totalUsers = users.total;

//   return {
//     // Données brutes
//     counters,
//     projetsStats,
//     projetsByYear,
//     topRegions,              // ← AJOUTER
//     users,
//     loading,
//     loadingCounters,
//     loadingProjets,
//     loadingProjetsByYear,
//     loadingTopRegions,       // ← AJOUTER
//     loadingUsers,
//     error,
//     lastUpdate,
    
//     // Actions
//     refreshData,
//     fetchCountersOnly,
//     fetchProjetsOnly,
//     fetchProjetsByYearOnly,
//     fetchTopRegionsOnly,     // ← AJOUTER
//     fetchUsersOnly,
    
//     // Données calculées
//     totalFamilles,
//     budgetTotalMilliers,
//     tauxAvancement,
//     budgetUtilise,
//     budgetRestant,
//     projetsEnCours,
//     pourcentageBudgetUtilise,
//     totalUsers,
    
//     // Vérifications utiles
//     hasData: projetsStats.projets_total > 0,
//     hasCounters: counters.regions > 0 || counters.directions > 0,
//     hasProjetsByYear: projetsByYear.length > 0,
//     hasTopRegions: topRegions.length > 0,  // ← AJOUTER
//     hasUsers: users.total > 0,
//   };
// };

// export default useDashboardStats;

























// import { useState, useEffect, useCallback } from "react";
// import { 
//   fetchDashboardCounters, 
//   fetchDashboardProjetsPmt, 
//   fetchDashboardProjetsByYear,
//   fetchDashboardTopRegion,
//   fetchDashboardStats,  // ← AJOUTER CET IMPORT
//   fetchUsers 
// } from "../recapApi";

// const useDashboardStats = (autoFetch = true) => {
//   const [counters, setCounters] = useState({
//     regions: 0,
//     directions: 0,
//     familles: 0,
//     departements: 0,
//     perimetres: 0,
//     familles_directions: 0,
//   });
  
//   const [projetsStats, setProjetsStats] = useState({
//     annee_pmt: null,
//     projets_total: 0,
//     cout_total: 0,
//     projets_valides: 0,
//     projets_soumis: 0,
//   });
  
//   // État pour les projets par année
//   const [projetsByYear, setProjetsByYear] = useState([]);
  
//   // État pour TOP 5 RÉGIONS
//   const [topRegions, setTopRegions] = useState([]);
  
//   // ← AJOUTER ÉTAT POUR DASHBOARD STATS
//   const [dashboardStats, setDashboardStats] = useState({
//     pmt_year: null,
//     projets_total: 0,
//     projets_valides: 0,
//     projets_soumis: 0,
//     projets_en_cours: 0,
//     budget_total: 0,
//     budget_valides: 0,
//     budget_en_cours: 0,
//     budget_restant: 0,
//     taux_avancement: 0,
//     taux_budget_utilise: 0,
//   });
  
//   const [users, setUsers] = useState({
//     total: 0,
//     list: [],
//     byRole: {
//       chef: 0,
//       agent: 0,
//       directeur: 0,
//       directeur_region: 0,
//       directeur_direction: 0,
//       responsable_structure: 0,
//       responsable_departement: 0,
//       divisionnaire: 0,
//     }
//   });
  
//   const [loading, setLoading] = useState(true);
//   const [loadingCounters, setLoadingCounters] = useState(false);
//   const [loadingProjets, setLoadingProjets] = useState(false);
//   const [loadingProjetsByYear, setLoadingProjetsByYear] = useState(false);
//   const [loadingTopRegions, setLoadingTopRegions] = useState(false);
//   const [loadingDashboardStats, setLoadingDashboardStats] = useState(false); // ← AJOUTER
//   const [loadingUsers, setLoadingUsers] = useState(false);
//   const [error, setError] = useState(null);
//   const [lastUpdate, setLastUpdate] = useState(null);

//   // Récupérer uniquement les compteurs
//   const fetchCountersOnly = useCallback(async () => {
//     setLoadingCounters(true);
//     try {
//       const response = await fetchDashboardCounters();
//       if (response.data?.success) {
//         setCounters({
//           regions: response.data.data?.regions || 0,
//           directions: response.data.data?.directions || 0,
//           familles: response.data.data?.familles || 0,
//           departements: response.data.data?.departements || 0,
//           perimetres: response.data.data?.perimetres || 0,
//           familles_directions: response.data.data?.familles_directions || 0,
//         });
//       }
//     } catch (err) {
//       console.error("Erreur chargement compteurs:", err);
//       setError(err.response?.data?.message || err.message);
//     } finally {
//       setLoadingCounters(false);
//     }
//   }, []);

//   // Récupérer uniquement les stats projets PMT
//   const fetchProjetsOnly = useCallback(async () => {
//     setLoadingProjets(true);
//     try {
//       const response = await fetchDashboardProjetsPmt();
//       if (response.data?.success) {
//         setProjetsStats({
//           annee_pmt: response.data.data?.annee_pmt || null,
//           projets_total: response.data.data?.projets_total || 0,
//           cout_total: response.data.data?.cout_total || 0,
//           projets_valides: response.data.data?.projets_valides || 0,
//           projets_soumis: response.data.data?.projets_soumis || 0,
//         });
//       }
//     } catch (err) {
//       console.error("Erreur chargement projets PMT:", err);
//       setError(err.response?.data?.message || err.message);
//     } finally {
//       setLoadingProjets(false);
//     }
//   }, []);

//   // Récupérer les projets par année
//   const fetchProjetsByYearOnly = useCallback(async () => {
//     setLoadingProjetsByYear(true);
//     try {
//       const response = await fetchDashboardProjetsByYear();
//       if (response.data?.success) {
//         setProjetsByYear(response.data.data || []);
//       }
//     } catch (err) {
//       console.error("Erreur chargement projets par année:", err);
//     } finally {
//       setLoadingProjetsByYear(false);
//     }
//   }, []);

//   // Récupérer TOP 5 RÉGIONS
//   const fetchTopRegionsOnly = useCallback(async () => {
//     setLoadingTopRegions(true);
//     try {
//       const response = await fetchDashboardTopRegion();
//       if (response.data?.success) {
//         setTopRegions(response.data.data || []);
//       }
//     } catch (err) {
//       console.error("Erreur chargement top régions:", err);
//     } finally {
//       setLoadingTopRegions(false);
//     }
//   }, []);

//   // ← AJOUTER FONCTION POUR RÉCUPÉRER DASHBOARD STATS
//   const fetchDashboardStatsOnly = useCallback(async () => {
//     setLoadingDashboardStats(true);
//     try {
//       const response = await fetchDashboardStats();
//       if (response.data?.dashboard_stats) {
//         setDashboardStats(response.data.dashboard_stats);
//       }
//     } catch (err) {
//       console.error("Erreur chargement dashboard stats:", err);
//     } finally {
//       setLoadingDashboardStats(false);
//     }
//   }, []);

//   // Récupérer uniquement les utilisateurs
//   const fetchUsersOnly = useCallback(async () => {
//     setLoadingUsers(true);
//     try {
//       const response = await fetchUsers();
//       if (response.data?.status === 'success') {
//         const usersList = response.data.users || [];
//         const totalUsers = response.data.total_users || 0;
        
//         // Compter les utilisateurs par rôle
//         const byRole = {
//           chef: 0,
//           agent: 0,
//           directeur: 0,
//           directeur_region: 0,
//           directeur_direction: 0,
//           responsable_structure: 0,
//           responsable_departement: 0,
//           divisionnaire: 0,
//         };
        
//         usersList.forEach(user => {
//           const role = user.role;
//           if (byRole.hasOwnProperty(role)) {
//             byRole[role]++;
//           }
//         });
        
//         setUsers({
//           total: totalUsers,
//           list: usersList,
//           byRole: byRole,
//         });
//       }
//     } catch (err) {
//       console.error("Erreur chargement utilisateurs:", err);
//     } finally {
//       setLoadingUsers(false);
//     }
//   }, []);

//   // Rafraîchir toutes les données
//   const refreshData = useCallback(async () => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       await Promise.all([
//         fetchCountersOnly(),
//         fetchProjetsOnly(),
//         fetchProjetsByYearOnly(),
//         fetchTopRegionsOnly(),
//         fetchDashboardStatsOnly(),  // ← AJOUTER CETTE LIGNE
//         fetchUsersOnly()
//       ]);
//       setLastUpdate(new Date());
//     } catch (err) {
//       console.error("Erreur rafraîchissement:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, [fetchCountersOnly, fetchProjetsOnly, fetchProjetsByYearOnly, fetchTopRegionsOnly, fetchDashboardStatsOnly, fetchUsersOnly]);

//   // Chargement initial
//   useEffect(() => {
//     if (autoFetch) {
//       refreshData();
//     }
//   }, [autoFetch, refreshData]);

//   // Calculs dérivés (utilisent dashboardStats si disponibles, sinon projetsStats)
//   const totalFamilles = (counters.familles || 0) + (counters.familles_directions || 0);
  
//   // Utiliser dashboardStats si disponible, sinon projetsStats
//   const budgetTotalMilliers = dashboardStats.budget_total || projetsStats.cout_total || 0;
//   const tauxAvancement = dashboardStats.taux_avancement || (projetsStats.projets_total > 0 
//     ? Math.round((projetsStats.projets_valides / projetsStats.projets_total) * 100)
//     : 0);
//   const budgetUtilise = dashboardStats.budget_valides || (projetsStats.projets_valides / (projetsStats.projets_total || 1)) * budgetTotalMilliers;
//   const budgetRestant = dashboardStats.budget_restant || (budgetTotalMilliers - budgetUtilise);
//   const projetsEnCours = dashboardStats.projets_en_cours || (projetsStats.projets_soumis - projetsStats.projets_valides);
//   const pourcentageBudgetUtilise = dashboardStats.taux_budget_utilise || (budgetTotalMilliers > 0 
//     ? Math.round((budgetUtilise / budgetTotalMilliers) * 100)
//     : 0);

//   // Nombre total d'utilisateurs (alias pratique)
//   const totalUsers = users.total;

//   return {
//     // Données brutes
//     counters,
//     projetsStats,
//     projetsByYear,
//     topRegions,
//     dashboardStats,  // ← AJOUTER
//     users,
//     loading,
//     loadingCounters,
//     loadingProjets,
//     loadingProjetsByYear,
//     loadingTopRegions,
//     loadingDashboardStats,  // ← AJOUTER
//     loadingUsers,
//     error,
//     lastUpdate,
    
//     // Actions
//     refreshData,
//     fetchCountersOnly,
//     fetchProjetsOnly,
//     fetchProjetsByYearOnly,
//     fetchTopRegionsOnly,
//     fetchDashboardStatsOnly,  // ← AJOUTER
//     fetchUsersOnly,
    
//     // Données calculées
//     totalFamilles,
//     budgetTotalMilliers,
//     tauxAvancement,
//     budgetUtilise,
//     budgetRestant,
//     projetsEnCours,
//     pourcentageBudgetUtilise,
//     totalUsers,
    
//     // Vérifications utiles
//     hasData: (dashboardStats.projets_total > 0) || (projetsStats.projets_total > 0),
//     hasCounters: counters.regions > 0 || counters.directions > 0,
//     hasProjetsByYear: projetsByYear.length > 0,
//     hasTopRegions: topRegions.length > 0,
//     hasUsers: users.total > 0,
//   };
// };

// export default useDashboardStats;
import { useState, useEffect, useCallback } from "react";
import { 
  fetchDashboardCounters, 
  fetchDashboardProjetsPmt, 
  fetchDashboardProjetsByYear,
  fetchDashboardTopRegion,
  fetchDashboardStats,
  fetchUsers 
} from "../recapApi";

const useDashboardStats = (autoFetch = true) => {
  const [counters, setCounters] = useState({
    regions: 0,
    directions: 0,
    familles: 0,
    departements: 0,
    perimetres: 0,
    familles_directions: 0,
  });
  
  const [projetsStats, setProjetsStats] = useState({
    annee_pmt: null,
    projets_total: 0,
    cout_total: 0,
    projets_valides: 0,
    projets_soumis: 0,
  });
  
  const [projetsByYear, setProjetsByYear] = useState([]);
  const [topRegions, setTopRegions] = useState([]);
  
  const [dashboardStats, setDashboardStats] = useState({
    pmt_year: null,
    projets_total: 0,
    projets_valides: 0,
    projets_soumis: 0,
    projets_en_cours: 0,
    budget_total: 0,
    budget_valides: 0,
    budget_en_cours: 0,
    budget_restant: 0,
    taux_avancement: 0,
    taux_budget_utilise: 0,
    soumis: {
      total: 0,
      structure: 0,
      departement: 0
    },
    rejetes: {
      total: 0,
      directeur_region: 0,
      directeur_direction: 0,
      divisionnaire: 0
    },
    en_cours: 0
  });
  
  const [users, setUsers] = useState({
    total: 0,
    list: [],
    byRole: {
      chef: 0,
      agent: 0,
      directeur: 0,
      directeur_region: 0,
      directeur_direction: 0,
      responsable_structure: 0,
      responsable_departement: 0,
      divisionnaire: 0,
    }
  });
  
  const [loading, setLoading] = useState(true);
  const [loadingCounters, setLoadingCounters] = useState(false);
  const [loadingProjets, setLoadingProjets] = useState(false);
  const [loadingProjetsByYear, setLoadingProjetsByYear] = useState(false);
  const [loadingTopRegions, setLoadingTopRegions] = useState(false);
  const [loadingDashboardStats, setLoadingDashboardStats] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  const fetchCountersOnly = useCallback(async () => {
    setLoadingCounters(true);
    try {
      const response = await fetchDashboardCounters();
      if (response.data?.success) {
        setCounters({
          regions: response.data.data?.regions || 0,
          directions: response.data.data?.directions || 0,
          familles: response.data.data?.familles || 0,
          departements: response.data.data?.departements || 0,
          perimetres: response.data.data?.perimetres || 0,
          familles_directions: response.data.data?.familles_directions || 0,
        });
      }
    } catch (err) {
      console.error("Erreur chargement compteurs:", err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoadingCounters(false);
    }
  }, []);

  const fetchProjetsOnly = useCallback(async () => {
    setLoadingProjets(true);
    try {
      const response = await fetchDashboardProjetsPmt();
      if (response.data?.success) {
        setProjetsStats({
          annee_pmt: response.data.data?.annee_pmt || null,
          projets_total: response.data.data?.projets_total || 0,
          cout_total: response.data.data?.cout_total || 0,
          projets_valides: response.data.data?.projets_valides || 0,
          projets_soumis: response.data.data?.projets_soumis || 0,
        });
      }
    } catch (err) {
      console.error("Erreur chargement projets PMT:", err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoadingProjets(false);
    }
  }, []);

  const fetchProjetsByYearOnly = useCallback(async () => {
    setLoadingProjetsByYear(true);
    try {
      const response = await fetchDashboardProjetsByYear();
      if (response.data?.success) {
        setProjetsByYear(response.data.data || []);
      }
    } catch (err) {
      console.error("Erreur chargement projets par année:", err);
    } finally {
      setLoadingProjetsByYear(false);
    }
  }, []);

  const fetchTopRegionsOnly = useCallback(async () => {
    setLoadingTopRegions(true);
    try {
      const response = await fetchDashboardTopRegion();
      if (response.data?.success) {
        setTopRegions(response.data.data || []);
      }
    } catch (err) {
      console.error("Erreur chargement top régions:", err);
    } finally {
      setLoadingTopRegions(false);
    }
  }, []);

  const fetchDashboardStatsOnly = useCallback(async () => {
    setLoadingDashboardStats(true);
    try {
      const response = await fetchDashboardStats();
      if (response.data?.success) {
        const totalGeneral = response.data.data?.total_general || {};
        
        setDashboardStats({
          pmt_year: response.data.data?.filtres?.pmt_year || null,
          projets_total: totalGeneral.projets || 0,
          projets_valides: totalGeneral.valides || 0,
          projets_soumis: totalGeneral.soumis?.total || 0,
          budget_total: totalGeneral.budget_total || 0,
          budget_valides: 0,
          budget_en_cours: 0,
          budget_restant: totalGeneral.budget_total || 0,
          taux_avancement: totalGeneral.taux_validation || 0,
          taux_budget_utilise: 0,
          soumis: {
            total: totalGeneral.soumis?.total || 0,
            structure: totalGeneral.soumis?.structure || 0,
            departement: totalGeneral.soumis?.departement || 0
          },
          rejetes: {
            total: totalGeneral.rejetes?.total || 0,
            directeur_region: totalGeneral.rejetes?.directeur_region || 0,
            directeur_direction: totalGeneral.rejetes?.directeur_direction || 0,
            divisionnaire: totalGeneral.rejetes?.divisionnaire || 0
          },
          en_cours: totalGeneral.en_cours || 0
        });
      }
    } catch (err) {
      console.error("Erreur chargement dashboard stats:", err);
    } finally {
      setLoadingDashboardStats(false);
    }
  }, []);

  const fetchUsersOnly = useCallback(async () => {
    setLoadingUsers(true);
    try {
      const response = await fetchUsers();
      if (response.data?.status === 'success') {
        const usersList = response.data.users || [];
        const totalUsers = response.data.total_users || 0;
        
        const byRole = {
          chef: 0,
          agent: 0,
          directeur: 0,
          directeur_region: 0,
          directeur_direction: 0,
          responsable_structure: 0,
          responsable_departement: 0,
          divisionnaire: 0,
        };
        
        usersList.forEach(user => {
          const role = user.role;
          if (byRole.hasOwnProperty(role)) {
            byRole[role]++;
          }
        });
        
        setUsers({
          total: totalUsers,
          list: usersList,
          byRole: byRole,
        });
      }
    } catch (err) {
      console.error("Erreur chargement utilisateurs:", err);
    } finally {
      setLoadingUsers(false);
    }
  }, []);

  const refreshData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      await Promise.all([
        fetchCountersOnly(),
        fetchProjetsOnly(),
        fetchProjetsByYearOnly(),
        fetchTopRegionsOnly(),
        fetchDashboardStatsOnly(),
        fetchUsersOnly()
      ]);
      setLastUpdate(new Date());
    } catch (err) {
      console.error("Erreur rafraîchissement:", err);
    } finally {
      setLoading(false);
    }
  }, [fetchCountersOnly, fetchProjetsOnly, fetchProjetsByYearOnly, fetchTopRegionsOnly, fetchDashboardStatsOnly, fetchUsersOnly]);

  useEffect(() => {
    if (autoFetch) {
      refreshData();
    }
  }, [autoFetch, refreshData]);

  const totalFamilles = (counters.familles || 0) + (counters.familles_directions || 0);
  const totalUsers = users.total;

  return {
    counters,
    projetsStats,
    projetsByYear,
    topRegions,
    dashboardStats,
    users,
    loading,
    loadingCounters,
    loadingProjets,
    loadingProjetsByYear,
    loadingTopRegions,
    loadingDashboardStats,
    loadingUsers,
    error,
    lastUpdate,
    refreshData,
    fetchCountersOnly,
    fetchProjetsOnly,
    fetchProjetsByYearOnly,
    fetchTopRegionsOnly,
    fetchDashboardStatsOnly,
    fetchUsersOnly,
    totalFamilles,
    totalUsers,
  };
};

export default useDashboardStats;