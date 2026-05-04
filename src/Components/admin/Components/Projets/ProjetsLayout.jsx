// // import React, { useState } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { ReactComponent as SearchIcon } from '../../../../Assets/Icons/Search.svg';
// // import { ReactComponent as EyeIcon } from '../../../../Assets/Icons/eye-svgrepo-com.svg';

// // // Icônes SVG pour les onglets
// // const TabIcon = ({ type }) => {
// //     const icons = {
// //         aTraiter: (
// //             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
// //                 <path d="M22 12h-4l-3 9-4-18-3 9H2" />
// //             </svg>
// //         ),
// //         valides: (
// //             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
// //                 <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
// //                 <polyline points="22 4 12 14.01 9 11.01" />
// //             </svg>
// //         ),
// //         reserves: (
// //             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
// //                 <circle cx="12" cy="12" r="10" />
// //                 <polyline points="12 6 12 12 16 14" />
// //             </svg>
// //         ),
// //         tous: (
// //             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
// //                 <rect x="3" y="3" width="7" height="7" />
// //                 <rect x="14" y="3" width="7" height="7" />
// //                 <rect x="14" y="14" width="7" height="7" />
// //                 <rect x="3" y="14" width="7" height="7" />
// //             </svg>
// //         ),
// //         historique: (
// //             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
// //                 <circle cx="12" cy="12" r="10" />
// //                 <polyline points="12 6 12 12 16 14" />
// //                 <path d="M4 4 L8 8" />
// //             </svg>
// //         ),
// //         termines: (
// //             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
// //                 <path d="M9 12l2 2 4-4" />
// //                 <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
// //             </svg>
// //         ),
// //         rejetes: (
// //             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
// //                 <circle cx="12" cy="12" r="10" />
// //                 <line x1="18" y1="6" x2="6" y2="18" />
// //             </svg>
// //         ),
// //         soumis: (
// //             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
// //                 <path d="M22 2L11 13" />
// //                 <path d="M22 2l-7 20-4-9-9-4 20-7z" />
// //             </svg>
// //         ),
// //         brouillon: (
// //             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
// //                 <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
// //             </svg>
// //         )
// //     };
    
// //     return icons[type] || icons.aTraiter;
// // };

// // const ProjetsLayout = ({
// //     title,
// //     subtitle,
// //     tabs,
// //     projets,
// //     loading,
// //     searchTerm,
// //     setSearchTerm,
// //     selectedType,
// //     setSelectedType,
// //     selectedStatut,
// //     setSelectedStatut,
// //     selectedRegion,
// //     setSelectedRegion,
// //     regions,
// //     counts,
// //     stats,
// //     activeTab,
// //     setActiveTab,
// //     canShowValidationActions = false,
// //     getStatutBadge,
// //     getBudgetTotal,
// //     getRegionNom,
// //     validationActions,
// //     showValidationColumn = true,
// //     onViewDetails,
// //     onViewHistory,
// //     entiteType = 'region',
// //     getEntiteNom = null,
// //     customColumns = null,
// //     customRenderRow = null
// // }) => {
// //     const [hoveredCard, setHoveredCard] = useState(null);

// //     const typesProjet = [
// //         { value: 'tous', label: 'Tous' },
// //         { value: 'nouveau', label: '🆕 Nouveau Projet' },
// //         { value: 'en_cours', label: '🔄 Projet en Cours' }
// //     ];

// //     const statutOptions = [
// //         { value: 'tous', label: 'Tous les statuts' },
// //         { value: 'valide_directeur', label: 'Validé Directeur' },
// //         { value: 'valide_divisionnaire', label: 'Validé Divisionnaire' },
// //         { value: 'rejete', label: 'Rejeté' },
// //         { value: 'cloture', label: 'Clôturé' }
// //     ];

// //     const cardVariants = {
// //         hidden: { opacity: 0, y: 30, scale: 0.95 },
// //         visible: (i) => ({
// //             opacity: 1,
// //             y: 0,
// //             scale: 1,
// //             transition: { delay: i * 0.05, duration: 0.4, type: "spring", stiffness: 200, damping: 20 }
// //         }),
// //         hover: {
// //             y: -8,
// //             scale: 1.02,
// //             transition: { type: "spring", stiffness: 400, damping: 15 }
// //         },
// //         tap: { scale: 0.98 }
// //     };

// //     const currentTab = tabs.find(t => t.id === activeTab);

// //     const getIconType = (tabId) => {
// //         if (tabId.includes('chefStatus') || tabId.includes('directeurStatus') || tabId.includes('agentStatus') || tabId === 'validesDR') return 'aTraiter';
// //         if (tabId === 'valides' || tabId === 'valides-directeur') return 'valides';
// //         if (tabId === 'reserveDirecteur' || tabId === 'reserveChef' || tabId === 'reserve') return 'reserves';
// //         if (tabId === 'tous') return 'tous';
// //         if (tabId === 'historique') return 'historique';
// //         if (tabId === 'termines') return 'termines';
// //         if (tabId === 'rejetes') return 'rejetes';
// //         if (tabId === 'soumis') return 'soumis';
// //         if (tabId === 'brouillon') return 'brouillon';
// //         return 'aTraiter';
// //     };

// //     const getEntiteLabel = () => {
// //         return entiteType === 'region' ? 'Région' : 'Direction';
// //     };

// //     const getEntiteValue = (projet) => {
// //         if (customRenderRow) return null;
        
// //         if (getEntiteNom) {
// //             return getEntiteNom(projet);
// //         }
        
// //         if (entiteType === 'region') {
// //             return projet.region_nom || getRegionNom(projet.region_id) || '-';
// //         } else {
// //             return projet.direction_nom || projet.direction || '-';
// //         }
// //     };

// //     // Modification des largeurs des colonnes
// //     const defaultColumns = [
// //         { key: 'code_division', label: 'Code Division', width: 'w-24' },
// //         { key: 'libelle', label: 'Libellé', width: 'w-56' },
// //         { key: 'entite', label: getEntiteLabel(), width: 'w-28' },
// //         { key: 'activite', label: 'Activité', width: 'w-28' },
// //         { key: 'cout', label: 'Coût Global', width: 'w-36' },
// //         { key: 'statut', label: 'Statut', width: 'w-40' },
// //         { key: 'actions', label: 'Actions', width: 'w-24' }
// //     ];

// //     if (showValidationColumn && canShowValidationActions) {
// //         defaultColumns.push({ key: 'validation', label: 'Validation', width: 'w-32' });
// //     }

// //     const columns = customColumns || defaultColumns;

// //     const styles = `
// //         @keyframes pulse {
// //             0%, 100% { opacity: 1; }
// //             50% { opacity: 0.5; }
// //         }
// //         .animate-pulse {
// //             animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
// //         }
// //         .line-clamp-2 {
// //             display: -webkit-box;
// //             -webkit-line-clamp: 2;
// //             -webkit-box-orient: vertical;
// //             overflow: hidden;
// //         }
// //     `;

// //     return (
// //         <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
// //             <style>{styles}</style>
            
// //             <motion.div 
// //                 initial={{ opacity: 0, y: -20 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 transition={{ duration: 0.5 }}
// //                 className="bg-white border-b border-gray-200 sticky top-0 z-10 backdrop-blur-sm bg-white/95"
// //             >
// //                 <div className="px-8 py-6">
// //                     <div className="flex items-center justify-between">
// //                         <div>
// //                             <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
// //                             <p className="text-gray-500 mt-1">{subtitle}</p>
// //                         </div>
// //                         {loading && (
// //                             <div className="flex items-center gap-2">
// //                                 <div className="w-2 h-2 bg-[#FF8500] rounded-full animate-pulse" />
// //                                 <span className="text-sm text-gray-500">Chargement...</span>
// //                             </div>
// //                         )}
// //                     </div>
// //                 </div>
// //             </motion.div>

// //             <div className="p-8">
// //                 <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 p-6">
                    
// //                     {/* Cartes Onglets */}
// //                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
// //                         {tabs.map((tab, index) => (
// //                             <motion.div
// //                                 key={tab.id}
// //                                 custom={index}
// //                                 variants={cardVariants}
// //                                 initial="hidden"
// //                                 animate="visible"
// //                                 whileHover="hover"
// //                                 whileTap="tap"
// //                                 onHoverStart={() => setHoveredCard(tab.id)}
// //                                 onHoverEnd={() => setHoveredCard(null)}
// //                                 onClick={() => setActiveTab(tab.id)}
// //                                 className={`
// //                                     relative bg-white rounded-xl shadow-md overflow-hidden cursor-pointer
// //                                     transition-all duration-300 border
// //                                     ${activeTab === tab.id 
// //                                         ? 'border-[#FF8500] shadow-lg ring-2 ring-[#FF8500]/20' 
// //                                         : 'border-gray-200 hover:shadow-lg'
// //                                     }
// //                                 `}
// //                             >
// //                                 <motion.div 
// //                                     className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
// //                                     animate={{ x: hoveredCard === tab.id ? '100%' : '-100%' }}
// //                                     transition={{ duration: 0.6, ease: "easeInOut" }}
// //                                 />
// //                                 <div className="relative p-4">
// //                                     <div className="flex items-center justify-between mb-2">
// //                                         <div className={`p-2 rounded-xl transition-all duration-300
// //                                             ${activeTab === tab.id ? 'bg-[#FF8500]/10 text-[#FF8500]' : 'bg-gray-100 text-gray-500'}
// //                                         `}>
// //                                             <TabIcon type={getIconType(tab.id)} />
// //                                         </div>
// //                                         <span className={`px-2 py-0.5 rounded-full text-xs font-bold
// //                                             ${activeTab === tab.id 
// //                                                 ? 'bg-[#FF8500] text-white' 
// //                                                 : 'bg-gray-100 text-gray-600'
// //                                             }`}
// //                                         >
// //                                             {counts[tab.id] || 0}
// //                                         </span>
// //                                     </div>
// //                                     <h3 className={`text-sm font-semibold ${activeTab === tab.id ? 'text-[#FF8500]' : 'text-gray-800'}`}>
// //                                         {tab.label}
// //                                     </h3>
// //                                     <p className="text-xs text-gray-400 mt-1 line-clamp-2">{tab.description}</p>
// //                                 </div>
// //                             </motion.div>
// //                         ))}
// //                     </div>

// //                     {/* Description onglet actif */}
// //                     {currentTab && (
// //                         <div className="mb-4 p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-100">
// //                             <p className="text-sm text-gray-600">
// //                                 <span className="font-semibold text-[#FF8500]">{currentTab.label}</span> : {currentTab.description}
// //                             </p>
// //                         </div>
// //                     )}

// //                     {/* Statistiques */}
// //                     {stats && activeTab === 'termines' && (
// //                         <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-3">
// //                             <div className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-xl p-3 text-center">
// //                                 <div className="text-2xl font-bold text-teal-700">{stats.total || 0}</div>
// //                                 <div className="text-xs text-teal-600">Total projets</div>
// //                             </div>
// //                             <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-3 text-center">
// //                                 <div className="text-2xl font-bold text-green-700">{stats.valides_divisionnaire || 0}</div>
// //                                 <div className="text-xs text-green-600">Validés</div>
// //                             </div>
// //                             <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-3 text-center">
// //                                 <div className="text-2xl font-bold text-red-700">{stats.rejetes || 0}</div>
// //                                 <div className="text-xs text-red-600">Rejetés</div>
// //                             </div>
// //                             <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-3 text-center">
// //                                 <div className="text-2xl font-bold text-blue-700">{Object.keys(stats.par_region || {}).length}</div>
// //                                 <div className="text-xs text-blue-600">{entiteType === 'region' ? 'Régions' : 'Directions'}</div>
// //                             </div>
// //                         </div>
// //                     )}

// //                     {/* Filtres */}
// //                     <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
// //                         <select
// //                             value={selectedType}
// //                             onChange={(e) => setSelectedType(e.target.value)}
// //                             className="h-[43px] px-4 rounded-[20px] border-2 border-[#D9E1E7] outline-none focus:border-[#FF8500] bg-white text-sm"
// //                         >
// //                             {typesProjet.map((type, idx) => (
// //                                 <option key={`type-${type.value}-${idx}`} value={type.value}>
// //                                     {type.label}
// //                                 </option>
// //                             ))}
// //                         </select>

// //                         <select
// //                             value={selectedStatut}
// //                             onChange={(e) => setSelectedStatut(e.target.value)}
// //                             className="h-[43px] px-4 rounded-[20px] border-2 border-[#D9E1E7] outline-none focus:border-[#FF8500] bg-white text-sm"
// //                         >
// //                             {statutOptions.map((statut, idx) => (
// //                                 <option key={`statut-${statut.value}-${idx}`} value={statut.value}>
// //                                     {statut.label}
// //                                 </option>
// //                             ))}
// //                         </select>

// //                         <select
// //                             value={selectedRegion}
// //                             onChange={(e) => setSelectedRegion(e.target.value)}
// //                             className="h-[43px] px-4 rounded-[20px] border-2 border-[#D9E1E7] outline-none focus:border-[#FF8500] bg-white text-sm"
// //                         >
// //                             <option key="all-regions" value="">
// //                                 {entiteType === 'region' ? 'Toutes les régions' : 'Toutes les directions'}
// //                             </option>
// //                             {regions.map((region, idx) => (
// //                                 <option 
// //                                     key={`region-${region._id || region.id || idx}`} 
// //                                     value={region._id || region.id}
// //                                 >
// //                                     {entiteType === 'region' ? region.nom_region : region.nom_direction}
// //                                 </option>
// //                             ))}
// //                         </select>

// //                         <div className="h-[43px] rounded-[20px] border-2 border-[#D9E1E7] hover:border-[#FF8500] focus-within:border-[#FF8500] transition-colors duration-200">
// //                             <div className="w-full h-full flex items-center px-4">
// //                                 <SearchIcon className="text-gray-400 w-4 h-4" />
// //                                 <input
// //                                     type="text"
// //                                     placeholder="Rechercher par code, libellé..."
// //                                     value={searchTerm}
// //                                     onChange={(e) => setSearchTerm(e.target.value)}
// //                                     className="w-full h-full border-0 outline-none px-3 text-sm"
// //                                 />
// //                             </div>
// //                         </div>
// //                     </div>

// //                     <div className="mb-4 text-sm text-gray-500">
// //                         {projets.length} projet(s) trouvé(s)
// //                     </div>

// //                     {/* Tableau */}


// // {/* Tableau */}
// // <div className="rounded-xl border border-gray-100 overflow-x-auto">
// //     <table className="w-full min-w-[800px] table-auto">
// //         <thead>
// //             <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
// //                 {columns.map(col => (
// //                     <th key={col.key} className="py-3 px-3 text-left text-xs font-semibold text-gray-600">
// //                         {col.label}
// //                     </th>
// //                 ))}
// //              </tr>
// //         </thead>
// //         <tbody>
// //             {loading ? (
// //                 <tr>
// //                     <td colSpan={columns.length} className="py-12 text-center">
// //                         <div className="flex justify-center">
// //                             <div className="w-8 h-8 border-3 border-[#FF8500] border-t-transparent rounded-full animate-spin" />
// //                         </div>
// //                         <p className="text-xs text-gray-400 mt-2">Chargement...</p>
// //                     </td>
// //                 </tr>
// //             ) : projets.length === 0 ? (
// //                 <tr>
// //                     <td colSpan={columns.length} className="py-12 text-center">
// //                         <svg className="w-16 h-16 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
// //                         </svg>
// //                         <p className="text-gray-500">Aucun projet trouvé</p>
// //                     </td>
// //                 </tr>
// //             ) : customRenderRow ? (
// //                 customRenderRow(projets)
// //             ) : (
// //                 <AnimatePresence>
// //                     {projets.map((projet, index) => {
// //                         const uniqueKey = projet.id || projet._id || `${projet.code_division}-${index}`;
// //                         return (
// //                             <motion.tr 
// //                                 key={uniqueKey}
// //                                 custom={index}
// //                                 initial={{ opacity: 0, x: -20 }}
// //                                 animate={{ opacity: 1, x: 0 }}
// //                                 exit={{ opacity: 0, x: 20 }}
// //                                 transition={{ delay: index * 0.03, duration: 0.2 }}
// //                                 className="border-b border-gray-100 hover:bg-[#FFF9F0] transition-colors duration-150"
// //                             >
// //                                 {/* Code Division */}
// //                                 <td className="py-3 px-3 align-middle">
// //                                     <span className="font-mono text-xs font-medium">{projet.code_division}</span>
// //                                 </td>
                                
// //                                 {/* Libellé */}
// //                                 <td className="py-3 px-3 align-middle">
// //                                     <div className="text-sm font-medium text-gray-800">{projet.libelle}</div>
// //                                     <div className="text-xs text-gray-400">
// //                                         {projet.type_projet === 'nouveau' ? '🆕 Nouveau' : '🔄 En cours'}
// //                                     </div>
// //                                 </td>
                                
// //                                 {/* Entité (Région/Direction) */}
// //                                 <td className="py-3 px-3 align-middle text-xs text-gray-600">
// //                                     {getEntiteValue(projet)}
// //                                 </td>
                                
// //                                 {/* Activité */}
// //                                 <td className="py-3 px-3 align-middle text-xs text-gray-600">
// //                                     {projet.activite_nom || projet.activite || '-'}
// //                                 </td>
                                
// //                                 {/* Coût Global */}
// //                                 <td className="py-3 px-3 align-middle">
// //                                     <div className="text-xs font-bold text-gray-800">
// //                                         {getBudgetTotal(projet).toLocaleString()} DA
// //                                     </div>
// //                                     {projet.cout_initial_dont_dex && (
// //                                         <div className="text-xs text-orange-500">
// //                                             DEV {parseFloat(projet.cout_initial_dont_dex).toLocaleString()} DA
// //                                         </div>
// //                                     )}
// //                                 </td>
                                
// //                                 {/* Statut */}
// //                                 <td className="py-3 px-3 align-middle">
// //                                     {getStatutBadge(projet)}
// //                                 </td>
                                
// //                                 {/* Actions */}
// //                                 <td className="py-3 px-3 align-middle">
// //                                     <div className="flex items-center gap-1">
// //                                         {onViewHistory && (
// //                                             <button
// //                                                 onClick={() => onViewHistory(projet)}
// //                                                 className="p-1 hover:bg-blue-50 rounded-full transition"
// //                                                 title="Historique"
// //                                             >
// //                                                 <svg className="w-4 h-4 text-gray-500 hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
// //                                                 </svg>
// //                                             </button>
// //                                         )}
// //                                         <button
// //                                             onClick={() => onViewDetails(projet)}
// //                                             className="p-1 hover:bg-green-50 rounded-full transition"
// //                                             title="Consulter"
// //                                         >
// //                                             <EyeIcon className="w-4 h-4 text-gray-500 hover:text-green-500" />
// //                                         </button>
// //                                     </div>
// //                                 </td>
                                
// //                                 {/* Validation */}
// //                                 {showValidationColumn && canShowValidationActions && (
// //                                     <td className="py-3 px-3 align-middle">
// //                                         {validationActions && validationActions(projet)}
// //                                     </td>
// //                                 )}
// //                             </motion.tr>
// //                         );
// //                     })}
// //                 </AnimatePresence>
// //             )}
// //         </tbody>
// //     </table>
// // </div>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default ProjetsLayout;
// // Components/Projets/ProjetsLayout.jsx
// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ReactComponent as SearchIcon } from '../../../../Assets/Icons/Search.svg';
// import { ReactComponent as EyeIcon } from '../../../../Assets/Icons/eye-svgrepo-com.svg';

// // Icônes SVG pour les onglets
// const TabIcon = ({ type }) => {
//     const icons = {
//         aTraiter: (
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M22 12h-4l-3 9-4-18-3 9H2" />
//             </svg>
//         ),
//         valides: (
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
//                 <polyline points="22 4 12 14.01 9 11.01" />
//             </svg>
//         ),
//         reserves: (
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//                 <circle cx="12" cy="12" r="10" />
//                 <polyline points="12 6 12 12 16 14" />
//             </svg>
//         ),
//         tous: (
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//                 <rect x="3" y="3" width="7" height="7" />
//                 <rect x="14" y="3" width="7" height="7" />
//                 <rect x="14" y="14" width="7" height="7" />
//                 <rect x="3" y="14" width="7" height="7" />
//             </svg>
//         ),
//         historique: (
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//                 <circle cx="12" cy="12" r="10" />
//                 <polyline points="12 6 12 12 16 14" />
//                 <path d="M4 4 L8 8" />
//             </svg>
//         ),
//         termines: (
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M9 12l2 2 4-4" />
//                 <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
//             </svg>
//         ),
//         rejetes: (
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//                 <circle cx="12" cy="12" r="10" />
//                 <line x1="18" y1="6" x2="6" y2="18" />
//             </svg>
//         ),
//         soumis: (
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M22 2L11 13" />
//                 <path d="M22 2l-7 20-4-9-9-4 20-7z" />
//             </svg>
//         ),
//         brouillon: (
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
//             </svg>
//         )
//     };
    
//     return icons[type] || icons.aTraiter;
// };

// const ProjetsLayout = ({
//     title,
//     subtitle,
//     tabs,
//     projets,
//     loading,
//     searchTerm,
//     setSearchTerm,
//     selectedType,
//     setSelectedType,
//     selectedStatut,
//     setSelectedStatut,
//     selectedRegion,
//     setSelectedRegion,
//     regions,
//     counts,
//     stats,
//     activeTab,
//     setActiveTab,
//     canShowValidationActions = false,
//     getStatutBadge,
//     getBudgetTotal,
//     getRegionNom,
//     validationActions,
//     showValidationColumn = true,
//     onViewDetails,
//     onViewHistory,
//     entiteType = 'region',     // 'region', 'direction', 'mixte'
//     entiteLabel = null,        // Label personnalisé (ex: "Entité", "Structure")
//     getEntiteNom = null,
//     customColumns = null,
//     customRenderRow = null,
//     customActionsButton = null 
// }) => {
//     const [hoveredCard, setHoveredCard] = useState(null);

//     const typesProjet = [
//         { value: 'tous', label: 'Tous' },
//         { value: 'nouveau', label: '🆕 Nouveau Projet' },
//         { value: 'en_cours', label: '🔄 Projet en Cours' }
//     ];

//     const statutOptions = [
//         { value: 'tous', label: 'Tous les statuts' },
//         { value: 'valide_directeur', label: 'Validé Directeur' },
//         { value: 'valide_divisionnaire', label: 'Validé Divisionnaire' },
//         { value: 'rejete', label: 'Rejeté' },
//         { value: 'cloture', label: 'Clôturé' }
//     ];

//     const cardVariants = {
//         hidden: { opacity: 0, y: 30, scale: 0.95 },
//         visible: (i) => ({
//             opacity: 1,
//             y: 0,
//             scale: 1,
//             transition: { delay: i * 0.05, duration: 0.4, type: "spring", stiffness: 200, damping: 20 }
//         }),
//         hover: {
//             y: -8,
//             scale: 1.02,
//             transition: { type: "spring", stiffness: 400, damping: 15 }
//         },
//         tap: { scale: 0.98 }
//     };

//     const currentTab = tabs.find(t => t.id === activeTab);

//     const getIconType = (tabId) => {
//         if (tabId.includes('chefStatus') || tabId.includes('directeurStatus') || tabId.includes('agentStatus') || tabId === 'validesDR') return 'aTraiter';
//         if (tabId === 'valides' || tabId === 'valides-directeur') return 'valides';
//         if (tabId === 'reserveDirecteur' || tabId === 'reserveChef' || tabId === 'reserve') return 'reserves';
//         if (tabId === 'tous') return 'tous';
//         if (tabId === 'historique') return 'historique';
//         if (tabId === 'termines') return 'termines';
//         if (tabId === 'rejetes') return 'rejetes';
//         if (tabId === 'soumis') return 'soumis';
//         if (tabId === 'brouillon') return 'brouillon';
//         return 'aTraiter';
//     };

//     // 🔥 Fonction pour obtenir le libellé de la colonne entité
//     const getEntiteLabel = () => {
//         if (entiteLabel) return entiteLabel;
//         if (entiteType === 'region') return 'Région';
//         if (entiteType === 'direction') return 'Direction';
//         return 'Entité';
//     };

//     // 🔥 Fonction pour obtenir la valeur de l'entité (nom région ou direction)
//     const getEntiteValue = (projet) => {
//         if (customRenderRow) return null;
        
//         if (getEntiteNom) {
//             return getEntiteNom(projet);
//         }
        
//         // Pour les rôles mixtes (Chef, Directeur National, Divisionnaire, Admin)
//         if (entiteType === 'mixte') {
//             if (projet.direction_region_nom) return projet.direction_region_nom;
//             if (projet.region_nom) return projet.region_nom;
//             if (projet.direction_nom) return projet.direction_nom;
//             return projet.region || projet.direction || '-';
//         }
        
//         if (entiteType === 'region') {
//             return projet.region_nom || getRegionNom(projet.region_id) || '-';
//         }
        
//         return projet.direction_nom || projet.direction || '-';
//     };

//     // Largeurs des colonnes
//     const defaultColumns = [
//         { key: 'code_division', label: 'Code Division', width: 'w-24' },
//         { key: 'libelle', label: 'Libellé', width: 'w-56' },
//         { key: 'entite', label: getEntiteLabel(), width: 'w-32' },
//         { key: 'activite', label: 'Activité', width: 'w-28' },
//         { key: 'cout', label: 'Coût Global', width: 'w-36' },
//         { key: 'statut', label: 'Statut', width: 'w-36' },
//         { key: 'actions', label: 'Actions', width: 'w-24' }
//     ];

//     if (showValidationColumn && canShowValidationActions) {
//         defaultColumns.push({ key: 'validation', label: 'Validation', width: 'w-36' });
//     }

//     const columns = customColumns || defaultColumns;

//     const styles = `
//         @keyframes pulse {
//             0%, 100% { opacity: 1; }
//             50% { opacity: 0.5; }
//         }
//         .animate-pulse {
//             animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
//         }
//         .line-clamp-2 {
//             display: -webkit-box;
//             -webkit-line-clamp: 2;
//             -webkit-box-orient: vertical;
//             overflow: hidden;
//         }
//     `;

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//             <style>{styles}</style>
            
//             <motion.div 
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="bg-white border-b border-gray-200 sticky top-0 z-10 backdrop-blur-sm bg-white/95"
//             >
//                 <div className="px-8 py-6">
//                     <div className="flex items-center justify-between">
//                         <div>
//                             <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
//                             <p className="text-gray-500 mt-1">{subtitle}</p>
//                         </div>
//                         {loading && (
//                             <div className="flex items-center gap-2">
//                                 <div className="w-2 h-2 bg-[#FF8500] rounded-full animate-pulse" />
//                                 <span className="text-sm text-gray-500">Chargement...</span>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </motion.div>

//             <div className="p-8">
//                 <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 p-6">
                    
//                     {/* Cartes Onglets */}
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
//                         {tabs.map((tab, index) => (
//                             <motion.div
//                                 key={tab.id}
//                                 custom={index}
//                                 variants={cardVariants}
//                                 initial="hidden"
//                                 animate="visible"
//                                 whileHover="hover"
//                                 whileTap="tap"
//                                 onHoverStart={() => setHoveredCard(tab.id)}
//                                 onHoverEnd={() => setHoveredCard(null)}
//                                 onClick={() => setActiveTab(tab.id)}
//                                 className={`
//                                     relative bg-white rounded-xl shadow-md overflow-hidden cursor-pointer
//                                     transition-all duration-300 border
//                                     ${activeTab === tab.id 
//                                         ? 'border-[#FF8500] shadow-lg ring-2 ring-[#FF8500]/20' 
//                                         : 'border-gray-200 hover:shadow-lg'
//                                     }
//                                 `}
//                             >
//                                 <motion.div 
//                                     className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
//                                     animate={{ x: hoveredCard === tab.id ? '100%' : '-100%' }}
//                                     transition={{ duration: 0.6, ease: "easeInOut" }}
//                                 />
//                                 <div className="relative p-4">
//                                     <div className="flex items-center justify-between mb-2">
//                                         <div className={`p-2 rounded-xl transition-all duration-300
//                                             ${activeTab === tab.id ? 'bg-[#FF8500]/10 text-[#FF8500]' : 'bg-gray-100 text-gray-500'}
//                                         `}>
//                                             <TabIcon type={getIconType(tab.id)} />
//                                         </div>
//                                         <span className={`px-2 py-0.5 rounded-full text-xs font-bold
//                                             ${activeTab === tab.id 
//                                                 ? 'bg-[#FF8500] text-white' 
//                                                 : 'bg-gray-100 text-gray-600'
//                                             }`}
//                                         >
//                                             {counts[tab.id] || 0}
//                                         </span>
//                                     </div>
//                                     <h3 className={`text-sm font-semibold ${activeTab === tab.id ? 'text-[#FF8500]' : 'text-gray-800'}`}>
//                                         {tab.label}
//                                     </h3>
//                                     <p className="text-xs text-gray-400 mt-1 line-clamp-2">{tab.description}</p>
//                                 </div>
//                             </motion.div>
//                         ))}
//                     </div>

//                     {/* Description onglet actif */}
//                     {currentTab && (
//                         <div className="mb-4 p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-100">
//                             <p className="text-sm text-gray-600">
//                                 <span className="font-semibold text-[#FF8500]">{currentTab.label}</span> : {currentTab.description}
//                             </p>
//                         </div>
//                     )}

//                     {/* Filtres */}
//                     <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//                         <select
//                             value={selectedType}
//                             onChange={(e) => setSelectedType(e.target.value)}
//                             className="h-[43px] px-4 rounded-[20px] border-2 border-[#D9E1E7] outline-none focus:border-[#FF8500] bg-white text-sm"
//                         >
//                             {typesProjet.map(type => (
//                                 <option key={type.value} value={type.value}>{type.label}</option>
//                             ))}
//                         </select>

//                         <select
//                             value={selectedStatut}
//                             onChange={(e) => setSelectedStatut(e.target.value)}
//                             className="h-[43px] px-4 rounded-[20px] border-2 border-[#D9E1E7] outline-none focus:border-[#FF8500] bg-white text-sm"
//                         >
//                             {statutOptions.map(statut => (
//                                 <option key={statut.value} value={statut.value}>{statut.label}</option>
//                             ))}
//                         </select>

//                         <select
//                             value={selectedRegion}
//                             onChange={(e) => setSelectedRegion(e.target.value)}
//                             className="h-[43px] px-4 rounded-[20px] border-2 border-[#D9E1E7] outline-none focus:border-[#FF8500] bg-white text-sm"
//                         >
//                             <option value="">{entiteType === 'region' ? 'Toutes les régions' : entiteType === 'direction' ? 'Toutes les directions' : 'Toutes les entités'}</option>
//                             {regions.map(region => (
//                                 <option key={region._id || region.id} value={region._id || region.id}>
//                                     {region.nom_region || region.nom_direction || region.nom}
//                                 </option>
//                             ))}
//                         </select>

//                         <div className="h-[43px] rounded-[20px] border-2 border-[#D9E1E7] hover:border-[#FF8500] focus-within:border-[#FF8500] transition-colors duration-200">
//                             <div className="w-full h-full flex items-center px-4">
//                                 <SearchIcon className="text-gray-400 w-4 h-4" />
//                                 <input
//                                     type="text"
//                                     placeholder="Rechercher par code, libellé..."
//                                     value={searchTerm}
//                                     onChange={(e) => setSearchTerm(e.target.value)}
//                                     className="w-full h-full border-0 outline-none px-3 text-sm"
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     {/* <div className="mb-4 text-sm text-gray-500">
//                         {projets.length} projet(s) trouvé(s)
//                     </div> */}
//    {/* 🔥 Ligne avec compteur et bouton personnalisé */}
//                     <div className="flex justify-between items-center mb-4">
//                         <div className="text-sm text-gray-500">
//                             {projets.length} projet(s) trouvé(s)
//                         </div>
//                         {customActionsButton && (
//                             <div>
//                                 {customActionsButton}
//                             </div>
//                         )}
//                     </div>
//                     {/* Tableau */}
//                     <div className="rounded-xl border border-gray-100 overflow-x-auto">
//                         <table className="w-full min-w-[800px] table-auto">
//                             <thead>
//                                 <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
//                                     {columns.map(col => (
//                                         <th key={col.key} className="py-3 px-3 text-left text-xs font-semibold text-gray-600">
//                                             {col.label}
//                                         </th>
//                                     ))}
//                                   </tr>
//                             </thead>
//                             <tbody>
//                                 {loading ? (
//                                     <tr>
//                                         <td colSpan={columns.length} className="py-12 text-center">
//                                             <div className="flex justify-center">
//                                                 <div className="w-8 h-8 border-3 border-[#FF8500] border-t-transparent rounded-full animate-spin" />
//                                             </div>
//                                             <p className="text-xs text-gray-400 mt-2">Chargement...</p>
//                                         </td>
//                                     </tr>
//                                 ) : projets.length === 0 ? (
//                                     <tr>
//                                         <td colSpan={columns.length} className="py-12 text-center">
//                                             <svg className="w-16 h-16 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                                             </svg>
//                                             <p className="text-gray-500">Aucun projet trouvé</p>
//                                         </td>
//                                     </tr>
//                                 ) : customRenderRow ? (
//                                     customRenderRow(projets)
//                                 ) : (
//                                     <AnimatePresence>
//                                         {projets.map((projet, index) => {
//                                             const uniqueKey = projet.id || projet._id || `${projet.code_division}-${index}`;
//                                             return (
//                                                 <motion.tr 
//                                                     key={uniqueKey}
//                                                     custom={index}
//                                                     initial={{ opacity: 0, x: -20 }}
//                                                     animate={{ opacity: 1, x: 0 }}
//                                                     exit={{ opacity: 0, x: 20 }}
//                                                     transition={{ delay: index * 0.03, duration: 0.2 }}
//                                                     className="border-b border-gray-100 hover:bg-[#FFF9F0] transition-colors duration-150"
//                                                 >
//                                                     <td className="py-3 px-3 align-middle">
//                                                         <span className="font-mono text-xs font-medium">{projet.code_division}</span>
//                                                     </td>
//                                                     <td className="py-3 px-3 align-middle">
//                                                         <div className="text-sm font-medium text-gray-800">{projet.libelle}</div>
//                                                         <div className="text-xs text-gray-400">
//                                                             {projet.type_projet === 'nouveau' ? '🆕 Nouveau' : '🔄 En cours'}
//                                                         </div>
//                                                     </td>
//                                                     <td className="py-3 px-3 align-middle text-xs text-gray-600">
//                                                         {getEntiteValue(projet)}
//                                                     </td>
//                                                     <td className="py-3 px-3 align-middle text-xs text-gray-600">
//                                                         {projet.activite_nom || projet.activite || '-'}
//                                                     </td>
//                                                     <td className="py-3 px-3 align-middle">
//                                                         <div className="text-xs font-bold text-gray-800">
//                                                             {getBudgetTotal(projet).toLocaleString()} DA
//                                                         </div>
//                                                         {projet.cout_initial_dont_dex > 0 && (
//                                                             <div className="text-xs text-orange-500">
//                                                                 DEV {parseFloat(projet.cout_initial_dont_dex).toLocaleString()} DA
//                                                             </div>
//                                                         )}
//                                                     </td>
//                                                     <td className="py-3 px-3 align-middle">
//                                                         {getStatutBadge(projet)}
//                                                     </td>
//                                                     {/* <td className="py-3 px-3 align-middle">
//                                                         <div className="flex items-center gap-1">
//                                                             {onViewHistory && (
//                                                                 <button
//                                                                     onClick={() => onViewHistory(projet)}
//                                                                     className="p-1 hover:bg-blue-50 rounded-full transition"
//                                                                     title="Historique"
//                                                                 >
//                                                                     <svg className="w-4 h-4 text-gray-500 hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                                                     </svg>
//                                                                 </button>
//                                                             )}
//                                                             <button
//                                                                 onClick={() => onViewDetails(projet)}
//                                                                 className="p-1 hover:bg-green-50 rounded-full transition"
//                                                                 title="Consulter"
//                                                             >
//                                                                 <EyeIcon className="w-4 h-4 text-gray-500 hover:text-green-500" />
//                                                             </button>
//                                                         </div>
//                                                     </td> */}
                                                
//                                                     {showValidationColumn && canShowValidationActions && (
//                                                         <td className="py-3 px-3 align-middle">
//                                                             {validationActions && validationActions(projet)}
//                                                         </td>
//                                                     )}
//                                                 </motion.tr>
//                                             );
//                                         })}
//                                     </AnimatePresence>
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProjetsLayout;
// Components/Projets/ProjetsLayout.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactComponent as SearchIcon } from '../../../../Assets/Icons/Search.svg';
import { ReactComponent as EyeIcon } from '../../../../Assets/Icons/eye-svgrepo-com.svg';
import { ReactComponent as EditIcon } from '../../../../Assets/Icons/edit.svg';

// Icônes SVG pour les onglets
const TabIcon = ({ type }) => {
    const icons = {
        aTraiter: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9-4-18-3 9H2" />
            </svg>
        ),
        valides: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
        ),
        reserves: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
            </svg>
        ),
        tous: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
            </svg>
        ),
        historique: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
                <path d="M4 4 L8 8" />
            </svg>
        ),
        termines: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12l2 2 4-4" />
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
            </svg>
        ),
        rejetes: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
        ),
        soumis: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13" />
                <path d="M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
        ),
        brouillon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
            </svg>
        )
    };
    
    return icons[type] || icons.aTraiter;
};

const ProjetsLayout = ({
    title,
    subtitle,
    tabs,
    projets,
    loading,
    searchTerm,
    setSearchTerm,
    selectedType,
    setSelectedType,
    selectedStatut,
    setSelectedStatut,
    selectedRegion,
    setSelectedRegion,
    regions,
    counts,
    stats,
    activeTab,
    setActiveTab,
    canShowValidationActions = false,
    getStatutBadge,
    getBudgetTotal,
    getRegionNom,
    validationActions,
    showValidationColumn = true,
    onViewDetails,
    onViewHistory,
    entiteType = 'region',
    entiteLabel = null,
    getEntiteNom = null,
    customColumns = null,
    customRenderRow = null,
    customActionsButton = null,
    // Nouvelles props pour la gestion conditionnelle du bouton Modifier
    userRole = null,           // 'admin', 'responsable_structure', 'responsable_departement'
    onEditProjet = null,       // Callback pour modifier
    showEditButton = true,     // Forcer l'affichage ou non du bouton modifier
}) => {
    const [hoveredCard, setHoveredCard] = useState(null);

    const typesProjet = [
        { value: 'tous', label: 'Tous' },
        { value: 'nouveau', label: '🆕 Nouveau Projet' },
        { value: 'en_cours', label: '🔄 Projet en Cours' }
    ];

    const statutOptions = [
        { value: 'tous', label: 'Tous les statuts' },
        { value: 'valide_directeur', label: 'Validé Directeur' },
        { value: 'valide_divisionnaire', label: 'Validé Divisionnaire' },
        { value: 'rejete', label: 'Rejeté' },
        { value: 'cloture', label: 'Clôturé' },
        { value: 'soumis', label: 'Soumis' }
    ];

    const cardVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { delay: i * 0.05, duration: 0.4, type: "spring", stiffness: 200, damping: 20 }
        }),
        hover: {
            y: -8,
            scale: 1.02,
            transition: { type: "spring", stiffness: 400, damping: 15 }
        },
        tap: { scale: 0.98 }
    };

    const currentTab = tabs.find(t => t.id === activeTab);

    const getIconType = (tabId) => {
        if (tabId.includes('chefStatus') || tabId.includes('directeurStatus') || tabId.includes('agentStatus') || tabId === 'validesDR') return 'aTraiter';
        if (tabId === 'valides' || tabId === 'valides-directeur') return 'valides';
        if (tabId === 'reserveDirecteur' || tabId === 'reserveChef' || tabId === 'reserve') return 'reserves';
        if (tabId === 'tous') return 'tous';
        if (tabId === 'historique') return 'historique';
        if (tabId === 'termines') return 'termines';
        if (tabId === 'rejetes') return 'rejetes';
        if (tabId === 'soumis') return 'soumis';
        if (tabId === 'brouillon') return 'brouillon';
        return 'aTraiter';
    };

    const getEntiteLabel = () => {
        if (entiteLabel) return entiteLabel;
        if (entiteType === 'region') return 'Région';
        if (entiteType === 'direction') return 'Direction';
        return 'Entité';
    };

    const getEntiteValue = (projet) => {
        if (customRenderRow) return null;
        
        if (getEntiteNom) {
            return getEntiteNom(projet);
        }
        
        if (entiteType === 'mixte') {
            if (projet.direction_region_nom) return projet.direction_region_nom;
            if (projet.region_nom) return projet.region_nom;
            if (projet.direction_nom) return projet.direction_nom;
            return projet.region || projet.direction || '-';
        }
        
        if (entiteType === 'region') {
            return projet.region_nom || getRegionNom(projet.region_id) || '-';
        }
        
        return projet.direction_nom || projet.direction || '-';
    };

    /**
     * Détermine si le bouton Modifier doit être affiché pour un projet
     * @param {Object} projet - Le projet à vérifier
     * @returns {boolean}
     */
    const canEdit = (projet) => {
        // Si showEditButton est explicitement false, cacher
        if (showEditButton === false) return false;
        
        // Si un callback onEditProjet n'est pas fourni, cacher
        if (!onEditProjet) return false;
        
        // Admin peut toujours modifier
        if (userRole === 'admin') return true;
        
        // Responsable structure ou département: modifier uniquement si statut = 'soumis'
        if (userRole === 'responsable_structure' || userRole === 'responsable_departement') {
            const projetStatut = projet.statut_workflow || projet.statut;
            return projetStatut === 'soumis';
        }
        
        // Par défaut, cacher
        return false;
    };

    const handleEdit = (projet) => {
        if (onEditProjet && canEdit(projet)) {
            onEditProjet(projet);
        }
    };

    const defaultColumns = [
        { key: 'code_division', label: 'cmpte Analy', width: 'w-24' },
        { key: 'libelle', label: 'Libellé', width: 'w-56' },
        { key: 'entite', label: getEntiteLabel(), width: 'w-32' },
        { key: 'activite', label: 'Activité', width: 'w-28' },
        { key: 'cout', label: 'Coût Global', width: 'w-36' },
        { key: 'statut', label: 'Statut', width: 'w-40' },
        { key: 'actions', label: 'Actions', width: 'w-28' }
    ];

    if (showValidationColumn && canShowValidationActions) {
        defaultColumns.push({ key: 'validation', label: 'Validation', width: 'w-36' });
    }

    const columns = customColumns || defaultColumns;

    const styles = `
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
        .animate-pulse {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
    `;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <style>{styles}</style>
            
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white border-b border-gray-200 sticky top-0 z-10 backdrop-blur-sm bg-white/95"
            >
                <div className="px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
                            <p className="text-gray-500 mt-1">{subtitle}</p>
                        </div>
                        {loading && (
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-[#FF8500] rounded-full animate-pulse" />
                                <span className="text-sm text-gray-500">Chargement...</span>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>

            <div className="p-8">
                <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 p-6">
                    
                    {/* Cartes Onglets */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                        {tabs.map((tab, index) => (
                            <motion.div
                                key={tab.id}
                                custom={index}
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                                whileHover="hover"
                                whileTap="tap"
                                onHoverStart={() => setHoveredCard(tab.id)}
                                onHoverEnd={() => setHoveredCard(null)}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                                    relative bg-white rounded-xl shadow-md overflow-hidden cursor-pointer
                                    transition-all duration-300 border
                                    ${activeTab === tab.id 
                                        ? 'border-[#FF8500] shadow-lg ring-2 ring-[#FF8500]/20' 
                                        : 'border-gray-200 hover:shadow-lg'
                                    }
                                `}
                            >
                                <motion.div 
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                    animate={{ x: hoveredCard === tab.id ? '100%' : '-100%' }}
                                    transition={{ duration: 0.6, ease: "easeInOut" }}
                                />
                                <div className="relative p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className={`p-2 rounded-xl transition-all duration-300
                                            ${activeTab === tab.id ? 'bg-[#FF8500]/10 text-[#FF8500]' : 'bg-gray-100 text-gray-500'}
                                        `}>
                                            <TabIcon type={getIconType(tab.id)} />
                                        </div>
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold
                                            ${activeTab === tab.id 
                                                ? 'bg-[#FF8500] text-white' 
                                                : 'bg-gray-100 text-gray-600'
                                            }`}
                                        >
                                            {counts[tab.id] || 0}
                                        </span>
                                    </div>
                                    <h3 className={`text-sm font-semibold ${activeTab === tab.id ? 'text-[#FF8500]' : 'text-gray-800'}`}>
                                        {tab.label}
                                    </h3>
                                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">{tab.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Description onglet actif */}
                    {currentTab && (
                        <div className="mb-4 p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-100">
                            <p className="text-sm text-gray-600">
                                <span className="font-semibold text-[#FF8500]">{currentTab.label}</span> : {currentTab.description}
                            </p>
                        </div>
                    )}

                    {/* Filtres */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="h-[43px] px-4 rounded-[20px] border-2 border-[#D9E1E7] outline-none focus:border-[#FF8500] bg-white text-sm"
                        >
                            {typesProjet.map((type, idx) => (
                                <option key={`type-${type.value}-${idx}`} value={type.value}>
                                    {type.label}
                                </option>
                            ))}
                        </select>

                        <select
                            value={selectedStatut}
                            onChange={(e) => setSelectedStatut(e.target.value)}
                            className="h-[43px] px-4 rounded-[20px] border-2 border-[#D9E1E7] outline-none focus:border-[#FF8500] bg-white text-sm"
                        >
                            {statutOptions.map((statut, idx) => (
                                <option key={`statut-${statut.value}-${idx}`} value={statut.value}>
                                    {statut.label}
                                </option>
                            ))}
                        </select>

                        <select
                            value={selectedRegion}
                            onChange={(e) => setSelectedRegion(e.target.value)}
                            className="h-[43px] px-4 rounded-[20px] border-2 border-[#D9E1E7] outline-none focus:border-[#FF8500] bg-white text-sm"
                        >
                            <option value="">{entiteType === 'region' ? 'Toutes les régions' : entiteType === 'direction' ? 'Toutes les directions' : 'Toutes les entités'}</option>
                            {regions.map((region, idx) => (
                                <option key={`region-${region._id || region.id || idx}`} value={region._id || region.id}>
                                    {region.nom_region || region.nom_direction || region.nom}
                                </option>
                            ))}
                        </select>

                        <div className="h-[43px] rounded-[20px] border-2 border-[#D9E1E7] hover:border-[#FF8500] focus-within:border-[#FF8500] transition-colors duration-200">
                            <div className="w-full h-full flex items-center px-4">
                                <SearchIcon className="text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Rechercher par code, libellé..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full h-full border-0 outline-none px-3 text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Ligne avec compteur et bouton personnalisé */}
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-sm text-gray-500">
                            {projets.length} projet(s) trouvé(s)
                        </div>
                        {customActionsButton && (
                            <div>
                                {customActionsButton}
                            </div>
                        )}
                    </div>

                    {/* Tableau */}
                    <div className="rounded-xl border border-gray-100 overflow-x-auto">
                        <table className="w-full min-w-[800px] table-auto">
                            <thead>
                                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                                    {columns.map((col, idx) => (
                                        <th key={`col-${col.key}-${idx}`} className="py-3 px-3 text-left text-xs font-semibold text-gray-600">
                                            {col.label}
                                        </th>
                                    ))}
                                  </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={columns.length} className="py-12 text-center">
                                            <div className="flex justify-center">
                                                <div className="w-8 h-8 border-3 border-[#FF8500] border-t-transparent rounded-full animate-spin" />
                                            </div>
                                            <p className="text-xs text-gray-400 mt-2">Chargement...</p>
                                        </td>
                                    </tr>
                                ) : projets.length === 0 ? (
                                    <tr>
                                        <td colSpan={columns.length} className="py-12 text-center">
                                            <svg className="w-16 h-16 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            <p className="text-gray-500">Aucun projet trouvé</p>
                                        </td>
                                    </tr>
                                ) : customRenderRow ? (
                                    customRenderRow(projets)
                                ) : (
                                    <AnimatePresence>
                                        {projets.map((projet, index) => {
                                            const uniqueKey = projet.id || projet._id || `${projet.code_division}-${index}`;
                                            const showEdit = canEdit(projet);
                                            
                                            return (
                                                <motion.tr 
                                                    key={uniqueKey}
                                                    custom={index}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: 20 }}
                                                    transition={{ delay: index * 0.03, duration: 0.2 }}
                                                    className="border-b border-gray-100 hover:bg-[#FFF9F0] transition-colors duration-150"
                                                >
                                                    <td className="py-3 px-3 align-middle">
                                                        <span className="font-mono text-xs font-medium">{projet.code_division}</span>
                                                    </td>
                                                    <td className="py-3 px-3 align-middle">
                                                        <div className="text-sm font-medium text-gray-800">{projet.libelle}</div>
                                                        <div className="text-xs text-gray-400">
                                                            {projet.type_projet === 'nouveau' ? '🆕 Nouveau' : '🔄 En cours'}
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-3 align-middle text-xs text-gray-600">
                                                        {getEntiteValue(projet)}
                                                    </td>
                                                    <td className="py-3 px-3 align-middle text-xs text-gray-600">
                                                        {projet.activite_nom || projet.activite || '-'}
                                                    </td>
                                                    <td className="py-3 px-3 align-middle">
                                                        <div className="text-xs font-bold text-gray-800">
                                                            {getBudgetTotal(projet).toLocaleString()} DA
                                                        </div>
                                                        {projet.cout_initial_dont_dex > 0 && (
                                                            <div className="text-xs text-orange-500">
                                                                DEV {parseFloat(projet.cout_initial_dont_dex).toLocaleString()} DA
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="py-3 px-3 align-middle">
                                                        {getStatutBadge(projet)}
                                                    </td>
                                                    <td className="py-3 px-3 align-middle">
                                                        <div className="flex items-center gap-2">
                                                            {/* Bouton Voir plus - toujours visible */}
                                                            {onViewDetails && (
                                                                <button
                                                                    onClick={() => onViewDetails(projet)}
                                                                    className="p-1.5 hover:bg-green-50 rounded-full transition"
                                                                    title="Voir les détails"
                                                                >
                                                                    <EyeIcon className="w-4 h-4 text-gray-500 hover:text-green-500" />
                                                                </button>
                                                            )}
                                                            
                                                            {/* Bouton Modifier - conditionnel selon rôle et statut */}
                                                            {showEdit && (
                                                                <button
                                                                    onClick={() => handleEdit(projet)}
                                                                    className="p-1.5 hover:bg-[#FF8500]/10 rounded-full transition"
                                                                    title={userRole === 'admin' ? "Modifier le projet" : "Modifier le projet (statut: soumis)"}
                                                                >
                                                                    <EditIcon className="w-4 h-4 text-gray-500 hover:text-[#FF8500]" />
                                                                </button>
                                                            )}
                                                            
                                                            {/* Bouton Historique - optionnel */}
                                                            {onViewHistory && (
                                                                <button
                                                                    onClick={() => onViewHistory(projet)}
                                                                    className="p-1.5 hover:bg-blue-50 rounded-full transition"
                                                                    title="Historique"
                                                                >
                                                                    <svg className="w-4 h-4 text-gray-500 hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                    </svg>
                                                                </button>
                                                            )}
                                                        </div>
                                                    </td>
                                                    {showValidationColumn && canShowValidationActions && (
                                                        <td className="py-3 px-3 align-middle">
                                                            {validationActions && validationActions(projet)}
                                                        </td>
                                                    )}
                                                </motion.tr>
                                            );
                                        })}
                                    </AnimatePresence>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjetsLayout;