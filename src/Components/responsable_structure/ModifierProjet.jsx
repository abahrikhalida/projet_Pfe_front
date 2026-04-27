import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../axios';

const RECALCUL_FIELDS = [
    'prev_cloture_n_total', 'prev_cloture_n_dont_dex',
    'reste_a_realiser_total', 'reste_a_realiser_dont_dex',
    'prev_n_plus1_total', 'prev_n_plus1_dont_dex',
    'cout_initial_total', 'cout_initial_dont_dex',
];

const ModifierProjet = ({ codeDivision, projetData, onCancel, onSuccess }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [perimetres, setPerimetres] = useState([]);
    const [familles, setFamilles] = useState([]);
    const [originalCodeDivision] = useState(codeDivision); // Garder l'original pour l'API

    const activites = [
        { code: 'PETROLE', nom: 'Pétrole' },
        { code: 'GAZ', nom: 'Gaz' },
        { code: 'PETROLE_GAZ', nom: 'Pétrole & Gaz' }
    ];

    const [formData, setFormData] = useState({
        activite: projetData.activite || '',
        perimetre: projetData.perm || '',
        famille: projetData.famille || '',
        code_division: projetData.code_division || '',
        libelle: projetData.libelle || '',
        annee: projetData.annee || new Date().getFullYear(),

        realisation_cumul_n_mins1_total:    projetData.realisation_cumul_n_mins1_total    || '',
        realisation_cumul_n_mins1_dont_dex: projetData.realisation_cumul_n_mins1_dont_dex || '',
        real_s1_n_total:                    projetData.real_s1_n_total                    || '',
        real_s1_n_dont_dex:                 projetData.real_s1_n_dont_dex                 || '',
        prev_s2_n_total:                    projetData.prev_s2_n_total                    || '',
        prev_s2_n_dont_dex:                 projetData.prev_s2_n_dont_dex                 || '',
        prev_n_plus2_total:                 projetData.prev_n_plus2_total                 || '',
        prev_n_plus2_dont_dex:              projetData.prev_n_plus2_dont_dex              || '',
        prev_n_plus3_total:                 projetData.prev_n_plus3_total                 || '',
        prev_n_plus3_dont_dex:              projetData.prev_n_plus3_dont_dex              || '',
        prev_n_plus4_total:                 projetData.prev_n_plus4_total                 || '',
        prev_n_plus4_dont_dex:              projetData.prev_n_plus4_dont_dex              || '',
        prev_n_plus5_total:                 projetData.prev_n_plus5_total                 || '',
        prev_n_plus5_dont_dex:              projetData.prev_n_plus5_dont_dex              || '',

        prev_cloture_n_total:      projetData.prev_cloture_n_total      || '',
        prev_cloture_n_dont_dex:   projetData.prev_cloture_n_dont_dex   || '',
        reste_a_realiser_total:    projetData.reste_a_realiser_total    || '',
        reste_a_realiser_dont_dex: projetData.reste_a_realiser_dont_dex || '',
        prev_n_plus1_total:        projetData.prev_n_plus1_total        || '',
        prev_n_plus1_dont_dex:     projetData.prev_n_plus1_dont_dex     || '',
        cout_initial_total:        projetData.cout_initial_total        || '',
        cout_initial_dont_dex:     projetData.cout_initial_dont_dex     || '',

        janvier_total:    projetData.janvier_total    || '', janvier_dont_dex:    projetData.janvier_dont_dex    || '',
        fevrier_total:    projetData.fevrier_total    || '', fevrier_dont_dex:    projetData.fevrier_dont_dex    || '',
        mars_total:       projetData.mars_total       || '', mars_dont_dex:       projetData.mars_dont_dex       || '',
        avril_total:      projetData.avril_total      || '', avril_dont_dex:      projetData.avril_dont_dex      || '',
        mai_total:        projetData.mai_total        || '', mai_dont_dex:        projetData.mai_dont_dex        || '',
        juin_total:       projetData.juin_total       || '', juin_dont_dex:       projetData.juin_dont_dex       || '',
        juillet_total:    projetData.juillet_total    || '', juillet_dont_dex:    projetData.juillet_dont_dex    || '',
        aout_total:       projetData.aout_total       || '', aout_dont_dex:       projetData.aout_dont_dex       || '',
        septembre_total:  projetData.septembre_total  || '', septembre_dont_dex:  projetData.septembre_dont_dex  || '',
        octobre_total:    projetData.octobre_total    || '', octobre_dont_dex:    projetData.octobre_dont_dex    || '',
        novembre_total:   projetData.novembre_total   || '', novembre_dont_dex:   projetData.novembre_dont_dex   || '',
        decembre_total:   projetData.decembre_total   || '', decembre_dont_dex:   projetData.decembre_dont_dex   || '',
    });

    const N = Number(formData.annee);

    const computePreview = (data) => {
        const v = (field) => parseFloat(data[field]) || 0;

        const prev_cloture_n_total    = v('real_s1_n_total')    + v('prev_s2_n_total');
        const prev_cloture_n_dont_dex = v('real_s1_n_dont_dex') + v('prev_s2_n_dont_dex');

        const reste_a_realiser_total    = v('prev_n_plus2_total')    + v('prev_n_plus3_total')    + v('prev_n_plus4_total')    + v('prev_n_plus5_total');
        const reste_a_realiser_dont_dex = v('prev_n_plus2_dont_dex') + v('prev_n_plus3_dont_dex') + v('prev_n_plus4_dont_dex') + v('prev_n_plus5_dont_dex');

        const mois = ['janvier','fevrier','mars','avril','mai','juin','juillet','aout','septembre','octobre','novembre','decembre'];
        const prev_n_plus1_total    = mois.reduce((s, m) => s + v(`${m}_total`), 0);
        const prev_n_plus1_dont_dex = mois.reduce((s, m) => s + v(`${m}_dont_dex`), 0);

        const cout_initial_total    = v('realisation_cumul_n_mins1_total')    + prev_cloture_n_total    + prev_n_plus1_total    + reste_a_realiser_total;
        const cout_initial_dont_dex = v('realisation_cumul_n_mins1_dont_dex') + prev_cloture_n_dont_dex + prev_n_plus1_dont_dex + reste_a_realiser_dont_dex;

        return {
            prev_cloture_n_total, prev_cloture_n_dont_dex,
            reste_a_realiser_total, reste_a_realiser_dont_dex,
            prev_n_plus1_total, prev_n_plus1_dont_dex,
            cout_initial_total, cout_initial_dont_dex,
        };
    };

    useEffect(() => {
        const regionId = projetData.region_id;
        if (regionId) {
            fetchPerimetres(regionId);
            if (projetData.perm) fetchFamilles(regionId, projetData.perm);
        }
    }, [projetData]);

    useEffect(() => {
        const preview = computePreview(formData);
        setFormData(prev => ({ ...prev, ...preview }));
    }, [
        formData.real_s1_n_total, formData.real_s1_n_dont_dex,
        formData.prev_s2_n_total, formData.prev_s2_n_dont_dex,
        formData.prev_n_plus2_total, formData.prev_n_plus2_dont_dex,
        formData.prev_n_plus3_total, formData.prev_n_plus3_dont_dex,
        formData.prev_n_plus4_total, formData.prev_n_plus4_dont_dex,
        formData.prev_n_plus5_total, formData.prev_n_plus5_dont_dex,
        formData.realisation_cumul_n_mins1_total, formData.realisation_cumul_n_mins1_dont_dex,
        formData.janvier_total, formData.janvier_dont_dex,
        formData.fevrier_total, formData.fevrier_dont_dex,
        formData.mars_total, formData.mars_dont_dex,
        formData.avril_total, formData.avril_dont_dex,
        formData.mai_total, formData.mai_dont_dex,
        formData.juin_total, formData.juin_dont_dex,
        formData.juillet_total, formData.juillet_dont_dex,
        formData.aout_total, formData.aout_dont_dex,
        formData.septembre_total, formData.septembre_dont_dex,
        formData.octobre_total, formData.octobre_dont_dex,
        formData.novembre_total, formData.novembre_dont_dex,
        formData.decembre_total, formData.decembre_dont_dex,
    ]);

    const fetchPerimetres = async (regionId) => {
        try {
            const response = await axiosInstance.get(`/params/perimetres/region/${regionId}`);
            setPerimetres(response.data.data || []);
        } catch (err) { console.error("Erreur chargement périmètres:", err); }
    };

    const fetchFamilles = async (regionId, perimetreCode) => {
        try {
            const response = await axiosInstance.get(`/params/familles/region/${regionId}/perimetre/${perimetreCode}`);
            setFamilles(response.data.data || []);
        } catch (err) { console.error("Erreur chargement familles:", err); }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (name === 'perimetre' && value && projetData.region_id) {
            fetchFamilles(projetData.region_id, value);
        }
    };

    const validateStep = () => {
        if (currentStep === 1) {
            if (!formData.activite)      { setError("Veuillez sélectionner une activité"); return false; }
            if (!formData.code_division) { setError("Veuillez saisir le code division");   return false; }
            if (!formData.libelle)       { setError("Veuillez saisir le libellé");          return false; }
            
            // Validation du format du code division (optionnel)
            if (formData.code_division && formData.code_division.length < 3) {
                setError("Le code division doit contenir au moins 3 caractères");
                return false;
            }
        }
        setError('');
        return true;
    };

    const nextStep = () => { if (validateStep()) setCurrentStep(s => s + 1); };
    const prevStep = () => { setCurrentStep(s => s - 1); setError(''); };

    const handleSubmit = async () => {
        if (!validateStep()) return;
        setLoading(true);
        setError('');

        const toFloat = (val) => parseFloat(val) || 0;
        const mois = ['janvier','fevrier','mars','avril','mai','juin','juillet','aout','septembre','octobre','novembre','decembre'];

        const payload = {
            activite:      formData.activite,
            perm:          formData.perimetre,
            famille:       formData.famille,
            code_division: formData.code_division, // Nouveau code division
            libelle:       formData.libelle,
            annee:         formData.annee,

            realisation_cumul_n_mins1_total:    toFloat(formData.realisation_cumul_n_mins1_total),
            realisation_cumul_n_mins1_dont_dex: toFloat(formData.realisation_cumul_n_mins1_dont_dex),
            real_s1_n_total:                    toFloat(formData.real_s1_n_total),
            real_s1_n_dont_dex:                 toFloat(formData.real_s1_n_dont_dex),
            prev_s2_n_total:                    toFloat(formData.prev_s2_n_total),
            prev_s2_n_dont_dex:                 toFloat(formData.prev_s2_n_dont_dex),
            prev_n_plus2_total:                 toFloat(formData.prev_n_plus2_total),
            prev_n_plus2_dont_dex:              toFloat(formData.prev_n_plus2_dont_dex),
            prev_n_plus3_total:                 toFloat(formData.prev_n_plus3_total),
            prev_n_plus3_dont_dex:              toFloat(formData.prev_n_plus3_dont_dex),
            prev_n_plus4_total:                 toFloat(formData.prev_n_plus4_total),
            prev_n_plus4_dont_dex:              toFloat(formData.prev_n_plus4_dont_dex),
            prev_n_plus5_total:                 toFloat(formData.prev_n_plus5_total),
            prev_n_plus5_dont_dex:              toFloat(formData.prev_n_plus5_dont_dex),

            ...Object.fromEntries(mois.flatMap(m => [
                [`${m}_total`,    toFloat(formData[`${m}_total`])],
                [`${m}_dont_dex`, toFloat(formData[`${m}_dont_dex`])],
            ])),
        };

        try {
            // Utiliser l'ancien code division pour l'URL, mais envoyer le nouveau dans le payload
            const response = await axiosInstance.patch(`/recap/budget/projet/${originalCodeDivision}/`, payload);
            if (response.data.success) {
                onSuccess(response.data.message || 'Projet modifié avec succès');
            }
        } catch (err) {
            console.error("Erreur:", err);
            const errData = err.response?.data;
            if (errData?.errors) {
                const msgs = Object.values(errData.errors).join('\n');
                setError(msgs);
            } else if (errData?.error?.includes("existe déjà")) {
                setError("Ce code division existe déjà. Veuillez en choisir un autre.");
            } else {
                setError(errData?.error || "Erreur lors de la modification");
            }
        } finally {
            setLoading(false);
        }
    };

    const moisList = [
        { key: 'janvier',   label: 'Janvier'   }, { key: 'fevrier',   label: 'Février'   },
        { key: 'mars',      label: 'Mars'      }, { key: 'avril',     label: 'Avril'     },
        { key: 'mai',       label: 'Mai'       }, { key: 'juin',      label: 'Juin'      },
        { key: 'juillet',   label: 'Juillet'   }, { key: 'aout',      label: 'Août'      },
        { key: 'septembre', label: 'Septembre' }, { key: 'octobre',   label: 'Octobre'   },
        { key: 'novembre',  label: 'Novembre'  }, { key: 'decembre',  label: 'Décembre'  },
    ];

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('fr-DZ').format(value || 0) + ' DA';
    };

    const SectionCard = ({ title, color = 'gray', children }) => (
        <div className={`bg-${color}-50 border border-${color}-100 p-4 rounded-xl`}>
            <h3 className="font-semibold text-gray-800 mb-3 text-sm">{title}</h3>
            {children}
        </div>
    );

    const FieldPair = ({ label, totalName, dexName, readOnly = false }) => {
        const isReadOnly = readOnly || RECALCUL_FIELDS.includes(totalName);
        return (
            <div className={`rounded-xl p-3 ${isReadOnly ? 'bg-amber-50 border border-amber-200' : 'bg-white border border-gray-200'}`}>
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{label}</span>
                    {isReadOnly && (
                        <span className="text-[10px] bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full font-medium">
                            ⟳ Auto-calculé
                        </span>
                    )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="text-xs text-gray-500 block mb-1">Total (DA)</label>
                        <input
                            type="number"
                            name={totalName}
                            value={formData[totalName]}
                            onChange={handleInputChange}
                            readOnly={isReadOnly}
                            className={`w-full h-9 px-3 rounded-[20px] border text-sm outline-none transition-colors
                                ${isReadOnly
                                    ? 'bg-amber-100/60 border-amber-300 text-amber-900 cursor-default font-medium'
                                    : 'bg-white border-gray-300 focus:border-orange-400'
                                }`}
                            placeholder="0"
                            step="any"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-gray-500 block mb-1">Dont DEX (DA)</label>
                        <input
                            type="number"
                            name={dexName}
                            value={formData[dexName]}
                            onChange={handleInputChange}
                            readOnly={isReadOnly}
                            className={`w-full h-9 px-3 rounded-[20px] border text-sm outline-none transition-colors
                                ${isReadOnly
                                    ? 'bg-amber-100/60 border-amber-300 text-amber-900 cursor-default font-medium'
                                    : 'bg-white border-gray-300 focus:border-orange-400'
                                }`}
                            placeholder="0"
                            step="any"
                        />
                    </div>
                </div>
            </div>
        );
    };

    const STEPS = ['Général', 'Réalisations & Prévisions', `Mensuel (${N + 1})`, 'Récapitulatif'];

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="w-[950px] max-h-[92vh] flex flex-col bg-white shadow-2xl rounded-2xl overflow-hidden">

                {/* En-tête */}
                <div className="px-6 pt-5 pb-4 border-b border-gray-100 bg-white">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">Modifier le Projet</h2>
                            <p className="text-sm text-orange-500 font-mono font-medium">
                                Ancien code: {originalCodeDivision}
                            </p>
                        </div>
                        <button onClick={onCancel} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M18 6L6 18M6 6L18 18" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </button>
                    </div>

                    {/* Steps */}
                    <div className="flex items-center gap-0">
                        {STEPS.map((label, idx) => {
                            const step = idx + 1;
                            const active = currentStep === step;
                            const done = currentStep > step;
                            return (
                                <React.Fragment key={step}>
                                    <div className="flex flex-col items-center">
                                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all
                                            ${done ? 'bg-green-500 text-white' : active ? 'bg-[#FF8500] text-white shadow-lg shadow-orange-200' : 'bg-gray-100 text-gray-400'}`}>
                                            {done ? '✓' : step}
                                        </div>
                                        <span className={`text-[10px] mt-0.5 whitespace-nowrap ${active ? 'text-orange-500 font-semibold' : 'text-gray-400'}`}>
                                            {label}
                                        </span>
                                    </div>
                                    {idx < STEPS.length - 1 && (
                                        <div className={`flex-1 h-0.5 mx-1 mb-3 transition-all ${done ? 'bg-green-400' : 'bg-gray-200'}`} />
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>

                {/* Corps */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl whitespace-pre-line">
                            {error}
                        </div>
                    )}

                    {/* ÉTAPE 1 : Infos générales */}
                    {currentStep === 1 && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Périmètre</label>
                                    <select name="perimetre" value={formData.perimetre} onChange={handleInputChange}
                                        className="w-full h-10 px-3 rounded-[20px] border border-gray-300 outline-none focus:border-orange-400">
                                        <option value="">Sélectionner</option>
                                        {perimetres.map(p => <option key={p.code_perimetre} value={p.code_perimetre}>{p.nom_perimetre}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Famille</label>
                                    <select name="famille" value={formData.famille} onChange={handleInputChange}
                                        className="w-full h-10 px-3 rounded-[20px] border border-gray-300 outline-none focus:border-orange-400">
                                        <option value="">Sélectionner</option>
                                        {familles.map(f => <option key={f.code_famille} value={f.code_famille}>{f.nom_famille}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Activité</label>
                                    <select name="activite" value={formData.activite} onChange={handleInputChange}
                                        className="w-full h-10 px-3 rounded-[20px] border border-gray-300 outline-none focus:border-orange-400">
                                        <option value="">Sélectionner</option>
                                        {activites.map(a => <option key={a.code} value={a.code}>{a.nom}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Code Division <span className="text-red-500">*</span>
                                        {formData.code_division !== originalCodeDivision && (
                                            <span className="ml-2 text-xs text-orange-600 font-normal">
                                                (Modifié: {originalCodeDivision} → {formData.code_division})
                                            </span>
                                        )}
                                    </label>
                                    <input 
                                        type="text" 
                                        name="code_division" 
                                        value={formData.code_division}
                                        onChange={handleInputChange}
                                        className="w-full h-10 px-3 rounded-[20px] border border-gray-300 outline-none focus:border-orange-400"
                                        placeholder="Entrez le code division"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        ⚠️ La modification du code division peut affecter les références existantes
                                    </p>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Libellé</label>
                                <textarea name="libelle" value={formData.libelle} onChange={handleInputChange} rows="3"
                                    className="w-full px-3 py-2 rounded-2xl border border-gray-300 outline-none resize-none focus:border-orange-400" />
                            </div>
                            <div className="w-40">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Année (N)</label>
                                <input type="number" name="annee" value={formData.annee}
                                    readOnly
                                    className="w-full h-10 px-3 rounded-[20px] border border-gray-200 bg-gray-100 text-gray-500 cursor-default outline-none" />
                            </div>
                        </div>
                    )}

                    {/* ÉTAPE 2 : Réalisations & Prévisions */}
                    {currentStep === 2 && (
                        <div className="space-y-3">
                            {/* <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg px-4 py-3">
                          </div> */}

                            <SectionCard title={`Réalisation Cumulée (${N - 1})`}>
                                <FieldPair
                                    label={`Réal. Cumulée ${N - 1}`}
                                    totalName="realisation_cumul_n_mins1_total"
                                    dexName="realisation_cumul_n_mins1_dont_dex"
                                    readOnly={false}
                                />
                            </SectionCard>

                            <SectionCard title={`Semestre 1 — ${N}`}>
                                <FieldPair
                                    label={`Réalisation S1 ${N}`}
                                    totalName="real_s1_n_total"
                                    dexName="real_s1_n_dont_dex"
                                    readOnly={false}
                                />
                            </SectionCard>

                            <SectionCard title={`Semestre 2 — Prévisions ${N}`}>
                                <FieldPair
                                    label={`Prév. S2 ${N}`}
                                    totalName="prev_s2_n_total"
                                    dexName="prev_s2_n_dont_dex"
                                    readOnly={false}
                                />
                            </SectionCard>

                            <SectionCard title={`Prév. Clôture ${N}  =  Réal. S1 + Prév. S2`} color="amber">
                                <FieldPair
                                    label={`Prév. Clôture ${N}`}
                                    totalName="prev_cloture_n_total"
                                    dexName="prev_cloture_n_dont_dex"
                                    readOnly={true}
                                />
                            </SectionCard>

                            <SectionCard title={`Prévisions ${N + 2} → ${N + 5}`}>
                                <div className="space-y-2">
                                    <FieldPair label={`${N + 2}`} totalName="prev_n_plus2_total" dexName="prev_n_plus2_dont_dex" readOnly={false} />
                                    <FieldPair label={`${N + 3}`} totalName="prev_n_plus3_total" dexName="prev_n_plus3_dont_dex" readOnly={false} />
                                    <FieldPair label={`${N + 4}`} totalName="prev_n_plus4_total" dexName="prev_n_plus4_dont_dex" readOnly={false} />
                                    <FieldPair label={`${N + 5}`} totalName="prev_n_plus5_total" dexName="prev_n_plus5_dont_dex" readOnly={false} />
                                </div>
                            </SectionCard>

                            <SectionCard title={`Reste à Réaliser  =  ${N + 2} + ${N + 3} + ${N + 4} + ${N + 5}`} color="amber">
                                <FieldPair
                                    label="Reste à Réaliser"
                                    totalName="reste_a_realiser_total"
                                    dexName="reste_a_realiser_dont_dex"
                                    readOnly={true}
                                />
                            </SectionCard>
                        </div>
                    )}

                    {/* ÉTAPE 3 : Mensuel N+1 */}
                    {currentStep === 3 && (
                        <div className="space-y-3">
                            <div className="flex items-center justify-between flex-wrap gap-2">
                                <p className="text-sm text-gray-600">
                                     Répartition mensuelle des prévisions <strong className="text-orange-600">{N + 1}</strong>
                                </p>
                                <div className="bg-gradient-to-r from-amber-100 to-yellow-100 border border-amber-300 px-4 py-1.5 rounded-full shadow-sm">
                                    <span className="text-sm font-medium text-amber-800">
                                        Somme = Prév. {N + 1} : <span className="font-bold text-amber-900">{formatCurrency(formData.prev_n_plus1_total)}</span>
                                    </span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                {moisList.map(mois => (
                                    <div key={mois.key} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-3 hover:shadow-md transition-shadow">
                                        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-2">{mois.label}</label>
                                        <div className="space-y-2">
                                            <div>
                                                <label className="text-[10px] text-gray-400 block mb-0.5">Total (DA)</label>
                                                <input
                                                    type="number"
                                                    name={`${mois.key}_total`}
                                                    value={formData[`${mois.key}_total`]}
                                                    onChange={handleInputChange}
                                                    className="w-full h-8 px-2 rounded-[20px] border border-gray-200 outline-none text-sm focus:border-orange-400 bg-white"
                                                    placeholder="0"
                                                    step="any"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-[10px] text-gray-400 block mb-0.5">Dont DEX (DA)</label>
                                                <input
                                                    type="number"
                                                    name={`${mois.key}_dont_dex`}
                                                    value={formData[`${mois.key}_dont_dex`]}
                                                    onChange={handleInputChange}
                                                    className="w-full h-8 px-2 rounded-[20px] border border-gray-200 outline-none text-sm focus:border-orange-400 bg-white"
                                                    placeholder="0"
                                                    step="any"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ÉTAPE 4 : Récapitulatif */}
                    {currentStep === 4 && (
                        <div className="space-y-4">
                            {/* En-tête */}
                            {/* <div className="relative overflow-hidden bg-gradient-to-r from-orange-600 to-orange-500 rounded-2xl p-5 text-white shadow-xl">
                                <div className="relative z-10 flex justify-between items-center">
                                    <div>
                                        <h3 className="text-xl font-bold">Récapitulatif du Projet</h3>
                                        <p className="text-sm opacity-90 mt-1 font-mono">
                                            {formData.code_division !== originalCodeDivision ? (
                                                <>
                                                    Code: <span className="line-through opacity-70">{originalCodeDivision}</span> → <strong>{formData.code_division}</strong>
                                                </>
                                            ) : (
                                                `Code: ${codeDivision}`
                                            )}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs opacity-75">Statut actuel</p>
                                        <div className="mt-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full inline-block">
                                            <span className="text-sm font-semibold">
                                                {projetData.statut === 'valide' ? '✅ Validé' : 
                                                 projetData.statut === 'rejete' ? '❌ Rejeté' : 
                                                 projetData.statut === 'en_attente' ? '⏳ En attente' : '📝 Brouillon'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div> */}

                            {/* Cartes KPI */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200 shadow-sm">
                                    <p className="text-xs text-emerald-600 font-medium">Coût Global Initial</p>
                                    <p className="text-2xl font-bold text-emerald-700 mt-1">{formatCurrency(formData.cout_initial_total)}</p>
                                    <p className="text-xs text-emerald-600 mt-2">Dont DEX: {formatCurrency(formData.cout_initial_dont_dex)}</p>
                                </div>
                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200 shadow-sm">
                                    <p className="text-xs text-blue-600 font-medium">Reste à réaliser</p>
                                    <p className="text-2xl font-bold text-blue-700 mt-1">{formatCurrency(formData.reste_a_realiser_total)}</p>
                                    <p className="text-xs text-blue-600 mt-2">Dont DEX: {formatCurrency(formData.reste_a_realiser_dont_dex)}</p>
                                </div>
                                <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200 shadow-sm">
                                    <p className="text-xs text-amber-600 font-medium">Prévision {N + 1}</p>
                                    <p className="text-2xl font-bold text-amber-700 mt-1">{formatCurrency(formData.prev_n_plus1_total)}</p>
                                    <p className="text-xs text-amber-600 mt-2">Dont DEX: {formatCurrency(formData.prev_n_plus1_dont_dex)}</p>
                                </div>
                            </div>

                            {/* Tableau des valeurs clés */}
                            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                                    <h4 className="font-semibold text-gray-700">Analyse financière détaillée</h4>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="bg-gray-100">
                                                <th className="px-4 py-3 text-left text-gray-600 font-semibold">Indicateur</th>
                                                <th className="px-4 py-3 text-right text-gray-600 font-semibold">Total (DA)</th>
                                                <th className="px-4 py-3 text-right text-gray-600 font-semibold">Dont DEX (DA)</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {[
                                                { label: `Réalisation Cumulée (${N - 1})`, total: "realisation_cumul_n_mins1_total", dex: "realisation_cumul_n_mins1_dont_dex" },
                                                { label: `Réalisation S1 (${N})`, total: "real_s1_n_total", dex: "real_s1_n_dont_dex" },
                                                { label: `Prévision S2 (${N})`, total: "prev_s2_n_total", dex: "prev_s2_n_dont_dex" },
                                                { label: `Prévision Clôture (${N})`, total: "prev_cloture_n_total", dex: "prev_cloture_n_dont_dex" },
                                                { label: `Prévision N+1 (${N + 1})`, total: "prev_n_plus1_total", dex: "prev_n_plus1_dont_dex" },
                                                { label: `Prévision N+2 (${N + 2})`, total: "prev_n_plus2_total", dex: "prev_n_plus2_dont_dex" },
                                                { label: `Prévision N+3 (${N + 3})`, total: "prev_n_plus3_total", dex: "prev_n_plus3_dont_dex" },
                                                { label: `Prévision N+4 (${N + 4})`, total: "prev_n_plus4_total", dex: "prev_n_plus4_dont_dex" },
                                                { label: `Prévision N+5 (${N + 5})`, total: "prev_n_plus5_total", dex: "prev_n_plus5_dont_dex" },
                                                { label: `Reste à réaliser (${N + 2} → ${N + 5})`, total: "reste_a_realiser_total", dex: "reste_a_realiser_dont_dex" },
                                            ].map((row) => (
                                                <tr key={row.total} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-4 py-3 font-medium text-gray-700">{row.label}</td>
                                                    <td className="px-4 py-3 text-right font-mono">{formatCurrency(formData[row.total])}</td>
                                                    <td className="px-4 py-3 text-right font-mono text-orange-600">{formatCurrency(formData[row.dex])}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Message d'avertissement */}
                            {formData.code_division !== originalCodeDivision && (
                                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
                                    <p className="text-xs text-yellow-800 flex items-center gap-2">
                                        <span className="text-lg">⚠️</span>
                                        Attention: Le code division sera modifié de "{originalCodeDivision}" vers "{formData.code_division}".
                                        Cette action peut impacter les références existantes.
                                    </p>
                                </div>
                            )}

                            {/* Message de confirmation */}
                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center">
                                <p className="text-xs text-blue-700"> Toutes les modifications seront enregistrées après validation.</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Pied de page */}
                <div className="border-t border-gray-100 px-6 py-4 bg-white flex justify-between items-center">
                    <button onClick={currentStep === 1 ? onCancel : prevStep}
                        className="px-5 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition text-sm font-medium">
                        {currentStep === 1 ? 'Annuler' : '← Précédent'}
                    </button>

                    {currentStep < 4 ? (
                        <button onClick={nextStep}
                            className="px-6 py-2 bg-[#FF8500] text-white rounded-full hover:bg-[#e67800] transition text-sm font-medium shadow-md shadow-orange-200">
                            Suivant →
                        </button>
                    ) : (
                        <button onClick={handleSubmit} disabled={loading}
                            className="px-6 py-2 bg-[#FF8500] text-white rounded-full hover:bg-[#e67800] transition disabled:opacity-50 flex items-center gap-2 text-sm font-medium shadow-md shadow-orange-200">
                            {loading && (
                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                                </svg>
                            )}
                            {loading ? 'Enregistrement...' : '✓ Enregistrer'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModifierProjet;