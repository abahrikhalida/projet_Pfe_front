// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { axiosInstance } from '../../../axios';
// import { ReactComponent as SearchIcon } from '../../../Assets/Icons/Search.svg';
// import { ReactComponent as EditIcon } from '../../../Assets/Icons/edit.svg';
// import { ReactComponent as DeleteIcon } from '../../../Assets/Icons/Delete.svg';
// import { ReactComponent as EyeIcon } from '../../../Assets/Icons/eye.svg';
// import { ReactComponent as HistoryIcon } from '../../../Assets/Icons/history.svg';
// import AjouterProjetModal from './AjouterProjetModal';
// import DetailsProjetModal from './DetailsProjetModal';
// import HistoriqueVersionsModal from './HistoriqueVersionsModal';

// const ProjetsListe = () => {
//     const [projets, setProjets] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [selectedStatut, setSelectedStatut] = useState('tous');
//     const [selectedType, setSelectedType] = useState('tous');
//     const [selectedRegion, setSelectedRegion] = useState('');
//     const [regions, setRegions] = useState([]);
//     const [showCreateModal, setShowCreateModal] = useState(false);
//     const [showDetailsModal, setShowDetailsModal] = useState(false);
//     const [showHistoryModal, setShowHistoryModal] = useState(false);
//     const [selectedProjet, setSelectedProjet] = useState(null);
//     const [showSuccess, setShowSuccess] = useState(false);
//     const [successMessage, setSuccessMessage] = useState('');
    
//     // Compteurs par statut
//     const [counts, setCounts] = useState({
//         brouillon: 0,
//         soumis: 0,
//         valide_divisionnaire: 0,
//         rejete: 0,
//         cloture: 0
//     });

//     const statuts = [
//         { value: 'tous', label: 'Tous', color: '#6B7280' },
//         { value: 'brouillon', label: 'Brouillon', color: '#9CA3AF' },
//         { value: 'soumis', label: 'Soumis', color: '#3B82F6' },
//         { value: 'valide_divisionnaire', label: 'Validé Divisionnaire', color: '#10B981' },
//         { value: 'rejete', label: 'Rejeté', color: '#EF4444' },
//         { value: 'cloture', label: 'Clôturé', color: '#8B5CF6' }
//     ];

//     const typesProjet = [
//         { value: 'tous', label: 'Tous' },
//         { value: 'nouveau', label: 'Nouveau Projet' },
//         { value: 'en_cours', label: 'Projet en Cours' }
//     ];

//     useEffect(() => {
//         fetchProjets();
//         fetchRegions();
//     }, []);

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
//             const response = await axiosInstance.get('/recap/budget/projets/');
//             const projetsData = response.data.projets || response.data.data || [];
//             setProjets(projetsData);
//             updateCounts(projetsData);
//         } catch (err) {
//             console.error("Erreur chargement projets:", err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const updateCounts = (projetsData) => {
//         const newCounts = {
//             brouillon: projetsData.filter(p => p.statut === 'brouillon').length,
//             soumis: projetsData.filter(p => p.statut === 'soumis').length,
//             valide_divisionnaire: projetsData.filter(p => p.statut === 'valide_divisionnaire').length,
//             rejete: projetsData.filter(p => p.statut === 'rejete').length,
//             cloture: projetsData.filter(p => p.statut === 'cloture').length
//         };
//         setCounts(newCounts);
//     };

//     const handleSuccess = (message) => {
//         setSuccessMessage(message);
//         setShowSuccess(true);
//         fetchProjets();
//         setTimeout(() => setShowSuccess(false), 3000);
//     };

//     const getStatutBadge = (statut) => {
//         const statutConfig = {
//             brouillon: { label: 'Brouillon', color: '#9CA3AF', bg: 'bg-gray-100' },
//             soumis: { label: 'Soumis', color: '#3B82F6', bg: 'bg-blue-100' },
//             valide_divisionnaire: { label: 'Validé Divisionnaire', color: '#10B981', bg: 'bg-green-100' },
//             rejete: { label: 'Rejeté', color: '#EF4444', bg: 'bg-red-100' },
//             cloture: { label: 'Clôturé', color: '#8B5CF6', bg: 'bg-purple-100' }
//         };
//         const config = statutConfig[statut] || statutConfig.brouillon;
//         return (
//             <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg}`} style={{ color: config.color }}>
//                 {config.label}
//             </span>
//         );
//     };

//     const filteredProjets = projets.filter(projet => {
//         const search = searchTerm.toLowerCase();
//         const matchesSearch = 
//             (projet.code_division || '').toLowerCase().includes(search) ||
//             (projet.libelle || '').toLowerCase().includes(search) ||
//             (projet.activite || '').toLowerCase().includes(search);
        
//         const matchesStatut = selectedStatut === 'tous' || projet.statut === selectedStatut;
//         const matchesType = selectedType === 'tous' || projet.type_projet === selectedType;
//         const matchesRegion = !selectedRegion || projet.region_id === selectedRegion;
        
//         return matchesSearch && matchesStatut && matchesType && matchesRegion;
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

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//             {/* En-tête */}
//             <motion.div 
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="bg-white border-b border-gray-200 sticky top-0 z-10 backdrop-blur-sm bg-white/95"
//             >
//                 <div className="px-8 py-6">
//                     <div className="flex items-center justify-between">
//                         <div>
//                             <h1 className="text-2xl font-bold text-gray-800">Gestion des Projets</h1>
//                             <p className="text-gray-500 mt-1">
//                                 Gérez vos projets, suivez leur avancement et consultez l'historique
//                             </p>
//                         </div>
//                         {loading && (
//                             <motion.div className="flex items-center gap-2">
//                                 <div className="w-2 h-2 bg-[#FF8500] rounded-full animate-pulse" />
//                                 <span className="text-sm text-gray-500">Chargement...</span>
//                             </motion.div>
//                         )}
//                     </div>
//                 </div>
//             </motion.div>

//             <div className="p-8">
//                 <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 p-6">
//                     {/* Bouton Ajouter */}
//                     <div className="flex justify-end mb-6">
//                         <button
//                             onClick={() => setShowCreateModal(true)}
//                             className="px-5 py-2.5 bg-[#FF8500] text-white rounded-[20px] text-sm font-medium hover:bg-[#e67800] transition-all duration-200 flex items-center gap-2"
//                         >
//                             <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
//                                 <path d="M8 3v10M3 8h10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
//                             </svg>
//                             Nouveau Projet
//                         </button>
//                     </div>

//                     {/* Cartes compteurs */}
//                     <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
//                         <div className="bg-gray-50 rounded-xl p-4 text-center cursor-pointer hover:bg-gray-100 transition" onClick={() => setSelectedStatut('tous')}>
//                             <div className="text-2xl font-bold text-gray-800">{projets.length}</div>
//                             <div className="text-xs text-gray-500">Total</div>
//                         </div>
//                         <div className="bg-gray-50 rounded-xl p-4 text-center cursor-pointer hover:bg-gray-100 transition" onClick={() => setSelectedStatut('brouillon')}>
//                             <div className="text-2xl font-bold text-gray-500">{counts.brouillon}</div>
//                             <div className="text-xs text-gray-500">Brouillon</div>
//                         </div>
//                         <div className="bg-gray-50 rounded-xl p-4 text-center cursor-pointer hover:bg-gray-100 transition" onClick={() => setSelectedStatut('soumis')}>
//                             <div className="text-2xl font-bold text-blue-600">{counts.soumis}</div>
//                             <div className="text-xs text-gray-500">Soumis</div>
//                         </div>
//                         <div className="bg-gray-50 rounded-xl p-4 text-center cursor-pointer hover:bg-gray-100 transition" onClick={() => setSelectedStatut('valide_divisionnaire')}>
//                             <div className="text-2xl font-bold text-green-600">{counts.valide_divisionnaire}</div>
//                             <div className="text-xs text-gray-500">Validé</div>
//                         </div>
//                         <div className="bg-gray-50 rounded-xl p-4 text-center cursor-pointer hover:bg-gray-100 transition" onClick={() => setSelectedStatut('cloture')}>
//                             <div className="text-2xl font-bold text-purple-600">{counts.cloture}</div>
//                             <div className="text-xs text-gray-500">Clôturé</div>
//                         </div>
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
//                             value={selectedRegion}
//                             onChange={(e) => setSelectedRegion(e.target.value)}
//                             className="h-[43px] px-4 rounded-[20px] border-2 border-[#D9E1E7] outline-none focus:border-[#FF8500] bg-white"
//                         >
//                             <option value="">Toutes les régions</option>
//                             {regions.map(region => (
//                                 <option key={region._id} value={region._id}>{region.nom_region}</option>
//                             ))}
//                         </select>

//                         <select
//                             value={selectedStatut}
//                             onChange={(e) => setSelectedStatut(e.target.value)}
//                             className="h-[43px] px-4 rounded-[20px] border-2 border-[#D9E1E7] outline-none focus:border-[#FF8500] bg-white"
//                         >
//                             {statuts.map(statut => (
//                                 <option key={statut.value} value={statut.value}>{statut.label}</option>
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
//                         <table className="w-full min-w-[1000px]">
//                             <thead>
//                                 <tr className="bg-gradient-to-r from-[#F9F9F9] to-[#F0F0F0] border-b border-[#E4E4E4]">
//                                     <th className="py-3 px-3 text-left text-xs font-semibold text-[#4A4A4A]">Code Division</th>
//                                     <th className="py-3 px-3 text-left text-xs font-semibold text-[#4A4A4A]">Libellé</th>
//                                     <th className="py-3 px-3 text-left text-xs font-semibold text-[#4A4A4A]">Région</th>
//                                     <th className="py-3 px-3 text-left text-xs font-semibold text-[#4A4A4A]">Activité</th>
//                                     <th className="py-3 px-3 text-left text-xs font-semibold text-[#4A4A4A]">Budget Total</th>
//                                     <th className="py-3 px-3 text-left text-xs font-semibold text-[#4A4A4A]">Statut</th>
//                                     <th className="py-3 px-3 text-left text-xs font-semibold text-[#4A4A4A]">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {loading ? (
//                                     <tr>
//                                         <td colSpan="7" className="py-8 text-center">
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
//                                                     <span className="font-mono text-sm">{projet.code_division}</span>
//                                                 </td>
//                                                 <td className="py-3 px-3">
//                                                     <div className="text-sm font-medium text-gray-800">{projet.libelle}</div>
//                                                     <div className="text-xs text-gray-400">{projet.type_projet === 'nouveau' ? 'Nouveau' : 'En cours'}</div>
//                                                 </td>
//                                                 <td className="py-3 px-3 text-sm text-gray-600">{projet.region_nom || '-'}</td>
//                                                 <td className="py-3 px-3 text-sm text-gray-600">{projet.activite || '-'}</td>
//                                                 <td className="py-3 px-3 text-sm font-semibold text-gray-800">
//                                                     {projet.cout_global?.toLocaleString()} DA
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
//                                                             <svg className="w-4 h-4 text-gray-500 hover:text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                                                             </svg>
//                                                         </motion.button>
//                                                         <motion.button
//                                                             whileHover={{ scale: 1.05 }}
//                                                             whileTap={{ scale: 0.95 }}
//                                                             onClick={() => { setSelectedProjet(projet); setShowCreateModal(true); }}
//                                                             className="p-1.5 hover:bg-[#FF8500]/10 rounded-full transition"
//                                                             title="Modifier"
//                                                         >
//                                                             <EditIcon className="w-3.5 h-3.5 text-gray-500 hover:text-[#FF8500]" />
//                                                         </motion.button>
//                                                     </div>
//                                                 </td>
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
//                                 <p className="text-gray-500">Aucun projet trouvé</p>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>

//             {/* Modals */}
//             <AjouterProjetModal
//                 isOpen={showCreateModal}
//                 onClose={() => { setShowCreateModal(false); setSelectedProjet(null); }}
//                 onSuccess={handleSuccess}
//                 projet={selectedProjet}
//                 axiosInstance={axiosInstance}
//             />

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
//                         {successMessage}
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </div>
//     );
// };

// export default ProjetsListe;