// import React, { useState } from "react";
// import useDirectionFamille from "../../../../hooks/useDirectionFamille";

// const currentYear = new Date().getFullYear();

// const fmt = (val) =>
//   val != null ? Number(val).toLocaleString("fr-DZ") : "—";

// const baseColumns = [
//   { label: "Coût Global Initial", sub: `${currentYear + 1}/${currentYear + 5}`, key: "cout_initial_total" },
//   { label: "Réalisation Cumulée", sub: `${currentYear - 1}`, key: "realisation_cumul_n_mins1_total" },
//   { label: "Réalisation S1", sub: `${currentYear}`, key: "real_s1_n_total" },
//   { label: "Prévision S2", sub: `${currentYear}`, key: "prev_s2_n_total" },
//   { label: "Prévision Clôture", sub: `${currentYear}`, key: "prev_cloture_n_total" },
// ];

// // Sections du modal (avec dont_dex)
// const modalSections = [
//   {
//     title: "Coûts & Réalisations",
//     columns: [
//       { label: "Coût Global Initial", sub: `${currentYear + 1}/${currentYear + 5}`, type: "total", key: "cout_initial_total" },
//       { label: "Coût Global Initial", sub: `${currentYear + 1}/${currentYear + 5}`, type: "dont_dev", key: "cout_initial_dont_dex" },
//       { label: "Réalisation Cumulée", sub: `${currentYear - 1}`, type: "total", key: "realisation_cumul_n_mins1_total" },
//       { label: "Réalisation Cumulée", sub: `${currentYear - 1}`, type: "dont_dev", key: "realisation_cumul_n_mins1_dont_dex" },
//       { label: "Réalisation S1", sub: `${currentYear}`, type: "total", key: "real_s1_n_total" },
//       { label: "Réalisation S1", sub: `${currentYear}`, type: "dont_dev", key: "real_s1_n_dont_dex" },
//       { label: "Prévision S2", sub: `${currentYear}`, type: "total", key: "prev_s2_n_total" },
//       { label: "Prévision S2", sub: `${currentYear}`, type: "dont_dev", key: "prev_s2_n_dont_dex" },
//       { label: "Prévision Clôture", sub: `${currentYear}`, type: "total", key: "prev_cloture_n_total" },
//       { label: "Prévision Clôture", sub: `${currentYear}`, type: "dont_dev", key: "prev_cloture_n_dont_dex" },
//       { label: "Reste à Réaliser", sub: "", type: "total", key: "reste_a_realiser_total" },
//       { label: "Reste à Réaliser", sub: "", type: "dont_dev", key: "reste_a_realiser_dont_dex" },
//     ],
//   },
//   {
//     title: "Prévisions Futures",
//     columns: [
//       { label: "Prévision", sub: `${currentYear + 1}`, type: "total", key: "prev_n_plus1_total" },
//       { label: "Prévision", sub: `${currentYear + 1}`, type: "dont_dev", key: "prev_n_plus1_dont_dex" },
//       { label: "Prévision", sub: `${currentYear + 2}`, type: "total", key: "prev_n_plus2_total" },
//       { label: "Prévision", sub: `${currentYear + 2}`, type: "dont_dev", key: "prev_n_plus2_dont_dex" },
//       { label: "Prévision", sub: `${currentYear + 3}`, type: "total", key: "prev_n_plus3_total" },
//       { label: "Prévision", sub: `${currentYear + 3}`, type: "dont_dev", key: "prev_n_plus3_dont_dex" },
//       { label: "Prévision", sub: `${currentYear + 4}`, type: "total", key: "prev_n_plus4_total" },
//       { label: "Prévision", sub: `${currentYear + 4}`, type: "dont_dev", key: "prev_n_plus4_dont_dex" },
//       { label: "Prévision", sub: `${currentYear + 5}`, type: "total", key: "prev_n_plus5_total" },
//       { label: "Prévision", sub: `${currentYear + 5}`, type: "dont_dev", key: "prev_n_plus5_dont_dex" },
//     ],
//   },
//   {
//     title: `Détail Mensuel ${currentYear}`,
//     columns: [
//       { label: "Janvier", sub: "", type: "total", key: "janvier_total" },
//       { label: "Janvier", sub: "", type: "dont_dev", key: "janvier_dont_dex" },
//       { label: "Février", sub: "", type: "total", key: "fevrier_total" },
//       { label: "Février", sub: "", type: "dont_dev", key: "fevrier_dont_dex" },
//       { label: "Mars", sub: "", type: "total", key: "mars_total" },
//       { label: "Mars", sub: "", type: "dont_dev", key: "mars_dont_dex" },
//       { label: "Avril", sub: "", type: "total", key: "avril_total" },
//       { label: "Avril", sub: "", type: "dont_dev", key: "avril_dont_dex" },
//       { label: "Mai", sub: "", type: "total", key: "mai_total" },
//       { label: "Mai", sub: "", type: "dont_dev", key: "mai_dont_dex" },
//       { label: "Juin", sub: "", type: "total", key: "juin_total" },
//       { label: "Juin", sub: "", type: "dont_dev", key: "juin_dont_dex" },
//       { label: "Juillet", sub: "", type: "total", key: "juillet_total" },
//       { label: "Juillet", sub: "", type: "dont_dev", key: "juillet_dont_dex" },
//       { label: "Août", sub: "", type: "total", key: "aout_total" },
//       { label: "Août", sub: "", type: "dont_dev", key: "aout_dont_dex" },
//       { label: "Septembre", sub: "", type: "total", key: "septembre_total" },
//       { label: "Septembre", sub: "", type: "dont_dev", key: "septembre_dont_dex" },
//       { label: "Octobre", sub: "", type: "total", key: "octobre_total" },
//       { label: "Octobre", sub: "", type: "dont_dev", key: "octobre_dont_dex" },
//       { label: "Novembre", sub: "", type: "total", key: "novembre_total" },
//       { label: "Novembre", sub: "", type: "dont_dev", key: "novembre_dont_dex" },
//       { label: "Décembre", sub: "", type: "total", key: "decembre_total" },
//       { label: "Décembre", sub: "", type: "dont_dev", key: "decembre_dont_dex" },
//     ],
//   },
// ];

// // Modal Component pour Famille
// const FamilleModal = ({ famille, directionNom, onClose }) => {
//   if (!famille) return null;
  
//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center p-4"
//       style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
//       onClick={onClose}
//     >
//       <div
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-y-auto"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-2xl flex justify-between items-center z-10">
//           <div>
//             <p className="text-xs text-gray-400 uppercase tracking-wide">{directionNom}</p>
//             <h3 className="text-lg font-bold text-gray-800">Détails — Famille</h3>
//             <p className="text-[#FF8500] font-semibold text-base">{famille.famille_nom}</p>
//           </div>
//           <button onClick={onClose} className="text-gray-400 hover:bg-gray-100 rounded-full p-2 transition-colors">
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>

//         <div className="px-6 py-5 space-y-6">
//           {modalSections.map((section) => (
//             <div key={section.title}>
//               <div className="flex items-center gap-2 mb-3">
//                 <div className="w-1 h-5 bg-[#FF8500] rounded-full" />
//                 <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{section.title}</h4>
//               </div>
//               <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                 {section.columns.map((col) => (
//                   <div key={col.key} className="bg-[#FAFAFA] border border-gray-100 rounded-xl px-4 py-3 hover:border-[#FF8500]/30 hover:bg-[#FFF9F0] transition-colors">
//                     <p className="text-xs text-gray-400 mb-1">
//                       {col.label}{col.sub ? ` (${col.sub})` : ""}
//                       <br />
//                       <span className="text-[10px] text-gray-400">{col.type === "total" ? "total" : "dont dev"}</span>
//                     </p>
//                     <p className="text-sm font-semibold text-gray-800">{fmt(famille[col.key])}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="border-t border-gray-100 px-6 py-4 flex justify-end rounded-b-2xl">
//           <button onClick={onClose} className="px-5 py-2 rounded-lg bg-[#FF8500] text-white text-sm font-medium hover:bg-[#e07600] transition-colors">
//             Fermer
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Modal Component pour Total Global
// const TotalGlobalModal = ({ totalData, onClose }) => {
//   if (!totalData) return null;

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center p-4"
//       style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
//       onClick={onClose}
//     >
//       <div
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-y-auto"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-2xl flex justify-between items-center z-10">
//           <div>
//             <h3 className="text-lg font-bold text-gray-800">Détails — Total Global</h3>
//             <p className="text-[#FF8500] font-semibold text-base">Récapitulatif général</p>
//           </div>
//           <button onClick={onClose} className="text-gray-400 hover:bg-gray-100 rounded-full p-2 transition-colors">
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>

//         <div className="px-6 py-5 space-y-6">
//           {modalSections.map((section) => (
//             <div key={section.title}>
//               <div className="flex items-center gap-2 mb-3">
//                 <div className="w-1 h-5 bg-[#FF8500] rounded-full" />
//                 <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{section.title}</h4>
//               </div>
//               <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                 {section.columns.map((col) => (
//                   <div key={col.key} className="bg-[#FAFAFA] border border-gray-100 rounded-xl px-4 py-3 hover:border-[#FF8500]/30 hover:bg-[#FFF9F0] transition-colors">
//                     <p className="text-xs text-gray-400 mb-1">
//                       {col.label}{col.sub ? ` (${col.sub})` : ""}
//                       <br />
//                       <span className="text-[10px] text-gray-400">{col.type === "total" ? "total" : "dont dev"}</span>
//                     </p>
//                     <p className="text-sm font-semibold text-gray-800">{fmt(totalData[col.key])}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="border-t border-gray-100 px-6 py-4 flex justify-end rounded-b-2xl">
//           <button onClick={onClose} className="px-5 py-2 rounded-lg bg-[#FF8500] text-white text-sm font-medium hover:bg-[#e07600] transition-colors">
//             Fermer
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Modal Component pour Direction Detail
// const DirectionDetailModal = ({ direction, onClose }) => {
//   if (!direction) return null;

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center p-4"
//       style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
//       onClick={onClose}
//     >
//       <div
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-y-auto"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-2xl flex justify-between items-center z-10">
//           <div>
//             <h3 className="text-lg font-bold text-gray-800">Détails — Direction</h3>
//             <p className="text-[#FF8500] font-semibold text-base">{direction.direction_nom}</p>
//           </div>
//           <button onClick={onClose} className="text-gray-400 hover:bg-gray-100 rounded-full p-2 transition-colors">
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>

//         <div className="px-6 py-5 space-y-6">
//           {modalSections.map((section) => (
//             <div key={section.title}>
//               <div className="flex items-center gap-2 mb-3">
//                 <div className="w-1 h-5 bg-[#FF8500] rounded-full" />
//                 <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{section.title}</h4>
//               </div>
//               <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                 {section.columns.map((col) => (
//                   <div key={col.key} className="bg-[#FAFAFA] border border-gray-100 rounded-xl px-4 py-3 hover:border-[#FF8500]/30 hover:bg-[#FFF9F0] transition-colors">
//                     <p className="text-xs text-gray-400 mb-1">
//                       {col.label}{col.sub ? ` (${col.sub})` : ""}
//                       <br />
//                       <span className="text-[10px] text-gray-400">{col.type === "total" ? "total" : "dont dev"}</span>
//                     </p>
//                     <p className="text-sm font-semibold text-gray-800">{fmt(direction.total_direction?.[col.key])}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="border-t border-gray-100 px-6 py-4 flex justify-end rounded-b-2xl">
//           <button onClick={onClose} className="px-5 py-2 rounded-lg bg-[#FF8500] text-white text-sm font-medium hover:bg-[#e07600] transition-colors">
//             Fermer
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Direction Row (collapsible)
// const DirectionRow = ({ direction, onFamilleClick, onDirectionDetailClick }) => {
//   const [expanded, setExpanded] = useState(false);
  
//   // Vérification de sécurité
//   if (!direction) return null;
//   const familles = direction.familles || [];
//   const totalDirection = direction.total_direction || {};

//   return (
//     <React.Fragment>
//       <tr 
//         className="border-b border-gray-200 bg-[#FFF9F0] hover:bg-[#FFF4E0] cursor-pointer transition-colors" 
//         onClick={() => setExpanded(!expanded)}
//       >
//         <td className="py-2 px-4 align-middle">
//           <div className="flex items-center gap-2 min-h-[32px]">
//             <svg 
//               className={`w-4 h-4 text-[#FF8500] transition-transform duration-200 ${expanded ? "rotate-90" : ""}`} 
//               fill="none" 
//               stroke="currentColor" 
//               viewBox="0 0 24 24"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
//             </svg>
//             <div>
//               <div className="text-sm font-semibold text-gray-800">{direction.direction_nom || direction.direction}</div>
//               <div className="text-xs text-gray-400 mt-0.5">({familles.length} famille{familles.length !== 1 ? 's' : ''})</div>
//             </div>
//           </div>
//         </td>
//         {baseColumns.map((col) => (
//           <td key={col.key} className="py-2 px-4 align-middle text-center">
//             <span className="text-sm font-semibold text-gray-700">{fmt(totalDirection[col.key])}</span>
//           </td>
//         ))}
//         <td className="py-2 px-2 align-middle text-center">
//           <button 
//             onClick={(e) => {
//               e.stopPropagation();
//               onDirectionDetailClick(direction);
//             }}
//             className="inline-flex items-center justify-center w-7 h-7 text-[#FF8500] hover:bg-[#FFF4E8] rounded-full transition-colors"
//           >
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
//             </svg>
//           </button>
//         </td>
//       </tr>

//       {expanded && familles.map((f, i) => (
//         <tr key={i} className="border-b border-gray-100 bg-white hover:bg-[#FFF9F0] transition-colors">
//           <td className="py-1.5 pl-12 pr-4 align-middle">
//             <span className="text-[#FF8500] text-sm font-medium">{f.famille_nom}</span>
//           </td>
//           {baseColumns.map((col) => (
//             <td key={col.key} className="py-1.5 px-4 align-middle text-center">
//               <span className="text-sm text-gray-700">{fmt(f[col.key])}</span>
//             </td>
//           ))}
//           <td className="py-1.5 px-2 align-middle text-center">
//             <button 
//               onClick={() => onFamilleClick(f, direction.direction_nom)} 
//               className="inline-flex items-center justify-center w-7 h-7 text-[#FF8500] hover:bg-[#FFF4E8] rounded-full transition-colors"
//             >
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
//               </svg>
//             </button>
//           </td>
//         </tr>
//       ))}
//     </React.Fragment>
//   );
// };

// // Main Component
// const DirectionFamilleRecap = () => {
//   const { directions = [], totalGlobal = {}, loading, error } = useDirectionFamille();
//   const [selectedFamille, setSelectedFamille] = useState(null);
//   const [selectedDirection, setSelectedDirection] = useState("");
//   const [selectedDirectionDetail, setSelectedDirectionDetail] = useState(null);
//   const [showTotalModal, setShowTotalModal] = useState(false);

//   if (loading) {
//     return (
//       <div className="flex justify-center py-8">
//         <div className="w-8 h-8 border-4 border-[#FF8500] border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center p-10 text-red-400">
//         Erreur : {error}
//       </div>
//     );
//   }

//   // Vérification de sécurité
//   if (!directions || directions.length === 0) {
//     return (
//       <div className="text-center py-12 px-4">
//         <svg className="w-16 h-16 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 20l-5.447-2.724A2 2 0 013 15.382V6.618a2 2 0 011.553-1.894l6-2a2 2 0 011.894 0l6 2A2 2 0 0119 6.618v8.764a2 2 0 01-1.447 1.894L15 18.5" />
//         </svg>
//         <p className="text-gray-500 text-lg">Aucune donnée trouvée</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-semibold text-gray-800">Détail par Direction / Famille</h2>
//         <span className="text-sm text-gray-500">{directions.length} direction{directions.length !== 1 ? 's' : ''}</span>
//       </div>

//       <div className="overflow-x-auto rounded-lg border border-gray-100">
//         <table className="w-full table-fixed">
//           <thead>
//             <tr className="bg-gradient-to-r from-[#F9F9F9] to-[#F0F0F0] border-b border-[#E4E4E4]">
//               <th className="w-[20%] py-2 px-4 text-left text-sm font-semibold text-[#4A4A4A] rounded-tl-lg">Direction / Famille</th>
//               {baseColumns.map((col) => (
//                 <th key={col.key} className="w-[14%] py-2 px-4 text-center text-sm font-semibold text-[#4A4A4A]">
//                   {col.label}
//                   {col.sub && <><br /><span className="text-xs font-normal text-gray-400">{col.sub}</span></>}
//                 </th>
//               ))}
//               <th className="w-[8%] py-2 px-2 text-center text-sm font-semibold text-[#4A4A4A] rounded-tr-lg">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {directions.map((direction, i) => (
//               <DirectionRow 
//                 key={i} 
//                 direction={direction} 
//                 onFamilleClick={(f, nom) => { setSelectedFamille(f); setSelectedDirection(nom); }}
//                 onDirectionDetailClick={(direction) => setSelectedDirectionDetail(direction)}
//               />
//             ))}
//           </tbody>

//           <tfoot>
//             <tr className="border-t-2 border-[#FF8500]/30 bg-[#FFF9F0]">
//               <td className="py-2 px-4 align-middle">
//                 <span className="text-[#FF8500] text-sm font-semibold">Total Global</span>
//               </td>
//               {baseColumns.map((col) => (
//                 <td key={col.key} className="py-2 px-4 align-middle text-center">
//                   <span className="text-sm font-semibold text-[#FF8500]">{fmt(totalGlobal?.[col.key])}</span>
//                 </td>
//               ))}
//               <td className="py-2 px-2 align-middle text-center">
//                 <button onClick={() => setShowTotalModal(true)} className="inline-flex items-center justify-center w-7 h-7 text-[#FF8500] hover:bg-[#FFF4E8] rounded-full transition-colors">
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
//                   </svg>
//                 </button>
//               </td>
//             </tr>
//           </tfoot>
//         </table>

//         {directions.length === 0 && (
//           <div className="text-center py-12 px-4">
//             <svg className="w-16 h-16 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 20l-5.447-2.724A2 2 0 013 15.382V6.618a2 2 0 011.553-1.894l6-2a2 2 0 011.894 0l6 2A2 2 0 0119 6.618v8.764a2 2 0 01-1.447 1.894L15 18.5" />
//             </svg>
//             <p className="text-gray-500 text-lg">Aucune donnée trouvée</p>
//           </div>
//         )}
//       </div>

//       {selectedFamille && (
//         <FamilleModal famille={selectedFamille} directionNom={selectedDirection} onClose={() => { setSelectedFamille(null); setSelectedDirection(""); }} />
//       )}

//       {selectedDirectionDetail && (
//         <DirectionDetailModal direction={selectedDirectionDetail} onClose={() => setSelectedDirectionDetail(null)} />
//       )}

//       {showTotalModal && (
//         <TotalGlobalModal totalData={totalGlobal} onClose={() => setShowTotalModal(false)} />
//       )}
//     </div>
//   );
// };

// export default DirectionFamilleRecap;
import React, { useState } from "react";
import useDirectionFamille from "../../../../hooks/useDirectionFamille";

const currentYear = new Date().getFullYear();

const fmt = (val) =>
  val != null ? Number(val).toLocaleString("fr-DZ") : "—";

const baseColumns = [
  { label: "Coût Global Initial", sub: `${currentYear + 1}/${currentYear + 5}`, key: "cout_initial_total" },
  { label: "Réalisation Cumulée", sub: `${currentYear - 1}`, key: "realisation_cumul_n_mins1_total" },
  { label: "Réalisation S1", sub: `${currentYear}`, key: "real_s1_n_total" },
  { label: "Prévision S2", sub: `${currentYear}`, key: "prev_s2_n_total" },
  { label: "Prévision Clôture", sub: `${currentYear}`, key: "prev_cloture_n_total" },
];

// Sections du modal (avec dont_dex)
const modalSections = [
  {
    title: "Coûts & Réalisations",
    columns: [
      { label: "Coût Global Initial", sub: `${currentYear + 1}/${currentYear + 5}`, type: "total", key: "cout_initial_total" },
      { label: "Coût Global Initial", sub: `${currentYear + 1}/${currentYear + 5}`, type: "dont_dev", key: "cout_initial_dont_dex" },
      { label: "Réalisation Cumulée", sub: `${currentYear - 1}`, type: "total", key: "realisation_cumul_n_mins1_total" },
      { label: "Réalisation Cumulée", sub: `${currentYear - 1}`, type: "dont_dev", key: "realisation_cumul_n_mins1_dont_dex" },
      { label: "Réalisation S1", sub: `${currentYear}`, type: "total", key: "real_s1_n_total" },
      { label: "Réalisation S1", sub: `${currentYear}`, type: "dont_dev", key: "real_s1_n_dont_dex" },
      { label: "Prévision S2", sub: `${currentYear}`, type: "total", key: "prev_s2_n_total" },
      { label: "Prévision S2", sub: `${currentYear}`, type: "dont_dev", key: "prev_s2_n_dont_dex" },
      { label: "Prévision Clôture", sub: `${currentYear}`, type: "total", key: "prev_cloture_n_total" },
      { label: "Prévision Clôture", sub: `${currentYear}`, type: "dont_dev", key: "prev_cloture_n_dont_dex" },
      { label: "Reste à Réaliser", sub: "", type: "total", key: "reste_a_realiser_total" },
      { label: "Reste à Réaliser", sub: "", type: "dont_dev", key: "reste_a_realiser_dont_dex" },
    ],
  },
  {
    title: "Prévisions Futures",
    columns: [
      { label: "Prévision", sub: `${currentYear + 1}`, type: "total", key: "prev_n_plus1_total" },
      { label: "Prévision", sub: `${currentYear + 1}`, type: "dont_dev", key: "prev_n_plus1_dont_dex" },
      { label: "Prévision", sub: `${currentYear + 2}`, type: "total", key: "prev_n_plus2_total" },
      { label: "Prévision", sub: `${currentYear + 2}`, type: "dont_dev", key: "prev_n_plus2_dont_dex" },
      { label: "Prévision", sub: `${currentYear + 3}`, type: "total", key: "prev_n_plus3_total" },
      { label: "Prévision", sub: `${currentYear + 3}`, type: "dont_dev", key: "prev_n_plus3_dont_dex" },
      { label: "Prévision", sub: `${currentYear + 4}`, type: "total", key: "prev_n_plus4_total" },
      { label: "Prévision", sub: `${currentYear + 4}`, type: "dont_dev", key: "prev_n_plus4_dont_dex" },
      { label: "Prévision", sub: `${currentYear + 5}`, type: "total", key: "prev_n_plus5_total" },
      { label: "Prévision", sub: `${currentYear + 5}`, type: "dont_dev", key: "prev_n_plus5_dont_dex" },
    ],
  },
  {
    title: `Détail Mensuel ${currentYear}`,
    columns: [
      { label: "Janvier", sub: "", type: "total", key: "janvier_total" },
      { label: "Janvier", sub: "", type: "dont_dev", key: "janvier_dont_dex" },
      { label: "Février", sub: "", type: "total", key: "fevrier_total" },
      { label: "Février", sub: "", type: "dont_dev", key: "fevrier_dont_dex" },
      { label: "Mars", sub: "", type: "total", key: "mars_total" },
      { label: "Mars", sub: "", type: "dont_dev", key: "mars_dont_dex" },
      { label: "Avril", sub: "", type: "total", key: "avril_total" },
      { label: "Avril", sub: "", type: "dont_dev", key: "avril_dont_dex" },
      { label: "Mai", sub: "", type: "total", key: "mai_total" },
      { label: "Mai", sub: "", type: "dont_dev", key: "mai_dont_dex" },
      { label: "Juin", sub: "", type: "total", key: "juin_total" },
      { label: "Juin", sub: "", type: "dont_dev", key: "juin_dont_dex" },
      { label: "Juillet", sub: "", type: "total", key: "juillet_total" },
      { label: "Juillet", sub: "", type: "dont_dev", key: "juillet_dont_dex" },
      { label: "Août", sub: "", type: "total", key: "aout_total" },
      { label: "Août", sub: "", type: "dont_dev", key: "aout_dont_dex" },
      { label: "Septembre", sub: "", type: "total", key: "septembre_total" },
      { label: "Septembre", sub: "", type: "dont_dev", key: "septembre_dont_dex" },
      { label: "Octobre", sub: "", type: "total", key: "octobre_total" },
      { label: "Octobre", sub: "", type: "dont_dev", key: "octobre_dont_dex" },
      { label: "Novembre", sub: "", type: "total", key: "novembre_total" },
      { label: "Novembre", sub: "", type: "dont_dev", key: "novembre_dont_dex" },
      { label: "Décembre", sub: "", type: "total", key: "decembre_total" },
      { label: "Décembre", sub: "", type: "dont_dev", key: "decembre_dont_dex" },
    ],
  },
];

// Modal Component pour Famille
const FamilleModal = ({ famille, directionNom, onClose }) => {
  if (!famille) return null;
  
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-2xl flex justify-between items-center z-10">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">{directionNom}</p>
            <h3 className="text-lg font-bold text-gray-800">Détails — Famille</h3>
            <p className="text-[#FF8500] font-semibold text-base">{famille.famille_nom}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:bg-gray-100 rounded-full p-2 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-5 space-y-6">
          {modalSections.map((section) => (
            <div key={section.title}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-5 bg-[#FF8500] rounded-full" />
                <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{section.title}</h4>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {section.columns.map((col) => (
                  <div key={col.key} className="bg-[#FAFAFA] border border-gray-100 rounded-xl px-4 py-3 hover:border-[#FF8500]/30 hover:bg-[#FFF9F0] transition-colors">
                    <p className="text-xs text-gray-400 mb-1">
                      {col.label}{col.sub ? ` (${col.sub})` : ""}
                      <br />
                      <span className="text-[10px] text-gray-400">{col.type === "total" ? "total" : "dont dev"}</span>
                    </p>
                    <p className="text-sm font-semibold text-gray-800">{fmt(famille[col.key])}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 px-6 py-4 flex justify-end rounded-b-2xl">
          <button onClick={onClose} className="px-5 py-2 rounded-lg bg-[#FF8500] text-white text-sm font-medium hover:bg-[#e07600] transition-colors">
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

// Modal Component pour Total Global
const TotalGlobalModal = ({ totalData, onClose }) => {
  if (!totalData) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-2xl flex justify-between items-center z-10">
          <div>
            <h3 className="text-lg font-bold text-gray-800">Détails — Total Global</h3>
            <p className="text-[#FF8500] font-semibold text-base">Récapitulatif général</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:bg-gray-100 rounded-full p-2 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-5 space-y-6">
          {modalSections.map((section) => (
            <div key={section.title}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-5 bg-[#FF8500] rounded-full" />
                <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{section.title}</h4>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {section.columns.map((col) => (
                  <div key={col.key} className="bg-[#FAFAFA] border border-gray-100 rounded-xl px-4 py-3 hover:border-[#FF8500]/30 hover:bg-[#FFF9F0] transition-colors">
                    <p className="text-xs text-gray-400 mb-1">
                      {col.label}{col.sub ? ` (${col.sub})` : ""}
                      <br />
                      <span className="text-[10px] text-gray-400">{col.type === "total" ? "total" : "dont dev"}</span>
                    </p>
                    <p className="text-sm font-semibold text-gray-800">{fmt(totalData[col.key])}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 px-6 py-4 flex justify-end rounded-b-2xl">
          <button onClick={onClose} className="px-5 py-2 rounded-lg bg-[#FF8500] text-white text-sm font-medium hover:bg-[#e07600] transition-colors">
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

// Modal Component pour Direction Detail
const DirectionDetailModal = ({ direction, onClose }) => {
  if (!direction) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-2xl flex justify-between items-center z-10">
          <div>
            <h3 className="text-lg font-bold text-gray-800">Détails — Direction</h3>
            <p className="text-[#FF8500] font-semibold text-base">{direction.direction_nom}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:bg-gray-100 rounded-full p-2 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-5 space-y-6">
          {modalSections.map((section) => (
            <div key={section.title}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-5 bg-[#FF8500] rounded-full" />
                <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{section.title}</h4>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {section.columns.map((col) => (
                  <div key={col.key} className="bg-[#FAFAFA] border border-gray-100 rounded-xl px-4 py-3 hover:border-[#FF8500]/30 hover:bg-[#FFF9F0] transition-colors">
                    <p className="text-xs text-gray-400 mb-1">
                      {col.label}{col.sub ? ` (${col.sub})` : ""}
                      <br />
                      <span className="text-[10px] text-gray-400">{col.type === "total" ? "total" : "dont dev"}</span>
                    </p>
                    <p className="text-sm font-semibold text-gray-800">{fmt(direction.total_direction?.[col.key])}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 px-6 py-4 flex justify-end rounded-b-2xl">
          <button onClick={onClose} className="px-5 py-2 rounded-lg bg-[#FF8500] text-white text-sm font-medium hover:bg-[#e07600] transition-colors">
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

// Direction Row (collapsible)
const DirectionRow = ({ direction, onFamilleClick, onDirectionDetailClick }) => {
  const [expanded, setExpanded] = useState(false);
  
  // Vérification de sécurité
  if (!direction) return null;
  const familles = direction.familles || [];
  const totalDirection = direction.total_direction || {};

  return (
    <React.Fragment>
      <tr 
        className="border-b border-gray-200 bg-[#FFF9F0] hover:bg-[#FFF4E0] cursor-pointer transition-colors" 
        onClick={() => setExpanded(!expanded)}
      >
        <td className="py-2 px-4 align-middle">
          <div className="flex items-center gap-2 min-h-[32px]">
            <svg 
              className={`w-4 h-4 text-[#FF8500] transition-transform duration-200 ${expanded ? "rotate-90" : ""}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
            <div>
              <div className="text-sm font-semibold text-gray-800">{direction.direction_nom}</div>
              <div className="text-xs text-gray-400 mt-0.5">({familles.length} famille{familles.length !== 1 ? 's' : ''})</div>
            </div>
          </div>
        </td>
        {baseColumns.map((col) => (
          <td key={col.key} className="py-2 px-4 align-middle text-center">
            <span className="text-sm font-semibold text-gray-700">{fmt(totalDirection[col.key])}</span>
          </td>
        ))}
        <td className="py-2 px-2 align-middle text-center">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onDirectionDetailClick(direction);
            }}
            className="inline-flex items-center justify-center w-7 h-7 text-[#FF8500] hover:bg-[#FFF4E8] rounded-full transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </td>
      </tr>

      {expanded && familles.map((f, i) => (
        <tr key={i} className="border-b border-gray-100 bg-white hover:bg-[#FFF9F0] transition-colors">
          <td className="py-1.5 pl-12 pr-4 align-middle">
            <span className="text-[#FF8500] text-sm font-medium">{f.famille_nom}</span>
          </td>
          {baseColumns.map((col) => (
            <td key={col.key} className="py-1.5 px-4 align-middle text-center">
              <span className="text-sm text-gray-700">{fmt(f[col.key])}</span>
            </td>
          ))}
          <td className="py-1.5 px-2 align-middle text-center">
            <button 
              onClick={() => onFamilleClick(f, direction.direction_nom)} 
              className="inline-flex items-center justify-center w-7 h-7 text-[#FF8500] hover:bg-[#FFF4E8] rounded-full transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </td>
        </tr>
      ))}
    </React.Fragment>
  );
};

// Main Component
const DirectionFamilleRecap = () => {
  const { directions = [], totalGlobal = {}, loading, error } = useDirectionFamille();
  const [selectedFamille, setSelectedFamille] = useState(null);
  const [selectedDirection, setSelectedDirection] = useState("");
  const [selectedDirectionDetail, setSelectedDirectionDetail] = useState(null);
  const [showTotalModal, setShowTotalModal] = useState(false);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="w-8 h-8 border-4 border-[#FF8500] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-10 text-red-400">
        Erreur : {error}
      </div>
    );
  }

  // Vérification de sécurité
  if (!directions || directions.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <svg className="w-16 h-16 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 20l-5.447-2.724A2 2 0 013 15.382V6.618a2 2 0 011.553-1.894l6-2a2 2 0 011.894 0l6 2A2 2 0 0119 6.618v8.764a2 2 0 01-1.447 1.894L15 18.5" />
        </svg>
        <p className="text-gray-500 text-lg">Aucune donnée trouvée</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Détail par Direction / Famille</h2>
        <span className="text-sm text-gray-500">{directions.length} direction{directions.length !== 1 ? 's' : ''}</span>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-100">
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-gradient-to-r from-[#F9F9F9] to-[#F0F0F0] border-b border-[#E4E4E4]">
              <th className="w-[20%] py-2 px-4 text-left text-sm font-semibold text-[#4A4A4A] rounded-tl-lg">Direction / Famille</th>
              {baseColumns.map((col) => (
                <th key={col.key} className="w-[14%] py-2 px-4 text-center text-sm font-semibold text-[#4A4A4A]">
                  {col.label}
                  {col.sub && <><br /><span className="text-xs font-normal text-gray-400">{col.sub}</span></>}
                </th>
              ))}
              <th className="w-[8%] py-2 px-2 text-center text-sm font-semibold text-[#4A4A4A] rounded-tr-lg">Actions</th>
            </tr>
          </thead>

          <tbody>
            {directions.map((direction, i) => (
              <DirectionRow 
                key={i} 
                direction={direction} 
                onFamilleClick={(f, nom) => { setSelectedFamille(f); setSelectedDirection(nom); }}
                onDirectionDetailClick={(direction) => setSelectedDirectionDetail(direction)}
              />
            ))}
          </tbody>

          <tfoot>
            <tr className="border-t-2 border-[#FF8500]/30 bg-[#FFF9F0]">
              <td className="py-2 px-4 align-middle">
                <span className="text-[#FF8500] text-sm font-semibold">Total Global</span>
              </td>
              {baseColumns.map((col) => (
                <td key={col.key} className="py-2 px-4 align-middle text-center">
                  <span className="text-sm font-semibold text-[#FF8500]">{fmt(totalGlobal?.[col.key])}</span>
                </td>
              ))}
              <td className="py-2 px-2 align-middle text-center">
                <button onClick={() => setShowTotalModal(true)} className="inline-flex items-center justify-center w-7 h-7 text-[#FF8500] hover:bg-[#FFF4E8] rounded-full transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </td>
            </tr>
          </tfoot>
        </table>

        {directions.length === 0 && (
          <div className="text-center py-12 px-4">
            <svg className="w-16 h-16 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 20l-5.447-2.724A2 2 0 013 15.382V6.618a2 2 0 011.553-1.894l6-2a2 2 0 011.894 0l6 2A2 2 0 0119 6.618v8.764a2 2 0 01-1.447 1.894L15 18.5" />
            </svg>
            <p className="text-gray-500 text-lg">Aucune donnée trouvée</p>
          </div>
        )}
      </div>

      {selectedFamille && (
        <FamilleModal famille={selectedFamille} directionNom={selectedDirection} onClose={() => { setSelectedFamille(null); setSelectedDirection(""); }} />
      )}

      {selectedDirectionDetail && (
        <DirectionDetailModal direction={selectedDirectionDetail} onClose={() => setSelectedDirectionDetail(null)} />
      )}

      {showTotalModal && (
        <TotalGlobalModal totalData={totalGlobal} onClose={() => setShowTotalModal(false)} />
      )}
    </div>
  );
};

export default DirectionFamilleRecap;