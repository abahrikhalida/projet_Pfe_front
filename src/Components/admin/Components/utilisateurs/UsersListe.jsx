import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { axiosInstance } from '../../../../axios';
import { ReactComponent as EditIcon } from '../../../../Assets/Icons/edit.svg';
import { ReactComponent as DeleteIcon } from '../../../../Assets/Icons/Delete.svg';
import { ReactComponent as SearchIcon } from '../../../../Assets/Icons/Search.svg';
import AjouterUtilisateurModal from './AjouterUtilisateurModal';

// --- COMPOSANT MODIFIER UTILISATEUR ---
const ModifierUtilisateur = ({ onCancel, user, onSuccess, axiosInstance }) => {
    const [formData, setFormData] = useState({
        nom: user.nom || '',
        prenom: user.prenom || '',
        email: user.email || '',
        adresse: user.adresse || '',
        date_naissance: user.date_naissance || '',
        sexe: user.sexe || '',
        telephone: user.telephone || '',
        matricule: user.matricule || '',
       
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const formDataToSend = new FormData();
            
            Object.keys(formData).forEach(key => {
                if (formData[key] != null && formData[key] !== '') {
                    formDataToSend.append(key, formData[key]);
                }
            });

            await axiosInstance.put(`/api/users/${user.id}/update/`, formDataToSend, {
                headers: { 
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            onSuccess();
            
        } catch (err) {
            console.error("Erreur:", err);
            if (err.response) {
                alert(`Erreur: ${err.response.data.message || 'Erreur serveur'}`);
            } else {
                alert("Erreur de communication avec le serveur");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="w-[600px] bg-white shadow-2xl p-8 rounded-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Modifier Utilisateur</h2>
                    <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-full transition">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4F4F4F" strokeWidth="2">
                            <path d="M18 6L6 18M6 6L18 18" />
                        </svg>
                    </button>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                            <input
                                type="text"
                                name="nom"
                                value={formData.nom}
                                onChange={handleInputChange}
                                className="w-full h-9 px-3 rounded-[20px] border border-gray-300 focus:border-[#FF8500] focus:outline-none text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                            <input
                                type="text"
                                name="prenom"
                                value={formData.prenom}
                                onChange={handleInputChange}
                                className="w-full h-9 px-3 rounded-[20px] border border-gray-300 focus:border-[#FF8500] focus:outline-none text-sm"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full h-9 px-3 rounded-[20px] border border-gray-300 focus:border-[#FF8500] focus:outline-none text-sm"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                        <input
                            type="text"
                            name="adresse"
                            value={formData.adresse}
                            onChange={handleInputChange}
                            className="w-full h-9 px-3 rounded-[20px] border border-gray-300 focus:border-[#FF8500] focus:outline-none text-sm"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date naissance</label>
                            <input
                                type="date"
                                name="date_naissance"
                                value={formData.date_naissance}
                                onChange={handleInputChange}
                                className="w-full h-9 px-3 rounded-[20px] border border-gray-300 focus:border-[#FF8500] focus:outline-none text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Sexe</label>
                            <select
                                name="sexe"
                                value={formData.sexe}
                                onChange={handleInputChange}
                                className="w-full h-9 px-3 rounded-[20px] border border-gray-300 focus:border-[#FF8500] focus:outline-none text-sm bg-white"
                            >
                                <option value="">Sélectionner</option>
                                <option value="M">Masculin</option>
                                <option value="F">Féminin</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                            <input
                                type="tel"
                                name="telephone"
                                value={formData.telephone}
                                onChange={handleInputChange}
                                className="w-full h-9 px-3 rounded-[20px] border border-gray-300 focus:border-[#FF8500] focus:outline-none text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Matricule</label>
                            <input
                                type="text"
                                name="matricule"
                                value={formData.matricule}
                                onChange={handleInputChange}
                                className="w-full h-9 px-3 rounded-[20px] border border-gray-300 focus:border-[#FF8500] focus:outline-none text-sm"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-3 border-t border-gray-200 mt-3">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-6 py-2 rounded-[25px] bg-gray-200 text-gray-700 hover:bg-gray-300 transition text-sm"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 rounded-[25px] bg-[#FF8500] text-white hover:bg-[#e67800] transition disabled:opacity-50 text-sm"
                        >
                            {loading ? 'Modification...' : 'Modifier'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// --- COMPOSANT SUPPRESSION UTILISATEUR ---
const DeleteUtilisateur = ({ onCancel, user, onSuccess, axiosInstance }) => {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            await axiosInstance.delete(`/users/${user.id}/delete/`);
            onSuccess();
        } catch (err) {
            console.error("Erreur:", err);
            alert("Erreur lors de la suppression");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="w-[500px] bg-white shadow-2xl p-8 rounded-2xl">
                <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FFD21E" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 8v4M12 16h.01" />
                        </svg>
                    </div>
                </div>
                <h2 className="text-xl font-semibold text-center mb-2">Confirmation</h2>
                <p className="text-center text-gray-600 mb-6">
                    Êtes-vous sûr de vouloir supprimer l'utilisateur <span className="font-semibold">{user?.prenom} {user?.nom}</span> ?
                </p>
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={onCancel}
                        className="px-6 py-2 rounded-[25px] bg-gray-200 hover:bg-gray-300 transition"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={loading}
                        className="px-6 py-2 rounded-[25px] bg-red-500 text-white hover:bg-red-600 transition disabled:opacity-50"
                    >
                        {loading ? 'Suppression...' : 'Supprimer'}
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- COMPOSANT SELECTEUR DE ROLE INLINE AVEC SELECTION REGION/DIRECTION ---
const RoleSelector = ({ user, roles, onUpdate, isLoading }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [showExtraFields, setShowExtraFields] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedDirection, setSelectedDirection] = useState('');
    const [regions, setRegions] = useState([]);
    const [directions, setDirections] = useState([]);
    const [loadingRegions, setLoadingRegions] = useState(false);
    const [loadingDirections, setLoadingDirections] = useState(false);
    const [pendingRole, setPendingRole] = useState(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false);
                setShowExtraFields(false);
                setPendingRole(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Fonction utilitaire pour extraire un tableau de la réponse API
    const extractArrayFromResponse = (responseData) => {
        // Si c'est déjà un tableau
        if (Array.isArray(responseData)) return responseData;
        
        // Structure MongoDB standard: { success: true, data: [] }
        if (responseData?.data && Array.isArray(responseData.data)) return responseData.data;
        
        // Structure Django REST: { results: [] }
        if (responseData?.results && Array.isArray(responseData.results)) return responseData.results;
        
        // Structure avec items
        if (responseData?.items && Array.isArray(responseData.items)) return responseData.items;
        
        // Si responseData lui-même a un tableau dans une propriété
        for (const key in responseData) {
            if (Array.isArray(responseData[key])) {
                return responseData[key];
            }
        }
        
        return [];
    };

    // Charger les régions
    const fetchRegions = async () => {
        setLoadingRegions(true);
        try {
            const response = await axiosInstance.get('/params/regions/');
            console.log('Regions response:', response.data);
            const regionsData = extractArrayFromResponse(response.data);
            setRegions(regionsData);
        } catch (err) {
            console.error("Erreur chargement régions:", err);
            setRegions([]);
        } finally {
            setLoadingRegions(false);
        }
    };

    // Charger les directions
    const fetchDirections = async () => {
        setLoadingDirections(true);
        try {
            const response = await axiosInstance.get('/params/directions/');
            console.log('Directions response:', response.data);
            const directionsData = extractArrayFromResponse(response.data);
            setDirections(directionsData);
        } catch (err) {
            console.error("Erreur chargement directions:", err);
            setDirections([]);
        } finally {
            setLoadingDirections(false);
        }
    };

    const currentRole = roles.find(r => r.value === user.role) || { 
        value: user.role, 
        label: user.role || 'Sans rôle', 
        color: '#94a3b8' 
    };

    const handleRoleClick = (role) => {
        if (user.role === role.value) {
            setIsOpen(false);
            return;
        }

        // Vérifier si le rôle nécessite des informations supplémentaires
        if (role.value === 'responsable_structure') {
            setPendingRole(role);
            setShowExtraFields(true);
            fetchRegions();
        } 
        else if (role.value === 'responsable_departement') {
            setPendingRole(role);
            setShowExtraFields(true);
            fetchDirections();
        }
        else {
            // Pour les autres rôles, assigner directement
            handleRoleChange(role.value);
        }
    };

    const handleRoleChange = async (roleValue, extraData = {}) => {
        if (user.role === roleValue) {
            setIsOpen(false);
            setShowExtraFields(false);
            return;
        }
        
        setUpdating(true);
        try {
            await onUpdate(user.id, roleValue, extraData);
        } finally {
            setUpdating(false);
            setIsOpen(false);
            setShowExtraFields(false);
            setPendingRole(null);
            // Réinitialiser les sélections
            setSelectedRegion('');
            setSelectedDirection('');
            setRegions([]);
            setDirections([]);
        }
    };

    const handleConfirmWithExtra = () => {
        if (!pendingRole) return;

        const extraData = {};
        
        if (pendingRole.value === 'responsable_structure') {
            if (!selectedRegion) {
                alert("Veuillez sélectionner une région");
                return;
            }
            extraData.region_id = selectedRegion;
        }
        
        if (pendingRole.value === 'responsable_departement') {
            if (!selectedDirection) {
                alert("Veuillez sélectionner une direction");
                return;
            }
            extraData.direction_id = selectedDirection;
        }

        handleRoleChange(pendingRole.value, extraData);
    };

    // Fonction pour obtenir l'affichage du nom d'une région/direction
    const getDisplayName = (item) => {
        // Essayer différents champs possibles selon votre modèle MongoDB
        return item.nom || 
               item.name || 
               item.libelle || 
               item.label || 
               item.titre ||
               item.intitule ||
               (item.nom_region) ||
               (item.nom_direction) ||
               `ID: ${item._id || item.id}`;
    };

    // Fonction pour obtenir l'ID d'un item
    const getItemId = (item) => {
        return item._id || item.id;
    };

    return (
        <div className="relative" ref={containerRef}>
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => !updating && !isLoading && setIsOpen(!isOpen)}
                disabled={updating || isLoading}
                className="flex items-center gap-2 px-3 py-1.5 rounded-[12px] transition-all min-w-[150px] border disabled:opacity-50"
                style={{ 
                    backgroundColor: `${currentRole.color}08`, 
                    borderColor: `${currentRole.color}20` 
                }}
            >
                {updating ? (
                    <div className="w-2 h-2 rounded-full animate-spin border-2 border-[#FF8500] border-t-transparent" />
                ) : (
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: currentRole.color }} />
                )}
                <span className="text-[11px] font-bold uppercase tracking-wide truncate" style={{ color: currentRole.color }}>
                    {updating ? 'Mise à jour...' : currentRole.label}
                </span>
                {!updating && (
                    <svg className={`ml-auto w-3 h-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                         fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: currentRole.color }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                    </svg>
                )}
            </motion.button>

            <AnimatePresence>
                {isOpen && !updating && !showExtraFields && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 4, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        className="absolute left-0 top-full z-[100] min-w-[220px] bg-white rounded-xl shadow-2xl border border-gray-100 max-h-[350px] overflow-y-auto"
                    >
                        {roles.map((role) => (
                            <button
                                key={role.value}
                                onClick={() => handleRoleClick(role)}
                                className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-medium transition-all first:rounded-t-xl last:rounded-b-xl ${
                                    user.role === role.value 
                                    ? 'bg-gray-50 text-gray-900 cursor-default' 
                                    : 'hover:bg-orange-50 text-gray-600 hover:text-[#FF8500]'
                                }`}
                            >
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: role.color }} />
                                <span className="flex-1 text-left">{role.label}</span>
                                {user.role === role.value && (
                                    <svg className="w-3.5 h-3.5 text-[#FF8500]" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </button>
                        ))}
                    </motion.div>
                )}

                {/* Modal pour sélectionner région/direction */}
                {showExtraFields && pendingRole && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-[200]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="bg-white rounded-2xl p-6 w-[500px] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {pendingRole.value === 'responsable_structure' 
                                        ? 'Assigner comme Responsable de Structure' 
                                        : 'Assigner comme Responsable de Département'}
                                </h3>
                                <button 
                                    onClick={() => {
                                        setShowExtraFields(false);
                                        setPendingRole(null);
                                    }}
                                    className="p-1 hover:bg-gray-100 rounded-full"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4F4F4F" strokeWidth="2">
                                        <path d="M18 6L6 18M6 6L18 18" />
                                    </svg>
                                </button>
                            </div>

                            <div className="space-y-4">
                                <p className="text-sm text-gray-600">
                                    Vous êtes sur le point d'assigner le rôle <span className="font-semibold text-[#FF8500]">{pendingRole.label}</span> à <span className="font-semibold">{user.prenom} {user.nom}</span>
                                </p>

                                {pendingRole.value === 'responsable_structure' && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Région <span className="text-red-500">*</span>
                                        </label>
                                        {loadingRegions ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 border-2 border-[#FF8500] border-t-transparent rounded-full animate-spin" />
                                                <span className="text-sm text-gray-500">Chargement des régions...</span>
                                            </div>
                                        ) : (
                                            <select
                                                value={selectedRegion}
                                                onChange={(e) => setSelectedRegion(e.target.value)}
                                                className="w-full h-10 px-3 rounded-[20px] border border-gray-300 focus:border-[#FF8500] focus:outline-none text-sm"
                                            >
                                                <option value="">-- Sélectionner une région --</option>
                                                {Array.isArray(regions) && regions.length > 0 ? (
                                                    regions.map(region => (
                                                        <option key={getItemId(region)} value={getItemId(region)}>
                                                            {getDisplayName(region)}
                                                        </option>
                                                    ))
                                                ) : (
                                                    <option disabled>Aucune région disponible</option>
                                                )}
                                            </select>
                                        )}
                                    </div>
                                )}

                                {pendingRole.value === 'responsable_departement' && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Direction <span className="text-red-500">*</span>
                                        </label>
                                        {loadingDirections ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 border-2 border-[#FF8500] border-t-transparent rounded-full animate-spin" />
                                                <span className="text-sm text-gray-500">Chargement des directions...</span>
                                            </div>
                                        ) : (
                                            <select
                                                value={selectedDirection}
                                                onChange={(e) => setSelectedDirection(e.target.value)}
                                                className="w-full h-10 px-3 rounded-[20px] border border-gray-300 focus:border-[#FF8500] focus:outline-none text-sm"
                                            >
                                                <option value="">-- Sélectionner une direction --</option>
                                                {Array.isArray(directions) && directions.length > 0 ? (
                                                    directions.map(direction => (
                                                        <option key={getItemId(direction)} value={getItemId(direction)}>
                                                            {getDisplayName(direction)}
                                                        </option>
                                                    ))
                                                ) : (
                                                    <option disabled>Aucune direction disponible</option>
                                                )}
                                            </select>
                                        )}
                                    </div>
                                )}

                                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 mt-4">
                                    <button
                                        onClick={() => {
                                            setShowExtraFields(false);
                                            setPendingRole(null);
                                        }}
                                        className="px-4 py-2 rounded-[25px] bg-gray-200 text-gray-700 hover:bg-gray-300 transition text-sm"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        onClick={handleConfirmWithExtra}
                                        className="px-4 py-2 rounded-[25px] bg-[#FF8500] text-white hover:bg-[#e67800] transition text-sm"
                                    >
                                        Confirmer
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
// --- COMPOSANT PRINCIPAL ---
const UsersListe = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [updatingRoles, setUpdatingRoles] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showModifyModal, setShowModifyModal] = useState(false);
    const [userToModify, setUserToModify] = useState(null);

    // Liste complète des rôles selon le backend Django
    const roles = [
        { value: 'admin', label: 'Admin', color: '#FF4444' },
        { value: 'chef', label: 'Chef', color: '#FF8500' },
        { value: 'directeur', label: 'Directeur', color: '#EC4899' },
        { value: 'directeur_region', label: 'Directeur de Région', color: '#3B82F6' },
        { value: 'directeur_direction', label: 'Directeur de Direction', color: '#8B5CF6' },
        { value: 'responsable_structure', label: 'Responsable de Structure', color: '#10B981' },
        { value: 'responsable_departement', label: 'Responsable de Département', color: '#06B6D4' },
        { value: 'divisionnaire', label: 'Divisionnaire', color: '#14B8A6' },
        { value: 'agent', label: 'Agent', color: '#6B7280' }
    ];

    // Grouper les rôles par catégorie (optionnel - pour une meilleure organisation)
    const roleGroups = {
        'Administration': ['admin'],
        'Direction': ['directeur', 'directeur_region', 'directeur_direction'],
        'Responsables': ['responsable_structure', 'responsable_departement'],
        'Opérationnel': ['chef', 'divisionnaire', 'agent']
    };

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/api/users/');
            const usersData = response.data.users || response.data.data || response.data || [];
            setUsers(usersData);
        } catch (err) {
            console.error("Erreur chargement utilisateurs:", err);
            if (err.response?.status === 401) {
                console.error("Non authentifié");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSuccess = (message) => {
        setSuccessMessage(message);
        setShowSuccess(true);
        fetchUsers();
        setTimeout(() => setShowSuccess(false), 3000);
    };

  // Fonction d'assignation de rôle adaptée au backend Django avec données supplémentaires
const updateRoleFast = async (userId, newRole, extraData = {}) => {
    setUpdatingRoles(prev => ({ ...prev, [userId]: true }));
    
    try {
        // Construire le payload avec les données supplémentaires
        const payload = {
            user_id: userId,
            role: newRole,
            ...extraData
        };
        
        const response = await axiosInstance.post('/api/assign-role/', payload);
        
        if (response.data.status === 'success') {
            const roleLabel = roles.find(r => r.value === newRole)?.label || newRole;
            
            // Message spécifique selon le type de rôle
            let successMsg = `Rôle "${roleLabel}" attribué avec succès`;
            if (newRole === 'agent') {
                successMsg = `Agent créé avec succès et rattaché à un chef`;
            } else if (newRole === 'responsable_structure') {
                successMsg = `Responsable de structure assigné avec succès`;
            } else if (newRole === 'responsable_departement') {
                successMsg = `Responsable de département assigné avec succès`;
            }
            
            handleSuccess(successMsg);
            
            // Mettre à jour l'utilisateur localement
            setUsers(prevUsers => 
                prevUsers.map(user => 
                    user.id === userId 
                        ? { 
                            ...user, 
                            role: newRole,
                            region_id: extraData.region_id || user.region_id,
                            structure_id: extraData.structure_id || user.structure_id,
                            direction_id: extraData.direction_id || user.direction_id,
                            departement_id: extraData.departement_id || user.departement_id
                        }
                        : user
                )
            );
        } else {
            const errorMsg = response.data.message || "Erreur lors de l'assignation";
            alert(errorMsg);
        }
    } catch (err) {
        console.error("Erreur assignation rôle:", err);
        
        let errorMessage = "Erreur lors de l'assignation du rôle";
        
        if (err.response) {
            const data = err.response.data;
            if (data.message) {
                errorMessage = data.message;
            } else if (data.error_details) {
                errorMessage = data.error_details;
            } else if (data.suggestion) {
                errorMessage = `${data.message || 'Erreur'}. ${data.suggestion}`;
            }
            
            // Gestion spéciale pour les différents cas d'erreur
            switch (data.code) {
                case 'MISSING_REGION_ID':
                    errorMessage = "❌ Veuillez sélectionner une région pour le responsable de structure.";
                    break;
                case 'MISSING_DIRECTION_ID':
                    errorMessage = "❌ Veuillez sélectionner une direction pour le responsable de département.";
                    break;
                case 'NO_CHEF_AVAILABLE':
                    errorMessage = "❌ Impossible de créer un agent : Aucun chef n'est disponible. Veuillez d'abord assigner un chef.";
                    break;
                case 'FORBIDDEN':
                    errorMessage = "⛔ Vous n'avez pas les droits pour assigner des rôles.";
                    break;
                case 'INVALID_ROLE':
                    errorMessage = `❌ Rôle invalide. Rôles disponibles: ${data.valid_roles?.join(', ') || ''}`;
                    break;
                case 'USER_NOT_FOUND':
                    errorMessage = `❌ Utilisateur non trouvé.`;
                    break;
                case 'MISSING_FIELDS':
                    errorMessage = `❌ Champs manquants: ${data.missing_fields?.join(', ') || ''}`;
                    break;
                default:
                    break;
            }
        }
        
        alert(errorMessage);
    } finally {
        setUpdatingRoles(prev => ({ ...prev, [userId]: false }));
    }
};

    const openModifyModal = (user) => {
        setUserToModify(user);
        setShowModifyModal(true);
    };

    const closeModifyModal = () => {
        setShowModifyModal(false);
        setUserToModify(null);
    };

    const handleModifySuccess = () => {
        closeModifyModal();
        handleSuccess('Utilisateur modifié avec succès');
    };

    const filteredUsers = users.filter(user => {
        const search = searchTerm.toLowerCase();
        const matchesSearch = 
            (user.nom || '').toLowerCase().includes(search) ||
            (user.prenom || '').toLowerCase().includes(search) ||
            (user.email || '').toLowerCase().includes(search) ||
            (user.matricule || '').toLowerCase().includes(search);
        
        const matchesRole = selectedRole ? user.role === selectedRole : true;
        return matchesSearch && matchesRole;
    });

    // Compter les utilisateurs par rôle
    const getRoleCount = (roleValue) => {
        return users.filter(user => user.role === roleValue).length;
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
                            <h1 className="text-2xl font-bold text-gray-800">Gestion des Utilisateurs</h1>
                            <p className="text-gray-500 mt-1">
                                Gérez les utilisateurs, leurs rôles et informations personnelles
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
                </div>
            </motion.div>

            {/* Contenu principal */}
            <div className="p-8">
                <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 p-6">
                    {/* Bouton Ajouter */}
                    <div className="flex justify-end mb-6">
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="px-5 py-2.5 bg-[#FF8500] text-white rounded-[20px] text-sm font-medium hover:bg-[#e67800] transition-all duration-200 flex items-center gap-2"
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M8 3v10M3 8h10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                            Ajouter Utilisateur
                        </button>
                    </div>

                    {/* Filtres et recherche */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <select
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            className="h-[43px] px-4 rounded-[20px] border-2 border-[#D9E1E7] outline-none focus:border-[#FF8500] bg-white"
                        >
                            <option value=""> Tous les rôles ({users.length})</option>
                            {roles.map(role => (
                                <option key={role.value} value={role.value}>
                                    {role.label} ({getRoleCount(role.value)})
                                </option>
                            ))}
                        </select>

                        <div className="h-[43px] rounded-[20px] border-2 border-[#D9E1E7] hover:border-[#FF8500] focus-within:border-[#FF8500] transition-colors duration-200">
                            <div className="w-full h-full flex items-center px-4">
                                <SearchIcon className="text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Rechercher par nom, email, matricule..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full h-full border-0 outline-none px-4 text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Statistiques rapides */}
                    <div className="mb-4 flex flex-wrap gap-2 text-xs text-gray-500">
                        <span className="px-2 py-1 bg-gray-100 rounded-full">Total: {filteredUsers.length} utilisateur(s)</span>
                        {selectedRole && (
                            <span className="px-2 py-1 bg-[#FF8500]/10 rounded-full text-[#FF8500]">
                                Filtre: {roles.find(r => r.value === selectedRole)?.label}
                            </span>
                        )}
                    </div>

                    {/* Tableau */}
                    <div className="rounded-lg border border-gray-100 overflow-x-auto">
                        <table className="w-full min-w-[900px]">
                            <thead>
                                <tr className="bg-gradient-to-r from-[#F9F9F9] to-[#F0F0F0] border-b border-[#E4E4E4]">
                                    <th className="py-3 px-3 text-left text-xs font-semibold text-[#4A4A4A]">Matricule</th>
                                    <th className="py-3 px-3 text-left text-xs font-semibold text-[#4A4A4A]">Nom complet</th>
                                    <th className="py-3 px-3 text-left text-xs font-semibold text-[#4A4A4A]">Email</th>
                                    <th className="py-3 px-3 text-left text-xs font-semibold text-[#4A4A4A]">Rôle</th>
                                    <th className="py-3 px-3 text-left text-xs font-semibold text-[#4A4A4A]">Téléphone</th>
                                    <th className="py-3 px-3 text-left text-xs font-semibold text-[#4A4A4A]">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className="py-8 text-center">
                                            <div className="flex justify-center">
                                                <div className="w-8 h-8 border-4 border-[#FF8500] border-t-transparent rounded-full animate-spin"></div>
                                            </div>
                                            <p className="text-xs text-gray-400 mt-2">Chargement des utilisateurs...</p>
                                          </td>
                                    </tr>
                                ) : (
                                    <AnimatePresence>
                                        {filteredUsers.map((user, index) => (
                                            <motion.tr 
                                                key={user.id}
                                                custom={index}
                                                variants={tableRowVariants}
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                                className="border-b border-gray-100 hover:bg-[#FFF9F0] transition-colors duration-150"
                                            >
                                                <td className="py-3 px-3">
                                                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-mono">
                                                        {user.matricule || '-'}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-3">
                                                    <div className="flex items-center gap-2">
                                                        {user.photo_profil ? (
                                                            <img src={user.photo_profil} alt="" className="w-7 h-7 rounded-full object-cover" />
                                                        ) : (
                                                            <div className="w-7 h-7 rounded-full bg-[#FF8500]/10 flex items-center justify-center text-[#FF8500] text-xs font-medium">
                                                                {user.prenom?.[0]}{user.nom?.[0]}
                                                            </div>
                                                        )}
                                                        <span className="text-sm font-medium text-gray-800">{user.prenom} {user.nom}</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-3">
                                                    <div className="text-sm text-gray-600 truncate max-w-[200px]" title={user.email}>
                                                        {user.email}
                                                    </div>
                                                </td>
                                                <td className="py-3 px-3">
                                                    <RoleSelector 
                                                        user={user} 
                                                        roles={roles} 
                                                        onUpdate={updateRoleFast}
                                                        isLoading={updatingRoles[user.id]}
                                                    />
                                                </td>
                                                <td className="py-3 px-3 text-sm text-gray-500">
                                                    {user.telephone || '-'}
                                                </td>
                                                <td className="py-3 px-3">
                                                    <div className="flex items-center gap-1">
                                                        <motion.button 
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => openModifyModal(user)} 
                                                            className="p-1.5 hover:bg-[#FF8500]/10 rounded-full transition-all duration-200"
                                                            title="Modifier"
                                                        >
                                                            <EditIcon className="w-3.5 h-3.5 text-gray-500 hover:text-[#FF8500]" />
                                                        </motion.button>
                                                        <motion.button 
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => { setSelectedUser(user); setShowDeleteConfirm(true); }} 
                                                            className="p-1.5 hover:bg-red-50 rounded-full transition-all duration-200"
                                                            title="Supprimer"
                                                        >
                                                            <DeleteIcon className="w-3.5 h-3.5 text-gray-500 hover:text-red-500" />
                                                        </motion.button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                )}
                            </tbody>
                        </table>

                        {filteredUsers.length === 0 && !loading && (
                            <div className="text-center py-12 px-4">
                                <svg className="w-16 h-16 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                <p className="text-gray-500">Aucun utilisateur trouvé</p>
                                <p className="text-xs text-gray-400 mt-1">Essayez de modifier vos critères de recherche</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modals - inchangés */}
            {showDeleteConfirm && selectedUser && (
                <DeleteUtilisateur
                    onCancel={() => setShowDeleteConfirm(false)}
                    user={selectedUser}
                    onSuccess={() => {
                        setShowDeleteConfirm(false);
                        setSelectedUser(null);
                        handleSuccess('Utilisateur supprimé');
                    }}
                    axiosInstance={axiosInstance}
                />
            )}

            {showModifyModal && userToModify && (
                <ModifierUtilisateur
                    onCancel={closeModifyModal}
                    user={userToModify}
                    onSuccess={handleModifySuccess}
                    axiosInstance={axiosInstance}
                />
            )}

            <AjouterUtilisateurModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onSuccess={handleSuccess}
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

export default UsersListe;

