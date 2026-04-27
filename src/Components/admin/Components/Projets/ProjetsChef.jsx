// Components/Projets/ProjetsChef.jsx
import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../../../axios';
import ProjetsLayout from './ProjetsLayout';
import ValidationActions from './ValidationActions';
import DetailsProjetModal from './DetailsProjetModal';
import HistoriqueVersionsModal from './HistoriqueVersionsModal';
import { useDataFilter } from '../../Components/comon/DataFilter';

// Icône d'export Excel
const ExcelIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M10 14h4" />
        <path d="M12 12v4" />
        <path d="M8 12h.01" />
        <path d="M16 12h.01" />
    </svg>
);

const ProjetsChef = () => {
    const [activeTab, setActiveTab] = useState('agentStatus');
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
    const [exporting, setExporting] = useState(false);

    const { getUserInfo } = useDataFilter();
    const userInfo = getUserInfo();

    // Onglets pour Chef (GET endpoints)
    const tabs = [
        { 
            id: 'agentStatus', 
            label: '  À Traiter', 
            endpoint: '/recap/budget/chef/AgentStatus/', 
            color: 'blue', 
            description: 'Projets validés par Agent à traiter',
            icon: '📋'
        },
        { 
            id: 'valides', 
            label: '  Validés', 
            endpoint: '/recap/budget/chef/valides/', 
            color: 'green', 
            description: 'Projets que vous avez déjà validés',
            icon: '✅'
        },
        { 
            id: 'reserveChef', 
            label: '  Réservés', 
            endpoint: '/recap/budget/chef/reserve-chef/', 
            color: 'orange', 
            description: 'Projets que vous avez réservés ',
            icon: '🔄'
        },
        { 
            id: 'valide', 
            label: '  valide', 
            endpoint: '/recap/budget/divisionnaire/valides/', 
            color: 'purple', 
            description: 'Tous les projets valide par divisionnaire peut export excel',
            icon: '📊'
        },
        // { 
        //     id: 'historique', 
        //     label: '  Historique', 
        //     endpoint: '/recap/budget/chef/historique/', 
        //     color: 'gray', 
        //     description: 'Historique complet de tous les projets',
        //     icon: '📜'
        // }
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

    const handleExportExcel = async () => {
        setExporting(true);
        try {
            const response = await axiosInstance.get(
                '/recap/budget/export/valides-divisionnaire/',
                {
                    responseType: 'blob'
                }
            );
            
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `projets_valides_divisionnaire.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
            
            handleSuccess('Export Excel réussi');
        } catch (err) {
            console.error("Erreur export Excel:", err);
            alert("Erreur lors de l'export Excel");
        } finally {
            setExporting(false);
        }
    };

    const getStatutBadge = (statut) => {
        const statutConfig = {
            brouillon: { label: 'Brouillon', color: '#9CA3AF', bg: 'bg-gray-100' },
            soumis: { label: 'Soumis', color: '#3B82F6', bg: 'bg-blue-100' },
            valide_directeur_region: { label: 'Validé DR', color: '#3B82F6', bg: 'bg-blue-100' },
            valide_agent: { label: 'Validé Agent', color: '#8B5CF6', bg: 'bg-purple-100' },
            reserve_agent: { label: 'Réservé Agent', color: '#F59E0B', bg: 'bg-amber-100' },
            valide_chef: { label: 'Validé Chef', color: '#10B981', bg: 'bg-green-100' },
            reserve_chef: { label: 'Réservé Chef', color: '#F59E0B', bg: 'bg-amber-100' },
            valide_directeur: { label: 'Validé Directeur', color: '#EC4899', bg: 'bg-pink-100' },
            valide_divisionnaire: { label: 'Validé Divisionnaire', color: '#14B8A6', bg: 'bg-teal-100' },
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

    // Déterminer si la colonne Validation doit être affichée
    const canShowValidationColumn = () => {
        return activeTab === 'agentStatus' ;
                // return activeTab === 'agentStatus' || activeTab === 'reserveChef';

    };

    return (
        <>
            <ProjetsLayout
                title="Tableau de bord - Chef"
                subtitle="Gérez les projets validés par l'Agent, validez et suivez l'avancement"
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
                canShowValidationActions={canShowValidationColumn()}
                getStatutBadge={getStatutBadge}
                getBudgetTotal={getBudgetTotal}
                getRegionNom={getRegionNom}
                onViewDetails={(projet) => { 
                    setSelectedProjet(projet); 
                    setShowDetailsModal(true); 
                }}
                validationActions={(projet) => <ValidationActions projet={projet} onActionSuccess={handleSuccess} />}
                showValidationColumn={canShowValidationColumn()}
            />
            
            {/* Bouton Export Excel */}
            <div className="fixed bottom-8 right-8 z-50">
                <button
                    onClick={handleExportExcel}
                    disabled={exporting}
                    className="px-5 py-2.5 bg-green-600 text-white rounded-full text-sm font-medium hover:bg-green-700 transition-all duration-200 flex items-center gap-2 shadow-md shadow-green-200 disabled:opacity-50"
                >
                    {exporting ? (
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                    ) : (
                        <ExcelIcon />
                    )}
                    {exporting ? 'Export...' : 'Export Excel'}
                </button>
            </div>
            
            {/* Modal Détails du projet */}
            <DetailsProjetModal 
                isOpen={showDetailsModal} 
                onClose={() => { 
                    setShowDetailsModal(false); 
                    setSelectedProjet(null); 
                }} 
                projet={selectedProjet} 
                axiosInstance={axiosInstance} 
            />
            
            {/* Modal Historique des versions (optionnel) */}
            <HistoriqueVersionsModal 
                isOpen={showHistoryModal} 
                onClose={() => { 
                    setShowHistoryModal(false); 
                    setSelectedProjet(null); 
                }} 
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

export default ProjetsChef;