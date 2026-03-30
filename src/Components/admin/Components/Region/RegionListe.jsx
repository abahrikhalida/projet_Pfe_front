import React, { useState, useEffect } from 'react';
import AjouterRegion from './AjouterRegion';
import { ReactComponent as EditIcon } from '../../../../Assets/Icons/edit.svg';
import { ReactComponent as DeleteIcon } from '../../../../Assets/Icons/Delete.svg';
import { ReactComponent as SearchIcon } from '../../../../Assets/Icons/Search.svg';
import { axiosInstance } from '../../../../axios';

const RegionListe = () => {
    const [regions, setRegions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showAjouter, setShowAjouter] = useState(false);
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
        }
    };

    const handleSuccess = (message) => {
        setShowAjouter(false);
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
                <button
                    onClick={() => setShowAjouter(true)}
                    className="px-5 py-2.5 bg-[#FF8500] text-white rounded-[20px] text-sm font-medium hover:bg-[#e67800] transition-all duration-200 flex items-center gap-2"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 3v10M3 8h10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    Ajouter Région
                </button>
            </div>

            {/* Barre de recherche */}
            <div className="mb-6">
                <div className="w-full h-[43px] rounded-[20px] border-2 border-[#D9E1E7] flex items-center px-4">
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

            {/* TABLEAU AVEC DIV AU LIEU DE COLGROUP */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-[#F9F9F9] border border-[#E4E4E4]">
                            <th className="py-3 px-4 text-left text-sm font-medium text-[#727272]">Code</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-[#727272]">Nom</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-[#727272]">Description</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-[#727272]">Créé le</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-[#727272]">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="text-center py-8">
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
                            filteredRegions.map((region) => (
                                <tr key={region._id || region.code_region} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-3 px-4 text-sm whitespace-nowrap">{region.code_region}</td>
                                    <td className="py-3 px-4 text-sm font-medium whitespace-nowrap">{region.nom_region}</td>
                                    <td className="py-3 px-4 text-sm text-gray-600">{region.description || '-'}</td>
                                    <td className="py-3 px-4 text-sm text-gray-600 whitespace-nowrap">{formatDate(region.created_at)}</td>
                                    <td className="py-3 px-4 whitespace-nowrap">
                                        <div className="flex gap-2">
                                            <button className="p-1 hover:bg-gray-100 rounded-full">
                                                <EditIcon className="w-4 h-4" />
                                            </button>
                                            <button 
                                                onClick={() => {
                                                    setSelectedRegion(region);
                                                    setShowDeleteConfirm(true);
                                                }}
                                                className="p-1 hover:bg-gray-100 rounded-full"
                                            >
                                                <DeleteIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Ajoutez ce CSS pour forcer l'alignement */}
            <style jsx>{`
                table {
                    min-width: 100%;
                }
                th, td {
                    text-align: left;
                    vertical-align: middle;
                }
                th:first-child, td:first-child {
                    width: 120px;
                }
                th:nth-child(2), td:nth-child(2) {
                    width: 180px;
                }
                th:nth-child(3), td:nth-child(3) {
                    width: auto;
                }
                th:nth-child(4), td:nth-child(4) {
                    width: 120px;
                }
                th:last-child, td:last-child {
                    width: 100px;
                }
            `}</style>

            {/* Modals */}
            {showAjouter && (
                <AjouterRegion
                    onCancel={() => setShowAjouter(false)}
                    onSuccess={(msg) => handleSuccess(msg)}
                    axiosInstance={axiosInstance}
                />
            )}

            {showDeleteConfirm && selectedRegion && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
                        <h3 className="text-xl font-semibold mb-4">Confirmer la suppression</h3>
                        <p className="mb-6">Supprimer la région {selectedRegion.nom_region} ?</p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showSuccess && (
                <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-green-500 text-white py-3 px-6 rounded-lg shadow-lg">
                    {successMessage}
                </div>
            )}
        </div>
    );
};

export default RegionListe;