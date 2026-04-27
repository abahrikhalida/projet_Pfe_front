// Affectations.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { axiosInstance } from '../../../axios';
import { ReactComponent as SearchIcon } from '../../../Assets/Icons/Search.svg';
import { ReactComponent as EditIcon } from '../../../Assets/Icons/edit.svg';

const Affectations = () => {
    const [activeSection, setActiveSection] = useState('directeurs');
    const [directeurs, setDirecteurs] = useState([]);
    const [responsables, setResponsables] = useState([]);
    const [regions, setRegions] = useState([]);
    const [structures, setStructures] = useState([]);
    const [structuresByRegion, setStructuresByRegion] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [hoveredCard, setHoveredCard] = useState(null);
    const [showAffecterModal, setShowAffecterModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedStructure, setSelectedStructure] = useState('');
    const [availableStructures, setAvailableStructures] = useState([]);
    const [loadingStructures, setLoadingStructures] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const userRole = localStorage.getItem('role');
    const ORANGE_COLOR = '#FF8500';
    const ORANGE_GRADIENT = 'from-orange-500 to-amber-500';

    // Charger les données
    const fetchData = async () => {
        setLoading(true);
        setError('');
        try {
            const [directeursRes, responsablesRes, regionsRes, structuresRes] = await Promise.all([
                axiosInstance.get('/api/users/'),
                axiosInstance.get('/api/users/responsables-structure/'),
                axiosInstance.get('/params/regions'),
                axiosInstance.get('/params/structures')
            ]);

            const allUsers = directeursRes.data.users || [];
            const directeursFiltres = allUsers.filter(user => user.role === 'directeur_region');
            
            setDirecteurs(directeursFiltres);
            setResponsables(responsablesRes.data.users || []);
            setRegions(regionsRes.data.data || []);
            setStructures(structuresRes.data.data || []);
        } catch (err) {
            console.error("Erreur chargement données:", err);
            setError("Impossible de charger les données");
        } finally {
            setLoading(false);
        }
    };

    // Charger les structures par région
    const fetchStructuresByRegion = async (regionId) => {
        if (!regionId) {
            setAvailableStructures([]);
            return;
        }
        
        setLoadingStructures(true);
        try {
            // Appel à l'API pour récupérer les structures d'une région
            const response = await axiosInstance.get(`/params//structures/region/${regionId}`);
            const structuresData = response.data.data || response.data || [];
            setAvailableStructures(structuresData);
        } catch (err) {
            console.error("Erreur chargement structures par région:", err);
            setAvailableStructures([]);
        } finally {
            setLoadingStructures(false);
        }
    };

    // Quand la région change, recharger les structures
    useEffect(() => {
        if (showAffecterModal && activeSection === 'responsables' && selectedRegion) {
            fetchStructuresByRegion(selectedRegion);
        } else {
            setAvailableStructures([]);
        }
    }, [selectedRegion, showAffecterModal, activeSection]);

    useEffect(() => {
        fetchData();
    }, []);

    const handleSuccess = (message) => {
        setSuccessMessage(message);
        setShowSuccess(true);
        fetchData();
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const handleAffecterRegion = async () => {
        if (!selectedUser || !selectedRegion) return;
        
        setUpdating(true);
        try {
            const response = await axiosInstance.patch(`/api/users/${selectedUser.id}/affecter-region/`, {
                region_id: selectedRegion
            });
            
            if (response.data.status === 'success') {
                setShowAffecterModal(false);
                setSelectedUser(null);
                setSelectedRegion('');
                handleSuccess(`Région affectée à ${selectedUser.nom_complet}`);
            }
        } catch (err) {
            console.error("Erreur affectation:", err);
            const errorMsg = err.response?.data?.error || "Erreur lors de l'affectation";
            alert(errorMsg);
        } finally {
            setUpdating(false);
        }
    };

    // const handleAffecterStructure = async () => {
    //     if (!selectedUser || !selectedStructure || !selectedRegion) return;
        
    //     setUpdating(true);
    //     try {
    //         // Utilisation de la nouvelle API d'affectation structure
    //         const response = await axiosInstance.post(`/api/users/${selectedUser.id}/affecter-structure/`, {
    //             region_id: selectedRegion,
    //             structure_id: selectedStructure
    //         });
            
    //         if (response.data.status === 'success') {
    //             setShowAffecterModal(false);
    //             setSelectedUser(null);
    //             setSelectedRegion('');
    //             setSelectedStructure('');
    //             handleSuccess(response.data.message || `Structure affectée à ${selectedUser.nom_complet}`);
    //         }
    //     } catch (err) {
    //         console.error("Erreur affectation:", err);
    //         const errorMsg = err.response?.data?.error || "Erreur lors de l'affectation";
    //         alert(errorMsg);
    //     } finally {
    //         setUpdating(false);
    //     }
    // };

    // Affectations.jsx - Modifiez la fonction handleAffecterStructure

const handleAffecterStructure = async () => {
    if (!selectedUser || !selectedStructure || !selectedRegion) return;
    
    setUpdating(true);
    try {
        // Changement ici : utiliser POST au lieu de PATCH
        const response = await axiosInstance.patch(`/api/users/${selectedUser.id}/affecter-structure/`, {
            region_id: selectedRegion,
            structure_id: selectedStructure
        });
        
        if (response.data.status === 'success') {
            setShowAffecterModal(false);
            setSelectedUser(null);
            setSelectedRegion('');
            setSelectedStructure('');
            handleSuccess(response.data.message || `Structure affectée à ${selectedUser.nom_complet}`);
        }
    } catch (err) {
        console.error("Erreur affectation:", err);
        const errorMsg = err.response?.data?.error || "Erreur lors de l'affectation";
        alert(errorMsg);
    } finally {
        setUpdating(false);
    }
};
    const openAffecterModal = (user) => {
        setSelectedUser(user);
        setSelectedRegion(user.region_id || '');
        setSelectedStructure(user.structure_id || '');
        setShowAffecterModal(true);
        
        // Si c'est un responsable et qu'il a déjà une région, charger ses structures
        if (user.role === 'responsable_structure' && user.region_id) {
            fetchStructuresByRegion(user.region_id);
        }
    };

    const getRegionName = (regionId) => {
        if (!regionId) return 'Non affecté';
        const region = regions.find(r => r._id === regionId || r.code_region === regionId);
        return region?.nom_region || regionId;
    };

    const getStructureName = (structureId) => {
        if (!structureId) return 'Non affecté';
        const structure = structures.find(s => s._id === structureId);
        return structure?.nom_structure || structureId;
    };

    const canAffecter = userRole === 'admin';

    // Filtrer les données
    const filteredDirecteurs = directeurs.filter(d => 
        d.nom_complet?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredResponsables = responsables.filter(r => 
        r.nom_complet?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Cartes pour les onglets
    const cards = [
        {
            id: 'directeurs',
            title: 'Directeurs Région',
            description: 'Affectation des régions aux directeurs',
            count: directeurs.length,
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            )
        },
        {
            id: 'responsables',
            title: 'Responsables Structure',
            description: 'Affectation des structures aux responsables',
            count: responsables.length,
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
                    <path d="M17 21v-4H7v4" />
                    <path d="M7 3v4h10V3" />
                </svg>
            )
        }
    ];

    const cardVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
                type: "spring",
                stiffness: 200,
                damping: 20
            }
        }),
        hover: {
            y: -10,
            scale: 1.02,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 15
            }
        },
        tap: {
            scale: 0.98,
            transition: {
                type: "spring",
                stiffness: 600,
                damping: 20
            }
        }
    };

    const contentVariants = {
        hidden: { opacity: 0, x: -30, scale: 0.98 },
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
                duration: 0.4,
                type: "spring",
                stiffness: 300,
                damping: 25
            }
        },
        exit: {
            opacity: 0,
            x: 30,
            scale: 0.98,
            transition: { duration: 0.3 }
        }
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

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        visible: { 
            opacity: 1, 
            scale: 1, 
            y: 0,
            transition: { 
                type: "spring",
                stiffness: 400,
                damping: 25
            }
        },
        exit: { 
            opacity: 0, 
            scale: 0.9, 
            y: 20,
            transition: { duration: 0.2 } 
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white border-b border-gray-200 sticky top-0 z-10 backdrop-blur-sm bg-white/95"
            >
                <div className="px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Affectations</h1>
                            <p className="text-gray-500 mt-1">
                                Affectez les régions aux directeurs et les structures aux responsables
                            </p>
                        </div>
                        
                        {loading && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center gap-2"
                            >
                                <div className="w-2 h-2 bg-[#FF8500] rounded-full animate-pulse" />
                                <span className="text-sm text-gray-500">Chargement...</span>
                            </motion.div>
                        )}
                    </div>
                    
                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg"
                        >
                            {error}
                        </motion.div>
                    )}
                </div>
            </motion.div>

            <div className="p-8">
                {/* Cartes des sections */}
                <motion.div 
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-10"
                >
                    {cards.map((card, index) => (
                        <motion.div
                            key={card.id}
                            custom={index}
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover="hover"
                            whileTap="tap"
                            onHoverStart={() => setHoveredCard(card.id)}
                            onHoverEnd={() => setHoveredCard(null)}
                            onClick={() => setActiveSection(card.id)}
                            className={`
                                relative bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer
                                transition-shadow duration-300
                                ${activeSection === card.id ? 'shadow-2xl ring-2 ring-[#FF8500]' : 'hover:shadow-xl'}
                            `}
                        >
                            <motion.div 
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                animate={{
                                    x: hoveredCard === card.id ? '100%' : '-100%'
                                }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                            />
                            
                            <motion.div 
                                className={`absolute inset-0 bg-gradient-to-br ${ORANGE_GRADIENT} opacity-0`}
                                animate={{
                                    opacity: hoveredCard === card.id ? 0.05 : 0
                                }}
                                transition={{ duration: 0.3 }}
                            />
                            
                            <div className="relative p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <motion.div 
                                        className="w-14 h-14 rounded-2xl flex items-center justify-center"
                                        style={{
                                            background: activeSection === card.id ? `${ORANGE_COLOR}20` : `${ORANGE_COLOR}10`,
                                            color: ORANGE_COLOR
                                        }}
                                        animate={{
                                            scale: hoveredCard === card.id ? 1.1 : 1,
                                            rotate: hoveredCard === card.id ? [0, -5, 5, 0] : 0
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {card.icon}
                                    </motion.div>
                                    
                                    {loading ? (
                                        <div className="w-12 h-8 bg-gray-200 rounded-lg animate-pulse" />
                                    ) : (
                                        <motion.div 
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", delay: index * 0.1 }}
                                            className="text-right"
                                        >
                                            <span 
                                                className="text-3xl font-bold"
                                                style={{ color: ORANGE_COLOR }}
                                            >
                                                {card.count}
                                            </span>
                                        </motion.div>
                                    )}
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-2 text-left">
                                        {card.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 text-left leading-relaxed">
                                        {card.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Barre de recherche */}
                <div className="mb-6">
                    <div className="relative">
                        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Rechercher par nom, email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#FF8500] focus:outline-none transition-all bg-white"
                        />
                    </div>
                </div>

                {/* Contenu actif */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeSection}
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="bg-white rounded-2xl shadow-lg overflow-hidden"
                    >
                        <div className="border-b border-gray-200 px-6 py-4 bg-gradient-to-r from-gray-50 to-white">
                            <div className="flex items-center gap-3">
                                <div 
                                    className="p-2 rounded-xl"
                                    style={{
                                        background: `${ORANGE_COLOR}10`,
                                        color: ORANGE_COLOR
                                    }}
                                >
                                    {cards.find(c => c.id === activeSection)?.icon}
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">
                                        {activeSection === 'directeurs' ? 'Liste des Directeurs' : 'Liste des Responsables'}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        {activeSection === 'directeurs' 
                                            ? 'Affectez une région à chaque directeur' 
                                            : 'Affectez une structure à chaque responsable (sélectionnez d\'abord la région)'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            {/* Tableau Directeurs */}
                            {activeSection === 'directeurs' && (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-gradient-to-r from-[#F9F9F9] to-[#F0F0F0] border-b border-[#E4E4E4]">
                                                <th className="py-3 px-4 text-left text-xs font-semibold text-[#4A4A4A] rounded-l-lg w-[35%]">Utilisateur</th>
                                                <th className="py-3 px-4 text-left text-xs font-semibold text-[#4A4A4A] w-[30%]">Email</th>
                                                <th className="py-3 px-4 text-left text-xs font-semibold text-[#4A4A4A] w-[20%]">Région affectée</th>
                                                <th className="py-3 px-4 text-left text-xs font-semibold text-[#4A4A4A] rounded-r-lg w-[15%]">Actions</th>
                                                </tr>
                                             
                                        </thead>
                                        <tbody>
                                            {loading ? (
                                                <tr>
                                                    <td colSpan="4" className="py-12 text-center">
                                                        <div className="flex justify-center">
                                                            <div className="w-8 h-8 border-3 border-[#FF8500] border-t-transparent rounded-full animate-spin"></div>
                                                        </div>
                                                        <p className="text-xs text-gray-400 mt-2">Chargement...</p>
                                                    </td>
                                                </tr>
                                            ) : filteredDirecteurs.length === 0 ? (
                                                <tr>
                                                    <td colSpan="4" className="py-12 text-center">
                                                        <div className="text-center">
                                                            <svg className="w-16 h-16 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                                            </svg>
                                                            <p className="text-gray-500">Aucun directeur trouvé</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ) : (
                                                <AnimatePresence>
                                                    {filteredDirecteurs.map((directeur, index) => (
                                                        <motion.tr 
                                                            key={directeur.id}
                                                            custom={index}
                                                            variants={tableRowVariants}
                                                            initial="hidden"
                                                            animate="visible"
                                                            exit="exit"
                                                            className="border-b border-gray-100 hover:bg-[#FFF9F0] transition-colors duration-150"
                                                        >
                                                            <td className="py-3 px-4">
                                                                <div className="flex items-center gap-3">
                                                                    {directeur.photo_profil ? (
                                                                        <img src={directeur.photo_profil} alt="" className="w-8 h-8 rounded-full object-cover" />
                                                                    ) : (
                                                                        <div className="w-8 h-8 rounded-full bg-[#FF8500]/10 flex items-center justify-center text-[#FF8500] font-medium text-sm">
                                                                            {directeur.nom_complet?.charAt(0)}
                                                                        </div>
                                                                    )}
                                                                    <div>
                                                                        <div className="font-medium text-gray-800 text-sm">{directeur.nom_complet}</div>
                                                                        <div className="text-xs text-gray-400">ID: {directeur.id}</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="py-3 px-4">
                                                                <div className="text-sm text-gray-600">{directeur.email}</div>
                                                            </td>
                                                            <td className="py-3 px-4">
                                                                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                                                                    directeur.region_id 
                                                                        ? 'bg-green-100 text-green-700' 
                                                                        : 'bg-gray-100 text-gray-500'
                                                                }`}>
                                                                    {getRegionName(directeur.region_id)}
                                                                </span>
                                                            </td>
                                                            <td className="py-3 px-4">
                                                                {canAffecter && (
                                                                    <motion.button
                                                                        whileHover={{ scale: 1.02 }}
                                                                        whileTap={{ scale: 0.98 }}
                                                                        onClick={() => openAffecterModal(directeur)}
                                                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1 ${
                                                                            directeur.region_id 
                                                                                ? 'bg-[#FF8500]/10 text-[#FF8500] hover:bg-[#FF8500] hover:text-white' 
                                                                                : 'bg-[#FF8500] text-white hover:bg-[#e67800]'
                                                                        }`}
                                                                    >
                                                                        <EditIcon className="w-3 h-3" />
                                                                        {directeur.region_id ? 'Modifier' : 'Affecter'}
                                                                    </motion.button>
                                                                )}
                                                            </td>
                                                        </motion.tr>
                                                    ))}
                                                </AnimatePresence>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {/* Tableau Responsables */}
                            {activeSection === 'responsables' && (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-gradient-to-r from-[#F9F9F9] to-[#F0F0F0] border-b border-[#E4E4E4]">
                                                <th className="py-3 px-4 text-left text-xs font-semibold text-[#4A4A4A] rounded-l-lg w-[30%]">Utilisateur</th>
                                                <th className="py-3 px-4 text-left text-xs font-semibold text-[#4A4A4A] w-[25%]">Email</th>
                                                <th className="py-3 px-4 text-left text-xs font-semibold text-[#4A4A4A] w-[15%]">Région</th>
                                                <th className="py-3 px-4 text-left text-xs font-semibold text-[#4A4A4A] w-[20%]">Structure affectée</th>
                                                <th className="py-3 px-4 text-left text-xs font-semibold text-[#4A4A4A] rounded-r-lg w-[10%]">Actions</th>
                                              </tr>
                                        </thead>
                                        <tbody>
                                            {loading ? (
                                                <tr>
                                                    <td colSpan="5" className="py-12 text-center">
                                                        <div className="flex justify-center">
                                                            <div className="w-8 h-8 border-3 border-[#FF8500] border-t-transparent rounded-full animate-spin"></div>
                                                        </div>
                                                        <p className="text-xs text-gray-400 mt-2">Chargement...</p>
                                                    </td>
                                                </tr>
                                            ) : filteredResponsables.length === 0 ? (
                                                <tr>
                                                    <td colSpan="5" className="py-12 text-center">
                                                        <div className="text-center">
                                                            <svg className="w-16 h-16 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
                                                                <path d="M17 21v-4H7v4" />
                                                                <path d="M7 3v4h10V3" />
                                                            </svg>
                                                            <p className="text-gray-500">Aucun responsable trouvé</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ) : (
                                                <AnimatePresence>
                                                    {filteredResponsables.map((responsable, index) => (
                                                        <motion.tr 
                                                            key={responsable.id}
                                                            custom={index}
                                                            variants={tableRowVariants}
                                                            initial="hidden"
                                                            animate="visible"
                                                            exit="exit"
                                                            className="border-b border-gray-100 hover:bg-[#FFF9F0] transition-colors duration-150"
                                                        >
                                                            <td className="py-3 px-4">
                                                                <div className="flex items-center gap-3">
                                                                    {responsable.photo_profil ? (
                                                                        <img src={responsable.photo_profil} alt="" className="w-8 h-8 rounded-full object-cover" />
                                                                    ) : (
                                                                        <div className="w-8 h-8 rounded-full bg-[#FF8500]/10 flex items-center justify-center text-[#FF8500] font-medium text-sm">
                                                                            {responsable.nom_complet?.charAt(0)}
                                                                        </div>
                                                                    )}
                                                                    <div>
                                                                        <div className="font-medium text-gray-800 text-sm">{responsable.nom_complet}</div>
                                                                        <div className="text-xs text-gray-400">ID: {responsable.id}</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="py-3 px-4">
                                                                <div className="text-sm text-gray-600">{responsable.email}</div>
                                                            </td>
                                                            <td className="py-3 px-4">
                                                                <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                                                    {getRegionName(responsable.region_id)}
                                                                </span>
                                                            </td>
                                                            <td className="py-3 px-4">
                                                                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                                                                    responsable.structure_id 
                                                                        ? 'bg-green-100 text-green-700' 
                                                                        : 'bg-gray-100 text-gray-500'
                                                                }`}>
                                                                    {getStructureName(responsable.structure_id)}
                                                                </span>
                                                            </td>
                                                            <td className="py-3 px-4">
                                                                {canAffecter && (
                                                                    <motion.button
                                                                        whileHover={{ scale: 1.02 }}
                                                                        whileTap={{ scale: 0.98 }}
                                                                        onClick={() => openAffecterModal(responsable)}
                                                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1 ${
                                                                            responsable.structure_id 
                                                                                ? 'bg-[#FF8500]/10 text-[#FF8500] hover:bg-[#FF8500] hover:text-white' 
                                                                                : 'bg-[#FF8500] text-white hover:bg-[#e67800]'
                                                                        }`}
                                                                    >
                                                                        <EditIcon className="w-3 h-3" />
                                                                        {responsable.structure_id ? 'Modifier' : 'Affecter'}
                                                                    </motion.button>
                                                                )}
                                                            </td>
                                                        </motion.tr>
                                                    ))}
                                                </AnimatePresence>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Modal Affectation */}
            {/* <AnimatePresence>
                {showAffecterModal && selectedUser && (
                    <motion.div 
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50"
                    >
                        <div className="bg-white rounded-2xl shadow-2xl w-[450px] max-w-[90%] overflow-hidden">
                            <div className="bg-gradient-to-r from-[#FF8500] to-[#FFA500] px-5 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                        <EditIcon className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-base">
                                            {activeSection === 'directeurs' ? 'Affecter une région' : 'Affecter une structure'}
                                        </h3>
                                        <p className="text-white/80 text-xs">Pour: {selectedUser.nom_complet}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-5">
                                {activeSection === 'directeurs' ? (
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Sélectionner une région</label>
                                        <select
                                            value={selectedRegion}
                                            onChange={(e) => setSelectedRegion(e.target.value)}
                                            className="w-full h-10 px-3 rounded-xl border border-gray-300 focus:border-[#FF8500] focus:outline-none focus:ring-1 focus:ring-[#FF8500] transition-all"
                                        >
                                            <option value="">-- Choisir une région --</option>
                                            {regions.map(region => (
                                                <option key={region._id || region.code_region} value={region._id || region.code_region}>
                                                    {region.nom_region} ({region.code_region})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                ) : (
                                    <>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Sélectionner la région <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                value={selectedRegion}
                                                onChange={(e) => {
                                                    setSelectedRegion(e.target.value);
                                                    setSelectedStructure('');
                                                }}
                                                className="w-full h-10 px-3 rounded-xl border border-gray-300 focus:border-[#FF8500] focus:outline-none focus:ring-1 focus:ring-[#FF8500] transition-all"
                                            >
                                                <option value="">-- Choisir une région --</option>
                                                {regions.map(region => (
                                                    <option key={region._id || region.code_region} value={region._id || region.code_region}>
                                                        {region.nom_region} ({region.code_region})
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Sélectionner la structure <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                value={selectedStructure}
                                                onChange={(e) => setSelectedStructure(e.target.value)}
                                                disabled={!selectedRegion || loadingStructures}
                                                className="w-full h-10 px-3 rounded-xl border border-gray-300 focus:border-[#FF8500] focus:outline-none focus:ring-1 focus:ring-[#FF8500] transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                                            >
                                                <option value="">
                                                    {loadingStructures 
                                                        ? 'Chargement des structures...' 
                                                        : !selectedRegion 
                                                            ? '-- D\'abord choisir une région --' 
                                                            : '-- Choisir une structure --'
                                                    }
                                                </option>
                                                {availableStructures.map(structure => (
                                                    <option key={structure._id} value={structure._id}>
                                                        {structure.nom_structure} ({structure.code_structure})
                                                    </option>
                                                ))}
                                            </select>
                                            {selectedRegion && availableStructures.length === 0 && !loadingStructures && (
                                                <p className="text-xs text-amber-600 mt-1">
                                                    Aucune structure disponible dans cette région
                                                </p>
                                            )}
                                        </div>
                                    </>
                                )}
                                
                                {activeSection === 'directeurs' && selectedUser.region_id && (
                                    <div className="mt-2 p-2 bg-yellow-50 rounded-lg">
                                        <p className="text-xs text-yellow-700">
                                            ⚠️ Attention: Ce directeur a déjà une région. La modifier remplacera l'ancienne.
                                        </p>
                                    </div>
                                )}
                                
                                {activeSection === 'responsables' && selectedUser.structure_id && (
                                    <div className="mt-2 p-2 bg-yellow-50 rounded-lg">
                                        <p className="text-xs text-yellow-700">
                                            ⚠️ Attention: Ce responsable a déjà une structure. La modifier remplacera l'ancienne.
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="border-t border-gray-100 px-5 py-4 bg-gray-50 flex gap-3">
                                <button
                                    onClick={() => {
                                        setShowAffecterModal(false);
                                        setSelectedUser(null);
                                        setSelectedRegion('');
                                        setSelectedStructure('');
                                    }}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-xl text-sm text-gray-700 font-medium hover:bg-gray-100 transition-all"
                                >
                                    Annuler
                                </button>
                                <button
                                    onClick={activeSection === 'directeurs' ? handleAffecterRegion : handleAffecterStructure}
                                    disabled={
                                        updating || 
                                        (activeSection === 'directeurs' ? !selectedRegion : (!selectedRegion || !selectedStructure))
                                    }
                                    className={`flex-1 px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                                        updating || (activeSection === 'directeurs' ? !selectedRegion : (!selectedRegion || !selectedStructure))
                                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-[#FF8500] to-[#FFA500] text-white hover:shadow-lg'
                                    }`}
                                >
                                    {updating && (
                                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                                        </svg>
                                    )}
                                    {updating ? 'Affectation...' : 'Affecter'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence> */}
            {/* Modal Affectation - Style AjouterStructure */}
<AnimatePresence>
    {showAffecterModal && selectedUser && (
        <motion.div 
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
            <div className="w-[550px] bg-white shadow-lg p-6 font-poppins">
                
                {/* En-tête */}
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <h1 className="text-lg font-semibold text-gray-800">
                        {activeSection === 'directeurs' ? 'Affecter une région' : 'Affecter une structure'}
                    </h1>
                    <button 
                        onClick={() => {
                            setShowAffecterModal(false);
                            setSelectedUser(null);
                            setSelectedRegion('');
                            setSelectedStructure('');
                        }} 
                        className="p-1 hover:bg-gray-100 rounded-full transition"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18M6 6L18 18" stroke="#4F4F4F" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </button>
                </div>

                {/* Informations utilisateur */}
                <div className="mt-4 p-3 bg-orange-50 rounded-[20px] border border-orange-200">
                    <div className="flex items-center gap-3">
                        {selectedUser.photo_profil ? (
                            <img src={selectedUser.photo_profil} alt="" className="w-10 h-10 rounded-full object-cover" />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-[#FF8500]/20 flex items-center justify-center text-[#FF8500] font-medium">
                                {selectedUser.nom_complet?.charAt(0)}
                            </div>
                        )}
                        <div>
                            <p className="text-sm font-semibold text-gray-800">{selectedUser.nom_complet}</p>
                            <p className="text-xs text-gray-500">{selectedUser.email}</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={(e) => {
                    e.preventDefault();
                    activeSection === 'directeurs' ? handleAffecterRegion() : handleAffecterStructure();
                }} className="space-y-4 mt-4">
                    
                    {activeSection === 'directeurs' ? (
                        // Formulaire pour Directeurs
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                                Région à affecter <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={selectedRegion}
                                onChange={(e) => setSelectedRegion(e.target.value)}
                                required
                                className="w-full h-10 px-3 rounded-[20px] border border-gray-300 focus:border-[#FF8500] focus:ring-1 focus:ring-[#FF8500] outline-none bg-white text-left"
                            >
                                <option value="">-- Sélectionner une région --</option>
                                {regions.map(region => (
                                    <option key={region._id || region.code_region} value={region._id || region.code_region}>
                                        {region.nom_region} ({region.code_region})
                                    </option>
                                ))}
                            </select>
                            
                            {selectedUser.region_id && (
                                <div className="mt-2 p-2 bg-yellow-50 rounded-[20px]">
                                    <p className="text-xs text-yellow-700 flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                        Attention: Ce directeur a déjà une région. La modifier remplacera l'ancienne.
                                    </p>
                                </div>
                            )}
                        </div>
                    ) : (
                        // Formulaire pour Responsables
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                                    Région <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={selectedRegion}
                                    onChange={(e) => {
                                        setSelectedRegion(e.target.value);
                                        setSelectedStructure('');
                                    }}
                                    required
                                    className="w-full h-10 px-3 rounded-[20px] border border-gray-300 focus:border-[#FF8500] focus:ring-1 focus:ring-[#FF8500] outline-none bg-white text-left"
                                >
                                    <option value="">-- Sélectionner une région --</option>
                                    {regions.map(region => (
                                        <option key={region._id || region.code_region} value={region._id || region.code_region}>
                                            {region.nom_region} ({region.code_region})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                                    Structure <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={selectedStructure}
                                    onChange={(e) => setSelectedStructure(e.target.value)}
                                    disabled={!selectedRegion || loadingStructures}
                                    required
                                    className="w-full h-10 px-3 rounded-[20px] border border-gray-300 focus:border-[#FF8500] focus:ring-1 focus:ring-[#FF8500] outline-none bg-white text-left disabled:bg-gray-100 disabled:cursor-not-allowed"
                                >
                                    <option value="">
                                        {loadingStructures 
                                            ? 'Chargement des structures...' 
                                            : !selectedRegion 
                                                ? '-- D\'abord choisir une région --' 
                                                : '-- Sélectionner une structure --'
                                        }
                                    </option>
                                    {availableStructures.map(structure => (
                                        <option key={structure._id} value={structure._id}>
                                            {structure.nom_structure} ({structure.code_structure})
                                        </option>
                                    ))}
                                </select>
                                
                                {selectedRegion && availableStructures.length === 0 && !loadingStructures && (
                                    <p className="text-xs text-amber-600 mt-1">
                                        ⚠️ Aucune structure disponible dans cette région
                                    </p>
                                )}
                            </div>
                            
                            {selectedUser.structure_id && (
                                <div className="p-2 bg-yellow-50 rounded-[20px]">
                                    <p className="text-xs text-yellow-700 flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                        Attention: Ce responsable a déjà une structure. La modifier remplacera l'ancienne.
                                    </p>
                                </div>
                            )}
                        </>
                    )}

                    {/* Boutons d'action */}
                    <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={() => {
                                setShowAffecterModal(false);
                                setSelectedUser(null);
                                setSelectedRegion('');
                                setSelectedStructure('');
                            }}
                            className="px-5 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-[20px] hover:bg-gray-300 transition"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            disabled={
                                updating || 
                                (activeSection === 'directeurs' ? !selectedRegion : (!selectedRegion || !selectedStructure))
                            }
                            className="px-5 py-2 bg-[#FF8500] text-white text-sm font-medium rounded-[20px] hover:bg-[#e67800] transition disabled:opacity-50 flex items-center gap-2"
                        >
                            {updating && (
                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                                </svg>
                            )}
                            {updating ? 'Affectation...' : 'Affecter'}
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    )}
</AnimatePresence>

            {/* Message succès */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-lg shadow-xl z-50 text-sm"
                    >
                        {successMessage}
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                
                .animate-pulse {
                    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
            `}</style>
        </div>
    );
};

export default Affectations;