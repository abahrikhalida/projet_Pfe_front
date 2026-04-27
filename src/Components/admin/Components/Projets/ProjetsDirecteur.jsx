// // Components/Projets/ProjetsDirecteur.jsx
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { axiosInstance } from '../../../../axios';
// import { ReactComponent as SearchIcon } from '../../../../Assets/Icons/Search.svg';
// import { ReactComponent as EyeIcon } from '../../../../Assets/Icons/eye-svgrepo-com.svg';
// import ValidationActions from './ValidationActions';
// import DetailsProjetModal from './DetailsProjetModal';
// import HistoriqueVersionsModal from './HistoriqueVersionsModal';
// import { useDataFilter } from '../../Components/comon/DataFilter';

// const ProjetsDirecteur = () => {
//     const [activeTab, setActiveTab] = useState('chefStatus');
//     const [projets, setProjets] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [selectedType, setSelectedType] = useState('tous');
//     const [selectedStatut, setSelectedStatut] = useState('tous');
//     const [selectedRegion, setSelectedRegion] = useState('');
//     const [regions, setRegions] = useState([]);
//     const [showDetailsModal, setShowDetailsModal] = useState(false);
//     const [showHistoryModal, setShowHistoryModal] = useState(false);
//     const [selectedProjet, setSelectedProjet] = useState(null);
//     const [showSuccess, setShowSuccess] = useState(false);
//     const [successMessage, setSuccessMessage] = useState('');
//     const [counts, setCounts] = useState({
//         chefStatus: 0,
//         valides: 0,
//         reserveDirecteur: 0,
//         tous: 0,
//         historique: 0
//     });

//     const { getUserInfo } = useDataFilter();
//     const userInfo = getUserInfo();

//     // Onglets pour Directeur (GET endpoints)
//     const tabs = [
//         { 
//             id: 'chefStatus', 
//             label: '📋 À Traiter', 
//             endpoint: '/recap/budget/directeur/valides-chef/', 
//             color: 'blue', 
//             description: 'Projets validés par Chef à traiter',
//             icon: '📋'
//         },
//         { 
//             id: 'valides', 
//             label: '✅ Validés', 
//             endpoint: '/recap/budget/directeur/valides/', 
//             color: 'green', 
//             description: 'Projets que vous avez déjà validés',
//             icon: '✅'
//         },
//         { 
//             id: 'reserveDirecteur', 
//             label: '🔄 Réservés', 
//             endpoint: '/recap/budget/directeur/reserve-directeur/', 
//             color: 'orange', 
//             description: 'Projets que vous avez réservés (retour Chef)',
//             icon: '🔄'
//         },
//         { 
//             id: 'tous', 
//             label: '📊 Tous', 
//             endpoint: '/recap/budget/directeur/tous/', 
//             color: 'purple', 
//             description: 'Tous les projets accessibles au Directeur',
//             icon: '📊'
//         },
//         { 
//             id: 'historique', 
//             label: '📜 Historique', 
//             endpoint: '/recap/budget/directeur/historique/', 
//             color: 'gray', 
//             description: 'Historique complet de tous les projets',
//             icon: '📜'
//         }
//     ];

//     const typesProjet = [
//         { value: 'tous', label: 'Tous' },
//         { value: 'nouveau', label: 'Nouveau Projet' },
//         { value: 'en_cours', label: 'Projet en Cours' }
//     ];

//     const statutOptions = [
//         { value: 'tous', label: 'Tous les statuts' },
//         { value: 'valide_chef', label: 'Validé Chef' },
//         { value: 'reserve_chef', label: 'Réservé Chef' },
//         { value: 'valide_directeur', label: 'Validé Directeur' },
//         { value: 'reserve_directeur', label: 'Réservé Directeur' },
//         { value: 'soumis', label: 'Soumis' },
//         { value: 'rejete', label: 'Rejeté' }
//     ];

//     useEffect(() => {
//         fetchRegions();
//         fetchProjets();
//     }, [activeTab]);

//     const fetchRegions = async () => {
//         try {
//             const response = await axiosInstance.get('/params/regions');
//             setRegions(response.data.data || []);
//         } catch (err) {
//             console.error("Erreur chargement régions:", err);
//         }
//     };

//     const fetchProjets = async () => {
//         setLoading(true);
//         try {
//             const currentTab = tabs.find(t => t.id === activeTab);
//             const endpoint = currentTab.endpoint;
            
//             console.log(`📡 Fetching Directeur projets: ${endpoint}`);
//             const response = await axiosInstance.get(endpoint);
            
//             let projetsData = [];
//             if (response.data && response.data.projets) {
//                 projetsData = response.data.projets;
//             } else if (response.data && response.data.data) {
//                 projetsData = response.data.data;
//             } else if (Array.isArray(response.data)) {
//                 projetsData = response.data;
//             }
            
//             setProjets(projetsData);
//             updateCounts();
//             console.log(`✅ Chargé ${projetsData.length} projets pour onglet ${activeTab}`);
//         } catch (err) {
//             console.error("Erreur chargement projets:", err);
//             setProjets([]);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const updateCounts = async () => {
//         const newCounts = {};
//         for (const tab of tabs) {
//             try {
//                 const response = await axiosInstance.get(tab.endpoint);
//                 let data = [];
//                 if (response.data && response.data.projets) {
//                     data = response.data.projets;
//                 } else if (response.data && response.data.data) {
//                     data = response.data.data;
//                 } else if (Array.isArray(response.data)) {
//                     data = response.data;
//                 }
//                 newCounts[tab.id] = data.length;
//             } catch (err) {
//                 newCounts[tab.id] = 0;
//             }
//         }
//         setCounts(newCounts);
//     };

//     const handleSuccess = (message) => {
//         setSuccessMessage(message);
//         setShowSuccess(true);
//         fetchProjets();
//         updateCounts();
//         setTimeout(() => setShowSuccess(false), 3000);
//     };

//     const getStatutBadge = (statut) => {
//         const statutConfig = {
//             brouillon: { label: 'Brouillon', color: '#9CA3AF', bg: 'bg-gray-100' },
//             soumis: { label: 'Soumis', color: '#3B82F6', bg: 'bg-blue-100' },
//             valide_directeur_region: { label: 'Validé DR', color: '#3B82F6', bg: 'bg-blue-100' },
//             valide_agent: { label: 'Validé Agent', color: '#8B5CF6', bg: 'bg-purple-100' },
//             reserve_agent: { label: 'Réservé Agent', color: '#F59E0B', bg: 'bg-amber-100' },
//             valide_chef: { label: 'Validé Chef', color: '#10B981', bg: 'bg-green-100' },
//             reserve_chef: { label: 'Réservé Chef', color: '#F59E0B', bg: 'bg-amber-100' },
//             valide_directeur: { label: 'Validé Directeur', color: '#EC4899', bg: 'bg-pink-100' },
//             reserve_directeur: { label: 'Réservé Directeur', color: '#F59E0B', bg: 'bg-amber-100' },
//             valide_divisionnaire: { label: 'Validé Divisionnaire', color: '#14B8A6', bg: 'bg-teal-100' },
//             rejete: { label: 'Rejeté', color: '#EF4444', bg: 'bg-red-100' },
//             cloture: { label: 'Clôturé', color: '#6B7280', bg: 'bg-gray-100' }
//         };
//         const config = statutConfig[statut] || { label: statut, color: '#6B7280', bg: 'bg-gray-100' };
//         return (
//             <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg}`} style={{ color: config.color }}>
//                 {config.label}
//             </span>
//         );
//     };

//     const getBudgetTotal = (projet) => {
//         if (projet.cout_initial_total) {
//             return parseFloat(projet.cout_initial_total);
//         }
//         const prevTotal = (parseFloat(projet.prev_n_plus2_total) || 0) +
//                          (parseFloat(projet.prev_n_plus3_total) || 0) +
//                          (parseFloat(projet.prev_n_plus4_total) || 0) +
//                          (parseFloat(projet.prev_n_plus5_total) || 0);
//         const mensuelTotal = (parseFloat(projet.prev_n_plus1_total) || 0);
//         return prevTotal + mensuelTotal;
//     };

//     const filteredProjets = projets.filter(projet => {
//         const search = searchTerm.toLowerCase();
//         const matchesSearch = 
//             (projet.code_division || '').toLowerCase().includes(search) ||
//             (projet.libelle || '').toLowerCase().includes(search) ||
//             (projet.activite || '').toLowerCase().includes(search);
        
//         const matchesType = selectedType === 'tous' || projet.type_projet === selectedType;
//         const matchesStatut = selectedStatut === 'tous' || projet.statut === selectedStatut;
//         const matchesRegion = !selectedRegion || projet.region_id === selectedRegion || projet.region === selectedRegion;
        
//         return matchesSearch && matchesType && matchesStatut && matchesRegion;
//     });

//     const tableRowVariants = {
//         hidden: { opacity: 0, x: -20 },
//         visible: (i) => ({
//             opacity: 1,
//             x: 0,
//             transition: { delay: i * 0.05, duration: 0.3 }
//         }),
//         exit: { opacity: 0, x: 20, transition: { duration: 0.2 } }
//     };

//     const currentTabInfo = tabs.find(t => t.id === activeTab);

//     // Déterminer si l'onglet actuel permet les actions de validation
//     const canShowValidationActions = () => {
//         return activeTab === 'chefStatus' || activeTab === 'reserveDirecteur';
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//             {/* En-tête */}
//             <motion.div 
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="bg-white border-b border-gray-200 sticky top-0 z-10"
//             >
//                 <div className="px-8 py-6">
//                     <h1 className="text-2xl font-bold text-gray-800">Tableau de bord - Directeur</h1>
//                     <p className="text-gray-500 mt-1">
//                         Gérez les projets à traiter, suivez vos validations et consultez l'historique
//                     </p>
//                 </div>
//             </motion.div>

//             <div className="p-8">
//                 <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 p-6">
                    
//                     {/* Onglets */}
//                     <div className="flex flex-wrap gap-2 mb-4 border-b border-gray-200 pb-4">
//                         {tabs.map(tab => (
//                             <button
//                                 key={tab.id}
//                                 onClick={() => setActiveTab(tab.id)}
//                                 className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2
//                                     ${activeTab === tab.id 
//                                         ? `bg-${tab.color === 'blue' ? 'blue' : 
//                                            tab.color === 'green' ? 'green' :
//                                            tab.color === 'orange' ? 'orange' :
//                                            tab.color === 'purple' ? 'purple' : 'gray'}-500 text-white shadow-md` 
//                                         : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                                     }`}
//                                 style={activeTab === tab.id ? {
//                                     backgroundColor: tab.color === 'blue' ? '#3B82F6' :
//                                                     tab.color === 'green' ? '#10B981' :
//                                                     tab.color === 'orange' ? '#F59E0B' :
//                                                     tab.color === 'purple' ? '#8B5CF6' : '#6B7280'
//                                 } : {}}
//                             >
//                                 <span>{tab.icon}</span>
//                                 {tab.label}
//                                 <span className={`px-2 py-0.5 rounded-full text-xs font-bold
//                                     ${activeTab === tab.id 
//                                         ? 'bg-white/20 text-white' 
//                                         : 'bg-gray-200 text-gray-600'
//                                     }`}
//                                 >
//                                     {counts[tab.id] || 0}
//                                 </span>
//                             </button>
//                         ))}
//                     </div>

//                     {/* Description de l'onglet actif */}
//                     <div className="mb-4 p-3 bg-gray-50 rounded-lg">
//                         <p className="text-sm text-gray-600">
//                             <span className="font-semibold">{currentTabInfo?.label}</span> : {currentTabInfo?.description}
//                         </p>
//                     </div>

//                     {/* Filtres */}
//                     <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//                         <select
//                             value={selectedType}
//                             onChange={(e) => setSelectedType(e.target.value)}
//                             className="h-[43px] px-4 rounded-[20px] border-2 border-[#D9E1E7] outline-none focus:border-[#FF8500] bg-white"
//                         >
//                             {typesProjet.map(type => (
//                                 <option key={type.value} value={type.value}>{type.label}</option>
//                             ))}
//                         </select>

//                         <select
//                             value={selectedStatut}
//                             onChange={(e) => setSelectedStatut(e.target.value)}
//                             className="h-[43px] px-4 rounded-[20px] border-2 border-[#D9E1E7] outline-none focus:border-[#FF8500] bg-white"
//                         >
//                             {statutOptions.map(statut => (
//                                 <option key={statut.value} value={statut.value}>{statut.label}</option>
//                             ))}
//                         </select>

//                         <select
//                             value={selectedRegion}
//                             onChange={(e) => setSelectedRegion(e.target.value)}
//                             className="h-[43px] px-4 rounded-[20px] border-2 border-[#D9E1E7] outline-none focus:border-[#FF8500] bg-white"
//                         >
//                             <option value="">Toutes les régions</option>
//                             {regions.map(region => (
//                                 <option key={region._id} value={region.code_region || region._id}>
//                                     {region.nom_region}
//                                 </option>
//                             ))}
//                         </select>

//                         <div className="h-[43px] rounded-[20px] border-2 border-[#D9E1E7] hover:border-[#FF8500] focus-within:border-[#FF8500] transition-colors duration-200">
//                             <div className="w-full h-full flex items-center px-4">
//                                 <SearchIcon className="text-gray-400" />
//                                 <input
//                                     type="text"
//                                     placeholder="Rechercher par code, libellé..."
//                                     value={searchTerm}
//                                     onChange={(e) => setSearchTerm(e.target.value)}
//                                     className="w-full h-full border-0 outline-none px-4 text-sm"
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     <div className="mb-4 text-sm text-gray-500">
//                         {filteredProjets.length} projet(s) trouvé(s)
//                     </div>

//                     {/* Tableau */}
//                     <div className="rounded-lg border border-gray-100 overflow-x-auto">
//                         <table className="w-full min-w-[1200px]">
//                             <thead>
//                                 <tr className="bg-gradient-to-r from-[#F9F9F9] to-[#F0F0F0] border-b border-[#E4E4E4]">
//                                     <th className="py-3 px-3 text-left text-xs font-semibold text-[#4A4A4A]">Code Division</th>
//                                     <th className="py-3 px-3 text-left text-xs font-semibold text-[#4A4A4A]">Libellé</th>
//                                     <th className="py-3 px-3 text-left text-xs font-semibold text-[#4A4A4A]">Région</th>
//                                     <th className="py-3 px-3 text-left text-xs font-semibold text-[#4A4A4A]">Structure</th>
//                                     <th className="py-3 px-3 text-left text-xs font-semibold text-[#4A4A4A]">Activité</th>
//                                     <th className="py-3 px-3 text-left text-xs font-semibold text-[#4A4A4A]">Coût Global</th>
//                                     <th className="py-3 px-3 text-left text-xs font-semibold text-[#4A4A4A]">Statut</th>
//                                     <th className="py-3 px-3 text-left text-xs font-semibold text-[#4A4A4A]">Actions</th>
//                                     {canShowValidationActions() && (
//                                         <th className="py-3 px-3 text-left text-xs font-semibold text-[#4A4A4A]">Validation</th>
//                                     )}
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {loading ? (
//                                     <tr>
//                                         <td colSpan={canShowValidationActions() ? 9 : 8} className="py-8 text-center">
//                                             <div className="flex justify-center">
//                                                 <div className="w-8 h-8 border-4 border-[#FF8500] border-t-transparent rounded-full animate-spin"></div>
//                                             </div>
//                                             <p className="text-xs text-gray-400 mt-2">Chargement...</p>
//                                         </td>
//                                     </tr>
//                                 ) : (
//                                     <AnimatePresence>
//                                         {filteredProjets.map((projet, index) => (
//                                             <motion.tr 
//                                                 key={projet.id || projet.code_division}
//                                                 custom={index}
//                                                 variants={tableRowVariants}
//                                                 initial="hidden"
//                                                 animate="visible"
//                                                 exit="exit"
//                                                 className="border-b border-gray-100 hover:bg-[#FFF9F0] transition-colors duration-150"
//                                             >
//                                                 <td className="py-3 px-3">
//                                                     <span className="font-mono text-sm font-medium">{projet.code_division}</span>
//                                                 </td>
//                                                 <td className="py-3 px-3">
//                                                     <div className="text-sm font-medium text-gray-800">{projet.libelle}</div>
//                                                     <div className="text-xs text-gray-400 mt-0.5">
//                                                         {projet.type_projet === 'nouveau' ? '🆕 Nouveau' : '🔄 En cours'}
//                                                     </div>
//                                                 </td>
//                                                 <td className="py-3 px-3 text-sm text-gray-600">{projet.region_nom || projet.region || '-'}</td>
//                                                 <td className="py-3 px-3 text-sm text-gray-600">{projet.structure_nom || projet.structure || '-'}</td>
//                                                 <td className="py-3 px-3 text-sm text-gray-600">{projet.activite_nom || projet.activite || '-'}</td>
//                                                 <td className="py-3 px-3">
//                                                     <div className="text-sm font-bold text-gray-800">
//                                                         {getBudgetTotal(projet).toLocaleString()} DA
//                                                     </div>
//                                                     {projet.cout_initial_dont_dex && (
//                                                         <div className="text-xs text-orange-600">
//                                                             DEX: {parseFloat(projet.cout_initial_dont_dex).toLocaleString()} DA
//                                                         </div>
//                                                     )}
//                                                 </td>
//                                                 <td className="py-3 px-3">{getStatutBadge(projet.statut)}</td>
//                                                 <td className="py-3 px-3">
//                                                     <div className="flex items-center gap-2">
//                                                         <motion.button
//                                                             whileHover={{ scale: 1.05 }}
//                                                             whileTap={{ scale: 0.95 }}
//                                                             onClick={() => { setSelectedProjet(projet); setShowHistoryModal(true); }}
//                                                             className="p-1.5 hover:bg-blue-50 rounded-full transition"
//                                                             title="Historique versions"
//                                                         >
//                                                             <svg className="w-4 h-4 text-gray-500 hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                                             </svg>
//                                                         </motion.button>
                                                        
//                                                         <motion.button
//                                                             whileHover={{ scale: 1.05 }}
//                                                             whileTap={{ scale: 0.95 }}
//                                                             onClick={() => { setSelectedProjet(projet); setShowDetailsModal(true); }}
//                                                             className="p-1.5 hover:bg-green-50 rounded-full transition"
//                                                             title="Consulter"
//                                                         >
//                                                             <EyeIcon className="w-4 h-4 text-gray-500 hover:text-green-500" />
//                                                         </motion.button>
//                                                     </div>
//                                                 </td>
//                                                 {canShowValidationActions() && (
//                                                     <td className="py-3 px-3">
//                                                         <ValidationActions 
//                                                             projet={projet} 
//                                                             onActionSuccess={handleSuccess}
//                                                         />
//                                                     </td>
//                                                 )}
//                                             </motion.tr>
//                                         ))}
//                                     </AnimatePresence>
//                                 )}
//                             </tbody>
//                         </table>

//                         {filteredProjets.length === 0 && !loading && (
//                             <div className="text-center py-12 px-4">
//                                 <svg className="w-16 h-16 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                                 </svg>
//                                 <p className="text-gray-500">Aucun projet dans cet onglet</p>
//                                 {activeTab === 'chefStatus' && (
//                                     <p className="text-sm text-gray-400 mt-2">
//                                         Les projets validés par le Chef apparaîtront ici
//                                     </p>
//                                 )}
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>

//             {/* Modals */}
//             <DetailsProjetModal
//                 isOpen={showDetailsModal}
//                 onClose={() => { setShowDetailsModal(false); setSelectedProjet(null); }}
//                 projet={selectedProjet}
//                 axiosInstance={axiosInstance}
//             />

//             <HistoriqueVersionsModal
//                 isOpen={showHistoryModal}
//                 onClose={() => { setShowHistoryModal(false); setSelectedProjet(null); }}
//                 projet={selectedProjet}
//                 axiosInstance={axiosInstance}
//             />

//             {/* Message succès */}
//             <AnimatePresence>
//                 {showSuccess && (
//                     <motion.div 
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: 20 }}
//                         className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-lg shadow-xl z-50 text-sm font-medium"
//                     >
//                         ✅ {successMessage}
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </div>
//     );
// };

// export default ProjetsDirecteur;
// Components/Projets/ProjetsDirecteur.jsx
import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../../../axios';
import ProjetsLayout from './ProjetsLayout';
import ValidationActions from './ValidationActions';
import DetailsProjetModal from './DetailsProjetModal';
import HistoriqueVersionsModal from './HistoriqueVersionsModal';
import { useDataFilter } from '../../Components/comon/DataFilter';

const ProjetsDirecteur = () => {
    const [activeTab, setActiveTab] = useState('chefStatus');
    const [projets, setProjets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('tous');
    const [selectedStatut, setSelectedStatut] = useState('tous');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [regions, setRegions] = useState([]);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [selectedProjet, setSelectedProjet] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [counts, setCounts] = useState({});

    const { getUserInfo } = useDataFilter();
    const userInfo = getUserInfo();

    const tabs = [
        { id: 'chefStatus', label: ' À Traiter', endpoint: '/recap/budget/directeur/valides-chef/', color: 'blue', description: 'Projets validés par Chef à traiter', icon: '📋' },
        { id: 'valides', label: ' Validés', endpoint: '/recap/budget/directeur/valides/', color: 'green', description: 'Projets que vous avez déjà validés', icon: '✅' },
        { id: 'reserveDirecteur', label: 'Réservés', endpoint: '/recap/budget/directeur/reserve-directeur/', color: 'orange', description: 'Projets que vous avez réservés', icon: '🔄' },
        { id: 'tous', label: ' Tous', endpoint: '/recap/budget/directeur/tous/', color: 'purple', description: 'Tous les projets accessibles', icon: '📊' },
        { id: 'historique', label: ' Historique', endpoint: '/recap/budget/directeur/historique/', color: 'gray', description: 'Historique complet', icon: '📜' }
    ];

    useEffect(() => {
        fetchRegions();
    }, []);

    useEffect(() => {
        if (activeTab) fetchProjets();
    }, [activeTab]);

    const fetchRegions = async () => {
        try {
            const response = await axiosInstance.get('/params/regions');
            setRegions(response.data.data || []);
        } catch (err) {
            console.error("Erreur:", err);
        }
    };

    const fetchProjets = async () => {
        setLoading(true);
        try {
            const currentTab = tabs.find(t => t.id === activeTab);
            const response = await axiosInstance.get(currentTab.endpoint);
            
            let projetsData = [];
            if (response.data?.projets) projetsData = response.data.projets;
            else if (response.data?.data) projetsData = response.data.data;
            else if (Array.isArray(response.data)) projetsData = response.data;
            
            setProjets(projetsData);
            updateCounts();
        } catch (err) {
            console.error("Erreur:", err);
        } finally {
            setLoading(false);
        }
    };

    const updateCounts = async () => {
        const newCounts = {};
        for (const tab of tabs) {
            try {
                const response = await axiosInstance.get(tab.endpoint);
                let count = 0;
                if (response.data?.projets) count = response.data.projets.length;
                else if (response.data?.data) count = response.data.data.length;
                else if (Array.isArray(response.data)) count = response.data.length;
                newCounts[tab.id] = count;
            } catch (err) {
                newCounts[tab.id] = 0;
            }
        }
        setCounts(newCounts);
    };

    const getStatutBadge = (statut) => {
        const config = {
            valide_chef: { label: 'Validé Chef', color: '#10B981', bg: 'bg-green-100' },
            valide_directeur: { label: 'Validé Directeur', color: '#EC4899', bg: 'bg-pink-100' },
            reserve_directeur: { label: 'Réservé', color: '#F59E0B', bg: 'bg-amber-100' },
            rejete: { label: 'Rejeté', color: '#EF4444', bg: 'bg-red-100' }
        };
        const c = config[statut] || { label: statut, color: '#6B7280', bg: 'bg-gray-100' };
        return <span className={`px-2 py-1 rounded-full text-xs font-medium ${c.bg}`} style={{ color: c.color }}>{c.label}</span>;
    };

    const getBudgetTotal = (projet) => {
        if (projet.cout_initial_total) return parseFloat(projet.cout_initial_total);
        const prev = (parseFloat(projet.prev_n_plus2_total) || 0) + (parseFloat(projet.prev_n_plus3_total) || 0) + (parseFloat(projet.prev_n_plus4_total) || 0) + (parseFloat(projet.prev_n_plus5_total) || 0);
        const mensuel = parseFloat(projet.prev_n_plus1_total) || 0;
        return prev + mensuel;
    };

    const getRegionNom = (regionId) => {
        const region = regions.find(r => r._id === regionId);
        return region?.nom_region || regionId || '-';
    };

    const handleSuccess = (message) => {
        setSuccessMessage(message);
        setShowSuccess(true);
        fetchProjets();
        setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <>
            <ProjetsLayout
                title="Tableau de bord - Directeur"
                subtitle="Gérez les projets, validez et suivez l'avancement"
                role={userInfo.role}
                tabs={tabs}
                projets={projets}
                loading={loading}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                selectedStatut={selectedStatut}
                setSelectedStatut={setSelectedStatut}
                selectedRegion={selectedRegion}
                setSelectedRegion={setSelectedRegion}
                regions={regions}
                counts={counts}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                canShowValidationActions={activeTab === 'chefStatus' || activeTab === 'reserveDirecteur'}
                getStatutBadge={getStatutBadge}
                getBudgetTotal={getBudgetTotal}
                getRegionNom={getRegionNom}
                onViewHistory={(projet) => { setSelectedProjet(projet); setShowHistoryModal(true); }}
                onViewDetails={(projet) => { setSelectedProjet(projet); setShowDetailsModal(true); }}
                validationActions={(projet) => <ValidationActions projet={projet} onActionSuccess={handleSuccess} />}
            />
            
            <DetailsProjetModal isOpen={showDetailsModal} onClose={() => { setShowDetailsModal(false); setSelectedProjet(null); }} projet={selectedProjet} axiosInstance={axiosInstance} />
            <HistoriqueVersionsModal isOpen={showHistoryModal} onClose={() => { setShowHistoryModal(false); setSelectedProjet(null); }} projet={selectedProjet} axiosInstance={axiosInstance} />
            
            {showSuccess && (
                <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-lg shadow-xl z-50 text-sm">
                    ✅ {successMessage}
                </div>
            )}
        </>
    );
};

export default ProjetsDirecteur;