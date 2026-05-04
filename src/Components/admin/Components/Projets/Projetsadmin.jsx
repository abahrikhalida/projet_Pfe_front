// Components/Projets/ProjetsAdmin.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { axiosInstance } from '../../../../axios';
import { ReactComponent as EditIcon } from '../../../../Assets/Icons/edit.svg';
import { ReactComponent as EyeIcon } from '../../../../Assets/Icons/eye-svgrepo-com.svg';
import ProjetsLayout from './ProjetsLayout';
import ModifierProjetAdminModal from './ModifierProjetAdminModal';
import DetailsProjetModal from '../Projets/DetailsProjetModal';
import { useDataFilter } from '../../Components/comon/DataFilter';

const ProjetsAdmin = () => {
    const [modalKey, setModalKey] = useState(0);
    const [projets, setProjets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatut, setSelectedStatut] = useState('tous');
    const [selectedType, setSelectedType] = useState('tous');
    const [selectedEntite, setSelectedEntite] = useState('');
    const [regions, setRegions] = useState([]);
    const [directions, setDirections] = useState([]);
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
        { 
            id: 'tous', 
            label: '📋 Tous les projets', 
            endpoint: '/recap/records/', 
            color: 'purple', 
            description: 'Tous les projets (administration complète)', 
            icon: '📊' 
        }
    ];

    useEffect(() => {
        fetchRegions();
        fetchDirections();
    }, []);

    useEffect(() => {
        if (regions.length > 0 || directions.length > 0) {
            fetchProjets();
            
        }
    }, [regions, directions]);

    const fetchRegions = async () => {
        try {
            const response = await axiosInstance.get('/params/regions');
            setRegions(response.data.data || []);
        
        } catch (err) {
            console.error("Erreur chargement régions:", err);
        }
    };

    const fetchDirections = async () => {
        try {
            const response = await axiosInstance.get('/params/directions');
            setDirections(response.data.data || []);
        } catch (err) {
            console.error("Erreur chargement directions:", err);
        }
    };

    const fetchProjets = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/recap/records/');
            
            console.log("📡 Response /recap/records/:", response.data);
            
            let projetsData = [];
            
            if (response.data && response.data.success === true) {
                if (response.data.data && Array.isArray(response.data.data)) {
                    projetsData = response.data.data;
                }
            } else if (Array.isArray(response.data)) {
                projetsData = response.data;
            } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
                projetsData = response.data.data;
            }
            
            const formattedProjets = projetsData.map(record => {
                let displayStatut = 'brouillon';
                if (record.statut_final) {
                    displayStatut = record.statut_final;
                } else if (record.statut_workflow) {
                    displayStatut = record.statut_workflow;
                }
                
                // 🔥 Déterminer le nom de l'entité (priorité à direction_region_nom)
                let entiteNom = '-';
                let entiteId = null;
                
                // 1. Priorité à direction_region_nom (champ unifié)
                if (record.direction_region_nom) {
                    entiteNom = record.direction_region_nom;
                    entiteId = record.direction_region_code || record.region_id;
                }
                // 2. Sinon utiliser region_nom
                else if (record.region_nom) {
                    entiteNom = record.region_nom;
                    entiteId = record.region_id;
                }
                // 3. Sinon utiliser direction_nom
                else if (record.direction_nom) {
                    entiteNom = record.direction_nom;
                    entiteId = record.direction_id;
                }
                // 4. Fallback: chercher dans les listes chargées
                else if (record.region_id) {
                    const region = regions.find(r => r._id === record.region_id || r.code_region === record.region_id);
                    entiteNom = region?.nom_region || record.region_id;
                    entiteId = record.region_id;
                }
                else if (record.direction_id) {
                    const direction = directions.find(d => d._id === record.direction_id || d.code_direction === record.direction_id);
                    entiteNom = direction?.nom_direction || record.direction_id;
                    entiteId = record.direction_id;
                }
                else if (record.region) {
                    const region = regions.find(r => r.code_region === record.region);
                    entiteNom = region?.nom_region || record.region;
                    entiteId = record.region;
                }
                else if (record.direction) {
                    const direction = directions.find(d => d.code_direction === record.direction);
                    entiteNom = direction?.nom_direction || record.direction;
                    entiteId = record.direction;
                }
                
                // 🔥 Récupérer le libellé de l'activité
                let activiteNom = record.activite_nom || record.activite || '-';
                if (activiteNom === 'PETROLE') activiteNom = 'Pétrole';
                if (activiteNom === 'GAZ') activiteNom = 'Gaz';
                if (activiteNom === 'PETROLE_GAZ') activiteNom = 'Pétrole & Gaz';
                
                return {
                    id: record.id,
                    code_division: record.code_division || `PRJ-${record.id}`,
                    libelle: record.libelle || 'Sans libellé',
                    entite_id: entiteId,
                    entite_nom: entiteNom,
                    activite: record.activite,
                    activite_nom: activiteNom,
                    type_projet: record.type_projet || 'nouveau',
                    statut: displayStatut,
                    statut_workflow: record.statut_workflow,
                    statut_final: record.statut_final,
                    cout_initial_total: record.cout_initial_total ? parseFloat(record.cout_initial_total) : 0,
                    cout_initial_dont_dex: record.cout_initial_dont_dex ? parseFloat(record.cout_initial_dont_dex) : null,
                    prev_n_plus1_total: record.prev_n_plus1_total ? parseFloat(record.prev_n_plus1_total) : 0,
                    prev_n_plus2_total: record.prev_n_plus2_total ? parseFloat(record.prev_n_plus2_total) : 0,
                    prev_n_plus3_total: record.prev_n_plus3_total ? parseFloat(record.prev_n_plus3_total) : 0,
                    prev_n_plus4_total: record.prev_n_plus4_total ? parseFloat(record.prev_n_plus4_total) : 0,
                    prev_n_plus5_total: record.prev_n_plus5_total ? parseFloat(record.prev_n_plus5_total) : 0,
                    description_technique: record.description_technique,
                    opportunite_projet: record.opportunite_projet,
                    duree_realisation: record.duree_realisation,
                    point_situation: record.point_situation,
                    version: record.version,
                    is_active: record.is_active,
                    original: record
                };
            });
            
            setProjets(formattedProjets);
            setCounts({ tous: formattedProjets.length });
            
            const totalBudget = formattedProjets.reduce((sum, p) => sum + getBudgetTotal(p), 0);
            
            const validesCount = formattedProjets.filter(p => 
                p.statut_final === 'valide_divisionnaire' || 
                p.statut_final === 'valide_directeur_region' ||
                p.statut_final === 'valide_directeur_direction'
            ).length;
            
            const enCoursCount = formattedProjets.filter(p => 
                p.statut_workflow === 'soumis' || 
                p.statut_workflow === 'pre_approuve_chef' ||
                p.statut_workflow === 'reserve_chef' ||
                p.statut_workflow === 'reserve_directeur' ||
                p.statut_workflow === 'approuve_directeur'
            ).length;
            
            const rejetesCount = formattedProjets.filter(p => 
                p.statut_final === 'rejete_divisionnaire' ||
                p.statut_final === 'rejete_directeur_region' ||
                p.statut_final === 'rejete_directeur_direction' ||
                p.statut_final === 'annule_divisionnaire'
            ).length;
            
            const brouillonsCount = formattedProjets.filter(p => 
                !p.statut_workflow && !p.statut_final
            ).length;
            
            setStats({
                total: formattedProjets.length,
                total_budget: totalBudget,
                valides_divisionnaire: validesCount,
                en_cours: enCoursCount,
                rejetes: rejetesCount,
                brouillons: brouillonsCount,
                par_region: {}
            });
            
            console.log(`✅ Admin: ${formattedProjets.length} projets chargés`);
            
        } catch (err) {
            console.error("❌ Erreur chargement projets:", err);
            if (err.response) {
                console.error("Status:", err.response.status);
                console.error("Data:", err.response.data);
            }
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

    const getStatutBadge = (projet) => {
        const statut = projet.statut;
        const statutWorkflow = projet.statut_workflow;
        const statutFinal = projet.statut_final;
        
        const statutConfig = {
            soumis: { label: '📤 Soumis', color: '#3B82F6', bg: 'bg-blue-100' },
            pre_approuve_chef: { label: '✅ Pré-approuvé Chef', color: '#F59E0B', bg: 'bg-amber-100' },
            reserve_chef: { label: '⏸️ Réservé Chef', color: '#FF8500', bg: 'bg-orange-100' },
            reserve_directeur: { label: '⏸️ Réservé Directeur', color: '#FF8500', bg: 'bg-orange-100' },
            approuve_directeur: { label: '✅ Approuvé Directeur', color: '#EC4899', bg: 'bg-pink-100' },
            valide_divisionnaire: { label: '🏆 Validé Divisionnaire', color: '#14B8A6', bg: 'bg-teal-100' },
            valide_directeur_region: { label: '🏆 Validé Directeur Région', color: '#10B981', bg: 'bg-green-100' },
            valide_directeur_direction: { label: '🏆 Validé Directeur Direction', color: '#10B981', bg: 'bg-green-100' },
            rejete_divisionnaire: { label: '❌ Rejeté Divisionnaire', color: '#EF4444', bg: 'bg-red-100' },
            rejete_directeur_region: { label: '❌ Rejeté Directeur Région', color: '#EF4444', bg: 'bg-red-100' },
            rejete_directeur_direction: { label: '❌ Rejeté Directeur Direction', color: '#EF4444', bg: 'bg-red-100' },
            annule_divisionnaire: { label: '🚫 Annulé Divisionnaire', color: '#6B7280', bg: 'bg-gray-100' },
            brouillon: { label: '📝 Brouillon', color: '#9CA3AF', bg: 'bg-gray-100' }
        };
        
        let config = statutConfig.brouillon;
        
        if (statutFinal && statutConfig[statutFinal]) {
            config = statutConfig[statutFinal];
        } else if (statutWorkflow && statutConfig[statutWorkflow]) {
            config = statutConfig[statutWorkflow];
        } else if (statut && statutConfig[statut]) {
            config = statutConfig[statut];
        }
        
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg}`} style={{ color: config.color }}>
                {config.label}
            </span>
        );
    };

    const getBudgetTotal = (projet) => {
        if (projet.cout_initial_total && projet.cout_initial_total > 0) {
            return parseFloat(projet.cout_initial_total);
        }
        const prev = (parseFloat(projet.prev_n_plus2_total) || 0) + 
                    (parseFloat(projet.prev_n_plus3_total) || 0) + 
                    (parseFloat(projet.prev_n_plus4_total) || 0) + 
                    (parseFloat(projet.prev_n_plus5_total) || 0);
        const mensuel = parseFloat(projet.prev_n_plus1_total) || 0;
        const total = prev + mensuel;
        return total > 0 ? total : 0;
    };

    // 🔥 Fonction pour obtenir le nom de l'entité
    const getEntiteNom = (projet) => {
        if (projet.entite_nom && projet.entite_nom !== '-') {
            return projet.entite_nom;
        }
        return '-';
    };

    // 🔥 Fusion des régions et directions pour le filtre
    const allEntites = [
        ...regions.map(r => ({ _id: r.code_region || r._id, nom: r.nom_region, type: 'region' })),
        ...directions.map(d => ({ _id: d.code_direction || d._id, nom: d.nom_direction, type: 'direction' }))
    ];

    // Filtrer les projets
    const filteredProjets = projets.filter(projet => {
        const matchesSearch = searchTerm === '' || 
            (projet.code_division && projet.code_division.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (projet.libelle && projet.libelle.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesType = selectedType === 'tous' || projet.type_projet === selectedType;
        const matchesStatut = selectedStatut === 'tous' || projet.statut === selectedStatut;
        const matchesEntite = !selectedEntite || projet.entite_id === selectedEntite;
        
        return matchesSearch && matchesType && matchesStatut && matchesEntite;
    });

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
                subtitle="Gestion complète des projets (visualisation et modification)"
                tabs={tabs}
                projets={filteredProjets}
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
                stats={stats}
                activeTab="tous"
                setActiveTab={() => {}}
                canShowValidationActions={false}
                userRole="admin"
                onViewDetails={(projet) => {
                    setSelectedProjet(projet);
                    setShowDetailsModal(true);
                }}
                onEditProjet={(projet) => {
                    setSelectedProjet(projet);
                    setShowEditModal(true);
                }}
                getStatutBadge={getStatutBadge}
                getBudgetTotal={getBudgetTotal}
                getRegionNom={getEntiteNom}
                showValidationColumn={false}
                entiteType="mixte"
                entiteLabel="Entité"
                getEntiteNom={getEntiteNom}
                validationActions={(projet) => <AdminActions projet={projet} />}
            />

            <ModifierProjetAdminModal
                key={modalKey}
                isOpen={showEditModal}
                onClose={() => { setShowEditModal(false); setSelectedProjet(null); setModalKey(prev => prev + 1); }}
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