import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { axiosInstance } from '../../../../axios';

const ModifierProjetAdminModal = ({ isOpen, onClose, onSuccess, projet, axiosInstance: customAxiosInstance }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    // Listes déroulantes
    const [regions, setRegions] = useState([]);
    const [perimetres, setPerimetres] = useState([]);
    const [familles, setFamilles] = useState([]);
    const [directions, setDirections] = useState([]);
    const [famillesDirection, setFamillesDirection] = useState([]);

    // Type d'entité détecté depuis le projet
    const [entiteType, setEntiteType] = useState('region'); // 'region' ou 'direction'

    const [formData, setFormData] = useState({
        code_division: '',
        libelle: '',
        // Champs région
        region: '',
        perimetre: '',
        // Champs direction
        direction: '',
        // Famille commune
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
        // Réalisations (modifiables)
        realisation_cumul_n_mins1_total: '',
        realisation_cumul_n_mins1_dont_dex: '',
        real_s1_n_total: '',
        real_s1_n_dont_dex: '',
        prev_s2_n_total: '',
        prev_s2_n_dont_dex: '',
    });

    // Champs readonly — affichés en lecture seule, jamais envoyés au backend
    const [readonlyData, setReadonlyData] = useState({
        cout_initial_total: '',
        cout_initial_dont_dex: '',
        prev_n_plus1_total: '',
        prev_n_plus1_dont_dex: '',
        reste_a_realiser_total: '',
        reste_a_realiser_dont_dex: '',
        prev_cloture_n_total: '',
        prev_cloture_n_dont_dex: '',
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

    // ─── Détection du type d'entité ────────────────────────────────────────────
    const detectEntiteType = (p) => {
        if (!p) return 'region';

        // Priorité 1 : region_id null + direction_id non null → direction
        if (!p.region_id && p.direction_id) return 'direction';

        // Priorité 2 : region null/vide + direction non null/vide → direction
        const hasRegion    = p.region    && p.region    !== 'null' && p.region    !== '';
        const hasDirection = p.direction && p.direction !== 'null' && p.direction !== '';
        if (!hasRegion && hasDirection) return 'direction';

        // Priorité 3 : region_nom absent + direction_nom présent → direction
        if (!p.region_nom && p.direction_nom) return 'direction';

        // Priorité 4 : direction_region_code présent mais region absente → direction
        if (p.direction_region_code && !hasRegion && !p.region_id) return 'direction';

        // Par défaut → région
        return 'region';
    };

    // ─── Chargement initial ─────────────────────────────────────────────────────
    useEffect(() => {
        if (isOpen && projet) {
            // Utiliser les données brutes (original) pour la détection
            const raw  = projet.original || projet;
            const type = detectEntiteType(raw);
            setEntiteType(type);
            loadProjetData(projet, type);

            if (type === 'region') {
                fetchRegions();
            } else {
                fetchDirections();
            }
        }
    }, [isOpen, projet]);

    // ─── API : Régions ──────────────────────────────────────────────────────────
    const fetchRegions = async () => {
        try {
            const res = await axiosInst.get('/params/regions');
            setRegions(res.data.data || []);
        } catch (err) {
            console.error("Erreur chargement régions:", err);
        }
    };

    // ─── API : Périmètres (par région) ─────────────────────────────────────────
    const fetchPerimetres = async (regionCode) => {
        if (!regionCode) { setPerimetres([]); return; }
        try {
            const res = await axiosInst.get(`/params/perimetres/by-region-code/${regionCode}`);
            setPerimetres(res.data.data || []);
        } catch (err) {
            console.error("Erreur chargement périmètres:", err);
            setPerimetres([]);
        }
    };

    // ─── API : Familles région → /params/familles/ ─────────────────────────────
    const fetchFamilles = async (regionCode, perimetreCode) => {
        if (!regionCode || !perimetreCode) { setFamilles([]); return; }
        try {
            const res = await axiosInst.get('/params/familles/');
            setFamilles(res.data.data || []);
        } catch (err) {
            console.error("Erreur chargement familles région:", err);
            setFamilles([]);
        }
    };

    // ─── API : Directions ──────────────────────────────────────────────────────
    const fetchDirections = async () => {
        try {
            const res = await axiosInst.get('/params/directions');
            setDirections(res.data.data || []);
        } catch (err) {
            console.error("Erreur chargement directions:", err);
        }
    };

    // ─── API : Familles direction ──────────────────────────────────────────────
    // Endpoint: GET /params/familles-direction/direction/:directionCode
    // Retourne toutes les familles liées à une direction (par code_direction)
    const fetchFamillesDirection = async (directionCode) => {
        if (!directionCode) { setFamillesDirection([]); return; }
        try {
            const res = await axiosInst.get(`/params/familles-direction/direction/${directionCode}`);
            setFamillesDirection(res.data.data || []);
        } catch (err) {
            console.error("Erreur chargement familles direction:", err);
            setFamillesDirection([]);
        }
    };

    // ─── Pré-remplissage du formulaire ─────────────────────────────────────────
    const loadProjetData = (p, type) => {
        if (!p) return;

        // Le projet peut venir du tableau (formattedProjets) → on préfère original
        const raw = p.original || p;

        const regionCode    = raw.region    || '';
        const perimetreCode = raw.perm      || raw.perimetre || '';
        // Pour direction : utiliser le code direction pour le payload et l'appel API
        const directionCode = raw.direction || raw.direction_region_code || '';
        const familleCode   = raw.famille   || '';

        setFormData({
            code_division: raw.code_division || '',
            libelle: raw.libelle || '',
            region: regionCode,
            perimetre: perimetreCode,
            direction: directionCode,
            famille: familleCode,
            activite: raw.activite || '',
            annee_debut_pmt: raw.annee_debut_pmt || '',
            annee_fin_pmt: raw.annee_fin_pmt || '',
            description_technique: raw.description_technique || '',
            opportunite_projet: raw.opportunite_projet || '',
            type_projet: raw.type_projet || '',
            prev_n_plus2_total: raw.prev_n_plus2_total || '',
            prev_n_plus2_dont_dex: raw.prev_n_plus2_dont_dex || '',
            prev_n_plus3_total: raw.prev_n_plus3_total || '',
            prev_n_plus3_dont_dex: raw.prev_n_plus3_dont_dex || '',
            prev_n_plus4_total: raw.prev_n_plus4_total || '',
            prev_n_plus4_dont_dex: raw.prev_n_plus4_dont_dex || '',
            prev_n_plus5_total: raw.prev_n_plus5_total || '',
            prev_n_plus5_dont_dex: raw.prev_n_plus5_dont_dex || '',
            janvier_total: raw.janvier_total || '', janvier_dont_dex: raw.janvier_dont_dex || '',
            fevrier_total: raw.fevrier_total || '', fevrier_dont_dex: raw.fevrier_dont_dex || '',
            mars_total: raw.mars_total || '', mars_dont_dex: raw.mars_dont_dex || '',
            avril_total: raw.avril_total || '', avril_dont_dex: raw.avril_dont_dex || '',
            mai_total: raw.mai_total || '', mai_dont_dex: raw.mai_dont_dex || '',
            juin_total: raw.juin_total || '', juin_dont_dex: raw.juin_dont_dex || '',
            juillet_total: raw.juillet_total || '', juillet_dont_dex: raw.juillet_dont_dex || '',
            aout_total: raw.aout_total || '', aout_dont_dex: raw.aout_dont_dex || '',
            septembre_total: raw.septembre_total || '', septembre_dont_dex: raw.septembre_dont_dex || '',
            octobre_total: raw.octobre_total || '', octobre_dont_dex: raw.octobre_dont_dex || '',
            novembre_total: raw.novembre_total || '', novembre_dont_dex: raw.novembre_dont_dex || '',
            decembre_total: raw.decembre_total || '', decembre_dont_dex: raw.decembre_dont_dex || '',
            realisation_cumul_n_mins1_total: raw.realisation_cumul_n_mins1_total || '',
            realisation_cumul_n_mins1_dont_dex: raw.realisation_cumul_n_mins1_dont_dex || '',
            real_s1_n_total: raw.real_s1_n_total || '',
            real_s1_n_dont_dex: raw.real_s1_n_dont_dex || '',
            prev_s2_n_total: raw.prev_s2_n_total || '',
            prev_s2_n_dont_dex: raw.prev_s2_n_dont_dex || '',
        });

        // Peupler les champs readonly (affichage uniquement, jamais envoyés)
        setReadonlyData({
            cout_initial_total: raw.cout_initial_total || '',
            cout_initial_dont_dex: raw.cout_initial_dont_dex || '',
            prev_n_plus1_total: raw.prev_n_plus1_total || '',
            prev_n_plus1_dont_dex: raw.prev_n_plus1_dont_dex || '',
            reste_a_realiser_total: raw.reste_a_realiser_total || '',
            reste_a_realiser_dont_dex: raw.reste_a_realiser_dont_dex || '',
            prev_cloture_n_total: raw.prev_cloture_n_total || '',
            prev_cloture_n_dont_dex: raw.prev_cloture_n_dont_dex || '',
        });

        // Charger les listes secondaires selon le type
        if (type === 'region') {
            if (regionCode) {
                fetchPerimetres(regionCode);
                if (perimetreCode) fetchFamilles(regionCode, perimetreCode);
            }
        } else {
            if (directionCode) fetchFamillesDirection(directionCode);
        }
    };

    // ─── Handlers : Région ─────────────────────────────────────────────────────
    const handleRegionChange = (e) => {
        const code = e.target.value;
        setFormData(prev => ({ ...prev, region: code, perimetre: '', famille: '' }));
        setPerimetres([]);
        setFamilles([]);
        if (code) fetchPerimetres(code);
    };

    const handlePerimetreChange = (e) => {
        const code = e.target.value;
        setFormData(prev => ({ ...prev, perimetre: code, famille: '' }));
        setFamilles([]);
        if (formData.region && code) fetchFamilles(formData.region, code);
    };

    // ─── Handlers : Direction ──────────────────────────────────────────────────
    const handleDirectionChange = (e) => {
        const code = e.target.value;
        setFormData(prev => ({ ...prev, direction: code, famille: '' }));
        setFamillesDirection([]);
        if (code) fetchFamillesDirection(code);
    };

    // ─── Handler générique ─────────────────────────────────────────────────────
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // ─── Champs refusés par le backend (READONLY_FIELDS) ─────────────────────
    const BACKEND_READONLY = new Set([
        'id', 'version', 'is_active', 'parent_id',
        'created_by', 'region_id', 'structure_id', 'direction_id', 'departement_id',
        'upload',
        'prev_n_plus1_total', 'prev_n_plus1_dont_dex',
        'reste_a_realiser_total', 'reste_a_realiser_dont_dex',
        'prev_cloture_n_total', 'prev_cloture_n_dont_dex',
        'cout_initial_total', 'cout_initial_dont_dex',
    ]);

    // ─── Soumission ────────────────────────────────────────────────────────────
    const handleSubmit = async () => {
        setLoading(true);
        setError('');

        const payload = {};
        for (const [key, value] of Object.entries(formData)) {
            // Exclure les champs readonly refusés par le backend
            if (BACKEND_READONLY.has(key)) continue;
            // Exclure les champs vides
            if (value === '' || value === null || value === undefined) continue;
            payload[key] = value;
        }

        console.log('📤 Payload envoyé:', payload);

        try {
            const response = await axiosInst.patch(
                `/recap/budget/admin/patch-projet/${projet.code_division}/`,
                payload
            );
            if (response.data.success) {
                setSuccess(true);
                if (onSuccess) onSuccess('Projet modifié avec succès');
                setTimeout(() => onClose(), 1500);
            }
        } catch (err) {
            console.error("Erreur:", err);
            const errData = err.response?.data;
            if (errData?.champs) {
                setError(`${errData.error} : ${errData.champs.join(', ')}`);
            } else {
                setError(errData?.error || errData?.message || "Erreur lors de la modification");
            }
        } finally {
            setLoading(false);
        }
    };

    // ─── Années affichage ──────────────────────────────────────────────────────
    const anneeDebut = formData.annee_debut_pmt || new Date().getFullYear();
    const N         = anneeDebut - 1;
    const N1        = N + 1;
    const N2        = N + 2;
    const N3        = N + 3;
    const N4        = N + 4;
    const N5        = N + 5;
    const anneeFin  = formData.annee_fin_pmt || N5;

    // Familles à utiliser selon le type
    const famillesActives = entiteType === 'region' ? familles : famillesDirection;
    // Badge type entité
    const entiteBadgeLabel = entiteType === 'region' ? '🌍 Projet Région' : '🏢 Projet Direction';
    const entiteBadgeColor = entiteType === 'region'
        ? 'bg-blue-50 text-blue-600 border-blue-200'
        : 'bg-purple-50 text-purple-600 border-purple-200';

    if (!isOpen) return null;

    const inputClass = "w-full h-10 px-3 rounded-[20px] border border-gray-300 outline-none focus:border-orange-400 text-sm";
    const inputSmClass = "w-full h-8 px-2 rounded-[20px] border border-gray-300 outline-none text-sm focus:border-orange-400";

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="w-[820px] max-h-[92vh] flex flex-col bg-white shadow-2xl rounded-2xl overflow-hidden">

                {/* ── En-tête ── */}
                <div className="px-6 pt-5 pb-4 border-b border-gray-100 bg-white">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">Modifier le projet — Admin</h2>
                            <div className="flex items-center gap-3 mt-1">
                                <p className="text-xs text-gray-500">Code : {projet?.code_division}</p>
                                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${entiteBadgeColor}`}>
                                    {entiteBadgeLabel}
                                </span>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-full transition">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M18 6L6 18M6 6L18 18" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </button>
                    </div>
                </div>

                {/* ── Corps ── */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">

                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">{error}</div>
                    )}
                    {success && (
                        <div className="p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl">
                            ✅ Projet modifié avec succès !
                        </div>
                    )}

                    {/* ── Section : Informations générales ── */}
                    <div className="bg-gray-50 rounded-xl p-4">
                        <h3 className="font-semibold text-gray-800 mb-3">Informations générales</h3>
                        <div className="grid grid-cols-2 gap-4">

                            {/* N° Cpte Analy */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">N° Cpte Analy</label>
                                <input type="text" name="code_division" value={formData.code_division}
                                    onChange={handleInputChange} className={inputClass} />
                            </div>

                            {/* Libellé */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Libellé</label>
                                <input type="text" name="libelle" value={formData.libelle}
                                    onChange={handleInputChange} className={inputClass} />
                            </div>

                            {/* ── RÉGION : Région + Périmètre + Famille ── */}
                            {entiteType === 'region' && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Région</label>
                                        <select name="region" value={formData.region}
                                            onChange={handleRegionChange} className={inputClass}>
                                            <option value="">Sélectionner une région</option>
                                            {regions.map(r => (
                                                <option key={r.code_region} value={r.code_region}>{r.nom_region}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Périmètre</label>
                                        <select name="perimetre" value={formData.perimetre}
                                            onChange={handlePerimetreChange}
                                            disabled={!formData.region}
                                            className={`${inputClass} disabled:bg-gray-100 disabled:cursor-not-allowed`}>
                                            <option value="">
                                                {!formData.region ? 'Choisir une région d\'abord' : 'Sélectionner un périmètre'}
                                            </option>
                                            {perimetres.map(p => (
                                                <option key={p.code_perimetre} value={p.code_perimetre}>{p.nom_perimetre}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Famille</label>
                                        <select name="famille" value={formData.famille}
                                            onChange={handleInputChange}
                                            disabled={!formData.perimetre}
                                            className={`${inputClass} disabled:bg-gray-100 disabled:cursor-not-allowed`}>
                                            <option value="">
                                                {!formData.perimetre ? 'Choisir un périmètre d\'abord' : 'Sélectionner une famille'}
                                            </option>
                                            {famillesActives.map(f => (
                                                <option key={f.code_famille} value={f.code_famille}>{f.nom_famille}</option>
                                            ))}
                                        </select>
                                    </div>
                                </>
                            )}

                            {/* ── DIRECTION : Direction + Famille ── */}
                            {entiteType === 'direction' && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Direction</label>
                                        <select name="direction" value={formData.direction}
                                            onChange={handleDirectionChange} className={inputClass}>
                                            <option value="">Sélectionner une direction</option>
                                            {directions.map(d => (
                                                <option key={d.code_direction || d._id} value={d.code_direction || d._id}>
                                                    {d.nom_direction}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Famille</label>
                                        <select name="famille" value={formData.famille}
                                            onChange={handleInputChange}
                                            disabled={!formData.direction}
                                            className={`${inputClass} disabled:bg-gray-100 disabled:cursor-not-allowed`}>
                                            <option value="">
                                                {!formData.direction ? 'Choisir une direction d\'abord' : 'Sélectionner une famille'}
                                            </option>
                                            {famillesActives.map(f => (
                                                <option key={f.code_famille} value={f.code_famille}>{f.nom_famille}</option>
                                            ))}
                                        </select>
                                    </div>
                                </>
                            )}

                            {/* Activité */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Activité</label>
                                <select name="activite" value={formData.activite}
                                    onChange={handleInputChange} className={inputClass}>
                                    <option value="">Sélectionner</option>
                                    {activites.map(a => (
                                        <option key={a.code} value={a.code}>{a.nom}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Type projet */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Type projet</label>
                                <select name="type_projet" value={formData.type_projet}
                                    onChange={handleInputChange} className={inputClass}>
                                    <option value="nouveau">Nouveau projet</option>
                                    <option value="en_cours">Projet en cours</option>
                                </select>
                            </div>

                            {/* Période PMT */}
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Période PMT</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <input type="number" name="annee_debut_pmt" value={formData.annee_debut_pmt}
                                        onChange={handleInputChange} placeholder="Année début" className={inputClass} />
                                    <input type="number" name="annee_fin_pmt" value={formData.annee_fin_pmt}
                                        onChange={handleInputChange} placeholder="Année fin" className={inputClass} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Section : Description ── */}
                    <div className="bg-gray-50 rounded-xl p-4">
                        <h3 className="font-semibold text-gray-800 mb-3">Description</h3>
                        <div className="space-y-3">
                            <textarea name="description_technique" value={formData.description_technique}
                                onChange={handleInputChange} rows="2"
                                className="w-full px-3 py-2 rounded-2xl border border-gray-300 outline-none resize-none focus:border-orange-400 text-sm"
                                placeholder="Description technique" />
                            <textarea name="opportunite_projet" value={formData.opportunite_projet}
                                onChange={handleInputChange} rows="2"
                                className="w-full px-3 py-2 rounded-2xl border border-gray-300 outline-none resize-none focus:border-orange-400 text-sm"
                                placeholder="Opportunité du projet" />
                        </div>
                    </div>

                    {/* ── Section : Données budgétaires ── */}
                    <div className="bg-gray-50 rounded-xl p-4">
                        <h3 className="font-semibold text-gray-800 mb-3">Données budgétaires</h3>

                        {/* Champs lecture seule (calculés/système) */}
                        <p className="text-xs text-gray-400 mb-2 flex items-center gap-1">
                            <span>🔒</span> Champs calculés — non modifiables
                        </p>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            {[
                                { label: `Coût Global Initial PMT ${anneeDebut}/${anneeFin}`, total: 'cout_initial_total', dex: 'cout_initial_dont_dex' },
                                { label: `Prévisions de Clôture ${N}`, total: 'prev_cloture_n_total', dex: 'prev_cloture_n_dont_dex' },
                                { label: `Prévisions ${N1}`, total: 'prev_n_plus1_total', dex: 'prev_n_plus1_dont_dex' },
                                { label: `Reste à Réaliser ${N2}/${anneeFin}`, total: 'reste_a_realiser_total', dex: 'reste_a_realiser_dont_dex' },
                            ].map(({ label, total, dex }) => (
                                <div key={total}>
                                    <label className="block text-xs font-medium text-gray-400 mb-1">{label}</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <input type="text" value={readonlyData[total] || ''} readOnly
                                            placeholder="Total"
                                            className="w-full h-8 px-2 rounded-[20px] border border-gray-200 bg-gray-100 text-gray-400 text-sm cursor-not-allowed" />
                                        <input type="text" value={readonlyData[dex] || ''} readOnly
                                            placeholder="Dont DEX"
                                            className="w-full h-8 px-2 rounded-[20px] border border-gray-200 bg-gray-100 text-gray-400 text-sm cursor-not-allowed" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Champs modifiables */}
                        <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                            <span>✏️</span> Champs modifiables
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: `Réalisations Cumulées à fin ${N - 1} au coût réel`, total: 'realisation_cumul_n_mins1_total', dex: 'realisation_cumul_n_mins1_dont_dex' },
                                { label: 'Réalisation S1', total: 'real_s1_n_total', dex: 'real_s1_n_dont_dex' },
                                { label: 'Prévision S2', total: 'prev_s2_n_total', dex: 'prev_s2_n_dont_dex' },
                            ].map(({ label, total, dex }) => (
                                <div key={total}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <input type="text" name={total} value={formData[total]}
                                            onChange={handleInputChange} placeholder="Total" className={inputSmClass} />
                                        <input type="text" name={dex} value={formData[dex]}
                                            onChange={handleInputChange} placeholder="Dont DEX" className={inputSmClass} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Section : Prévisions pluriannuelles ── */}
                    <div className="bg-gray-50 rounded-xl p-4">
                        <h3 className="font-semibold text-gray-800 mb-3">Prévisions pluriannuelles</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: `Prévisions ${N2}`, total: 'prev_n_plus2_total', dex: 'prev_n_plus2_dont_dex' },
                                { label: `Prévisions ${N3}`, total: 'prev_n_plus3_total', dex: 'prev_n_plus3_dont_dex' },
                                { label: `Prévisions ${N4}`, total: 'prev_n_plus4_total', dex: 'prev_n_plus4_dont_dex' },
                                { label: `Prévisions ${N5}`, total: 'prev_n_plus5_total', dex: 'prev_n_plus5_dont_dex' },
                            ].map(({ label, total, dex }) => (
                                <div key={total} className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">{label}</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <input type="text" name={total} value={formData[total]}
                                            onChange={handleInputChange} placeholder="Total" className={inputSmClass} />
                                        <input type="text" name={dex} value={formData[dex]}
                                            onChange={handleInputChange} placeholder="Dont DEX" className={inputSmClass} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Section : Répartition mensuelle ── */}
                    <div className="bg-gray-50 rounded-xl p-4">
                        <h3 className="font-semibold text-gray-800 mb-3">Répartition mensuelle — Prévisions {N1}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {moisList.map(mois => (
                                <div key={mois.key} className="border border-gray-200 rounded-lg p-2 bg-white">
                                    <label className="text-xs font-semibold text-gray-600">{mois.label}</label>
                                    <div className="space-y-1 mt-1">
                                        <input type="text" name={`${mois.key}_total`}
                                            value={formData[`${mois.key}_total`]}
                                            onChange={handleInputChange} placeholder="Total"
                                            className="w-full h-7 px-2 rounded-[20px] border border-gray-200 outline-none text-xs focus:border-orange-400" />
                                        <input type="text" name={`${mois.key}_dont_dex`}
                                            value={formData[`${mois.key}_dont_dex`]}
                                            onChange={handleInputChange} placeholder="Dont DEX"
                                            className="w-full h-7 px-2 rounded-[20px] border border-gray-200 outline-none text-xs focus:border-orange-400" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Pied de page ── */}
                <div className="border-t border-gray-100 px-6 py-4 bg-white flex justify-between items-center">
                    <button onClick={onClose}
                        className="px-5 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition text-sm font-medium">
                        Annuler
                    </button>
                    <button onClick={handleSubmit} disabled={loading || success}
                        className="px-6 py-2 bg-[#FF8500] text-white rounded-full hover:bg-[#e67800] transition disabled:opacity-50 flex items-center gap-2 text-sm font-medium shadow-md shadow-orange-200">
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
