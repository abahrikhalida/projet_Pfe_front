import React, { useState, useEffect,useRef } from 'react';
import { axiosInstance } from '../../axios';
import { ReactComponent as SearchIcon } from '../../Assets/Icons/Search.svg';
import { ReactComponent as AddIcon } from '../../Assets/Icons/Arrow.svg';
import { ReactComponent as EditIcon } from '../../Assets/Icons/edit.svg';
import { ReactComponent as DeleteIcon } from '../../Assets/Icons/Delete.svg';
import { ReactComponent as ArrowIcon } from '../../Assets/Icons/Arrow.svg';
import { ReactComponent as EmptyIcon } from '../../Assets/Icons/notFound.svg';

const AffectationResponsable = () => {
    const [structures, setStructures] = useState([]);
    const [responsables, setResponsables] = useState([]);
    const [responsablesDisponibles, setResponsablesDisponibles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStructure, setSelectedStructure] = useState(null);
    const [selectedResponsable, setSelectedResponsable] = useState(null);
    const [showAffectationModal, setShowAffectationModal] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const dynamicListRef = useRef(null);

    // Récupérer les structures de la région
    const fetchStructures = async () => {
        try {
            setLoading(true);
            const regionId = localStorage.getItem('region_id');
            const response = await axiosInstance.get(`/params/structures/?region_id=${regionId}`);
            setStructures(response.data.data || []);
        } catch (err) {
            console.error("Erreur:", err);
            setError("Impossible de charger les structures");
        } finally {
            setLoading(false);
        }
    };

    // Récupérer les responsables (utilisateurs avec rôle responsable_structure)
    const fetchResponsables = async () => {
        try {
            const response = await axiosInstance.get('/api/users/?role=responsable_structure');
            const allResponsables = response.data.users || [];
            
            // Filtrer les responsables non affectés
            const disponibles = allResponsables.filter(resp => !resp.structure_id);
            setResponsables(allResponsables);
            setResponsablesDisponibles(disponibles);
        } catch (err) {
            console.error("Erreur chargement responsables:", err);
        }
    };

    // Récupérer les détails d'une structure
    const fetchStructureDetails = async (structureId) => {
        try {
            const response = await axiosInstance.get(`/params/structures/${structureId}`);
            return response.data.data;
        } catch (err) {
            console.error("Erreur:", err);
            return null;
        }
    };

    // Affecter un responsable à une structure
    const handleAffecter = async () => {
        if (!selectedStructure || !selectedResponsable) {
            setError("Veuillez sélectionner une structure et un responsable");
            return;
        }

        setLoading(true);
        setError('');

        try {
            await axiosInstance.patch(`/api/users/${selectedResponsable.id}/affecter-structure/`, {
                structure_id: selectedStructure._id || selectedStructure.id
            });

            setSuccessMessage(`Responsable ${selectedResponsable.nom_complet} affecté à ${selectedStructure.nom_structure}`);
            setShowSuccess(true);
            setShowAffectationModal(false);
            setSelectedStructure(null);
            setSelectedResponsable(null);
            
            // Rafraîchir les données
            await fetchStructures();
            await fetchResponsables();
            
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (err) {
            console.error("Erreur:", err);
            setError(err.response?.data?.error || "Erreur lors de l'affectation");
        } finally {
            setLoading(false);
        }
    };

    // Désaffecter un responsable
    const handleDesaffecter = async (structure) => {
        if (!window.confirm(`Voulez-vous vraiment désaffecter le responsable de ${structure.nom_structure} ?`)) {
            return;
        }

        setLoading(true);
        try {
            await axiosInstance.patch(`/api/users/${structure.responsable_id}/affecter-structure/`, {
                structure_id: null
            });

            setSuccessMessage(`Responsable désaffecté de ${structure.nom_structure}`);
            setShowSuccess(true);
            
            await fetchStructures();
            await fetchResponsables();
            
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (err) {
            console.error("Erreur:", err);
            setError("Erreur lors de la désaffectation");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStructures();
        fetchResponsables();
    }, []);

    // Gestion du scroll
    const toggleVisibility = () => {
        if (dynamicListRef.current) {
            const scrollY = dynamicListRef.current.scrollTop;
            setIsVisible(scrollY > 5);
        }
    };

    useEffect(() => {
        const currentRef = dynamicListRef.current;
        if (currentRef) {
            currentRef.addEventListener("scroll", toggleVisibility);
        }
        return () => {
            if (currentRef) {
                currentRef.removeEventListener("scroll", toggleVisibility);
            }
        };
    }, []);

    const scrollToTop = () => {
        if (dynamicListRef.current) {
            dynamicListRef.current.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    };

    const filteredStructures = structures.filter(structure => {
        const search = searchTerm.toLowerCase();
        return (
            structure.code_structure?.toLowerCase().includes(search) ||
            structure.nom_structure?.toLowerCase().includes(search) ||
            structure.responsable_nom?.toLowerCase().includes(search)
        );
    });

    return (
        <div 
            ref={dynamicListRef}
            className="h-[calc(100vh-65px)] overflow-y-auto scrollbar-none relative"
        >
            <div className="w-full h-full flex flex-col px-3">
                {/* En-tête */}
                <div className="w-full px-4 flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">Affectation des Responsables</h1>
                        <p className="text-gray-500 mt-1">Gérez l'affectation des responsables aux structures de votre région</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setShowAffectationModal(true)}
                            className="font-kumbh text-sm font-medium px-4 py-2.5 rounded-[22px] text-white bg-[#FF8500] hover:bg-[#0E47C8] transition flex items-center gap-2"
                        >
                            <AddIcon className="w-4 h-4" />
                            Nouvelle affectation
                        </button>
                    </div>
                </div>

                {/* Barre de recherche */}
                <div className="w-full px-2 min-h-[43px] mb-6">
                    <div className="w-full h-full rounded-[20px] border-2 border-[#D9E1E7] flex">
                        <div className="w-full h-full flex items-center px-4">
                            <SearchIcon />
                            <input
                                type="text"
                                placeholder="Rechercher par code, nom de structure ou responsable..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full h-full border-0 outline-none px-4 font-kumbh placeholder:text-[#8A8A8A]"
                            />
                        </div>
                    </div>
                </div>

                {/* Liste des structures */}
                <div className="w-full mt-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredStructures.map((structure) => (
                            <div
                                key={structure._id || structure.id}
                                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition"
                            >
                                {/* En-tête de la carte */}
                                <div className="bg-gradient-to-r from-green-50 to-white p-4 border-b border-gray-200">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold text-gray-800">{structure.nom_structure}</h3>
                                            <p className="text-xs text-gray-500 mt-1">Code: {structure.code_structure}</p>
                                        </div>
                                        {structure.responsable_id ? (
                                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                                                Affecté
                                            </span>
                                        ) : (
                                            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                                                Non affecté
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Corps de la carte */}
                                <div className="p-4">
                                    {structure.responsable_id ? (
                                        <div className="bg-gray-50 rounded-lg p-3">
                                            <p className="text-xs text-gray-500">Responsable actuel</p>
                                            <div className="flex items-center justify-between mt-1">
                                                <div>
                                                    <p className="font-medium text-gray-800">{structure.responsable_nom || 'Responsable'}</p>
                                                    <p className="text-xs text-gray-500">{structure.responsable_email}</p>
                                                </div>
                                                <button
                                                    onClick={() => handleDesaffecter(structure)}
                                                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-full transition"
                                                    title="Désaffecter"
                                                >
                                                    <DeleteIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-4">
                                            <p className="text-sm text-gray-500">Aucun responsable affecté</p>
                                            <button
                                                onClick={() => {
                                                    setSelectedStructure(structure);
                                                    setShowAffectationModal(true);
                                                }}
                                                className="mt-2 text-[#FF8500] text-sm font-medium hover:underline"
                                            >
                                                + Affecter un responsable
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Infos supplémentaires */}
                                <div className="bg-gray-50 px-4 py-2 border-t border-gray-100 text-xs text-gray-500">
                                    <div className="flex justify-between">
                                        <span>Créée le: {new Date(structure.created_at).toLocaleDateString('fr-FR')}</span>
                                        <span>Statut: {structure.is_active ? 'Actif' : 'Inactif'}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Aucune structure */}
                    {filteredStructures.length === 0 && !loading && (
                        <div className="w-full h-[calc(100vh-400px)] bg-[#F9F9F9] rounded-lg border-3 border-[#E4E4E4] flex flex-col justify-center items-center gap-6">
                            <EmptyIcon className="w-[200px] h-[170px]" />
                            <div className="flex flex-col gap-1 items-center">
                                <h1 className="text-2xl font-bold text-[#060606]">Aucune structure trouvée</h1>
                                <span className="text-center text-[#4F4F4F] font-medium">
                                    Aucune structure n'est associée à votre région
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Loader */}
                    {loading && (
                        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
                            <div className="flex flex-col items-center bg-white p-8 rounded-[30px] shadow-lg w-[400px]">
                                <div className="flex justify-center items-center gap-2">
                                    {[1, 2, 3].map((dot) => (
                                        <div
                                            key={dot}
                                            className="w-3 h-3 bg-[#FF8500] rounded-full animate-bounce"
                                            style={{ animationDelay: `${dot * 0.16 - 0.48}s` }}
                                        />
                                    ))}
                                </div>
                                <p className="mt-5 text-[#333] text-lg font-semibold">
                                    Chargement...
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Bouton retour haut */}
                {isVisible && (
                    <button
                        onClick={scrollToTop}
                        className="fixed bottom-5 right-5 w-[50px] h-[50px] rounded-full bg-[#FF8500] text-white flex justify-center items-center shadow-lg hover:bg-[#8045d6] transition z-40"
                    >
                        <ArrowIcon className="transform rotate-180" />
                    </button>
                )}
            </div>

            {/* Modal d'affectation */}
            {showAffectationModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="w-[600px] bg-white shadow-2xl p-6 rounded-[20px]">
                        <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-800">Affecter un responsable</h2>
                            <button 
                                onClick={() => {
                                    setShowAffectationModal(false);
                                    setSelectedStructure(null);
                                    setSelectedResponsable(null);
                                }}
                                className="p-1 hover:bg-gray-100 rounded-full"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M18 6L6 18M6 6L18 18" stroke="#4F4F4F" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                            </button>
                        </div>

                        {error && (
                            <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">
                                {error}
                            </div>
                        )}

                        <div className="mt-4 space-y-4">
                            {/* Structure sélectionnée */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Structure
                                </label>
                                <div className="p-3 bg-gray-50 rounded-lg">
                                    <p className="font-medium text-gray-800">
                                        {selectedStructure?.nom_structure || 'Sélectionnez une structure'}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Code: {selectedStructure?.code_structure}
                                    </p>
                                </div>
                            </div>

                            {/* Sélection du responsable */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Responsable à affecter
                                </label>
                                <select
                                    value={selectedResponsable?.id || ''}
                                    onChange={(e) => {
                                        const resp = responsablesDisponibles.find(r => r.id === parseInt(e.target.value));
                                        setSelectedResponsable(resp);
                                    }}
                                    className="w-full h-10 px-3 rounded-[20px] border border-gray-300 focus:border-[#FF8500] outline-none"
                                >
                                    <option value="">-- Sélectionner un responsable --</option>
                                    {responsablesDisponibles.map((resp) => (
                                        <option key={resp.id} value={resp.id}>
                                            {resp.nom_complet} - {resp.email}
                                        </option>
                                    ))}
                                </select>
                                {responsablesDisponibles.length === 0 && (
                                    <p className="text-xs text-red-500 mt-1">
                                        Aucun responsable disponible. Veuillez d'abord créer des comptes responsables.
                                    </p>
                                )}
                            </div>

                            {/* Informations du responsable sélectionné */}
                            {selectedResponsable && (
                                <div className="p-3 bg-green-50 rounded-lg">
                                    <p className="text-sm font-medium text-green-800">Responsable sélectionné</p>
                                    <p className="text-sm text-gray-700">{selectedResponsable.nom_complet}</p>
                                    <p className="text-xs text-gray-500">{selectedResponsable.email}</p>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-3 justify-end mt-6 pt-4 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowAffectationModal(false);
                                    setSelectedStructure(null);
                                    setSelectedResponsable(null);
                                }}
                                className="px-5 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-[25px] hover:bg-gray-300 transition"
                            >
                                Annuler
                            </button>
                            <button
                                type="button"
                                onClick={handleAffecter}
                                disabled={!selectedStructure || !selectedResponsable || loading}
                                className={`px-5 py-2 text-white text-sm font-medium rounded-[25px] transition flex items-center gap-2 ${
                                    selectedStructure && selectedResponsable && !loading
                                        ? 'bg-[#FF8500] hover:bg-[#0E47C8]' 
                                        : 'bg-gray-300 cursor-not-allowed'
                                }`}
                            >
                                {loading && (
                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                                    </svg>
                                )}
                                {loading ? 'Affectation...' : 'Affecter'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Message de succès */}
            {showSuccess && (
                <div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[350px] bg-green-500 text-white py-3 px-4 rounded-lg shadow-lg z-50 animate-fadeIn">
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-medium">{successMessage}</span>
                    </div>
                </div>
            )}

            {/* Message d'erreur */}
            {error && (
                <div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[350px] bg-red-500 text-white py-3 px-4 rounded-lg shadow-lg z-50">
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className="font-medium">{error}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AffectationResponsable;