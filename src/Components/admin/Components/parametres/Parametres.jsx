import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { axiosInstance } from '../../../../axios';
import RegionListe from '../Region/RegionListe';
import PerimetreListe from '../Perimetre/PerimetreListe';
import FamilleListe from '../Famille/FamilleListe';
import StructureListe from '../Structure/StructureListe';

const Parametres = () => {
    const [activeSection, setActiveSection] = useState('region');
    const [nbRegions, setNbRegions] = useState(0);
    const [nbPerimetres, setNbPerimetres] = useState(0);
    const [nbFamilles, setNbFamilles] = useState(0);
    const [nbStructures, setNbStructures] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [hoveredCard, setHoveredCard] = useState(null);
    
    // Récupérer le rôle de l'utilisateur
    const userRole = localStorage.getItem('role');
    const isAdmin = userRole === 'admin';
    const isChef = userRole === 'chef';

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setLoading(true);
                setError('');
                
                const [regionsRes, perimetresRes, famillesRes, structuresRes] = await Promise.all([
                    axiosInstance.get('/params/regions'),
                    axiosInstance.get('/params/perimetres'),
                    axiosInstance.get('/params/familles'),
                    axiosInstance.get('/params/structures')
                ]);

                const getCount = (data) => {
                    if (Array.isArray(data)) return data.length;
                    if (data?.data) return data.data.length;
                    if (data?.results) return data.results.length;
                    return Object.keys(data).length;
                };

                setNbRegions(getCount(regionsRes.data));
                setNbPerimetres(getCount(perimetresRes.data));
                setNbFamilles(getCount(famillesRes.data));
                setNbStructures(getCount(structuresRes.data));

            } catch (err) {
                console.error("Erreur:", err);
                setError("Impossible de charger les données");
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    const ORANGE_COLOR = '#FF8500';
    const ORANGE_GRADIENT = 'from-orange-500 to-amber-500';

    const cards = [
        {
            id: 'region',
            title: 'Régions',
            description: 'Gestion des régions géographiques',
            count: nbRegions,
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                    <circle cx="12" cy="9" r="2.5" />
                </svg>
            )
        },
        {
            id: 'perimetre',
            title: 'Périmètres',
            description: 'Gestion des périmètres par région',
            count: nbPerimetres,
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18M9 21v-12" />
                </svg>
            )
        },
        {
            id: 'famille',
            title: 'Familles',
            description: 'Gestion des familles par périmètre',
            count: nbFamilles,
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20 7h-4.5L15 4H9L8.5 7H4v2h16V7z" />
                    <path d="M4 11v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
                </svg>
            )
        },
        {
            id: 'structure',
            title: 'Structures',
            description: 'Gestion des structures par région',
            count: nbStructures,
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
        hidden: { 
            opacity: 0, 
            y: 30,
            scale: 0.95
        },
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
        hidden: { 
            opacity: 0, 
            x: -30,
            scale: 0.98
        },
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
            transition: {
                duration: 0.3
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Message info pour le chef */}
            {/* {isChef && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mx-8 mt-4 rounded-lg animate-fadeIn">
                    <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm text-blue-700">
                            Mode consultation uniquement. Vous pouvez visualiser les données mais pas les modifier.
                        </p>
                    </div>
                </div>
            )} */}

            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white border-b border-gray-200 sticky top-0 z-10 backdrop-blur-sm bg-white/95"
            >
                <div className="px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Paramètres</h1>
                            <p className="text-gray-500 mt-1">
                                Gérez les régions, périmètres, familles et structures
                                {isChef && <span className="text-blue-500 ml-1">(Consultation uniquement)</span>}
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
                <motion.div 
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
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
                                transition={{
                                    duration: 0.6,
                                    ease: "easeInOut"
                                }}
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

                                {/* Badge Lecture seule pour le chef */}
                                {isChef && (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="mt-3 inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded-full"
                                    >
                                        <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        <span className="text-xs text-gray-500">Lecture seule</span>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

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
                            <div className="flex items-center justify-between">
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
                                            Gestion des {cards.find(c => c.id === activeSection)?.title}
                                        </h2>
                                        <p className="text-sm text-gray-500">
                                            {cards.find(c => c.id === activeSection)?.description}
                                        </p>
                                    </div>
                                </div>
                                
                                {isChef && (
                                    <div className="px-3 py-1.5 bg-gray-100 rounded-lg">
                                        <span className="text-xs text-gray-500">Mode consultation</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        <div className="p-6">
                            {activeSection === 'region' && <RegionListe isReadOnly={isChef} />}
                            {activeSection === 'perimetre' && <PerimetreListe isReadOnly={isChef} />}
                            {activeSection === 'famille' && <FamilleListe isReadOnly={isChef} />}
                            {activeSection === 'structure' && <StructureListe isReadOnly={isChef} />}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <style jsx>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out forwards;
                }
                
                .animate-pulse {
                    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
            `}</style>
        </div>
    );
};

export default Parametres;