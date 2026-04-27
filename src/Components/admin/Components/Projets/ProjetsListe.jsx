import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { axiosInstance } from '../../../../axios';
import { ReactComponent as SearchIcon } from '../../../../Assets/Icons/Search.svg';
import { ReactComponent as EditIcon } from '../../../../Assets/Icons/edit.svg';
import { ReactComponent as EyeIcon } from '../../../../Assets/Icons/eye-svgrepo-com.svg';
import AjouterProjetModal from './AjouterProjetModal';
import DetailsProjetModal from './DetailsProjetModal';
import HistoriqueVersionsModal from './HistoriqueVersionsModal';
import { useDataFilter } from '../../Components/comon/DataFilter';
import ValidationActions from './ValidationActions';

const ProjetsListe = () => {
    const [modalKey, setModalKey] = useState(0);
    const [projets, setProjets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatut, setSelectedStatut] = useState('tous');
    const [selectedType, setSelectedType] = useState('tous');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [regions, setRegions] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [selectedProjet, setSelectedProjet] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    
    // Utilisation du hook
    const { filterByRole, getUserInfo } = useDataFilter();
    const userInfo = getUserInfo();
    
    // Compteurs par statut
    const [counts, setCounts] = useState({
        brouillon: 0,
        soumis: 0,
        valide_directeur_region: 0,
        valide_agent: 0,
        valide_chef: 0,
        valide_directeur: 0,
        valide_divisionnaire: 0,
        rejete: 0,
        cloture: 0
    });

    const statuts = [
        { value: 'tous', label: 'Tous', color: '#6B7280' },
        { value: 'brouillon', label: 'Brouillon', color: '#9CA3AF' },
        { value: 'soumis', label: 'Soumis', color: '#3B82F6' },
        { value: 'valide_directeur_region', label: 'Validé DR', color: '#10B981' },
        { value: 'valide_agent', label: 'Validé Agent', color: '#8B5CF6' },
        { value: 'valide_chef', label: 'Validé Chef', color: '#F59E0B' },
        { value: 'valide_directeur', label: 'Validé Directeur', color: '#EC4899' },
        { value: 'valide_divisionnaire', label: 'Validé Divisionnaire', color: '#14B8A6' },
        { value: 'rejete', label: 'Rejeté', color: '#EF4444' }
    ];

    const typesProjet = [
        { value: 'tous', label: 'Tous' },
        { value: 'nouveau', label: 'Nouveau Projet' },
        { value: 'en_cours', label: 'Projet en Cours' }
    ];

    // Déterminer l'endpoint API selon le rôle
    const getApiEndpoint = () => {
        switch (userInfo.role) {
            case 'admin':
                return '/recap/records/';
            case 'chef':
                return '/recap/budget/chef/AgentStatus/';
            case 'directeur':
                return '/recap/budget/directeur/ChefStatus/';
            case 'divisionnaire':
                return '/recap/budget/divisionnaire/directeurStatus/';
            case 'directeur_region':
                return '/recap/budget/directeur-region/soumis/';
            case 'responsable_structure':
                return '/recap/budget/projets/responsable/';
            case 'agent':
                return '/recap/budget/agent/valides-dr/';
            default:
                return '/recap/records/';
        }
    };

    useEffect(() => {
        fetchProjets();
        fetchRegions();
    }, []);

    const fetchRegions = async () => {
        try {
            const response = await axiosInstance.get('/params/regions');
            let allRegions = response.data.data || [];
            
            // Filtrer les régions selon le rôle
            if (userInfo.role === 'directeur_region' && userInfo.regionId) {
                allRegions = allRegions.filter(r => r._id === userInfo.regionId);
            }
            
            setRegions(allRegions);
            
            if (userInfo.role === 'directeur_region' && userInfo.regionId) {
                setSelectedRegion(userInfo.regionId);
            }
        } catch (err) {
            console.error("Erreur chargement régions:", err);
        }
    };

    const fetchProjets = async () => {
        setLoading(true);
        try {
            const endpoint = getApiEndpoint();
            console.log(`📡 Fetching projets with endpoint: ${endpoint} (role: ${userInfo.role})`);
            
            const response = await axiosInstance.get(endpoint);
            
            // Gérer les différentes structures de réponse
            let projetsData = [];
            if (response.data && response.data.projets) {
                projetsData = response.data.projets;
            } else if (response.data && response.data.data) {
                projetsData = response.data.data;
            } else if (Array.isArray(response.data)) {
                projetsData = response.data;
            } else {
                projetsData = [];
            }
            
            setProjets(projetsData);
            updateCounts(projetsData);
            console.log(`✅ Chargé ${projetsData.length} projets pour rôle ${userInfo.role}`);
        } catch (err) {
            console.error("Erreur chargement projets:", err);
        } finally {
            setLoading(false);
        }
    };

    const updateCounts = (projetsData) => {
        if (!Array.isArray(projetsData)) return;
        
        const newCounts = {
            brouillon: projetsData.filter(p => p.statut === 'brouillon').length,
            soumis: projetsData.filter(p => p.statut === 'soumis').length,
            valide_directeur_region: projetsData.filter(p => p.statut === 'valide_directeur_region').length,
            valide_agent: projetsData.filter(p => p.statut === 'valide_agent').length,
            valide_chef: projetsData.filter(p => p.statut === 'valide_chef').length,
            valide_directeur: projetsData.filter(p => p.statut === 'valide_directeur').length,
            valide_divisionnaire: projetsData.filter(p => p.statut === 'valide_divisionnaire').length,
            rejete: projetsData.filter(p => p.statut === 'rejete').length,
            cloture: projetsData.filter(p => p.statut === 'cloture').length
        };
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
            valide_agent: { label: 'Validé Agent', color: '#8B5CF6', bg: 'bg-purple-100' },
            valide_chef: { label: 'Validé Chef', color: '#F59E0B', bg: 'bg-amber-100' },
            valide_directeur: { label: 'Validé Directeur', color: '#EC4899', bg: 'bg-pink-100' },
            valide_divisionnaire: { label: 'Validé Divisionnaire', color: '#14B8A6', bg: 'bg-teal-100' },
            rejete: { label: 'Rejeté', color: '#EF4444', bg: 'bg-red-100' },
            cloture: { label: 'Clôturé', color: '#6B7280', bg: 'bg-gray-100' }
        };
        const config = statutConfig[statut] || statutConfig.brouillon;
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

    // Filtrer par recherche, statut, type et région
    const filteredProjets = projets.filter(projet => {
        const search = searchTerm.toLowerCase();
        const matchesSearch = 
            (projet.code_division || '').toLowerCase().includes(search) ||
            (projet.libelle || '').toLowerCase().includes(search) ||
            (projet.activite || '').toLowerCase().includes(search);
        
        const matchesStatut = selectedStatut === 'tous' || projet.statut === selectedStatut;
        const matchesType = selectedType === 'tous' || projet.type_projet === selectedType;
        const matchesRegion = !selectedRegion || projet.region_id === selectedRegion || projet.region === selectedRegion;
        
        return matchesSearch && matchesStatut && matchesType && matchesRegion;
    });

    const handleOpenModal = (projet = null) => {
        // Seul responsable_structure peut créer
        if (!projet && userInfo.role !== 'responsable_structure') {
            return;
        }
        // Seul admin peut modifier
        if (projet && userInfo.role !== 'admin') {
            return;
        }
        setSelectedProjet(projet);
        setModalKey(prev => prev + 1);
        setShowCreateModal(true);
    };

    const tableRowVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: { delay: i * 0.05, duration: 0.3 }
        }),
        exit: { opacity: 0, x: 20, transition: { duration: 0.2 } }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* En-tête */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white border-b border-gray-200 sticky top-0 z-10 backdrop-blur-sm bg-white/95"
            >
                <div className="px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Gestion des Projets</h1>
                            <p className="text-gray-500 mt-1">
                                Gérez vos projets, suivez leur avancement et consultez l'historique
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                                Rôle: {userInfo.role} 
                                {userInfo.role === 'responsable_structure' && ` | Structure: ${userInfo.structureId} | ✅ Peut créer`}
                                {userInfo.role === 'admin' && ` | ✅ Peut modifier`}
                                {userInfo.role === 'directeur_region' && ` | Région: ${userInfo.regionId}`}
                            </p>
                        </div>
                        {loading && (
                            <motion.div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-[#FF8500] rounded-full animate-pulse" />
                                <span className="text-sm text-gray-500">Chargement...</span>
                            </motion.div>
                        )}
                    </div>
                </div>
            </motion.div>

            <div className="p-8">
                <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 p-6">
                    {/* Bouton Ajouter - seulement pour responsable_structure */}
                    {userInfo.role === 'responsable_structure' && (
                        <div className="flex justify-end mb-6">
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
                    )}

                    {/* Cartes compteurs */}
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-9 gap-3 mb-8">
                        <div 
                            className={`rounded-xl p-3 text-center cursor-pointer transition-all ${selectedStatut === 'tous' ? 'bg-[#FF8500] text-white shadow-md' : 'bg-gray-50 hover:bg-gray-100'}`} 
                            onClick={() => setSelectedStatut('tous')}
                        >
                            <div className={`text-xl font-bold ${selectedStatut === 'tous' ? 'text-white' : 'text-gray-800'}`}>{projets.length}</div>
                            <div className={`text-xs ${selectedStatut === 'tous' ? 'text-white/80' : 'text-gray-500'}`}>Total</div>
                        </div>
                        <div 
                            className={`rounded-xl p-3 text-center cursor-pointer transition-all ${selectedStatut === 'brouillon' ? 'bg-[#FF8500] text-white shadow-md' : 'bg-gray-50 hover:bg-gray-100'}`} 
                            onClick={() => setSelectedStatut('brouillon')}
                        >
                            <div className={`text-xl font-bold ${selectedStatut === 'brouillon' ? 'text-white' : 'text-gray-500'}`}>{counts.brouillon}</div>
                            <div className={`text-xs ${selectedStatut === 'brouillon' ? 'text-white/80' : 'text-gray-500'}`}>Brouillon</div>
                        </div>
                        <div 
                            className={`rounded-xl p-3 text-center cursor-pointer transition-all ${selectedStatut === 'soumis' ? 'bg-[#FF8500] text-white shadow-md' : 'bg-gray-50 hover:bg-gray-100'}`} 
                            onClick={() => setSelectedStatut('soumis')}
                        >
                            <div className={`text-xl font-bold ${selectedStatut === 'soumis' ? 'text-white' : 'text-blue-600'}`}>{counts.soumis}</div>
                            <div className={`text-xs ${selectedStatut === 'soumis' ? 'text-white/80' : 'text-gray-500'}`}>Soumis</div>
                        </div>
                        <div 
                            className={`rounded-xl p-3 text-center cursor-pointer transition-all ${selectedStatut === 'valide_directeur_region' ? 'bg-[#FF8500] text-white shadow-md' : 'bg-gray-50 hover:bg-gray-100'}`} 
                            onClick={() => setSelectedStatut('valide_directeur_region')}
                        >
                            <div className={`text-xl font-bold ${selectedStatut === 'valide_directeur_region' ? 'text-white' : 'text-green-600'}`}>{counts.valide_directeur_region}</div>
                            <div className={`text-xs ${selectedStatut === 'valide_directeur_region' ? 'text-white/80' : 'text-gray-500'}`}>Validé DR</div>
                        </div>
                        <div 
                            className={`rounded-xl p-3 text-center cursor-pointer transition-all ${selectedStatut === 'valide_agent' ? 'bg-[#FF8500] text-white shadow-md' : 'bg-gray-50 hover:bg-gray-100'}`} 
                            onClick={() => setSelectedStatut('valide_agent')}
                        >
                            <div className={`text-xl font-bold ${selectedStatut === 'valide_agent' ? 'text-white' : 'text-purple-600'}`}>{counts.valide_agent}</div>
                            <div className={`text-xs ${selectedStatut === 'valide_agent' ? 'text-white/80' : 'text-gray-500'}`}>Validé Agent</div>
                        </div>
                        <div 
                            className={`rounded-xl p-3 text-center cursor-pointer transition-all ${selectedStatut === 'valide_chef' ? 'bg-[#FF8500] text-white shadow-md' : 'bg-gray-50 hover:bg-gray-100'}`} 
                            onClick={() => setSelectedStatut('valide_chef')}
                        >
                            <div className={`text-xl font-bold ${selectedStatut === 'valide_chef' ? 'text-white' : 'text-amber-600'}`}>{counts.valide_chef}</div>
                            <div className={`text-xs ${selectedStatut === 'valide_chef' ? 'text-white/80' : 'text-gray-500'}`}>Validé Chef</div>
                        </div>
                        <div 
                            className={`rounded-xl p-3 text-center cursor-pointer transition-all ${selectedStatut === 'valide_directeur' ? 'bg-[#FF8500] text-white shadow-md' : 'bg-gray-50 hover:bg-gray-100'}`} 
                            onClick={() => setSelectedStatut('valide_directeur')}
                        >
                            <div className={`text-xl font-bold ${selectedStatut === 'valide_directeur' ? 'text-white' : 'text-pink-600'}`}>{counts.valide_directeur}</div>
                            <div className={`text-xs ${selectedStatut === 'valide_directeur' ? 'text-white/80' : 'text-gray-500'}`}>Validé Dir.</div>
                        </div>
                        <div 
                            className={`rounded-xl p-3 text-center cursor-pointer transition-all ${selectedStatut === 'valide_divisionnaire' ? 'bg-[#FF8500] text-white shadow-md' : 'bg-gray-50 hover:bg-gray-100'}`} 
                            onClick={() => setSelectedStatut('valide_divisionnaire')}
                        >
                            <div className={`text-xl font-bold ${selectedStatut === 'valide_divisionnaire' ? 'text-white' : 'text-teal-600'}`}>{counts.valide_divisionnaire}</div>
                            <div className={`text-xs ${selectedStatut === 'valide_divisionnaire' ? 'text-white/80' : 'text-gray-500'}`}>Validé Div.</div>
                        </div>
                        <div 
                            className={`rounded-xl p-3 text-center cursor-pointer transition-all ${selectedStatut === 'rejete' ? 'bg-[#FF8500] text-white shadow-md' : 'bg-gray-50 hover:bg-gray-100'}`} 
                            onClick={() => setSelectedStatut('rejete')}
                        >
                            <div className={`text-xl font-bold ${selectedStatut === 'rejete' ? 'text-white' : 'text-red-600'}`}>{counts.rejete}</div>
                            <div className={`text-xs ${selectedStatut === 'rejete' ? 'text-white/80' : 'text-gray-500'}`}>Rejeté</div>
                        </div>
                    </div>

                    {/* Filtres */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="h-[43px] px-4 rounded-[20px] border-2 border-[#D9E1E7] outline-none focus:border-[#FF8500] bg-white"
                        >
                            {typesProjet.map(type => (
                                <option key={type.value} value={type.value}>{type.label}</option>
                            ))}
                        </select>

                        <select
                            value={selectedRegion}
                            onChange={(e) => setSelectedRegion(e.target.value)}
                            className="h-[43px] px-4 rounded-[20px] border-2 border-[#D9E1E7] outline-none focus:border-[#FF8500] bg-white"
                            disabled={userInfo.role === 'directeur_region'}
                        >
                            <option value="">Toutes les régions</option>
                            {regions.map(region => (
                                <option key={region._id} value={region._id}>{region.nom_region}</option>
                            ))}
                        </select>

                        <select
                            value={selectedStatut}
                            onChange={(e) => setSelectedStatut(e.target.value)}
                            className="h-[43px] px-4 rounded-[20px] border-2 border-[#D9E1E7] outline-none focus:border-[#FF8500] bg-white"
                        >
                            {statuts.map(statut => (
                                <option key={statut.value} value={statut.value}>{statut.label}</option>
                            ))}
                        </select>

                        <div className="h-[43px] rounded-[20px] border-2 border-[#D9E1E7] hover:border-[#FF8500] focus-within:border-[#FF8500] transition-colors duration-200">
                            <div className="w-full h-full flex items-center px-4">
                                <SearchIcon className="text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Rechercher par code, libellé..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full h-full border-0 outline-none px-4 text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mb-4 text-sm text-gray-500">
                        {filteredProjets.length} projet(s) trouvé(s)
                    </div>

                    {/* Tableau */}
                    <div className="rounded-lg border border-gray-100 overflow-x-auto">
                        <table className="w-full min-w-[1000px]">
                            <thead>
                                <tr className="bg-gradient-to-r from-[#F9F9F9] to-[#F0F0F0] border-b border-[#E4E4E4]">
                                    <th className="py-3 px-3 text-left text-xs font-semibold text-[#4A4A4A]">Code Division</th>
                                    <th className="py-3 px-3 text-left text-xs font-semibold text-[#4A4A4A]">Libellé</th>
                                    <th className="py-3 px-3 text-left text-xs font-semibold text-[#4A4A4A]">Région</th>
                                    <th className="py-3 px-3 text-left text-xs font-semibold text-[#4A4A4A]">Activité</th>
                                    <th className="py-3 px-3 text-left text-xs font-semibold text-[#4A4A4A]">Coût Global</th>
                                    <th className="py-3 px-3 text-left text-xs font-semibold text-[#4A4A4A]">Validation</th>
                                    <th className="py-3 px-3 text-left text-xs font-semibold text-[#4A4A4A]">Statut</th>
                                    <th className="py-3 px-3 text-left text-xs font-semibold text-[#4A4A4A]">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="7" className="py-8 text-center">
                                            <div className="flex justify-center">
                                                <div className="w-8 h-8 border-4 border-[#FF8500] border-t-transparent rounded-full animate-spin"></div>
                                            </div>
                                            <p className="text-xs text-gray-400 mt-2">Chargement...</p>
                                        </td>
                                    </tr>
                                ) : (
                                    <AnimatePresence>
                                        {filteredProjets.map((projet, index) => (
                                            <motion.tr 
                                                key={projet.id || projet.code_division}
                                                custom={index}
                                                variants={tableRowVariants}
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                                className="border-b border-gray-100 hover:bg-[#FFF9F0] transition-colors duration-150"
                                            >
                                                <td className="py-3 px-3">
                                                    <span className="font-mono text-sm font-medium">{projet.code_division}</span>
                                                </td>
                                                <td className="py-3 px-3">
                                                    <div className="text-sm font-medium text-gray-800">{projet.libelle}</div>
                                                </td>
                                                <td className="py-3 px-3 text-sm text-gray-600">{projet.region_nom || projet.region || '-'}</td>
                                                <td className="py-3 px-3 text-sm text-gray-600">{projet.activite_nom || projet.activite || '-'}</td>
                                                <td className="py-3 px-3">
                                                    <div className="text-sm font-bold text-gray-800">
                                                        {getBudgetTotal(projet).toLocaleString()} DA
                                                    </div>
                                                </td>
                                                <td className="py-3 px-3">
    <ValidationActions 
        projet={projet} 
        onActionSuccess={(message) => {
            setSuccessMessage(message);
            setShowSuccess(true);
            fetchProjets(); // Recharger la liste après action
            setTimeout(() => setShowSuccess(false), 3000);
        }}
    />
</td>
                                                <td className="py-3 px-3">{getStatutBadge(projet.statut)}</td>
                                                <td className="py-3 px-3">
                                                    <div className="flex items-center gap-2">
                                                        <motion.button
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => { setSelectedProjet(projet); setShowHistoryModal(true); }}
                                                            className="p-1.5 hover:bg-blue-50 rounded-full transition"
                                                            title="Historique versions"
                                                        >
                                                            <svg className="w-4 h-4 text-gray-500 hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                        </motion.button>
                                                        
                                                        <motion.button
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => { setSelectedProjet(projet); setShowDetailsModal(true); }}
                                                            className="p-1.5 hover:bg-green-50 rounded-full transition"
                                                            title="Consulter"
                                                        >
                                                            <EyeIcon className="w-4 h-4 text-gray-500 hover:text-green-500" />
                                                        </motion.button>
                                                        
                                                        {/* Modifier - seulement pour admin */}
                                                        {userInfo.role === 'admin' && (
                                                            <motion.button
                                                                whileHover={{ scale: 1.05 }}
                                                                whileTap={{ scale: 0.95 }}
                                                                onClick={() => handleOpenModal(projet)}
                                                                className="p-1.5 hover:bg-[#FF8500]/10 rounded-full transition"
                                                                title="Modifier"
                                                            >
                                                                <EditIcon className="w-3.5 h-3.5 text-gray-500 hover:text-[#FF8500]" />
                                                            </motion.button>
                                                        )}
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                )}
                            </tbody>
                        </table>

                        {filteredProjets.length === 0 && !loading && (
                            <div className="text-center py-12 px-4">
                                <svg className="w-16 h-16 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p className="text-gray-500">Aucun projet trouvé</p>
                                {userInfo.role === 'responsable_structure' && (
                                    <button
                                        onClick={() => handleOpenModal(null)}
                                        className="mt-3 text-[#FF8500] text-sm hover:underline"
                                    >
                                        Créer votre premier projet
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modals */}
            <AjouterProjetModal
                key={modalKey}
                isOpen={showCreateModal}
                onClose={() => { setShowCreateModal(false); setSelectedProjet(null); }}
                onSuccess={handleSuccess}
                projet={selectedProjet}
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
        </div>
    );
};

export default ProjetsListe;