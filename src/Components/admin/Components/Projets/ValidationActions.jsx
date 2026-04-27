// Components/Projets/ValidationActions.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { axiosInstance } from '../../../../axios';
import { useDataFilter } from '../../Components/comon/DataFilter';

const ValidationActions = ({ projet, onActionSuccess }) => {
    const [showModal, setShowModal] = useState(false);
    const [action, setAction] = useState('');
    const [commentaire, setCommentaire] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const { getUserInfo } = useDataFilter();
    const userInfo = getUserInfo();
    
    // Déterminer les actions disponibles selon le rôle et le statut
    const getAvailableActions = () => {
        const role = userInfo.role;
        const statut = projet.statut;
        
        switch (role) {
            case 'responsable_structure':
                if (statut === 'brouillon') {
                    return [{ action: 'soumettre', label: 'Soumettre', color: 'blue', requiresComment: false, endpoint: `/recap/budget/soumettre/${projet.id}/` }];
                }
                break;
                
         case 'directeur_region':
    // Le DR peut voir et agir sur les projets soumis et ceux réservés
    if (statut === 'soumis' ) {
        return [
            { action: 'valider', label: 'Valider', color: 'green', requiresComment: false, 
              endpoint: `/recap/budget/valider/directeur-region/${projet.id}/` },
            { action: 'rejeter', label: 'Rejeter', color: 'red', requiresComment: true, 
              endpoint: `/recap/budget/valider/directeur-region/${projet.id}/` }
        ];
    }
    break;
                
        case 'agent':
    if (statut === 'valide_directeur_region') {
        return [
            { 
                action: 'valider', 
                label: 'Valider', 
                color: 'green', 
                requiresComment: false, 
                endpoint: `/recap/budget/valider/agent/${projet.id}/` 
            },
            { 
                action: 'reserver', 
                label: 'Réserver', 
                color: 'orange', 
                requiresComment: true, 
                endpoint: `/recap/budget/valider/agent/${projet.id}/` 
            }
        ];
    }
    break;
                
          case 'chef':
    if (statut === 'valide_agent' || statut === 'reserve_agent') {
        return [
            { 
                action: 'valider', 
                label: 'Valider', 
                color: 'green', 
                requiresComment: false, 
                endpoint: `/recap/budget/valider/chef/${projet.id}/` 
            },
            { 
                action: 'reserver', 
                label: 'Réserver', 
                color: 'orange', 
                requiresComment: true, 
                endpoint: `/recap/budget/valider/chef/${projet.id}/` 
            }
        ];
    }
    break;
                
           case 'directeur':
    if (statut === 'valide_chef' || statut === 'reserve_chef') {
        return [
            { 
                action: 'valider', 
                label: 'Valider', 
                color: 'green', 
                requiresComment: false, 
                endpoint: `/recap/budget/valider/directeur/${projet.id}/` 
            },
            { 
                action: 'reserver', 
                label: 'Réserver', 
                color: 'orange', 
                requiresComment: true, 
                endpoint: `/recap/budget/valider/directeur/${projet.id}/` 
            }
        ];
    }
    break;
                
          case 'divisionnaire':
    if (statut === 'valide_directeur') {
        return [
            { 
                action: 'valider', 
                label: 'Valider', 
                color: 'green', 
                requiresComment: false, 
                endpoint: `/recap/budget/valider/divisionnaire/${projet.id}/` 
            },
            { 
                action: 'rejeter', 
                label: 'Rejeter', 
                color: 'red', 
                requiresComment: true, 
                endpoint: `/recap/budget/valider/divisionnaire/${projet.id}/` 
            }
        ];
    }
    break;
                
            default:
                return [];
        }
        return [];
    };
    
    const handleAction = async () => {
        setLoading(true);
        setError('');
        
        const selectedAction = getAvailableActions().find(a => a.action === action);
        
        try {
            const payload = { action };
            if (commentaire) payload.commentaire = commentaire;
            
            const response = await axiosInstance.post(selectedAction.endpoint, payload);
            
            if (response.data.success) {
                setShowModal(false);
                setCommentaire('');
                if (onActionSuccess) {
                    onActionSuccess(response.data.message);
                }
            } else {
                setError(response.data.error || 'Erreur lors de l\'action');
            }
        } catch (err) {
            setError(err.response?.data?.error || err.response?.data?.message || 'Erreur de connexion');
        } finally {
            setLoading(false);
        }
    };
    
    const availableActions = getAvailableActions();
    
    if (availableActions.length === 0) return null;
    
    // Styles des couleurs
    const getButtonStyle = (color) => {
        switch(color) {
            case 'green': return 'bg-green-100 text-green-700 hover:bg-green-200';
            case 'blue': return 'bg-blue-100 text-blue-700 hover:bg-blue-200';
            case 'red': return 'bg-red-100 text-red-700 hover:bg-red-200';
            case 'orange': return 'bg-orange-100 text-orange-700 hover:bg-orange-200';
            default: return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
        }
    };
    
    const getModalTitle = () => {
        switch(action) {
            case 'valider': return '✅ Valider le projet';
            case 'soumettre': return '📤 Soumettre le projet';
            case 'reserver': return '📝 Réserver le projet';
            case 'rejeter': return '❌ Rejeter le projet';
            default: return 'Confirmation';
        }
    };
    
    const getModalButtonStyle = () => {
        switch(action) {
            case 'valider': return 'bg-green-500 hover:bg-green-600';
            case 'soumettre': return 'bg-blue-500 hover:bg-blue-600';
            case 'reserver': return 'bg-orange-500 hover:bg-orange-600';
            case 'rejeter': return 'bg-red-500 hover:bg-red-600';
            default: return 'bg-gray-500 hover:bg-gray-600';
        }
    };
    
    const getPlaceholder = () => {
        if (action === 'rejeter') return "Motif du rejet...";
        if (action === 'reserver') return "Raison de la réservation...";
        return "Commentaire (optionnel)";
    };
    
    return (
        <>
            <div className="flex items-center gap-1">
                {availableActions.map(act => (
                    <motion.button
                        key={act.action}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            setAction(act.action);
                            setShowModal(true);
                        }}
                        className={`px-2 py-1 rounded-full text-xs font-medium transition-all ${getButtonStyle(act.color)}`}
                    >
                        {act.label}
                    </motion.button>
                ))}
            </div>
            
            {/* Modal de confirmation */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-xl p-6 w-96 max-w-[90%] shadow-xl"
                    >
                        <h3 className="text-lg font-bold mb-4">{getModalTitle()}</h3>
                        
                        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                            <p className="text-xs text-gray-500">Projet</p>
                            <p className="text-sm font-medium text-gray-800">{projet.libelle}</p>
                            <p className="text-xs text-gray-400 mt-1">Code: {projet.code_division}</p>
                        </div>
                        
                        {availableActions.find(a => a.action === action)?.requiresComment && (
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Commentaire <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={commentaire}
                                    onChange={(e) => setCommentaire(e.target.value)}
                                    rows="3"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-200"
                                    placeholder={getPlaceholder()}
                                />
                            </div>
                        )}
                        
                        {error && (
                            <div className="mb-4 p-2 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">
                                {error}
                            </div>
                        )}
                        
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleAction}
                                disabled={loading || (availableActions.find(a => a.action === action)?.requiresComment && !commentaire.trim())}
                                className={`px-4 py-2 rounded-lg text-white transition flex items-center gap-2 ${getModalButtonStyle()} disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                {loading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                                {action === 'valider' ? 'Valider' :
                                 action === 'soumettre' ? 'Soumettre' :
                                 action === 'reserver' ? 'Réserver' : 'Rejeter'}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </>
    );
};

export default ValidationActions;