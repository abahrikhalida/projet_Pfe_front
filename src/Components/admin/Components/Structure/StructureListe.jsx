import React, { useState, useEffect } from 'react';
import AjouterStructure from './AjouterStructure';
import ModifierStructure from './ModifierStructure'
import { ReactComponent as EditIcon } from '../../../../Assets/Icons/edit.svg';
import { ReactComponent as DeleteIcon } from '../../../../Assets/Icons/Delete.svg';
import { ReactComponent as SearchIcon } from '../../../../Assets/Icons/Search.svg';
import { axiosInstance } from '../../../../axios';

const StructureListe = ({ isReadOnly = false }) => {
    const [structures, setStructures] = useState([]);
    const [regions, setRegions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showAjouter, setShowAjouter] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [structureToEdit, setStructureToEdit] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    const structureTypes = [
        { value: 'DIRECTION', label: 'Direction' },
        { value: 'DEPARTEMENT', label: 'Département' },
        { value: 'SERVICE', label: 'Service' },
        { value: 'CELLULE', label: 'Cellule' },
        { value: 'AGENCE', label: 'Agence' },
        { value: 'BUREAU', label: 'Bureau' }
    ];

    const fetchData = async () => {
        setLoading(true);
        try {
            const [structuresRes, regionsRes] = await Promise.all([
                axiosInstance.get('/params/structures'),
                axiosInstance.get('/params/regions')
            ]);
            setStructures(structuresRes.data.data || []);
            setRegions(regionsRes.data.data || []);
        } catch (err) {
            console.error("Erreur chargement données:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSuccess = (message) => {
        setShowAjouter(false);
        setShowEditModal(false);
        setStructureToEdit(null);
        setSuccessMessage(message);
        setShowSuccess(true);
        fetchData();
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const handleDelete = async (id, nomStructure) => {
        if (window.confirm(`Êtes-vous sûr de vouloir supprimer la structure "${nomStructure}" ?`)) {
            try {
                await axiosInstance.delete(`/api/structures/${id}`);
                handleSuccess('Structure supprimée avec succès');
            } catch (err) {
                console.error("Erreur suppression:", err);
                alert(err.response?.data?.message || "Erreur lors de la suppression");
            }
        }
    };

    const handleEdit = (structure) => {
        setStructureToEdit(structure);
        setShowEditModal(true);
    };

    const filteredStructures = structures.filter(structure => {
        const search = searchTerm.toLowerCase();
        const matchesSearch = 
            structure.nom_structure?.toLowerCase().includes(search) ||
            structure.code_structure?.toLowerCase().includes(search) ||
            structure.type_structure?.toLowerCase().includes(search) ||
            structure.description?.toLowerCase().includes(search);
        
        const matchesRegion = selectedRegion ? structure.region?._id === selectedRegion || structure.region === selectedRegion : true;
        const matchesType = selectedType ? structure.type_structure === selectedType : true;
        
        return matchesSearch && matchesRegion && matchesType;
    });

    const getRegionName = (regionId) => {
        const region = regions.find(r => r._id === regionId || r.code_region === regionId);
        return region ? region.nom_region : regionId;
    };

    const getTypeLabel = (typeValue) => {
        const type = structureTypes.find(t => t.value === typeValue);
        return type ? type.label : typeValue;
    };

    const getTypeColor = (typeValue) => {
        const colors = {
            'DIRECTION': '#FF8500',
            'DEPARTEMENT': '#17BEBB',
            'SERVICE': '#884DFF',
            'CELLULE': '#FF6B6B',
            'AGENCE': '#4ECDC4',
            'BUREAU': '#45B7D1'
        };
        return colors[typeValue] || '#FF8500';
    };

    return (
        <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Liste des Structures</h2>
                {!isReadOnly ? (
                    <button onClick={() => setShowAjouter(true)} className="px-4 py-2 bg-[#FF8500] text-white rounded-[20px] text-sm font-medium hover:bg-[#e67800] transition flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
                        Ajouter Structure
                    </button>
                ) : (
                    <div className="px-3 py-1.5 bg-gray-100 rounded-lg">
                        <span className="text-xs text-gray-500">Lecture seule</span>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
                <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)} className="h-[43px] px-4 rounded-[20px] border-2 border-[#D9E1E7] outline-none focus:border-[#FF8500] bg-white">
                    <option value="">Toutes les régions</option>
                    {regions.map(region => (<option key={region._id || region.code_region} value={region._id || region.code_region}>{region.nom_region}</option>))}
                </select>

                <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="h-[43px] px-4 rounded-[20px] border-2 border-[#D9E1E7] outline-none focus:border-[#FF8500] bg-white">
                    <option value="">Tous les types</option>
                    {structureTypes.map(type => (<option key={type.value} value={type.value}>{type.label}</option>))}
                </select>

                <div className="h-[43px] rounded-[20px] border-2 border-[#D9E1E7] hover:border-[#FF8500] focus-within:border-[#FF8500] transition-colors duration-200 flex items-center px-4">
                    <SearchIcon className="text-gray-400" />
                    <input type="text" placeholder="Rechercher..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full h-full border-0 outline-none px-2" />
                </div>
            </div>

            <div className="mb-4 text-sm text-gray-500">{filteredStructures.length} structure(s)</div>

            <div className="overflow-x-auto rounded-lg border border-gray-100">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gradient-to-r from-[#F9F9F9] to-[#F0F0F0] border-b border-[#E4E4E4]">
                            <th className="py-3 px-4 text-left text-sm font-semibold text-[#4A4A4A]">Code</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-[#4A4A4A]">Nom</th>
                            {/* <th className="py-3 px-4 text-left text-sm font-semibold text-[#4A4A4A]">Type</th> */}
                            <th className="py-3 px-4 text-left text-sm font-semibold text-[#4A4A4A]">Région</th>
                            {/* <th className="py-3 px-4 text-left text-sm font-semibold text-[#4A4A4A]">Description</th> */}
                            <th className="py-3 px-4 text-left text-sm font-semibold text-[#4A4A4A]">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStructures.map((structure, index) => (
                            <tr key={structure._id} className={`border-b border-gray-100 hover:bg-[#FFF9F0] transition-colors duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-[#FCFCFC]'}`}>
                                <td className="py-3 px-4"><span className="px-2 py-1 bg-[#FF8500]/10 text-[#FF8500] rounded-full text-xs font-medium">{structure.code_structure}</span></td>
                                <td className="py-3 px-4 text-sm font-medium text-gray-800">{structure.nom_structure}</td>
                                {/* <td className="py-3 px-4"><span className="px-2 py-1 rounded-full text-xs text-white" style={{ backgroundColor: getTypeColor(structure.type_structure) }}>{getTypeLabel(structure.type_structure)}</span></td> */}
                                <td className="py-3 px-4"><span className="px-2 py-1 bg-[#FF8500]/10 text-[#FF8500] rounded-full text-xs">{getRegionName(structure.region?._id || structure.region)}</span></td>
                                {/* <td className="py-3 px-4 text-sm text-gray-600">{structure.description || '-'}</td> */}
                                <td className="py-3 px-4">
                                    <div className="flex gap-2">
                                        {!isReadOnly ? (
                                            <>
                                                <button onClick={() => handleEdit(structure)} className="p-1.5 hover:bg-[#FF8500]/10 rounded-full transition-all duration-200 group" title="Modifier">
                                                    <EditIcon className="w-4 h-4 text-gray-500 group-hover:text-[#FF8500]" />
                                                </button>
                                                <button onClick={() => handleDelete(structure._id, structure.nom_structure)} className="p-1.5 hover:bg-red-50 rounded-full transition-all duration-200 group" title="Supprimer">
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
                        ))}
                    </tbody>
                </table>
                {filteredStructures.length === 0 && !loading && <div className="text-center py-8 text-gray-500">Aucune structure trouvée</div>}
            </div>

            {!isReadOnly && showAjouter && <AjouterStructure onCancel={() => setShowAjouter(false)} onSuccess={handleSuccess} axiosInstance={axiosInstance} regions={regions} />}
            {!isReadOnly && showEditModal && structureToEdit && <ModifierStructure structure={structureToEdit} onCancel={() => { setShowEditModal(false); setStructureToEdit(null); }} onSuccess={handleSuccess} axiosInstance={axiosInstance} regions={regions} />}

            {showSuccess && (
                <div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[300px] bg-green-500 text-white py-3 px-4 rounded-lg shadow-lg z-50 animate-fadeIn">
                    <div className="flex items-center gap-2"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg><span>{successMessage}</span></div>
                </div>
            )}
        </div>
    );
};

export default StructureListe;