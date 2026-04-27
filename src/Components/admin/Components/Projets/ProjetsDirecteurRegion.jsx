// Components/Projets/ProjetsDirecteurRegion.jsx
import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../../../axios';
import ProjetsLayout from './ProjetsLayout';
import ValidationActions from './ValidationActions';
import DetailsProjetModal from './DetailsProjetModal';
import HistoriqueVersionsModal from './HistoriqueVersionsModal';
import { useDataFilter } from '../../Components/comon/DataFilter';

const ProjetsDirecteurRegion = () => {
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
    const [counts, setCounts] = useState({});

    const { getUserInfo } = useDataFilter();
    const userInfo = getUserInfo();

    // Onglets pour Directeur Région (GET endpoints)
    const tabs = [
        { id: 'soumis', label: ' Soumis', endpoint: '/recap/budget/directeur-region/soumis/', color: 'blue', description: 'Projets en attente de validation', icon: '📋' },
        { id: 'valides', label: ' Validés', endpoint: '/recap/budget/directeur-region/valides/', color: 'green', description: 'Projets validés par DR', icon: '✅' },
        { id: 'rejetes', label: ' Rejetés', endpoint: '/recap/budget/directeur-region/rejetes/', color: 'red', description: 'Projets rejetés', icon: '❌' },

        { id: 'reserveChef', label: ' Réservés Chef', endpoint: '/recap/budget/directeur-region/reserve-chef/', color: 'orange', description: 'Projets réservés par le Chef', icon: '🔄' },
        { id: 'reserveDirecteur', label: 'Réservés Directeur', endpoint: '/recap/budget/directeur-region/reserve-directeur/', color: 'orange', description: 'Projets réservés par le Directeur', icon: '🔄' },
        // { id: 'tous', label: ' Tous', endpoint: '/recap/budget/directeur-region/tous/', color: 'purple', description: 'Tous les projets de la région', icon: '📊' },
        // { id: 'historique', label: 'Historique', endpoint: '/recap/budget/directeur-region/historique/', color: 'gray', description: 'Historique complet', icon: '📜' },
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
            let allRegions = response.data.data || [];
            
            // Filtrer les régions selon le rôle du directeur région
            if (userInfo.role === 'directeur_region' && userInfo.regionId) {
                allRegions = allRegions.filter(r => r._id === userInfo.regionId);
                setSelectedRegion(userInfo.regionId);
            }
            
            setRegions(allRegions);
        } catch (err) {
            console.error("Erreur chargement régions:", err);
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
            console.log(`✅ Chargé ${projetsData.length} projets pour onglet ${activeTab}`);
        } catch (err) {
            console.error("Erreur chargement projets:", err);
            setProjets([]);
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

    const getStatutBadge = (statut) => {
        const statutConfig = {
            brouillon: { label: 'Brouillon', color: '#9CA3AF', bg: 'bg-gray-100' },
            soumis: { label: 'Soumis', color: '#3B82F6', bg: 'bg-blue-100' },
            valide_directeur_region: { label: 'Validé DR', color: '#10B981', bg: 'bg-green-100' },
            reserve_agent: { label: 'Réservé Agent', color: '#F59E0B', bg: 'bg-amber-100' },
            reserve_chef: { label: 'Réservé Chef', color: '#F59E0B', bg: 'bg-amber-100' },
            reserve_directeur: { label: 'Réservé Directeur', color: '#F59E0B', bg: 'bg-amber-100' },
            valide_agent: { label: 'Validé Agent', color: '#8B5CF6', bg: 'bg-purple-100' },
            valide_chef: { label: 'Validé Chef', color: '#EC4899', bg: 'bg-pink-100' },
            valide_directeur: { label: 'Validé Directeur', color: '#14B8A6', bg: 'bg-teal-100' },
            valide_divisionnaire: { label: 'Validé Divisionnaire', color: '#06B6D4', bg: 'bg-cyan-100' },
            rejete: { label: 'Rejeté', color: '#EF4444', bg: 'bg-red-100' },
            cloture: { label: 'Clôturé', color: '#6B7280', bg: 'bg-gray-100' }
        };
        const config = statutConfig[statut] || { label: statut, color: '#6B7280', bg: 'bg-gray-100' };
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg}`} style={{ color: config.color }}>
                {config.label}
            </span>
        );
    };

    const getBudgetTotal = (projet) => {
        if (projet.cout_initial_total) {
            return parseFloat(projet.cout_initial_total);
        }
        const prevTotal = (parseFloat(projet.prev_n_plus2_total) || 0) +
                         (parseFloat(projet.prev_n_plus3_total) || 0) +
                         (parseFloat(projet.prev_n_plus4_total) || 0) +
                         (parseFloat(projet.prev_n_plus5_total) || 0);
        const mensuelTotal = (parseFloat(projet.prev_n_plus1_total) || 0);
        return prevTotal + mensuelTotal;
    };

    const getRegionNom = (regionId) => {
        const region = regions.find(r => r._id === regionId);
        return region?.nom_region || regionId || '-';
    };

    return (
        <>
            <ProjetsLayout
                title="Tableau de bord - Directeur Région"
                subtitle="Gérez les projets de votre région, validez et suivez l'avancement"
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
                canShowValidationActions={activeTab === 'soumis' || activeTab === 'reserveChef' || activeTab === 'reserveDirecteur'}
                getStatutBadge={getStatutBadge}
                getBudgetTotal={getBudgetTotal}
                getRegionNom={getRegionNom}
                onViewHistory={(projet) => { setSelectedProjet(projet); setShowHistoryModal(true); }}
                onViewDetails={(projet) => { setSelectedProjet(projet); setShowDetailsModal(true); }}
                validationActions={(projet) => <ValidationActions projet={projet} onActionSuccess={handleSuccess} />}
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

export default ProjetsDirecteurRegion;