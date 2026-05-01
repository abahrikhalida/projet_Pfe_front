// Components/Projets/ProjetsDirecteurDirection.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { axiosInstance } from '../../../../axios';
import ProjetsLayout from '../Projets/ProjetsLayout';
import DetailsProjetModal from '../Projets/DetailsProjetModal';
import HistoriqueVersionsModal from '../Projets/HistoriqueVersionsModal';

const ProjetsDirecteurDirection = () => {
    const [activeTab, setActiveTab] = useState('soumis');
    const [projets, setProjets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('tous');
    const [selectedStatut, setSelectedStatut] = useState('tous');
    const [selectedDirection, setSelectedDirection] = useState('');
    const [directions, setDirections] = useState([]);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [showValidationModal, setShowValidationModal] = useState(false);
    const [selectedProjet, setSelectedProjet] = useState(null);
    const [validationAction, setValidationAction] = useState('');
    const [validationComment, setValidationComment] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [counts, setCounts] = useState({});
    const [userInfo, setUserInfo] = useState({
        direction_id: null,
        direction_name: null
    });
    
    const isInitialMount = useRef(true);
    const isFetching = useRef(false);

    // 🔥 Tabs pour Directeur Direction avec les bons endpoints
    const tabs = [
        { 
            id: 'soumis', 
            label: 'Soumis', 
            endpoint: '/recap/budget/directeur-direction/soumis/', 
            color: 'blue', 
            description: 'Projets soumis en attente de validation',
            statutType: 'workflow'
        },
      
        // { 
        //     id: 'revoir', 
        //     label: '👁️ À revoir', 
        //     endpoint: '/recap/budget/directeur-direction/revoir/', 
        //     color: 'purple', 
        //     description: 'Projets à revoir',
        //     statutType: 'workflow'
        // },
        { 
            id: 'valides', 
            label: 'Validés DD', 
            endpoint: '/recap/budget/directeur-direction/valides/', 
            color: 'green', 
            description: 'Projets validés par le Directeur Direction',
            statutType: 'final'
        },
        { 
            id: 'rejetes', 
            label: 'Rejetés DD', 
            endpoint: '/recap/budget/directeur-direction/rejetes/', 
            color: 'red', 
            description: 'Projets rejetés par le Directeur Direction',
            statutType: 'final'
        },
          { 
            id: 'reserve_directeur', 
            label: 'Réservés Directeur', 
            endpoint: '/recap/budget/directeur-direction/reserve-directeur/', 
            color: 'orange', 
            description: 'Projets réservés par le Directeur',
            statutType: 'workflow'
        },
        // { 
        //     id: 'valides_div', 
        //     label: '✅ Validés Divisionnaire', 
        //     endpoint: '/recap/budget/directeur-direction/valide-divisionnaire/', 
        //     color: 'teal', 
        //     description: 'Projets validés par le Divisionnaire',
        //     statutType: 'final'
        // },
        { 
            id: 'rejetes_div', 
            label: 'Rejetés Divisionnaire', 
            endpoint: '/recap/budget/directeur-direction/rejete-divisionnaire/', 
            color: 'red', 
            description: 'Projets rejetés par le Divisionnaire',
            statutType: 'final'
        },
        { 
            id: 'annules', 
            label: ' Annulés', 
            endpoint: '/recap/budget/directeur-direction/annule-divisionnaire/', 
            color: 'gray', 
            description: 'Projets annulés par le Divisionnaire',
            statutType: 'final'
        },
        // { 
        //     id: 'tous', 
        //     label: '📊 Tous', 
        //     endpoint: '/recap/budget/directeur-direction/tous/', 
        //     color: 'gray', 
        //     description: 'Tous les projets',
        //     statutType: 'mixte'
        // }
    ];

    // Récupérer les infos utilisateur
    useEffect(() => {
        const directionId = localStorage.getItem('direction_id');
        const directionName = localStorage.getItem('direction_name');
        setUserInfo({ direction_id: directionId, direction_name: directionName });
        console.log("👤 Directeur Direction:", { directionId, directionName });
    }, []);

    // Chargement des directions
    useEffect(() => {
        const loadDirections = async () => {
            try {
                const response = await axiosInstance.get('/params/directions');
                setDirections(response.data.data || []);
            } catch (err) {
                console.error("Erreur chargement directions:", err);
            }
        };
        loadDirections();
    }, []);

    // 🔥 Fonction pour obtenir le statut correct selon le type de tab
    const getStatutBadge = (projet) => {
        const currentTab = tabs.find(t => t.id === activeTab);
        let statut = '';
        
        if (currentTab?.statutType === 'workflow') {
            statut = projet.statut_workflow || 'brouillon';
        } else if (currentTab?.statutType === 'final') {
            statut = projet.statut_final || 'brouillon';
        } else {
            statut = projet.statut_workflow || projet.statut_final || 'brouillon';
        }
        
        const config = {
            brouillon: { label: 'Brouillon', color: '#9CA3AF', bg: 'bg-gray-100' },
            soumis: { label: 'Soumis', color: '#3B82F6', bg: 'bg-blue-100' },
            reserve_directeur: { label: 'Réservé Directeur', color: '#F59E0B', bg: 'bg-amber-100' },
            valide_directeur_direction: { label: 'Validé DD', color: '#10B981', bg: 'bg-green-100' },
            rejete_directeur_direction: { label: 'Rejeté DD', color: '#EF4444', bg: 'bg-red-100' },
            valide_divisionnaire: { label: 'Validé Divisionnaire', color: '#14B8A6', bg: 'bg-teal-100' },
            rejete_divisionnaire: { label: 'Rejeté Divisionnaire', color: '#EF4444', bg: 'bg-red-100' },
            annule_divisionnaire: { label: 'Annulé', color: '#6B7280', bg: 'bg-gray-100' }
        };
        
        const c = config[statut] || { label: statut || '-', color: '#6B7280', bg: 'bg-gray-100' };
        return <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium ${c.bg} whitespace-nowrap`} style={{ color: c.color }}>{c.label}</span>;
    };

    // 🔥 Fonction fetchProjets
    const fetchProjets = useCallback(async (isInitial = false) => {
        if (isFetching.current) return;
        
        const currentTab = tabs.find(t => t.id === activeTab);
        if (!currentTab) return;
        
        isFetching.current = true;
        if (isInitial) {
            setInitialLoading(true);
        } else {
            setLoading(true);
        }
        
        try {
            let url = currentTab.endpoint;
            const params = new URLSearchParams();
            
            if (userInfo.direction_id) {
                params.append('direction_id', userInfo.direction_id);
            }
            
            if (selectedDirection) {
                params.append('direction_filter', selectedDirection);
            }
            if (searchTerm) {
                params.append('code_division', searchTerm);
            }
            if (selectedType !== 'tous') {
                params.append('type_projet', selectedType);
            }
            
            if (params.toString()) {
                url += `?${params.toString()}`;
            }
            
            console.log("🔍 Fetching projets Directeur Direction:", url);
            const response = await axiosInstance.get(url);
            
            let projetsData = [];
            if (response.data?.projets) {
                projetsData = response.data.projets;
                setCounts(prev => ({ ...prev, [currentTab.id]: response.data.count || projetsData.length }));
            } else if (response.data?.data) {
                projetsData = response.data.data;
            } else if (Array.isArray(response.data)) {
                projetsData = response.data;
            }
            
            setProjets(projetsData);
            
        } catch (err) {
            console.error("❌ Erreur fetchProjets:", err);
            setProjets([]);
        } finally {
            isFetching.current = false;
            if (isInitial) {
                setInitialLoading(false);
            } else {
                setLoading(false);
            }
        }
    }, [activeTab, searchTerm, selectedType, selectedDirection, userInfo.direction_id]);

    // Chargement initial
    useEffect(() => {
        if (userInfo.direction_id && isInitialMount.current) {
            isInitialMount.current = false;
            fetchProjets(true);
            loadAllCounts();
        }
    }, [userInfo.direction_id, fetchProjets]);

    // Chargement lors du changement d'onglet
    useEffect(() => {
        if (!isInitialMount.current && userInfo.direction_id) {
            fetchProjets(false);
        }
    }, [activeTab, fetchProjets, userInfo.direction_id]);

    // Debounce pour les filtres
    const filterTimeout = useRef(null);
    useEffect(() => {
        if (!isInitialMount.current && userInfo.direction_id) {
            if (filterTimeout.current) {
                clearTimeout(filterTimeout.current);
            }
            filterTimeout.current = setTimeout(() => {
                fetchProjets(false);
            }, 300);
        }
        return () => {
            if (filterTimeout.current) {
                clearTimeout(filterTimeout.current);
            }
        };
    }, [searchTerm, selectedType, selectedDirection, fetchProjets, userInfo.direction_id]);

    // Charger les compteurs pour tous les tabs
    const loadAllCounts = async () => {
        const newCounts = {};
        for (const tab of tabs) {
            try {
                let url = tab.endpoint;
                const params = new URLSearchParams();
                if (userInfo.direction_id) {
                    params.append('direction_id', userInfo.direction_id);
                }
                if (params.toString()) {
                    url += `?${params.toString()}`;
                }
                const response = await axiosInstance.get(url);
                newCounts[tab.id] = response.data?.count || response.data?.projets?.length || 0;
            } catch (err) {
                newCounts[tab.id] = 0;
            }
        }
        setCounts(newCounts);
    };

    const handleValidation = async (action, projet, comment = '') => {
        try {
            const projetId = projet.id || projet._id;
            
            const response = await axiosInstance.post(`/recap/budget/valider/directeur-direction/${projetId}/`, {
                action: action,
                commentaire: comment
            });
            
            if (response.data.success) {
                setSuccessMessage(response.data.message);
                setShowSuccess(true);
                await fetchProjets(false);
                await loadAllCounts();
                setTimeout(() => setShowSuccess(false), 3000);
            }
        } catch (err) {
            console.error("Erreur validation:", err);
            const errorMsg = err.response?.data?.error || err.message || "Erreur lors de la validation";
            alert(errorMsg);
        }
    };

    const openValidationModal = (projet, action) => {
        setSelectedProjet(projet);
        setValidationAction(action);
        setValidationComment('');
        setShowValidationModal(true);
    };

    const confirmValidation = async () => {
        if (validationAction === 'rejeter' && !validationComment.trim()) {
            alert("Veuillez saisir un commentaire pour le rejet");
            return;
        }
        await handleValidation(validationAction, selectedProjet, validationComment);
        setShowValidationModal(false);
        setSelectedProjet(null);
    };

    const getBudgetTotal = (projet) => {
        if (projet.cout_initial_total) return parseFloat(projet.cout_initial_total);
        const prev = (parseFloat(projet.prev_n_plus2_total) || 0) + (parseFloat(projet.prev_n_plus3_total) || 0) + (parseFloat(projet.prev_n_plus4_total) || 0) + (parseFloat(projet.prev_n_plus5_total) || 0);
        const mensuel = parseFloat(projet.prev_n_plus1_total) || 0;
        return prev + mensuel;
    };

    const getDirectionNom = (directionId) => {
        if (!directionId) return '-';
        const direction = directions.find(d => d._id === directionId || d.code_direction === directionId);
        return direction?.nom_direction || directionId;
    };

    // Actions de validation (uniquement pour les projets soumis ou réservés)
    const ValidationActions = ({ projet }) => {
        const canValidate = projet.statut_workflow === 'soumis' || projet.statut_workflow === 'reserve_directeur';
        const canReject = projet.statut_workflow === 'soumis' || projet.statut_workflow === 'reserve_directeur';
        
        if ((activeTab !== 'soumis' && activeTab !== 'reserve_directeur') || (!canValidate && !canReject)) {
            return null;
        }
        
        return (
            <div className="flex items-center gap-2">
                {canValidate && (
                    <button
                        onClick={() => openValidationModal(projet, 'valider')}
                        className="px-2 py-1 bg-green-500 text-white rounded-full text-xs hover:bg-green-600 transition"
                    >
                        Valider
                    </button>
                )}
                {canReject && (
                    <button
                        onClick={() => openValidationModal(projet, 'rejeter')}
                        className="px-2 py-1 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 transition"
                    >
                        Rejeter
                    </button>
                )}
            </div>
        );
    };

    // Écran de chargement initial
    if (initialLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="bg-white rounded-2xl p-8 shadow-lg flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#FF8500] border-t-transparent rounded-full animate-spin" />
                    <p className="text-gray-600 font-medium">Chargement des projets...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <ProjetsLayout
                title="Tableau de bord - Directeur Direction"
                subtitle="Validez ou rejetez les projets de votre direction"
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
                canShowValidationActions={activeTab === 'soumis' || activeTab === 'reserve_directeur'}
                getStatutBadge={getStatutBadge}
                getBudgetTotal={getBudgetTotal}
                getRegionNom={getDirectionNom}
                onViewDetails={(projet) => { setSelectedProjet(projet); setShowDetailsModal(true); }}
                onViewHistory={(projet) => { setSelectedProjet(projet); setShowHistoryModal(true); }}
                validationActions={(projet) => <ValidationActions projet={projet} />}
                showValidationColumn={true}
                entiteType="direction"
                getEntiteNom={(projet) => getDirectionNom(projet.direction_id || projet.direction)}
            />
            
            <DetailsProjetModal 
                isOpen={showDetailsModal} 
                onClose={() => { setShowDetailsModal(false); setSelectedProjet(null); }} 
                projet={selectedProjet} 
                axiosInstance={axiosInstance} 
            />
            
            <HistoriqueVersionsModal 
                isOpen={showHistoryModal} 
                onClose={() => { setShowHistoryModal(false); setSelectedProjet(null); }} 
                projet={selectedProjet} 
                axiosInstance={axiosInstance} 
            />

            {/* Modal de validation */}
            {showValidationModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 w-[450px]">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">
                            {validationAction === 'valider' ? 'Valider le projet' : 'Rejeter le projet'}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Projet: <span className="font-semibold">{selectedProjet?.code_division}</span>
                        </p>
                        {validationAction === 'rejeter' && (
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Motif du rejet <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={validationComment}
                                    onChange={(e) => setValidationComment(e.target.value)}
                                    rows="3"
                                    className="w-full px-3 py-2 rounded-xl border border-gray-300 outline-none focus:border-orange-400"
                                    placeholder="Expliquez la raison du rejet..."
                                />
                            </div>
                        )}
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowValidationModal(false)}
                                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={confirmValidation}
                                className={`px-4 py-2 rounded-lg text-white transition ${
                                    validationAction === 'valider' 
                                        ? 'bg-green-500 hover:bg-green-600' 
                                        : 'bg-red-500 hover:bg-red-600'
                                }`}
                            >
                                {validationAction === 'valider' ? '✓ Valider' : '✗ Rejeter'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showSuccess && (
                <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-lg shadow-xl z-50 text-sm">
                    ✅ {successMessage}
                </div>
            )}
        </>
    );
};

export default ProjetsDirecteurDirection;