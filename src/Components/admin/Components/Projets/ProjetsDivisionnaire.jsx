// Components/Projets/ProjetsDivisionnaire.jsx
import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../../../axios';
import ProjetsLayout from './ProjetsLayout';
import ValidationActions from './ValidationActions';
import DetailsProjetModal from './DetailsProjetModal';
import HistoriqueVersionsModal from './HistoriqueVersionsModal';
import { useDataFilter } from '../../Components/comon/DataFilter';

const ProjetsDivisionnaire = () => {
    const [activeTab, setActiveTab] = useState('valides-directeur');
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
    const [stats, setStats] = useState(null);

    const { getUserInfo } = useDataFilter();
    const userInfo = getUserInfo();

    const tabs = [
        { id: 'valides-directeur', label: 'À Traiter', endpoint: '/recap/budget/divisionnaire/valides-directeur/', color: 'blue', description: 'Projets validés par Directeur à traiter', icon: '📋' },
        { id: 'termines', label: ' Terminés', endpoint: '/recap/budget/divisionnaire/termines/', color: 'green', description: 'Projets terminés (validés définitivement)', icon: '✅' },
        { id: 'valides', label: 'Validés', endpoint: '/recap/budget/divisionnaire/valides/', color: 'purple', description: 'Projets déjà validés', icon: '⭐' },
        // { id: 'rejetes', label: 'Rejetés', endpoint: '/recap/budget/divisionnaire/rejetes/', color: 'red', description: 'Projets rejetés', icon: '❌' },
        // { id: 'tous', label: 'Tous', endpoint: '/recap/budget/divisionnaire/tous/', color: 'purple', description: 'Tous les projets accessibles', icon: '📊' },
        // { id: 'historique', label: 'Historique', endpoint: '/recap/budget/divisionnaire/historique/', color: 'gray', description: 'Historique complet', icon: '📜' }
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
            let responseStats = null;
            
            if (response.data?.success === true) {
                if (response.data.projets) projetsData = response.data.projets;
                else if (response.data.data) projetsData = response.data.data;
                if (response.data.stats) responseStats = response.data.stats;
            } else if (response.data?.projets) projetsData = response.data.projets;
            else if (response.data?.data) projetsData = response.data.data;
            else if (Array.isArray(response.data)) projetsData = response.data;
            
            setProjets(projetsData);
            setStats(responseStats);
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
            valide_directeur: { label: 'Validé Directeur', color: '#EC4899', bg: 'bg-pink-100' },
            valide_divisionnaire: { label: 'Validé Divisionnaire', color: '#14B8A6', bg: 'bg-teal-100' },
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
                title="Tableau de bord - Divisionnaire"
                subtitle="Validez les projets finalisés et consultez l'historique"
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
                stats={stats}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                canShowValidationActions={activeTab === 'valides-directeur'}
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

export default ProjetsDivisionnaire;