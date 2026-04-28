// Components/Projets/ProjetsLayout.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactComponent as SearchIcon } from '../../../../Assets/Icons/Search.svg';
import { ReactComponent as EyeIcon } from '../../../../Assets/Icons/eye-svgrepo-com.svg';

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
    onViewDetails
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
        { value: 'cloture', label: 'Clôturé' }
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
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
                                        ? `border-[#FF8500] shadow-lg ring-2 ring-[#FF8500]/20` 
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

                    {/* Statistiques */}
                    {stats && activeTab === 'termines' && (
                        <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                            <div className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-xl p-3 text-center">
                                <div className="text-2xl font-bold text-teal-700">{stats.total || 0}</div>
                                <div className="text-xs text-teal-600">Total projets</div>
                            </div>
                            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-3 text-center">
                                <div className="text-2xl font-bold text-green-700">{stats.valides_divisionnaire || 0}</div>
                                <div className="text-xs text-green-600">Validés</div>
                            </div>
                            <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-3 text-center">
                                <div className="text-2xl font-bold text-red-700">{stats.rejetes || 0}</div>
                                <div className="text-xs text-red-600">Rejetés</div>
                            </div>
                            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-3 text-center">
                                <div className="text-2xl font-bold text-blue-700">{Object.keys(stats.par_region || {}).length}</div>
                                <div className="text-xs text-blue-600">Régions</div>
                            </div>
                        </div>
                    )}

                    {/* Filtres */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="h-[43px] px-4 rounded-[20px] border-2 border-[#D9E1E7] outline-none focus:border-[#FF8500] bg-white text-sm"
                        >
                            {typesProjet.map(type => (
                                <option key={type.value} value={type.value}>{type.label}</option>
                            ))}
                        </select>

                        <select
                            value={selectedStatut}
                            onChange={(e) => setSelectedStatut(e.target.value)}
                            className="h-[43px] px-4 rounded-[20px] border-2 border-[#D9E1E7] outline-none focus:border-[#FF8500] bg-white text-sm"
                        >
                            {statutOptions.map(statut => (
                                <option key={statut.value} value={statut.value}>{statut.label}</option>
                            ))}
                        </select>

                        <select
                            value={selectedRegion}
                            onChange={(e) => setSelectedRegion(e.target.value)}
                            className="h-[43px] px-4 rounded-[20px] border-2 border-[#D9E1E7] outline-none focus:border-[#FF8500] bg-white text-sm"
                        >
                            <option value="">Toutes les régions</option>
                            {regions.map(region => (
                                <option key={region._id} value={region._id}>{region.nom_region}</option>
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

                    <div className="mb-4 text-sm text-gray-500">
                        {projets.length} projet(s) trouvé(s)
                    </div>

                    {/* Tableau */}
                    <div className="rounded-xl border border-gray-100 overflow-x-auto">
                        <table className="w-full min-w-[800px]">
                            <thead>
                                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600">Code Division</th>
                                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600">Libellé</th>
                                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600">Région</th>
                                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600">Activité</th>
                                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600">Coût Global</th>
                                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600">Statut</th>
                                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600">Actions</th>
                                    {showValidationColumn && canShowValidationActions && (
                                        <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600">Validation</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={showValidationColumn && canShowValidationActions ? 8 : 7} className="py-12 text-center">
                                            <div className="flex justify-center">
                                                <div className="w-8 h-8 border-3 border-[#FF8500] border-t-transparent rounded-full animate-spin" />
                                            </div>
                                            <p className="text-xs text-gray-400 mt-2">Chargement...</p>
                                        </td>
                                    </tr>
                                ) : projets.length === 0 ? (
                                    <tr>
                                        <td colSpan={showValidationColumn && canShowValidationActions ? 8 : 7} className="py-12 text-center">
                                            <svg className="w-16 h-16 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            <p className="text-gray-500">Aucun projet trouvé</p>
                                        </td>
                                    </tr>
                                ) : (
                                    <AnimatePresence>
                                        {projets.map((projet, index) => (
                                            <motion.tr 
                                                key={projet.id || projet.code_division}
                                                custom={index}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 20 }}
                                                transition={{ delay: index * 0.03, duration: 0.2 }}
                                                className="border-b border-gray-100 hover:bg-[#FFF9F0] transition-colors duration-150"
                                            >
                                                <td className="py-3 px-4">
                                                    <span className="font-mono text-sm font-medium">{projet.code_division}</span>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <div className="text-sm font-medium text-gray-800">{projet.libelle}</div>
                                                    <div className="text-xs text-gray-400 mt-0.5">
                                                        {projet.type_projet === 'nouveau' ? '🆕 Nouveau' : '🔄 En cours'}
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4 text-sm text-gray-600">
                                                    {projet.region_nom || getRegionNom(projet.region_id) || '-'}
                                                </td>
                                                <td className="py-3 px-4 text-sm text-gray-600">
                                                    {projet.activite_nom || projet.activite || '-'}
                                                </td>
                                                <td className="py-3 px-4">
                                                    <div className="text-sm font-bold text-gray-800">
                                                        {getBudgetTotal(projet).toLocaleString()} DA
                                                    </div>
                                                    {projet.cout_initial_dont_dex && (
                                                        <div className="text-xs text-orange-500">
                                                            DEV {parseFloat(projet.cout_initial_dont_dex).toLocaleString()} DA
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="py-3 px-4">{getStatutBadge(projet.statut)}</td>
                                                <td className="py-3 px-4">
                                                    {/* Bouton Voir Détails (œil) */}
                                                    <button
                                                        onClick={() => onViewDetails(projet)}
                                                        className="p-1.5 hover:bg-green-50 rounded-full transition"
                                                        title="Consulter les détails"
                                                    >
                                                        <EyeIcon className="w-4 h-4 text-gray-500 hover:text-green-500" />
                                                    </button>
                                                </td>
                                                {showValidationColumn && canShowValidationActions && (
                                                    <td className="py-3 px-4">
                                                        {validationActions && validationActions(projet)}
                                                    </td>
                                                )}
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <style jsx>{`
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
            `}</style>
        </div>
    );
};

export default ProjetsLayout;