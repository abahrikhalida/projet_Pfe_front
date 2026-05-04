// // Components/Projets/ProjetsResponsableDepartement.jsx
// import React, { useState, useEffect } from 'react';
// import { axiosInstance } from '../../../../axios';
// import ProjetsLayout from '../Projets/ProjetsLayout';
// import DetailsProjetModal from '../Projets/DetailsProjetModal';
// import HistoriqueVersionsModal from '../Projets/HistoriqueVersionsModal';
// import AjouterProjetModalDepartement from './AjouterProjetModalDepartement';

// const ProjetsResponsableDepartement = () => {
//     const [activeTab, setActiveTab] = useState('soumis');
//     const [projets, setProjets] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [selectedType, setSelectedType] = useState('tous');
//     const [selectedStatut, setSelectedStatut] = useState('tous');
//     const [selectedDirection, setSelectedDirection] = useState('');
//     const [directions, setDirections] = useState([]);
//     const [showDetailsModal, setShowDetailsModal] = useState(false);
//     const [showHistoryModal, setShowHistoryModal] = useState(false);
//     const [selectedProjet, setSelectedProjet] = useState(null);
//     const [showSuccess, setShowSuccess] = useState(false);
//     const [successMessage, setSuccessMessage] = useState('');
//     const [modalKey, setModalKey] = useState(0);
//     const [showCreateModal, setShowCreateModal] = useState(false);
//     const [counts, setCounts] = useState({});
//     const [userIds, setUserIds] = useState({
//         direction_id: null,
//         departement_id: null
//     });

//     // 🔥 Récupérer les IDs depuis localStorage
//     useEffect(() => {
//         const directionId = localStorage.getItem('direction_id');
//         const departementId = localStorage.getItem('departement_id');
        
//         setUserIds({
//             direction_id: directionId,
//             departement_id: departementId
//         });
        
//         console.log("👤 IDs utilisateur département:", { directionId, departementId });
        
//         // Si pas d'IDs, essayer de les récupérer via API
//         if (!directionId && !departementId) {
//             fetchUserIds();
//         }
//     }, []);

//     // 🔥 Récupérer les IDs depuis l'API si pas dans localStorage
//     const fetchUserIds = async () => {
//         try {
//             const response = await axiosInstance.get('/api/users/');
//             if (response.data) {
//                 if (response.data.direction_id) {
//                     localStorage.setItem('direction_id', response.data.direction_id);
//                     setUserIds(prev => ({ ...prev, direction_id: response.data.direction_id }));
//                 }
//                 if (response.data.departement_id) {
//                     localStorage.setItem('departement_id', response.data.departement_id);
//                     setUserIds(prev => ({ ...prev, departement_id: response.data.departement_id }));
//                 }
//             }
//         } catch (err) {
//             console.error("Erreur récupération IDs:", err);
//         }
//     };

//     // Tabs
//     const tabs = [
//         { id: 'soumis', label: ' Soumis', params: { statut_workflow: 'soumis' }, color: 'blue', description: 'Projets soumis pour validation', icon: '📋' },
//         // { id: 'pre_approuve', label: '✓ Pré-approuvés', params: { statut_workflow: 'pre_approuve_chef' }, color: 'purple', description: 'Projets pré-approuvés par le Chef', icon: '✓' },
//         // { id: 'reserve_chef', label: '🔄 Réservés Chef', params: { statut_workflow: 'reserve_chef' }, color: 'orange', description: 'Projets réservés par le Chef', icon: '🔄' },
//         // { id: 'reserve_directeur', label: '🔄 Réservés Directeur', params: { statut_workflow: 'reserve_directeur' }, color: 'orange', description: 'Projets réservés par le Directeur', icon: '🔄' },
//         // { id: 'approuve', label: '✅ Approuvés', params: { statut_workflow: 'approuve_directeur' }, color: 'green', description: 'Projets approuvés par le Directeur', icon: '✅' },
//         // { id: 'valides', label: '✅ Validés', params: { statut_final: 'valide_divisionnaire' }, color: 'green', description: 'Projets validés par le Divisionnaire', icon: '✅' },
//         // { id: 'rejetes', label: '❌ Rejetés', params: { statut_final: 'rejete_divisionnaire' }, color: 'red', description: 'Projets rejetés', icon: '❌' },
//         // { id: 'annules', label: '🚫 Annulés', params: { statut_final: 'annule_divisionnaire' }, color: 'gray', description: 'Projets annulés', icon: '🚫' },
//         // { id: 'termines', label: '🏁 Terminés', params: { statut_final: 'termine_divisionnaire' }, color: 'teal', description: 'Projets terminés', icon: '🏁' }

//     ];

//     const fetchDirections = async () => {
//         try {
//             const response = await axiosInstance.get('/params/directions');
//             setDirections(response.data.data || []);
//         } catch (err) {
//             console.error("Erreur:", err);
//         }
//     };

//     useEffect(() => {
//         fetchDirections();
//     }, []);

//     useEffect(() => {
//         if (activeTab) {
//             fetchProjets();
//         }
//     }, [activeTab, searchTerm, selectedType]);

//     const fetchProjets = async () => {
//         setLoading(true);
//         try {
//             const currentTab = tabs.find(t => t.id === activeTab);
//             if (!currentTab) {
//                 setProjets([]);
//                 setLoading(false);
//                 return;
//             }
            
//             const baseUrl = '/recap/budget/projets/responsable-departement/';
//             const params = new URLSearchParams();
            
//             // 🔥 Ajouter les IDs utilisateur
//             if (userIds.direction_id) {
//                 params.append('direction_id', userIds.direction_id);
//             }
//             if (userIds.departement_id) {
//                 params.append('departement_id', userIds.departement_id);
//             }
            
//             // Ajouter les paramètres du tab
//             Object.entries(currentTab.params).forEach(([key, value]) => {
//                 params.append(key, value);
//             });
            
//             // Filtres
//             if (searchTerm) {
//                 params.append('code_division', searchTerm);
//             }
//             if (selectedType !== 'tous') {
//                 params.append('type_projet', selectedType);
//             }
            
//             const url = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
            
//             console.log("🔍 Requête:", url);
//             const response = await axiosInstance.get(url);
            
//             let projetsData = [];
//             if (response.data?.projets) projetsData = response.data.projets;
//             else if (response.data?.data) projetsData = response.data.data;
//             else if (Array.isArray(response.data)) projetsData = response.data;
            
//             setProjets(projetsData);
//             updateCounts();
            
//         } catch (err) {
//             console.error("Erreur fetchProjets:", err);
//             setProjets([]);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const updateCounts = async () => {
//         const newCounts = {};
//         for (const tab of tabs) {
//             try {
//                 const params = new URLSearchParams();
                
//                 if (userIds.direction_id) params.append('direction_id', userIds.direction_id);
//                 if (userIds.departement_id) params.append('departement_id', userIds.departement_id);
//                 Object.entries(tab.params).forEach(([key, value]) => params.append(key, value));
                
//                 const url = `/recap/budget/projets/responsable-departement/?${params.toString()}`;
//                 const response = await axiosInstance.get(url);
                
//                 let count = 0;
//                 if (response.data?.projets) count = response.data.projets.length;
//                 else if (response.data?.data) count = response.data.data.length;
//                 else if (Array.isArray(response.data)) count = response.data.length;
//                 newCounts[tab.id] = count;
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
//         setTimeout(() => setShowSuccess(false), 3000);
//     };

//     const handleOpenModal = (projet = null) => {
//         if (!projet) {
//             setSelectedProjet(null);
//             setModalKey(prev => prev + 1);
//             setShowCreateModal(true);
//         }
//     };

//     const getStatutBadge = (projet) => {
//         const statut = projet.statut_workflow || projet.statut_final || 'brouillon';
//         const config = {
           
//             soumis: { label: 'Soumis', color: '#3B82F6', bg: 'bg-blue-100' },
//             // pre_approuve_chef: { label: 'Pré-approuvé Chef', color: '#8B5CF6', bg: 'bg-purple-100' },
//             // reserve_chef: { label: 'Réservé Chef', color: '#F59E0B', bg: 'bg-amber-100' },
//             // reserve_directeur: { label: 'Réservé Directeur', color: '#F59E0B', bg: 'bg-amber-100' },
//             // approuve_directeur: { label: 'Approuvé Directeur', color: '#10B981', bg: 'bg-green-100' },
//             // valide_divisionnaire: { label: 'Validé', color: '#10B981', bg: 'bg-green-100' },
//             // rejete_divisionnaire: { label: 'Rejeté', color: '#EF4444', bg: 'bg-red-100' },
//             // annule_divisionnaire: { label: 'Annulé', color: '#6B7280', bg: 'bg-gray-100' },
//             // termine_divisionnaire: { label: 'Terminé', color: '#14B8A6', bg: 'bg-teal-100' }
//         };
//         const c = config[statut] || { label: statut, color: '#6B7280', bg: 'bg-gray-100' };
//         return <span className={`px-2 py-1 rounded-full text-xs font-medium ${c.bg}`} style={{ color: c.color }}>{c.label}</span>;
//     };

//     const getBudgetTotal = (projet) => {
//         if (projet.cout_initial_total) return parseFloat(projet.cout_initial_total);
//         const prev = (parseFloat(projet.prev_n_plus2_total) || 0) + (parseFloat(projet.prev_n_plus3_total) || 0) + (parseFloat(projet.prev_n_plus4_total) || 0) + (parseFloat(projet.prev_n_plus5_total) || 0);
//         const mensuel = parseFloat(projet.prev_n_plus1_total) || 0;
//         return prev + mensuel;
//     };

//     const getDirectionNom = (projet) => {
//         return projet.direction_nom || projet.direction || '-';
//     };

//     // const DepartementActions = ({ projet }) => (
//     //     <div className="flex items-center gap-2">
//     //         <button onClick={() => { setSelectedProjet(projet); setShowHistoryModal(true); }} className="p-1.5 hover:bg-blue-50 rounded-full transition" title="Historique">
//     //             <svg className="w-4 h-4 text-gray-500 hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//     //             </svg>
//     //         </button>
//     //         <button onClick={() => { setSelectedProjet(projet); setShowDetailsModal(true); }} className="p-1.5 hover:bg-green-50 rounded-full transition" title="Consulter">
//     //             <svg className="w-4 h-4 text-gray-500 hover:text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//     //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//     //             </svg>
//     //         </button>
//     //     </div>
//     // );

//     // Dans ProjetsResponsableDepartement.jsx, assurez-vous que le projet a le bon ID
// // Components/Projets/ProjetsResponsableDepartement.jsx
// // Dans DepartementActions

// const DepartementActions = ({ projet }) => {
//     // 🔥 Récupérer le bon ID (MongoDB _id)
//     const projetId = projet._id || projet.id;
    
//     console.log("🔍 Projet complet:", projet);
//     console.log("🆔 ID trouvé:", projetId);
    
//     return (
//         <div className="flex items-center gap-2">
//             <button 
//                 onClick={() => { 
//                     setSelectedProjet(projet); 
//                     setShowHistoryModal(true); 
//                 }} 
//                 className="p-1.5 hover:bg-blue-50 rounded-full transition" 
//                 title="Historique"
//             >
//                 <svg className="w-4 h-4 text-gray-500 hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//             </button>
//             <button 
//                 onClick={() => { 
//                     console.log("👁️ Détails projet:", projet);
//                     console.log("🆔 ID du projet (MongoDB):", projetId);
//                     // 🔥 S'assurer que l'objet a l'ID
//                     const projetAvecId = { ...projet, id: projetId };
//                     setSelectedProjet(projetAvecId); 
//                     setShowDetailsModal(true); 
//                 }} 
//                 className="p-1.5 hover:bg-green-50 rounded-full transition" 
//                 title="Consulter"
//             >
//                 <svg className="w-4 h-4 text-gray-500 hover:text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                 </svg>
//             </button>
//         </div>
//     );
// };
//     return (
//         <>
//             <ProjetsLayout
//                 title="Tableau de bord - Responsable Département"
//                 subtitle="Créez et gérez vos projets départementaux"
//                 tabs={tabs}
//                 projets={projets}
//                 loading={loading}
//                 searchTerm={searchTerm}
//                 setSearchTerm={setSearchTerm}
//                 selectedType={selectedType}
//                 setSelectedType={setSelectedType}
//                 selectedStatut={selectedStatut}
//                 setSelectedStatut={setSelectedStatut}
//                 selectedRegion={selectedDirection}
//                 setSelectedRegion={setSelectedDirection}
//                 regions={directions}
//                 counts={counts}
//                 activeTab={activeTab}
//                 setActiveTab={setActiveTab}
//                 canShowValidationActions={false}
//                 getStatutBadge={getStatutBadge}
//                 getBudgetTotal={getBudgetTotal}
//                 getRegionNom={() => {}}
//                 onViewDetails={(projet) => { setSelectedProjet(projet); setShowDetailsModal(true); }}
//                 onViewHistory={(projet) => { setSelectedProjet(projet); setShowHistoryModal(true); }}
//                 validationActions={(projet) => <DepartementActions projet={projet} />}
//                 showValidationColumn={false}
//                 entiteType="direction"
//                 getEntiteNom={getDirectionNom}
//             />
            
//             <div className="fixed bottom-8 right-8 z-50">
//                 <button onClick={() => handleOpenModal(null)} className="px-5 py-2.5 bg-[#FF8500] text-white rounded-[20px] text-sm font-medium hover:bg-[#e67800] transition-all duration-200 flex items-center gap-2 shadow-md shadow-orange-200">
//                     <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
//                         <path d="M8 3v10M3 8h10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
//                     </svg>
//                     Nouveau Projet
//                 </button>
//             </div>
            
//             <AjouterProjetModalDepartement key={modalKey} isOpen={showCreateModal} onClose={() => { setShowCreateModal(false); setSelectedProjet(null); }} onSuccess={handleSuccess} projet={null} axiosInstance={axiosInstance} />
//             <DetailsProjetModal isOpen={showDetailsModal} onClose={() => { setShowDetailsModal(false); setSelectedProjet(null); }} projet={selectedProjet} axiosInstance={axiosInstance} />
//             <HistoriqueVersionsModal isOpen={showHistoryModal} onClose={() => { setShowHistoryModal(false); setSelectedProjet(null); }} projet={selectedProjet} axiosInstance={axiosInstance} />
            
//             {showSuccess && (
//                 <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-lg shadow-xl z-50 text-sm">
//                     ✅ {successMessage}
//                 </div>
//             )}
//         </>
//     );
// };

// export default ProjetsResponsableDepartement;
// Components/Projets/ProjetsResponsableDepartement.jsx
import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../../../axios';
import ProjetsLayout from '../Projets/ProjetsLayout';
import DetailsProjetModal from '../Projets/DetailsProjetModal';
import AjouterProjetModalDepartement from './AjouterProjetModalDepartement';
import ModifierProjetModal from './ModifierProjetModal';

const ProjetsResponsableDepartement = () => {
    const [activeTab, setActiveTab] = useState('soumis');
    const [projets, setProjets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('tous');
    const [selectedStatut, setSelectedStatut] = useState('tous');
    const [selectedDirection, setSelectedDirection] = useState('');
    const [directions, setDirections] = useState([]);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedProjet, setSelectedProjet] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [modalKey, setModalKey] = useState(0);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [counts, setCounts] = useState({});
    const [userIds, setUserIds] = useState({
        direction_id: null,
        departement_id: null
    });

    // 🔥 Récupérer les IDs depuis localStorage
    useEffect(() => {
        const directionId = localStorage.getItem('direction_id');
        const departementId = localStorage.getItem('departement_id');
        
        setUserIds({
            direction_id: directionId,
            departement_id: departementId
        });
        
        console.log("👤 IDs utilisateur département:", { directionId, departementId });
        
        if (!directionId && !departementId) {
            fetchUserIds();
        }
    }, []);

    const fetchUserIds = async () => {
        try {
            const response = await axiosInstance.get('/api/users/');
            if (response.data) {
                if (response.data.direction_id) {
                    localStorage.setItem('direction_id', response.data.direction_id);
                    setUserIds(prev => ({ ...prev, direction_id: response.data.direction_id }));
                }
                if (response.data.departement_id) {
                    localStorage.setItem('departement_id', response.data.departement_id);
                    setUserIds(prev => ({ ...prev, departement_id: response.data.departement_id }));
                }
            }
        } catch (err) {
            console.error("Erreur récupération IDs:", err);
        }
    };

    const tabs = [
        { id: 'soumis', label: '📋 Soumis', params: { statut_workflow: 'soumis' }, color: 'blue', description: 'Projets soumis pour validation (modifiables)', icon: '📋' },
    ];

    const fetchDirections = async () => {
        try {
            const response = await axiosInstance.get('/params/directions');
            setDirections(response.data.data || []);
        } catch (err) {
            console.error("Erreur:", err);
        }
    };

    useEffect(() => {
        fetchDirections();
    }, []);

    useEffect(() => {
        if (activeTab) {
            fetchProjets();
        }
    }, [activeTab, searchTerm, selectedType]);

    const fetchProjets = async () => {
        setLoading(true);
        try {
            const currentTab = tabs.find(t => t.id === activeTab);
            if (!currentTab) {
                setProjets([]);
                setLoading(false);
                return;
            }
            
            const baseUrl = '/recap/budget/projets/responsable-departement/';
            const params = new URLSearchParams();
            
            if (userIds.direction_id) {
                params.append('direction_id', userIds.direction_id);
            }
            if (userIds.departement_id) {
                params.append('departement_id', userIds.departement_id);
            }
            
            Object.entries(currentTab.params).forEach(([key, value]) => {
                params.append(key, value);
            });
            
            if (searchTerm) {
                params.append('code_division', searchTerm);
            }
            if (selectedType !== 'tous') {
                params.append('type_projet', selectedType);
            }
            
            const url = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
            
            console.log("🔍 Requête:", url);
            const response = await axiosInstance.get(url);
            
            let projetsData = [];
            if (response.data?.projets) projetsData = response.data.projets;
            else if (response.data?.data) projetsData = response.data.data;
            else if (Array.isArray(response.data)) projetsData = response.data;
            
            setProjets(projetsData);
            updateCounts();
            
        } catch (err) {
            console.error("Erreur fetchProjets:", err);
            setProjets([]);
        } finally {
            setLoading(false);
        }
    };

    const updateCounts = async () => {
        const newCounts = {};
        for (const tab of tabs) {
            try {
                const params = new URLSearchParams();
                if (userIds.direction_id) params.append('direction_id', userIds.direction_id);
                if (userIds.departement_id) params.append('departement_id', userIds.departement_id);
                Object.entries(tab.params).forEach(([key, value]) => params.append(key, value));
                
                const url = `/recap/budget/projets/responsable-departement/?${params.toString()}`;
                const response = await axiosInstance.get(url);
                
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

    const handleSuccess = (message) => {
        setSuccessMessage(message);
        setShowSuccess(true);
        fetchProjets();
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const handleOpenModal = (projet = null) => {
        if (!projet) {
            setSelectedProjet(null);
            setModalKey(prev => prev + 1);
            setShowCreateModal(true);
        }
    };

    const getStatutBadge = (projet) => {
        const statut = projet.statut_workflow || projet.statut_final || 'brouillon';
        const config = {
            brouillon: { label: '📝 Brouillon', color: '#9CA3AF', bg: 'bg-gray-100' },
            soumis: { label: '📤 Soumis', color: '#3B82F6', bg: 'bg-blue-100' },
            pre_approuve_chef: { label: '✅ Pré-approuvé Chef', color: '#8B5CF6', bg: 'bg-purple-100' },
            reserve_chef: { label: '⏸️ Réservé Chef', color: '#F59E0B', bg: 'bg-amber-100' },
            reserve_directeur: { label: '⏸️ Réservé Directeur', color: '#F59E0B', bg: 'bg-amber-100' },
            approuve_directeur: { label: '✅ Approuvé Directeur', color: '#10B981', bg: 'bg-green-100' },
            valide_divisionnaire: { label: '🏆 Validé', color: '#10B981', bg: 'bg-green-100' },
            rejete_divisionnaire: { label: '❌ Rejeté', color: '#EF4444', bg: 'bg-red-100' },
            annule_divisionnaire: { label: '🚫 Annulé', color: '#6B7280', bg: 'bg-gray-100' },
            termine_divisionnaire: { label: '🏁 Terminé', color: '#14B8A6', bg: 'bg-teal-100' }
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

    const getDirectionNom = (projet) => {
        return projet.direction_nom || projet.direction || '-';
    };

    // 🔥 Déterminer si le projet peut être modifié (statut = 'soumis')
    const canEdit = (projet) => {
        const projetStatut = projet.statut_workflow || projet.statut;
        return projetStatut === 'soumis';
    };

    // 🔥 Actions pour responsable département (uniquement Voir et Modifier, PAS Historique)
    const DepartementActions = ({ projet }) => {
        const projetId = projet._id || projet.id;
        const showEdit = canEdit(projet);
        
        return (
            <div className="flex items-center gap-2">
                {/* Bouton Voir les détails */}
                <button 
                    onClick={() => { 
                        const projetAvecId = { ...projet, id: projetId };
                        setSelectedProjet(projetAvecId); 
                        setShowDetailsModal(true); 
                    }} 
                    className="p-1.5 hover:bg-green-50 rounded-full transition" 
                    title="Consulter"
                >
                    <svg className="w-4 h-4 text-gray-500 hover:text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                </button>
                
                {/* Bouton Modifier - visible seulement si statut = 'soumis' */}
                {showEdit && (
                    <button 
                        onClick={() => { 
                            setSelectedProjet(projet); 
                            setShowEditModal(true); 
                        }} 
                        className="p-1.5 hover:bg-[#FF8500]/10 rounded-full transition" 
                        title="Modifier le projet (statut: soumis)"
                    >
                        <svg className="w-4 h-4 text-gray-500 hover:text-[#FF8500]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </button>
                )}
            </div>
        );
    };

    return (
        <>
            <ProjetsLayout
                title="Tableau de bord - Responsable Département"
                subtitle="Créez et gérez vos projets départementaux"
                tabs={tabs}
                projets={projets}
                loading={loading}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                selectedStatut={selectedStatut}
                setSelectedStatut={setSelectedStatut}
                selectedRegion={selectedDirection}
                setSelectedRegion={setSelectedDirection}
                regions={directions}
                counts={counts}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                canShowValidationActions={false}
                getStatutBadge={getStatutBadge}
                getBudgetTotal={getBudgetTotal}
                getRegionNom={() => {}}
                userRole="responsable_departement"
                onViewDetails={(projet) => { 
                    setSelectedProjet(projet); 
                    setShowDetailsModal(true); 
                }}
                onEditProjet={(projet) => {
                    setSelectedProjet(projet);
                    setShowEditModal(true);
                }}
                // 🔥 Ne pas passer onViewHistory pour ne pas avoir le bouton historique
                validationActions={(projet) => <DepartementActions projet={projet} />}
                showValidationColumn={false}
                entiteType="direction"
                getEntiteNom={getDirectionNom}
            />
            
            {/* Bouton Ajouter Projet */}
            <div className="fixed bottom-8 right-8 z-50">
                <button 
                    onClick={() => handleOpenModal(null)} 
                    className="px-5 py-2.5 bg-[#FF8500] text-white rounded-[20px] text-sm font-medium hover:bg-[#e67800] transition-all duration-200 flex items-center gap-2 shadow-md shadow-orange-200"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 3v10M3 8h10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    Nouveau Projet
                </button>
            </div>
            
            {/* Modals */}
            <AjouterProjetModalDepartement 
                key={modalKey} 
                isOpen={showCreateModal} 
                onClose={() => { setShowCreateModal(false); setSelectedProjet(null); }} 
                onSuccess={handleSuccess} 
                projet={null} 
                axiosInstance={axiosInstance} 
            />
            
            <DetailsProjetModal 
                isOpen={showDetailsModal} 
                onClose={() => { setShowDetailsModal(false); setSelectedProjet(null); }} 
                projet={selectedProjet} 
                axiosInstance={axiosInstance} 
            />
            
            {/* Modal de modification pour responsable département */}
            <ModifierProjetModal 
                key={`edit-${modalKey}`}
                isOpen={showEditModal} 
                onClose={() => { setShowEditModal(false); setSelectedProjet(null); }} 
                onSuccess={handleSuccess} 
                projet={selectedProjet} 
                axiosInstance={axiosInstance} 
                userRole="responsable_departement"
            />
            
            {/* Message succès */}
            {showSuccess && (
                <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-lg shadow-xl z-50 text-sm">
                    ✅ {successMessage}
                </div>
            )}
        </>
    );
};

export default ProjetsResponsableDepartement;