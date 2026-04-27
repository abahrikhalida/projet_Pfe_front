import React, { useState, useEffect } from 'react';
import AjouterRegion from './AjouterRegion';
import { ReactComponent as EditIcon } from '../../../../Assets/Icons/edit.svg';
import { ReactComponent as DeleteIcon } from '../../../../Assets/Icons/Delete.svg';
import { ReactComponent as SearchIcon } from '../../../../Assets/Icons/Search.svg';
import { axiosInstance } from '../../../../axios';

const RegionListe = ({ isReadOnly = false }) => {
    const [regions, setRegions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showAjouter, setShowAjouter] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const fetchRegions = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/params/regions');
            setRegions(response.data.data || []);
        } catch (err) {
            console.error("Erreur chargement régions:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRegions();
    }, []);

    const handleDelete = async () => {
        if (!selectedRegion) return;
        try {
            await axiosInstance.delete(`/params/regions/${selectedRegion.code_region}`);
            setShowDeleteConfirm(false);
            setSelectedRegion(null);
            handleSuccess('Région supprimée avec succès');
        } catch (err) {
            console.error("Erreur suppression:", err);
            alert("Erreur lors de la suppression");
        }
    };

    const handleSuccess = (message) => {
        setShowAjouter(false);
        setShowUpdate(false);
        setSuccessMessage(message);
        setShowSuccess(true);
        fetchRegions();
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const filteredRegions = regions.filter(region => {
        const search = searchTerm.toLowerCase();
        return (
            region.nom_region?.toLowerCase().includes(search) ||
            region.code_region?.toLowerCase().includes(search) ||
            region.description?.toLowerCase().includes(search)
        );
    });

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    return (
        <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 p-6 font-kumbh">
            {/* En-tête */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Liste des Régions</h2>
                {!isReadOnly ? (
                    <button
                        onClick={() => setShowAjouter(true)}
                        className="px-5 py-2.5 bg-[#FF8500] text-white rounded-[20px] text-sm font-medium hover:bg-[#e67800] transition-all duration-200 flex items-center gap-2"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M8 3v10M3 8h10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                        Ajouter Région
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
                        placeholder="Rechercher par nom, code..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-full border-0 outline-none px-4 font-kumbh text-sm"
                    />
                </div>
            </div>

            {/* Statistiques */}
            <div className="mb-4 text-sm text-gray-500">
                {filteredRegions.length} région(s)
            </div>

            {/* TABLEAU */}
            <div className="overflow-x-auto rounded-lg border border-gray-100">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gradient-to-r from-[#F9F9F9] to-[#F0F0F0] border-b border-[#E4E4E4]">
                            <th className="py-3 px-4 text-left text-sm font-semibold text-[#4A4A4A] rounded-tl-lg">Code</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-[#4A4A4A]">Nom</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-[#4A4A4A]">Description</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-[#4A4A4A]">Créé le</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-[#4A4A4A] rounded-tr-lg">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="py-8 text-center">
                                    <div className="flex justify-center">
                                        <div className="w-8 h-8 border-4 border-[#FF8500] border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                  </td>
                            </tr>
                        ) : filteredRegions.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-8 text-gray-500">
                                    Aucune région trouvée
                                 </td>
                            </tr>
                        ) : (
                            filteredRegions.map((region, index) => (
                                <tr 
                                    key={region._id || region.code_region} 
                                    className={`border-b border-gray-100 hover:bg-[#FFF9F0] transition-colors duration-150 ${
                                        index % 2 === 0 ? 'bg-white' : 'bg-[#FCFCFC]'
                                    }`}
                                >
                                    <td className="py-3 px-4">
                                        <span className="px-2 py-1 bg-[#FF8500]/10 text-[#FF8500] rounded-full text-xs font-medium">
                                            {region.code_region}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-sm font-medium text-gray-800">{region.nom_region}</td>
                                    <td className="py-3 px-4 text-sm text-gray-600">{region.description || '-'}</td>
                                    <td className="py-3 px-4 text-sm text-gray-500 whitespace-nowrap">{formatDate(region.created_at)}</td>
                                    <td className="py-3 px-4">
                                        <div className="flex gap-2">
                                            {!isReadOnly ? (
                                                <>
                                                    <button 
                                                        onClick={() => {
                                                            setSelectedRegion(region);
                                                            setShowUpdate(true);
                                                        }}
                                                        className="p-1.5 hover:bg-[#FF8500]/10 rounded-full transition-all duration-200 group"
                                                        title="Modifier"
                                                    >
                                                        <EditIcon className="w-4 h-4 text-gray-500 group-hover:text-[#FF8500]" />
                                                    </button>
                                                    <button 
                                                        onClick={() => {
                                                            setSelectedRegion(region);
                                                            setShowDeleteConfirm(true);
                                                        }}
                                                        className="p-1.5 hover:bg-red-50 rounded-full transition-all duration-200 group"
                                                        title="Supprimer"
                                                    >
                                                        <DeleteIcon className="w-4 h-4 text-gray-500 group-hover:text-red-500" />
                                                    </button>
                                                </>
                                            ) : (
                                                // <span className="text-xs text-gray-400 italic">Aucune action</span>
                                                   <div className="mt-3 inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded-full">
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

            {/* Modal Ajouter Region */}
            {!isReadOnly && showAjouter && (
                <AjouterRegion
                    onCancel={() => setShowAjouter(false)}
                    onSuccess={(msg) => handleSuccess(msg)}
                    axiosInstance={axiosInstance}
                />
            )}

            {/* Modal Update Region */}
            {!isReadOnly && showUpdate && selectedRegion && (
                <UpdateRegion
                    region={selectedRegion}
                    onCancel={() => {
                        setShowUpdate(false);
                        setSelectedRegion(null);
                    }}
                    onSuccess={(msg) => handleSuccess(msg)}
                    axiosInstance={axiosInstance}
                />
            )}

            {/* Modal Delete Confirmation */}
            {!isReadOnly && showDeleteConfirm && selectedRegion && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <DeleteIcon className="w-8 h-8 text-red-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Confirmer la suppression</h3>
                            <p className="text-gray-600">
                                Êtes-vous sûr de vouloir supprimer la région <span className="font-semibold text-[#FF8500]">{selectedRegion.nom_region}</span> ?
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
                    {successMessage}
                </div>
            )}
        </div>
    );
};

// Composant UpdateRegion
const UpdateRegion = ({ region, onCancel, onSuccess, axiosInstance }) => {
    const [formData, setFormData] = useState({
        nom_region: '',
        description: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (region) {
            setFormData({
                nom_region: region.nom_region || '',
                description: region.description || ''
            });
        }
    }, [region]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await axiosInstance.put(`/params/regions/${region.code_region}`, {
                nom_region: formData.nom_region,
                description: formData.description
            });
            onSuccess('Région modifiée avec succès');
        } catch (err) {
            console.error("Erreur:", err);
            setError(err.response?.data?.message || "Erreur lors de la modification");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="w-[550px] bg-white shadow-2xl p-6 rounded-[20px]">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <h1 className="text-lg font-semibold text-gray-800">Modifier Région</h1>
                    <button onClick={onCancel} className="p-1 hover:bg-gray-100 rounded-full transition">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18M6 6L18 18" stroke="#4F4F4F" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </button>
                </div>

                {error && (
                    <div className="mt-4 p-2 bg-red-50 text-red-600 text-sm rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Code</label>
                        <input type="text" value={region.code_region} disabled className="w-full h-10 px-3 rounded-[20px] border border-gray-300 bg-gray-100 text-gray-500 outline-none" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom <span className="text-red-500">*</span></label>
                        <input type="text" name="nom_region" value={formData.nom_region} onChange={handleInputChange} required className="w-full h-10 px-3 rounded-[20px] border border-gray-300 focus:border-[#FF8500] outline-none" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" className="w-full px-3 py-2 rounded-[20px] border border-gray-300 focus:border-[#FF8500] outline-none resize-none" />
                    </div>

                    <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
                        <button type="button" onClick={onCancel} className="px-5 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-[25px] hover:bg-gray-300 transition">Annuler</button>
                        <button type="submit" disabled={loading} className="px-5 py-2 bg-[#FF8500] text-white text-sm font-medium rounded-[25px] hover:bg-[#e67800] transition disabled:opacity-50 flex items-center gap-2">
                            {loading && <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>}
                            {loading ? 'Modification...' : 'Modifier'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegionListe;