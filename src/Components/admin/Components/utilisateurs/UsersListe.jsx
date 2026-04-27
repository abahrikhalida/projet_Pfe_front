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

            await axiosInstance.put(`/users/${user.id}/update/`, formDataToSend, {
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

// --- COMPOSANT SELECTEUR DE ROLE INLINE ---
const RoleSelector = ({ user, roles, onUpdate }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) setIsOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const currentRole = roles.find(r => r.value === user.role) || { label: 'Sans role', color: '#94a3b8' };

    return (
        <div className="relative" ref={containerRef}>
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-[12px] transition-all min-w-[130px] border"
                style={{ 
                    backgroundColor: `${currentRole.color}08`, 
                    borderColor: `${currentRole.color}20` 
                }}
            >
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: currentRole.color }} />
                <span className="text-[11px] font-bold uppercase tracking-wide" style={{ color: currentRole.color }}>
                    {currentRole.label}
                </span>
                <svg className={`ml-auto w-3 h-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                     fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: currentRole.color }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                </svg>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 4, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        className="absolute left-0 top-full z-[100] min-w-[160px] bg-white rounded-xl shadow-2xl border border-gray-100"
                    >
                        {roles.map((role) => (
                            <button
                                key={role.value}
                                onClick={() => {
                                    if(user.role !== role.value) onUpdate(user.id, role.value);
                                    setIsOpen(false);
                                }}
                                className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-medium transition-all first:rounded-t-xl last:rounded-b-xl ${
                                    user.role === role.value 
                                    ? 'bg-gray-50 text-gray-900 cursor-default' 
                                    : 'hover:bg-orange-50 text-gray-600 hover:text-[#FF8500]'
                                }`}
                            >
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: role.color }} />
                                {role.label}
                                {user.role === role.value && (
                                    <svg className="ml-auto w-3.5 h-3.5 text-[#FF8500]" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </button>
                        ))}
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
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showModifyModal, setShowModifyModal] = useState(false);
    const [userToModify, setUserToModify] = useState(null);

    const roles = [
        { value: 'admin', label: 'Admin', color: '#FF4444' },
        { value: 'chef', label: 'Chef', color: '#FF8500' },
        { value: 'directeur_region', label: 'Dir. Region', color: '#3B82F6' },
        { value: 'responsable_structure', label: 'Resp. Structure', color: '#10B981' },
        { value: 'agent', label: 'Agent', color: '#8B5CF6' },
        { value: 'directeur', label: 'directeur', color: '#8B5C67' },
       { value: 'divisionnaire', label: 'divisionnaire', color: '#5accfa' }


    ];

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/api/users/');
            setUsers(response.data.users || []);
        } catch (err) {
            console.error("Erreur chargement utilisateurs:", err);
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

    const updateRoleFast = async (userId, newRole) => {
        try {
            const response = await axiosInstance.post('/api/assign-role/', {
                user_id: userId,
                role: newRole
            });
            if (response.data.status === 'success') {
                const label = roles.find(r => r.value === newRole)?.label;
                handleSuccess(`Role ${label} attribue`);
            }
        } catch (err) {
            console.error("Erreur assignation role:", err);
            alert(err.response?.data?.message || "Erreur lors de l'assignation");
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
        handleSuccess('Utilisateur modifie avec succes');
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
            {/* En-tête séparé comme Parametres */}
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
                    {/* Bouton Ajouter dans le contenu principal */}
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
                            <option value="">Tous les roles</option>
                            {roles.map(role => (
                                <option key={role.value} value={role.value}>{role.label}</option>
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

                    <div className="mb-4 text-sm text-gray-500">
                        {filteredUsers.length} utilisateur(s) trouvé(s)
                    </div>

                    {/* Tableau */}
                    <div className="rounded-lg border border-gray-100 overflow-x-auto">
                        <table className="w-full min-w-[800px]">
                            <thead>
                                <tr className="bg-gradient-to-r from-[#F9F9F9] to-[#F0F0F0] border-b border-[#E4E4E4]">
                                    <th className="py-3 px-3 text-left text-xs font-semibold text-[#4A4A4A]">Matricule</th>
                                    <th className="py-3 px-3 text-left text-xs font-semibold text-[#4A4A4A]">Nom complet</th>
                                    <th className="py-3 px-3 text-left text-xs font-semibold text-[#4A4A4A]">Email</th>
                                    <th className="py-3 px-3 text-left text-xs font-semibold text-[#4A4A4A]">Role</th>
                                    <th className="py-3 px-3 text-left text-xs font-semibold text-[#4A4A4A]">Telephone</th>
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
                                                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">{user.matricule || '-'}</span>
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
                                                    <RoleSelector user={user} roles={roles} onUpdate={updateRoleFast} />
                                                </td>
                                                <td className="py-3 px-3 text-sm text-gray-500">{user.telephone || '-'}</td>
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

            {/* Modals */}
            {showDeleteConfirm && selectedUser && (
                <DeleteUtilisateur
                    onCancel={() => setShowDeleteConfirm(false)}
                    user={selectedUser}
                    onSuccess={() => {
                        setShowDeleteConfirm(false);
                        setSelectedUser(null);
                        handleSuccess('Utilisateur supprime');
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

export default UsersListe;