import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { axiosInstance } from '../../../axios';
import { ReactComponent as SearchIcon } from '../../../Assets/Icons/Search.svg';
import { ReactComponent as EditIcon } from '../../../Assets/Icons/edit.svg';

const Affectations = () => {
    const [activeSection, setActiveSection] = useState('directeurs_region');
    const [directeursRegion, setDirecteursRegion] = useState([]);
    const [directeursDirection, setDirecteursDirection] = useState([]);
    const [regions, setRegions] = useState([]);
    const [directions, setDirections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [hoveredCard, setHoveredCard] = useState(null);
    const [showAffecterModal, setShowAffecterModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedDirection, setSelectedDirection] = useState('');
    const [updating, setUpdating] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const userRole = localStorage.getItem('role');
    const ORANGE_COLOR = '#FF8500';
    const ORANGE_GRADIENT = 'from-orange-500 to-amber-500';

    // Charger les données
    // const fetchData = async () => {
    //     setLoading(true);
    //     setError('');
    //     try {
    //         const [usersRes, regionsRes, directionsRes] = await Promise.all([
    //             axiosInstance.get('/api/users/'),
    //             axiosInstance.get('/params/regions'),
    //             axiosInstance.get('/params/directions')
    //         ]);

    //         const allUsers = usersRes.data.users || [];
            
    //         // Filtrer les directeurs de région (role: directeur_region)
    //         const directeursRegionFiltres = allUsers.filter(user => user.role === 'directeur_region');
            
    //         // Filtrer les directeurs de direction (role: directeur_direction)
    //         const directeursDirectionFiltres = allUsers.filter(user => user.role === 'directeur_direction');
            
    //         setDirecteursRegion(directeursRegionFiltres);
    //         setDirecteursDirection(directeursDirectionFiltres);
    //         setRegions(regionsRes.data.data || []);
    //         setDirections(directionsRes.data.data || []);
            
    //     } catch (err) {
    //         console.error("Erreur chargement données:", err);
    //         setError("Impossible de charger les données");
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
        const [usersRes, regionsRes, directionsRes, directeursDirectionRes] = await Promise.all([
            axiosInstance.get('/api/users/'),
            axiosInstance.get('/params/regions'),
            axiosInstance.get('/params/directions'),
            axiosInstance.get('/api/users/directeurs-direction/affectes/')
        ]);

        const allUsers = usersRes.data.users || [];
        const directeursAvecDirection = directeursDirectionRes.data.users || [];
        
        // Filtrer les directeurs de région
        const directeursRegionFiltres = allUsers.filter(user => user.role === 'directeur_region');
        
        // Créer un Map des directeurs avec direction_id
        const directionMap = new Map();
        directeursAvecDirection.forEach(d => {
            directionMap.set(d.id, d.direction_id);
        });
        
        // Filtrer les directeurs de direction et ajouter direction_id
        const directeursDirectionFiltres = allUsers
            .filter(user => user.role === 'directeur_direction')
            .map(user => ({
                ...user,
                direction_id: directionMap.get(user.id) || user.direction_id || null
            }));
        
        setDirecteursRegion(directeursRegionFiltres);
        setDirecteursDirection(directeursDirectionFiltres);
        setRegions(regionsRes.data.data || []);
        setDirections(directionsRes.data.data || []);
        
    } catch (err) {
        console.error("Erreur chargement données:", err);
        setError("Impossible de charger les données");
    } finally {
        setLoading(false);
    }
};

    useEffect(() => {
        fetchData();
    }, []);

    const handleSuccess = (message) => {
        setSuccessMessage(message);
        setShowSuccess(true);
        fetchData();
        setTimeout(() => setShowSuccess(false), 3000);
    };

    // Affectation d'une région à un directeur de région
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
                handleSuccess(response.data.message || `Région affectée à ${selectedUser.nom_complet}`);
            }
        } catch (err) {
            console.error("Erreur affectation:", err);
            const errorMsg = err.response?.data?.error || "Erreur lors de l'affectation";
            alert(errorMsg);
        } finally {
            setUpdating(false);
        }
    };

    // Affectation d'une direction à un directeur de direction
    const handleAffecterDirection = async () => {
        if (!selectedUser || !selectedDirection) return;
        
        setUpdating(true);
        try {
            const response = await axiosInstance.patch(`/api/users/${selectedUser.id}/affecter-direction/`, {
                direction_id: selectedDirection
            });
            
            if (response.data.status === 'success') {
                setShowAffecterModal(false);
                setSelectedUser(null);
                setSelectedDirection('');
                console.log(response.data)
                handleSuccess(response.data.message || `Direction affectée à ${selectedUser.nom_complet}`);
            }
        } catch (err) {
            console.error("Erreur affectation:", err);
            const errorMsg = err.response?.data?.error || "Erreur lors de l'affectation";
            alert(errorMsg);
        } finally {
            setUpdating(false);
        }
    };

    const openAffecterModal = (user, type) => {
        setSelectedUser(user);
        if (type === 'region') {
            setSelectedRegion(user.region_id || '');
        } else {
            setSelectedDirection(user.direction_id || '');
        }
        setShowAffecterModal(true);
    };

    const getRegionName = (regionId) => {
        if (!regionId) return 'Non affecté';
        const region = regions.find(r => r._id === regionId || r.code_region === regionId);
        return region?.nom_region || regionId;
    };

    const getDirectionName = (directionId) => {
        if (!directionId) return 'Non affecté';
        const direction = directions.find(d => d._id === directionId);
        return direction?.nom_direction || directionId;
    };

    const canAffecter = userRole === 'admin';

    // Filtrer les données
    const filteredDirecteursRegion = directeursRegion.filter(d => 
        d.nom_complet?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredDirecteursDirection = directeursDirection.filter(d => 
        d.nom_complet?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Cartes pour les onglets
    const cards = [
        {
            id: 'directeurs_region',
            title: 'Directeurs de Région',
            description: 'Affectation des régions aux directeurs de région',
            count: directeursRegion.length,
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    <path d="M3 12h3l2-3 2 3 2-3 2 3 2-3 2 3h3" strokeLinecap="round"/>
                </svg>
            )
        },
        {
            id: 'directeurs_direction',
            title: 'Directeurs de Direction',
            description: 'Affectation des directions aux directeurs de direction',
            count: directeursDirection.length,
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
                    <path d="M17 21v-4H7v4" />
                    <path d="M7 3v4h10V3" />
                    <path d="M4 12h16" />
                    <path d="M12 8v8" />
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
                                Affectez les régions aux directeurs de région et les directions aux directeurs de direction
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
                    className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10"
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
                                        {activeSection === 'directeurs_region' 
                                            ? 'Liste des Directeurs de Région' 
                                            : 'Liste des Directeurs de Direction'}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        {activeSection === 'directeurs_region' 
                                            ? 'Affectez une région à chaque directeur de région' 
                                            : 'Affectez une direction à chaque directeur de direction'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            {/* Tableau Directeurs de Région */}
                            {activeSection === 'directeurs_region' && (
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
                                            ) : filteredDirecteursRegion.length === 0 ? (
                                                <tr>
                                                    <td colSpan="4" className="py-12 text-center">
                                                        <div className="text-center">
                                                            <svg className="w-16 h-16 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                                            </svg>
                                                            <p className="text-gray-500">Aucun directeur de région trouvé</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ) : (
                                                <AnimatePresence>
                                                    {filteredDirecteursRegion.map((directeur, index) => (
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
                                                                        onClick={() => openAffecterModal(directeur, 'region')}
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

                            {/* Tableau Directeurs de Direction */}
                            {activeSection === 'directeurs_direction' && (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-gradient-to-r from-[#F9F9F9] to-[#F0F0F0] border-b border-[#E4E4E4]">
                                                <th className="py-3 px-4 text-left text-xs font-semibold text-[#4A4A4A] rounded-l-lg w-[35%]">Utilisateur</th>
                                                <th className="py-3 px-4 text-left text-xs font-semibold text-[#4A4A4A] w-[30%]">Email</th>
                                                <th className="py-3 px-4 text-left text-xs font-semibold text-[#4A4A4A] w-[20%]">Direction affectée</th>
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
                                            ) : filteredDirecteursDirection.length === 0 ? (
                                                <tr>
                                                    <td colSpan="4" className="py-12 text-center">
                                                        <div className="text-center">
                                                            <svg className="w-16 h-16 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
                                                                <path d="M17 21v-4H7v4" />
                                                                <path d="M7 3v4h10V3" />
                                                            </svg>
                                                            <p className="text-gray-500">Aucun directeur de direction trouvé</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ) : (
                                                <AnimatePresence>
                                                    {filteredDirecteursDirection.map((directeur, index) => (
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
                                                                    directeur.direction_id 
                                                                        ? 'bg-green-100 text-green-700' 
                                                                        : 'bg-gray-100 text-gray-500'
                                                                }`}>
                                                                    {getDirectionName(directeur.direction_id)}
                                                                </span>
                                                            </td>
                                                            <td className="py-3 px-4">
                                                                {canAffecter && (
                                                                    <motion.button
                                                                        whileHover={{ scale: 1.02 }}
                                                                        whileTap={{ scale: 0.98 }}
                                                                        onClick={() => openAffecterModal(directeur, 'direction')}
                                                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1 ${
                                                                            directeur.direction_id 
                                                                                ? 'bg-[#FF8500]/10 text-[#FF8500] hover:bg-[#FF8500] hover:text-white' 
                                                                                : 'bg-[#FF8500] text-white hover:bg-[#e67800]'
                                                                        }`}
                                                                    >
                                                                        <EditIcon className="w-3 h-3" />
                                                                        {directeur.direction_id ? 'Modifier' : 'Affecter'}
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
            <AnimatePresence>
                {showAffecterModal && selectedUser && (
                    <motion.div 
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    >
                        <div className="w-[550px] bg-white shadow-lg p-6 rounded-2xl">
                            
                            {/* En-tête */}
                            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                                <h1 className="text-lg font-semibold text-gray-800">
                                    {activeSection === 'directeurs_region' ? 'Affecter une région' : 'Affecter une direction'}
                                </h1>
                                <button 
                                    onClick={() => {
                                        setShowAffecterModal(false);
                                        setSelectedUser(null);
                                        setSelectedRegion('');
                                        setSelectedDirection('');
                                    }} 
                                    className="p-1 hover:bg-gray-100 rounded-full transition"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <path d="M18 6L6 18M6 6L18 18" stroke="#4F4F4F" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                </button>
                            </div>

                            {/* Informations utilisateur */}
                            <div className="mt-4 p-3 bg-orange-50 rounded-xl border border-orange-200">
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
                                activeSection === 'directeurs_region' ? handleAffecterRegion() : handleAffecterDirection();
                            }} className="space-y-4 mt-4">
                                
                                {activeSection === 'directeurs_region' ? (
                                    // Formulaire pour Directeurs de Région
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                                            Région à affecter <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            value={selectedRegion}
                                            onChange={(e) => setSelectedRegion(e.target.value)}
                                            required
                                            className="w-full h-10 px-3 rounded-xl border border-gray-300 focus:border-[#FF8500] focus:ring-1 focus:ring-[#FF8500] outline-none bg-white text-left"
                                        >
                                            <option value="">-- Sélectionner une région --</option>
                                            {regions.map(region => (
                                                <option key={region._id || region.code_region} value={region._id || region.code_region}>
                                                    {region.nom_region} ({region.code_region})
                                                </option>
                                            ))}
                                        </select>
                                        
                                        {selectedUser.region_id && (
                                            <div className="mt-2 p-2 bg-yellow-50 rounded-xl">
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
                                    // Formulaire pour Directeurs de Direction
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                                            Direction à affecter <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            value={selectedDirection}
                                            onChange={(e) => setSelectedDirection(e.target.value)}
                                            required
                                            className="w-full h-10 px-3 rounded-xl border border-gray-300 focus:border-[#FF8500] focus:ring-1 focus:ring-[#FF8500] outline-none bg-white text-left"
                                        >
                                            <option value="">-- Sélectionner une direction --</option>
                                            {directions.map(direction => (
                                                <option key={direction._id} value={direction._id}>
                                                    {direction.nom_direction} ({direction.code_direction})
                                                </option>
                                            ))}
                                        </select>
                                        
                                        {selectedUser.direction_id && (
                                            <div className="mt-2 p-2 bg-yellow-50 rounded-xl">
                                                <p className="text-xs text-yellow-700 flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                    </svg>
                                                    Attention: Ce directeur a déjà une direction. La modifier remplacera l'ancienne.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Boutons d'action */}
                                <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowAffecterModal(false);
                                            setSelectedUser(null);
                                            setSelectedRegion('');
                                            setSelectedDirection('');
                                        }}
                                        className="px-5 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-300 transition"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={updating || (activeSection === 'directeurs_region' ? !selectedRegion : !selectedDirection)}
                                        className="px-5 py-2 bg-[#FF8500] text-white text-sm font-medium rounded-xl hover:bg-[#e67800] transition disabled:opacity-50 flex items-center gap-2"
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
                        ✅ {successMessage}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Affectations;