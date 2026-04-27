// Components/Projets/DetailsProjetModal.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { axiosInstance } from '../../../../axios';

const DetailsProjetModal = ({ isOpen, onClose, projet, axiosInstance: customAxiosInstance }) => {
    const axiosInst = customAxiosInstance || axiosInstance;

    if (!isOpen || !projet) return null;

    const formatCurrency = (value) => {
        if (!value && value !== 0) return '0 DA';
        const num = parseFloat(value);
        if (isNaN(num)) return '0 DA';
        return new Intl.NumberFormat('fr-DZ').format(num) + ' DA';
    };

    const handleDownloadPDF = async (projetId) => {
        try {
            const response = await axiosInst.get(`/recap/export/pdf/${projetId}/`, {
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `projet_${projet.code_division}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Erreur téléchargement PDF:", err);
        }
    };

    const CloseIcon = () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
        </svg>
    );

    const DownloadIcon = () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
    );

    // Déterminer l'année de base
    const anneeBase = parseInt(projet.annee_debut_pmt) || new Date().getFullYear();
    const anneeFin = projet.annee_fin_pmt || anneeBase + 4;
    const N = anneeBase - 1;
    const N_plus_1 = N + 1;
    const N_plus_2 = N + 2;
    const N_plus_3 = N + 3;
    const N_plus_4 = N + 4;
    const N_plus_5 = N + 5;

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, y: 30 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.95, y: 30 }}
                        className="w-[900px] max-h-[90vh] bg-white shadow-2xl rounded-xl flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center p-5 border-b border-gray-200 bg-white rounded-t-xl flex-shrink-0">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">{projet.libelle || 'Projet'}</h2>
                                <p className="text-xs text-gray-400 mt-0.5">Code: {projet.code_division}</p>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition">
                                <CloseIcon />
                            </button>
                        </div>

                        {/* Contenu - Scrollable */}
                        <div className="flex-1 overflow-y-auto p-6">
                            <div className="space-y-6">
                                
                                {/* Informations générales */}
                                <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                        <span className="w-1 h-6 bg-[#FF8500] rounded-full"></span>
                                        Informations générales
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white rounded-xl p-3 border border-gray-100">
                                            <span className="text-xs text-gray-400 block">N°Cpte  Analy</span>
                                            <p className="font-mono font-medium text-gray-800 mt-1">{projet.code_division || '-'}</p>
                                        </div>
                                        <div className="bg-white rounded-xl p-3 border border-gray-100">
                                            <span className="text-xs text-gray-400 block">Libellé</span>
                                            <p className="font-medium text-gray-800 mt-1">{projet.libelle || '-'}</p>
                                        </div>
                                        <div className="bg-white rounded-xl p-3 border border-gray-100">
                                            <span className="text-xs text-gray-400 block">Type de projet</span>
                                            <p className="font-medium text-gray-800 mt-1">
                                                {projet.type_projet === 'nouveau' ? '🆕 Nouveau projet' : '🔄 Projet en cours'}
                                            </p>
                                        </div>
                                        <div className="bg-white rounded-xl p-3 border border-gray-100">
                                            <span className="text-xs text-gray-400 block">Statut</span>
                                            <p className="font-medium text-gray-800 mt-1">{projet.statut || '-'}</p>
                                        </div>
                                        <div className="bg-white rounded-xl p-3 border border-gray-100">
                                            <span className="text-xs text-gray-400 block">Région</span>
                                            <p className="font-medium text-gray-800 mt-1">{projet.region_nom || projet.region || '-'}</p>
                                        </div>
                                        <div className="bg-white rounded-xl p-3 border border-gray-100">
                                            <span className="text-xs text-gray-400 block">Famille</span>
                                            <p className="font-medium text-gray-800 mt-1">{projet.famille_nom || projet.famille || '-'}</p>
                                        </div>
                                        <div className="bg-white rounded-xl p-3 border border-gray-100">
                                            <span className="text-xs text-gray-400 block">Périmètre</span>
                                            <p className="font-medium text-gray-800 mt-1">{projet.perm || projet.perimetre || '-'}</p>
                                        </div>
                                        <div className="bg-white rounded-xl p-3 border border-gray-100">
                                            <span className="text-xs text-gray-400 block">Activité</span>
                                            <p className="font-medium text-gray-800 mt-1">{projet.activite_nom || projet.activite || '-'}</p>
                                        </div>
                                        <div className="bg-white rounded-xl p-3 border border-gray-100">
                                            <span className="text-xs text-gray-400 block">Période PMT</span>
                                            <p className="font-medium text-gray-800 mt-1">{anneeBase} - {anneeFin}</p>
                                        </div>
                                        <div className="bg-white rounded-xl p-3 border border-gray-100">
                                            <span className="text-xs text-gray-400 block">Version</span>
                                            <p className="font-medium text-gray-800 mt-1">v{projet.version || 1}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Descriptions */}
                                {(projet.description_technique || projet.opportunite_projet) && (
                                    <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                                        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                            <span className="w-1 h-6 bg-[#FF8500] rounded-full"></span>
                                            Descriptions
                                        </h3>
                                        <div className="space-y-3">
                                            {projet.description_technique && (
                                                <div className="bg-white rounded-xl p-3 border border-gray-100">
                                                    <span className="text-xs text-gray-400 block">Description technique</span>
                                                    <p className="text-sm text-gray-700 mt-1">{projet.description_technique}</p>
                                                </div>
                                            )}
                                            {projet.opportunite_projet && (
                                                <div className="bg-white rounded-xl p-3 border border-gray-100">
                                                    <span className="text-xs text-gray-400 block">Opportunité du projet</span>
                                                    <p className="text-sm text-gray-700 mt-1">{projet.opportunite_projet}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Données budgétaires */}
                                <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                        <span className="w-1 h-6 bg-[#FF8500] rounded-full"></span>
                                        Données budgétaires
                                    </h3>
                                    <div className="space-y-4">
                                        {/* Coût Global Initial PMT */}
                                        <div className="bg-white rounded-xl p-3 border border-gray-100">
                                            <span className="text-xs text-gray-400 block">Coût Global Initial PMT {anneeBase}/{anneeFin}</span>
                                            <p className="font-bold text-[#FF8500] text-lg mt-1">{formatCurrency(projet.cout_initial_total)}</p>
                                            <p className="text-xs text-gray-500 mt-0.5">Dont DEV : {formatCurrency(projet.cout_initial_dont_dex)}</p>
                                        </div>

                                        {/* Réalisations Cumulées à fin N */}
                                        <div className="bg-white rounded-xl p-3 border border-gray-100">
                                            <span className="text-xs text-gray-400 block">Réalisations Cumulées à fin {N-1} au coût réel</span>
                                            <p className="font-medium text-gray-700 mt-1">{formatCurrency(projet.realisation_cumul_n_mins1_total)}</p>
                                            <p className="text-xs text-gray-500 mt-0.5">Dont DEV : {formatCurrency(projet.realisation_cumul_n_mins1_dont_dex)}</p>
                                        </div>

                                        {/* Réalisation S1 et Prévision S2 côte à côte */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-white rounded-xl p-3 border border-gray-100">
                                                <span className="text-xs text-gray-400 block">Réalisation S1</span>
                                                <p className="font-medium text-gray-700 mt-1">{formatCurrency(projet.real_s1_n_total)}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">Dont DEV : {formatCurrency(projet.real_s1_n_dont_dex)}</p>
                                            </div>
                                            <div className="bg-white rounded-xl p-3 border border-gray-100">
                                                <span className="text-xs text-gray-400 block">Prévision S2</span>
                                                <p className="font-medium text-gray-700 mt-1">{formatCurrency(projet.prev_s2_n_total)}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">Dont DEV : {formatCurrency(projet.prev_s2_n_dont_dex)}</p>
                                            </div>
                                        </div>

                                        {/* Prévisions de Clôture N */}
                                        <div className="bg-white rounded-xl p-3 border border-gray-100">
                                            <span className="text-xs text-gray-400 block">Prévisions de Clôture {N}</span>
                                            <p className="font-medium text-gray-700 mt-1">{formatCurrency(projet.prev_cloture_n_total)}</p>
                                            <p className="text-xs text-gray-500 mt-0.5">Dont DEV : {formatCurrency(projet.prev_cloture_n_dont_dex)}</p>
                                        </div>

                                        {/* Prévisions N+1 */}
                                        <div className="bg-white rounded-xl p-3 border border-gray-100">
                                            <span className="text-xs text-gray-400 block">Prévisions {N_plus_1}</span>
                                            <p className="font-medium text-gray-700 mt-1">{formatCurrency(projet.prev_n_plus1_total)}</p>
                                            <p className="text-xs text-gray-500 mt-0.5">Dont DEV : {formatCurrency(projet.prev_n_plus1_dont_dex)}</p>
                                        </div>

                                        {/* Reste à Réaliser */}
                                        <div className="bg-white rounded-xl p-3 border border-gray-100">
                                            <span className="text-xs text-gray-400 block">Reste à Réaliser {N_plus_2}/{anneeFin}</span>
                                            <p className="font-bold text-red-500 text-lg mt-1">{formatCurrency(projet.reste_a_realiser_total)}</p>
                                            <p className="text-xs text-gray-500 mt-0.5">Dont DEV : {formatCurrency(projet.reste_a_realiser_dont_dex)}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Prévisions pluriannuelles */}
                                <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                        <span className="w-1 h-6 bg-[#FF8500] rounded-full"></span>
                                        Prévisions pluriannuelles
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white rounded-xl p-3 text-center border border-gray-100">
                                            <span className="text-xs text-gray-400 block">Prévisions {N_plus_2}</span>
                                            <p className="font-semibold text-gray-800 mt-1">{formatCurrency(projet.prev_n_plus2_total)}</p>
                                            <p className="text-xs text-gray-500">DEV : {formatCurrency(projet.prev_n_plus2_dont_dex)}</p>
                                        </div>
                                        <div className="bg-white rounded-xl p-3 text-center border border-gray-100">
                                            <span className="text-xs text-gray-400 block">Prévisions {N_plus_3}</span>
                                            <p className="font-semibold text-gray-800 mt-1">{formatCurrency(projet.prev_n_plus3_total)}</p>
                                            <p className="text-xs text-gray-500">DEV : {formatCurrency(projet.prev_n_plus3_dont_dex)}</p>
                                        </div>
                                        <div className="bg-white rounded-xl p-3 text-center border border-gray-100">
                                            <span className="text-xs text-gray-400 block">Prévisions {N_plus_4}</span>
                                            <p className="font-semibold text-gray-800 mt-1">{formatCurrency(projet.prev_n_plus4_total)}</p>
                                            <p className="text-xs text-gray-500">DEV : {formatCurrency(projet.prev_n_plus4_dont_dex)}</p>
                                        </div>
                                        <div className="bg-white rounded-xl p-3 text-center border border-gray-100">
                                            <span className="text-xs text-gray-400 block">Prévisions {N_plus_5}</span>
                                            <p className="font-semibold text-gray-800 mt-1">{formatCurrency(projet.prev_n_plus5_total)}</p>
                                            <p className="text-xs text-gray-500">DEV : {formatCurrency(projet.prev_n_plus5_dont_dex)}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Répartition mensuelle */}
                                <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                        <span className="w-1 h-6 bg-[#FF8500] rounded-full"></span>
                                        Répartition mensuelle — Prévisions {N_plus_1}
                                    </h3>
                                    <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-3">
                                        {[
                                            { mois: 'Jan', total: projet.janvier_total, dex: projet.janvier_dont_dex },
                                            { mois: 'Fév', total: projet.fevrier_total, dex: projet.fevrier_dont_dex },
                                            { mois: 'Mar', total: projet.mars_total, dex: projet.mars_dont_dex },
                                            { mois: 'Avr', total: projet.avril_total, dex: projet.avril_dont_dex },
                                            { mois: 'Mai', total: projet.mai_total, dex: projet.mai_dont_dex },
                                            { mois: 'Juin', total: projet.juin_total, dex: projet.juin_dont_dex },
                                            { mois: 'Juil', total: projet.juillet_total, dex: projet.juillet_dont_dex },
                                            { mois: 'Aoû', total: projet.aout_total, dex: projet.aout_dont_dex },
                                            { mois: 'Sep', total: projet.septembre_total, dex: projet.septembre_dont_dex },
                                            { mois: 'Oct', total: projet.octobre_total, dex: projet.octobre_dont_dex },
                                            { mois: 'Nov', total: projet.novembre_total, dex: projet.novembre_dont_dex },
                                            { mois: 'Déc', total: projet.decembre_total, dex: projet.decembre_dont_dex },
                                        ].map((item, idx) => (
                                            <div key={idx} className="bg-white rounded-xl p-2 text-center border border-gray-100 hover:shadow-md transition">
                                                <span className="text-xs font-semibold text-gray-500 block">{item.mois}</span>
                                                <p className="text-sm font-medium text-gray-800 mt-1">{formatCurrency(item.total)}</p>
                                                <p className="text-xs text-orange-500 mt-0.5">{formatCurrency(item.dex)}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-end gap-3 p-5 border-t border-gray-200 bg-gray-50 rounded-b-xl flex-shrink-0">
                            <button
                                onClick={onClose}
                                className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition font-medium"
                            >
                                Fermer
                            </button>
                            <button
                                onClick={() => handleDownloadPDF(projet.id)}
                                className="px-6 py-2.5 bg-[#FF8500] text-white rounded-full hover:bg-[#e67800] transition flex items-center gap-2 font-medium shadow-md"
                            >
                                <DownloadIcon />
                                Télécharger PDF
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default DetailsProjetModal;