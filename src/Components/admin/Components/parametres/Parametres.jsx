import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../../../axios';
import RegionListe from '../Region/RegionListe';
import PerimetreListe from '../Perimetre/PerimetreListe';
import FamilleListe from '../Famille/FamilleListe';

const Parametres = () => {
    const [activeSection, setActiveSection] = useState('region');
    
    // État simple pour les compteurs
    const [nbRegions, setNbRegions] = useState(0);
    const [nbPerimetres, setNbPerimetres] = useState(0);
    const [nbFamilles, setNbFamilles] = useState(0);
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Chargement MANUEL et SIMPLE
    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setLoading(true);
                setError('');
                
                // 1. Récupérer les régions
                const regionsRes = await axiosInstance.get('/params/regions');
                console.log("Régions reçues:", regionsRes.data);
                
                // 2. Récupérer les périmètres  
                const perimetresRes = await axiosInstance.get('/params/perimetres');
                console.log("Périmètres reçus:", perimetresRes.data);
                
                // 3. Récupérer les familles
                const famillesRes = await axiosInstance.get('/params/familles');
                console.log("Familles reçues:", famillesRes.data);

                // Compter MANUELLEMENT selon ce que vous voyez dans la console
                // 👇 ADAPTEZ CES LIGNES SELON CE QUE VOUS VOYEZ DANS LA CONSOLE
                
                // Si c'est un tableau direct
                if (Array.isArray(regionsRes.data)) {
                    setNbRegions(regionsRes.data.length);
                } 
                // Si c'est { data: [...] }
                else if (regionsRes.data?.data) {
                    setNbRegions(regionsRes.data.data.length);
                }
                // Si c'est { results: [...] }
                else if (regionsRes.data?.results) {
                    setNbRegions(regionsRes.data.results.length);
                }
                // Si c'est un objet avec des clés
                else {
                    setNbRegions(Object.keys(regionsRes.data).length);
                }

                // Même chose pour périmètres
                if (Array.isArray(perimetresRes.data)) {
                    setNbPerimetres(perimetresRes.data.length);
                } else if (perimetresRes.data?.data) {
                    setNbPerimetres(perimetresRes.data.data.length);
                } else if (perimetresRes.data?.results) {
                    setNbPerimetres(perimetresRes.data.results.length);
                } else {
                    setNbPerimetres(Object.keys(perimetresRes.data).length);
                }

                // Même chose pour familles
                if (Array.isArray(famillesRes.data)) {
                    setNbFamilles(famillesRes.data.length);
                } else if (famillesRes.data?.data) {
                    setNbFamilles(famillesRes.data.data.length);
                } else if (famillesRes.data?.results) {
                    setNbFamilles(famillesRes.data.results.length);
                } else {
                    setNbFamilles(Object.keys(famillesRes.data).length);
                }

            } catch (err) {
                console.error("Erreur:", err);
                setError("Impossible de charger les données");
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, []); // Un seul chargement au démarrage

    // PAS de rafraîchissement automatique pour éviter les erreurs 429

    return (
        <div className="h-[calc(100vh-65px)] overflow-y-auto scrollbar-none p-6">
            {/* En-tête simple */}
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-gray-800">Paramètres</h1>
                <p className="text-gray-500 mt-1">Gérez les régions, périmètres et familles</p>
                
                {error && (
                    <div className="mt-3 p-2 bg-red-50 text-red-600 text-sm rounded-lg">
                        {error}
                    </div>
                )}
            </div>

            {/* Cartes des sections avec compteurs SIMPLES */}
            <div className="grid grid-cols-3 gap-6 mb-8">
                {/* Carte Région */}
                <div 
                    onClick={() => setActiveSection('region')}
                    className={`bg-white rounded-[20px] shadow-sm border-2 p-6 cursor-pointer transition-all hover:shadow-md ${
                        activeSection === 'region' ? 'border-[#FF8500]' : 'border-gray-100 hover:border-[#FF8500]/30'
                    }`}
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-[#FF8500]/10 rounded-full flex items-center justify-center">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF8500" strokeWidth="2">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                                <circle cx="12" cy="9" r="2.5" />
                            </svg>
                        </div>
                        {loading ? (
                            <div className="w-12 h-8 bg-gray-200 animate-pulse rounded"></div>
                        ) : (
                            <span className="text-3xl font-bold text-[#FF8500]">{nbRegions}</span>
                        )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Régions</h3>
                    <p className="text-sm text-gray-500 mt-1">Gérer les régions géographiques</p>
                </div>

                {/* Carte Périmètre */}
                <div 
                    onClick={() => setActiveSection('perimetre')}
                    className={`bg-white rounded-[20px] shadow-sm border-2 p-6 cursor-pointer transition-all hover:shadow-md ${
                        activeSection === 'perimetre' ? 'border-[#FF8500]' : 'border-gray-100 hover:border-[#FF8500]/30'
                    }`}
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-[#FF8500]/10 rounded-full flex items-center justify-center">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF8500" strokeWidth="2">
                                <rect x="3" y="3" width="18" height="18" rx="2" />
                                <path d="M3 9h18M9 21v-12" />
                            </svg>
                        </div>
                        {loading ? (
                            <div className="w-12 h-8 bg-gray-200 animate-pulse rounded"></div>
                        ) : (
                            <span className="text-3xl font-bold text-[#FF8500]">{nbPerimetres}</span>
                        )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Périmètres</h3>
                    <p className="text-sm text-gray-500 mt-1">Gérer les périmètres par région</p>
                </div>

                {/* Carte Famille */}
                <div 
                    onClick={() => setActiveSection('famille')}
                    className={`bg-white rounded-[20px] shadow-sm border-2 p-6 cursor-pointer transition-all hover:shadow-md ${
                        activeSection === 'famille' ? 'border-[#FF8500]' : 'border-gray-100 hover:border-[#FF8500]/30'
                    }`}
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-[#FF8500]/10 rounded-full flex items-center justify-center">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF8500" strokeWidth="2">
                                <path d="M20 7h-4.5L15 4H9L8.5 7H4v2h16V7z" />
                                <path d="M4 11v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
                            </svg>
                        </div>
                        {loading ? (
                            <div className="w-12 h-8 bg-gray-200 animate-pulse rounded"></div>
                        ) : (
                            <span className="text-3xl font-bold text-[#FF8500]">{nbFamilles}</span>
                        )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Familles</h3>
                    <p className="text-sm text-gray-500 mt-1">Gérer les familles par périmètre</p>
                </div>
            </div>

            {/* Section active */}
            <div className="mt-8">
                {activeSection === 'region' && <RegionListe />}
                {activeSection === 'perimetre' && <PerimetreListe />}
                {activeSection === 'famille' && <FamilleListe />}
            </div>
        </div>
    );
};

export default Parametres;