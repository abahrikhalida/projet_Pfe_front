// Components/Projets/ProjetsResponsable.jsx
import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../../../axios';
import ProjetsLayout from './ProjetsLayout';
import DetailsProjetModal from './DetailsProjetModal';
import HistoriqueVersionsModal from './HistoriqueVersionsModal';
import AjouterProjetModal from './AjouterProjetModal';
import { useDataFilter } from '../../Components/comon/DataFilter';

const ProjetsResponsable = () => {
    const [activeTab, setActiveTab] = useState('brouillon');
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

    const { getUserInfo } = useDataFilter();
    const userInfo = getUserInfo();

    const tabs = [
        { id: 'soumis', label: ' Soumis', endpoint: '/recap/budget/projets/responsable/?statut=soumis', color: 'blue', description: 'Projets soumis pour validation', icon: '📋' },
        // { id: 'reserve_agent', label: '🔄 Réservé Agent', endpoint: '/recap/budget/projets/responsable/?statut=reserve_agent', color: 'orange', description: 'Projets réservés par l\'Agent', icon: '🔄' },
        // { id: 'reserve_chef', label: ' Réservé Chef', endpoint: '/recap/budget/projets/responsable/?statut=reserve_chef', color: 'orange', description: 'Projets réservés par le Chef', icon: '🔄' },
        // { id: 'reserve_directeur', label: ' Réservé Directeur', endpoint: '/recap/budget/projets/responsable/?statut=reserve_directeur', color: 'orange', description: 'Projets réservés par le Directeur', icon: '🔄' },
        { id: 'Termine_divisionnaire', label: ' Terminés', endpoint: '/recap/budget/divisionnaire/termines/', color: 'green', description: ' etat final des Projets ', icon: '✅' },
        { id: 'valide_divisionnaire', label: ' Valide', endpoint: '/recap/budget/divisionnaire/valides/', color: 'green', description: ' Projets  Valide  ', icon: '✅' },

        { id: 'rejete', label: ' Rejetés', endpoint: '/recap/budget/divisionnaire/rejetes/', color: 'red', description: 'Projets rejetés', icon: '❌' }
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

    const handleSuccess = (message) => {
        setSuccessMessage(message);
        setShowSuccess(true);
        fetchProjets();
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const handleOpenModal = (projet = null) => {
        // Responsable peut créer (pas modifier)
        if (!projet) {
            setSelectedProjet(null);
            setModalKey(prev => prev + 1);
            setShowCreateModal(true);
        }
    };

    const handleSoumettre = async (projet) => {
        try {
            const response = await axiosInstance.post(`/recap/budget/soumettre/${projet.id}/`);
            if (response.data.success) {
                handleSuccess('Projet soumis avec succès');
            }
        } catch (err) {
            console.error("Erreur lors de la soumission:", err);
            alert("Erreur lors de la soumission du projet");
        }
    };

    const getStatutBadge = (statut) => {
        const config = {
            brouillon: { label: 'Brouillon', color: '#9CA3AF', bg: 'bg-gray-100' },
            soumis: { label: 'Soumis', color: '#3B82F6', bg: 'bg-blue-100' },
            reserve_agent: { label: 'Réservé Agent', color: '#F59E0B', bg: 'bg-amber-100' },
            reserve_chef: { label: 'Réservé Chef', color: '#F59E0B', bg: 'bg-amber-100' },
            reserve_directeur: { label: 'Réservé Directeur', color: '#F59E0B', bg: 'bg-amber-100' },
            valide_divisionnaire: { label: 'Validé', color: '#10B981', bg: 'bg-green-100' },
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

    // Composant personnalisé pour les actions Responsable (création + soumission)
    const ResponsableActions = ({ projet }) => (
        <div className="flex items-center gap-2">
            <button
                onClick={() => { setSelectedProjet(projet); setShowHistoryModal(true); }}
                className="p-1.5 hover:bg-blue-50 rounded-full transition"
                title="Historique"
            >
                <svg className="w-4 h-4 text-gray-500 hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
            <button
                onClick={() => { setSelectedProjet(projet); setShowDetailsModal(true); }}
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
                onViewDetails={(projet) => { setSelectedProjet(projet); setShowDetailsModal(true); }}
                validationActions={(projet) => <ResponsableActions projet={projet} />}
                showValidationColumn={false}
                customActionsColumn={true}
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

export default ProjetsResponsable;