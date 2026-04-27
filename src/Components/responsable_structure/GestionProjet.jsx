import React, { useState } from 'react';
import AjouterNouveauProjet from './AjouterNouveauProjet';
import ModifierProjet from './ModifierProjet';
import { ReactComponent as AddIcon } from '../../Assets/Icons/Arrow.svg';
import { ReactComponent as EditIcon } from '../../Assets/Icons/check.svg';
import { ReactComponent as SearchIcon } from '../../Assets/Icons/Search.svg';
import axiosInstance from '../../axios'

const GestionProjets = () => {
    const [showNouveauModal, setShowNouveauModal] = useState(false);
    const [showModifierModal, setShowModifierModal] = useState(false);
    const [codeDivision, setCodeDivision] = useState('');
    const [searchCode, setSearchCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [projetInfo, setProjetInfo] = useState(null);
    const [error, setError] = useState('');

    const handleRechercherProjet = async () => {
        if (!searchCode.trim()) {
            setError("Veuillez saisir un code division");
            return;
        }

        setLoading(true);
        setError('');
        
        try {
            const response = await axiosInstance.get(`/api/budget/projet/${searchCode}/`);
            if (response.data.success) {
                setProjetInfo(response.data.data);
                setCodeDivision(searchCode);
                setShowModifierModal(true);
            }
        } catch (err) {
            console.error("Erreur:", err);
            setError(err.response?.data?.error || "Projet non trouvé");
            setProjetInfo(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">Gestion des Projets</h1>
                <button
                    onClick={() => setShowNouveauModal(true)}
                    className="px-5 py-2.5 bg-[#FF8500] text-white rounded-[20px] text-sm font-medium hover:bg-[#e67800] transition flex items-center gap-2"
                >
                    <AddIcon className="w-4 h-4" />
                    Nouveau Projet
                </button>
            </div>

            {/* Section recherche projet existant */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Modifier un projet existant</h2>
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Code Division
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={searchCode}
                                onChange={(e) => setSearchCode(e.target.value)}
                                placeholder="Ex: DIV-001"
                                className="flex-1 h-10 px-3 rounded-[20px] border border-gray-300 focus:border-[#FF8500] outline-none"
                            />
                            <button
                                onClick={handleRechercherProjet}
                                disabled={loading}
                                className="px-5 py-2 bg-[#FF8500] text-white rounded-[20px] hover:bg-[#e67800] transition flex items-center gap-2"
                            >
                                <SearchIcon className="w-4 h-4" />
                                {loading ? 'Recherche...' : 'Rechercher'}
                            </button>
                        </div>
                        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                    </div>
                </div>
            </div>

            {/* Modals */}
            {showNouveauModal && (
                <AjouterNouveauProjet
                    onCancel={() => setShowNouveauModal(false)}
                    onSuccess={(message) => {
                        setShowNouveauModal(false);
                        // Rafraîchir ou afficher message
                    }}
                />
            )}

            {showModifierModal && projetInfo && (
                <ModifierProjet
                    codeDivision={codeDivision}
                    projetData={projetInfo}
                    onCancel={() => {
                        setShowModifierModal(false);
                        setProjetInfo(null);
                        setCodeDivision('');
                    }}
                    onSuccess={(message) => {
                        setShowModifierModal(false);
                        setProjetInfo(null);
                        setCodeDivision('');
                        setSearchCode('');
                    }}
                />
            )}
        </div>
    );
};

export default GestionProjets;