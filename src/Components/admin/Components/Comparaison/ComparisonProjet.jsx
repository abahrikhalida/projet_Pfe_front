
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import useProjetVersion from "../../../../hooks/useProjetVersion";

// const currentYear = new Date().getFullYear();

// const fmt = (val) =>
//   val != null ? Number(val).toLocaleString("fr-DZ") : "—";

// // Composant de comparaison pour une ligne
// const ComparisonRow = ({ label, valueN1, valueN, sub = "", highlight = false }) => {
//   const isDifferent = valueN1 !== valueN && valueN1 !== undefined && valueN !== undefined;
//   const getVariationPercent = () => {
//     if (valueN1 === undefined || valueN === undefined || Number(valueN1) === 0) return null;
//     const diff = ((Number(valueN) - Number(valueN1)) / Number(valueN1)) * 100;
//     return diff.toFixed(1);
//   };
  
//   const variation = getVariationPercent();
//   const isIncrease = variation && Number(variation) > 0;
//   const isDecrease = variation && Number(variation) < 0;

//   return (
//     <tr className={`border-b border-gray-100 ${isDifferent ? 'bg-yellow-50/30' : ''} hover:bg-gray-50 transition-colors`}>
//       <td className="py-3 px-4">
//         <span className="text-sm font-medium text-gray-700">{label}</span>
//         {sub && <span className="text-xs text-gray-400 ml-1">({sub})</span>}
//       </td>
//       <td className="py-3 px-4 text-right">
//         <span className="text-sm text-gray-500">
//           {fmt(valueN1)}
//         </span>
//       </td>
//       <td className="py-3 px-4 text-right">
//         <div className="flex items-center justify-end gap-2">
//           <span className={`text-sm font-semibold ${isDifferent ? 'text-[#FF8500]' : 'text-gray-800'}`}>
//             {fmt(valueN)}
//           </span>
//           {variation && variation !== "0.0" && (
//             <span className={`text-xs font-medium ${isIncrease ? 'text-green-600' : 'text-red-600'}`}>
//               {isIncrease ? '▲' : '▼'} {Math.abs(variation)}%
//             </span>
//           )}
//           {isDifferent && !variation && (
//             <span className="text-xs text-orange-500">✓ modifié</span>
//           )}
//         </div>
//       </td>
//      </tr>
//   );
// };

// // Composant principal
// const ProjetVersionComparison = () => {
//   const navigate = useNavigate();
//   const [codeInput, setCodeInput] = useState("");
//   const { 
//     loading, 
//     error, 
//     hasSearched,
//     searchProject,
//     resetSearch,
//     currentProject,
//     previousProject,
//     hasPrevious,
//     message
//   } = useProjetVersion();

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (codeInput.trim()) {
//       searchProject(codeInput);
//     }
//   };

//   const handleGoBack = () => {
//     navigate("/budget/classification");
//   };

//   const handleNewSearch = () => {
//     resetSearch();
//     setCodeInput("");
//   };

//   const anneeReference = currentProject?.annee_debut_pmt 
//     ? parseInt(currentProject.annee_debut_pmt) - 2 
//     : currentYear - 2;

//   // Sections de comparaison
//   const sections = [
//     {
//       title: "📋 INFORMATIONS GÉNÉRALES",
//       rows: [
//         { label: "CPTE ANALY", valueN1: previousProject?.code_division, valueN: currentProject?.code_division },
//         { label: "Libellé", valueN1: previousProject?.libelle, valueN: currentProject?.libelle },
//         { label: "Famille", valueN1: previousProject?.famille_nom, valueN: currentProject?.famille_nom },
//         { label: "Région", valueN1: previousProject?.region_nom, valueN: currentProject?.region_nom },
//         { label: "Activité", valueN1: previousProject?.activite_nom, valueN: currentProject?.activite_nom },
//         { label: "Périmètre", valueN1: previousProject?.perimetre_nom, valueN: currentProject?.perimetre_nom },
//         { label: "Type de projet", valueN1: previousProject?.type_projet, valueN: currentProject?.type_projet },
//         { label: "Description technique", valueN1: previousProject?.description_technique, valueN: currentProject?.description_technique },
//       ]
//     },
//     {
//       title: "💰 COÛT GLOBAL & PROGRAMMATION",
//       rows: [
//         { label: "Coût Global Initial", sub: "Programmation", valueN1: previousProject?.cout_initial_total, valueN: currentProject?.cout_initial_total },
//         { label: "Dont DEV", sub: "Programmation", valueN1: previousProject?.cout_initial_dont_dex, valueN: currentProject?.cout_initial_dont_dex },
//       ]
//     },
//     {
//       title: `📊 RÉALISATIONS (N-1 / ${anneeReference})`,
//       rows: [
//         { label: "Réalisation cumulée", sub: `N-1 (${anneeReference})`, valueN1: previousProject?.realisation_cumul_n_mins1_total, valueN: currentProject?.realisation_cumul_n_mins1_total },
//         { label: "Dont DEV", sub: `N-1 (${anneeReference})`, valueN1: previousProject?.realisation_cumul_n_mins1_dont_dex, valueN: currentProject?.realisation_cumul_n_mins1_dont_dex },
//       ]
//     },
//     {
//       title: `📈 PRÉVISIONS ANNÉE N (${currentYear})`,
//       rows: [
//         { label: "Réalisation S1", sub: "Année N", valueN1: previousProject?.real_s1_n_total, valueN: currentProject?.real_s1_n_total },
//         { label: "Dont DEV", sub: "Année N", valueN1: previousProject?.real_s1_n_dont_dex, valueN: currentProject?.real_s1_n_dont_dex },
//         { label: "Prévision S2", sub: "Année N", valueN1: previousProject?.prev_s2_n_total, valueN: currentProject?.prev_s2_n_total },
//         { label: "Dont DEV", sub: "Année N", valueN1: previousProject?.prev_s2_n_dont_dex, valueN: currentProject?.prev_s2_n_dont_dex },
//         { label: "Prévision Clôture", sub: "Année N", valueN1: previousProject?.prev_cloture_n_total, valueN: currentProject?.prev_cloture_n_total },
//         { label: "Dont DEV", sub: "Année N", valueN1: previousProject?.prev_cloture_n_dont_dex, valueN: currentProject?.prev_cloture_n_dont_dex },
//         { label: "Reste à Réaliser", sub: "", valueN1: previousProject?.reste_a_realiser_total, valueN: currentProject?.reste_a_realiser_total },
//         { label: "Dont DEV", sub: "", valueN1: previousProject?.reste_a_realiser_dont_dex, valueN: currentProject?.reste_a_realiser_dont_dex },
//       ]
//     },
//     {
//       title: "🔮 PRÉVISIONS FUTURES",
//       rows: [
//         { label: "Prévision N+1", sub: "Budget", valueN1: previousProject?.prev_n_plus1_total, valueN: currentProject?.prev_n_plus1_total },
//         { label: "Dont DEV", sub: "N+1", valueN1: previousProject?.prev_n_plus1_dont_dex, valueN: currentProject?.prev_n_plus1_dont_dex },
//         { label: "Prévision N+2", sub: "Budget", valueN1: previousProject?.prev_n_plus2_total, valueN: currentProject?.prev_n_plus2_total },
//         { label: "Dont DEV", sub: "N+2", valueN1: previousProject?.prev_n_plus2_dont_dex, valueN: currentProject?.prev_n_plus2_dont_dex },
//         { label: "Prévision N+3", sub: "Budget", valueN1: previousProject?.prev_n_plus3_total, valueN: currentProject?.prev_n_plus3_total },
//         { label: "Dont DEV", sub: "N+3", valueN1: previousProject?.prev_n_plus3_dont_dex, valueN: currentProject?.prev_n_plus3_dont_dex },
//         { label: "Prévision N+4", sub: "Budget", valueN1: previousProject?.prev_n_plus4_total, valueN: currentProject?.prev_n_plus4_total },
//         { label: "Dont DEV", sub: "N+4", valueN1: previousProject?.prev_n_plus4_dont_dex, valueN: currentProject?.prev_n_plus4_dont_dex },
//         { label: "Prévision N+5", sub: "Budget", valueN1: previousProject?.prev_n_plus5_total, valueN: currentProject?.prev_n_plus5_total },
//         { label: "Dont DEV", sub: "N+5", valueN1: previousProject?.prev_n_plus5_dont_dex, valueN: currentProject?.prev_n_plus5_dont_dex },
//       ]
//     },
//     {
//       title: `📅 DÉTAIL MENSUEL (${currentYear})`,
//       rows: [
//         { label: "Janvier", valueN1: previousProject?.janvier_total, valueN: currentProject?.janvier_total },
//         { label: "Dont DEV", sub: "Janvier", valueN1: previousProject?.janvier_dont_dex, valueN: currentProject?.janvier_dont_dex },
//         { label: "Février", valueN1: previousProject?.fevrier_total, valueN: currentProject?.fevrier_total },
//         { label: "Dont DEV", sub: "Février", valueN1: previousProject?.fevrier_dont_dex, valueN: currentProject?.fevrier_dont_dex },
//         { label: "Mars", valueN1: previousProject?.mars_total, valueN: currentProject?.mars_total },
//         { label: "Dont DEV", sub: "Mars", valueN1: previousProject?.mars_dont_dex, valueN: currentProject?.mars_dont_dex },
//         { label: "Avril", valueN1: previousProject?.avril_total, valueN: currentProject?.avril_total },
//         { label: "Dont DEV", sub: "Avril", valueN1: previousProject?.avril_dont_dex, valueN: currentProject?.avril_dont_dex },
//         { label: "Mai", valueN1: previousProject?.mai_total, valueN: currentProject?.mai_total },
//         { label: "Dont DEV", sub: "Mai", valueN1: previousProject?.mai_dont_dex, valueN: currentProject?.mai_dont_dex },
//         { label: "Juin", valueN1: previousProject?.juin_total, valueN: currentProject?.juin_total },
//         { label: "Dont DEV", sub: "Juin", valueN1: previousProject?.juin_dont_dex, valueN: currentProject?.juin_dont_dex },
//         { label: "Juillet", valueN1: previousProject?.juillet_total, valueN: currentProject?.juillet_total },
//         { label: "Dont DEV", sub: "Juillet", valueN1: previousProject?.juillet_dont_dex, valueN: currentProject?.juillet_dont_dex },
//         { label: "Août", valueN1: previousProject?.aout_total, valueN: currentProject?.aout_total },
//         { label: "Dont DEV", sub: "Août", valueN1: previousProject?.aout_dont_dex, valueN: currentProject?.aout_dont_dex },
//         { label: "Septembre", valueN1: previousProject?.septembre_total, valueN: currentProject?.septembre_total },
//         { label: "Dont DEV", sub: "Septembre", valueN1: previousProject?.septembre_dont_dex, valueN: currentProject?.septembre_dont_dex },
//         { label: "Octobre", valueN1: previousProject?.octobre_total, valueN: currentProject?.octobre_total },
//         { label: "Dont DEV", sub: "Octobre", valueN1: previousProject?.octobre_dont_dex, valueN: currentProject?.octobre_dont_dex },
//         { label: "Novembre", valueN1: previousProject?.novembre_total, valueN: currentProject?.novembre_total },
//         { label: "Dont DEV", sub: "Novembre", valueN1: previousProject?.novembre_dont_dex, valueN: currentProject?.novembre_dont_dex },
//         { label: "Décembre", valueN1: previousProject?.decembre_total, valueN: currentProject?.decembre_total },
//         { label: "Dont DEV", sub: "Décembre", valueN1: previousProject?.decembre_dont_dex, valueN: currentProject?.decembre_dont_dex },
//       ]
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-[#FF8500] to-orange-600 text-white sticky top-0 z-10 shadow-lg">
//         <div className="px-6 py-4">
//           <button
//             onClick={handleGoBack}
//             className="flex items-center gap-2 text-white/80 hover:text-white mb-2 transition-colors text-sm"
//           >
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//             </svg>
//             Retour
//           </button>
//           <h1 className="text-xl font-bold">Comparaison des Versions</h1>
//           <p className="text-orange-100 text-sm">Visualisez les différences attribut par attribut</p>
//         </div>
//       </div>

//       <div className="p-6">
//         {/* Barre de recherche */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
//           <form onSubmit={handleSearch}>
//             <div className="flex flex-col md:flex-row gap-3">
//               <div className="flex-1">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   CPTE ANALY (Code Division)
//                 </label>
//                 <input
//                   type="text"
//                   value={codeInput}
//                   onChange={(e) => setCodeInput(e.target.value)}
//                   placeholder="Ex: PROJ018"
//                   className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FF8500] focus:border-[#FF8500] outline-none transition-all"
//                   disabled={loading}
//                 />
//               </div>
//               <div className="flex items-end">
//                 <button
//                   type="submit"
//                   disabled={loading || !codeInput.trim()}
//                   className="px-6 py-2.5 bg-[#FF8500] text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
//                 >
//                   {loading ? (
//                     <>
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                       Recherche...
//                     </>
//                   ) : (
//                     <>
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                       </svg>
//                       Rechercher
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>

//         {/* Loading */}
//         {loading && (
//           <div className="flex flex-col items-center justify-center py-12">
//             <div className="w-10 h-10 border-4 border-[#FF8500] border-t-transparent rounded-full animate-spin"></div>
//             <p className="mt-3 text-gray-500">Chargement...</p>
//           </div>
//         )}

//         {/* Error */}
//         {error && !loading && hasSearched && (
//           <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
//             <p className="text-red-600">{error}</p>
//             <button onClick={handleNewSearch} className="mt-3 text-sm text-gray-500 hover:text-gray-700">
//               Nouvelle recherche
//             </button>
//           </div>
//         )}

//         {/* Projet trouvé - Comparaison côte à côte */}
//         {currentProject && !loading && (
//           <div>
//             {/* En-tête */}
//             <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 overflow-hidden">
//               <div className="px-5 py-4 border-b border-gray-100">
//                 <div className="flex justify-between items-center flex-wrap gap-3">
//                   <div>
//                     <div className="flex items-center gap-2 mb-1">
//                       <div className="w-2 h-2 bg-[#FF8500] rounded-full"></div>
//                       <span className="text-xs text-gray-400 uppercase">CPTE ANALY</span>
//                     </div>
//                     <h2 className="text-2xl font-bold text-gray-800">{codeInput}</h2>
//                     <p className="text-gray-500 text-sm mt-1">{currentProject?.libelle}</p>
//                   </div>
//                   <div className="flex gap-3">
//                     <div className="text-center px-4 py-2 bg-gray-50 rounded-lg">
//                       <p className="text-xs text-gray-400">Version N-1</p>
//                       <p className="text-lg font-bold text-gray-600">v{previousProject?.version || '-'}</p>
//                     </div>
//                     <div className="text-center px-4 py-2 bg-orange-50 rounded-lg">
//                       <p className="text-xs text-orange-400">Version Actuelle</p>
//                       <p className="text-lg font-bold text-[#FF8500]">v{currentProject?.version}</p>
//                     </div>
//                     <button
//                       onClick={handleNewSearch}
//                       className="px-3 py-1.5 text-sm text-gray-400 hover:text-gray-600"
//                     >
//                       ✕
//                     </button>
//                   </div>
//                 </div>
//               </div>
//               {!hasPrevious && message && (
//                 <div className="bg-blue-50 px-5 py-2 text-sm text-blue-600">
//                   {message}
//                 </div>
//               )}
//             </div>

//             {/* Version initiale */}
//             {!hasPrevious && (
//               <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
//                 <p className="text-gray-500">Ce projet n'a qu'une seule version (version initiale)</p>
//                 <button
//                   onClick={() => {/* TODO: voir détails */}}
//                   className="mt-3 text-[#FF8500] text-sm"
//                 >
//                   Voir les détails
//                 </button>
//               </div>
//             )}

//             {/* Tableau de comparaison côte à côte */}
//             {hasPrevious && (
//               <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//                 {/* En-tête du tableau */}
//                 <div className="bg-gray-50 border-b border-gray-200 px-4 py-3">
//                   <div className="grid grid-cols-3 gap-4">
//                     <div className="text-left">
//                       <span className="text-xs font-semibold text-gray-500 uppercase">Attribut</span>
//                     </div>
//                     <div className="text-right">
//                       <span className="text-xs font-semibold text-gray-500 uppercase">Version N-1 (v{previousProject?.version})</span>
//                     </div>
//                     <div className="text-right">
//                       <span className="text-xs font-semibold text-gray-500 uppercase">Version N (v{currentProject?.version})</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Corps du tableau - Sections */}
//                 <div className="divide-y divide-gray-100">
//                   {sections.map((section, idx) => (
//                     <div key={idx}>
//                       <div className="bg-gray-50/50 px-4 py-2">
//                         <h3 className="text-sm font-semibold text-gray-600">{section.title}</h3>
//                       </div>
//                       <table className="w-full">
//                         <tbody>
//                           {section.rows.map((row, rowIdx) => (
//                             <ComparisonRow
//                               key={rowIdx}
//                               label={row.label}
//                               sub={row.sub}
//                               valueN1={row.valueN1}
//                               valueN={row.valueN}
//                             />
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* État initial */}
//         {!hasSearched && !loading && !error && (
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 text-center">
//             <svg className="w-16 h-16 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//             </svg>
//             <p className="text-gray-400">Entrez un CPTE ANALY pour comparer les versions</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProjetVersionComparison;
// ProjetVersionComparison.jsx - Version affichant uniquement les différences






// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import useProjetVersion from "../../../../hooks/useProjetVersion";

// const currentYear = new Date().getFullYear();

// const fmt = (val) =>
//   val != null ? Number(val).toLocaleString("fr-DZ") : "—";

// // Composant de comparaison pour une ligne
// const ComparisonRow = ({ label, valueN1, valueN, sub = "" }) => {
//   const isDifferent = valueN1 !== valueN && valueN1 !== undefined && valueN !== undefined;
  
//   if (!isDifferent) return null;
  
//   const getVariationPercent = () => {
//     if (valueN1 === undefined || valueN === undefined || Number(valueN1) === 0) return null;
//     const diff = ((Number(valueN) - Number(valueN1)) / Number(valueN1)) * 100;
//     return diff.toFixed(1);
//   };
  
//   const variation = getVariationPercent();
//   const isIncrease = variation && Number(variation) > 0;
//   const isDecrease = variation && Number(variation) < 0;

//   return (
//     <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
//       <td className="py-3 px-4">
//         <span className="text-sm font-medium text-gray-700">{label}</span>
//         {sub && <span className="text-xs text-gray-400 ml-1">({sub})</span>}
//       </td>
//       <td className="py-3 px-4 text-right">
//         <span className="text-sm text-gray-500 line-through">
//           {fmt(valueN1)}
//         </span>
//       </td>
//       <td className="py-3 px-4 text-right">
//         <div className="flex items-center justify-end gap-2">
//           <span className="text-sm font-semibold text-[#FF8500]">
//             {fmt(valueN)}
//           </span>
//           {variation && variation !== "0.0" && (
//             <span className={`text-xs font-medium ${isIncrease ? 'text-green-600' : 'text-red-600'}`}>
//               {isIncrease ? '▲' : '▼'} {Math.abs(variation)}%
//             </span>
//           )}
//         </div>
//       </td>
//     </tr>
//   );
// };

// // Composant principal
// const ProjetVersionComparison = () => {
//   const navigate = useNavigate();
//   const [codeInput, setCodeInput] = useState("");
//   const { 
//     loading, 
//     error, 
//     hasSearched,
//     searchProject,
//     resetSearch,
//     currentProject,
//     previousProject,
//     hasPrevious,
//     message
//   } = useProjetVersion();

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (codeInput.trim()) {
//       searchProject(codeInput);
//     }
//   };

//   const handleGoBack = () => {
//     navigate("/budget/classification");
//   };

//   const handleNewSearch = () => {
//     resetSearch();
//     setCodeInput("");
//   };

//   const anneeReference = currentProject?.annee_debut_pmt 
//     ? parseInt(currentProject.annee_debut_pmt) - 2 
//     : currentYear - 2;

//   // Récupérer uniquement les attributs modifiés
//   const getChangedFields = () => {
//     if (!previousProject || !currentProject) return [];
    
//     const changedFields = [];
    
//     // Comparaison générique de deux valeurs
//     const compare = (label, valueN1, valueN, section, sub = "") => {
//       if (valueN1 !== valueN && valueN1 !== undefined && valueN !== undefined) {
//         changedFields.push({
//           section,
//           label,
//           sub,
//           valueN1,
//           valueN
//         });
//       }
//     };

//     // 1. Informations générales
//     compare("Libellé", previousProject.libelle, currentProject.libelle, "📋 INFORMATIONS GÉNÉRALES");
//     compare("Famille", previousProject.famille_nom, currentProject.famille_nom, "📋 INFORMATIONS GÉNÉRALES");
//     compare("Type de projet", previousProject.type_projet, currentProject.type_projet, "📋 INFORMATIONS GÉNÉRALES");
//     compare("Description technique", previousProject.description_technique, currentProject.description_technique, "📋 INFORMATIONS GÉNÉRALES");

//     // 2. Coûts
//     compare("Coût Global Initial", previousProject.cout_initial_total, currentProject.cout_initial_total, "💰 COÛTS", "Programmation");
//     compare("Dont DEV", previousProject.cout_initial_dont_dex, currentProject.cout_initial_dont_dex, "💰 COÛTS", "Programmation");

//     // 3. Réalisations N-1
//     compare("Réalisation cumulée", previousProject.realisation_cumul_n_mins1_total, currentProject.realisation_cumul_n_mins1_total, `📊 RÉALISATIONS (N-1 / ${anneeReference})`);
//     compare("Dont DEV", previousProject.realisation_cumul_n_mins1_dont_dex, currentProject.realisation_cumul_n_mins1_dont_dex, `📊 RÉALISATIONS (N-1 / ${anneeReference})`);

//     // 4. Année N
//     compare("Réalisation S1", previousProject.real_s1_n_total, currentProject.real_s1_n_total, `📈 ANNÉE N (${currentYear})`);
//     compare("Dont DEV", previousProject.real_s1_n_dont_dex, currentProject.real_s1_n_dont_dex, `📈 ANNÉE N (${currentYear})`);
//     compare("Prévision S2", previousProject.prev_s2_n_total, currentProject.prev_s2_n_total, `📈 ANNÉE N (${currentYear})`);
//     compare("Dont DEV", previousProject.prev_s2_n_dont_dex, currentProject.prev_s2_n_dont_dex, `📈 ANNÉE N (${currentYear})`);
//     compare("Prévision Clôture", previousProject.prev_cloture_n_total, currentProject.prev_cloture_n_total, `📈 ANNÉE N (${currentYear})`);
//     compare("Dont DEV", previousProject.prev_cloture_n_dont_dex, currentProject.prev_cloture_n_dont_dex, `📈 ANNÉE N (${currentYear})`);
//     compare("Reste à Réaliser", previousProject.reste_a_realiser_total, currentProject.reste_a_realiser_total, `📈 ANNÉE N (${currentYear})`);
//     compare("Dont DEV", previousProject.reste_a_realiser_dont_dex, currentProject.reste_a_realiser_dont_dex, `📈 ANNÉE N (${currentYear})`);

//     // 5. Prévisions futures
//     for (let i = 1; i <= 5; i++) {
//       compare(`Prévision N+${i}`, previousProject[`prev_n_plus${i}_total`], currentProject[`prev_n_plus${i}_total`], "🔮 PRÉVISIONS FUTURES", "Budget");
//       compare(`Dont DEV (N+${i})`, previousProject[`prev_n_plus${i}_dont_dex`], currentProject[`prev_n_plus${i}_dont_dex`], "🔮 PRÉVISIONS FUTURES", `N+${i}`);
//     }

//     // 6. Mensuel
//     const months = [
//       "janvier", "fevrier", "mars", "avril", "mai", "juin",
//       "juillet", "aout", "septembre", "octobre", "novembre", "decembre"
//     ];
    
//     months.forEach(month => {
//       const monthName = month.charAt(0).toUpperCase() + month.slice(1);
//       compare(monthName, previousProject[`${month}_total`], currentProject[`${month}_total`], `📅 DÉTAIL MENSUEL (${currentYear})`);
//       compare("Dont DEV", previousProject[`${month}_dont_dex`], currentProject[`${month}_dont_dex`], `📅 DÉTAIL MENSUEL (${currentYear})`, monthName);
//     });

//     return changedFields;
//   };

//   const changedFields = getChangedFields();
  
//   // Grouper par section
//   const groupedBySection = changedFields.reduce((acc, field) => {
//     if (!acc[field.section]) {
//       acc[field.section] = [];
//     }
//     acc[field.section].push(field);
//     return acc;
//   }, {});

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-[#FF8500] to-orange-600 text-white sticky top-0 z-10 shadow-lg">
//         <div className="px-6 py-4">
//           <button
//             onClick={handleGoBack}
//             className="flex items-center gap-2 text-white/80 hover:text-white mb-2 transition-colors text-sm"
//           >
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//             </svg>
//             Retour
//           </button>
//           <h1 className="text-xl font-bold">Comparaison des Versions</h1>
//           <p className="text-orange-100 text-sm">Visualisez uniquement les attributs modifiés</p>
//         </div>
//       </div>

//       <div className="p-6">
//         {/* Barre de recherche */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
//           <form onSubmit={handleSearch}>
//             <div className="flex flex-col md:flex-row gap-3">
//               <div className="flex-1">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   CPTE ANALY (Code Division)
//                 </label>
//                 <input
//                   type="text"
//                   value={codeInput}
//                   onChange={(e) => setCodeInput(e.target.value)}
//                   placeholder="Ex: PROJ018"
//                   className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FF8500] focus:border-[#FF8500] outline-none transition-all"
//                   disabled={loading}
//                 />
//               </div>
//               <div className="flex items-end">
//                 <button
//                   type="submit"
//                   disabled={loading || !codeInput.trim()}
//                   className="px-6 py-2.5 bg-[#FF8500] text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
//                 >
//                   {loading ? (
//                     <>
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                       Recherche...
//                     </>
//                   ) : (
//                     <>
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                       </svg>
//                       Rechercher
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>

//         {/* Loading */}
//         {loading && (
//           <div className="flex flex-col items-center justify-center py-12">
//             <div className="w-10 h-10 border-4 border-[#FF8500] border-t-transparent rounded-full animate-spin"></div>
//             <p className="mt-3 text-gray-500">Chargement...</p>
//           </div>
//         )}

//         {/* Error */}
//         {error && !loading && hasSearched && (
//           <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
//             <p className="text-red-600">{error}</p>
//             <button onClick={handleNewSearch} className="mt-3 text-sm text-gray-500 hover:text-gray-700">
//               Nouvelle recherche
//             </button>
//           </div>
//         )}

//         {/* Projet trouvé */}
//         {currentProject && !loading && (
//           <div>
//             {/* En-tête */}
//             <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 overflow-hidden">
//               <div className="px-5 py-4 border-b border-gray-100">
//                 <div className="flex justify-between items-center flex-wrap gap-3">
//                   <div>
//                     <div className="flex items-center gap-2 mb-1">
//                       <div className="w-2 h-2 bg-[#FF8500] rounded-full"></div>
//                       <span className="text-xs text-gray-400 uppercase">CPTE ANALY</span>
//                     </div>
//                     <h2 className="text-2xl font-bold text-gray-800">{codeInput}</h2>
//                     <p className="text-gray-500 text-sm mt-1">{currentProject?.libelle}</p>
//                   </div>
//                   <div className="flex gap-3">
//                     <div className="text-center px-4 py-2 bg-gray-50 rounded-lg">
//                       <p className="text-xs text-gray-400">Version N-1</p>
//                       <p className="text-lg font-bold text-gray-600">v{previousProject?.version || '-'}</p>
//                     </div>
//                     <div className="text-center px-4 py-2 bg-orange-50 rounded-lg">
//                       <p className="text-xs text-orange-400">Version Actuelle</p>
//                       <p className="text-lg font-bold text-[#FF8500]">v{currentProject?.version}</p>
//                     </div>
//                     <button
//                       onClick={handleNewSearch}
//                       className="px-3 py-1.5 text-sm text-gray-400 hover:text-gray-600"
//                     >
//                       ✕
//                     </button>
//                   </div>
//                 </div>
//               </div>
//               {!hasPrevious && message && (
//                 <div className="bg-blue-50 px-5 py-2 text-sm text-blue-600">
//                   {message}
//                 </div>
//               )}
//             </div>

//             {/* Version initiale */}
//             {!hasPrevious && (
//               <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
//                 <p className="text-gray-500">Ce projet n'a qu'une seule version (version initiale)</p>
//                 <p className="text-xs text-gray-400 mt-1">Aucune comparaison possible</p>
//               </div>
//             )}

//             {/* Tableau des différences */}
//             {hasPrevious && (
//               <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//                 {changedFields.length === 0 ? (
//                   <div className="p-6 text-center">
//                     <svg className="w-12 h-12 mx-auto text-green-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <p className="text-green-600 font-medium">Aucune différence détectée</p>
//                     <p className="text-sm text-gray-400 mt-1">Les deux versions sont identiques</p>
//                   </div>
//                 ) : (
//                   <>
//                     <div className="bg-orange-50 px-4 py-2 border-b border-orange-100">
//                       <div className="flex items-center gap-2">
//                         <span className="w-2 h-2 bg-[#FF8500] rounded-full"></span>
//                         <span className="text-sm font-medium text-gray-700">
//                           {changedFields.length} modification{changedFields.length > 1 ? 's' : ''} détectée{changedFields.length > 1 ? 's' : ''}
//                         </span>
//                       </div>
//                     </div>
                    
//                     <div className="divide-y divide-gray-100">
//                       {Object.entries(groupedBySection).map(([section, fields]) => (
//                         <div key={section}>
//                           <div className="bg-gray-50/50 px-4 py-2">
//                             <h3 className="text-sm font-semibold text-gray-600">{section}</h3>
//                           </div>
//                           <table className="w-full">
//                             <thead>
//                               <tr className="border-b border-gray-100">
//                                 <th className="py-2 px-4 text-left text-xs font-medium text-gray-400">Attribut</th>
//                                 <th className="py-2 px-4 text-right text-xs font-medium text-gray-400 w-40">Version N-1</th>
//                                 <th className="py-2 px-4 text-right text-xs font-medium text-gray-400 w-40">Version N</th>
//                               </tr>
//                             </thead>
//                             <tbody>
//                               {fields.map((field, idx) => (
//                                 <ComparisonRow
//                                   key={idx}
//                                   label={field.label}
//                                   sub={field.sub}
//                                   valueN1={field.valueN1}
//                                   valueN={field.valueN}
//                                 />
//                               ))}
//                             </tbody>
//                           </table>
//                         </div>
//                       ))}
//                     </div>
//                   </>
//                 )}
//               </div>
//             )}
//           </div>
//         )}

//         {/* État initial */}
//         {!hasSearched && !loading && !error && (
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 text-center">
//             <svg className="w-16 h-16 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//             </svg>
//             <p className="text-gray-400">Entrez un CPTE ANALY pour comparer les versions</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProjetVersionComparison;

