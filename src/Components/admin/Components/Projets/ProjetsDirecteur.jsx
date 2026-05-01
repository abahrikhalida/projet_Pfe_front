// Components/Projets/ProjetsDirecteur.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { axiosInstance } from '../../../../axios';
import ProjetsLayout from '../Projets/ProjetsLayout';
import DetailsProjetModal from '../Projets/DetailsProjetModal';
import HistoriqueVersionsModal from '../Projets/HistoriqueVersionsModal';

const ProjetsDirecteur = () => {
    const [activeTab, setActiveTab] = useState('a_valider');
    const [projets, setProjets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('tous');
    const [selectedStatut, setSelectedStatut] = useState('tous');
    const [selectedEntite, setSelectedEntite] = useState('');
    const [regions, setRegions] = useState([]);
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
    
    const isInitialMount = useRef(true);
    const isFetching = useRef(false);

    // Tabs pour Directeur National
    const tabs = [
        { 
            id: 'a_valider', 
            label: 'À valider', 
            endpoint: '/recap/budget/directeur/ChefStatus/', 
            color: 'blue', 
            description: 'Projets pré-approuvés par le Chef ou réservés en attente de validation',
            icon: '📋'
        },
        { 
            id: 'approuves', 
            label: ' Approuvés', 
            endpoint: '/recap/budget/directeur/valides/', 
            color: 'green', 
            description: 'Projets approuvés par le Directeur National',
            icon: '✅'
        },
        { 
            id: 'reserve_directeur', 
            label: ' Réservés Directeur', 
            endpoint: '/recap/budget/directeur/reserve-directeur/', 
            color: 'orange', 
            description: 'Projets réservés par le Directeur National',
            icon: '🔄'
        },
        { 
            id: 'tous', 
            label: ' Tous', 
            endpoint: '/recap/budget/directeur/tous/', 
            color: 'gray', 
            description: 'Tous les projets',
            icon: '📊'
        }
    ];

    // Récupérer les listes pour les filtres
    useEffect(() => {
        const loadLists = async () => {
            try {
                const [regionsRes, directionsRes] = await Promise.all([
                    axiosInstance.get('/params/regions'),
                    axiosInstance.get('/params/directions')
                ]);
                setRegions(regionsRes.data.data || []);
                setDirections(directionsRes.data.data || []);
            } catch (err) {
                console.error("Erreur chargement listes:", err);
            }
        };
        loadLists();
    }, []);

    // Fonction pour obtenir le nom de l'entité (région ou direction) selon le projet
    const getEntiteNom = (projet) => {
        if (projet.direction_region_nom) {
            return projet.direction_region_nom;
        }
        if (projet.region_nom) return projet.region_nom;
        if (projet.direction_nom) return projet.direction_nom;
        return projet.region || projet.direction || '-';
    };

    // Fonction pour obtenir le statut badge
    const getStatutBadge = (projet) => {
        const statut = projet.statut_workflow || projet.statut_final || 'brouillon';
        const config = {
            brouillon: { label: 'Brouillon', color: '#9CA3AF', bg: 'bg-gray-100' },
            soumis: { label: 'Soumis', color: '#3B82F6', bg: 'bg-blue-100' },
            pre_approuve_chef: { label: 'Pré-approuvé Chef', color: '#8B5CF6', bg: 'bg-purple-100' },
            reserve_chef: { label: 'Réservé Chef', color: '#F59E0B', bg: 'bg-amber-100' },
            approuve_directeur: { label: 'Approuvé Directeur', color: '#10B981', bg: 'bg-green-100' },
            reserve_directeur: { label: 'Réservé Directeur', color: '#F59E0B', bg: 'bg-amber-100' },
            valide_directeur_region: { label: 'Validé Dir.Région', color: '#10B981', bg: 'bg-green-100' },
            valide_directeur_direction: { label: 'Validé Dir.Direction', color: '#10B981', bg: 'bg-green-100' },
            valide_divisionnaire: { label: 'Validé Div.', color: '#14B8A6', bg: 'bg-teal-100' },
            rejete_divisionnaire: { label: 'Rejeté Div.', color: '#EF4444', bg: 'bg-red-100' },
            annule_divisionnaire: { label: 'Annulé', color: '#6B7280', bg: 'bg-gray-100' }
        };
        const c = config[statut] || { label: statut, color: '#6B7280', bg: 'bg-gray-100' };
        return <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium ${c.bg} whitespace-nowrap`} style={{ color: c.color }}>{c.label}</span>;
    };

    const getBudgetTotal = (projet) => {
        if (projet.cout_initial_total) return parseFloat(projet.cout_initial_total);
        const prev = (parseFloat(projet.prev_n_plus2_total) || 0) + (parseFloat(projet.prev_n_plus3_total) || 0) + (parseFloat(projet.prev_n_plus4_total) || 0) + (parseFloat(projet.prev_n_plus5_total) || 0);
        const mensuel = parseFloat(projet.prev_n_plus1_total) || 0;
        return prev + mensuel;
    };

    // Fonction fetchProjets
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
            
            if (searchTerm) {
                params.append('code_division', searchTerm);
            }
            if (selectedType !== 'tous') {
                params.append('type_projet', selectedType);
            }
            if (selectedEntite) {
                params.append('entite_id', selectedEntite);
            }
            
            if (params.toString()) {
                url += `?${params.toString()}`;
            }
            
            console.log("🔍 Fetching projets Directeur:", url);
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
            console.error("❌ Erreur fetchProjets Directeur:", err);
            setProjets([]);
        } finally {
            isFetching.current = false;
            if (isInitial) {
                setInitialLoading(false);
            } else {
                setLoading(false);
            }
        }
    }, [activeTab, searchTerm, selectedType, selectedEntite]);

    // Chargement initial
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            fetchProjets(true);
            loadAllCounts();
        }
    }, [fetchProjets]);

    // Chargement lors du changement d'onglet
    useEffect(() => {
        if (!isInitialMount.current) {
            fetchProjets(false);
        }
    }, [activeTab, fetchProjets]);

    // Debounce pour les filtres
    const filterTimeout = useRef(null);
    useEffect(() => {
        if (!isInitialMount.current) {
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
    }, [searchTerm, selectedType, selectedEntite, fetchProjets]);

    // Charger les compteurs pour tous les tabs
    const loadAllCounts = async () => {
        const newCounts = {};
        for (const tab of tabs) {
            try {
                const response = await axiosInstance.get(tab.endpoint);
                newCounts[tab.id] = response.data?.count || response.data?.projets?.length || 0;
            } catch (err) {
                newCounts[tab.id] = 0;
            }
        }
        setCounts(newCounts);
    };

    // Fonction pour approuver (sans modal)
    const handleApprouver = async (projet) => {
        try {
            const projetId = projet.id || projet._id;
            const response = await axiosInstance.post(`/recap/budget/valider/directeur/${projetId}/`, {
                action: 'approuver',
                commentaire: ""
            });
            
            if (response.data.success) {
                setSuccessMessage(response.data.message);
                setShowSuccess(true);
                await fetchProjets(false);
                await loadAllCounts();
                setTimeout(() => setShowSuccess(false), 3000);
            }
        } catch (err) {
            console.error("Erreur approbation:", err);
            alert(err.response?.data?.error || "Erreur lors de l'approbation");
        }
    };

    // Ouvrir modal pour réserver (avec commentaire optionnel)
    const openValidationModal = (projet, action) => {
        setSelectedProjet(projet);
        setValidationAction(action);
        setValidationComment('');
        setShowValidationModal(true);
    };

    // Confirmer la réservation
    const confirmReservation = async () => {
        try {
            const projetId = selectedProjet.id || selectedProjet._id;
            const response = await axiosInstance.post(`/recap/budget/valider/directeur/${projetId}/`, {
                action: 'reserver',
                commentaire: validationComment || ""
            });
            
            if (response.data.success) {
                setSuccessMessage(response.data.message);
                setShowSuccess(true);
                await fetchProjets(false);
                await loadAllCounts();
                setTimeout(() => setShowSuccess(false), 3000);
            }
        } catch (err) {
            console.error("Erreur réservation:", err);
            alert(err.response?.data?.error || "Erreur lors de la réservation");
        }
        setShowValidationModal(false);
        setSelectedProjet(null);
    };

    // Composant ValidationActions
    const ValidationActions = ({ projet }) => {
        const canApprouver = projet.statut_workflow === 'pre_approuve_chef' || 
                             projet.statut_workflow === 'reserve_chef';
        const canReserver = projet.statut_workflow === 'pre_approuve_chef' || 
                            projet.statut_workflow === 'reserve_chef';
        
        if (!canApprouver && !canReserver) return null;
        
        return (
            <div className="flex items-center gap-2">
                <button
                    onClick={() => handleApprouver(projet)}
                    className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-medium hover:bg-green-600 transition whitespace-nowrap shadow-sm"
                >
                     Approuver
                </button>
                <button
                    onClick={() => openValidationModal(projet, 'reserver')}
                    className="px-3 py-1 bg-orange-500 text-white rounded-full text-xs font-medium hover:bg-orange-600 transition whitespace-nowrap shadow-sm"
                >
                     Réserver
                </button>
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

    // Fusion des régions et directions pour le filtre
    const allEntites = [
        ...regions.map(r => ({ _id: r.code_region || r._id, nom: r.nom_region, type: 'region' })),
        ...directions.map(d => ({ _id: d.code_direction || d._id, nom: d.nom_direction, type: 'direction' }))
    ];

    return (
        <>
            <ProjetsLayout
                title="Tableau de bord - Directeur National"
                subtitle="Approuvez ou réservez les projets pré-approuvés par le Chef"
                tabs={tabs}
                projets={projets}
                loading={loading}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                selectedStatut={selectedStatut}
                setSelectedStatut={setSelectedStatut}
                selectedRegion={selectedEntite}
                setSelectedRegion={setSelectedEntite}
                regions={allEntites}
                counts={counts}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                canShowValidationActions={activeTab === 'a_valider'}
                getStatutBadge={getStatutBadge}
                getBudgetTotal={getBudgetTotal}
                getRegionNom={getEntiteNom}
                onViewDetails={(projet) => { setSelectedProjet(projet); setShowDetailsModal(true); }}
                onViewHistory={(projet) => { setSelectedProjet(projet); setShowHistoryModal(true); }}
                validationActions={(projet) => <ValidationActions projet={projet} />}
                showValidationColumn={true}
                entiteType="mixte"
                getEntiteNom={getEntiteNom}
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

            {/* Modal de réservation */}
            {showValidationModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 w-[450px]">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">
                            Réserver le projet
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Projet: <span className="font-semibold">{selectedProjet?.code_division}</span>
                        </p>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Commentaire (optionnel)
                            </label>
                            <textarea
                                value={validationComment}
                                onChange={(e) => setValidationComment(e.target.value)}
                                rows="3"
                                className="w-full px-3 py-2 rounded-xl border border-gray-300 outline-none focus:border-orange-400"
                                placeholder="Ajoutez un commentaire (optionnel)..."
                            />
                        </div>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowValidationModal(false)}
                                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={confirmReservation}
                                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                            >
                                🔄 Réserver
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

export default ProjetsDirecteur;