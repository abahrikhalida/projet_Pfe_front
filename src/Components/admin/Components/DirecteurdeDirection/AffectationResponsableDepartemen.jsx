import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { axiosInstance } from '../../../../axios';
import { ReactComponent as SearchIcon } from '../../../../Assets/Icons/Search.svg';
import { ReactComponent as AddIcon } from '../../../../Assets/Icons/Arrow.svg';
import { ReactComponent as EditIcon } from '../../../../Assets/Icons/edit.svg';
import { ReactComponent as DeleteIcon } from '../../../../Assets/Icons/Delete.svg';
import { ReactComponent as EmptyIcon } from '../../../../Assets/Icons/notFound.svg';

const AffectationResponsableDepartement = () => {
    const [departements, setDepartements] = useState([]);
    const [responsablesDisponibles, setResponsablesDisponibles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDepartement, setSelectedDepartement] = useState(null);
    const [selectedResponsable, setSelectedResponsable] = useState(null);
    const [showAffectationModal, setShowAffectationModal] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    const [filterStatus, setFilterStatus] = useState('all'); // all, affected, not_affected

    // Récupérer l'ID de la direction depuis localStorage
    const getDirectionId = () => {
        return localStorage.getItem('direction_id') || localStorage.getItem('directionId');
    };

    // Récupérer les départements de la direction du directeur connecté
    const fetchDepartements = useCallback(async () => {
        try {
            setLoading(true);
            const directionId = getDirectionId();
            
            if (!directionId) {
                setError("Aucune direction associée à votre compte");
                return;
            }

            // Appel à l'API pour récupérer les départements par direction
            const response = await axiosInstance.get(`/params/departements/by-direction-id/${directionId}`);
            
            let departementsData = [];
            if (response.data.data && Array.isArray(response.data.data)) {
                departementsData = response.data.data;
            } else if (response.data.departements && Array.isArray(response.data.departements)) {
                departementsData = response.data.departements;
            } else if (Array.isArray(response.data)) {
                departementsData = response.data;
            }

            // Pour chaque département, récupérer les infos du responsable affecté
            const departementsWithResponsable = await Promise.all(
                departementsData.map(async (departement) => {
                    try {
                        // Récupérer tous les responsables affectés
                        const respResponse = await axiosInstance.get('/api/users/responsables-departement/affectes/');
                        let responsablesAffectes = [];
                        
                        if (respResponse.data.users && Array.isArray(respResponse.data.users)) {
                            responsablesAffectes = respResponse.data.users;
                        } else if (Array.isArray(respResponse.data)) {
                            responsablesAffectes = respResponse.data;
                        }

                        const responsable = responsablesAffectes.find(r => {
                            const departementId = r.departement_id || r.departementId;
                            const currentDepartementId = departement._id || departement.id;
                            return departementId === currentDepartementId;
                        });
                        
                        return {
                            ...departement,
                            responsable_id: responsable?.id || null,
                            responsable_nom: responsable?.nom_complet || responsable?.full_name || null,
                            responsable_email: responsable?.email || null
                        };
                    } catch (err) {
                        console.error(`Erreur pour département ${departement._id || departement.id}:`, err);
                        return {
                            ...departement,
                            responsable_id: null,
                            responsable_nom: null,
                            responsable_email: null
                        };
                    }
                })
            );
            
            setDepartements(departementsWithResponsable);
        } catch (err) {
            console.error("Erreur chargement départements:", err);
            setError("Impossible de charger les départements de votre direction");
        } finally {
            setLoading(false);
        }
    }, []);

    // Récupérer les responsables disponibles (non affectés) de la direction
    const fetchResponsables = useCallback(async () => {
        try {
            const directionId = getDirectionId();
            console.log("🏢 Direction du directeur:", directionId);
            
            if (!directionId) {
                setError("Aucune direction associée à votre compte");
                return;
            }

            // Appel à l'API pour récupérer les responsables par direction
            const response = await axiosInstance.get(`/api/users/responsables-departement/direction/${directionId}`);
            
            let allResponsables = [];
            if (response.data.users && Array.isArray(response.data.users)) {
                allResponsables = response.data.users;
            } else if (Array.isArray(response.data)) {
                allResponsables = response.data;
            } else if (response.data.data && Array.isArray(response.data.data)) {
                allResponsables = response.data.data;
            }

            console.log(`📋 Total responsables dans la direction ${directionId}:`, allResponsables.length);

            // Récupérer les responsables déjà affectés
            const affectesRes = await axiosInstance.get('/api/users/responsables-departement/affectes/');
            let responsablesAffectes = [];
            
            if (affectesRes.data.users && Array.isArray(affectesRes.data.users)) {
                responsablesAffectes = affectesRes.data.users;
            } else if (Array.isArray(affectesRes.data)) {
                responsablesAffectes = affectesRes.data;
            }

            const affectesIds = new Set(responsablesAffectes.map(r => r.id));
            
            // Filtrer les responsables non affectés
            const disponibles = allResponsables.filter(resp => !affectesIds.has(resp.id));
            
            console.log(`✅ Responsables disponibles dans votre direction: ${disponibles.length}`);
            
            setResponsablesDisponibles(disponibles);
            
            if (disponibles.length === 0 && allResponsables.length > 0) {
                setError("Tous les responsables de votre direction sont déjà affectés");
            } else if (allResponsables.length === 0) {
                setError("Aucun responsable trouvé dans votre direction. Créez d'abord des responsables.");
            } else {
                setError('');
            }
            
        } catch (err) {
            console.error("Erreur chargement responsables:", err);
            setError("Impossible de charger les responsables de votre direction");
        }
    }, []);

    // Affecter un responsable à un département
    const handleAffecter = async () => {
        if (!selectedDepartement || !selectedResponsable) {
            setError("Veuillez sélectionner un département et un responsable");
            return;
        }

        setLoading(true);
        setError('');

        try {
            const departementId = selectedDepartement._id || selectedDepartement.id;
            
            await axiosInstance.patch(`/api/users/${selectedResponsable.id}/affecter-departement/`, {
                departement_id: departementId
            });

            setSuccessMessage(`✓ Responsable ${selectedResponsable.nom_complet || selectedResponsable.full_name} affecté à ${selectedDepartement.nom_departement || selectedDepartement.name}`);
            setShowSuccess(true);
            setShowAffectationModal(false);
            setSelectedDepartement(null);
            setSelectedResponsable(null);
            
            // Rafraîchir les données
            await fetchDepartements();
            await fetchResponsables();
            
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (err) {
            console.error("Erreur affectation:", err);
            setError(err.response?.data?.error || err.response?.data?.message || "Erreur lors de l'affectation");
        } finally {
            setLoading(false);
        }
    };

    // Désaffecter un responsable
    const handleDesaffecter = async (departement) => {
        if (!window.confirm(`⚠️ Voulez-vous vraiment désaffecter le responsable de ${departement.nom_departement || departement.name} ?`)) {
            return;
        }

        setLoading(true);
        setError('');
        
        try {
            // Récupérer le responsable affecté à ce département
            const affectesRes = await axiosInstance.get('/api/users/responsables-departement/affectes/');
            let responsablesAffectes = [];
            
            if (affectesRes.data.users && Array.isArray(affectesRes.data.users)) {
                responsablesAffectes = affectesRes.data.users;
            } else if (Array.isArray(affectesRes.data)) {
                responsablesAffectes = affectesRes.data;
            }
            
            const departementId = departement._id || departement.id;
            const responsable = responsablesAffectes.find(r => {
                const respDepartementId = r.departement_id || r.departementId;
                return respDepartementId === departementId;
            });
            
            if (responsable) {
                await axiosInstance.patch(`/api/users/${responsable.id}/affecter-departement/`, {
                    departement_id: null
                });
            }

            setSuccessMessage(`✓ Responsable désaffecté de ${departement.nom_departement || departement.name}`);
            setShowSuccess(true);
            
            await fetchDepartements();
            await fetchResponsables();
            
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (err) {
            console.error("Erreur désaffectation:", err);
            setError(err.response?.data?.message || "Erreur lors de la désaffectation");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const directionId = getDirectionId();
        if (directionId) {
            fetchDepartements();
            fetchResponsables();
        } else {
            setError("Aucune direction associée à votre compte. Veuillez contacter l'administrateur.");
        }
    }, [fetchDepartements, fetchResponsables]);

    // const filteredDepartements = departements.filter(departement => {
    //     const search = searchTerm.toLowerCase();
    //     const nomDepartement = departement.nom_departement || departement.name || '';
    //     const codeDepartement = departement.code_departement || departement.code || '';
    //     const responsableNom = departement.responsable_nom || '';
        
    //     return (
    //         codeDepartement.toLowerCase().includes(search) ||
    //         nomDepartement.toLowerCase().includes(search) ||
    //         responsableNom.toLowerCase().includes(search)
    //     );
    // });
// Remplacer votre fonction filteredDepartements par celle-ci
const filteredDepartements = departements.filter(departement => {
    const search = searchTerm.toLowerCase();
    const nomDepartement = departement.nom_departement || departement.name || '';
    const codeDepartement = departement.code_departement || departement.code || '';
    const responsableNom = departement.responsable_nom || '';
    
    const matchesSearch = 
        codeDepartement.toLowerCase().includes(search) ||
        nomDepartement.toLowerCase().includes(search) ||
        responsableNom.toLowerCase().includes(search);
    
    // Filtre par statut (Affecté / Non affecté / Tous)
    if (filterStatus === 'affected') {
        return matchesSearch && departement.responsable_id;
    }
    if (filterStatus === 'not_affected') {
        return matchesSearch && !departement.responsable_id;
    }
    return matchesSearch;
});
    const stats = {
        total: departements.length,
        affected: departements.filter(d => d.responsable_id).length,
        notAffected: departements.filter(d => !d.responsable_id).length
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                delay: i * 0.05,
                duration: 0.5,
                type: "spring",
                stiffness: 200,
                damping: 20
            }
        }),
        hover: {
            y: -8,
            scale: 1.02,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 15
            }
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
            {/* En-tête */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-20"
            >
                <div className="max-w-7xl mx-auto px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <motion.h1 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
                            >
                                Affectation des Responsables de Département
                            </motion.h1>
                            <motion.p 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-gray-500 mt-2"
                            >
                                Gérez l'affectation des responsables aux départements de votre direction
                            </motion.p>
                        </div>
                        
                        {loading && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center gap-2 px-3 py-2 bg-orange-50 rounded-full"
                            >
                                <div className="w-2 h-2 bg-[#FF8500] rounded-full animate-pulse" />
                                <span className="text-sm text-[#FF8500] font-medium">Synchronisation...</span>
                            </motion.div>
                        )}
                    </div>
                    
                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-lg"
                        >
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                {error}
                            </div>
                        </motion.div>
                    )}
                </div>
            </motion.div>

            <div className="max-w-7xl mx-auto px-8 py-8">
                {/* Cartes de statistiques */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
                >
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Total Départements</p>
                                <p className="text-3xl font-bold text-gray-800 mt-1">{stats.total}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
                                    <path d="M9 7h6" />
                                    <path d="M9 11h6" />
                                    <path d="M9 15h4" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Responsables Affectés</p>
                                <p className="text-3xl font-bold text-green-600 mt-1">{stats.affected}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">En Attente</p>
                                <p className="text-3xl font-bold text-orange-600 mt-1">{stats.notAffected}</p>
                            </div>
                            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Filtres et recherche */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8"
                >
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Rechercher par code, nom de département ou responsable..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#FF8500] focus:outline-none transition-all bg-white"
                                />
                            </div>
                        </div>
                        
                        <div className="flex gap-3">
                            <button
                                onClick={() => setFilterStatus('all')}
                                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                    filterStatus === 'all'
                                        ? 'bg-[#FF8500] text-white shadow-md'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                Tous
                            </button>
                            <button
                                onClick={() => setFilterStatus('affected')}
                                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                    filterStatus === 'affected'
                                        ? 'bg-green-500 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                Affectés
                            </button>
                            <button
                                onClick={() => setFilterStatus('not_affected')}
                                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                    filterStatus === 'not_affected'
                                        ? 'bg-orange-500 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                Non affectés
                            </button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setShowAffectationModal(true)}
                                className="px-6 py-2.5 bg-gradient-to-r from-[#FF8500] to-[#FF6B00] text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all duration-200 flex items-center gap-2"
                            >
                                <AddIcon className="w-4 h-4" />
                                Nouvelle affectation
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* Liste des départements */}
                <AnimatePresence mode="wait">
                    {filteredDepartements.length === 0 && !loading ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-2xl shadow-lg p-16 text-center"
                        >
                            <EmptyIcon className="w-48 h-48 mx-auto text-gray-300" />
                            <h3 className="text-xl font-semibold text-gray-800 mt-4">Aucun département trouvé</h3>
                            <p className="text-gray-500 mt-2">
                                {searchTerm ? "Aucun résultat ne correspond à votre recherche" : "Aucun département n'est associé à votre direction"}
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {filteredDepartements.map((departement, index) => (
                                <motion.div
                                    key={departement._id || departement.id}
                                    custom={index}
                                    variants={cardVariants}
                                    whileHover="hover"
                                    className="group relative bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer"
                                >
                                    {/* Gradient overlay au hover */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-amber-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                                    
                                    {/* Badge statut */}
                                    <div className="absolute top-4 right-4 z-10">
                                        {departement.responsable_id ? (
                                            <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full flex items-center gap-1">
                                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                                Affecté
                                            </span>
                                        ) : (
                                            <span className="px-2.5 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full flex items-center gap-1">
                                                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                                                Non affecté
                                            </span>
                                        )}
                                    </div>

                                    <div className="relative p-6">
                                        {/* Icône département */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                <svg className="w-7 h-7 text-[#FF8500]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l2-2m-2 2l2 2m-2-2h6m6 0h6M12 3v2m0 14v2m-7-7h2m8 0h2M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
                                                </svg>
                                            </div>
                                        </div>

                                        {/* Informations département */}
                                        <div className="mb-4">
                                            <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">
                                                {departement.nom_departement || departement.name}
                                            </h3>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-gray-400">Code:</span>
                                                <span className="text-sm font-mono text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                                                    {departement.code_departement || departement.code}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Responsable actuel */}
                                        <div className="mt-4 pt-4 border-t border-gray-100">
                                            {departement.responsable_id ? (
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3 flex-1">
                                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                                                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                            </svg>
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-semibold text-gray-800 truncate">
                                                                {departement.responsable_nom}
                                                            </p>
                                                            <p className="text-xs text-gray-500 truncate">
                                                                {departement.responsable_email}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDesaffecter(departement);
                                                        }}
                                                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition"
                                                        title="Désaffecter"
                                                    >
                                                        <DeleteIcon className="w-4 h-4" />
                                                    </motion.button>
                                                </div>
                                            ) : (
                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => {
                                                        setSelectedDepartement(departement);
                                                        setShowAffectationModal(true);
                                                    }}
                                                    className="w-full py-2.5 text-center text-[#FF8500] text-sm font-semibold hover:bg-[#FF8500]/10 rounded-xl transition flex items-center justify-center gap-2 group"
                                                >
                                                    <AddIcon className="w-4 h-4 transition-transform group-hover:rotate-90" />
                                                    Affecter un responsable
                                                </motion.button>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Loader */}
                <AnimatePresence>
                    {loading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
                        >
                            <div className="bg-white rounded-2xl p-8 shadow-2xl">
                                <div className="flex flex-col items-center">
                                    <div className="relative">
                                        <div className="w-16 h-16 border-4 border-gray-200 rounded-full" />
                                        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-[#FF8500] rounded-full animate-spin border-t-transparent" />
                                    </div>
                                    <div className="mt-6 flex gap-1">
                                        <span className="text-gray-700 font-medium">Chargement</span>
                                        <motion.span
                                            animate={{ opacity: [0, 1, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        >...</motion.span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Modal d'affectation */}
            <AnimatePresence>
                {showAffectationModal && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="w-full max-w-lg bg-white shadow-2xl rounded-2xl overflow-hidden"
                        >
                            {/* En-tête modal */}
                            <div className="bg-gradient-to-r from-[#FF8500] to-[#FF6B00] px-6 py-4">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-semibold text-white">Nouvelle affectation</h2>
                                    <button 
                                        onClick={() => {
                                            setShowAffectationModal(false);
                                            setSelectedDepartement(null);
                                            setSelectedResponsable(null);
                                            setError('');
                                        }}
                                        className="p-1 hover:bg-white/20 rounded-full transition"
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                            <path d="M18 6L6 18M6 6L18 18" strokeLinecap="round"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="p-6">
                                {error && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded"
                                    >
                                        {error}
                                    </motion.div>
                                )}

                                <div className="space-y-5">
                                    {/* Département sélectionné */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Département à affecter
                                        </label>
                                        <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                                            <p className="font-semibold text-gray-800">
                                                {selectedDepartement?.nom_departement || selectedDepartement?.name}
                                            </p>
                                            <p className="text-sm text-gray-500 mt-1">
                                                Code: {selectedDepartement?.code_departement || selectedDepartement?.code}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Sélection responsable */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Responsable à affecter <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            value={selectedResponsable?.id || ''}
                                            onChange={(e) => {
                                                const resp = responsablesDisponibles.find(r => r.id === parseInt(e.target.value));
                                                setSelectedResponsable(resp);
                                            }}
                                            className="w-full h-11 px-4 rounded-xl border-2 border-gray-200 focus:border-[#FF8500] focus:outline-none transition-all"
                                        >
                                            <option value="">-- Sélectionner un responsable --</option>
                                            {responsablesDisponibles.map((resp) => (
                                                <option key={resp.id} value={resp.id}>
                                                    {resp.nom_complet || resp.full_name || resp.nom} - {resp.email}
                                                </option>
                                            ))}
                                        </select>
                                        {responsablesDisponibles.length === 0 && (
                                            <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                                Aucun responsable disponible dans votre direction
                                            </p>
                                        )}
                                    </div>

                                    {/* Responsable sélectionné preview */}
                                    {selectedResponsable && (
                                        <motion.div 
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="p-4 bg-green-50 rounded-xl border border-green-200"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-green-800">
                                                        {selectedResponsable.nom_complet || selectedResponsable.full_name}
                                                    </p>
                                                    <p className="text-sm text-green-600">{selectedResponsable.email}</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>

                                <div className="flex gap-3 justify-end mt-6 pt-4 border-t border-gray-200">
                                    <button
                                        onClick={() => {
                                            setShowAffectationModal(false);
                                            setSelectedDepartement(null);
                                            setSelectedResponsable(null);
                                            setError('');
                                        }}
                                        className="px-5 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-200 transition"
                                    >
                                        Annuler
                                    </button>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleAffecter}
                                        disabled={!selectedDepartement || !selectedResponsable || loading}
                                        className={`px-6 py-2 text-white text-sm font-medium rounded-xl transition flex items-center gap-2 ${
                                            selectedDepartement && selectedResponsable && !loading
                                                ? 'bg-gradient-to-r from-[#FF8500] to-[#FF6B00] hover:shadow-lg' 
                                                : 'bg-gray-300 cursor-not-allowed'
                                        }`}
                                    >
                                        {loading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                                        {loading ? 'Affectation...' : 'Confirmer l\'affectation'}
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toast notification */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div 
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className="fixed bottom-5 right-5 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-5 rounded-xl shadow-xl z-50 flex items-center gap-3"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm font-medium">{successMessage}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AffectationResponsableDepartement;