// Components/admin/Components/parametres/DepartementListe.jsx
import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../../../axios';
import { ReactComponent as EditIcon } from '../../../../Assets/Icons/edit.svg';
import { ReactComponent as DeleteIcon } from '../../../../Assets/Icons/Delete.svg';
import { ReactComponent as SearchIcon } from '../../../../Assets/Icons/Search.svg';

// Composant AjouterDepartement
const AjouterDepartement = ({ onCancel, onSuccess, axiosInstance, directions }) => {
    const [formData, setFormData] = useState({
        code_departement: '',
        nom_departement: '',
        direction: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!formData.direction) {
            setError('Veuillez sélectionner une direction');
            setLoading(false);
            return;
        }

        try {
            await axiosInstance.post('/params/departements', {
                code_departement: formData.code_departement,
                nom_departement: formData.nom_departement,
                direction: formData.direction
            });
            onSuccess('Département créé avec succès');
        } catch (err) {
            console.error("Erreur:", err);
            setError(err.response?.data?.message || "Erreur lors de la création");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="w-[550px] bg-white shadow-2xl p-6 rounded-[20px]">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <h1 className="text-lg font-semibold text-gray-800">Ajouter Département</h1>
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">Code <span className="text-red-500">*</span></label>
                        <input 
                            type="text" 
                            name="code_departement"
                            value={formData.code_departement} 
                            onChange={handleInputChange} 
                            required 
                            className="w-full h-10 px-3 rounded-[20px] border border-gray-300 focus:border-[#FF8500] outline-none transition-colors"
                            placeholder="Ex: DEP001"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom <span className="text-red-500">*</span></label>
                        <input 
                            type="text" 
                            name="nom_departement"
                            value={formData.nom_departement} 
                            onChange={handleInputChange} 
                            required 
                            className="w-full h-10 px-3 rounded-[20px] border border-gray-300 focus:border-[#FF8500] outline-none transition-colors"
                            placeholder="Ex: Département Informatique"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Direction <span className="text-red-500">*</span></label>
                        <select 
                            name="direction"
                            value={formData.direction} 
                            onChange={handleInputChange} 
                            required 
                            className="w-full h-10 px-3 rounded-[20px] border border-gray-300 focus:border-[#FF8500] outline-none transition-colors bg-white"
                        >
                            <option value="">Sélectionner une direction</option>
                            {directions.map(dir => (
                                <option key={dir.code_direction} value={dir.code_direction}>
                                    {dir.code_direction} - {dir.nom_direction}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
                        <button type="button" onClick={onCancel} className="px-5 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-[25px] hover:bg-gray-300 transition">
                            Annuler
                        </button>
                        <button type="submit" disabled={loading} className="px-5 py-2 bg-[#FF8500] text-white text-sm font-medium rounded-[25px] hover:bg-[#e67800] transition disabled:opacity-50 flex items-center gap-2">
                            {loading && <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>}
                            {loading ? 'Création...' : 'Créer'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Composant UpdateDepartement
const UpdateDepartement = ({ departement, onCancel, onSuccess, axiosInstance, directions }) => {
    const [formData, setFormData] = useState({
        nom_departement: '',
        direction: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (departement) {
            setFormData({
                nom_departement: departement.nom_departement || '',
                direction: departement.direction || ''
            });
        }
    }, [departement]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!formData.direction) {
            setError('Veuillez sélectionner une direction');
            setLoading(false);
            return;
        }

        try {
            await axiosInstance.put(`/params/departements/${departement.code_departement}`, {
                nom_departement: formData.nom_departement,
                direction: formData.direction
            });
            onSuccess('Département modifié avec succès');
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
                    <h1 className="text-lg font-semibold text-gray-800">Modifier Département</h1>
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
                        <input 
                            type="text" 
                            value={departement.code_departement} 
                            disabled 
                            className="w-full h-10 px-3 rounded-[20px] border border-gray-300 bg-gray-100 text-gray-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom <span className="text-red-500">*</span></label>
                        <input 
                            type="text" 
                            name="nom_departement"
                            value={formData.nom_departement} 
                            onChange={handleInputChange} 
                            required 
                            className="w-full h-10 px-3 rounded-[20px] border border-gray-300 focus:border-[#FF8500] outline-none transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Direction <span className="text-red-500">*</span></label>
                        <select 
                            name="direction"
                            value={formData.direction} 
                            onChange={handleInputChange} 
                            required 
                            className="w-full h-10 px-3 rounded-[20px] border border-gray-300 focus:border-[#FF8500] outline-none transition-colors bg-white"
                        >
                            <option value="">Sélectionner une direction</option>
                            {directions.map(dir => (
                                <option key={dir.code_direction} value={dir.code_direction}>
                                    {dir.code_direction} - {dir.nom_direction}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
                        <button type="button" onClick={onCancel} className="px-5 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-[25px] hover:bg-gray-300 transition">
                            Annuler
                        </button>
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

// Composant principal DepartementListe
const DepartementListe = ({ isReadOnly = false }) => {
    const [departements, setDepartements] = useState([]);
    const [directions, setDirections] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showAjouter, setShowAjouter] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [selectedDepartement, setSelectedDepartement] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const fetchDepartements = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/params/departements');
            setDepartements(response.data.data || []);
        } catch (err) {
            console.error("Erreur chargement départements:", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchDirections = async () => {
        try {
            const response = await axiosInstance.get('/params/directions');
            setDirections(response.data.data || []);
        } catch (err) {
            console.error("Erreur fetch directions:", err);
        }
    };

    useEffect(() => {
        fetchDepartements();
        fetchDirections();
    }, []);

    const handleDelete = async () => {
        if (!selectedDepartement) return;
        try {
            await axiosInstance.delete(`/params/departements/${selectedDepartement.code_departement}`);
            setShowDeleteConfirm(false);
            setSelectedDepartement(null);
            handleSuccess('Département supprimé avec succès');
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
        fetchDepartements();
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const getDirectionNom = (directionCode) => {
        const dir = directions.find(d => d.code_direction === directionCode);
        return dir?.nom_direction || directionCode;
    };

    const filteredDepartements = departements.filter(departement => {
        const search = searchTerm.toLowerCase();
        return (
            departement.nom_departement?.toLowerCase().includes(search) ||
            departement.code_departement?.toLowerCase().includes(search) ||
            getDirectionNom(departement.direction)?.toLowerCase().includes(search)
        );
    });

    return (
        <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 p-6 font-kumbh">
            {/* En-tête */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Liste des Départements</h2>
                {!isReadOnly ? (
                    <button
                        onClick={() => setShowAjouter(true)}
                        className="px-5 py-2.5 bg-[#FF8500] text-white rounded-[20px] text-sm font-medium hover:bg-[#e67800] transition-all duration-200 flex items-center gap-2"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M8 3v10M3 8h10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                        Ajouter Département
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
                        placeholder="Rechercher par nom, code, direction..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-full border-0 outline-none px-4 font-kumbh text-sm"
                    />
                </div>
            </div>

            {/* Statistiques */}
            <div className="mb-4 text-sm text-gray-500">
                {filteredDepartements.length} département(s)
            </div>

            {/* TABLEAU avec espacement équilibré */}
            <div className="overflow-x-auto rounded-lg border border-gray-100">
                <table className="w-full min-w-[800px]">
                    <thead>
                        <tr className="bg-gradient-to-r from-[#F9F9F9] to-[#F0F0F0] border-b border-[#E4E4E4]">
                            <th className="py-3 px-6 text-left text-sm font-semibold text-[#4A4A4A] rounded-tl-lg w-[20%]">Code</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold text-[#4A4A4A] w-[35%]">Nom</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold text-[#4A4A4A] w-[35%]">Direction</th>
                            <th className="py-3 px-6 text-center text-sm font-semibold text-[#4A4A4A] rounded-tr-lg w-[10%]">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="4" className="py-8 text-center">
                                    <div className="flex justify-center">
                                        <div className="w-8 h-8 border-4 border-[#FF8500] border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2">Chargement...</p>
                                  
                                </td>
                            </tr>
                        ) : filteredDepartements.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center py-8 text-gray-500">
                                    <svg className="w-16 h-16 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <p>Aucun département trouvé</p>
                                  
                                </td>
                            </tr>
                        ) : (
                            filteredDepartements.map((departement, index) => (
                                <tr 
                                    key={departement._id || departement.code_departement} 
                                    className={`border-b border-gray-100 hover:bg-[#FFF9F0] transition-colors duration-150 ${
                                        index % 2 === 0 ? 'bg-white' : 'bg-[#FCFCFC]'
                                    }`}
                                >
                                    <td className="py-3 px-6">
                                        <span className="inline-block px-2 py-1 bg-[#FF8500]/10 text-[#FF8500] rounded-full text-xs font-medium min-w-[70px] text-center">
                                            {departement.code_departement}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6">
                                        <span className="text-sm font-medium text-gray-800">{departement.nom_departement}</span>
                                    </td>
                                    <td className="py-3 px-6">
                                        <div className="flex flex-col">
                                            {/* <span className="text-xs text-gray-500 font-mono">{departement.direction}</span> */}
                                            <span className="text-sm text-gray-700">{getDirectionNom(departement.direction)}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-6">
                                        <div className="flex gap-3 justify-center items-center">
                                            {!isReadOnly ? (
                                                <>
                                                    <button 
                                                        onClick={() => {
                                                            setSelectedDepartement(departement);
                                                            setShowUpdate(true);
                                                        }}
                                                        className="p-2 hover:bg-[#FF8500]/10 rounded-full transition-all duration-200 group"
                                                        title="Modifier"
                                                    >
                                                        <EditIcon className="w-4 h-4 text-gray-500 group-hover:text-[#FF8500]" />
                                                    </button>
                                                    <button 
                                                        onClick={() => {
                                                            setSelectedDepartement(departement);
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

            {/* Modal Ajouter Département */}
            {!isReadOnly && showAjouter && (
                <AjouterDepartement
                    onCancel={() => setShowAjouter(false)}
                    onSuccess={(msg) => handleSuccess(msg)}
                    axiosInstance={axiosInstance}
                    directions={directions}
                />
            )}

            {/* Modal Update Département */}
            {!isReadOnly && showUpdate && selectedDepartement && (
                <UpdateDepartement
                    departement={selectedDepartement}
                    onCancel={() => {
                        setShowUpdate(false);
                        setSelectedDepartement(null);
                    }}
                    onSuccess={(msg) => handleSuccess(msg)}
                    axiosInstance={axiosInstance}
                    directions={directions}
                />
            )}

            {/* Modal Delete Confirmation */}
            {!isReadOnly && showDeleteConfirm && selectedDepartement && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <DeleteIcon className="w-8 h-8 text-red-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Confirmer la suppression</h3>
                            <p className="text-gray-600">
                                Êtes-vous sûr de vouloir supprimer le département <span className="font-semibold text-[#FF8500]">{selectedDepartement.nom_departement}</span> ?
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

export default DepartementListe;