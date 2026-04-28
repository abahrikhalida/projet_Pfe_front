import React, { useState, useEffect } from 'react';
import AjouterFamille from './AjouterFamille';
import UpdateFamille from './UpdateFamille';
import { ReactComponent as EditIcon } from '../../../../Assets/Icons/edit.svg';
import { ReactComponent as DeleteIcon } from '../../../../Assets/Icons/Delete.svg';
import { ReactComponent as SearchIcon } from '../../../../Assets/Icons/Search.svg';
import { axiosInstance } from '../../../../axios';

const FamilleListe = ({ isReadOnly = false }) => {
    const [familles, setFamilles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showAjouter, setShowAjouter] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [selectedFamille, setSelectedFamille] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const fetchFamilles = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/params/familles');
            setFamilles(response.data.data || []);
        } catch (err) {
            console.error("Erreur chargement familles:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFamilles();
    }, []);

    const handleDelete = async () => {
        if (!selectedFamille) return;
        try {
            await axiosInstance.delete(`/familles/${selectedFamille._id}`);
            setShowDeleteConfirm(false);
            setSelectedFamille(null);
            handleSuccess('Famille supprimée avec succès');
        } catch (err) {
            console.error("Erreur suppression:", err);
            alert(err.response?.data?.message || "Erreur lors de la suppression");
        }
    };

    const handleSuccess = (message) => {
        setShowAjouter(false);
        setShowUpdate(false);
        setSuccessMessage(message);
        setShowSuccess(true);
        fetchFamilles();
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const filteredFamilles = familles.filter(famille => {
        const search = searchTerm.toLowerCase();
        return (
            famille.nom_famille?.toLowerCase().includes(search) ||
            famille.code_famille?.toLowerCase().includes(search)
        );
    });

    return (
        <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 p-6 font-kumbh">
            {/* En-tête */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Liste des Familles</h2>
                {!isReadOnly ? (
                    <button
                        onClick={() => setShowAjouter(true)}
                        className="px-5 py-2.5 bg-[#FF8500] text-white rounded-[20px] text-sm font-medium hover:bg-[#e67800] transition-all duration-200 flex items-center gap-2"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M8 3v10M3 8h10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                        Ajouter Famille
                    </button>
                ) : (
                    <div className="px-3 py-1.5 bg-gray-100 rounded-lg">
                        <span className="text-xs text-gray-500">Lecture seule</span>
                    </div>
                )}
            </div>

            {/* Barre de recherche */}
            <div className="mb-6">
                <div className="w-full h-[43px] rounded-[20px] border-2 border-[#D9E1E7] hover:border-[#FF8500] focus-within:border-[#FF8500] transition-colors duration-200 flex items-center px-4">
                    <SearchIcon className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Rechercher par nom ou code..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-full border-0 outline-none px-4 font-kumbh text-sm"
                    />
                </div>
            </div>

            {/* Statistiques */}
            <div className="mb-4 text-sm text-gray-500">
                {filteredFamilles.length} famille(s)
            </div>

            {/* Tableau */}
            <div className="overflow-x-auto rounded-lg border border-gray-100">
                <table className="w-full min-w-[600px]">
                    <thead>
                        <tr className="bg-gradient-to-r from-[#F9F9F9] to-[#F0F0F0] border-b border-[#E4E4E4]">
                            <th className="py-3 px-6 text-left text-sm font-semibold text-[#4A4A4A] rounded-tl-lg w-[20%]">Code</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold text-[#4A4A4A] w-[55%]">Nom</th>
                            <th className="py-3 px-6 text-center text-sm font-semibold text-[#4A4A4A] rounded-tr-lg w-[25%]">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="3" className="py-8 text-center">
                                    <div className="flex justify-center">
                                        <div className="w-8 h-8 border-4 border-[#FF8500] border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2">Chargement...</p>
                                  
                                </td>
                            </tr>
                        ) : filteredFamilles.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="text-center py-8 text-gray-500">
                                    <svg className="w-16 h-16 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <p>Aucune famille trouvée</p>
                                  
                                </td>
                            </tr>
                        ) : (
                            filteredFamilles.map((famille, index) => (
                                <tr 
                                    key={famille._id} 
                                    className={`border-b border-gray-100 hover:bg-[#FFF9F0] transition-colors duration-150 ${
                                        index % 2 === 0 ? 'bg-white' : 'bg-[#FCFCFC]'
                                    }`}
                                >
                                    <td className="py-3 px-6">
                                        <span className="inline-block px-2 py-1 bg-[#FF8500]/10 text-[#FF8500] rounded-full text-xs font-medium min-w-[70px] text-center">
                                            {famille.code_famille}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6">
                                        <span className="text-sm font-medium text-gray-800">{famille.nom_famille}</span>
                                    </td>
                                    <td className="py-3 px-6">
                                        <div className="flex gap-3 justify-center items-center">
                                            {!isReadOnly ? (
                                                <>
                                                    <button 
                                                        onClick={() => {
                                                            setSelectedFamille(famille);
                                                            setShowUpdate(true);
                                                        }}
                                                        className="p-2 hover:bg-[#FF8500]/10 rounded-full transition-all duration-200 group"
                                                        title="Modifier"
                                                    >
                                                        <EditIcon className="w-4 h-4 text-gray-500 group-hover:text-[#FF8500]" />
                                                    </button>
                                                    <button 
                                                        onClick={() => {
                                                            setSelectedFamille(famille);
                                                            setShowDeleteConfirm(true);
                                                        }}
                                                        className="p-2 hover:bg-red-50 rounded-full transition-all duration-200 group"
                                                        title="Supprimer"
                                                    >
                                                        <DeleteIcon className="w-4 h-4 text-gray-500 group-hover:text-red-500" />
                                                    </button>
                                                </>
                                            ) : (
                                                <div className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 rounded-full">
                                                    <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                    <span className="text-xs text-gray-500">Lecture seule</span>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal Ajouter */}
            {!isReadOnly && showAjouter && (
                <AjouterFamille
                    onCancel={() => setShowAjouter(false)}
                    onSuccess={(msg) => handleSuccess(msg)}
                    axiosInstance={axiosInstance}
                />
            )}

            {/* Modal Modifier */}
            {!isReadOnly && showUpdate && selectedFamille && (
                <UpdateFamille
                    famille={selectedFamille}
                    onCancel={() => {
                        setShowUpdate(false);
                        setSelectedFamille(null);
                    }}
                    onSuccess={(msg) => handleSuccess(msg)}
                    axiosInstance={axiosInstance}
                />
            )}

            {/* Modal Confirmation Suppression */}
            {!isReadOnly && showDeleteConfirm && selectedFamille && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <DeleteIcon className="w-8 h-8 text-red-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Confirmer la suppression</h3>
                            <p className="text-gray-600">
                                Êtes-vous sûr de vouloir supprimer la famille <span className="font-semibold text-[#FF8500]">{selectedFamille.nom_famille}</span> ?
                            </p>
                            <p className="text-xs text-red-500 mt-2">
                                Attention : Cette action est irréversible.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleDelete}
                                className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors"
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Message de succès */}
            {showSuccess && (
                <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-green-500 text-white py-3 px-6 rounded-lg shadow-lg z-50 animate-fadeIn">
                    ✅ {successMessage}
                </div>
            )}
        </div>
    );
};

export default FamilleListe;