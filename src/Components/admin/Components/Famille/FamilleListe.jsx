import React, { useState, useEffect } from 'react';
import AjouterFamille from './AjouterFamille';
import { ReactComponent as EditIcon } from '../../../../Assets/Icons/edit.svg';
import { ReactComponent as DeleteIcon } from '../../../../Assets/Icons/Delete.svg';
import { ReactComponent as SearchIcon } from '../../../../Assets/Icons/Search.svg';
import { axiosInstance } from '../../../../axios';


const FamilleListe = () => {
    const [familles, setFamilles] = useState([]);
    const [regions, setRegions] = useState([]);
    const [perimetres, setPerimetres] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showAjouter, setShowAjouter] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedPerimetre, setSelectedPerimetre] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // Charger les données
    const fetchData = async () => {
        setLoading(true);
        try {
            const [famillesRes, regionsRes, perimetresRes] = await Promise.all([
                axiosInstance.get('/params/familles'),
                axiosInstance.get('/params/regions'),
                axiosInstance.get('/params/perimetres')
            ]);
            
            setFamilles(famillesRes.data.data || []);
            setRegions(regionsRes.data.data || []);
            setPerimetres(perimetresRes.data.data || []);
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
        setSuccessMessage(message);
        setShowSuccess(true);
        fetchData();
        setTimeout(() => setShowSuccess(false), 3000);
    };

    // Filtrer les périmètres par région sélectionnée
    const filteredPerimetres = selectedRegion 
        ? perimetres.filter(p => p.region === selectedRegion)
        : perimetres;

    // Filtrage des familles
    const filteredFamilles = familles.filter(famille => {
        const search = searchTerm.toLowerCase();
        const matchesSearch = 
            famille.nom_famille?.toLowerCase().includes(search) ||
            famille.code_famille?.toLowerCase().includes(search) ||
            famille.champs?.toLowerCase().includes(search) ||
            famille.description?.toLowerCase().includes(search);
        
        const matchesRegion = selectedRegion ? famille.region === selectedRegion : true;
        const matchesPerimetre = selectedPerimetre ? famille.perimetre === selectedPerimetre : true;
        
        return matchesSearch && matchesRegion && matchesPerimetre;
    });

    // Fonctions pour obtenir les noms
    const getRegionName = (regionCode) => {
        const region = regions.find(r => r.code_region === regionCode);
        return region ? region.nom_region : regionCode;
    };

    const getPerimetreName = (perimetreCode) => {
        const perimetre = perimetres.find(p => p.code_perimetre === perimetreCode);
        return perimetre ? perimetre.nom_perimetre : perimetreCode;
    };

    return (
        <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 p-6">
            {/* En-tête */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Liste des Familles</h2>
                <button
                    onClick={() => setShowAjouter(true)}
                    className="px-4 py-2 bg-[#FF8500] text-white rounded-[20px] text-sm font-medium hover:bg-[#e67800] transition flex items-center gap-2"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 3v10M3 8h10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    Ajouter Famille
                </button>
            </div>

            {/* Filtres */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                {/* Filtre région */}
                <select
                    value={selectedRegion}
                    onChange={(e) => {
                        setSelectedRegion(e.target.value);
                        setSelectedPerimetre(''); // Reset périmètre quand région change
                    }}
                    className="h-[43px] px-4 rounded-[20px] border-2 border-[#D9E1E7] outline-none focus:border-[#FF8500] bg-white"
                >
                    <option value="">Toutes les régions</option>
                    {regions.map(region => (
                        <option key={region.code_region} value={region.code_region}>
                            {region.nom_region}
                        </option>
                    ))}
                </select>

                {/* Filtre périmètre */}
                <select
                    value={selectedPerimetre}
                    onChange={(e) => setSelectedPerimetre(e.target.value)}
                    disabled={!selectedRegion}
                    className="h-[43px] px-4 rounded-[20px] border-2 border-[#D9E1E7] outline-none focus:border-[#FF8500] bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                    <option value="">Tous les périmètres</option>
                    {filteredPerimetres.map(perimetre => (
                        <option key={perimetre.code_perimetre} value={perimetre.code_perimetre}>
                            {perimetre.nom_perimetre}
                        </option>
                    ))}
                </select>

                {/* Recherche */}
                <div className="h-[43px] rounded-[20px] border-2 border-[#D9E1E7] flex">
                    <div className="w-full h-full flex items-center px-4">
                        <SearchIcon />
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full h-full border-0 outline-none px-2"
                        />
                    </div>
                </div>
            </div>

            {/* Tableau */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-[#F9F9F9] border border-[#E4E4E4]">
                            <th className="py-3 px-4 text-left text-sm font-medium text-[#727272] rounded-l-lg">Code</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-[#727272]">Nom</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-[#727272]">Champs</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-[#727272]">Région</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-[#727272]">Périmètre</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-[#727272]">Description</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-[#727272] rounded-r-lg">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredFamilles.map((famille) => (
                            <tr key={famille._id || famille.code_famille} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-4 text-sm">{famille.code_famille}</td>
                                <td className="py-3 px-4 text-sm font-medium">{famille.nom_famille}</td>
                                <td className="py-3 px-4 text-sm">
                                    <span className="px-2 py-1 bg-[#17BEBB]/10 text-[#17BEBB] rounded-full text-xs">
                                        {famille.champs}
                                    </span>
                                </td>
                                <td className="py-3 px-4 text-sm">
                                    <span className="px-2 py-1 bg-[#FF8500]/10 text-[#FF8500] rounded-full text-xs">
                                        {getRegionName(famille.region)}
                                    </span>
                                </td>
                                <td className="py-3 px-4 text-sm">
                                    <span className="px-2 py-1 bg-[#884DFF]/10 text-[#884DFF] rounded-full text-xs">
                                        {getPerimetreName(famille.perimetre)}
                                    </span>
                                </td>
                                <td className="py-3 px-4 text-sm text-gray-600">{famille.description || '-'}</td>
                                <td className="py-3 px-4">
                                    <div className="flex gap-2">
                                        <button className="p-1.5 hover:bg-gray-100 rounded-full">
                                            <EditIcon className="w-4 h-4" />
                                        </button>
                                        <button className="p-1.5 hover:bg-gray-100 rounded-full">
                                            <DeleteIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredFamilles.length === 0 && !loading && (
                    <div className="text-center py-8 text-gray-500">
                        Aucune famille trouvée
                    </div>
                )}
            </div>
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
                    width: 200px;
                    
                }
                th:last-child, td:last-child {
                    width: 100px;
                }
            `}</style>

            {/* Modal Ajouter */}
            {showAjouter && (
                <AjouterFamille
                    onCancel={() => setShowAjouter(false)}
                    onSuccess={handleSuccess}
                    axiosInstance={axiosInstance}
                    regions={regions}
                    perimetres={perimetres}
                      
                />
            )}

            {/* Message succès */}
            {showSuccess && (
                <div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[300px] bg-green-500 text-white py-3 px-4 rounded-lg shadow-lg z-50 animate-fadeIn">
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{successMessage}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FamilleListe;