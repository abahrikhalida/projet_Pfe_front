// Components/Projets/ProjetsResponsable.jsx
import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../../../axios';
import ProjetsLayout from './ProjetsLayout';
import DetailsProjetModal from './DetailsProjetModal';
import HistoriqueVersionsModal from './HistoriqueVersionsModal';
import AjouterProjetModal from './AjouterProjetModal';
import { useDataFilter } from '../../Components/comon/DataFilter';

const ProjetsResponsable = () => {
    const [activeTab, setActiveTab] = useState('soumis');
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
    const [modalKey, setModalKey] = useState(0);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [counts, setCounts] = useState({});
    const [userIds, setUserIds] = useState({
        region_id: null,
        structure_id: null
    });

    const { getUserInfo } = useDataFilter();
    const userInfo = getUserInfo();

    // 🔥 Récupérer les IDs depuis localStorage
    useEffect(() => {
        const regionId = localStorage.getItem('region_id');
        const structureId = localStorage.getItem('structure_id');
        
        setUserIds({
            region_id: regionId,
            structure_id: structureId
        });
        
        console.log("👤 IDs utilisateur région:", { regionId, structureId });
    }, []);

    const tabs = [
        { id: 'soumis', label: ' Soumis', endpoint: '/recap/budget/projets/responsable/?statut_workflow=soumis', color: 'blue', description: 'Projets soumis pour validation', icon: '📋' },
        // { id: 'pre_approuve', label: '✓ Pré-approuvés', endpoint: '/recap/budget/projets/responsable/?statut_workflow=pre_approuve_chef', color: 'purple', description: 'Projets pré-approuvés par le Chef', icon: '✓' },
        // { id: 'reserve_chef', label: '🔄 Réservés Chef', endpoint: '/recap/budget/projets/responsable/?statut_workflow=reserve_chef', color: 'orange', description: 'Projets réservés par le Chef', icon: '🔄' },
        // { id: 'reserve_directeur', label: '🔄 Réservés Directeur', endpoint: '/recap/budget/projets/responsable/?statut_workflow=reserve_directeur', color: 'orange', description: 'Projets réservés par le Directeur', icon: '🔄' },
        // { id: 'approuve', label: '✅ Approuvés', endpoint: '/recap/budget/projets/responsable/?statut_workflow=approuve_directeur', color: 'green', description: 'Projets approuvés par le Directeur', icon: '✅' },
        // { id: 'valides', label: '✅ Validés', endpoint: '/recap/budget/projets/responsable/?statut_final=valide_divisionnaire', color: 'green', description: 'Projets validés par le Divisionnaire', icon: '✅' },
        // { id: 'rejetes', label: '❌ Rejetés', endpoint: '/recap/budget/projets/responsable/?statut_final=rejete_divisionnaire', color: 'red', description: 'Projets rejetés', icon: '❌' },
        // { id: 'annules', label: '🚫 Annulés', endpoint: '/recap/budget/projets/responsable/?statut_final=annule_divisionnaire', color: 'gray', description: 'Projets annulés', icon: '🚫' },
        // { id: 'termines', label: '🏁 Terminés', endpoint: '/recap/budget/projets/responsable/?statut_final=termine_divisionnaire', color: 'teal', description: 'Projets terminés', icon: '🏁' }
    ];

    useEffect(() => {
        fetchRegions();
    }, []);

    useEffect(() => {
        if (activeTab) {
            fetchProjets();
        }
    }, [activeTab, searchTerm, selectedType, selectedRegion]);

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
            if (!currentTab) {
                console.error("Tab non trouvé:", activeTab);
                setProjets([]);
                setLoading(false);
                return;
            }
            
            let url = currentTab.endpoint;
            const params = new URLSearchParams();
            
            // 🔥 Ajouter les IDs utilisateur
            if (userIds.region_id) {
                params.append('region_id', userIds.region_id);
            }
            if (userIds.structure_id) {
                params.append('structure_id', userIds.structure_id);
            }
            
            // Filtres
            if (searchTerm) {
                params.append('code_division', searchTerm);
            }
            if (selectedType !== 'tous') {
                params.append('type_projet', selectedType);
            }
            if (selectedRegion) {
                params.append('region_filter', selectedRegion);
            }
            
            if (params.toString()) {
                url += `&${params.toString()}`;
            }
            
            console.log("🔍 Fetching projets avec URL:", url);
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
                let url = tab.endpoint;
                const params = new URLSearchParams();
                
                if (userIds.region_id) params.append('region_id', userIds.region_id);
                if (userIds.structure_id) params.append('structure_id', userIds.structure_id);
                
                if (params.toString()) {
                    url += `&${params.toString()}`;
                }
                
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
            brouillon: { label: 'Brouillon', color: '#9CA3AF', bg: 'bg-gray-100' },
            soumis: { label: 'Soumis', color: '#3B82F6', bg: 'bg-blue-100' },
            pre_approuve_chef: { label: 'Pré-approuvé Chef', color: '#8B5CF6', bg: 'bg-purple-100' },
            reserve_chef: { label: 'Réservé Chef', color: '#F59E0B', bg: 'bg-amber-100' },
            reserve_directeur: { label: 'Réservé Directeur', color: '#F59E0B', bg: 'bg-amber-100' },
            approuve_directeur: { label: 'Approuvé Directeur', color: '#10B981', bg: 'bg-green-100' },
            valide_divisionnaire: { label: 'Validé', color: '#10B981', bg: 'bg-green-100' },
            rejete_divisionnaire: { label: 'Rejeté', color: '#EF4444', bg: 'bg-red-100' },
            annule_divisionnaire: { label: 'Annulé', color: '#6B7280', bg: 'bg-gray-100' },
            termine_divisionnaire: { label: 'Terminé', color: '#14B8A6', bg: 'bg-teal-100' }
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
        if (!regionId) return '-';
        const region = regions.find(r => r._id === regionId || r.code_region === regionId);
        return region?.nom_region || regionId;
    };

    // 🔥 Actions pour responsable région avec gestion correcte de l'ID
    const ResponsableActions = ({ projet }) => {
        const projetId = projet._id || projet.id;
        
        console.log("🔍 Projet complet (région):", projet);
        console.log("🆔 ID trouvé:", projetId);
        
        return (
            <div className="flex items-center gap-2">
                <button 
                    onClick={() => { 
                        setSelectedProjet(projet); 
                        setShowHistoryModal(true); 
                    }} 
                    className="p-1.5 hover:bg-blue-50 rounded-full transition" 
                    title="Historique"
                >
                    <svg className="w-4 h-4 text-gray-500 hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
                <button 
                    onClick={() => { 
                        console.log("👁️ Détails projet:", projet);
                        console.log("🆔 ID du projet (MongoDB):", projetId);
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
            </div>
        );
    };

    return (
        <>
            <ProjetsLayout
                title="Tableau de bord - Responsable Structure"
                subtitle="Créez et gérez vos projets, suivez leur avancement"
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
                canShowValidationActions={false}
                getStatutBadge={getStatutBadge}
                getBudgetTotal={getBudgetTotal}
                getRegionNom={getRegionNom}
                onViewHistory={(projet) => { setSelectedProjet(projet); setShowHistoryModal(true); }}
                onViewDetails={(projet) => { 
                    console.log("📋 onViewDetails appelé avec projet:", projet);
                    setSelectedProjet(projet); 
                    setShowDetailsModal(true); 
                }}
                validationActions={(projet) => <ResponsableActions projet={projet} />}
                showValidationColumn={false}
                entiteType="region"
                getEntiteNom={(projet) => getRegionNom(projet.region_id || projet.region)}
            />
            
            {/* Bouton Ajouter Projet - visible pour responsable */}
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
            
            {/* Modal de création */}
            <AjouterProjetModal
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
            
            <HistoriqueVersionsModal 
                isOpen={showHistoryModal} 
                onClose={() => { setShowHistoryModal(false); setSelectedProjet(null); }} 
                projet={selectedProjet} 
                axiosInstance={axiosInstance} 
            />
            
            {showSuccess && (
                <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-lg shadow-xl z-50 text-sm">
                    ✅ {successMessage}
                </div>
            )}
        </>
    );
};

export default ProjetsResponsable;