// Components/Projets/ModifierProjetAdminModal.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { axiosInstance } from '../../../../axios';

const ModifierProjetAdminModal = ({ isOpen, onClose, onSuccess, projet, axiosInstance: customAxiosInstance }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [regions, setRegions] = useState([]);
    const [perimetres, setPerimetres] = useState([]);
    const [familles, setFamilles] = useState([]);
    const [selectedRegionCode, setSelectedRegionCode] = useState('');
    const [formData, setFormData] = useState({
        code_division: '',
        libelle: '',
        region: '',
        perimetre: '',
        famille: '',
        activite: '',
        annee_debut_pmt: '',
        annee_fin_pmt: '',
        description_technique: '',
        opportunite_projet: '',
        type_projet: '',
        // Prévisions
        prev_n_plus2_total: '',
        prev_n_plus2_dont_dex: '',
        prev_n_plus3_total: '',
        prev_n_plus3_dont_dex: '',
        prev_n_plus4_total: '',
        prev_n_plus4_dont_dex: '',
        prev_n_plus5_total: '',
        prev_n_plus5_dont_dex: '',
        // Mensuel
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

    const axiosInst = customAxiosInstance || axiosInstance;
    const activites = [
        { code: 'PETROLE', nom: 'Pétrole' },
        { code: 'GAZ', nom: 'Gaz' },
        { code: 'PETROLE_GAZ', nom: 'Pétrole & Gaz' }
    ];

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
            fetchRegions();
        }
    }, [isOpen, projet]);

    // Charger les régions
    const fetchRegions = async () => {
        try {
            const response = await axiosInst.get('/params/regions');
            setRegions(response.data.data || []);
        } catch (err) {
            console.error("Erreur chargement régions:", err);
        }
    };

    // Charger les périmètres quand la région change
    const fetchPerimetres = async (regionCode) => {
        if (!regionCode) {
            setPerimetres([]);
            return;
        }
        try {
            const response = await axiosInst.get(`/params/perimetres/by-region-code/${regionCode}`);
            setPerimetres(response.data.data || []);
        } catch (err) {
            console.error("Erreur chargement périmètres:", err);
            setPerimetres([]);
        }
    };

    // Charger les familles quand le périmètre change
    const fetchFamilles = async (regionCode, perimetreCode) => {
        if (!regionCode || !perimetreCode) {
            setFamilles([]);
            return;
        }
        try {
            const response = await axiosInst.get(`/params/familles/by-region-perimetre/${regionCode}/${perimetreCode}`);
            setFamilles(response.data.data || []);
        } catch (err) {
            console.error("Erreur chargement familles:", err);
            setFamilles([]);
        }
    };

    const loadProjetData = () => {
        if (!projet) return;
        
        const regionCode = projet.region || '';
        const perimetreCode = projet.perm || projet.perimetre || '';
        const familleCode = projet.famille || '';
        
        setSelectedRegionCode(regionCode);
        
        setFormData({
            code_division: projet.code_division || '',
            libelle: projet.libelle || '',
            region: regionCode,
            perimetre: perimetreCode,
            famille: familleCode,
            activite: projet.activite || '',
            annee_debut_pmt: projet.annee_debut_pmt || '',
            annee_fin_pmt: projet.annee_fin_pmt || '',
            description_technique: projet.description_technique || '',
            opportunite_projet: projet.opportunite_projet || '',
            type_projet: projet.type_projet || '',
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
        
        // Charger les listes déroulantes
        if (regionCode) {
            fetchPerimetres(regionCode);
            if (perimetreCode) {
                fetchFamilles(regionCode, perimetreCode);
            }
        }
    };

    const handleRegionChange = (e) => {
        const regionCode = e.target.value;
        setSelectedRegionCode(regionCode);
        setFormData(prev => ({ 
            ...prev, 
            region: regionCode,
            perimetre: '',
            famille: ''
        }));
        setPerimetres([]);
        setFamilles([]);
        if (regionCode) {
            fetchPerimetres(regionCode);
        }
    };

    const handlePerimetreChange = (e) => {
        const perimetreCode = e.target.value;
        setFormData(prev => ({ 
            ...prev, 
            perimetre: perimetreCode,
            famille: ''
        }));
        setFamilles([]);
        if (selectedRegionCode && perimetreCode) {
            fetchFamilles(selectedRegionCode, perimetreCode);
        }
    };

    const handleFamilleChange = (e) => {
        const familleCode = e.target.value;
        setFormData(prev => ({ ...prev, famille: familleCode }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError('');
        
        // Construire le payload avec seulement les champs modifiés
        const payload = {};
        for (const [key, value] of Object.entries(formData)) {
            if (value !== '' && value !== null && value !== undefined) {
                payload[key] = value;
            }
        }
        
        try {
            const response = await axiosInst.patch(
                `/recap/budget/admin/patch-projet/${projet.code_division}/`,
                payload
            );
            
            if (response.data.success) {
                setSuccess(true);
                console.log(response.data);
                if (onSuccess) onSuccess('Projet modifié avec succès');
                setTimeout(() => {
                    onClose();
                }, 1500);
            }
        } catch (err) {
            console.error("Erreur:", err);
            const errData = err.response?.data;
            setError(errData?.error || errData?.message || "Erreur lors de la modification");
        } finally {
            setLoading(false);
        }
    };

    // Calculer les années pour l'affichage
    const anneeDebut = formData.annee_debut_pmt || new Date().getFullYear();
    const N = anneeDebut - 1;
    const N_plus_1 = N + 1;
    const N_plus_2 = N + 2;
    const N_plus_3 = N + 3;
    const N_plus_4 = N + 4;
    const N_plus_5 = N + 5;
    const anneeFin = formData.annee_fin_pmt || N_plus_5;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="w-[800px] max-h-[90vh] flex flex-col bg-white shadow-2xl rounded-2xl overflow-hidden">
                {/* En-tête */}
                <div className="px-6 pt-5 pb-4 border-b border-gray-100 bg-white">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-bold text-gray-900">Modifier le projet - Admin</h2>
                        <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-full transition">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M18 6L6 18M6 6L18 18" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Code: {projet?.code_division}</p>
                </div>

                {/* Corps */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
                            {error}
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
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">N°Cpte  Analy</label>
                                <input
                                    type="text"
                                    name="code_division"
                                    value={formData.code_division}
                                    onChange={handleInputChange}
                                    className="w-full h-10 px-3 rounded-[20px] border border-gray-300 outline-none focus:border-orange-400"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Libellé</label>
                                <input
                                    type="text"
                                    name="libelle"
                                    value={formData.libelle}
                                    onChange={handleInputChange}
                                    className="w-full h-10 px-3 rounded-[20px] border border-gray-300 outline-none focus:border-orange-400"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Région</label>
                                <select
                                    name="region"
                                    value={formData.region}
                                    onChange={handleRegionChange}
                                    className="w-full h-10 px-3 rounded-[20px] border border-gray-300 outline-none focus:border-orange-400"
                                >
                                    <option value="">Sélectionner une région</option>
                                    {regions.map(r => (
                                        <option key={r.code_region} value={r.code_region}>
                                            {r.nom_region}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Famille</label>
                                <select
                                    name="famille"
                                    value={formData.famille}
                                    onChange={handleFamilleChange}
                                    disabled={!formData.perimetre}
                                    className="w-full h-10 px-3 rounded-[20px] border border-gray-300 outline-none focus:border-orange-400 disabled:bg-gray-100"
                                >
                                    <option value="">Sélectionner une famille</option>
                                    {familles.map(f => (
                                        <option key={f.code_famille} value={f.code_famille}>
                                            {f.nom_famille}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Périmètre</label>
                                <select
                                    name="perimetre"
                                    value={formData.perimetre}
                                    onChange={handlePerimetreChange}
                                    disabled={!formData.region}
                                    className="w-full h-10 px-3 rounded-[20px] border border-gray-300 outline-none focus:border-orange-400 disabled:bg-gray-100"
                                >
                                    <option value="">Sélectionner un périmètre</option>
                                    {perimetres.map(p => (
                                        <option key={p.code_perimetre} value={p.code_perimetre}>
                                            {p.nom_perimetre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Activité</label>
                                <select
                                    name="activite"
                                    value={formData.activite}
                                    onChange={handleInputChange}
                                    className="w-full h-10 px-3 rounded-[20px] border border-gray-300 outline-none focus:border-orange-400"
                                >
                                    <option value="">Sélectionner</option>
                                    {activites.map(a => (
                                        <option key={a.code} value={a.code}>{a.nom}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Type projet</label>
                                <select
                                    name="type_projet"
                                    value={formData.type_projet}
                                    onChange={handleInputChange}
                                    className="w-full h-10 px-3 rounded-[20px] border border-gray-300 outline-none focus:border-orange-400"
                                >
                                    <option value="nouveau">Nouveau projet</option>
                                    <option value="en_cours">Projet en cours</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Période PMT</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <input
                                        type="number"
                                        name="annee_debut_pmt"
                                        value={formData.annee_debut_pmt}
                                        onChange={handleInputChange}
                                        placeholder="Année début"
                                        className="w-full h-10 px-3 rounded-[20px] border border-gray-300 outline-none focus:border-orange-400"
                                    />
                                    <input
                                        type="number"
                                        name="annee_fin_pmt"
                                        value={formData.annee_fin_pmt}
                                        onChange={handleInputChange}
                                        placeholder="Année fin"
                                        className="w-full h-10 px-3 rounded-[20px] border border-gray-300 outline-none focus:border-orange-400"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="bg-gray-50 rounded-xl p-4">
                        <h3 className="font-semibold text-gray-800 mb-3">Description</h3>
                        <div className="space-y-3">
                            <textarea
                                name="description_technique"
                                value={formData.description_technique}
                                onChange={handleInputChange}
                                rows="2"
                                className="w-full px-3 py-2 rounded-2xl border border-gray-300 outline-none resize-none focus:border-orange-400"
                                placeholder="Description technique"
                            />
                            <textarea
                                name="opportunite_projet"
                                value={formData.opportunite_projet}
                                onChange={handleInputChange}
                                rows="2"
                                className="w-full px-3 py-2 rounded-2xl border border-gray-300 outline-none resize-none focus:border-orange-400"
                                placeholder="Opportunité du projet"
                            />
                        </div>
                    </div>

                    {/* Données budgétaires */}
                    <div className="bg-gray-50 rounded-xl p-4">
                        <h3 className="font-semibold text-gray-800 mb-3">Données budgétaires</h3>
                        <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Coût Global Initial PMT {anneeDebut}/{anneeFin}
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <input
                                            type="text"
                                            name="cout_initial_total"
                                            value={formData.cout_initial_total}
                                            onChange={handleInputChange}
                                            placeholder="Total"
                                            className="w-full h-8 px-2 rounded-[20px] border border-gray-300 outline-none text-sm"
                                        />
                                        <input
                                            type="text"
                                            name="cout_initial_dont_dex"
                                            value={formData.cout_initial_dont_dex}
                                            onChange={handleInputChange}
                                            placeholder="Dont DEV"
                                            className="w-full h-8 px-2 rounded-[20px] border border-gray-300 outline-none text-sm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Réalisations Cumulées à fin {N-1} au coût réel
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <input
                                            type="text"
                                            name="realisation_cumul_n_mins1_total"
                                            value={formData.realisation_cumul_n_mins1_total}
                                            onChange={handleInputChange}
                                            placeholder="Total"
                                            className="w-full h-8 px-2 rounded-[20px] border border-gray-300 outline-none text-sm"
                                        />
                                        <input
                                            type="text"
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
                                        Réalisation S1
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <input
                                            type="text"
                                            name="real_s1_n_total"
                                            value={formData.real_s1_n_total}
                                            onChange={handleInputChange}
                                            placeholder="Total"
                                            className="w-full h-8 px-2 rounded-[20px] border border-gray-300 outline-none text-sm"
                                        />
                                        <input
                                            type="text"
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
                                        Prévision S2
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <input
                                            type="text"
                                            name="prev_s2_n_total"
                                            value={formData.prev_s2_n_total}
                                            onChange={handleInputChange}
                                            placeholder="Total"
                                            className="w-full h-8 px-2 rounded-[20px] border border-gray-300 outline-none text-sm"
                                        />
                                        <input
                                            type="text"
                                            name="prev_s2_n_dont_dex"
                                            value={formData.prev_s2_n_dont_dex}
                                            onChange={handleInputChange}
                                            placeholder="Dont DEV"
                                            className="w-full h-8 px-2 rounded-[20px] border border-gray-300 outline-none text-sm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Prévisions de Clôture {N}
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <input
                                            type="text"
                                            name="prev_cloture_n_total"
                                            value={formData.prev_cloture_n_total}
                                            onChange={handleInputChange}
                                            placeholder="Total"
                                            className="w-full h-8 px-2 rounded-[20px] border border-gray-300 outline-none text-sm"
                                        />
                                        <input
                                            type="text"
                                            name="prev_cloture_n_dont_dex"
                                            value={formData.prev_cloture_n_dont_dex}
                                            onChange={handleInputChange}
                                            placeholder="Dont DEV"
                                            className="w-full h-8 px-2 rounded-[20px] border border-gray-300 outline-none text-sm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Prévisions {N_plus_1}
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <input
                                            type="text"
                                            name="prev_n_plus1_total"
                                            value={formData.prev_n_plus1_total}
                                            onChange={handleInputChange}
                                            placeholder="Total"
                                            className="w-full h-8 px-2 rounded-[20px] border border-gray-300 outline-none text-sm"
                                        />
                                        <input
                                            type="text"
                                            name="prev_n_plus1_dont_dex"
                                            value={formData.prev_n_plus1_dont_dex}
                                            onChange={handleInputChange}
                                            placeholder="Dont DEV"
                                            className="w-full h-8 px-2 rounded-[20px] border border-gray-300 outline-none text-sm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Reste à Réaliser {N_plus_2}/{anneeFin}
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <input
                                            type="text"
                                            name="reste_a_realiser_total"
                                            value={formData.reste_a_realiser_total}
                                            onChange={handleInputChange}
                                            placeholder="Total"
                                            className="w-full h-8 px-2 rounded-[20px] border border-gray-300 outline-none text-sm"
                                        />
                                        <input
                                            type="text"
                                            name="reste_a_realiser_dont_dex"
                                            value={formData.reste_a_realiser_dont_dex}
                                            onChange={handleInputChange}
                                            placeholder="Dont DEV"
                                            className="w-full h-8 px-2 rounded-[20px] border border-gray-300 outline-none text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Prévisions pluriannuelles */}
                    <div className="bg-gray-50 rounded-xl p-4">
                        <h3 className="font-semibold text-gray-800 mb-3">Prévisions pluriannuelles</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Prévisions {N_plus_2}</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <input
                                        type="text"
                                        name="prev_n_plus2_total"
                                        value={formData.prev_n_plus2_total}
                                        onChange={handleInputChange}
                                        placeholder="Total"
                                        className="w-full h-8 px-2 rounded-[20px] border border-gray-300 outline-none text-sm"
                                    />
                                    <input
                                        type="text"
                                        name="prev_n_plus2_dont_dex"
                                        value={formData.prev_n_plus2_dont_dex}
                                        onChange={handleInputChange}
                                        placeholder="Dont DEV"
                                        className="w-full h-8 px-2 rounded-[20px] border border-gray-300 outline-none text-sm"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Prévisions {N_plus_3}</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <input
                                        type="text"
                                        name="prev_n_plus3_total"
                                        value={formData.prev_n_plus3_total}
                                        onChange={handleInputChange}
                                        placeholder="Total"
                                        className="w-full h-8 px-2 rounded-[20px] border border-gray-300 outline-none text-sm"
                                    />
                                    <input
                                        type="text"
                                        name="prev_n_plus3_dont_dex"
                                        value={formData.prev_n_plus3_dont_dex}
                                        onChange={handleInputChange}
                                        placeholder="Dont DEV"
                                        className="w-full h-8 px-2 rounded-[20px] border border-gray-300 outline-none text-sm"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Prévisions {N_plus_4}</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <input
                                        type="text"
                                        name="prev_n_plus4_total"
                                        value={formData.prev_n_plus4_total}
                                        onChange={handleInputChange}
                                        placeholder="Total"
                                        className="w-full h-8 px-2 rounded-[20px] border border-gray-300 outline-none text-sm"
                                    />
                                    <input
                                        type="text"
                                        name="prev_n_plus4_dont_dex"
                                        value={formData.prev_n_plus4_dont_dex}
                                        onChange={handleInputChange}
                                        placeholder="Dont DEV"
                                        className="w-full h-8 px-2 rounded-[20px] border border-gray-300 outline-none text-sm"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Prévisions {N_plus_5}</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <input
                                        type="text"
                                        name="prev_n_plus5_total"
                                        value={formData.prev_n_plus5_total}
                                        onChange={handleInputChange}
                                        placeholder="Total"
                                        className="w-full h-8 px-2 rounded-[20px] border border-gray-300 outline-none text-sm"
                                    />
                                    <input
                                        type="text"
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

                    {/* Répartition mensuelle */}
                    <div className="bg-gray-50 rounded-xl p-4">
                        <h3 className="font-semibold text-gray-800 mb-3">Répartition mensuelle — Prévisions {N_plus_1}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {moisList.map(mois => (
                                <div key={mois.key} className="border border-gray-200 rounded-lg p-2">
                                    <label className="text-xs font-semibold text-gray-600">{mois.label}</label>
                                    <div className="space-y-1 mt-1">
                                        <input
                                            type="text"
                                            name={`${mois.key}_total`}
                                            value={formData[`${mois.key}_total`]}
                                            onChange={handleInputChange}
                                            placeholder="Total"
                                            className="w-full h-7 px-2 rounded-[20px] border border-gray-200 outline-none text-xs"
                                        />
                                        <input
                                            type="text"
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
            </div>
        </div>
    );
};

export default ModifierProjetAdminModal;