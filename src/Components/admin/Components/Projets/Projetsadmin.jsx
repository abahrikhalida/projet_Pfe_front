// Components/Projets/ProjetsAdmin.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { axiosInstance } from '../../../../axios';
import { ReactComponent as EditIcon } from '../../../../Assets/Icons/edit.svg';
import { ReactComponent as EyeIcon } from '../../../../Assets/Icons/eye-svgrepo-com.svg';
import ProjetsLayout from './ProjetsLayout';
import ModifierProjetAdminModal from './ModifierProjetAdminModal';
import DetailsProjetModal from './DetailsProjetModal';
import { useDataFilter } from '../../Components/comon/DataFilter';

const ProjetsAdmin = () => {
    const [modalKey, setModalKey] = useState(0);
    const [projets, setProjets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatut, setSelectedStatut] = useState('tous');
    const [selectedType, setSelectedType] = useState('tous');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [regions, setRegions] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedProjet, setSelectedProjet] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [counts, setCounts] = useState({});
    const [stats, setStats] = useState(null);

    const { getUserInfo } = useDataFilter();
    const userInfo = getUserInfo();

    const tabs = [
        { id: 'tous', label: ' Tous', endpoint: '/recap/budget/divisionnaire/termines/', color: 'purple', description: 'Tous les projets terminés', icon: '📊' }
    ];

    useEffect(() => {
        fetchRegions();
        fetchProjets();
    }, []);

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
            const response = await axiosInstance.get('/recap/budget/divisionnaire/termines/');
            
            // ✅ Parser la structure de réponse correcte
            let projetsData = [];
            let responseStats = null;
            
            // Structure: { success: true, stats: {...}, count: 4, par_region: {...}, projets: [...] }
            if (response.data && response.data.success === true) {
                // Récupérer les projets
                if (response.data.projets && Array.isArray(response.data.projets)) {
                    projetsData = response.data.projets;
                } else if (response.data.data && Array.isArray(response.data.data)) {
                    projetsData = response.data.data;
                }
                // Récupérer les statistiques
                if (response.data.stats) {
                    responseStats = response.data.stats;
                    setStats(responseStats);
                }
                console.log("Stats:", responseStats);
            } else if (Array.isArray(response.data)) {
                projetsData = response.data;
            } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
                projetsData = response.data.data;
            }
            
            setProjets(projetsData);
            setCounts({ tous: projetsData.length });
            console.log(`✅ Admin: ${projetsData.length} projets chargés depuis /divisionnaire/termines/`);
            console.log("Projets:", projetsData);
        } catch (err) {
            console.error("Erreur chargement projets:", err);
        } finally {
            setLoading(false);
        }
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
            valide_agent: { label: 'Validé Agent', color: '#8B5CF6', bg: 'bg-purple-100' },
            valide_chef: { label: 'Validé Chef', color: '#F59E0B', bg: 'bg-amber-100' },
            valide_directeur: { label: 'Validé Directeur', color: '#EC4899', bg: 'bg-pink-100' },
            valide_divisionnaire: { label: 'Validé Divisionnaire', color: '#14B8A6', bg: 'bg-teal-100' },
            rejete: { label: 'Rejeté', color: '#EF4444', bg: 'bg-red-100' }
        };
        const config = statutConfig[statut] || statutConfig.brouillon;
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg}`} style={{ color: config.color }}>
                {config.label}
            </span>
        );
    };

    const getBudgetTotal = (projet) => {
        if (projet.cout_initial_total) return parseFloat(projet.cout_initial_total);
        const prev = (parseFloat(projet.prev_n_plus2_total) || 0) + (parseFloat(projet.prev_n_plus3_total) || 0) + 
                    (parseFloat(projet.prev_n_plus4_total) || 0) + (parseFloat(projet.prev_n_plus5_total) || 0);
        const mensuel = parseFloat(projet.prev_n_plus1_total) || 0;
        return prev + mensuel;
    };

    const getRegionNom = (regionId) => {
        const region = regions.find(r => r._id === regionId);
        return region?.nom_region || regionId || '-';
    };

    // Actions Admin
    const AdminActions = ({ projet }) => (
        <div className="flex items-center gap-2">
            <button
                onClick={() => { setSelectedProjet(projet); setShowDetailsModal(true); }}
                className="p-1.5 hover:bg-green-50 rounded-full transition"
                title="Voir les détails"
            >
                <EyeIcon className="w-4 h-4 text-gray-500 hover:text-green-500" />
            </button>
            <button
                onClick={() => { setSelectedProjet(projet); setShowEditModal(true); }}
                className="p-1.5 hover:bg-[#FF8500]/10 rounded-full transition"
                title="Modifier le projet"
            >
                <EditIcon className="w-4 h-4 text-gray-500 hover:text-[#FF8500]" />
            </button>
        </div>
    );

    return (
        <>
            <ProjetsLayout
                title="Tableau de bord - Administrateur"
                subtitle="Consultez et modifiez les projets terminés"
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
                activeTab="tous"
                setActiveTab={() => {}}
                canShowValidationActions={false}
                getStatutBadge={getStatutBadge}
                getBudgetTotal={getBudgetTotal}
                getRegionNom={getRegionNom}
                validationActions={(projet) => <AdminActions projet={projet} />}
                showValidationColumn={false}
            />

            {/* Modal de modification Admin */}
            <ModifierProjetAdminModal
                key={modalKey}
                isOpen={showEditModal}
                onClose={() => { setShowEditModal(false); setSelectedProjet(null); setModalKey(prev => prev + 1); }}
                onSuccess={handleSuccess}
                projet={selectedProjet}
                axiosInstance={axiosInstance}
            />

            {/* Modal de consultation des détails */}
            <DetailsProjetModal
                isOpen={showDetailsModal}
                onClose={() => { setShowDetailsModal(false); setSelectedProjet(null); }}
                projet={selectedProjet}
                axiosInstance={axiosInstance}
            />

            {/* Message succès */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-lg shadow-xl z-50 text-sm font-medium"
                    >
                        ✅ {successMessage}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ProjetsAdmin;