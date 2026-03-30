import {React, useState, useEffect } from 'react';
import AjouterPerimetre from './AjouterPerimetre';
import { ReactComponent as EditIcon } from '../../../../Assets/Icons/edit.svg';
import { ReactComponent as DeleteIcon } from '../../../../Assets/Icons/Delete.svg';
import { ReactComponent as SearchIcon } from '../../../../Assets/Icons/Search.svg';
import { axiosInstance} from '../../../../axios';

const PerimetreListe = () => {
    const [perimetres, setPerimetres] = useState([]);
    const [regions, setRegions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showAjouter, setShowAjouter] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [selectedPerimetre, setSelectedPerimetre] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    // Charger les périmètres
    const fetchPerimetres = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/params/perimetres');
            setPerimetres(response.data.data || []);
        } catch (err) {
            console.error("Erreur chargement périmètres:", err);
        } finally {
            setLoading(false);
        }
    };

    // Charger les régions pour le filtre
    const fetchRegions = async () => {
        try {
            const response = await axiosInstance.get('/params/regions');
            setRegions(response.data.data || []);
        } catch (err) {
            console.error("Erreur chargement régions:", err);
        }
    };

    useEffect(() => {
        fetchPerimetres();
        fetchRegions();
    }, []);

    // Supprimer un périmètre
    const handleDelete = async () => {
        if (!selectedPerimetre) return;
        
        try {
            await axiosInstance.delete(`/params/perimetres/${selectedPerimetre.code_perimetre}`);
            setShowDeleteConfirm(false);
            setSelectedPerimetre(null);
            handleSuccess('Périmètre supprimé avec succès');
        } catch (err) {
            console.error("Erreur suppression:", err);
        }
    };

    const handleSuccess = (message) => {
        setShowAjouter(false);
        setSuccessMessage(message);
        setShowSuccess(true);
        fetchPerimetres();
        setTimeout(() => setShowSuccess(false), 3000);
    };

    // Filtrage
    const filteredPerimetres = perimetres.filter(perimetre => {
        const search = searchTerm.toLowerCase();
        const matchesSearch = 
            perimetre.nom_perimetre?.toLowerCase().includes(search) ||
            perimetre.code_perimetre?.toLowerCase().includes(search);
        
        const matchesRegion = selectedRegion ? perimetre.region === selectedRegion : true;
        
        return matchesSearch && matchesRegion;
    });

    // Fonction pour obtenir le nom de la région
    const getRegionName = (regionCode) => {
        const region = regions.find(r => r.code_region === regionCode);
        return region ? region.nom_region : regionCode;
    };

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
                <h2 className="text-xl font-semibold text-gray-800">Liste des Périmètres</h2>
                <button
                    onClick={() => setShowAjouter(true)}
                    className="px-5 py-2.5 bg-[#FF8500] text-white rounded-[20px] text-sm font-medium hover:bg-[#e67800] transition-all duration-200 flex items-center gap-2"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 3v10M3 8h10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    Ajouter Périmètre
                </button>
            </div>

            {/* Filtres et recherche */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                {/* Filtre par région */}
                <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="h-[43px] px-4 rounded-[20px] border-2 border-[#D9E1E7] outline-none focus:border-[#FF8500] bg-white md:min-w-[200px] w-full md:w-auto"
                >
                    <option value="">Toutes les régions</option>
                    {regions.map(region => (
                        <option key={region.code_region} value={region.code_region}>
                            {region.nom_region} ({region.code_region})
                        </option>
                    ))}
                </select>

                {/* Barre de recherche */}
                <div className="flex-1 h-[43px] rounded-[20px] border-2 border-[#D9E1E7] hover:border-[#FF8500] focus-within:border-[#FF8500] transition-colors duration-200">
                    <div className="w-full h-full flex items-center px-4">
                        <SearchIcon className="text-gray-400" />
                        <input
                            type="text"
                            placeholder="Rechercher par nom, code..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full h-full border-0 outline-none px-4 font-kumbh text-sm placeholder:text-[#8A8A8A]"
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Statistiques */}
            <div className="mb-4 text-sm text-gray-500">
                {filteredPerimetres.length} 
                {selectedRegion && ` dans la région sélectionnée`}
            </div>

            {/* Tableau avec largeurs ajustées */}
            <div className="overflow-x-auto rounded-lg border border-gray-100">
                <table className="w-full table-fixed">
                    <thead>
                        <tr className="bg-gradient-to-r from-[#F9F9F9] to-[#F0F0F0] border-b border-[#E4E4E4]">
                            <th className="w-[15%] py-4 px-4 text-left text-sm font-semibold text-[#4A4A4A] rounded-tl-lg">Code</th>
                            <th className="w-[25%] py-4 px-4 text-left text-sm font-semibold text-[#4A4A4A]">Nom</th>
                            <th className="w-[25%] py-4 px-4 text-left text-sm font-semibold text-[#4A4A4A]">Région</th>
                            <th className="w-[20%] py-4 px-4 text-left text-sm font-semibold text-[#4A4A4A]">Créé le</th>
                            <th className="w-[15%] py-4 px-4 text-left text-sm font-semibold text-[#4A4A4A] rounded-tr-lg">Actions</th>
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
                        ) : (
                            filteredPerimetres.map((perimetre, index) => (
                                <tr 
                                    key={perimetre._id || perimetre.code_perimetre} 
                                    className={`border-b border-gray-100 hover:bg-[#FFF9F0] transition-colors duration-150 ${
                                        index % 2 === 0 ? 'bg-white' : 'bg-[#FCFCFC]'
                                    }`}
                                >
                                    <td className="py-4 px-4 align-middle">
                                        <div className="flex items-center h-full min-h-[48px]">
                                            <span className="px-2 py-1 bg-[#FF8500]/10 text-[#FF8500] rounded-full text-xs font-medium">
                                                {perimetre.code_perimetre}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 align-middle">
                                        <div className="flex items-center h-full min-h-[48px] text-sm font-medium text-gray-800">
                                            {perimetre.nom_perimetre}
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 align-middle">
                                        <div className="flex items-center h-full min-h-[48px]">
                                            <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                                                {getRegionName(perimetre.region)}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 align-middle">
                                        <div className="flex items-center h-full min-h-[48px] text-sm text-gray-500">
                                            {formatDate(perimetre.created_at)}
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 align-middle">
                                        <div className="flex items-center h-full min-h-[48px] gap-2">
                                            <button 
                                                className="p-2 hover:bg-[#FF8500]/10 rounded-full transition-all duration-200 group"
                                                title="Modifier"
                                            >
                                                <EditIcon className="w-4 h-4 text-gray-500 group-hover:text-[#FF8500]" />
                                            </button>
                                            <button 
                                                onClick={() => {
                                                    setSelectedPerimetre(perimetre);
                                                    setShowDeleteConfirm(true);
                                                }}
                                                className="p-2 hover:bg-red-50 rounded-full transition-all duration-200 group"
                                                title="Supprimer"
                                            >
                                                <DeleteIcon className="w-4 h-4 text-gray-500 group-hover:text-red-500" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                {filteredPerimetres.length === 0 && !loading && (
                    <div className="text-center py-12 px-4">
                        <div className="mb-3">
                            <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 20l-5.447-2.724A2 2 0 013 15.382V6.618a2 2 0 011.553-1.894l6-2a2 2 0 011.894 0l6 2A2 2 0 0119 6.618v8.764a2 2 0 01-1.447 1.894L15 18.5M9 20l4.447-2.236M9 20v-6m0 0L4.447 15.764M9 14l4.447-2.236M15 14v6m0 0l4.236-2.118M15 14l-4.236-2.118M9 10V6m0 0l4.236-2.118M9 6l4.236 2.118M15 10v4" />
                            </svg>
                        </div>
                        <p className="text-gray-500 text-lg">Aucun périmètre trouvé</p>
                        <p className="text-gray-400 text-sm mt-1">
                            {selectedRegion 
                                ? "Aucun périmètre dans cette région" 
                                : "Cliquez sur 'Ajouter Périmètre' pour créer votre premier périmètre"}
                        </p>
                    </div>
                )}
            </div>

            {/* Modal Ajouter */}
            {showAjouter && (
                <AjouterPerimetre
                    onCancel={() => setShowAjouter(false)}
                    onSuccess={handleSuccess}
                    regions={regions}
                    axiosInstance={axiosInstance}
                />
            )}

            {/* Modal Confirmation Suppression */}
            {showDeleteConfirm && selectedPerimetre && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 animate-fadeIn">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <DeleteIcon className="w-8 h-8 text-red-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Confirmer la suppression</h3>
                            <p className="text-gray-600">
                                Êtes-vous sûr de vouloir supprimer le périmètre <span className="font-semibold">{selectedPerimetre.nom_perimetre}</span> ?
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

            {/* Message succès */}
            {showSuccess && (
                <div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-auto min-w-[300px] bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-xl shadow-xl z-50 animate-slideUp">
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <span className="font-medium">{successMessage}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PerimetreListe;