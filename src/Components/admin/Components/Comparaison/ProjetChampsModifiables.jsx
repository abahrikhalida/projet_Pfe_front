// // ProjetChampsModifiables.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import useProjetChampsModifiables from "../../../../hooks/useProjetChampsModifiables";

// const fmt = (val) => {
//   if (val === null || val === undefined) return "—";
//   if (typeof val === "number") return val.toLocaleString("fr-DZ");
//   if (typeof val === "string") return val;
//   return String(val);
// };

// // Mapping des noms techniques vers des libellés français
// const fieldLabels = {
//   // Informations générales
//   "libelle": "Libellé du projet",
//   "duree_realisation": "Durée de réalisation (mois)",
//   "point_situation": "Point de situation",
//   "description_technique": "Description technique",
//   "opportunite_projet": "Opportunité projet",
  
//   // Coûts
//   "cout_initial_total": "Coût Global Initial",
//   "cout_initial_dont_dex": "Dont DEV - Coût Global Initial",
  
//   // Réalisations N-1
//   "realisation_cumul_n_mins1_total": "Réalisation cumulée N-1",
//   "realisation_cumul_n_mins1_dont_dex": "Dont DEV - Réalisation cumulée N-1",
  
//   // Réalisations S1
//   "real_s1_n_total": "Réalisation S1",
//   "real_s1_n_dont_dex": "Dont DEV - Réalisation S1",
  
//   // Prévisions S2
//   "prev_s2_n_total": "Prévision S2",
//   "prev_s2_n_dont_dex": "Dont DEV - Prévision S2",
  
//   // Prévision Clôture
//   "prev_cloture_n_total": "Prévision Clôture N",
//   "prev_cloture_n_dont_dex": "Dont DEV - Prévision Clôture N",
  
//   // Reste à réaliser
//   "reste_a_realiser_total": "Reste à réaliser",
//   "reste_a_realiser_dont_dex": "Dont DEV - Reste à réaliser",
  
//   // Prévisions futures
//   "prev_n_plus1_total": "Prévision N+1",
//   "prev_n_plus1_dont_dex": "Dont DEV - N+1",
//   "prev_n_plus2_total": "Prévision N+2",
//   "prev_n_plus2_dont_dex": "Dont DEV - N+2",
//   "prev_n_plus3_total": "Prévision N+3",
//   "prev_n_plus3_dont_dex": "Dont DEV - N+3",
//   "prev_n_plus4_total": "Prévision N+4",
//   "prev_n_plus4_dont_dex": "Dont DEV - N+4",
//   "prev_n_plus5_total": "Prévision N+5",
//   "prev_n_plus5_dont_dex": "Dont DEV - N+5",
  
//   // Mensuel
//   "janvier_total": "Janvier",
//   "janvier_dont_dex": "Dont DEV - Janvier",
//   "fevrier_total": "Février",
//   "fevrier_dont_dex": "Dont DEV - Février",
//   "mars_total": "Mars",
//   "mars_dont_dex": "Dont DEV - Mars",
//   "avril_total": "Avril",
//   "avril_dont_dex": "Dont DEV - Avril",
//   "mai_total": "Mai",
//   "mai_dont_dex": "Dont DEV - Mai",
//   "juin_total": "Juin",
//   "juin_dont_dex": "Dont DEV - Juin",
//   "juillet_total": "Juillet",
//   "juillet_dont_dex": "Dont DEV - Juillet",
//   "aout_total": "Août",
//   "aout_dont_dex": "Dont DEV - Août",
//   "septembre_total": "Septembre",
//   "septembre_dont_dex": "Dont DEV - Septembre",
//   "octobre_total": "Octobre",
//   "octobre_dont_dex": "Dont DEV - Octobre",
//   "novembre_total": "Novembre",
//   "novembre_dont_dex": "Dont DEV - Novembre",
//   "decembre_total": "Décembre",
//   "decembre_dont_dex": "Dont DEV - Décembre",
// };

// const getFieldSection = (champ) => {
//   if (["libelle", "duree_realisation", "point_situation", "description_technique", "opportunite_projet"].includes(champ))
//     return "📋 INFORMATIONS GÉNÉRALES";
//   if (champ.includes("cout_initial"))
//     return "💰 COÛTS";
//   if (champ.includes("realisation_cumul"))
//     return "📊 RÉALISATIONS N-1";
//   if (champ.includes("real_s1"))
//     return "📈 RÉALISATIONS S1";
//   if (champ.includes("prev_s2"))
//     return "📈 PRÉVISIONS S2";
//   if (champ.includes("prev_cloture"))
//     return "📈 PRÉVISION CLÔTURE";
//   if (champ.includes("reste_a_realiser"))
//     return "📈 RESTE À RÉALISER";
//   if (champ.includes("prev_n_plus"))
//     return "🔮 PRÉVISIONS FUTURES";
//   if (champ.includes("_total") && !champ.includes("prev")) {
//     const months = ["janvier", "fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "decembre"];
//     for (const month of months) {
//       if (champ.includes(month)) return "📅 DÉTAIL MENSUEL";
//     }
//   }
//   return "📋 AUTRES";
// };

// const ModificationRow = ({ champ, ancienneValeur, nouvelleValeur }) => {
//   const label = fieldLabels[champ] || champ.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());
  
//   const isNumeric = typeof ancienneValeur === "number" || typeof nouvelleValeur === "number";
//   const getVariation = () => {
//     if (!isNumeric) return null;
//     const oldVal = Number(ancienneValeur);
//     const newVal = Number(nouvelleValeur);
//     if (oldVal === 0 || isNaN(oldVal)) return null;
//     const diff = ((newVal - oldVal) / oldVal) * 100;
//     return diff.toFixed(1);
//   };
  
//   const variation = getVariation();
//   const isIncrease = variation && Number(variation) > 0;

//   return (
//     <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
//       <td className="py-3 px-4">
//         <span className="text-sm font-medium text-gray-700">{label}</span>
//       </td>
//       <td className="py-3 px-4 text-right">
//         <span className="text-sm text-gray-500 line-through">
//           {fmt(ancienneValeur)}
//         </span>
//       </td>
//       <td className="py-3 px-4 text-right">
//         <div className="flex items-center justify-end gap-2">
//           <span className="text-sm font-semibold text-[#FF8500]">
//             {fmt(nouvelleValeur)}
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

// const ProjetChampsModifiables = () => {
//   const navigate = useNavigate();
//   const [codeInput, setCodeInput] = useState("");
//   const {
//     data,
//     loading,
//     error,
//     hasSearched,
//     searchProject,
//     resetSearch,
//     totalModifications,
//     versionActuelle,
//     versionPrecedente,
//     champsModifiables,
//     message,
//   } = useProjetChampsModifiables();

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

//   // Grouper les modifications par section
//   const groupedBySection = champsModifiables.reduce((acc, mod) => {
//     const section = getFieldSection(mod.champ);
//     if (!acc[section]) {
//       acc[section] = [];
//     }
//     acc[section].push(mod);
//     return acc;
//   }, {});

//   const hasNoModifications = totalModifications === 0 && hasSearched && !loading;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white sticky top-0 z-10 shadow-md">
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
//           <p className="text-orange-100 text-sm">Visualisez uniquement les attributs modifiés entre deux versions</p>
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
//                   className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
//                   disabled={loading}
//                 />
//               </div>
//               <div className="flex items-end">
//                 <button
//                   type="submit"
//                   disabled={loading || !codeInput.trim()}
//                   className="px-6 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
//                 >
//                   {loading ? (
//                     <>
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                       Analyse...
//                     </>
//                   ) : (
//                     <>
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                       </svg>
//                       Comparer
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
//             <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
//             <p className="mt-3 text-gray-500">Analyse des modifications en cours...</p>
//           </div>
//         )}

//         {/* Error */}
//         {error && !loading && hasSearched && (
//           <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
//             <svg className="w-12 h-12 mx-auto text-red-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <p className="text-red-600">{error}</p>
//             <button onClick={handleNewSearch} className="mt-3 text-sm text-gray-500 hover:text-gray-700">
//               Nouvelle recherche
//             </button>
//           </div>
//         )}

//         {/* Version initiale - pas de version précédente */}
//         {message && hasSearched && !loading && (
//           <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
//             <svg className="w-12 h-12 mx-auto text-blue-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <p className="text-blue-600">{message}</p>
//           </div>
//         )}

//         {/* Résultats */}
//         {data && !loading && versionPrecedente && (
//           <div>
//             {/* En-tête */}
//             <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 overflow-hidden">
//               <div className="px-5 py-4 border-b border-gray-100">
//                 <div className="flex justify-between items-center flex-wrap gap-3">
//                   <div>
//                     <div className="flex items-center gap-2 mb-1">
//                       <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
//                       <span className="text-xs text-gray-400 uppercase">CPTE ANALY</span>
//                     </div>
//                     <h2 className="text-2xl font-bold text-gray-800">{data.code_division}</h2>
//                   </div>
//                   <div className="flex gap-3">
//                     <div className="text-center px-4 py-2 bg-gray-50 rounded-lg">
//                       <p className="text-xs text-gray-400">Version précédente</p>
//                       <p className="text-lg font-bold text-gray-600">v{versionPrecedente}</p>
//                     </div>
//                     <div className="text-center px-4 py-2 bg-orange-50 rounded-lg">
//                       <p className="text-xs text-orange-400">Version actuelle</p>
//                       <p className="text-lg font-bold text-orange-500">v{versionActuelle}</p>
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
//             </div>

//             {/* Nombre de modifications */}
//             <div className="bg-orange-50 border border-orange-100 rounded-xl p-3 mb-6">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
//                   <span className="text-sm font-medium text-gray-700">
//                     {totalModifications} modification{totalModifications > 1 ? 's' : ''} détectée{totalModifications > 1 ? 's' : ''}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Tableau des modifications */}
//             {totalModifications === 0 ? (
//               <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
//                 <svg className="w-16 h-16 mx-auto text-green-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//                 <p className="text-green-600 font-medium text-lg">Aucune différence détectée</p>
//                 <p className="text-sm text-gray-400 mt-1">Les deux versions sont identiques</p>
//               </div>
//             ) : (
//               <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//                 {Object.entries(groupedBySection).map(([section, fields]) => (
//                   <div key={section}>
//                     <div className="bg-gray-50 px-4 py-2 border-b border-gray-100">
//                       <h3 className="text-sm font-semibold text-gray-600">{section}</h3>
//                     </div>
//                     <div className="overflow-x-auto">
//                       <table className="w-full">
//                         <thead>
//                           <tr className="border-b border-gray-100 bg-gray-50/30">
//                             <th className="py-2 px-4 text-left text-xs font-medium text-gray-400 w-2/5">Attribut</th>
//                             <th className="py-2 px-4 text-right text-xs font-medium text-gray-400 w-1/3">Version v{versionPrecedente}</th>
//                             <th className="py-2 px-4 text-right text-xs font-medium text-gray-400 w-1/3">Version v{versionActuelle}</th>
//                            </tr>
//                         </thead>
//                         <tbody>
//                           {fields.map((mod, idx) => (
//                             <ModificationRow
//                               key={idx}
//                               champ={mod.champ}
//                               ancienneValeur={mod.ancienne_valeur}
//                               nouvelleValeur={mod.nouvelle_valeur}
//                             />
//                           ))}
//                         </tbody>
//                        </table>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {/* État initial */}
//         {!hasSearched && !loading && !error && (
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
//             <svg className="w-20 h-20 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 20l-5.447-2.724A2 2 0 013 15.382V6.618a2 2 0 011.553-1.894l6-2a2 2 0 011.894 0l6 2A2 2 0 0119 6.618v8.764a2 2 0 01-1.447 1.894L15 18.5" />
//             </svg>
//             <h3 className="text-lg font-medium text-gray-600 mb-2">Comparaison de versions</h3>
//             <p className="text-gray-400">Entrez un CPTE ANALY pour voir les modifications entre versions</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProjetChampsModifiables;















// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import useProjetChampsModifiables from "../../../../hooks/useProjetChampsModifiables";

// // ─── Formatage ───────────────────────────────────────────────────────────────
// const fmt = (val) => {
//   if (val === null || val === undefined) return "—";
//   if (typeof val === "number") return val.toLocaleString("fr-DZ");
//   if (typeof val === "string") return val;
//   return String(val);
// };

// // ─── Labels français ─────────────────────────────────────────────────────────
// const fieldLabels = {
//   libelle: "Libellé du projet",
//   duree_realisation: "Durée de réalisation (mois)",
//   point_situation: "Point de situation",
//   description_technique: "Description technique",
//   opportunite_projet: "Opportunité projet",
//   cout_initial_total: "Coût global initial",
//   cout_initial_dont_dex: "Dont DEV — Coût global initial",
//   realisation_cumul_n_mins1_total: "Réalisation cumulée N-1",
//   realisation_cumul_n_mins1_dont_dex: "Dont DEV — Réalisation cumulée N-1",
//   real_s1_n_total: "Réalisation S1",
//   real_s1_n_dont_dex: "Dont DEV — Réalisation S1",
//   prev_s2_n_total: "Prévision S2",
//   prev_s2_n_dont_dex: "Dont DEV — Prévision S2",
//   prev_cloture_n_total: "Prévision clôture N",
//   prev_cloture_n_dont_dex: "Dont DEV — Prévision clôture N",
//   reste_a_realiser_total: "Reste à réaliser",
//   reste_a_realiser_dont_dex: "Dont DEV — Reste à réaliser",
//   prev_n_plus1_total: "Prévision N+1",
//   prev_n_plus1_dont_dex: "Dont DEV — N+1",
//   prev_n_plus2_total: "Prévision N+2",
//   prev_n_plus2_dont_dex: "Dont DEV — N+2",
//   prev_n_plus3_total: "Prévision N+3",
//   prev_n_plus3_dont_dex: "Dont DEV — N+3",
//   prev_n_plus4_total: "Prévision N+4",
//   prev_n_plus4_dont_dex: "Dont DEV — N+4",
//   prev_n_plus5_total: "Prévision N+5",
//   prev_n_plus5_dont_dex: "Dont DEV — N+5",
//   janvier_total: "Janvier",
//   janvier_dont_dex: "Dont DEV — Janvier",
//   fevrier_total: "Février",
//   fevrier_dont_dex: "Dont DEV — Février",
//   mars_total: "Mars",
//   mars_dont_dex: "Dont DEV — Mars",
//   avril_total: "Avril",
//   avril_dont_dex: "Dont DEV — Avril",
//   mai_total: "Mai",
//   mai_dont_dex: "Dont DEV — Mai",
//   juin_total: "Juin",
//   juin_dont_dex: "Dont DEV — Juin",
//   juillet_total: "Juillet",
//   juillet_dont_dex: "Dont DEV — Juillet",
//   aout_total: "Août",
//   aout_dont_dex: "Dont DEV — Août",
//   septembre_total: "Septembre",
//   septembre_dont_dex: "Dont DEV — Septembre",
//   octobre_total: "Octobre",
//   octobre_dont_dex: "Dont DEV — Octobre",
//   novembre_total: "Novembre",
//   novembre_dont_dex: "Dont DEV — Novembre",
//   decembre_total: "Décembre",
//   decembre_dont_dex: "Dont DEV — Décembre",
// };

// // ─── Sections ─────────────────────────────────────────────────────────────────
// const SECTIONS = [
//   {
//     key: "general",
//     label: "Informations générales",
//     color: "#7c3aed",
//     bg: "#ede9fe",
//     test: (f) =>
//       ["libelle", "duree_realisation", "point_situation", "description_technique", "opportunite_projet"].includes(f),
//   },
//   {
//     key: "cout",
//     label: "Coûts",
//     color: "#b45309",
//     bg: "#fef3c7",
//     test: (f) => f.includes("cout_initial"),
//   },
//   {
//     key: "real_n1",
//     label: "Réalisations N-1",
//     color: "#0f766e",
//     bg: "#ccfbf1",
//     test: (f) => f.includes("realisation_cumul"),
//   },
//   {
//     key: "real_s1",
//     label: "Réalisations S1",
//     color: "#15803d",
//     bg: "#dcfce7",
//     test: (f) => f.includes("real_s1"),
//   },
//   {
//     key: "prev_s2",
//     label: "Prévisions S2",
//     color: "#1d4ed8",
//     bg: "#dbeafe",
//     test: (f) => f.includes("prev_s2"),
//   },
//   {
//     key: "prev_cloture",
//     label: "Prévision clôture",
//     color: "#0369a1",
//     bg: "#e0f2fe",
//     test: (f) => f.includes("prev_cloture"),
//   },
//   {
//     key: "reste",
//     label: "Reste à réaliser",
//     color: "#9f1239",
//     bg: "#ffe4e6",
//     test: (f) => f.includes("reste_a_realiser"),
//   },
//   {
//     key: "prev_futures",
//     label: "Prévisions futures",
//     color: "#6d28d9",
//     bg: "#f5f3ff",
//     test: (f) => f.includes("prev_n_plus"),
//   },
//   {
//     key: "mensuel",
//     label: "Détail mensuel",
//     color: "#d97706",
//     bg: "#fffbeb",
//     test: (f) =>
//       ["janvier","fevrier","mars","avril","mai","juin","juillet","aout","septembre","octobre","novembre","decembre"].some((m) => f.startsWith(m)),
//   },
// ];

// const getSectionForField = (fieldName) => {
//   for (const s of SECTIONS) {
//     if (s.test(fieldName)) return s;
//   }
//   return { key: "autres", label: "Autres", color: "#6b7280", bg: "#f3f4f6" };
// };

// // ─── Icônes SVG légères ───────────────────────────────────────────────────────
// const IconArrowLeft = () => (
//   <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//   </svg>
// );
// const IconSearch = () => (
//   <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//   </svg>
// );
// const IconInfo = () => (
//   <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//   </svg>
// );
// const IconError = () => (
//   <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//   </svg>
// );
// const IconCheck = () => (
//   <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//   </svg>
// );
// const IconEmpty = () => (
//   <svg width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A2 2 0 013 15.382V6.618a2 2 0 011.553-1.894l6-2a2 2 0 011.894 0l6 2A2 2 0 0119 6.618v8.764a2 2 0 01-1.447 1.894L15 18.5" />
//   </svg>
// );

// // ─── Ligne de modification ─────────────────────────────────────────────────────
// const ModificationRow = ({ champ, ancienneValeur, nouvelleValeur, isLast }) => {
//   const label = fieldLabels[champ] || champ.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

//   const isNumeric = typeof ancienneValeur === "number" || typeof nouvelleValeur === "number";
//   const isText = typeof ancienneValeur === "string" || typeof nouvelleValeur === "string";

//   const getVariation = () => {
//     if (!isNumeric) return null;
//     const oldVal = Number(ancienneValeur);
//     const newVal = Number(nouvelleValeur);
//     if (oldVal === 0 || isNaN(oldVal)) return null;
//     const diff = ((newVal - oldVal) / oldVal) * 100;
//     return diff.toFixed(1);
//   };

//   const variation = getVariation();
//   const isIncrease = variation && Number(variation) > 0;

//   return (
//     <tr
//       style={{
//         borderBottom: isLast ? "none" : "0.5px solid #f3f4f6",
//         transition: "background 0.15s",
//       }}
//       onMouseEnter={(e) => (e.currentTarget.style.background = "#fafafa")}
//       onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
//     >
//       {/* Attribut */}
//       <td style={{ padding: "10px 16px", width: "38%" }}>
//         <span style={{ fontSize: 13, color: "#374151", fontWeight: 450 }}>{label}</span>
//       </td>

//       {/* Ancienne valeur */}
//       <td style={{ padding: "10px 16px", width: "28%", textAlign: "right" }}>
//         <span
//           style={{
//             fontSize: 12,
//             color: "#9ca3af",
//             textDecoration: "line-through",
//             fontVariantNumeric: "tabular-nums",
//             maxWidth: 160,
//             display: "inline-block",
//             overflow: "hidden",
//             textOverflow: "ellipsis",
//             whiteSpace: "nowrap",
//             verticalAlign: "middle",
//           }}
//           title={fmt(ancienneValeur)}
//         >
//           {fmt(ancienneValeur)}
//         </span>
//       </td>

//       {/* Nouvelle valeur */}
//       <td style={{ padding: "10px 16px", width: "34%", textAlign: "right" }}>
//         <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 6 }}>
//           <span
//             style={{
//               fontSize: 13,
//               fontWeight: 500,
//               color: "#f97316",
//               fontVariantNumeric: "tabular-nums",
//               maxWidth: isText ? 150 : "none",
//               display: "inline-block",
//               overflow: isText ? "hidden" : "visible",
//               textOverflow: isText ? "ellipsis" : "clip",
//               whiteSpace: isText ? "nowrap" : "normal",
//               verticalAlign: "middle",
//             }}
//             title={fmt(nouvelleValeur)}
//           >
//             {fmt(nouvelleValeur)}
//           </span>

//           {variation && variation !== "0.0" && (
//             <span
//               style={{
//                 fontSize: 11,
//                 fontWeight: 500,
//                 padding: "2px 6px",
//                 borderRadius: 5,
//                 flexShrink: 0,
//                 background: isIncrease ? "#dcfce7" : "#fee2e2",
//                 color: isIncrease ? "#15803d" : "#b91c1c",
//               }}
//             >
//               {isIncrease ? "▲" : "▼"} {Math.abs(variation)}%
//             </span>
//           )}
//         </div>
//       </td>
//     </tr>
//   );
// };

// // ─── Bloc de section ───────────────────────────────────────────────────────────
// const SectionBlock = ({ section, fields, versionPrecedente, versionActuelle }) => (
//   <div
//     style={{
//       background: "#ffffff",
//       border: "0.5px solid #e5e7eb",
//       borderRadius: 12,
//       overflow: "hidden",
//       marginBottom: 10,
//     }}
//   >
//     {/* En-tête de section */}
//     <div
//       style={{
//         display: "flex",
//         alignItems: "center",
//         gap: 10,
//         padding: "9px 16px",
//         background: "#f9fafb",
//         borderBottom: "0.5px solid #f3f4f6",
//       }}
//     >
//       <div
//         style={{
//           width: 24,
//           height: 24,
//           borderRadius: "50%",
//           background: section.bg,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           flexShrink: 0,
//         }}
//       >
//         <span style={{ fontSize: 11, fontWeight: 600, color: section.color }}>
//           {section.label.charAt(0).toUpperCase()}
//         </span>
//       </div>
//       <span style={{ fontSize: 12, fontWeight: 500, color: "#4b5563", letterSpacing: "0.02em" }}>
//         {section.label}
//       </span>
//       <span
//         style={{
//           marginLeft: "auto",
//           fontSize: 11,
//           color: "#ffffff",
//           background: section.color,
//           padding: "1px 8px",
//           borderRadius: 20,
//           fontWeight: 500,
//         }}
//       >
//         {fields.length}
//       </span>
//     </div>

//     {/* Tableau */}
//     <div style={{ overflowX: "auto" }}>
//       <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
//         <thead>
//           <tr style={{ borderBottom: "0.5px solid #f3f4f6" }}>
//             <th style={{ padding: "7px 16px", textAlign: "left", fontSize: 11, fontWeight: 500, color: "#9ca3af", width: "38%" }}>
//               Attribut
//             </th>
//             <th style={{ padding: "7px 16px", textAlign: "right", fontSize: 11, fontWeight: 500, color: "#9ca3af", width: "28%" }}>
//               Version v{versionPrecedente}
//             </th>
//             <th style={{ padding: "7px 16px", textAlign: "right", fontSize: 11, fontWeight: 500, color: "#9ca3af", width: "34%" }}>
//               Version v{versionActuelle}
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {fields.map((mod, idx) => (
//             <ModificationRow
//               key={idx}
//               champ={mod.champ}
//               ancienneValeur={mod.ancienne_valeur}
//               nouvelleValeur={mod.nouvelle_valeur}
//               isLast={idx === fields.length - 1}
//             />
//           ))}
//         </tbody>
//       </table>
//     </div>
//   </div>
// );

// // ─── Composant principal ───────────────────────────────────────────────────────
// const ProjetChampsModifiables = () => {
//   const navigate = useNavigate();
//   const [codeInput, setCodeInput] = useState("");

//   const {
//     data,
//     loading,
//     error,
//     hasSearched,
//     searchProject,
//     resetSearch,
//     totalModifications,
//     versionActuelle,
//     versionPrecedente,
//     champsModifiables,
//     message,
//   } = useProjetChampsModifiables();

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (codeInput.trim()) searchProject(codeInput);
//   };

//   const handleGoBack = () => navigate("/budget/classification");

//   const handleNewSearch = () => {
//     resetSearch();
//     setCodeInput("");
//   };

//   // Grouper par section dans l'ordre défini
//   const groupedBySection = (() => {
//     const map = {};
//     for (const mod of champsModifiables) {
//       const section = getSectionForField(mod.champ);
//       if (!map[section.key]) map[section.key] = { section, fields: [] };
//       map[section.key].fields.push(mod);
//     }
//     // Trier selon l'ordre de SECTIONS
//     const ordered = [];
//     for (const s of SECTIONS) {
//       if (map[s.key]) ordered.push(map[s.key]);
//     }
//     if (map["autres"]) ordered.push(map["autres"]);
//     return ordered;
//   })();

//   return (
//     <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "'Inter', system-ui, sans-serif" }}>

//       {/* ── Header ── */}
//       <div
//         style={{
//           background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
//           color: "#ffffff",
//           position: "sticky",
//           top: 0,
//           zIndex: 10,
//           boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
//         }}
//       >
//         <div style={{ padding: "14px 20px" }}>
//           <button
//             onClick={handleGoBack}
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: 6,
//               background: "rgba(255,255,255,0.15)",
//               border: "none",
//               borderRadius: 6,
//               color: "rgba(255,255,255,0.9)",
//               padding: "4px 10px",
//               fontSize: 12,
//               cursor: "pointer",
//               marginBottom: 10,
//               transition: "background 0.15s",
//             }}
//             onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.25)")}
//             onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
//           >
//             <IconArrowLeft />
//             Retour
//           </button>
//           <h1 style={{ fontSize: 17, fontWeight: 600, margin: 0 }}>Comparaison des versions</h1>
//           <p style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", margin: "3px 0 0" }}>
//             Attributs modifiés entre deux versions du projet
//           </p>
//         </div>
//       </div>

//       <div style={{ padding: "16px 16px 40px" }}>

//         {/* ── Barre de recherche ── */}
//         <div
//           style={{
//             background: "#ffffff",
//             border: "0.5px solid #e5e7eb",
//             borderRadius: 12,
//             padding: "14px 16px",
//             marginBottom: 14,
//           }}
//         >
//           <form onSubmit={handleSearch}>
//             <div style={{ display: "flex", gap: 10, alignItems: "flex-end", flexWrap: "wrap" }}>
//               <div style={{ flex: 1, minWidth: 180 }}>
//                 <label
//                   style={{
//                     display: "block",
//                     fontSize: 11,
//                     fontWeight: 500,
//                     color: "#6b7280",
//                     marginBottom: 5,
//                     letterSpacing: "0.04em",
//                     textTransform: "uppercase",
//                   }}
//                 >
//                   CPTE ANALY
//                 </label>
//                 <input
//                   type="text"
//                   value={codeInput}
//                   onChange={(e) => setCodeInput(e.target.value.toUpperCase())}
//                   placeholder="Ex : PROJ018"
//                   disabled={loading}
//                   style={{
//                     width: "100%",
//                     padding: "9px 12px",
//                     border: "0.5px solid #d1d5db",
//                     borderRadius: 8,
//                     fontSize: 13,
//                     color: "#111827",
//                     background: loading ? "#f9fafb" : "#ffffff",
//                     outline: "none",
//                     boxSizing: "border-box",
//                     transition: "border-color 0.15s",
//                     fontFamily: "monospace",
//                     letterSpacing: "0.05em",
//                   }}
//                   onFocus={(e) => (e.target.style.borderColor = "#f97316")}
//                   onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
//                 />
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading || !codeInput.trim()}
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 6,
//                   padding: "9px 18px",
//                   background: loading || !codeInput.trim() ? "#e5e7eb" : "#f97316",
//                   color: loading || !codeInput.trim() ? "#9ca3af" : "#ffffff",
//                   border: "none",
//                   borderRadius: 8,
//                   fontSize: 13,
//                   fontWeight: 500,
//                   cursor: loading || !codeInput.trim() ? "not-allowed" : "pointer",
//                   transition: "background 0.15s",
//                   whiteSpace: "nowrap",
//                 }}
//               >
//                 {loading ? (
//                   <>
//                     <div
//                       style={{
//                         width: 14,
//                         height: 14,
//                         border: "2px solid rgba(255,255,255,0.4)",
//                         borderTopColor: "#ffffff",
//                         borderRadius: "50%",
//                         animation: "spin 0.7s linear infinite",
//                       }}
//                     />
//                     Analyse...
//                   </>
//                 ) : (
//                   <>
//                     <IconSearch />
//                     Comparer
//                   </>
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* ── Loading ── */}
//         {loading && (
//           <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "48px 0" }}>
//             <div
//               style={{
//                 width: 36,
//                 height: 36,
//                 border: "3px solid #fed7aa",
//                 borderTopColor: "#f97316",
//                 borderRadius: "50%",
//                 animation: "spin 0.7s linear infinite",
//               }}
//             />
//             <p style={{ marginTop: 12, fontSize: 13, color: "#9ca3af" }}>
//               Analyse des modifications en cours…
//             </p>
//           </div>
//         )}

//         {/* ── Erreur ── */}
//         {error && !loading && hasSearched && (
//           <div
//             style={{
//               background: "#fff1f2",
//               border: "0.5px solid #fecdd3",
//               borderRadius: 12,
//               padding: "20px 16px",
//               textAlign: "center",
//             }}
//           >
//             <div style={{ color: "#f43f5e", marginBottom: 8 }}>
//               <IconError />
//             </div>
//             <p style={{ fontSize: 13, color: "#be123c", margin: "0 0 10px" }}>{error}</p>
//             <button
//               onClick={handleNewSearch}
//               style={{
//                 fontSize: 12,
//                 color: "#6b7280",
//                 background: "none",
//                 border: "none",
//                 cursor: "pointer",
//                 textDecoration: "underline",
//               }}
//             >
//               Nouvelle recherche
//             </button>
//           </div>
//         )}

//         {/* ── Version initiale ── */}
//         {message && hasSearched && !loading && (
//           <div
//             style={{
//               background: "#eff6ff",
//               border: "0.5px solid #bfdbfe",
//               borderRadius: 12,
//               padding: "20px 16px",
//               textAlign: "center",
//             }}
//           >
//             <div style={{ color: "#3b82f6", marginBottom: 8 }}>
//               <IconInfo />
//             </div>
//             <p style={{ fontSize: 13, color: "#1d4ed8", margin: 0 }}>{message}</p>
//           </div>
//         )}

//         {/* ── Résultats ── */}
//         {data && !loading && versionPrecedente && (
//           <>
//             {/* Carte projet + versions */}
//             <div
//               style={{
//                 background: "#ffffff",
//                 border: "0.5px solid #e5e7eb",
//                 borderRadius: 12,
//                 padding: "14px 16px",
//                 marginBottom: 12,
//               }}
//             >
//               <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
//                 {/* Identifiant projet */}
//                 <div>
//                   <p style={{ fontSize: 11, color: "#9ca3af", margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
//                     CPTE ANALY
//                   </p>
//                   <p style={{ fontSize: 22, fontWeight: 700, color: "#111827", margin: 0, fontFamily: "monospace" }}>
//                     {data.code_division}
//                   </p>
//                 </div>

//                 {/* Pills versions + fermer */}
//                 <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//                   <div
//                     style={{
//                       textAlign: "center",
//                       background: "#f9fafb",
//                       border: "0.5px solid #e5e7eb",
//                       borderRadius: 8,
//                       padding: "6px 14px",
//                     }}
//                   >
//                     <p style={{ fontSize: 10, color: "#9ca3af", margin: "0 0 1px" }}>Précédente</p>
//                     <p style={{ fontSize: 16, fontWeight: 600, color: "#4b5563", margin: 0 }}>v{versionPrecedente}</p>
//                   </div>

//                   <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#d1d5db">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                   </svg>

//                   <div
//                     style={{
//                       textAlign: "center",
//                       background: "#fff7ed",
//                       border: "0.5px solid #fdba74",
//                       borderRadius: 8,
//                       padding: "6px 14px",
//                     }}
//                   >
//                     <p style={{ fontSize: 10, color: "#f97316", margin: "0 0 1px" }}>Actuelle</p>
//                     <p style={{ fontSize: 16, fontWeight: 600, color: "#f97316", margin: 0 }}>v{versionActuelle}</p>
//                   </div>

//                   <button
//                     onClick={handleNewSearch}
//                     style={{
//                       background: "#f3f4f6",
//                       border: "none",
//                       borderRadius: 6,
//                       width: 28,
//                       height: 28,
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       cursor: "pointer",
//                       color: "#9ca3af",
//                       fontSize: 14,
//                     }}
//                   >
//                     ✕
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Badge modifications */}
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 8,
//                 background: "#fff7ed",
//                 border: "0.5px solid #fed7aa",
//                 borderRadius: 8,
//                 padding: "8px 14px",
//                 marginBottom: 14,
//               }}
//             >
//               <span
//                 style={{
//                   width: 8,
//                   height: 8,
//                   borderRadius: "50%",
//                   background: "#f97316",
//                   display: "inline-block",
//                   flexShrink: 0,
//                 }}
//               />
//               <span style={{ fontSize: 13, fontWeight: 500, color: "#9a3412" }}>
//                 {totalModifications} modification{totalModifications > 1 ? "s" : ""} détectée{totalModifications > 1 ? "s" : ""}
//               </span>
//               <span style={{ marginLeft: "auto", fontSize: 11, color: "#c2410c" }}>
//                 v{versionPrecedente} → v{versionActuelle}
//               </span>
//             </div>

//             {/* Aucune modification */}
//             {totalModifications === 0 ? (
//               <div
//                 style={{
//                   background: "#ffffff",
//                   border: "0.5px solid #e5e7eb",
//                   borderRadius: 12,
//                   padding: "48px 16px",
//                   textAlign: "center",
//                 }}
//               >
//                 <div style={{ color: "#22c55e", marginBottom: 10 }}>
//                   <IconCheck />
//                 </div>
//                 <p style={{ fontSize: 15, fontWeight: 500, color: "#15803d", margin: "0 0 4px" }}>
//                   Aucune différence détectée
//                 </p>
//                 <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>
//                   Les deux versions sont identiques
//                 </p>
//               </div>
//             ) : (
//               /* Sections groupées */
//               groupedBySection.map(({ section, fields }) => (
//                 <SectionBlock
//                   key={section.key}
//                   section={section}
//                   fields={fields}
//                   versionPrecedente={versionPrecedente}
//                   versionActuelle={versionActuelle}
//                 />
//               ))
//             )}
//           </>
//         )}

//         {/* ── État initial ── */}
//         {!hasSearched && !loading && !error && (
//           <div
//             style={{
//               background: "#ffffff",
//               border: "0.5px solid #e5e7eb",
//               borderRadius: 12,
//               padding: "56px 16px",
//               textAlign: "center",
//             }}
//           >
//             <div style={{ color: "#d1d5db", marginBottom: 14 }}>
//               <IconEmpty />
//             </div>
//             <h3 style={{ fontSize: 15, fontWeight: 500, color: "#4b5563", margin: "0 0 6px" }}>
//               Comparaison de versions
//             </h3>
//             <p style={{ fontSize: 13, color: "#9ca3af", margin: 0 }}>
//               Entrez un CPTE ANALY pour voir les modifications entre versions
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Animation spin */}
//       <style>{`
//         @keyframes spin {
//           to { transform: rotate(360deg); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ProjetChampsModifiables;
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useProjetChampsModifiables from "../../../../hooks/useProjetChampsModifiables";

// ─── Formatage ───────────────────────────────────────────────────────────────
const fmt = (val) => {
  if (val === null || val === undefined) return "—";
  if (typeof val === "number") return val.toLocaleString("fr-DZ");
  if (typeof val === "string") return val;
  return String(val);
};

const ORANGE_COLOR = '#FF8500';
const ORANGE_GRADIENT = 'from-orange-500 to-amber-500';

// ─── Labels français ─────────────────────────────────────────────────────────
const fieldLabels = {
  libelle: "Libellé du projet",
  duree_realisation: "Durée de réalisation (mois)",
  point_situation: "Point de situation",
  description_technique: "Description technique",
  opportunite_projet: "Opportunité projet",
  cout_initial_total: "Coût global initial",
  cout_initial_dont_dex: "Dont DEV — Coût global initial",
  realisation_cumul_n_mins1_total: "Réalisation cumulée N-1",
  realisation_cumul_n_mins1_dont_dex: "Dont DEV — Réalisation cumulée N-1",
  real_s1_n_total: "Réalisation S1",
  real_s1_n_dont_dex: "Dont DEV — Réalisation S1",
  prev_s2_n_total: "Prévision S2",
  prev_s2_n_dont_dex: "Dont DEV — Prévision S2",
  prev_cloture_n_total: "Prévision clôture N",
  prev_cloture_n_dont_dex: "Dont DEV — Prévision clôture N",
  reste_a_realiser_total: "Reste à réaliser",
  reste_a_realiser_dont_dex: "Dont DEV — Reste à réaliser",
  prev_n_plus1_total: "Prévision N+1",
  prev_n_plus1_dont_dex: "Dont DEV — N+1",
  prev_n_plus2_total: "Prévision N+2",
  prev_n_plus2_dont_dex: "Dont DEV — N+2",
  prev_n_plus3_total: "Prévision N+3",
  prev_n_plus3_dont_dex: "Dont DEV — N+3",
  prev_n_plus4_total: "Prévision N+4",
  prev_n_plus4_dont_dex: "Dont DEV — N+4",
  prev_n_plus5_total: "Prévision N+5",
  prev_n_plus5_dont_dex: "Dont DEV — N+5",
  janvier_total: "Janvier",
  janvier_dont_dex: "Dont DEV — Janvier",
  fevrier_total: "Février",
  fevrier_dont_dex: "Dont DEV — Février",
  mars_total: "Mars",
  mars_dont_dex: "Dont DEV — Mars",
  avril_total: "Avril",
  avril_dont_dex: "Dont DEV — Avril",
  mai_total: "Mai",
  mai_dont_dex: "Dont DEV — Mai",
  juin_total: "Juin",
  juin_dont_dex: "Dont DEV — Juin",
  juillet_total: "Juillet",
  juillet_dont_dex: "Dont DEV — Juillet",
  aout_total: "Août",
  aout_dont_dex: "Dont DEV — Août",
  septembre_total: "Septembre",
  septembre_dont_dex: "Dont DEV — Septembre",
  octobre_total: "Octobre",
  octobre_dont_dex: "Dont DEV — Octobre",
  novembre_total: "Novembre",
  novembre_dont_dex: "Dont DEV — Novembre",
  decembre_total: "Décembre",
  decembre_dont_dex: "Dont DEV — Décembre",
};

// ─── Sections ─────────────────────────────────────────────────────────────────
const SECTIONS = [
  {
    key: "general",
    label: "Informations générales",
    color: "#7c3aed",
    bg: "#ede9fe",
    test: (f) =>
      ["libelle", "duree_realisation", "point_situation", "description_technique", "opportunite_projet"].includes(f),
  },
  {
    key: "cout",
    label: "Coûts",
    color: "#b45309",
    bg: "#fef3c7",
    test: (f) => f.includes("cout_initial"),
  },
  {
    key: "real_n1",
    label: "Réalisations N-1",
    color: "#0f766e",
    bg: "#ccfbf1",
    test: (f) => f.includes("realisation_cumul"),
  },
  {
    key: "real_s1",
    label: "Réalisations S1",
    color: "#15803d",
    bg: "#dcfce7",
    test: (f) => f.includes("real_s1"),
  },
  {
    key: "prev_s2",
    label: "Prévisions S2",
    color: "#1d4ed8",
    bg: "#dbeafe",
    test: (f) => f.includes("prev_s2"),
  },
  {
    key: "prev_cloture",
    label: "Prévision clôture",
    color: "#0369a1",
    bg: "#e0f2fe",
    test: (f) => f.includes("prev_cloture"),
  },
  {
    key: "reste",
    label: "Reste à réaliser",
    color: "#9f1239",
    bg: "#ffe4e6",
    test: (f) => f.includes("reste_a_realiser"),
  },
  {
    key: "prev_futures",
    label: "Prévisions futures",
    color: "#6d28d9",
    bg: "#f5f3ff",
    test: (f) => f.includes("prev_n_plus"),
  },
  {
    key: "mensuel",
    label: "Détail mensuel",
    color: "#d97706",
    bg: "#fffbeb",
    test: (f) =>
      ["janvier","fevrier","mars","avril","mai","juin","juillet","aout","septembre","octobre","novembre","decembre"].some((m) => f.startsWith(m)),
  },
];

const getSectionForField = (fieldName) => {
  for (const s of SECTIONS) {
    if (s.test(fieldName)) return s;
  }
  return { key: "autres", label: "Autres", color: "#6b7280", bg: "#f3f4f6" };
};

// ─── Ligne de modification avec animation ─────────────────────────────────────
const ModificationRow = ({ champ, ancienneValeur, nouvelleValeur, isLast, index }) => {
  const label = fieldLabels[champ] || champ.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  const isNumeric = typeof ancienneValeur === "number" || typeof nouvelleValeur === "number";
  const isText = typeof ancienneValeur === "string" || typeof nouvelleValeur === "string";

  const getVariation = () => {
    if (!isNumeric) return null;
    const oldVal = Number(ancienneValeur);
    const newVal = Number(nouvelleValeur);
    if (oldVal === 0 || isNaN(oldVal)) return null;
    const diff = ((newVal - oldVal) / oldVal) * 100;
    return diff.toFixed(1);
  };

  const variation = getVariation();
  const isIncrease = variation && Number(variation) > 0;

  return (
    <motion.tr
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03, duration: 0.2 }}
      style={{
        borderBottom: isLast ? "none" : "0.5px solid #f3f4f6",
        transition: "background 0.15s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#fafafa")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <td style={{ padding: "12px 16px", width: "38%" }}>
        <span style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}>{label}</span>
      </td>
      <td style={{ padding: "12px 16px", width: "28%", textAlign: "right" }}>
        <span
          style={{
            fontSize: 12,
            color: "#9ca3af",
            textDecoration: "line-through",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {fmt(ancienneValeur)}
        </span>
      </td>
      <td style={{ padding: "12px 16px", width: "34%", textAlign: "right" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 8 }}>
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: ORANGE_COLOR,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {fmt(nouvelleValeur)}
          </span>
          {variation && variation !== "0.0" && (
            <span
              style={{
                fontSize: 11,
                fontWeight: 500,
                padding: "2px 8px",
                borderRadius: 20,
                background: isIncrease ? "#dcfce7" : "#fee2e2",
                color: isIncrease ? "#15803d" : "#b91c1c",
              }}
            >
              {isIncrease ? "▲" : "▼"} {Math.abs(variation)}%
            </span>
          )}
        </div>
      </td>
    </motion.tr>
  );
};

// ─── Bloc de section avec animation ───────────────────────────────────────────
const SectionBlock = ({ section, fields, versionPrecedente, versionActuelle }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    style={{
      background: "#ffffff",
      border: "0.5px solid #e5e7eb",
      borderRadius: 16,
      overflow: "hidden",
      marginBottom: 16,
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 20px",
        background: "#f9fafb",
        borderBottom: "0.5px solid #f3f4f6",
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: section.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 600, color: section.color }}>
          {section.label.charAt(0).toUpperCase()}
        </span>
      </div>
      <span style={{ fontSize: 13, fontWeight: 600, color: "#4b5563", letterSpacing: "0.02em" }}>
        {section.label}
      </span>
      <span
        style={{
          marginLeft: "auto",
          fontSize: 11,
          color: "#ffffff",
          background: section.color,
          padding: "2px 10px",
          borderRadius: 20,
          fontWeight: 500,
        }}
      >
        {fields.length}
      </span>
    </div>

    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "0.5px solid #f3f4f6", background: "#ffffff" }}>
            <th style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 500, color: "#9ca3af", width: "38%" }}>
              Attribut
            </th>
            <th style={{ padding: "10px 16px", textAlign: "right", fontSize: 11, fontWeight: 500, color: "#9ca3af", width: "28%" }}>
              version précédente
            </th>
            <th style={{ padding: "10px 16px", textAlign: "right", fontSize: 11, fontWeight: 500, color: "#9ca3af", width: "34%" }}>
              Version actuelle
            </th>
          </tr>
        </thead>
        <tbody>
          {fields.map((mod, idx) => (
            <ModificationRow
              key={idx}
              index={idx}
              champ={mod.champ}
              ancienneValeur={mod.ancienne_valeur}
              nouvelleValeur={mod.nouvelle_valeur}
              isLast={idx === fields.length - 1}
            />
          ))}
        </tbody>
      </table>
    </div>
  </motion.div>
);

// ─── Composant principal ───────────────────────────────────────────────────────
const ProjetChampsModifiables = () => {
  const navigate = useNavigate();
  const [codeInput, setCodeInput] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);

  const {
    data,
    loading,
    error,
    hasSearched,
    searchProject,
    resetSearch,
    totalModifications,
    versionActuelle,
    versionPrecedente,
    champsModifiables,
    message,
  } = useProjetChampsModifiables();

  const handleSearch = (e) => {
    e.preventDefault();
    if (codeInput.trim()) searchProject(codeInput);
  };

  const handleGoBack = () => navigate("/budget/classification");
  const handleNewSearch = () => {
    resetSearch();
    setCodeInput("");
  };

  const groupedBySection = (() => {
    const map = {};
    for (const mod of champsModifiables) {
      const section = getSectionForField(mod.champ);
      if (!map[section.key]) map[section.key] = { section, fields: [] };
      map[section.key].fields.push(mod);
    }
    const ordered = [];
    for (const s of SECTIONS) {
      if (map[s.key]) ordered.push(map[s.key]);
    }
    if (map["autres"]) ordered.push(map["autres"]);
    return ordered;
  })();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header avec animations */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white border-b border-gray-200 sticky top-0 z-10 backdrop-blur-sm bg-white/95"
      >
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Comparaison Projet</h1>
              <p className="text-gray-500 mt-1">
                différence entre deux versions du projet
              </p>
            </div>
            {loading && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2"
              >
                <div className="w-2 h-2 bg-[#FF8500] rounded-full animate-pulse" />
                <span className="text-sm text-gray-500">Analyse...</span>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      <div className="p-8">
        {/* Barre de recherche style carte */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8"
        >
          <form onSubmit={handleSearch}>
            <div className="flex gap-4 items-end flex-wrap">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cpte Analy 
                </label>
                <input
                  type="text"
                  value={codeInput}
                  onChange={(e) => setCodeInput(e.target.value.toUpperCase())}
                  placeholder="Ex: PROJ018"
                  disabled={loading}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF8500] focus:border-[#FF8500] outline-none transition-all font-mono"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !codeInput.trim()}
                className="px-6 py-2.5 bg-[#FF8500] text-white rounded-xl hover:bg-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Analyse...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Comparer
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Loading state */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-12 h-12 border-4 border-[#FF8500]/20 border-t-[#FF8500] rounded-full animate-spin" />
            <p className="mt-4 text-gray-500">Analyse des modifications en cours...</p>
          </div>
        )}

        {/* Error state */}
        {error && !loading && hasSearched && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center"
          >
            <svg className="w-12 h-12 mx-auto text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={handleNewSearch}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Nouvelle recherche
            </button>
          </motion.div>
        )}

        {/* Version initiale */}
        {message && hasSearched && !loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-blue-50 border border-blue-200 rounded-2xl p-8 text-center"
          >
            <svg className="w-12 h-12 mx-auto text-blue-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-blue-600">{message}</p>
          </motion.div>
        )}

        {/* Résultats */}
        {data && !loading && versionPrecedente && (
          <>
            {/* Carte projet */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6"
            >
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-[#FF8500] rounded-full" />
                    <span className="text-xs text-gray-400 uppercase tracking-wide">CPTE ANALY</span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 font-mono">{data.code_division}</h2>
                </div>

                <div className="flex items-center gap-3">
                <div className="text-center px-5 py-2 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-400">Version précédente</p>
            
                </div>
                <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <div className="text-center px-5 py-2 bg-orange-50 rounded-xl">
                    <p className="text-xs text-orange-400">Version actuelle</p>
                </div>
                  <button
                    onClick={handleNewSearch}
                    className="ml-2 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Badge modifications */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#FF8500] rounded-full animate-pulse" />
                <span className="text-sm font-medium text-gray-700">
                  {totalModifications} modification{totalModifications > 1 ? "s" : ""} détectée{totalModifications > 1 ? "s" : ""}
                </span>
            
              </div>
            </motion.div>

            {/* Aucune modification */}
            {totalModifications === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center"
              >
                <svg className="w-16 h-16 mx-auto text-green-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-green-600 font-medium text-lg">Aucune différence détectée</p>
                <p className="text-gray-400 text-sm mt-1">Les deux versions sont identiques</p>
              </motion.div>
            ) : (
              <AnimatePresence>
                {groupedBySection.map(({ section, fields }) => (
                  <SectionBlock
                    key={section.key}
                    section={section}
                    fields={fields}
                    versionPrecedente={versionPrecedente}
                    versionActuelle={versionActuelle}
                  />
                ))}
              </AnimatePresence>
            )}
          </>
        )}

        {/* État initial */}
        {!hasSearched && !loading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center"
          >
            <svg className="w-20 h-20 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 20l-5.447-2.724A2 2 0 013 15.382V6.618a2 2 0 011.553-1.894l6-2a2 2 0 011.894 0l6 2A2 2 0 0119 6.618v8.764a2 2 0 01-1.447 1.894L15 18.5" />
            </svg>
            <h3 className="text-lg font-medium text-gray-600 mb-2">Comparaison de versions</h3>
            <p className="text-gray-400">Entrez un Cpte Analy pour voir les modifications pour un Projet</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProjetChampsModifiables;
