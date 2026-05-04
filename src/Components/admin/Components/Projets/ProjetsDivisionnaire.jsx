// Components/Projets/ProjetsDivisionnaire.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { axiosInstance } from '../../../../axios';
import ProjetsLayout from '../Projets/ProjetsLayout';
import DetailsProjetModal from '../Projets/DetailsProjetModal';
import HistoriqueVersionsModal from '../Projets/HistoriqueVersionsModal';

const ProjetsDivisionnaire = () => {
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
    const [showBatchValidationModal, setShowBatchValidationModal] = useState(false);
    const [selectedProjet, setSelectedProjet] = useState(null);
    const [validationAction, setValidationAction] = useState('');
    const [validationComment, setValidationComment] = useState('');
    const [batchStats, setBatchStats] = useState(null);
    const [batchProjets, setBatchProjets] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [counts, setCounts] = useState({});
    
    const isInitialMount = useRef(true);
    const isFetching = useRef(false);

    // Tabs pour Divisionnaire
    const tabs = [
        { 
            id: 'a_valider', 
            label: '📋 À valider', 
            endpoint: '/recap/budget/divisionnaire/valides-directeur/', 
            color: 'blue', 
            description: 'Projets approuvés par Directeur en attente de validation',
            icon: '📋'
        },
        { 
            id: 'valides', 
            label: '✅ Validés', 
            endpoint: '/recap/budget/divisionnaire/valides/', 
            color: 'green', 
            description: 'Projets validés par le Divisionnaire',
            icon: '✅'
        },
        { 
            id: 'rejetes', 
            label: '❌ Rejetés', 
            endpoint: '/recap/budget/divisionnaire/rejetes/', 
            color: 'red', 
            description: 'Projets rejetés par le Divisionnaire',
            icon: '❌'
        },
        { 
            id: 'annules', 
            label: '🚫 Annulés', 
            endpoint: '/recap/budget/divisionnaire/annules/', 
            color: 'gray', 
            description: 'Projets annulés par le Divisionnaire',
            icon: '🚫'
        },
        { 
            id: 'termines', 
            label: '🏁 Terminés', 
            endpoint: '/recap/budget/divisionnaire/termines/', 
            color: 'teal', 
            description: 'Projets terminés',
            icon: '🏁'
        },
        { 
            id: 'tous', 
            label: '📊 Tous', 
            endpoint: '/recap/budget/divisionnaire/tous/', 
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
        if (projet.direction_region_nom) return projet.direction_region_nom;
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
            valide_divisionnaire: { label: 'Validé Divisionnaire', color: '#14B8A6', bg: 'bg-teal-100' },
            rejete_divisionnaire: { label: 'Rejeté Divisionnaire', color: '#EF4444', bg: 'bg-red-100' },
            annule_divisionnaire: { label: 'Annulé', color: '#6B7280', bg: 'bg-gray-100' },
            termine_divisionnaire: { label: 'Terminé', color: '#14B8A6', bg: 'bg-teal-100' }
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

    // Charger les statistiques pour validation par lot
    const loadBatchStats = async () => {
        try {
            console.log("🔍 Chargement des statistiques de lot...");
            const response = await axiosInstance.get('/recap/budget/valider/divisionnaire/total/');
            console.log("📦 Réponse batch stats:", response.data);
            
            if (response.data) {
                setBatchStats({
                    count: response.data.count || 0,
                    annee: response.data.annee || new Date().getFullYear(),
                    total: response.data.total || {}
                });
                setBatchProjets(response.data.projets || []);
            }
        } catch (err) {
            console.error("❌ Erreur chargement stats lot:", err);
            setBatchStats({ count: 0, annee: new Date().getFullYear(), total: {} });
            setBatchProjets([]);
        }
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
            
            if (searchTerm) params.append('code_division', searchTerm);
            if (selectedType !== 'tous') params.append('type_projet', selectedType);
            if (selectedEntite) params.append('entite_id', selectedEntite);
            
            if (params.toString()) url += `?${params.toString()}`;
            
            console.log("🔍 Fetching projets Divisionnaire:", url);
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
            
            // Charger les stats du lot uniquement sur l'onglet "À valider"
            if (activeTab === 'a_valider') {
                await loadBatchStats();
            }
            
        } catch (err) {
            console.error("❌ Erreur fetchProjets Divisionnaire:", err);
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
            if (filterTimeout.current) clearTimeout(filterTimeout.current);
            filterTimeout.current = setTimeout(() => fetchProjets(false), 300);
        }
        return () => {
            if (filterTimeout.current) clearTimeout(filterTimeout.current);
        };
    }, [searchTerm, selectedType, selectedEntite, fetchProjets]);

    // Validation individuelle
    const handleIndividualValidation = async (action, projet, comment = '') => {
        try {
            const projetId = projet.id || projet._id;
            const response = await axiosInstance.post(`/recap/budget/valider/divisionnaire/${projetId}/`, {
                action: action,
                commentaire: comment
            });
            
            if (response.data.success) {
                setSuccessMessage(response.data.message);
                setShowSuccess(true);
                await fetchProjets(false);
                setTimeout(() => setShowSuccess(false), 3000);
            }
        } catch (err) {
            console.error("Erreur validation:", err);
            alert(err.response?.data?.error || "Erreur lors de la validation");
        }
    };

    // Validation par lot
    const handleBatchValidation = async (action, comment = '') => {
        try {
            const response = await axiosInstance.post('/recap/budget/valider/divisionnaire/total/', {
                action: action,
                commentaire: comment
            });
            
            if (response.data.success) {
                setSuccessMessage(response.data.message);
                setShowSuccess(true);
                await fetchProjets(false);
                await loadBatchStats();
                setShowBatchValidationModal(false);
                setTimeout(() => setShowSuccess(false), 3000);
            }
        } catch (err) {
            console.error("Erreur validation lot:", err);
            alert(err.response?.data?.error || "Erreur lors de la validation du lot");
        }
    };

    // Ouvrir modal pour validation individuelle
    const openValidationModal = (projet, action) => {
        setSelectedProjet(projet);
        setValidationAction(action);
        setValidationComment('');
        setShowValidationModal(true);
    };

    // Ouvrir modal pour validation par lot
    const openBatchValidationModal = () => {
        setValidationComment('');
        setShowBatchValidationModal(true);
    };

    // Confirmer validation individuelle
    const confirmIndividualValidation = async () => {
        await handleIndividualValidation(validationAction, selectedProjet, validationComment);
        setShowValidationModal(false);
        setSelectedProjet(null);
    };

    // Composant ValidationActions pour validation individuelle
    const ValidationActions = ({ projet }) => {
        const canValidate = projet.statut_workflow === 'approuve_directeur';
        if (!canValidate) return null;
        
        return (
            <div className="flex items-center gap-2">
                <button
                    onClick={() => openValidationModal(projet, 'valider')}
                    className="px-2 py-1 bg-green-500 text-white rounded-md text-xs font-medium hover:bg-green-600 transition"
                >
                    ✓ Valider
                </button>
                <button
                    onClick={() => openValidationModal(projet, 'rejeter')}
                    className="px-2 py-1 bg-red-500 text-white rounded-md text-xs font-medium hover:bg-red-600 transition"
                >
                    ✗ Rejeter
                </button>
                <button
                    onClick={() => openValidationModal(projet, 'annuler')}
                    className="px-2 py-1 bg-gray-500 text-white rounded-md text-xs font-medium hover:bg-gray-600 transition"
                >
                    🚫 Annuler
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
                title="Tableau de bord - Divisionnaire"
                subtitle="Validez, rejetez ou annulez les projets approuvés par le Directeur"
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
                entiteLabel="Entité"
                getEntiteNom={getEntiteNom}
                // 🔥 Bouton de validation par lot - uniquement pour Divisionnaire
                customActionsButton={
                    activeTab === 'a_valider' && batchStats && batchStats.count > 0 ? (
                        <button
                            onClick={openBatchValidationModal}
                            className="bg-[#FF8500] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#e67800] transition flex items-center gap-2 shadow-md"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            Validation par lot ({batchStats.count})
                        </button>
                    ) : null
                }
            />
            
            {/* Modal de validation par lot */}
            {showBatchValidationModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-[700px] max-h-[85vh] flex flex-col overflow-hidden">
                        {/* En-tête */}
                        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-white">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Validation par lot</h2>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {batchStats?.count} projet(s) à valider pour l'année <strong>{batchStats?.annee}</strong>
                                    </p>
                                </div>
                                <button
                                    onClick={() => setShowBatchValidationModal(false)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition"
                                >
                                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Totaux */}
                        {batchStats?.total && (
                            <div className="p-4 bg-gray-50 border-b border-gray-200">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                                        <p className="text-xs text-gray-500">💰 Total Budget</p>
                                        <p className="text-xl font-bold text-green-600">
                                            {batchStats.total.cout_initial_total?.toLocaleString() || 0} DA
                                        </p>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                                        <p className="text-xs text-gray-500">📊 Total DEV</p>
                                        <p className="text-xl font-bold text-orange-600">
                                            {batchStats.total.cout_initial_dont_dex?.toLocaleString() || 0} DA
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Liste des projets */}
                        <div className="flex-1 overflow-y-auto p-4">
                            <h3 className="font-semibold text-gray-700 mb-3">📋 Projets concernés</h3>
                            <div className="space-y-2 max-h-96 overflow-y-auto">
                                {batchProjets.map((projet, idx) => (
                                    <div key={idx} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                        <div className="flex justify-between items-center">
                                            <div className="flex-1">
                                                <p className="font-mono text-sm font-semibold text-gray-800">{projet.code_division}</p>
                                                <p className="text-xs text-gray-500">{projet.libelle}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-bold text-gray-800">{projet.cout_initial_total?.toLocaleString() || 0} DA</p>
                                                {projet.cout_initial_dont_dex > 0 && (
                                                    <p className="text-xs text-orange-600">DEV: {projet.cout_initial_dont_dex?.toLocaleString()} DA</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="p-4 border-t border-gray-200 bg-gray-50">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Commentaire (optionnel)
                                </label>
                                <textarea
                                    value={validationComment}
                                    onChange={(e) => setValidationComment(e.target.value)}
                                    rows="2"
                                    className="w-full px-3 py-2 rounded-xl border border-gray-300 outline-none focus:border-orange-400"
                                    placeholder="Ajoutez un commentaire pour tous les projets..."
                                />
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleBatchValidation('valider', validationComment)}
                                    className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition"
                                >
                                    ✓ Tout valider
                                </button>
                                <button
                                    onClick={() => handleBatchValidation('rejeter', validationComment)}
                                    className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition"
                                >
                                    ✗ Tout rejeter
                                </button>
                                <button
                                    onClick={() => handleBatchValidation('annuler', validationComment)}
                                    className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition"
                                >
                                    🚫 Tout annuler
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
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

            {/* Modal de validation individuelle */}
            {showValidationModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 w-[450px]">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">
                            {validationAction === 'valider' && '✓ Valider le projet'}
                            {validationAction === 'rejeter' && '✗ Rejeter le projet'}
                            {validationAction === 'annuler' && '🚫 Annuler le projet'}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Projet: <span className="font-semibold">{selectedProjet?.code_division}</span>
                        </p>
                        {(validationAction === 'rejeter' || validationAction === 'annuler') && (
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Commentaire <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={validationComment}
                                    onChange={(e) => setValidationComment(e.target.value)}
                                    rows="3"
                                    className="w-full px-3 py-2 rounded-xl border border-gray-300 outline-none focus:border-orange-400"
                                    placeholder="Expliquez votre décision..."
                                />
                                {validationComment.trim() === '' && (
                                    <p className="text-xs text-red-500 mt-1">⚠️ Un commentaire est obligatoire</p>
                                )}
                            </div>
                        )}
                        {validationAction === 'valider' && (
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
                        )}
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowValidationModal(false)}
                                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={confirmIndividualValidation}
                                disabled={(validationAction === 'rejeter' || validationAction === 'annuler') && validationComment.trim() === ''}
                                className={`px-4 py-2 rounded-lg text-white transition ${
                                    validationAction === 'valider' ? 'bg-green-500 hover:bg-green-600' :
                                    validationAction === 'rejeter' ? 'bg-red-500 hover:bg-red-600' :
                                    'bg-gray-500 hover:bg-gray-600'
                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                Confirmer
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

export default ProjetsDivisionnaire;