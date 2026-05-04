// Components/Projets/ModifierProjetModal.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ModifierProjetModal = ({ isOpen, onClose, onSuccess, projet, axiosInstance, userRole = 'responsable_structure' }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        libelle: '',
        description_technique: '',
        opportunite_projet: '',
        version_comment: '',
        // Prévisions pluriannuelles
        prev_n_plus2_total: '',
        prev_n_plus2_dont_dex: '',
        prev_n_plus3_total: '',
        prev_n_plus3_dont_dex: '',
        prev_n_plus4_total: '',
        prev_n_plus4_dont_dex: '',
        prev_n_plus5_total: '',
        prev_n_plus5_dont_dex: '',
        // Mensuel N+1
        janvier_total: '', janvier_dont_dex: '',
        fevrier_total: '', fevrier_dont_dex: '',
        mars_total: '', mars_dont_dex: '',
        avril_total: '', avril_dont_dex: '',
        mai_total: '', mai_dont_dex: '',
        juin_total: '', juin_dont_dex: '',
        juillet_total: '', juillet_dont_dex: '',
        aout_total: '', aout_dont_dex: '',
        septembre_total: '', septembre_dont_dex: '',
        octobre_total: '', octobre_dont_dex: '',
        novembre_total: '', novembre_dont_dex: '',
        decembre_total: '', decembre_dont_dex: '',
        // Réalisations
        realisation_cumul_n_mins1_total: '',
        realisation_cumul_n_mins1_dont_dex: '',
        real_s1_n_total: '',
        real_s1_n_dont_dex: '',
        prev_s2_n_total: '',
        prev_s2_n_dont_dex: '',
    });

    // Déterminer l'endpoint selon le rôle
    const getEndpoint = () => {
        if (userRole === 'responsable_structure') {
            return `/recap/budget/structure/patch-projet/${projet?.code_division}/`;
        } else if (userRole === 'responsable_departement') {
            return `/recap/budget/departement/patch-projet/${projet?.code_division}/`;
        }
        return null;
    };

    // Liste des mois
    const moisList = [
        { key: 'janvier', label: 'Janvier' }, { key: 'fevrier', label: 'Février' },
        { key: 'mars', label: 'Mars' }, { key: 'avril', label: 'Avril' },
        { key: 'mai', label: 'Mai' }, { key: 'juin', label: 'Juin' },
        { key: 'juillet', label: 'Juillet' }, { key: 'aout', label: 'Août' },
        { key: 'septembre', label: 'Septembre' }, { key: 'octobre', label: 'Octobre' },
        { key: 'novembre', label: 'Novembre' }, { key: 'decembre', label: 'Décembre' },
    ];

    useEffect(() => {
        if (isOpen && projet) {
            loadProjetData();
        }
    }, [isOpen, projet]);

    const loadProjetData = () => {
        if (!projet) return;
        
        // Calculer l'année de base pour les prévisions
        const anneeDebut = projet.annee_debut_pmt ? parseInt(projet.annee_debut_pmt) : new Date().getFullYear();
        const N = anneeDebut - 1;
        
        setFormData({
            libelle: projet.libelle || '',
            description_technique: projet.description_technique || '',
            opportunite_projet: projet.opportunite_projet || '',
            version_comment: projet.version_comment || '',
            prev_n_plus2_total: projet.prev_n_plus2_total || '',
            prev_n_plus2_dont_dex: projet.prev_n_plus2_dont_dex || '',
            prev_n_plus3_total: projet.prev_n_plus3_total || '',
            prev_n_plus3_dont_dex: projet.prev_n_plus3_dont_dex || '',
            prev_n_plus4_total: projet.prev_n_plus4_total || '',
            prev_n_plus4_dont_dex: projet.prev_n_plus4_dont_dex || '',
            prev_n_plus5_total: projet.prev_n_plus5_total || '',
            prev_n_plus5_dont_dex: projet.prev_n_plus5_dont_dex || '',
            janvier_total: projet.janvier_total || '', janvier_dont_dex: projet.janvier_dont_dex || '',
            fevrier_total: projet.fevrier_total || '', fevrier_dont_dex: projet.fevrier_dont_dex || '',
            mars_total: projet.mars_total || '', mars_dont_dex: projet.mars_dont_dex || '',
            avril_total: projet.avril_total || '', avril_dont_dex: projet.avril_dont_dex || '',
            mai_total: projet.mai_total || '', mai_dont_dex: projet.mai_dont_dex || '',
            juin_total: projet.juin_total || '', juin_dont_dex: projet.juin_dont_dex || '',
            juillet_total: projet.juillet_total || '', juillet_dont_dex: projet.juillet_dont_dex || '',
            aout_total: projet.aout_total || '', aout_dont_dex: projet.aout_dont_dex || '',
            septembre_total: projet.septembre_total || '', septembre_dont_dex: projet.septembre_dont_dex || '',
            octobre_total: projet.octobre_total || '', octobre_dont_dex: projet.octobre_dont_dex || '',
            novembre_total: projet.novembre_total || '', novembre_dont_dex: projet.novembre_dont_dex || '',
            decembre_total: projet.decembre_total || '', decembre_dont_dex: projet.decembre_dont_dex || '',
            realisation_cumul_n_mins1_total: projet.realisation_cumul_n_mins1_total || '',
            realisation_cumul_n_mins1_dont_dex: projet.realisation_cumul_n_mins1_dont_dex || '',
            real_s1_n_total: projet.real_s1_n_total || '',
            real_s1_n_dont_dex: projet.real_s1_n_dont_dex || '',
            prev_s2_n_total: projet.prev_s2_n_total || '',
            prev_s2_n_dont_dex: projet.prev_s2_n_dont_dex || '',
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError('');
        
        // Construire le payload avec seulement les champs modifiés et non vides
        const payload = {};
        for (const [key, value] of Object.entries(formData)) {
            if (value !== '' && value !== null && value !== undefined) {
                // Convertir les nombres
                if (key.includes('_total') || key.includes('_dont_dex')) {
                    payload[key] = parseFloat(value) || 0;
                } else {
                    payload[key] = value;
                }
            }
        }
        
        const endpoint = getEndpoint();
        if (!endpoint) {
            setError("Endpoint non trouvé pour ce rôle");
            setLoading(false);
            return;
        }
        
        try {
            const response = await axiosInstance.patch(endpoint, payload);
            
            if (response.data.success) {
                setSuccess(true);
                if (onSuccess) onSuccess(response.data.message || 'Projet modifié avec succès');
                setTimeout(() => {
                    onClose();
                }, 1500);
            } else {
                setError(response.data.error || "Erreur lors de la modification");
            }
        } catch (err) {
            console.error("Erreur modification:", err);
            const errData = err.response?.data;
            if (errData?.error) {
                setError(errData.error);
            } else if (errData?.detail) {
                setError(errData.detail);
            } else {
                setError("Erreur lors de la modification du projet");
            }
        } finally {
            setLoading(false);
        }
    };

    // Calculer les années pour l'affichage
    const anneeDebut = projet?.annee_debut_pmt ? parseInt(projet.annee_debut_pmt) : new Date().getFullYear();
    const N = anneeDebut - 1;
    const anneeFin = projet?.annee_fin_pmt ? parseInt(projet.annee_fin_pmt) : N + 5;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-[900px] max-h-[90vh] flex flex-col bg-white shadow-2xl rounded-2xl overflow-hidden"
            >
                {/* En-tête */}
                <div className="px-6 pt-5 pb-4 border-b border-gray-100 bg-white">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">
                                Modifier le projet - {userRole === 'responsable_structure' ? 'Responsable Structure' : 'Responsable Département'}
                            </h2>
                            <p className="text-xs text-gray-500 mt-1">
                                Code: {projet?.code_division} | Statut actuel: <span className="text-orange-600 font-medium">Soumis</span>
                            </p>
                            <p className="text-xs text-orange-600 mt-1">
                                ⚠️ Seuls les champs modifiables sont affichés (statut "soumis" requis)
                            </p>
                        </div>
                        <button 
                            onClick={onClose} 
                            className="p-1.5 hover:bg-gray-100 rounded-full transition"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M18 6L6 18M6 6L18 18" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Corps avec scroll */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
                            ❌ {error}
                        </div>
                    )}
                    {success && (
                        <div className="p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl">
                            ✅ Projet modifié avec succès !
                        </div>
                    )}

                    {/* Informations générales */}
                    <div className="bg-gray-50 rounded-xl p-4">
                        <h3 className="font-semibold text-gray-800 mb-3">Informations générales</h3>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Libellé du projet</label>
                                <input
                                    type="text"
                                    name="libelle"
                                    value={formData.libelle}
                                    onChange={handleInputChange}
                                    className="w-full h-10 px-3 rounded-[20px] border border-gray-300 outline-none focus:border-orange-400"
                                    placeholder="Libellé du projet"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description technique</label>
                                <textarea
                                    name="description_technique"
                                    value={formData.description_technique}
                                    onChange={handleInputChange}
                                    rows="3"
                                    className="w-full px-3 py-2 rounded-2xl border border-gray-300 outline-none resize-none focus:border-orange-400"
                                    placeholder="Description technique du projet"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Opportunité du projet</label>
                                <textarea
                                    name="opportunite_projet"
                                    value={formData.opportunite_projet}
                                    onChange={handleInputChange}
                                    rows="2"
                                    className="w-full px-3 py-2 rounded-2xl border border-gray-300 outline-none resize-none focus:border-orange-400"
                                    placeholder="Opportunité du projet"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Commentaire de version (optionnel)</label>
                                <input
                                    type="text"
                                    name="version_comment"
                                    value={formData.version_comment}
                                    onChange={handleInputChange}
                                    className="w-full h-10 px-3 rounded-[20px] border border-gray-300 outline-none focus:border-orange-400"
                                    placeholder="Raison de la modification..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Données budgétaires - Réalisations */}
                    <div className="bg-gray-50 rounded-xl p-4">
                        <h3 className="font-semibold text-gray-800 mb-3">📊 Réalisations</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Réalisations Cumulées à fin {N-1}
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    <input
                                        type="number"
                                        name="realisation_cumul_n_mins1_total"
                                        value={formData.realisation_cumul_n_mins1_total}
                                        onChange={handleInputChange}
                                        placeholder="Total"
                                        className="w-full h-8 px-2 rounded-[20px] border border-gray-300 outline-none text-sm"
                                    />
                                    <input
                                        type="number"
                                        name="realisation_cumul_n_mins1_dont_dex"
                                        value={formData.realisation_cumul_n_mins1_dont_dex}
                                        onChange={handleInputChange}
                                        placeholder="Dont DEV"
                                        className="w-full h-8 px-2 rounded-[20px] border border-gray-300 outline-none text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Réalisation S1 {N}
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    <input
                                        type="number"
                                        name="real_s1_n_total"
                                        value={formData.real_s1_n_total}
                                        onChange={handleInputChange}
                                        placeholder="Total"
                                        className="w-full h-8 px-2 rounded-[20px] border border-gray-300 outline-none text-sm"
                                    />
                                    <input
                                        type="number"
                                        name="real_s1_n_dont_dex"
                                        value={formData.real_s1_n_dont_dex}
                                        onChange={handleInputChange}
                                        placeholder="Dont DEV"
                                        className="w-full h-8 px-2 rounded-[20px] border border-gray-300 outline-none text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Prévision S2 {N}
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    <input
                                        type="number"
                                        name="prev_s2_n_total"
                                        value={formData.prev_s2_n_total}
                                        onChange={handleInputChange}
                                        placeholder="Total"
                                        className="w-full h-8 px-2 rounded-[20px] border border-gray-300 outline-none text-sm"
                                    />
                                    <input
                                        type="number"
                                        name="prev_s2_n_dont_dex"
                                        value={formData.prev_s2_n_dont_dex}
                                        onChange={handleInputChange}
                                        placeholder="Dont DEV"
                                        className="w-full h-8 px-2 rounded-[20px] border border-gray-300 outline-none text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Prévisions pluriannuelles */}
                    <div className="bg-gray-50 rounded-xl p-4">
                        <h3 className="font-semibold text-gray-800 mb-3">📈 Prévisions pluriannuelles</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700">Prévisions {N+2}</label>
                                <div className="grid grid-cols-2 gap-2 mt-1">
                                    <input
                                        type="number"
                                        name="prev_n_plus2_total"
                                        value={formData.prev_n_plus2_total}
                                        onChange={handleInputChange}
                                        placeholder="Total"
                                        className="w-full h-8 px-2 rounded-[20px] border border-gray-300 outline-none text-sm"
                                    />
                                    <input
                                        type="number"
                                        name="prev_n_plus2_dont_dex"
                                        value={formData.prev_n_plus2_dont_dex}
                                        onChange={handleInputChange}
                                        placeholder="Dont DEV"
                                        className="w-full h-8 px-2 rounded-[20px] border border-gray-300 outline-none text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Prévisions {N+3}</label>
                                <div className="grid grid-cols-2 gap-2 mt-1">
                                    <input
                                        type="number"
                                        name="prev_n_plus3_total"
                                        value={formData.prev_n_plus3_total}
                                        onChange={handleInputChange}
                                        placeholder="Total"
                                        className="w-full h-8 px-2 rounded-[20px] border border-gray-300 outline-none text-sm"
                                    />
                                    <input
                                        type="number"
                                        name="prev_n_plus3_dont_dex"
                                        value={formData.prev_n_plus3_dont_dex}
                                        onChange={handleInputChange}
                                        placeholder="Dont DEV"
                                        className="w-full h-8 px-2 rounded-[20px] border border-gray-300 outline-none text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Prévisions {N+4}</label>
                                <div className="grid grid-cols-2 gap-2 mt-1">
                                    <input
                                        type="number"
                                        name="prev_n_plus4_total"
                                        value={formData.prev_n_plus4_total}
                                        onChange={handleInputChange}
                                        placeholder="Total"
                                        className="w-full h-8 px-2 rounded-[20px] border border-gray-300 outline-none text-sm"
                                    />
                                    <input
                                        type="number"
                                        name="prev_n_plus4_dont_dex"
                                        value={formData.prev_n_plus4_dont_dex}
                                        onChange={handleInputChange}
                                        placeholder="Dont DEV"
                                        className="w-full h-8 px-2 rounded-[20px] border border-gray-300 outline-none text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Prévisions {N+5}</label>
                                <div className="grid grid-cols-2 gap-2 mt-1">
                                    <input
                                        type="number"
                                        name="prev_n_plus5_total"
                                        value={formData.prev_n_plus5_total}
                                        onChange={handleInputChange}
                                        placeholder="Total"
                                        className="w-full h-8 px-2 rounded-[20px] border border-gray-300 outline-none text-sm"
                                    />
                                    <input
                                        type="number"
                                        name="prev_n_plus5_dont_dex"
                                        value={formData.prev_n_plus5_dont_dex}
                                        onChange={handleInputChange}
                                        placeholder="Dont DEV"
                                        className="w-full h-8 px-2 rounded-[20px] border border-gray-300 outline-none text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Répartition mensuelle N+1 */}
                    <div className="bg-gray-50 rounded-xl p-4">
                        <h3 className="font-semibold text-gray-800 mb-3">📅 Répartition mensuelle — Prévisions {N+1}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {moisList.map(mois => (
                                <div key={mois.key} className="border border-gray-200 rounded-lg p-2">
                                    <label className="text-xs font-semibold text-gray-600">{mois.label}</label>
                                    <div className="space-y-1 mt-1">
                                        <input
                                            type="number"
                                            name={`${mois.key}_total`}
                                            value={formData[`${mois.key}_total`]}
                                            onChange={handleInputChange}
                                            placeholder="Total"
                                            className="w-full h-7 px-2 rounded-[20px] border border-gray-200 outline-none text-xs"
                                        />
                                        <input
                                            type="number"
                                            name={`${mois.key}_dont_dex`}
                                            value={formData[`${mois.key}_dont_dex`]}
                                            onChange={handleInputChange}
                                            placeholder="Dont DEV"
                                            className="w-full h-7 px-2 rounded-[20px] border border-gray-200 outline-none text-xs"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Pied de page */}
                <div className="border-t border-gray-100 px-6 py-4 bg-white flex justify-between items-center">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition text-sm font-medium"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading || success}
                        className="px-6 py-2 bg-[#FF8500] text-white rounded-full hover:bg-[#e67800] transition disabled:opacity-50 flex items-center gap-2 text-sm font-medium shadow-md shadow-orange-200"
                    >
                        {loading && (
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                        )}
                        {loading ? 'Enregistrement...' : '✓ Enregistrer les modifications'}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default ModifierProjetModal;