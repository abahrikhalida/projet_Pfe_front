// Components/Projets/DetailsProjetModal.jsx
import React, { useState, useEffect } from 'react';

const DetailsProjetModal = ({ isOpen, onClose, projet: projetProp, axiosInstance }) => {
    const [projet, setProjet] = useState(null);
    const [regions, setRegions] = useState([]);
    const [directions, setDirections] = useState([]);
    const [downloading, setDownloading] = useState(false);

    // Afficher directement les données du projet sans appel API
    useEffect(() => {
        if (isOpen && projetProp) {
            console.log("📋 Affichage direct du projet:", projetProp);
            setProjet(projetProp);
            
            fetchRegions();
            fetchDirections();
        }
    }, [isOpen, projetProp]);

    const fetchRegions = async () => {
        try {
            const response = await axiosInstance.get('/params/regions');
            setRegions(response.data.data || []);
        } catch (err) {
            console.error("Erreur chargement régions:", err);
        }
    };

    const fetchDirections = async () => {
        try {
            const response = await axiosInstance.get('/params/directions');
            setDirections(response.data.data || []);
        } catch (err) {
            console.error("Erreur chargement directions:", err);
        }
    };

    // Téléchargement PDF via l'API backend
    const handleDownloadPDF = async () => {
        if (!projet) return;
        
        setDownloading(true);
        try {
            const projetId = projet._id || projet.id;
            console.log("📄 Téléchargement PDF pour le projet ID:", projetId);
            
            const response = await axiosInstance.get(`/recap/export/pdf/${projetId}/`, {
                responseType: 'blob'
            });
            
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `projet_${projet.code_division || projetId}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
            
            console.log("✅ PDF téléchargé avec succès");
        } catch (err) {
            console.error("❌ Erreur téléchargement PDF:", err);
            alert("Erreur lors du téléchargement du PDF");
        } finally {
            setDownloading(false);
        }
    };

    const formatCurrency = (value) => {
        if (!value && value !== 0) return '0 DA';
        const num = parseFloat(value);
        if (isNaN(num)) return '0 DA';
        return new Intl.NumberFormat('fr-DZ').format(num) + ' DA';
    };

    const getRegionName = (regionId) => {
        if (!regionId) return '-';
        const region = regions.find(r => r._id === regionId || r.code_region === regionId);
        return region?.nom_region || regionId;
    };

    const getDirectionName = (directionId) => {
        if (!directionId) return '-';
        const direction = directions.find(d => d._id === directionId || d.code_direction === directionId);
        return direction?.nom_direction || directionId;
    };

    const getStatutBadge = () => {
        if (!projet) return null;
        const statut = projet.statut_workflow || projet.statut_final || 'brouillon';
        const config = {
            brouillon: { label: 'Brouillon', color: '#9CA3AF', bg: 'bg-gray-100' },
            soumis: { label: 'Soumis', color: '#3B82F6', bg: 'bg-blue-100' },
            pre_approuve_chef: { label: 'Pré-approuvé Chef', color: '#8B5CF6', bg: 'bg-purple-100' },
            reserve_chef: { label: 'Réservé Chef', color: '#F59E0B', bg: 'bg-amber-100' },
            reserve_directeur: { label: 'Réservé Directeur', color: '#F59E0B', bg: 'bg-amber-100' },
            approuve_directeur: { label: 'Approuvé Directeur', color: '#10B981', bg: 'bg-green-100' },
            valide_divisionnaire: { label: 'Validé', color: '#10B981', bg: 'bg-green-100' },
            rejete_divisionnaire: { label: 'Rejeté', color: '#EF4444', bg: 'bg-red-100' },
            annule_divisionnaire: { label: 'Annulé', color: '#6B7280', bg: 'bg-gray-100' },
            termine_divisionnaire: { label: 'Terminé', color: '#14B8A6', bg: 'bg-teal-100' }
        };
        const c = config[statut] || { label: statut, color: '#6B7280', bg: 'bg-gray-100' };
        return <span className={`px-2 py-1 rounded-full text-xs font-medium ${c.bg}`} style={{ color: c.color }}>{c.label}</span>;
    };

    const moisList = [
        { key: 'janvier', label: 'Janvier' }, { key: 'fevrier', label: 'Février' },
        { key: 'mars', label: 'Mars' }, { key: 'avril', label: 'Avril' },
        { key: 'mai', label: 'Mai' }, { key: 'juin', label: 'Juin' },
        { key: 'juillet', label: 'Juillet' }, { key: 'aout', label: 'Août' },
        { key: 'septembre', label: 'Septembre' }, { key: 'octobre', label: 'Octobre' },
        { key: 'novembre', label: 'Novembre' }, { key: 'decembre', label: 'Décembre' },
    ];

    // Calcul de l'année de base
    const anneeBase = projet?.annee_debut_pmt ? parseInt(projet.annee_debut_pmt) - 1 : new Date().getFullYear() - 1;

    const totalMensuel = () => {
        if (!projet) return 0;
        return moisList.reduce((sum, m) => sum + (parseFloat(projet[`${m.key}_total`]) || 0), 0);
    };

    const totalPrevisionsPluri = () => {
        if (!projet) return 0;
        const n2 = parseFloat(projet.prev_n_plus2_total) || 0;
        const n3 = parseFloat(projet.prev_n_plus3_total) || 0;
        const n4 = parseFloat(projet.prev_n_plus4_total) || 0;
        const n5 = parseFloat(projet.prev_n_plus5_total) || 0;
        return n2 + n3 + n4 + n5;
    };

    if (!isOpen) return null;

    if (!projet) {
        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl p-6">
                    <p className="text-gray-600">Aucune information disponible</p>
                    <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-200 rounded-lg">Fermer</button>
                </div>
            </div>
        );
    }

    const hasRegion = projet.region || projet.region_id;
    const hasDirection = projet.direction || projet.direction_id;
    const isRegion = hasRegion && !hasDirection;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="w-[1000px] max-h-[92vh] flex flex-col bg-white shadow-2xl rounded-2xl overflow-hidden">
                {/* En-tête avec bouton PDF */}
                <div className="px-6 pt-5 pb-4 border-b border-gray-100 bg-white sticky top-0 z-10">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-3 flex-wrap">
                                <h2 className="text-lg font-bold text-gray-900">
                                    Détails du projet
                                </h2>
                                {getStatutBadge()}
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                                Code: <span className="font-mono text-orange-600">{projet.code_division}</span>
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                       
                            <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M18 6L6 18M6 6L18 18" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Corps avec scroll */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    
                    {/* SECTION IDENTIFICATION */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                        <h3 className="font-semibold text-blue-800 mb-3"> Identification</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-gray-500">Libellé</p>
                                <p className="text-sm font-medium text-gray-800">{projet.libelle || '-'}</p>
                            </div>
                             <div>
                                <p className="text-xs text-gray-500">point situation </p>
                                <p className="text-sm font-medium text-gray-800">{projet.point_situation || '-'}</p>
                            </div>
                             <div>
                                <p className="text-xs text-gray-500">opportunite</p>
                                <p className="text-sm font-medium text-gray-800">{projet.opportunite_projet || '-'}</p>
                            </div>
                             <div>
                                <p className="text-xs text-gray-500">description technique</p>
                                <p className="text-sm font-medium text-gray-800">{projet.description_technique || '-'}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Type de projet</p>
                                <p className="text-sm font-medium text-gray-800">
                                    {projet.type_projet === 'nouveau' ? '🆕 Nouveau projet' : '🔄 Projet en cours'}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Activité</p>
                                <p className="text-sm font-medium text-gray-800">{projet.activite || '-'}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Famille</p>
                                <p className="text-sm font-medium text-gray-800">{projet.famille|| '-'}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">
                                    {isRegion ? 'Région' : 'Direction'}
                                </p>
                                <p className="text-sm font-medium text-gray-800">
                                    {isRegion 
                                        ? getRegionName(projet.region || projet.region_id)
                                        : getDirectionName(projet.direction || projet.direction_id)
                                    }
                                </p>
                            </div>
                            {projet.perm && (
                                <div>
                                    <p className="text-xs text-gray-500">Périmètre</p>
                                    <p className="text-sm font-medium text-gray-800">{projet.perm}</p>
                                </div>
                            )}
                            <div>
                                <p className="text-xs text-gray-500">Période PMT</p>
                                <p className="text-sm font-medium text-gray-800">
                                    {projet.annee_debut_pmt} → {projet.annee_fin_pmt}
                                </p>
                            </div>
                          
                        </div>
                    </div>

                    {/* SECTION DURÉE ET POINT DE SITUATION */}
                    {(projet.duree_realisation || projet.point_situation) && (
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                            <h3 className="font-semibold text-green-800 mb-3"> Informations de réalisation</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {projet.duree_realisation && (
                                    <div>
                                        <p className="text-xs text-gray-500">Durée de réalisation</p>
                                        <p className="text-sm font-medium text-gray-800">
                                            {projet.duree_realisation} mois
                                        </p>
                                    </div>
                                )}
                           
                            </div>
                            {projet.point_situation && (
                                <div className="mt-3 pt-3 border-t border-green-200">
                                    <p className="text-xs text-gray-500 mb-1">Point de situation</p>
                                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{projet.point_situation}</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* SECTION DESCRIPTIONS */}
                    {projet.description_technique && (
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                            <h3 className="font-semibold text-gray-700 mb-2">📝 Description technique</h3>
                            <p className="text-sm text-gray-600 whitespace-pre-wrap">{projet.description_technique}</p>
                        </div>
                    )}

                    {projet.opportunite_projet && (
                        <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                            <h3 className="font-semibold text-yellow-800 mb-2">🎯 Opportunité du projet</h3>
                            <p className="text-sm text-gray-700 whitespace-pre-wrap">{projet.opportunite_projet}</p>
                        </div>
                    )}

                    {/* SECTION RÉALISATIONS (projet en cours) */}
                    {projet.type_projet === 'en_cours' && (projet.realisation_cumul_n_mins1_total || projet.real_s1_n_total) && (
                        <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                            <h3 className="font-semibold text-purple-800 mb-3">📊 Réalisations</h3>
                            
                            <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-purple-200">
                                <div>
                                    <p className="text-xs text-gray-500">Réalisations Cumulées à fin {anneeBase - 1}</p>
                                    <p className="text-sm font-bold text-purple-700">
                                        {formatCurrency(projet.realisation_cumul_n_mins1_total)}
                                    </p>
                                    {projet.realisation_cumul_n_mins1_dont_dex && (
                                        <p className="text-xs text-orange-600">
                                            Dont Dev: {formatCurrency(projet.realisation_cumul_n_mins1_dont_dex)}
                                        </p>
                                    )}
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="bg-white rounded-lg p-3">
                                    <p className="text-xs text-gray-500">Réalisation S1 {anneeBase}</p>
                                    <p className="text-sm font-bold text-gray-800">{formatCurrency(projet.real_s1_n_total)}</p>
                                    {projet.real_s1_n_dont_dex && (
                                        <p className="text-xs text-orange-600">Dev: {formatCurrency(projet.real_s1_n_dont_dex)}</p>
                                    )}
                                </div>
                                <div className="bg-white rounded-lg p-3">
                                    <p className="text-xs text-gray-500">Prévision S2 {anneeBase}</p>
                                    <p className="text-sm font-bold text-gray-800">{formatCurrency(projet.prev_s2_n_total)}</p>
                                    {projet.prev_s2_n_dont_dex && (
                                        <p className="text-xs text-orange-600">Dev: {formatCurrency(projet.prev_s2_n_dont_dex)}</p>
                                    )}
                                </div>
                            </div>
                            
                            <div className="mt-4 p-3 bg-white rounded-lg border border-purple-200">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-gray-500">Prévision Clôture {anneeBase}</p>
                                        <p className="text-lg font-bold text-purple-800">
                                            {formatCurrency(projet.prev_cloture_n_total)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Dont Dev</p>
                                        <p className="text-lg font-bold text-orange-600">
                                            {formatCurrency(projet.prev_cloture_n_dont_dex)}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-400 mt-2">(Réal. S1 + Prév. S2)</p>
                            </div>
                        </div>
                    )}

                    {/* SECTION PRÉVISIONS MENSUELLES N+1 */}
                    <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                        <h3 className="font-semibold text-amber-800 mb-3">
                             Prévisions de cloture {anneeBase + 1}
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {moisList.map(mois => {
                                const totalValue = projet[`${mois.key}_total`];
                                const devValue = projet[`${mois.key}_dont_dex`];
                                if (!totalValue && !devValue) return null;
                                return (
                                    <div key={mois.key} className="bg-white rounded-lg p-2 shadow-sm">
                                        <p className="text-xs font-semibold text-gray-600">{mois.label}</p>
                                        <p className="text-sm font-bold text-gray-800">
                                            {formatCurrency(totalValue)}
                                        </p>
                                        {devValue && (
                                            <p className="text-xs text-orange-600">
                                                Dev: {formatCurrency(devValue)}
                                            </p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        {totalMensuel() > 0 && (
                            <div className="mt-4 p-3 bg-white rounded-lg">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-gray-500">Total Annuel {anneeBase + 1}</p>
                                        <p className="text-lg font-bold text-green-700">{formatCurrency(totalMensuel())}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* SECTION PRÉVISIONS PLURIANNUELLES */}
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                        <h3 className="font-semibold text-blue-800 mb-3">Rest a realiser </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {projet.prev_n_plus2_total && (
                                <div className="bg-white rounded-lg p-2">
                                    <p className="text-xs text-gray-500">{anneeBase + 2}</p>
                                    <p className="text-sm font-bold text-gray-800">
                                        {formatCurrency(projet.prev_n_plus2_total)}
                                    </p>
                                    {projet.prev_n_plus2_dont_dex && (
                                        <p className="text-xs text-orange-600">Dev: {formatCurrency(projet.prev_n_plus2_dont_dex)}</p>
                                    )}
                                </div>
                            )}
                            {projet.prev_n_plus3_total && (
                                <div className="bg-white rounded-lg p-2">
                                    <p className="text-xs text-gray-500">{anneeBase + 3}</p>
                                    <p className="text-sm font-bold text-gray-800">
                                        {formatCurrency(projet.prev_n_plus3_total)}
                                    </p>
                                    {projet.prev_n_plus3_dont_dex && (
                                        <p className="text-xs text-orange-600">Dev: {formatCurrency(projet.prev_n_plus3_dont_dex)}</p>
                                    )}
                                </div>
                            )}
                            {projet.prev_n_plus4_total && (
                                <div className="bg-white rounded-lg p-2">
                                    <p className="text-xs text-gray-500">{anneeBase + 4}</p>
                                    <p className="text-sm font-bold text-gray-800">
                                        {formatCurrency(projet.prev_n_plus4_total)}
                                    </p>
                                    {projet.prev_n_plus4_dont_dex && (
                                        <p className="text-xs text-orange-600">Dev: {formatCurrency(projet.prev_n_plus4_dont_dex)}</p>
                                    )}
                                </div>
                            )}
                            {projet.prev_n_plus5_total && (
                                <div className="bg-white rounded-lg p-2">
                                    <p className="text-xs text-gray-500">{anneeBase + 5}</p>
                                    <p className="text-sm font-bold text-gray-800">
                                        {formatCurrency(projet.prev_n_plus5_total)}
                                    </p>
                                    {projet.prev_n_plus5_dont_dex && (
                                        <p className="text-xs text-orange-600">Dev: {formatCurrency(projet.prev_n_plus5_dont_dex)}</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* SECTION COÛT GLOBAL */}
                    {((projet.cout_initial_total || totalPrevisionsPluri() + totalMensuel()) > 0) && (
                        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 border border-orange-200">
                            <h3 className="font-semibold text-orange-800 mb-3">💰 Coût Global</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white rounded-lg p-3 text-center">
                                    <p className="text-xs text-gray-500">Coût Global Total</p>
                                    <p className="text-2xl font-bold text-orange-700">
                                        {formatCurrency(projet.cout_initial_total || totalPrevisionsPluri() + totalMensuel())}
                                    </p>
                                </div>
                                {(projet.cout_initial_dont_dex > 0) && (
                                    <div className="bg-white rounded-lg p-3 text-center">
                                        <p className="text-xs text-gray-500">Dont Dev</p>
                                        <p className="text-2xl font-bold text-orange-600">
                                            {formatCurrency(projet.cout_initial_dont_dex)}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

              {/* Pied de page */}
{/* Pied de page - Ordre: Télécharger PDF puis Fermer */}
<div className="flex justify-end gap-3 p-5 border-t border-gray-200 bg-gray-50 rounded-b-xl flex-shrink-0">
    <button
        onClick={() => {
            const projetId = projet._id || projet.id;
            handleDownloadPDF(projetId);
        }}
        disabled={downloading}
        className="px-6 py-2.5 bg-[#FF8500] text-white rounded-full hover:bg-[#e67800] transition flex items-center gap-2 font-medium shadow-md disabled:opacity-50 disabled:cursor-not-waiting"
    >
        {downloading ? (
            <>
                <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Téléchargement...
            </>
        ) : (
            <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Télécharger PDF
            </>
        )}
    </button>
    <button
        onClick={onClose}
        className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition font-medium"
    >
        Fermer
    </button>
</div>
            </div>
        </div>
    );
};

export default DetailsProjetModal;