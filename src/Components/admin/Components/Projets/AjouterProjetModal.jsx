// // import React, { useState, useEffect } from 'react';
// // import { axiosInstance } from '../../../../axios';

// // const AjouterProjetModal = ({ isOpen, onClose, onSuccess, projet, axiosInstance: customAxiosInstance }) => {
// //     const [currentStep, setCurrentStep] = useState(1);
// //     const [loading, setLoading] = useState(false);
// //     const [error, setError] = useState('');
// //     const [regions, setRegions] = useState([]);
// //     const [perimetres, setPerimetres] = useState([]);
// //     const [familles, setFamilles] = useState([]);
// //     const [searchingCode, setSearchingCode] = useState(false);
// //     const [codeNotFound, setCodeNotFound] = useState(false);
// //     const [userRole, setUserRole] = useState(null);
// //     const [userRegionId, setUserRegionId] = useState(null);
// //     const [userRegionName, setUserRegionName] = useState(null);
    
// //     // Pour stocker les infos du projet existant (en lecture seule)
// //     const [existingProjetInfo, setExistingProjetInfo] = useState({
// //         region_nom: '',
// //         region_code: '',
// //         perimetre_nom: '',
// //         perimetre_code: '',
// //         famille_nom: '',
// //         famille_code: ''
// //     });

// //     const axiosInst = customAxiosInstance || axiosInstance;

// //     // Récupérer les infos utilisateur depuis localStorage
// //     useEffect(() => {
// //         const role = localStorage.getItem('role');
// //         const regionId = localStorage.getItem('region_id');
// //         const regionName = localStorage.getItem('region_name');
        
// //         setUserRole(role);
// //         setUserRegionId(regionId);
// //         setUserRegionName(regionName);
        
// //         console.log("Utilisateur connecté:", { role, regionId, regionName });
// //     }, []);

// //     const activites = [
// //         { code: 'PETROLE', nom: 'Pétrole' },
// //         { code: 'GAZ', nom: 'Gaz' },
// //         { code: 'PETROLE_GAZ', nom: 'Pétrole & Gaz' }
// //     ];

// //     const [formData, setFormData] = useState({
// //         type_projet: 'nouveau',
// //         code_division: '',
// //         libelle: '',
// //         region_id: '',
// //         perimetre: '',
// //         famille: '',
// //         activite: '',
// //         annee_debut_pmt: new Date().getFullYear(),
// //         annee_fin_pmt: new Date().getFullYear() + 4,
// //         description_technique: '',
// //         opportunite_projet: '',

// //         cout_initial_total: '',
// //         cout_initial_dont_dex: '',
// //         realisation_cumul_n_mins1_total: '',
// //         realisation_cumul_n_mins1_dont_dex: '',
// //         real_s1_n_total: '',
// //         real_s1_n_dont_dex: '',
// //         prev_s2_n_total: '',
// //         prev_s2_n_dont_dex: '',
// //         prev_cloture_n_total: '',
// //         prev_cloture_n_dont_dex: '',
// //         prev_n_plus1_total: '',
// //         prev_n_plus1_dont_dex: '',
// //         reste_a_realiser_total: '',
// //         reste_a_realiser_dont_dex: '',

// //         prev_n_plus2_total: '',
// //         prev_n_plus2_dont_dex: '',
// //         prev_n_plus3_total: '',
// //         prev_n_plus3_dont_dex: '',
// //         prev_n_plus4_total: '',
// //         prev_n_plus4_dont_dex: '',
// //         prev_n_plus5_total: '',
// //         prev_n_plus5_dont_dex: '',

// //         janvier_total: '', janvier_dont_dex: '',
// //         fevrier_total: '', fevrier_dont_dex: '',
// //         mars_total: '', mars_dont_dex: '',
// //         avril_total: '', avril_dont_dex: '',
// //         mai_total: '', mai_dont_dex: '',
// //         juin_total: '', juin_dont_dex: '',
// //         juillet_total: '', juillet_dont_dex: '',
// //         aout_total: '', aout_dont_dex: '',
// //         septembre_total: '', septembre_dont_dex: '',
// //         octobre_total: '', octobre_dont_dex: '',
// //         novembre_total: '', novembre_dont_dex: '',
// //         decembre_total: '', decembre_dont_dex: '',
// //     });

// //     const moisList = [
// //         { key: 'janvier', label: 'Janvier' }, { key: 'fevrier', label: 'Février' },
// //         { key: 'mars', label: 'Mars' }, { key: 'avril', label: 'Avril' },
// //         { key: 'mai', label: 'Mai' }, { key: 'juin', label: 'Juin' },
// //         { key: 'juillet', label: 'Juillet' }, { key: 'aout', label: 'Août' },
// //         { key: 'septembre', label: 'Septembre' }, { key: 'octobre', label: 'Octobre' },
// //         { key: 'novembre', label: 'Novembre' }, { key: 'decembre', label: 'Décembre' },
// //     ];

// //     // Règles de calcul automatiques
// //     const updatePrevClotureN = () => {
// //         const realS1Total = parseFloat(formData.real_s1_n_total) || 0;
// //         const prevS2Total = parseFloat(formData.prev_s2_n_total) || 0;
// //         const prevClotureTotal = realS1Total + prevS2Total;
// //         const realS1Dex = parseFloat(formData.real_s1_n_dont_dex) || 0;
// //         const prevS2Dex = parseFloat(formData.prev_s2_n_dont_dex) || 0;
// //         const prevClotureDex = realS1Dex + prevS2Dex;
        
// //         setFormData(prev => ({
// //             ...prev,
// //             prev_cloture_n_total: prevClotureTotal.toString(),
// //             prev_cloture_n_dont_dex: prevClotureDex.toString()
// //         }));
// //     };

// //     const updatePrevNPlus1 = () => {
// //         const totalMensuel = moisList.reduce((sum, m) => sum + (parseFloat(formData[`${m.key}_total`]) || 0), 0);
// //         const totalMensuelDex = moisList.reduce((sum, m) => sum + (parseFloat(formData[`${m.key}_dont_dex`]) || 0), 0);
        
// //         setFormData(prev => ({
// //             ...prev,
// //             prev_n_plus1_total: totalMensuel.toString(),
// //             prev_n_plus1_dont_dex: totalMensuelDex.toString()
// //         }));
// //     };

// //     const updateResteARealiser = () => {
// //         const n2 = parseFloat(formData.prev_n_plus2_total) || 0;
// //         const n3 = parseFloat(formData.prev_n_plus3_total) || 0;
// //         const n4 = parseFloat(formData.prev_n_plus4_total) || 0;
// //         const n5 = parseFloat(formData.prev_n_plus5_total) || 0;
// //         const resteTotal = n2 + n3 + n4 + n5;
// //         const n2Dex = parseFloat(formData.prev_n_plus2_dont_dex) || 0;
// //         const n3Dex = parseFloat(formData.prev_n_plus3_dont_dex) || 0;
// //         const n4Dex = parseFloat(formData.prev_n_plus4_dont_dex) || 0;
// //         const n5Dex = parseFloat(formData.prev_n_plus5_dont_dex) || 0;
// //         const resteDex = n2Dex + n3Dex + n4Dex + n5Dex;
        
// //         setFormData(prev => ({
// //             ...prev,
// //             reste_a_realiser_total: resteTotal.toString(),
// //             reste_a_realiser_dont_dex: resteDex.toString()
// //         }));
// //     };

// //     const updateCoutGlobal = () => {
// //         const realisationCumul = parseFloat(formData.realisation_cumul_n_mins1_total) || 0;
// //         const prevCloture = parseFloat(formData.prev_cloture_n_total) || 0;
// //         const prevNPlus1 = parseFloat(formData.prev_n_plus1_total) || 0;
// //         const resteARealiser = parseFloat(formData.reste_a_realiser_total) || 0;
// //         const coutTotal = realisationCumul + prevCloture + prevNPlus1 + resteARealiser;
// //         const realisationCumulDex = parseFloat(formData.realisation_cumul_n_mins1_dont_dex) || 0;
// //         const prevClotureDex = parseFloat(formData.prev_cloture_n_dont_dex) || 0;
// //         const prevNPlus1Dex = parseFloat(formData.prev_n_plus1_dont_dex) || 0;
// //         const resteARealiserDex = parseFloat(formData.reste_a_realiser_dont_dex) || 0;
// //         const coutDex = realisationCumulDex + prevClotureDex + prevNPlus1Dex + resteARealiserDex;
        
// //         setFormData(prev => ({
// //             ...prev,
// //             cout_initial_total: coutTotal.toString(),
// //             cout_initial_dont_dex: coutDex.toString()
// //         }));
// //     };

// //     // Effets pour les calculs automatiques
// //     useEffect(() => {
// //         if (formData.type_projet === 'en_cours') updatePrevClotureN();
// //     }, [formData.real_s1_n_total, formData.real_s1_n_dont_dex, formData.prev_s2_n_total, formData.prev_s2_n_dont_dex]);

// //     useEffect(() => {
// //         if (formData.type_projet === 'en_cours') updatePrevNPlus1();
// //     }, [moisList.map(m => formData[`${m.key}_total`] + formData[`${m.key}_dont_dex`]).join(',')]);

// //     useEffect(() => {
// //         if (formData.type_projet === 'en_cours') updateResteARealiser();
// //     }, [formData.prev_n_plus2_total, formData.prev_n_plus2_dont_dex, formData.prev_n_plus3_total, formData.prev_n_plus3_dont_dex, formData.prev_n_plus4_total, formData.prev_n_plus4_dont_dex, formData.prev_n_plus5_total, formData.prev_n_plus5_dont_dex]);

// //     useEffect(() => {
// //         if (formData.type_projet === 'en_cours') updateCoutGlobal();
// //     }, [formData.realisation_cumul_n_mins1_total, formData.realisation_cumul_n_mins1_dont_dex, formData.prev_cloture_n_total, formData.prev_cloture_n_dont_dex, formData.prev_n_plus1_total, formData.prev_n_plus1_dont_dex, formData.reste_a_realiser_total, formData.reste_a_realiser_dont_dex]);

// //     // ============ FONCTIONS API ============

// //     // Chargement des régions - pour responsable, récupérer SA région par ID
// //     const fetchRegions = async () => {
// //         try {
// //             let allRegions = [];
            
// //             if (userRole === 'responsable_structure' && userRegionId) {
// //                 // Responsable: récupérer SA région par ID MongoDB
// //                 const response = await axiosInst.get(`/params/regions/id/${userRegionId}`);
// //                 if (response.data && response.data.data) {
// //                     allRegions = [response.data.data];
// //                     // Stocker l'ID MongoDB dans formData
// //                     setFormData(prev => ({ 
// //                         ...prev, 
// //                         region_id: response.data.data._id
// //                     }));
// //                     if (!userRegionName && response.data.data.nom_region) {
// //                         setUserRegionName(response.data.data.nom_region);
// //                     }
// //                 }
// //             } else {
// //                 // Admin: toutes les régions
// //                 const response = await axiosInst.get('/params/regions');
// //                 allRegions = response.data.data || [];
// //             }
            
// //             setRegions(allRegions);
// //         } catch (err) {
// //             console.error("Erreur chargement régions:", err);
// //             setRegions([]);
// //         }
// //     };

// //     // Chargement des périmètres - utilise l'ID MongoDB (pour nouveau projet)
// //     const fetchPerimetres = async () => {
// //         try {
// //             if (!formData.region_id) {
// //                 console.log("Aucune région sélectionnée");
// //                 setPerimetres([]);
// //                 return;
// //             }
            
// //             console.log("Récupération périmètres pour ID région:", formData.region_id);
// //             const response = await axiosInst.get(`/params/perimetres/region/${formData.region_id}`);
// //             console.log("Périmètres trouvés:", response.data?.data?.length || 0);
// //             setPerimetres(response.data.data || []);
// //         } catch (err) {
// //             console.error("Erreur chargement périmètres:", err);
// //             setPerimetres([]);
// //         }
// //     };

// //     // Chargement des familles - utilise l'ID MongoDB + code périmètre (pour nouveau projet)
// //     const fetchFamilles = async () => {
// //         try {
// //             if (!formData.region_id || !formData.perimetre) {
// //                 console.log("Région ou périmètre manquant");
// //                 setFamilles([]);
// //                 return;
// //             }
            
// //             console.log("Récupération familles pour:", { 
// //                 region_id: formData.region_id, 
// //                 perimetre: formData.perimetre 
// //             });
// //             const response = await axiosInst.get(`/params/familles/`);
// //             console.log("Familles trouvées:", response.data?.data?.length || 0);
// //             setFamilles(response.data.data || []);
// //         } catch (err) {
// //             console.error("Erreur chargement familles:", err);
// //             setFamilles([]);
// //         }
// //     };

// //     // Fonction pour récupérer les détails d'une région par son code (pour projet en cours)
// //     const getRegionDetailsByCode = async (regionCode) => {
// //         try {
// //             const response = await axiosInst.get(`/params/regions/${regionCode}`);
// //             if (response.data && response.data.data) {
// //                 return response.data.data;
// //             }
// //             return null;
// //         } catch (err) {
// //             console.error("Erreur récupération région par code:", err);
// //             return null;
// //         }
// //     };

// //     // ============ USEFFECTS ============

// //     // Chargement initial des régions (une seule fois quand userRole est chargé)
// //     useEffect(() => {
// //         if (userRole !== null) {
// //             fetchRegions();
// //         }
// //     }, [userRole, userRegionId]);

// //     // Chargement des périmètres quand la région change (UNIQUEMENT pour nouveau projet)
// //     useEffect(() => {
// //         if (formData.region_id && formData.type_projet === 'nouveau') {
// //             fetchPerimetres();
// //             setFormData(prev => ({ ...prev, perimetre: '', famille: '' }));
// //             setFamilles([]);
// //         }
// //     }, [formData.region_id, formData.type_projet]);

// //     // Chargement des familles quand le périmètre change (UNIQUEMENT pour nouveau projet)
// //     useEffect(() => {
// //         if (formData.perimetre && formData.region_id && formData.type_projet === 'nouveau') {
// //             fetchFamilles();
// //             setFormData(prev => ({ ...prev, famille: '' }));
// //         }
// //     }, [formData.perimetre, formData.region_id, formData.type_projet]);

// //     // Recherche automatique du projet (pour projet en cours)
// //     useEffect(() => {
// //         const delayDebounceFn = setTimeout(() => {
// //             if (formData.type_projet === 'en_cours' && formData.code_division && formData.code_division.length >= 3) {
// //                 searchProjetByCode(formData.code_division);
// //             }
// //         }, 500);
// //         return () => clearTimeout(delayDebounceFn);
// //     }, [formData.code_division, formData.type_projet]);

// //     // ============ RECHERCHE PROJET EXISTANT ============

// //     const searchProjetByCode = async (codeDivision) => {
// //         setSearchingCode(true);
// //         setCodeNotFound(false);
// //         try {
// //             const response = await axiosInst.get(`/recap/budget/historique/${codeDivision}/actif/`);
// //             if (response.data && response.data.version_active) {
// //                 const projetData = response.data.version_active;
                
// //                 // Récupérer les codes du backend
// //                 const regionCode = projetData.region || projetData.region_id || '';
// //                 const perimetreCode = projetData.perimetre || projetData.perm || '';
// //                 const familleCode = projetData.famille || '';
                
// //                 console.log("Codes récupérés du projet:", { regionCode, perimetreCode, familleCode });
                
// //                 // Vérifier si le responsable a le droit d'accéder à cette région
// //                 if (userRole === 'responsable_structure' && userRegionId) {
// //                     const regionDetails = await getRegionDetailsByCode(regionCode);
// //                     if (regionDetails && regionDetails._id !== userRegionId) {
// //                         setError("Vous n'avez pas accès aux projets de cette région");
// //                         setCodeNotFound(true);
// //                         setSearchingCode(false);
// //                         return;
// //                     }
// //                 }
                
// //                 // Récupérer les noms complets pour affichage
// //                 let regionNom = '';
// //                 let perimetreNom = '';
// //                 let familleNom = '';
                
// //                 if (regionCode) {
// //                     const regionDetails = await getRegionDetailsByCode(regionCode);
// //                     regionNom = regionDetails?.nom_region || regionCode;
// //                 }
                
// //                 if (perimetreCode) {
// //                     const perimetreFound = perimetres.find(p => p.code_perimetre === perimetreCode);
// //                     perimetreNom = perimetreFound?.nom_perimetre || perimetreCode;
// //                 }
                
// //                 if (familleCode) {
// //                     const familleFound = familles.find(f => f.code_famille === familleCode);
// //                     familleNom = familleFound?.nom_famille || familleCode;
// //                 }
                
// //                 setExistingProjetInfo({
// //                     region_nom: regionNom,
// //                     region_code: regionCode,
// //                     perimetre_nom: perimetreNom,
// //                     perimetre_code: perimetreCode,
// //                     famille_nom: familleNom,
// //                     famille_code: familleCode
// //                 });
                
// //                 setFormData(prev => ({
// //                     ...prev,
// //                     libelle: projetData.libelle || '',
// //                     region_id: regionCode,
// //                     perimetre: perimetreCode,
// //                     famille: familleCode,
// //                     activite: projetData.activite || 'PETROLE',
// //                     annee_debut_pmt: projetData.annee_debut_pmt || projetData.annee_pmt || new Date().getFullYear(),
// //                     annee_fin_pmt: projetData.annee_fin_pmt || (projetData.annee_pmt ? projetData.annee_pmt + 4 : new Date().getFullYear() + 4),
// //                     description_technique: projetData.description_technique || '',
// //                     opportunite_projet: projetData.opportunite_projet || '',
                    
// //                     // Réinitialiser tous les champs financiers
// //                     cout_initial_total: '',
// //                     cout_initial_dont_dex: '',
// //                     realisation_cumul_n_mins1_total: '',
// //                     realisation_cumul_n_mins1_dont_dex: '',
// //                     real_s1_n_total: '',
// //                     real_s1_n_dont_dex: '',
// //                     prev_s2_n_total: '',
// //                     prev_s2_n_dont_dex: '',
// //                     prev_cloture_n_total: '',
// //                     prev_cloture_n_dont_dex: '',
// //                     prev_n_plus1_total: '',
// //                     prev_n_plus1_dont_dex: '',
// //                     reste_a_realiser_total: '',
// //                     reste_a_realiser_dont_dex: '',
// //                     prev_n_plus2_total: '',
// //                     prev_n_plus2_dont_dex: '',
// //                     prev_n_plus3_total: '',
// //                     prev_n_plus3_dont_dex: '',
// //                     prev_n_plus4_total: '',
// //                     prev_n_plus4_dont_dex: '',
// //                     prev_n_plus5_total: '',
// //                     prev_n_plus5_dont_dex: '',
                    
// //                     ...Object.fromEntries(moisList.flatMap(m => [
// //                         [`${m.key}_total`, ''],
// //                         [`${m.key}_dont_dex`, '']
// //                     ]))
// //                 }));
                
// //                 setCodeNotFound(false);
// //             } else {
// //                 setCodeNotFound(true);
// //                 setExistingProjetInfo({
// //                     region_nom: '',
// //                     region_code: '',
// //                     perimetre_nom: '',
// //                     perimetre_code: '',
// //                     famille_nom: '',
// //                     famille_code: ''
// //                 });
// //             }
// //         } catch (err) {
// //             console.error("Erreur recherche projet:", err);
// //             setCodeNotFound(true);
// //             setExistingProjetInfo({
// //                 region_nom: '',
// //                 region_code: '',
// //                 perimetre_nom: '',
// //                 perimetre_code: '',
// //                 famille_nom: '',
// //                 famille_code: ''
// //             });
// //         } finally {
// //             setSearchingCode(false);
// //         }
// //     };

// //     // ============ HANDLERS ============

// //     const handleInputChange = (e) => {
// //         const { name, value } = e.target;
// //         setFormData(prev => ({ ...prev, [name]: value }));
// //     };

// //     const handleTypeProjetChange = (type) => {
// //         setFormData(prev => ({
// //             ...prev,
// //             type_projet: type,
// //             code_division: type === 'nouveau' ? '' : prev.code_division,
// //             region_id: type === 'nouveau' && userRole === 'responsable_structure' ? userRegionId : (type === 'nouveau' ? '' : prev.region_id),
// //             perimetre: type === 'nouveau' ? '' : prev.perimetre,
// //             famille: type === 'nouveau' ? '' : prev.famille,
// //         }));
// //         setCodeNotFound(false);
// //         setExistingProjetInfo({
// //             region_nom: '',
// //             region_code: '',
// //             perimetre_nom: '',
// //             perimetre_code: '',
// //             famille_nom: '',
// //             famille_code: ''
// //         });
// //     };

// //     const validateStep = () => {
// //         if (currentStep === 1) {
// //             if (!formData.libelle) { setError("Veuillez saisir le libellé"); return false; }
// //             if (!formData.code_division) { setError("Veuillez saisir le code division"); return false; }
// //             if (formData.type_projet === 'en_cours' && codeNotFound) {
// //                 setError("Code division introuvable");
// //                 return false;
// //             }
// //             if (!formData.region_id) { setError("Veuillez sélectionner une région"); return false; }
// //             if (!formData.perimetre) { setError("Veuillez sélectionner un périmètre"); return false; }
// //             if (!formData.famille) { setError("Veuillez sélectionner une famille"); return false; }
// //         }
// //         setError('');
// //         return true;
// //     };

// //     const nextStep = () => { if (validateStep()) setCurrentStep(s => s + 1); };
// //     const prevStep = () => { setCurrentStep(s => s - 1); setError(''); };

// //     // ============ SOUMISSION ============

// //     // const handleSubmit = async () => {
// //     //     if (!validateStep()) return;
// //     //     setLoading(true);
// //     //     setError('');

// //     //     const toFloat = (val) => {
// //     //         if (!val && val !== 0) return 0;
// //     //         const num = parseFloat(val);
// //     //         return isNaN(num) ? 0 : num;
// //     //     };

// //     //     // Convertir l'ID MongoDB en CODE région pour l'envoi
// //     //     let regionCode = formData.region_id;
// //     //     if (formData.region_id && regions.length > 0 && formData.type_projet === 'nouveau') {
// //     //         const selectedRegion = regions.find(r => r._id === formData.region_id);
// //     //         if (selectedRegion) {
// //     //             regionCode = selectedRegion.code_region;
// //     //         }
// //     //     }

// //     //     const payload = {
// //     //         activite: formData.activite || "PETROLE",
// //     //         perimetre: formData.perimetre,
// //     //         famille: formData.famille,
// //     //         code_division: formData.code_division,
// //     //         libelle: formData.libelle,
// //     //         type_projet: formData.type_projet,
// //     //         intervalle_pmt: [formData.annee_debut_pmt, formData.annee_fin_pmt],
// //     //         description_technique: formData.description_technique,
// //     //         opportunite_projet: formData.opportunite_projet,
// //     //         annee_debut_pmt: formData.annee_debut_pmt,
// //     //         annee_fin_pmt: formData.annee_fin_pmt,
// //     //         region: regionCode,

// //     //         cout_initial_total: toFloat(formData.cout_initial_total),
// //     //         cout_initial_dont_dex: toFloat(formData.cout_initial_dont_dex),
// //     //         realisation_cumul_n_mins1_total: toFloat(formData.realisation_cumul_n_mins1_total),
// //     //         realisation_cumul_n_mins1_dont_dex: toFloat(formData.realisation_cumul_n_mins1_dont_dex),
// //     //         real_s1_n_total: toFloat(formData.real_s1_n_total),
// //     //         real_s1_n_dont_dex: toFloat(formData.real_s1_n_dont_dex),
// //     //         prev_s2_n_total: toFloat(formData.prev_s2_n_total),
// //     //         prev_s2_n_dont_dex: toFloat(formData.prev_s2_n_dont_dex),
// //     //         prev_cloture_n_total: toFloat(formData.prev_cloture_n_total),
// //     //         prev_cloture_n_dont_dex: toFloat(formData.prev_cloture_n_dont_dex),
// //     //         prev_n_plus1_total: toFloat(formData.prev_n_plus1_total),
// //     //         prev_n_plus1_dont_dex: toFloat(formData.prev_n_plus1_dont_dex),
// //     //         reste_a_realiser_total: toFloat(formData.reste_a_realiser_total),
// //     //         reste_a_realiser_dont_dex: toFloat(formData.reste_a_realiser_dont_dex),

// //     //         prev_n_plus2_total: toFloat(formData.prev_n_plus2_total),
// //     //         prev_n_plus2_dont_dex: toFloat(formData.prev_n_plus2_dont_dex),
// //     //         prev_n_plus3_total: toFloat(formData.prev_n_plus3_total),
// //     //         prev_n_plus3_dont_dex: toFloat(formData.prev_n_plus3_dont_dex),
// //     //         prev_n_plus4_total: toFloat(formData.prev_n_plus4_total),
// //     //         prev_n_plus4_dont_dex: toFloat(formData.prev_n_plus4_dont_dex),
// //     //         prev_n_plus5_total: toFloat(formData.prev_n_plus5_total),
// //     //         prev_n_plus5_dont_dex: toFloat(formData.prev_n_plus5_dont_dex),

// //     //         ...Object.fromEntries(moisList.flatMap(m => [
// //     //             [`${m.key}_total`, toFloat(formData[`${m.key}_total`])],
// //     //             [`${m.key}_dont_dex`, toFloat(formData[`${m.key}_dont_dex`])],
// //     //         ])),
// //     //     };

// //     //     try {
// //     //         const response = await axiosInst.post('/recap/budget/nouveau-projet/', payload);
// //     //         if (response.data.success || response.data.status === 'success') {
// //     //             onSuccess(projet ? 'Projet modifié avec succès' : 'Projet créé avec succès');
// //     //             console.log(response.data)
// //     //             onClose();
// //     //         }
// //     //     } catch (err) {
// //     //         console.error("Erreur:", err);
// //     //         const errData = err.response?.data;
// //     //         if (errData?.errors) {
// //     //             const msgs = Object.values(errData.errors).join('\n');
// //     //             setError(msgs);
// //     //         } else {
// //     //             setError(errData?.error || errData?.message || "Erreur lors de l'enregistrement");
// //     //         }
// //     //     } finally {
// //     //         setLoading(false);
// //     //     }
// //     // };
// //     // ============ SOUMISSION ============

// // const handleSubmit = async () => {
// //     if (!validateStep()) return;
// //     setLoading(true);
// //     setError('');

// //     const toFloat = (val) => {
// //         if (!val && val !== 0) return 0;
// //         const num = parseFloat(val);
// //         return isNaN(num) ? 0 : num;
// //     };

// //     // Convertir l'ID MongoDB en CODE région pour l'envoi
// //     let regionCode = formData.region_id;
// //     if (formData.region_id && regions.length > 0 && formData.type_projet === 'nouveau') {
// //         const selectedRegion = regions.find(r => r._id === formData.region_id);
// //         if (selectedRegion) {
// //             regionCode = selectedRegion.code_region;
// //         }
// //     }

// //     const payload = {
// //         activite: formData.activite || "PETROLE",
// //         perimetre: formData.perimetre,
// //         famille: formData.famille,
// //         code_division: formData.code_division,
// //         libelle: formData.libelle,
// //         type_projet: formData.type_projet,
// //         intervalle_pmt: [formData.annee_debut_pmt, formData.annee_fin_pmt],
// //         description_technique: formData.description_technique,
// //         opportunite_projet: formData.opportunite_projet,
// //         annee_debut_pmt: formData.annee_debut_pmt,
// //         annee_fin_pmt: formData.annee_fin_pmt,
// //         region: regionCode,

// //         cout_initial_total: toFloat(formData.cout_initial_total),
// //         cout_initial_dont_dex: toFloat(formData.cout_initial_dont_dex),
// //         realisation_cumul_n_mins1_total: toFloat(formData.realisation_cumul_n_mins1_total),
// //         realisation_cumul_n_mins1_dont_dex: toFloat(formData.realisation_cumul_n_mins1_dont_dex),
// //         real_s1_n_total: toFloat(formData.real_s1_n_total),
// //         real_s1_n_dont_dex: toFloat(formData.real_s1_n_dont_dex),
// //         prev_s2_n_total: toFloat(formData.prev_s2_n_total),
// //         prev_s2_n_dont_dex: toFloat(formData.prev_s2_n_dont_dex),
// //         prev_cloture_n_total: toFloat(formData.prev_cloture_n_total),
// //         prev_cloture_n_dont_dex: toFloat(formData.prev_cloture_n_dont_dex),
// //         prev_n_plus1_total: toFloat(formData.prev_n_plus1_total),
// //         prev_n_plus1_dont_dex: toFloat(formData.prev_n_plus1_dont_dex),
// //         reste_a_realiser_total: toFloat(formData.reste_a_realiser_total),
// //         reste_a_realiser_dont_dex: toFloat(formData.reste_a_realiser_dont_dex),

// //         prev_n_plus2_total: toFloat(formData.prev_n_plus2_total),
// //         prev_n_plus2_dont_dex: toFloat(formData.prev_n_plus2_dont_dex),
// //         prev_n_plus3_total: toFloat(formData.prev_n_plus3_total),
// //         prev_n_plus3_dont_dex: toFloat(formData.prev_n_plus3_dont_dex),
// //         prev_n_plus4_total: toFloat(formData.prev_n_plus4_total),
// //         prev_n_plus4_dont_dex: toFloat(formData.prev_n_plus4_dont_dex),
// //         prev_n_plus5_total: toFloat(formData.prev_n_plus5_total),
// //         prev_n_plus5_dont_dex: toFloat(formData.prev_n_plus5_dont_dex),

// //         ...Object.fromEntries(moisList.flatMap(m => [
// //             [`${m.key}_total`, toFloat(formData[`${m.key}_total`])],
// //             [`${m.key}_dont_dex`, toFloat(formData[`${m.key}_dont_dex`])],
// //         ])),
// //     };

// //     try {
// //         let response;
        
// //         // Choisir l'URL selon le type de projet
// //         if (formData.type_projet === 'nouveau') {
// //             // Nouveau projet
// //             response = await axiosInst.post('/recap/budget/nouveau-projet/', payload);
// //         } else {
// //             // Projet en cours - utiliser l'URL avec code_division
// //             response = await axiosInst.post(
// //                 `/recap/budget/responsable/modifier-projet/${formData.code_division}/`, 
// //                 payload
// //             );
// //         }
        
// //         if (response.data.success || response.data.status === 'success') {
// //             onSuccess(projet ? 'Projet modifié avec succès' : 'Projet créé avec succès');
// //             console.log(response.data);
// //             onClose();
// //         }
// //     } catch (err) {
// //         console.error("Erreur:", err);
// //         const errData = err.response?.data;
// //         if (errData?.errors) {
// //             const msgs = Object.values(errData.errors).join('\n');
// //             setError(msgs);
// //         } else {
// //             setError(errData?.error || errData?.message || "Erreur lors de l'enregistrement");
// //         }
// //     } finally {
// //         setLoading(false);
// //     }
// // };

// //     // ============ UTILITAIRES ============

// //     const formatCurrency = (value) => {
// //         if (!value && value !== 0) return '0 DA';
// //         const num = parseFloat(value);
// //         if (isNaN(num)) return '0 DA';
// //         return new Intl.NumberFormat('fr-DZ').format(num) + ' DA';
// //     };

// //     const totalPrevisionsPluri = () => {
// //         const n2 = parseFloat(formData.prev_n_plus2_total) || 0;
// //         const n3 = parseFloat(formData.prev_n_plus3_total) || 0;
// //         const n4 = parseFloat(formData.prev_n_plus4_total) || 0;
// //         const n5 = parseFloat(formData.prev_n_plus5_total) || 0;
// //         return n2 + n3 + n4 + n5;
// //     };

// //     const totalPrevisionsPluriDex = () => {
// //         const n2 = parseFloat(formData.prev_n_plus2_dont_dex) || 0;
// //         const n3 = parseFloat(formData.prev_n_plus3_dont_dex) || 0;
// //         const n4 = parseFloat(formData.prev_n_plus4_dont_dex) || 0;
// //         const n5 = parseFloat(formData.prev_n_plus5_dont_dex) || 0;
// //         return n2 + n3 + n4 + n5;
// //     };

// //     const totalMensuel = () => {
// //         return moisList.reduce((sum, m) => sum + (parseFloat(formData[`${m.key}_total`]) || 0), 0);
// //     };

// //     const totalMensuelDex = () => {
// //         return moisList.reduce((sum, m) => sum + (parseFloat(formData[`${m.key}_dont_dex`]) || 0), 0);
// //     };

// //     const coutGlobal = () => {
// //         if (formData.type_projet === 'en_cours') {
// //             return (parseFloat(formData.cout_initial_total) || 0);
// //         }
// //         return totalPrevisionsPluri() + totalMensuel();
// //     };

// //     // const anneeBase = parseInt(formData.annee_debut_pmt) || new Date().getFullYear();
// //     const anneeBase = (parseInt(formData.annee_debut_pmt) || new Date().getFullYear()) - 1;
// //     const STEPS = ['Identification', `Prévisions ${formData.annee_debut_pmt}`, `Prévisions ${anneeBase+2}→${anneeBase+5}`, 'Récapitulatif'];

// //     if (!isOpen) return null;

// //     // ============ RENDU JSX ============

// //     return (
// //         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
// //             <div className="w-[950px] max-h-[92vh] flex flex-col bg-white shadow-2xl rounded-2xl overflow-hidden">
// //                 {/* En-tête */}
// //                 <div className="px-6 pt-5 pb-4 border-b border-gray-100 bg-white">
// //                     <div className="flex justify-between items-start mb-4">
// //                         <div>
// //                             <h2 className="text-lg font-bold text-gray-900">
// //                                 {projet ? 'Modifier le Projet' : 'Nouveau Projet'}
// //                             </h2>
// //                             {userRole === 'responsable_structure' && userRegionName && formData.type_projet === 'nouveau' && (
// //                                 <p className="text-sm text-blue-600 font-medium mt-1">
// //                                      Vous créez un projet dans la région : <strong>{userRegionName}</strong>
// //                                 </p>
// //                             )}
// //                             {formData.type_projet === 'en_cours' && formData.code_division && (
// //                                 <p className="text-sm text-orange-500 font-mono font-medium mt-1">
// //                                     Code recherché: {formData.code_division}
// //                                 </p>
// //                             )}
// //                         </div>
// //                         <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
// //                             <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
// //                                 <path d="M18 6L6 18M6 6L18 18" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
// //                             </svg>
// //                         </button>
// //                     </div>

// //                     {/* Steps */}
// //                     <div className="flex items-center gap-0">
// //                         {STEPS.map((label, idx) => {
// //                             const step = idx + 1;
// //                             const active = currentStep === step;
// //                             const done = currentStep > step;
// //                             return (
// //                                 <React.Fragment key={step}>
// //                                     <div className="flex flex-col items-center">
// //                                         <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all
// //                                             ${done ? 'bg-green-500 text-white' : active ? 'bg-[#FF8500] text-white shadow-lg shadow-orange-200' : 'bg-gray-100 text-gray-400'}`}>
// //                                             {done ? '✓' : step}
// //                                         </div>
// //                                         <span className={`text-[10px] mt-0.5 whitespace-nowrap ${active ? 'text-orange-500 font-semibold' : 'text-gray-400'}`}>
// //                                             {label}
// //                                         </span>
// //                                     </div>
// //                                     {idx < STEPS.length - 1 && (
// //                                         <div className={`flex-1 h-0.5 mx-1 mb-3 transition-all ${done ? 'bg-green-400' : 'bg-gray-200'}`} />
// //                                     )}
// //                                 </React.Fragment>
// //                             );
// //                         })}
// //                     </div>
// //                 </div>

// //                 {/* Corps avec scroll */}
// //                 <div className="flex-1 overflow-y-auto p-6 space-y-4">
// //                     {error && (
// //                         <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl whitespace-pre-line">
// //                             {error}
// //                         </div>
// //                     )}

// //                     {/* ÉTAPE 1 : Identification */}
// //                     {currentStep === 1 && (
// //                         <div className="space-y-4">
// //                             {/* Type de projet */}
// //                             <div className="grid grid-cols-2 gap-4">
// //                                 <div
// //                                     onClick={() => handleTypeProjetChange('nouveau')}
// //                                     className={`cursor-pointer rounded-xl p-4 border-2 transition-all ${
// //                                         formData.type_projet === 'nouveau'
// //                                             ? 'border-orange-400 bg-orange-50'
// //                                             : 'border-gray-200 hover:border-gray-300'
// //                                     }`}
// //                                 >
// //                                     <div className="flex items-center gap-3">
// //                                         <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
// //                                             formData.type_projet === 'nouveau' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-500'
// //                                         }`}>
// //                                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
// //                                             </svg>
// //                                         </div>
// //                                         <div>
// //                                             <h4 className={`font-semibold ${formData.type_projet === 'nouveau' ? 'text-orange-600' : 'text-gray-800'}`}>
// //                                                 Nouveau projet
// //                                             </h4>
// //                                             <p className="text-xs text-gray-500">Créer à partir de zéro</p>
// //                                         </div>
// //                                     </div>
// //                                 </div>

// //                                 <div
// //                                     onClick={() => handleTypeProjetChange('en_cours')}
// //                                     className={`cursor-pointer rounded-xl p-4 border-2 transition-all ${
// //                                         formData.type_projet === 'en_cours'
// //                                             ? 'border-orange-400 bg-orange-50'
// //                                             : 'border-gray-200 hover:border-gray-300'
// //                                     }`}
// //                                 >
// //                                     <div className="flex items-center gap-3">
// //                                         <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
// //                                             formData.type_projet === 'en_cours' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-500'
// //                                         }`}>
// //                                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
// //                                             </svg>
// //                                         </div>
// //                                         <div>
// //                                             <h4 className={`font-semibold ${formData.type_projet === 'en_cours' ? 'text-orange-600' : 'text-gray-800'}`}>
// //                                                 Projet en cours
// //                                             </h4>
// //                                             <p className="text-xs text-gray-500">Reprendre existant</p>
// //                                         </div>
// //                                     </div>
// //                                 </div>
// //                             </div>

// //                             {/* Code division */}
// //                             <div>
// //                                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                                     N°:Cpte Analytique<span className="text-red-500">*</span>
// //                                 </label>
// //                                 <div className="relative">
// //                                     <input
// //                                         type="text"
// //                                         name="code_division"
// //                                         value={formData.code_division}
// //                                         onChange={handleInputChange}
// //                                         placeholder={formData.type_projet === 'en_cours' ? "Rechercher par code..." : "ex: PROJ-2024-001"}
// //                                         className={`w-full h-10 px-3 rounded-[20px] border outline-none focus:border-orange-400 ${
// //                                             codeNotFound && formData.type_projet === 'en_cours'
// //                                                 ? 'border-red-400 bg-red-50'
// //                                                 : 'border-gray-300'
// //                                         }`}
// //                                     />
// //                                     {searchingCode && (
// //                                         <div className="absolute right-3 top-1/2 -translate-y-1/2">
// //                                             <svg className="animate-spin h-4 w-4 text-orange-500" viewBox="0 0 24 24">
// //                                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
// //                                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
// //                                             </svg>
// //                                         </div>
// //                                     )}
// //                                 </div>
// //                                 {codeNotFound && formData.type_projet === 'en_cours' && (
// //                                     <p className="text-xs text-red-500 mt-1">Code division introuvable</p>
// //                                 )}
// //                                 {!codeNotFound && formData.type_projet === 'en_cours' && formData.code_division && !searchingCode && (
// //                                     <p className="text-xs text-green-600 mt-1">✓ Projet trouvé - Informations chargées</p>
// //                                 )}
// //                             </div>

// //                             {/* Libellé */}
// //                             <div>
// //                                 <label className="block text-sm font-medium text-gray-700 mb-1">Libellé du projet</label>
// //                                 <input
// //                                     type="text"
// //                                     name="libelle"
// //                                     value={formData.libelle}
// //                                     onChange={handleInputChange}
// //                                     className="w-full h-10 px-3 rounded-[20px] border border-gray-300 outline-none focus:border-orange-400"
// //                                     placeholder="Nom du projet"
// //                                 />
// //                             </div>

// //                             {/* Période PMT */}
// //                             <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
// //                                 <label className="block text-sm font-medium text-gray-700 mb-2"> PMT</label>
// //                                 <div className="grid grid-cols-2 gap-4">
// //                                     <div>
// //                                         {/* <label className="text-xs text-gray-500">Année début</label> */}
// //                                         <input
// //                                             type="number"
// //                                             name="annee_debut_pmt"
// //                                             value={formData.annee_debut_pmt}
// //                                             onChange={handleInputChange}
// //                                             className="w-full h-10 px-3 rounded-[20px] border border-blue-200 outline-none focus:border-orange-400"
// //                                         />
// //                                     </div>
// //                                     <div>
// //                                         {/* <label className="text-xs text-gray-500">Année fin</label> */}
// //                                         <input
// //                                             type="number"
// //                                             name="annee_fin_pmt"
// //                                             value={formData.annee_fin_pmt}
// //                                             onChange={handleInputChange}
// //                                             className="w-full h-10 px-3 rounded-[20px] border border-blue-200 outline-none focus:border-orange-400"
// //                                         />
// //                                     </div>
// //                                 </div>
// //                             </div>

// //                             {/* Localisation */}
// //                             <div className="grid grid-cols-3 gap-4">
// //                                 {/* Région */}
// //                                 <div>
// //                                     <label className="block text-sm font-medium text-gray-700 mb-1">Région</label>
// //                                     {formData.type_projet === 'en_cours' && formData.code_division && !codeNotFound && formData.region_id ? (
// //                                         <select
// //                                             value={formData.region_id}
// //                                             disabled
// //                                             className="w-full h-10 px-3 rounded-[20px] bg-gray-100 border border-gray-300 cursor-not-allowed"
// //                                         >
// //                                             <option value={existingProjetInfo.region_code}>
// //                                                 {existingProjetInfo.region_nom}
// //                                             </option>
// //                                         </select>
// //                                     ) : (
// //                                         <select
// //                                             name="region_id"
// //                                             value={formData.region_id}
// //                                             onChange={handleInputChange}
// //                                             disabled={userRole === 'responsable_structure'}
// //                                             className={`w-full h-10 px-3 rounded-[20px] border border-gray-300 outline-none focus:border-orange-400 ${
// //                                                 userRole === 'responsable_structure' ? 'bg-gray-100 cursor-not-allowed' : ''
// //                                             }`}
// //                                         >
// //                                             <option value="">Sélectionner</option>
// //                                             {regions.map(r => (
// //                                                 <option key={r._id} value={r._id}>
// //                                                     {r.nom_region}
// //                                                 </option>
// //                                             ))}
// //                                         </select>
// //                                     )}
// //                                 </div>

// //                                 {/* Périmètre */}
// //                                 <div>
// //                                     <label className="block text-sm font-medium text-gray-700 mb-1">Périmètre</label>
// //                                     {formData.type_projet === 'en_cours' && formData.code_division && !codeNotFound && formData.perimetre ? (
// //                                         <select
// //                                             value={formData.perimetre}
// //                                             disabled
// //                                             className="w-full h-10 px-3 rounded-[20px] bg-gray-100 border border-gray-300 cursor-not-allowed"
// //                                         >
// //                                             <option value={existingProjetInfo.perimetre_code}>
// //                                                 {existingProjetInfo.perimetre_nom}
// //                                             </option>
// //                                         </select>
// //                                     ) : (
// //                                         <select
// //                                             name="perimetre"
// //                                             value={formData.perimetre}
// //                                             onChange={handleInputChange}
// //                                             disabled={!formData.region_id}
// //                                             className={`w-full h-10 px-3 rounded-[20px] border border-gray-300 outline-none focus:border-orange-400 ${
// //                                                 !formData.region_id ? 'bg-gray-100 cursor-not-allowed' : ''
// //                                             }`}
// //                                         >
// //                                             <option value="">Sélectionner</option>
// //                                             {perimetres.map(p => (
// //                                                 <option key={p.code_perimetre} value={p.code_perimetre}>
// //                                                     {p.nom_perimetre}
// //                                                 </option>
// //                                             ))}
// //                                         </select>
// //                                     )}
// //                                 </div>

// //                                 {/* Famille */}
// //                                 <div>
// //                                     <label className="block text-sm font-medium text-gray-700 mb-1">Famille</label>
// //                                     {formData.type_projet === 'en_cours' && formData.code_division && !codeNotFound && formData.famille ? (
// //                                         <select
// //                                             value={formData.famille}
// //                                             disabled
// //                                             className="w-full h-10 px-3 rounded-[20px] bg-gray-100 border border-gray-300 cursor-not-allowed"
// //                                         >
// //                                             <option value={existingProjetInfo.famille_code}>
// //                                                 {existingProjetInfo.famille_nom}
// //                                             </option>
// //                                         </select>
// //                                     ) : (
// //                                         <select
// //                                             name="famille"
// //                                             value={formData.famille}
// //                                             onChange={handleInputChange}
// //                                             disabled={!formData.perimetre}
// //                                             className={`w-full h-10 px-3 rounded-[20px] border border-gray-300 outline-none focus:border-orange-400 ${
// //                                                 !formData.perimetre ? 'bg-gray-100 cursor-not-allowed' : ''
// //                                             }`}
// //                                         >
// //                                             <option value="">Sélectionner</option>
// //                                             {familles.map(f => (
// //                                                 <option key={f.code_famille} value={f.code_famille}>
// //                                                     {f.nom_famille}
// //                                                 </option>
// //                                             ))}
// //                                         </select>
// //                                     )}
// //                                 </div>
// //                             </div>

// //                             {/* Activité */}
// //                             <div>
// //                                 <label className="block text-sm font-medium text-gray-700 mb-1">Activité</label>
// //                                 <select
// //                                     name="activite"
// //                                     value={formData.activite}
// //                                     onChange={handleInputChange}
// //                                     className="w-full h-10 px-3 rounded-[20px] border border-gray-300 outline-none focus:border-orange-400"
// //                                 >
// //                                     <option value="">Sélectionner</option>
// //                                     {activites.map(a => <option key={a.code} value={a.code}>{a.nom}</option>)}
// //                                 </select>
// //                             </div>

// //                             {/* Description technique */}
// //                             <div>
// //                                 <label className="block text-sm font-medium text-gray-700 mb-1">Description technique</label>
// //                                 <textarea
// //                                     name="description_technique"
// //                                     value={formData.description_technique}
// //                                     onChange={handleInputChange}
// //                                     rows="2"
// //                                     className="w-full px-3 py-2 rounded-2xl border border-gray-300 outline-none resize-none focus:border-orange-400"
// //                                     placeholder="Description du projet..."
// //                                 />
// //                             </div>

// //                             {/* Opportunité */}
// //                             <div>
// //                                 <label className="block text-sm font-medium text-gray-700 mb-1">Opportunité du projet</label>
// //                                 <textarea
// //                                     name="opportunite_projet"
// //                                     value={formData.opportunite_projet}
// //                                     onChange={handleInputChange}
// //                                     rows="2"
// //                                     className="w-full px-3 py-2 rounded-2xl border border-gray-300 outline-none resize-none focus:border-orange-400"
// //                                     placeholder="Opportunité stratégique..."
// //                                 />
// //                             </div>

// //                             {/* SECTION PROJET EN COURS - Réalisations */}
// //                             {formData.type_projet === 'en_cours' && (
// //                                 <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 space-y-4">
// //                                     {/* <h3 className="font-semibold text-purple-800"> Réalisations & Prévisions Année N</h3> */}
                                    
// //                                     <div className="grid grid-cols-2 gap-4">
// //                                         <div>
// //                                             <label className="text-sm font-medium text-gray-700">Réalisations Cumulées à fin {anneeBase - 1} (Total)</label>
// //                                             <input
// //                                                 type="number"
// //                                                 name="realisation_cumul_n_mins1_total"
// //                                                 value={formData.realisation_cumul_n_mins1_total}
// //                                                 onChange={handleInputChange}
// //                                                 className="w-full h-10 px-3 rounded-[20px] border border-purple-200 outline-none focus:border-orange-400"
// //                                                 step="any"
// //                                             />
// //                                         </div>
// //                                         <div>
// //                                             <label className="text-sm font-medium text-gray-700">Réalisations Cumulées à fin {anneeBase - 1} (Dont Dev)</label>
// //                                             <input
// //                                                 type="number"
// //                                                 name="realisation_cumul_n_mins1_dont_dex"
// //                                                 value={formData.realisation_cumul_n_mins1_dont_dex}
// //                                                 onChange={handleInputChange}
// //                                                 className="w-full h-10 px-3 rounded-[20px] border border-purple-200 outline-none focus:border-orange-400"
// //                                                 step="any"
// //                                             />
// //                                         </div>
// //                                     </div>

// //                                     <div className="border-t border-purple-200 pt-4">
// //                                         <label className="text-sm font-semibold text-purple-700 block mb-3">Prévisions de clôture {anneeBase } (Année en cours)</label>
// //                                         <div className="grid grid-cols-2 gap-4">
// //                                             <div>
// //                                                 <label className="text-xs text-gray-600">Réalisation S1 (Total)</label>
// //                                                 <input
// //                                                     type="number"
// //                                                     name="real_s1_n_total"
// //                                                     value={formData.real_s1_n_total}
// //                                                     onChange={handleInputChange}
// //                                                     className="w-full h-10 px-3 rounded-[20px] border border-purple-200 outline-none focus:border-orange-400"
// //                                                     step="any"
// //                                                 />
// //                                             </div>
// //                                             <div>
// //                                                 <label className="text-xs text-gray-600">Réalisation S1 (Dont Dev)</label>
// //                                                 <input
// //                                                     type="number"
// //                                                     name="real_s1_n_dont_dex"
// //                                                     value={formData.real_s1_n_dont_dex}
// //                                                     onChange={handleInputChange}
// //                                                     className="w-full h-10 px-3 rounded-[20px] border border-purple-200 outline-none focus:border-orange-400"
// //                                                     step="any"
// //                                                 />
// //                                             </div>
// //                                             <div>
// //                                                 <label className="text-xs text-gray-600">Prévision S2 (Total)</label>
// //                                                 <input
// //                                                     type="number"
// //                                                     name="prev_s2_n_total"
// //                                                     value={formData.prev_s2_n_total}
// //                                                     onChange={handleInputChange}
// //                                                     className="w-full h-10 px-3 rounded-[20px] border border-purple-200 outline-none focus:border-orange-400"
// //                                                     step="any"
// //                                                 />
// //                                             </div>
// //                                             <div>
// //                                                 <label className="text-xs text-gray-600">Prévision S2 (Dont Dev)</label>
// //                                                 <input
// //                                                     type="number"
// //                                                     name="prev_s2_n_dont_dex"
// //                                                     value={formData.prev_s2_n_dont_dex}
// //                                                     onChange={handleInputChange}
// //                                                     className="w-full h-10 px-3 rounded-[20px] border border-purple-200 outline-none focus:border-orange-400"
// //                                                     step="any"
// //                                                 />
// //                                             </div>
// //                                         </div>
// //                                     </div>

// //                                     <div className="bg-white rounded-lg p-3 border border-purple-200">
// //                                         <div className="grid grid-cols-2 gap-4">
// //                                             <div>
// //                                                 <label className="text-sm font-medium text-purple-700">Prévision Clôture {anneeBase }(Total)</label>
// //                                                 <input
// //                                                     type="text"
// //                                                     value={formatCurrency(formData.prev_cloture_n_total)}
// //                                                     readOnly
// //                                                     className="w-full h-10 px-3 rounded-[20px] bg-purple-100 text-purple-800 font-semibold"
// //                                                 />
// //                                                 <p className="text-xs text-gray-500 mt-1">(Réal. S1 + Prév. S2)</p>
// //                                             </div>
// //                                             <div>
// //                                                 <label className="text-sm font-medium text-purple-700">Prévision Clôture {anneeBase } (Dont Dev)</label>
// //                                                 <input
// //                                                     type="text"
// //                                                     value={formatCurrency(formData.prev_cloture_n_dont_dex)}
// //                                                     readOnly
// //                                                     className="w-full h-10 px-3 rounded-[20px] bg-purple-100 text-purple-800 font-semibold"
// //                                                 />
// //                                             </div>
// //                                         </div>
// //                                     </div>
// //                                 </div>
// //                             )}
// //                         </div>
// //                     )}

// //                     {/* ÉTAPE 2 : Budget mensuel N+1 */}
// //                     {currentStep === 2 && (
// //                         <div className="space-y-3">
// //                             <div className="flex items-center justify-between flex-wrap gap-2">
// //                                 <p className="text-sm text-gray-600">
// //                                      Répartition mensuelle pour l'année(Prévisions ) <strong className="text-orange-600">{formData.annee_debut_pmt}</strong>
// //                                 </p>
// //                                 <div className="bg-gradient-to-r from-amber-100 to-yellow-100 border border-amber-300 px-4 py-1.5 rounded-full shadow-sm">
// //                                     <span className="text-sm font-medium text-amber-800">
// //                                         Total Prévisions {anneeBase +1} : <span className="font-bold text-amber-900">{formatCurrency(totalMensuel())}</span>
// //                                     </span>
// //                                 </div>
// //                             </div>

// //                             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
// //                                 {moisList.map(mois => (
// //                                     <div key={mois.key} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-3 hover:shadow-md transition-shadow">
// //                                         <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-2">{mois.label}</label>
// //                                         <div className="space-y-2">
// //                                             <div>
// //                                                 <label className="text-[10px] text-gray-400 block mb-0.5">Total (DA)</label>
// //                                                 <input
// //                                                     type="number"
// //                                                     name={`${mois.key}_total`}
// //                                                     value={formData[`${mois.key}_total`] || ''}
// //                                                     onChange={handleInputChange}
// //                                                     className="w-full h-8 px-2 rounded-[20px] border border-gray-200 outline-none text-sm focus:border-orange-400 focus:ring-1 focus:ring-orange-200 bg-white"
// //                                                     placeholder="0"
// //                                                     step="any"
// //                                                 />
// //                                             </div>
// //                                             <div>
// //                                                 <label className="text-[10px] text-gray-400 block mb-0.5">Dont Dev (DA)</label>
// //                                                 <input
// //                                                     type="number"
// //                                                     name={`${mois.key}_dont_dex`}
// //                                                     value={formData[`${mois.key}_dont_dex`] || ''}
// //                                                     onChange={handleInputChange}
// //                                                     className="w-full h-8 px-2 rounded-[20px] border border-gray-200 outline-none text-sm focus:border-orange-400 focus:ring-1 focus:ring-orange-200 bg-white"
// //                                                     placeholder="0"
// //                                                     step="any"
// //                                                 />
// //                                             </div>
// //                                         </div>
// //                                     </div>
// //                                 ))}
// //                             </div>

// //                             <div className="bg-green-50 border border-green-200 rounded-xl p-4">
// //                                 <div className="grid grid-cols-2 gap-4">
// //                                     <div className="text-center">
// //                                         <span className="text-xs text-green-600">Total Annuel {anneeBase + 1}</span>
// //                                         <p className="text-lg font-bold text-green-700">{formatCurrency(totalMensuel())}</p>
// //                                     </div>
// //                                     <div className="text-center">
// //                                         <span className="text-xs text-green-600">Total Dev {anneeBase + 1}</span>
// //                                         <p className="text-lg font-bold text-green-700">{formatCurrency(totalMensuelDex())}</p>
// //                                     </div>
// //                                     {/* <div className="text-center">
// //                                         <span className="text-xs text-green-600">% Dev</span>
// //                                         <p className="text-lg font-bold text-green-700">
// //                                             {totalMensuel() > 0 ? ((totalMensuelDex() / totalMensuel()) * 100).toFixed(1) : 0}%
// //                                         </p>
// //                                     </div> */}
// //                                 </div>
// //                             </div>

// //                             {formData.type_projet === 'en_cours' && (
// //                                 <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
// //                                     <div className="grid grid-cols-2 gap-4">
// //                                         <div>
// //                                             <label className="text-sm font-medium text-blue-700">Prévision {anneeBase +1 } (Total)</label>
// //                                             <input
// //                                                 type="text"
// //                                                 value={formatCurrency(formData.prev_n_plus1_total)}
// //                                                 readOnly
// //                                                 className="w-full h-10 px-3 rounded-[20px] bg-blue-100 text-blue-800 font-semibold"
// //                                             />
// //                                             <p className="text-xs text-gray-500 mt-1">(Somme des mois)</p>
// //                                         </div>
// //                                         <div>
// //                                             <label className="text-sm font-medium text-blue-700">Prévision{anneeBase +1 }  (Dont Dev)</label>
// //                                             <input
// //                                                 type="text"
// //                                                 value={formatCurrency(formData.prev_n_plus1_dont_dex)}
// //                                                 readOnly
// //                                                 className="w-full h-10 px-3 rounded-[20px] bg-blue-100 text-blue-800 font-semibold"
// //                                             />
// //                                         </div>
// //                                     </div>
// //                                 </div>
// //                             )}
// //                         </div>
// //                     )}

// //                     {/* ÉTAPE 3 : Prévisions N+2 à N+5 */}
// //                     {currentStep === 3 && (
// //                         <div className="space-y-3">
// //                             <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
// //                                 <div className="flex justify-between items-center">
// //                                     <span className="font-semibold text-amber-800">Total prévisions pluriannuelles ({anneeBase + 2} à {anneeBase + 5})</span>
// //                                     <div className="text-right">
// //                                         <span className="text-xl font-bold text-amber-900">{formatCurrency(totalPrevisionsPluri())}</span>
// //                                         <p className="text-xs text-amber-600">Dont Dev: {formatCurrency(totalPrevisionsPluriDex())}</p>
// //                                     </div>
// //                                 </div>
// //                             </div>

// //                             <div className="bg-white border border-gray-200 rounded-xl p-4">
// //                                 <label className="block text-sm font-medium text-gray-700 mb-3">Prévisions pluriannuelles</label>
                                
// //                                 <div className="mb-4 pb-3 border-b border-gray-100">
// //                                     <label className="text-sm font-medium text-gray-600 block mb-2">{anneeBase + 2}</label>
// //                                     <div className="grid grid-cols-2 gap-4">
// //                                         <div>
// //                                             <label className="text-xs text-gray-400 block mb-1">Total (DA)</label>
// //                                             <input
// //                                                 type="text"
// //                                                 name="prev_n_plus2_total"
// //                                                 value={formData.prev_n_plus2_total}
// //                                                 onChange={(e) => {
// //                                                     const value = e.target.value;
// //                                                     if (value === '' || /^\d*\.?\d*$/.test(value)) {
// //                                                         handleInputChange(e);
// //                                                     }
// //                                                 }}
// //                                                 className="w-full h-10 px-3 rounded-[20px] border border-gray-200 outline-none focus:border-orange-400"
// //                                                 placeholder="0"
// //                                             />
// //                                         </div>
// //                                         <div>
// //                                             <label className="text-xs text-gray-400 block mb-1">Dont Dev (DA)</label>
// //                                             <input
// //                                                 type="text"
// //                                                 name="prev_n_plus2_dont_dex"
// //                                                 value={formData.prev_n_plus2_dont_dex}
// //                                                 onChange={(e) => {
// //                                                     const value = e.target.value;
// //                                                     if (value === '' || /^\d*\.?\d*$/.test(value)) {
// //                                                         handleInputChange(e);
// //                                                     }
// //                                                 }}
// //                                                 className="w-full h-10 px-3 rounded-[20px] border border-gray-200 outline-none focus:border-orange-400"
// //                                                 placeholder="0"
// //                                             />
// //                                         </div>
// //                                     </div>
// //                                 </div>

// //                                 <div className="mb-4 pb-3 border-b border-gray-100">
// //                                     <label className="text-sm font-medium text-gray-600 block mb-2">{anneeBase + 3}</label>
// //                                     <div className="grid grid-cols-2 gap-4">
// //                                         <div>
// //                                             <label className="text-xs text-gray-400 block mb-1">Total (DA)</label>
// //                                             <input
// //                                                 type="text"
// //                                                 name="prev_n_plus3_total"
// //                                                 value={formData.prev_n_plus3_total}
// //                                                 onChange={(e) => {
// //                                                     const value = e.target.value;
// //                                                     if (value === '' || /^\d*\.?\d*$/.test(value)) {
// //                                                         handleInputChange(e);
// //                                                     }
// //                                                 }}
// //                                                 className="w-full h-10 px-3 rounded-[20px] border border-gray-200 outline-none focus:border-orange-400"
// //                                                 placeholder="0"
// //                                             />
// //                                         </div>
// //                                         <div>
// //                                             <label className="text-xs text-gray-400 block mb-1">Dont Dev (DA)</label>
// //                                             <input
// //                                                 type="text"
// //                                                 name="prev_n_plus3_dont_dex"
// //                                                 value={formData.prev_n_plus3_dont_dex}
// //                                                 onChange={(e) => {
// //                                                     const value = e.target.value;
// //                                                     if (value === '' || /^\d*\.?\d*$/.test(value)) {
// //                                                         handleInputChange(e);
// //                                                     }
// //                                                 }}
// //                                                 className="w-full h-10 px-3 rounded-[20px] border border-gray-200 outline-none focus:border-orange-400"
// //                                                 placeholder="0"
// //                                             />
// //                                         </div>
// //                                     </div>
// //                                 </div>

// //                                 <div className="mb-4 pb-3 border-b border-gray-100">
// //                                     <label className="text-sm font-medium text-gray-600 block mb-2">{anneeBase + 4}</label>
// //                                     <div className="grid grid-cols-2 gap-4">
// //                                         <div>
// //                                             <label className="text-xs text-gray-400 block mb-1">Total (DA)</label>
// //                                             <input
// //                                                 type="text"
// //                                                 name="prev_n_plus4_total"
// //                                                 value={formData.prev_n_plus4_total}
// //                                                 onChange={(e) => {
// //                                                     const value = e.target.value;
// //                                                     if (value === '' || /^\d*\.?\d*$/.test(value)) {
// //                                                         handleInputChange(e);
// //                                                     }
// //                                                 }}
// //                                                 className="w-full h-10 px-3 rounded-[20px] border border-gray-200 outline-none focus:border-orange-400"
// //                                                 placeholder="0"
// //                                             />
// //                                         </div>
// //                                         <div>
// //                                             <label className="text-xs text-gray-400 block mb-1">Dont Dev (DA)</label>
// //                                             <input
// //                                                 type="text"
// //                                                 name="prev_n_plus4_dont_dex"
// //                                                 value={formData.prev_n_plus4_dont_dex}
// //                                                 onChange={(e) => {
// //                                                     const value = e.target.value;
// //                                                     if (value === '' || /^\d*\.?\d*$/.test(value)) {
// //                                                         handleInputChange(e);
// //                                                     }
// //                                                 }}
// //                                                 className="w-full h-10 px-3 rounded-[20px] border border-gray-200 outline-none focus:border-orange-400"
// //                                                 placeholder="0"
// //                                             />
// //                                         </div>
// //                                     </div>
// //                                 </div>

// //                                 <div>
// //                                     <label className="text-sm font-medium text-gray-600 block mb-2">{anneeBase + 5}</label>
// //                                     <div className="grid grid-cols-2 gap-4">
// //                                         <div>
// //                                             <label className="text-xs text-gray-400 block mb-1">Total (DA)</label>
// //                                             <input
// //                                                 type="text"
// //                                                 name="prev_n_plus5_total"
// //                                                 value={formData.prev_n_plus5_total}
// //                                                 onChange={(e) => {
// //                                                     const value = e.target.value;
// //                                                     if (value === '' || /^\d*\.?\d*$/.test(value)) {
// //                                                         handleInputChange(e);
// //                                                     }
// //                                                 }}
// //                                                 className="w-full h-10 px-3 rounded-[20px] border border-gray-200 outline-none focus:border-orange-400"
// //                                                 placeholder="0"
// //                                             />
// //                                         </div>
// //                                         <div>
// //                                             <label className="text-xs text-gray-400 block mb-1">Dont Dev (DA)</label>
// //                                             <input
// //                                                 type="text"
// //                                                 name="prev_n_plus5_dont_dex"
// //                                                 value={formData.prev_n_plus5_dont_dex}
// //                                                 onChange={(e) => {
// //                                                     const value = e.target.value;
// //                                                     if (value === '' || /^\d*\.?\d*$/.test(value)) {
// //                                                         handleInputChange(e);
// //                                                     }
// //                                                 }}
// //                                                 className="w-full h-10 px-3 rounded-[20px] border border-gray-200 outline-none focus:border-orange-400"
// //                                                 placeholder="0"
// //                                             />
// //                                         </div>
// //                                     </div>
// //                                 </div>
// //                             </div>

// //                             {formData.type_projet === 'en_cours' && (
// //                                 <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
// //                                     <div className="grid grid-cols-2 gap-4">
// //                                         <div>
// //                                             <label className="text-sm font-medium text-indigo-700">Reste à Réaliser (Total)</label>
// //                                             <input
// //                                                 type="text"
// //                                                 value={formatCurrency(formData.reste_a_realiser_total)}
// //                                                 readOnly
// //                                                 className="w-full h-10 px-3 rounded-[20px] bg-indigo-100 text-indigo-800 font-semibold"
// //                                             />
// //                                             {/* <p className="text-xs text-gray-500 mt-1">(N+2 + N+3 + N+4 + N+5)</p> */}
// //                                         </div>
// //                                         <div>
// //                                             <label className="text-sm font-medium text-indigo-700">Reste à Réaliser (Dont Dev)</label>
// //                                             <input
// //                                                 type="text"
// //                                                 value={formatCurrency(formData.reste_a_realiser_dont_dex)}
// //                                                 readOnly
// //                                                 className="w-full h-10 px-3 rounded-[20px] bg-indigo-100 text-indigo-800 font-semibold"
// //                                             />
// //                                         </div>
// //                                     </div>
// //                                 </div>
// //                             )}
// //                         </div>
// //                     )}

// //                     {/* ÉTAPE 4 : Récapitulatif */}
// //                     {currentStep === 4 && (
// //                         <div className="space-y-4">
// //                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                                 <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200 shadow-sm">
// //                                     <p className="text-xs text-emerald-600 font-medium">Coût Global</p>
// //                                     <p className="text-2xl font-bold text-emerald-700 mt-1">{formatCurrency(coutGlobal())}</p>
// //                                     {/* <p className="text-xs text-blue-600">Dont Dev: {formatCurrency(coutTotal)}</p> */}

// //                                 </div>
// //                                 {formData.type_projet === 'en_cours' && (
// //                                     <>
// //                                         <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200 shadow-sm">
// //                                             <p className="text-xs text-purple-600 font-medium">Réalisation Cumul {anneeBase -1 } </p>
// //                                             <p className="text-lg font-bold text-purple-700 mt-1">{formatCurrency(formData.realisation_cumul_n_mins1_total)}</p>
// //                                             <p className="text-xs text-purple-600">Dont Dev: {formatCurrency(formData.realisation_cumul_n_mins1_dont_dex)}</p>
// //                                         </div>
// //                                         <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200 shadow-sm">
// //                                             <p className="text-xs text-amber-600 font-medium">Prévision Clôture {anneeBase} </p>
// //                                             <p className="text-lg font-bold text-amber-700 mt-1">{formatCurrency(formData.prev_cloture_n_total)}</p>
// //                                             <p className="text-xs text-amber-600">Dont Dev: {formatCurrency(formData.prev_cloture_n_dont_dex)}</p>
// //                                         </div>
// //                                     </>
// //                                 )}
// //                                 <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200 shadow-sm">
// //                                     <p className="text-xs text-blue-600 font-medium">Prévisions {anneeBase + 2}à {anneeBase + 5}</p>
// //                                     <p className="text-2xl font-bold text-blue-700 mt-1">{formatCurrency(totalPrevisionsPluri())}</p>
// //                                     <p className="text-xs text-blue-600">Dont Dev: {formatCurrency(totalPrevisionsPluriDex())}</p>
// //                                 </div>
// //                             </div>

// //                             <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
// //                                 <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
// //                                     <h4 className="font-semibold text-gray-700">Détail des prévisions</h4>
// //                                 </div>
// //                                 <div className="overflow-x-auto">
// //                                     <table className="w-full text-sm">
// //                                         <thead>
// //                                             <tr className="bg-gray-100">
// //                                                 <th className="px-4 py-3 text-left text-gray-600 font-semibold">Période</th>
// //                                                 <th className="px-4 py-3 text-right text-gray-600 font-semibold">Total (DA)</th>
// //                                                 <th className="px-4 py-3 text-right text-gray-600 font-semibold">Dont Dev (DA)</th>
// //                                             </tr>
// //                                         </thead>
// //                                         <tbody className="divide-y divide-gray-100">
// //                                             {formData.type_projet === 'en_cours' && (
// //                                                 <>
// //                                                     <tr className="bg-gray-50">
// //                                                         <td className="px-4 py-3 font-medium text-gray-800">Réalisation Cumul {anneeBase -1 } </td>
// //                                                         <td className="px-4 py-3 text-right font-bold">{formatCurrency(formData.realisation_cumul_n_mins1_total)}</td>
// //                                                         <td className="px-4 py-3 text-right font-bold text-orange-600">{formatCurrency(formData.realisation_cumul_n_mins1_dont_dex)}</td>
// //                                                     </tr>
// //                                                     <tr className="bg-amber-50">
// //                                                         <td className="px-4 py-3 font-medium text-gray-800">Prévision Clôture {anneeBase}</td>
// //                                                         <td className="px-4 py-3 text-right font-bold">{formatCurrency(formData.prev_cloture_n_total)}</td>
// //                                                         <td className="px-4 py-3 text-right font-bold text-orange-600">{formatCurrency(formData.prev_cloture_n_dont_dex)}</td>
// //                                                     </tr>
// //                                                 </>
// //                                             )}
// //                                             <tr className="bg-green-50">
// //                                                 <td className="px-4 py-3 font-medium text-gray-800">Prévisions {anneeBase + 1}</td>
// //                                                 <td className="px-4 py-3 text-right font-bold">{formatCurrency(totalMensuel())}</td>
// //                                                 <td className="px-4 py-3 text-right font-bold text-orange-600">{formatCurrency(totalMensuelDex())}</td>
// //                                               </tr>
// //                                             {formData.type_projet === 'en_cours' && (
// //                                                 <tr className="bg-indigo-50">
// //                                                     <td className="px-4 py-3 font-medium text-gray-800">Reste à Réaliser {anneeBase + 2} à {anneeBase + 5}</td>
// //                                                     <td className="px-4 py-3 text-right font-bold">{formatCurrency(formData.reste_a_realiser_total)}</td>
// //                                                     <td className="px-4 py-3 text-right font-bold text-orange-600">{formatCurrency(formData.reste_a_realiser_dont_dex)}</td>
// //                                                   </tr>
// //                                             )}
// //                                             {formData.type_projet === 'nouveau' && (
// //                                                 <>
// //                                                     <tr className="hover:bg-gray-50">
// //                                                         <td className="px-4 py-3 font-medium text-gray-700">Prévisions {anneeBase + 2}</td>
// //                                                         <td className="px-4 py-3 text-right font-mono">{formatCurrency(formData.prev_n_plus2_total)}</td>
// //                                                         <td className="px-4 py-3 text-right font-mono text-orange-600">{formatCurrency(formData.prev_n_plus2_dont_dex)}</td>
// //                                                       </tr>
// //                                                     <tr className="hover:bg-gray-50">
// //                                                         <td className="px-4 py-3 font-medium text-gray-700">Prévisions {anneeBase + 3}</td>
// //                                                         <td className="px-4 py-3 text-right font-mono">{formatCurrency(formData.prev_n_plus3_total)}</td>
// //                                                         <td className="px-4 py-3 text-right font-mono text-orange-600">{formatCurrency(formData.prev_n_plus3_dont_dex)}</td>
// //                                                       </tr>
// //                                                     <tr className="hover:bg-gray-50">
// //                                                         <td className="px-4 py-3 font-medium text-gray-700">Prévisions {anneeBase + 4}</td>
// //                                                         <td className="px-4 py-3 text-right font-mono">{formatCurrency(formData.prev_n_plus4_total)}</td>
// //                                                         <td className="px-4 py-3 text-right font-mono text-orange-600">{formatCurrency(formData.prev_n_plus4_dont_dex)}</td>
// //                                                       </tr>
// //                                                     <tr className="hover:bg-gray-50">
// //                                                         <td className="px-4 py-3 font-medium text-gray-700">Prévisions {anneeBase + 5}</td>
// //                                                         <td className="px-4 py-3 text-right font-mono">{formatCurrency(formData.prev_n_plus5_total)}</td>
// //                                                         <td className="px-4 py-3 text-right font-mono text-orange-600">{formatCurrency(formData.prev_n_plus5_dont_dex)}</td>
// //                                                       </tr>
// //                                                 </>
// //                                             )}
// //                                             <tr className="bg-orange-50">
// //                                                 <td className="px-4 py-3 font-bold text-gray-800">Coût Global Initial PMT {anneeBase+1}-{anneeBase+5}</td>
// //                                                 <td className="px-4 py-3 text-right font-bold text-xl text-orange-600">{formatCurrency(coutGlobal())}</td>
// //                                                 <td className="px-4 py-3 text-right font-bold text-orange-600">
// //                                                     {formData.type_projet === 'en_cours' 
// //                                                         ? formatCurrency((parseFloat(formData.cout_initial_dont_dex) || 0))
// //                                                         : formatCurrency(totalPrevisionsPluriDex() + totalMensuelDex())
// //                                                     }
// //                                                  </td>
// //                                               </tr>
// //                                         </tbody>
// //                                      </table>
// //                                 </div>
// //                             </div>

// //                             {formData.description_technique && (
// //                                 <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
// //                                     <h5 className="font-semibold text-gray-700 mb-2">Description technique</h5>
// //                                     <p className="text-sm text-gray-600">{formData.description_technique}</p>
// //                                 </div>
// //                             )}
// //                             {formData.opportunite_projet && (
// //                                 <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
// //                                     <h5 className="font-semibold text-gray-700 mb-2">Opportunité du projet</h5>
// //                                     <p className="text-sm text-gray-600">{formData.opportunite_projet}</p>
// //                                 </div>
// //                             )}
// //                         </div>
// //                     )}
// //                 </div>

// //                 {/* Pied de page */}
// //                 <div className="border-t border-gray-100 px-6 py-4 bg-white flex justify-between items-center">
// //                     <button
// //                         onClick={currentStep === 1 ? onClose : prevStep}
// //                         className="px-5 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition text-sm font-medium"
// //                     >
// //                         {currentStep === 1 ? 'Annuler' : '← Précédent'}
// //                     </button>

// //                     {currentStep < 4 ? (
// //                         <button
// //                             onClick={nextStep}
// //                             className="px-6 py-2 bg-[#FF8500] text-white rounded-full hover:bg-[#e67800] transition text-sm font-medium shadow-md shadow-orange-200"
// //                         >
// //                             Suivant →
// //                         </button>
// //                     ) : (
// //                         <button
// //                             onClick={handleSubmit}
// //                             disabled={loading}
// //                             className="px-6 py-2 bg-[#FF8500] text-white rounded-full hover:bg-[#e67800] transition disabled:opacity-50 flex items-center gap-2 text-sm font-medium shadow-md shadow-orange-200"
// //                         >
// //                             {loading && (
// //                                 <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
// //                                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
// //                                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
// //                                 </svg>
// //                             )}
// //                             {loading ? 'Enregistrement...' : '✓ Créer le projet'}
// //                         </button>
// //                     )}
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };
// // export default AjouterProjetModal;
// import React, { useState, useEffect } from 'react';
// import { axiosInstance } from '../../../../axios';

// const AjouterProjetModal = ({ isOpen, onClose, onSuccess, projet, axiosInstance: customAxiosInstance }) => {
//     const [currentStep, setCurrentStep] = useState(1);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const [regions, setRegions] = useState([]);
//     const [perimetres, setPerimetres] = useState([]);
//     const [familles, setFamilles] = useState([]);
//     const [searchingCode, setSearchingCode] = useState(false);
//     const [codeNotFound, setCodeNotFound] = useState(false);
//     const [userRole, setUserRole] = useState(null);
//     const [userRegionId, setUserRegionId] = useState(null);
//     const [userRegionName, setUserRegionName] = useState(null);
//     const [fieldErrors, setFieldErrors] = useState({});
    
//     // Pour stocker les infos du projet existant (en lecture seule)
//     const [existingProjetInfo, setExistingProjetInfo] = useState({
//         region_nom: '',
//         region_code: '',
//         perimetre_nom: '',
//         perimetre_code: '',
//         famille_nom: '',
//         famille_code: '',
//         activite_nom: '',
//         activite_code: ''
//     });

//     const axiosInst = customAxiosInstance || axiosInstance;

//     // Récupérer les infos utilisateur depuis localStorage
//     useEffect(() => {
//         const role = localStorage.getItem('role');
//         const regionId = localStorage.getItem('region_id');
//         const regionName = localStorage.getItem('region_name');
        
//         setUserRole(role);
//         setUserRegionId(regionId);
//         setUserRegionName(regionName);
        
//         console.log("Utilisateur connecté (région):", { role, regionId, regionName });
//     }, []);

//     const activites = [
//         { code: 'PETROLE', nom: 'Pétrole' },
//         { code: 'GAZ', nom: 'Gaz' },
//         { code: 'PETROLE_GAZ', nom: 'Pétrole & Gaz' }
//     ];

//     const [formData, setFormData] = useState({
//         type_projet: 'nouveau',
//         code_division: '',
//         libelle: '',
//         region_id: '',
//         perimetre: '',
//         famille: '',
//         activite: '',
//         annee_debut_pmt: new Date().getFullYear(),
//         annee_fin_pmt: new Date().getFullYear() + 4,
//         description_technique: '',
//         opportunite_projet: '',
//         duree_realisation: '',
//         point_situation: '',

//         cout_initial_total: '',
//         cout_initial_dont_dex: '',
//         realisation_cumul_n_mins1_total: '',
//         realisation_cumul_n_mins1_dont_dex: '',
//         real_s1_n_total: '',
//         real_s1_n_dont_dex: '',
//         prev_s2_n_total: '',
//         prev_s2_n_dont_dex: '',
//         prev_cloture_n_total: '',
//         prev_cloture_n_dont_dex: '',
//         prev_n_plus1_total: '',
//         prev_n_plus1_dont_dex: '',
//         reste_a_realiser_total: '',
//         reste_a_realiser_dont_dex: '',

//         prev_n_plus2_total: '',
//         prev_n_plus2_dont_dex: '',
//         prev_n_plus3_total: '',
//         prev_n_plus3_dont_dex: '',
//         prev_n_plus4_total: '',
//         prev_n_plus4_dont_dex: '',
//         prev_n_plus5_total: '',
//         prev_n_plus5_dont_dex: '',

//         janvier_total: '', janvier_dont_dex: '',
//         fevrier_total: '', fevrier_dont_dex: '',
//         mars_total: '', mars_dont_dex: '',
//         avril_total: '', avril_dont_dex: '',
//         mai_total: '', mai_dont_dex: '',
//         juin_total: '', juin_dont_dex: '',
//         juillet_total: '', juillet_dont_dex: '',
//         aout_total: '', aout_dont_dex: '',
//         septembre_total: '', septembre_dont_dex: '',
//         octobre_total: '', octobre_dont_dex: '',
//         novembre_total: '', novembre_dont_dex: '',
//         decembre_total: '', decembre_dont_dex: '',
//     });

//     // Mise à jour automatique de annee_fin_pmt
//     useEffect(() => {
//         if (formData.annee_debut_pmt) {
//             const debut = parseInt(formData.annee_debut_pmt);
//             if (!isNaN(debut)) {
//                 setFormData(prev => ({
//                     ...prev,
//                     annee_fin_pmt: debut + 4
//                 }));
//             }
//         }
//     }, [formData.annee_debut_pmt]);

//     const moisList = [
//         { key: 'janvier', label: 'Janvier' }, { key: 'fevrier', label: 'Février' },
//         { key: 'mars', label: 'Mars' }, { key: 'avril', label: 'Avril' },
//         { key: 'mai', label: 'Mai' }, { key: 'juin', label: 'Juin' },
//         { key: 'juillet', label: 'Juillet' }, { key: 'aout', label: 'Août' },
//         { key: 'septembre', label: 'Septembre' }, { key: 'octobre', label: 'Octobre' },
//         { key: 'novembre', label: 'Novembre' }, { key: 'decembre', label: 'Décembre' },
//     ];

//     // Validation durée
//     const validateDureeRealisation = (value) => {
//         if (!value) return true;
//         const num = parseInt(value);
//         if (isNaN(num)) return false;
//         return num >= 1 && num <= 99;
//     };

//     // Validation DEV vs TOTAL
//     const validateDevVsTotal = (totalValue, devValue) => {
//         const total = parseFloat(totalValue) || 0;
//         const dev = parseFloat(devValue) || 0;
//         if (dev > total) {
//             return { isValid: false, message: `⚠️ "Dont Dev" (${dev}) > "Total" (${total})` };
//         }
//         return { isValid: true, message: '' };
//     };

//     const clearFieldError = (fieldName) => {
//         setFieldErrors(prev => {
//             const newErrors = { ...prev };
//             delete newErrors[fieldName];
//             return newErrors;
//         });
//     };

//     // Handler avec validation et blocage
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
        
//         if (name === 'duree_realisation') {
//             const numbersOnly = value.replace(/[^0-9]/g, '').slice(0, 2);
//             setFormData(prev => ({ ...prev, [name]: numbersOnly }));
//             return;
//         }
        
//         if (name.includes('_dont_dex')) {
//             const totalFieldName = name.replace('_dont_dex', '_total');
//             const totalValue = formData[totalFieldName];
            
//             if (totalValue && parseFloat(totalValue) > 0) {
//                 const total = parseFloat(totalValue);
//                 const testValue = parseFloat(value);
                
//                 if (!isNaN(testValue) && testValue > total) {
//                     setFieldErrors(prev => ({ 
//                         ...prev, 
//                         [name]: `⛔ Bloqué : ${testValue} > ${total}. "Dont Dev" ne peut pas dépasser le total.` 
//                     }));
//                     const inputElement = e.target;
//                     inputElement.classList.add('shake');
//                     setTimeout(() => inputElement.classList.remove('shake'), 500);
//                     return;
//                 } else {
//                     clearFieldError(name);
//                 }
//             }
            
//             setFormData(prev => ({ ...prev, [name]: value }));
//             return;
//         }
        
//         setFormData(prev => ({ ...prev, [name]: value }));
        
//         if (name.includes('_total')) {
//             const devFieldName = name.replace('_total', '_dont_dex');
//             const devValue = formData[devFieldName];
//             const totalValue = value;
            
//             if (devValue && totalValue) {
//                 const dev = parseFloat(devValue);
//                 const total = parseFloat(totalValue);
                
//                 if (dev > total) {
//                     setFieldErrors(prev => ({ 
//                         ...prev, 
//                         [devFieldName]: `⚠️ Attention: "Dont Dev" (${dev}) > "Total" (${total})` 
//                     }));
//                 } else {
//                     clearFieldError(devFieldName);
//                 }
//             }
//         }
//     };

//     // Règles de calcul automatiques
//     const updatePrevClotureN = () => {
//         const realS1Total = parseFloat(formData.real_s1_n_total) || 0;
//         const prevS2Total = parseFloat(formData.prev_s2_n_total) || 0;
//         const prevClotureTotal = realS1Total + prevS2Total;
//         const realS1Dex = parseFloat(formData.real_s1_n_dont_dex) || 0;
//         const prevS2Dex = parseFloat(formData.prev_s2_n_dont_dex) || 0;
//         const prevClotureDex = realS1Dex + prevS2Dex;
        
//         setFormData(prev => ({
//             ...prev,
//             prev_cloture_n_total: prevClotureTotal.toString(),
//             prev_cloture_n_dont_dex: prevClotureDex.toString()
//         }));
//     };

//     const updatePrevNPlus1 = () => {
//         const totalMensuel = moisList.reduce((sum, m) => sum + (parseFloat(formData[`${m.key}_total`]) || 0), 0);
//         const totalMensuelDex = moisList.reduce((sum, m) => sum + (parseFloat(formData[`${m.key}_dont_dex`]) || 0), 0);
        
//         setFormData(prev => ({
//             ...prev,
//             prev_n_plus1_total: totalMensuel.toString(),
//             prev_n_plus1_dont_dex: totalMensuelDex.toString()
//         }));
//     };

//     const updateResteARealiser = () => {
//         const n2 = parseFloat(formData.prev_n_plus2_total) || 0;
//         const n3 = parseFloat(formData.prev_n_plus3_total) || 0;
//         const n4 = parseFloat(formData.prev_n_plus4_total) || 0;
//         const n5 = parseFloat(formData.prev_n_plus5_total) || 0;
//         const resteTotal = n2 + n3 + n4 + n5;
//         const n2Dex = parseFloat(formData.prev_n_plus2_dont_dex) || 0;
//         const n3Dex = parseFloat(formData.prev_n_plus3_dont_dex) || 0;
//         const n4Dex = parseFloat(formData.prev_n_plus4_dont_dex) || 0;
//         const n5Dex = parseFloat(formData.prev_n_plus5_dont_dex) || 0;
//         const resteDex = n2Dex + n3Dex + n4Dex + n5Dex;
        
//         setFormData(prev => ({
//             ...prev,
//             reste_a_realiser_total: resteTotal.toString(),
//             reste_a_realiser_dont_dex: resteDex.toString()
//         }));
//     };

//     const updateCoutGlobal = () => {
//         const realisationCumul = parseFloat(formData.realisation_cumul_n_mins1_total) || 0;
//         const prevCloture = parseFloat(formData.prev_cloture_n_total) || 0;
//         const prevNPlus1 = parseFloat(formData.prev_n_plus1_total) || 0;
//         const resteARealiser = parseFloat(formData.reste_a_realiser_total) || 0;
//         const coutTotal = realisationCumul + prevCloture + prevNPlus1 + resteARealiser;
//         const realisationCumulDex = parseFloat(formData.realisation_cumul_n_mins1_dont_dex) || 0;
//         const prevClotureDex = parseFloat(formData.prev_cloture_n_dont_dex) || 0;
//         const prevNPlus1Dex = parseFloat(formData.prev_n_plus1_dont_dex) || 0;
//         const resteARealiserDex = parseFloat(formData.reste_a_realiser_dont_dex) || 0;
//         const coutDex = realisationCumulDex + prevClotureDex + prevNPlus1Dex + resteARealiserDex;
        
//         setFormData(prev => ({
//             ...prev,
//             cout_initial_total: coutTotal.toString(),
//             cout_initial_dont_dex: coutDex.toString()
//         }));
//     };

//     // Effets pour les calculs automatiques
//     useEffect(() => {
//         if (formData.type_projet === 'en_cours') updatePrevClotureN();
//     }, [formData.real_s1_n_total, formData.real_s1_n_dont_dex, formData.prev_s2_n_total, formData.prev_s2_n_dont_dex]);

//     useEffect(() => {
//         if (formData.type_projet === 'en_cours') updatePrevNPlus1();
//     }, [moisList.map(m => formData[`${m.key}_total`] + formData[`${m.key}_dont_dex`]).join(',')]);

//     useEffect(() => {
//         if (formData.type_projet === 'en_cours') updateResteARealiser();
//     }, [formData.prev_n_plus2_total, formData.prev_n_plus2_dont_dex, formData.prev_n_plus3_total, formData.prev_n_plus3_dont_dex, formData.prev_n_plus4_total, formData.prev_n_plus4_dont_dex, formData.prev_n_plus5_total, formData.prev_n_plus5_dont_dex]);

//     useEffect(() => {
//         if (formData.type_projet === 'en_cours') updateCoutGlobal();
//     }, [formData.realisation_cumul_n_mins1_total, formData.realisation_cumul_n_mins1_dont_dex, formData.prev_cloture_n_total, formData.prev_cloture_n_dont_dex, formData.prev_n_plus1_total, formData.prev_n_plus1_dont_dex, formData.reste_a_realiser_total, formData.reste_a_realiser_dont_dex]);

//     // ============ FONCTIONS API ============

//     const fetchRegions = async () => {
//         try {
//             let allRegions = [];
            
//             if (userRole === 'responsable_structure' && userRegionId) {
//                 const response = await axiosInst.get(`/params/regions/id/${userRegionId}`);
//                 if (response.data && response.data.data) {
//                     allRegions = [response.data.data];
//                     setFormData(prev => ({ 
//                         ...prev, 
//                         region_id: response.data.data._id
//                     }));
//                     if (!userRegionName && response.data.data.nom_region) {
//                         setUserRegionName(response.data.data.nom_region);
//                     }
//                 }
//             } else {
//                 const response = await axiosInst.get('/params/regions');
//                 allRegions = response.data.data || [];
//             }
            
//             setRegions(allRegions);
//         } catch (err) {
//             console.error("Erreur chargement régions:", err);
//             setRegions([]);
//         }
//     };

//     const fetchPerimetres = async () => {
//         try {
//             if (!formData.region_id) {
//                 setPerimetres([]);
//                 return;
//             }
            
//             const response = await axiosInst.get(`/params/perimetres/region/${formData.region_id}`);
//             setPerimetres(response.data.data || []);
//         } catch (err) {
//             console.error("Erreur chargement périmètres:", err);
//             setPerimetres([]);
//         }
//     };

//     const fetchFamilles = async () => {
//         try {
//             if (!formData.region_id || !formData.perimetre) {
//                 setFamilles([]);
//                 return;
//             }
            
//             const response = await axiosInst.get(`/params/familles/`);
//             setFamilles(response.data.data || []);
//         } catch (err) {
//             console.error("Erreur chargement familles:", err);
//             setFamilles([]);
//         }
//     };

//     // Récupérer les détails d'une région par son code
//     const getRegionDetailsByCode = async (regionCode) => {
//         try {
//             const response = await axiosInst.get(`/params/regions/${regionCode}`);
//             if (response.data && response.data.data) {
//                 return response.data.data;
//             }
//             return null;
//         } catch (err) {
//             console.error("Erreur récupération région:", err);
//             return null;
//         }
//     };

//     useEffect(() => {
//         if (userRole !== null) {
//             fetchRegions();
//         }
//     }, [userRole, userRegionId]);

//     useEffect(() => {
//         if (formData.region_id && formData.type_projet === 'nouveau') {
//             fetchPerimetres();
//             setFormData(prev => ({ ...prev, perimetre: '', famille: '' }));
//             setFamilles([]);
//         }
//     }, [formData.region_id, formData.type_projet]);

//     useEffect(() => {
//         if (formData.perimetre && formData.region_id && formData.type_projet === 'nouveau') {
//             fetchFamilles();
//             setFormData(prev => ({ ...prev, famille: '' }));
//         }
//     }, [formData.perimetre, formData.region_id, formData.type_projet]);

//     useEffect(() => {
//         const delayDebounceFn = setTimeout(() => {
//             if (formData.type_projet === 'en_cours' && formData.code_division && formData.code_division.length >= 3) {
//                 searchProjetByCode(formData.code_division);
//             }
//         }, 500);
//         return () => clearTimeout(delayDebounceFn);
//     }, [formData.code_division, formData.type_projet]);

//     // ============ RECHERCHE PROJET EXISTANT ============

//     const searchProjetByCode = async (codeDivision) => {
//         setSearchingCode(true);
//         setCodeNotFound(false);
//         try {
//             const response = await axiosInst.get(`/recap/budget/historique/${codeDivision}/actif/`);
//             if (response.data && response.data.version_active) {
//                 const projetData = response.data.version_active;
                
//                 const regionCode = projetData.region || projetData.region_id || '';
//                 const perimetreCode = projetData.perimetre || projetData.perm || '';
//                 const familleCode = projetData.famille || '';
//                 const activiteCode = projetData.activite || '';
                
//                 console.log("Codes récupérés du projet:", { regionCode, perimetreCode, familleCode, activiteCode });
                
//                 if (userRole === 'responsable_structure' && userRegionId) {
//                     const regionDetails = await getRegionDetailsByCode(regionCode);
//                     if (regionDetails && regionDetails._id !== userRegionId) {
//                         setError("Vous n'avez pas accès aux projets de cette région");
//                         setCodeNotFound(true);
//                         setSearchingCode(false);
//                         return;
//                     }
//                 }
                
//                 let regionNom = '';
//                 let perimetreNom = '';
//                 let familleNom = '';
//                 let activiteNom = '';
                
//                 if (regionCode) {
//                     const regionDetails = await getRegionDetailsByCode(regionCode);
//                     regionNom = regionDetails?.nom_region || regionCode;
//                 }
                
//                 if (perimetreCode) {
//                     const perimetreFound = perimetres.find(p => p.code_perimetre === perimetreCode);
//                     perimetreNom = perimetreFound?.nom_perimetre || perimetreCode;
//                 }
                
//                 if (familleCode) {
//                     const familleFound = familles.find(f => f.code_famille === familleCode);
//                     familleNom = familleFound?.nom_famille || familleCode;
//                 }
                
//                 if (activiteCode) {
//                     const activiteFound = activites.find(a => a.code === activiteCode);
//                     activiteNom = activiteFound?.nom || activiteCode;
//                 }
                
//                 setExistingProjetInfo({
//                     region_nom: regionNom,
//                     region_code: regionCode,
//                     perimetre_nom: perimetreNom,
//                     perimetre_code: perimetreCode,
//                     famille_nom: familleNom,
//                     famille_code: familleCode,
//                     activite_nom: activiteNom,
//                     activite_code: activiteCode
//                 });
                
//                 setFormData(prev => ({
//                     ...prev,
//                     libelle: projetData.libelle || '',
//                     region_id: regionCode,
//                     perimetre: perimetreCode,
//                     famille: familleCode,
//                     activite: activiteCode,
//                     annee_debut_pmt: projetData.annee_debut_pmt || new Date().getFullYear(),
//                     annee_fin_pmt: projetData.annee_fin_pmt || new Date().getFullYear() + 4,
//                     description_technique: projetData.description_technique || '',
//                     opportunite_projet: projetData.opportunite_projet || '',
//                     duree_realisation: projetData.duree_realisation || '',
//                     point_situation: projetData.point_situation || '',
                    
//                     cout_initial_total: '',
//                     cout_initial_dont_dex: '',
//                     realisation_cumul_n_mins1_total: '',
//                     realisation_cumul_n_mins1_dont_dex: '',
//                     real_s1_n_total: '',
//                     real_s1_n_dont_dex: '',
//                     prev_s2_n_total: '',
//                     prev_s2_n_dont_dex: '',
//                     prev_cloture_n_total: '',
//                     prev_cloture_n_dont_dex: '',
//                     prev_n_plus1_total: '',
//                     prev_n_plus1_dont_dex: '',
//                     reste_a_realiser_total: '',
//                     reste_a_realiser_dont_dex: '',
//                     prev_n_plus2_total: '',
//                     prev_n_plus2_dont_dex: '',
//                     prev_n_plus3_total: '',
//                     prev_n_plus3_dont_dex: '',
//                     prev_n_plus4_total: '',
//                     prev_n_plus4_dont_dex: '',
//                     prev_n_plus5_total: '',
//                     prev_n_plus5_dont_dex: '',
                    
//                     ...Object.fromEntries(moisList.flatMap(m => [
//                         [`${m.key}_total`, ''],
//                         [`${m.key}_dont_dex`, '']
//                     ]))
//                 }));
                
//                 setCodeNotFound(false);
//             } else {
//                 setCodeNotFound(true);
//                 setExistingProjetInfo({
//                     region_nom: '',
//                     region_code: '',
//                     perimetre_nom: '',
//                     perimetre_code: '',
//                     famille_nom: '',
//                     famille_code: '',
//                     activite_nom: '',
//                     activite_code: ''
//                 });
//             }
//         } catch (err) {
//             console.error("Erreur recherche projet:", err);
//             setCodeNotFound(true);
//         } finally {
//             setSearchingCode(false);
//         }
//     };

//     const handleTypeProjetChange = (type) => {
//         setFormData(prev => ({
//             ...prev,
//             type_projet: type,
//             code_division: type === 'nouveau' ? '' : prev.code_division,
//             region_id: type === 'nouveau' && userRole === 'responsable_structure' ? userRegionId : (type === 'nouveau' ? '' : prev.region_id),
//             perimetre: type === 'nouveau' ? '' : prev.perimetre,
//             famille: type === 'nouveau' ? '' : prev.famille,
//         }));
//         setCodeNotFound(false);
//         setFieldErrors({});
//         setExistingProjetInfo({
//             region_nom: '',
//             region_code: '',
//             perimetre_nom: '',
//             perimetre_code: '',
//             famille_nom: '',
//             famille_code: '',
//             activite_nom: '',
//             activite_code: ''
//         });
//     };

//     const validateStep = () => {
//         if (currentStep === 1) {
//             if (!formData.libelle) { setError("Veuillez saisir le libellé"); return false; }
//             if (!formData.code_division) { setError("Veuillez saisir le code division"); return false; }
//             if (formData.type_projet === 'en_cours' && codeNotFound) {
//                 setError("Code division introuvable");
//                 return false;
//             }
//             if (!formData.region_id) { setError("Veuillez sélectionner une région"); return false; }
//             if (!formData.perimetre) { setError("Veuillez sélectionner un périmètre"); return false; }
//             if (!formData.famille) { setError("Veuillez sélectionner une famille"); return false; }
//             if (!formData.duree_realisation) { 
//                 setError("Veuillez saisir la durée de réalisation"); 
//                 return false; 
//             }
//             if (!validateDureeRealisation(formData.duree_realisation)) {
//                 setError("La durée doit être comprise entre 1 et 99 mois");
//                 return false;
//             }
//         }
//         setError('');
//         return true;
//     };

//     const nextStep = () => { 
//         if (validateStep()) {
//             setCurrentStep(prev => prev + 1);
//             setError('');
//         }
//     };
    
//     const prevStep = () => { 
//         setCurrentStep(prev => prev - 1);
//         setError('');
//     };

//     const hasValidationErrors = () => {
//         return Object.keys(fieldErrors).length > 0;
//     };

//     const handleSubmit = async () => {
//         if (!validateStep()) return;
        
//         if (hasValidationErrors()) {
//             setError("❌ Veuillez corriger les erreurs de validation (Dont Dev > Total) avant de soumettre.");
//             return;
//         }
        
//         setLoading(true);
//         setError('');

//         const toFloat = (val) => {
//             if (!val && val !== 0) return 0;
//             const num = parseFloat(val);
//             return isNaN(num) ? 0 : num;
//         };

//         let regionCode = formData.region_id;
//         if (formData.region_id && regions.length > 0 && formData.type_projet === 'nouveau') {
//             const selectedRegion = regions.find(r => r._id === formData.region_id);
//             if (selectedRegion) {
//                 regionCode = selectedRegion.code_region;
//             }
//         }

//         const payload = {
//             activite: formData.activite || "PETROLE",
//             perimetre: formData.perimetre,
//             famille: formData.famille,
//             code_division: formData.code_division,
//             libelle: formData.libelle,
//             type_projet: formData.type_projet,
//             intervalle_pmt: [parseInt(formData.annee_debut_pmt), parseInt(formData.annee_fin_pmt)],
//             description_technique: formData.description_technique,
//             opportunite_projet: formData.opportunite_projet,
//             annee_debut_pmt: parseInt(formData.annee_debut_pmt),
//             annee_fin_pmt: parseInt(formData.annee_fin_pmt),
//             region: regionCode,
//             duree_realisation: parseInt(formData.duree_realisation) || null,
//             point_situation: formData.point_situation || '',

//             cout_initial_total: toFloat(formData.cout_initial_total),
//             cout_initial_dont_dex: toFloat(formData.cout_initial_dont_dex),
//             realisation_cumul_n_mins1_total: toFloat(formData.realisation_cumul_n_mins1_total),
//             realisation_cumul_n_mins1_dont_dex: toFloat(formData.realisation_cumul_n_mins1_dont_dex),
//             real_s1_n_total: toFloat(formData.real_s1_n_total),
//             real_s1_n_dont_dex: toFloat(formData.real_s1_n_dont_dex),
//             prev_s2_n_total: toFloat(formData.prev_s2_n_total),
//             prev_s2_n_dont_dex: toFloat(formData.prev_s2_n_dont_dex),
//             prev_cloture_n_total: toFloat(formData.prev_cloture_n_total),
//             prev_cloture_n_dont_dex: toFloat(formData.prev_cloture_n_dont_dex),
//             prev_n_plus1_total: toFloat(formData.prev_n_plus1_total),
//             prev_n_plus1_dont_dex: toFloat(formData.prev_n_plus1_dont_dex),
//             reste_a_realiser_total: toFloat(formData.reste_a_realiser_total),
//             reste_a_realiser_dont_dex: toFloat(formData.reste_a_realiser_dont_dex),

//             prev_n_plus2_total: toFloat(formData.prev_n_plus2_total),
//             prev_n_plus2_dont_dex: toFloat(formData.prev_n_plus2_dont_dex),
//             prev_n_plus3_total: toFloat(formData.prev_n_plus3_total),
//             prev_n_plus3_dont_dex: toFloat(formData.prev_n_plus3_dont_dex),
//             prev_n_plus4_total: toFloat(formData.prev_n_plus4_total),
//             prev_n_plus4_dont_dex: toFloat(formData.prev_n_plus4_dont_dex),
//             prev_n_plus5_total: toFloat(formData.prev_n_plus5_total),
//             prev_n_plus5_dont_dex: toFloat(formData.prev_n_plus5_dont_dex),

//             ...Object.fromEntries(moisList.flatMap(m => [
//                 [`${m.key}_total`, toFloat(formData[`${m.key}_total`])],
//                 [`${m.key}_dont_dex`, toFloat(formData[`${m.key}_dont_dex`])],
//             ])),
//         };

//         try {
//             let response;
            
//             if (formData.type_projet === 'nouveau') {
//                 response = await axiosInst.post('/recap/budget/nouveau-projet/', payload);
//             } else {
//                 response = await axiosInst.post(
//                     `/recap/budget/responsable/modifier-projet/${formData.code_division}/`, 
//                     payload
//                 );
//             }
            
//             if (response.data.success || response.data.status === 'success') {
//                 onSuccess(projet ? 'Projet modifié avec succès' : 'Projet créé avec succès');
//                 onClose();
//             }
//         } catch (err) {
//             console.error("Erreur:", err);
//             const errData = err.response?.data;
//             if (errData?.errors) {
//                 const msgs = Object.values(errData.errors).join('\n');
//                 setError(msgs);
//             } else {
//                 setError(errData?.error || errData?.message || "Erreur lors de l'enregistrement");
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     // ============ UTILITAIRES ============

//     const formatCurrency = (value) => {
//         if (!value && value !== 0) return '0 DA';
//         const num = parseFloat(value);
//         if (isNaN(num)) return '0 DA';
//         return new Intl.NumberFormat('fr-DZ').format(num) + ' DA';
//     };

//     const totalPrevisionsPluri = () => {
//         const n2 = parseFloat(formData.prev_n_plus2_total) || 0;
//         const n3 = parseFloat(formData.prev_n_plus3_total) || 0;
//         const n4 = parseFloat(formData.prev_n_plus4_total) || 0;
//         const n5 = parseFloat(formData.prev_n_plus5_total) || 0;
//         return n2 + n3 + n4 + n5;
//     };

//     const totalPrevisionsPluriDex = () => {
//         const n2 = parseFloat(formData.prev_n_plus2_dont_dex) || 0;
//         const n3 = parseFloat(formData.prev_n_plus3_dont_dex) || 0;
//         const n4 = parseFloat(formData.prev_n_plus4_dont_dex) || 0;
//         const n5 = parseFloat(formData.prev_n_plus5_dont_dex) || 0;
//         return n2 + n3 + n4 + n5;
//     };

//     const totalMensuel = () => {
//         return moisList.reduce((sum, m) => sum + (parseFloat(formData[`${m.key}_total`]) || 0), 0);
//     };

//     const totalMensuelDex = () => {
//         return moisList.reduce((sum, m) => sum + (parseFloat(formData[`${m.key}_dont_dex`]) || 0), 0);
//     };

//     const coutGlobal = () => {
//         if (formData.type_projet === 'en_cours') {
//             return (parseFloat(formData.cout_initial_total) || 0);
//         }
//         return totalPrevisionsPluri() + totalMensuel();
//     };

//     const anneeBase = (parseInt(formData.annee_debut_pmt) || new Date().getFullYear()) - 1;
//     const STEPS = ['Identification', `Prévisions ${formData.annee_debut_pmt}`, `Prévisions ${anneeBase+2}→${anneeBase+5}`, 'Récapitulatif'];

//     // Animation shake
//     const shakeAnimation = `
//         @keyframes shake {
//             0%, 100% { transform: translateX(0); }
//             25% { transform: translateX(-5px); }
//             75% { transform: translateX(5px); }
//         }
//         .shake {
//             animation: shake 0.3s ease-in-out;
//             border-color: #ef4444 !important;
//             background-color: #fef2f2 !important;
//         }
//     `;

//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//             <style>{shakeAnimation}</style>
//             <div className="w-[950px] max-h-[92vh] flex flex-col bg-white shadow-2xl rounded-2xl overflow-hidden">
//                 {/* En-tête */}
//                 <div className="px-6 pt-5 pb-4 border-b border-gray-100 bg-white">
//                     <div className="flex justify-between items-start mb-4">
//                         <div>
//                             <h2 className="text-lg font-bold text-gray-900">
//                                 {projet ? 'Modifier le Projet' : 'Nouveau Projet'}
//                             </h2>
//                             {userRole === 'responsable_structure' && userRegionName && formData.type_projet === 'nouveau' && (
//                                 <p className="text-sm text-blue-600 font-medium mt-1">
//                                     📍 Vous créez un projet dans la région : <strong>{userRegionName}</strong>
//                                 </p>
//                             )}
//                             {formData.type_projet === 'en_cours' && formData.code_division && (
//                                 <p className="text-sm text-orange-500 font-mono font-medium mt-1">
//                                     Code recherché: {formData.code_division}
//                                 </p>
//                             )}
//                         </div>
//                         <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
//                             <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
//                                 <path d="M18 6L6 18M6 6L18 18" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
//                             </svg>
//                         </button>
//                     </div>

//                     {/* Steps */}
//                     <div className="flex items-center gap-0">
//                         {STEPS.map((label, idx) => {
//                             const step = idx + 1;
//                             const active = currentStep === step;
//                             const done = currentStep > step;
//                             return (
//                                 <React.Fragment key={step}>
//                                     <div className="flex flex-col items-center">
//                                         <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all
//                                             ${done ? 'bg-green-500 text-white' : active ? 'bg-[#FF8500] text-white shadow-lg shadow-orange-200' : 'bg-gray-100 text-gray-400'}`}>
//                                             {done ? '✓' : step}
//                                         </div>
//                                         <span className={`text-[10px] mt-0.5 whitespace-nowrap ${active ? 'text-orange-500 font-semibold' : 'text-gray-400'}`}>
//                                             {label}
//                                         </span>
//                                     </div>
//                                     {idx < STEPS.length - 1 && (
//                                         <div className={`flex-1 h-0.5 mx-1 mb-3 transition-all ${done ? 'bg-green-400' : 'bg-gray-200'}`} />
//                                     )}
//                                 </React.Fragment>
//                             );
//                         })}
//                     </div>
//                 </div>

//                 {/* Corps avec scroll */}
//                 <div className="flex-1 overflow-y-auto p-6 space-y-4">
//                     {error && (
//                         <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl whitespace-pre-line">
//                             {error}
//                         </div>
//                     )}

//                     {/* ÉTAPE 1 : Identification */}
//                     {currentStep === 1 && (
//                         <div className="space-y-4">
//                             {/* Type de projet */}
//                             <div className="grid grid-cols-2 gap-4">
//                                 <div
//                                     onClick={() => handleTypeProjetChange('nouveau')}
//                                     className={`cursor-pointer rounded-xl p-4 border-2 transition-all ${
//                                         formData.type_projet === 'nouveau'
//                                             ? 'border-orange-400 bg-orange-50'
//                                             : 'border-gray-200 hover:border-gray-300'
//                                     }`}
//                                 >
//                                     <div className="flex items-center gap-3">
//                                         <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
//                                             formData.type_projet === 'nouveau' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-500'
//                                         }`}>
//                                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                                             </svg>
//                                         </div>
//                                         <div>
//                                             <h4 className={`font-semibold ${formData.type_projet === 'nouveau' ? 'text-orange-600' : 'text-gray-800'}`}>
//                                                 Nouveau projet
//                                             </h4>
//                                             <p className="text-xs text-gray-500">Créer à partir de zéro</p>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div
//                                     onClick={() => handleTypeProjetChange('en_cours')}
//                                     className={`cursor-pointer rounded-xl p-4 border-2 transition-all ${
//                                         formData.type_projet === 'en_cours'
//                                             ? 'border-orange-400 bg-orange-50'
//                                             : 'border-gray-200 hover:border-gray-300'
//                                     }`}
//                                 >
//                                     <div className="flex items-center gap-3">
//                                         <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
//                                             formData.type_projet === 'en_cours' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-500'
//                                         }`}>
//                                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//                                             </svg>
//                                         </div>
//                                         <div>
//                                             <h4 className={`font-semibold ${formData.type_projet === 'en_cours' ? 'text-orange-600' : 'text-gray-800'}`}>
//                                                 Projet en cours
//                                             </h4>
//                                             <p className="text-xs text-gray-500">Reprendre existant</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Code division */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     N°:Cpte Analytique<span className="text-red-500">*</span>
//                                 </label>
//                                 <div className="relative">
//                                     <input
//                                         type="text"
//                                         name="code_division"
//                                         value={formData.code_division}
//                                         onChange={handleInputChange}
//                                         placeholder={formData.type_projet === 'en_cours' ? "Rechercher par code..." : "ex: PROJ-2024-001"}
//                                         className={`w-full h-10 px-3 rounded-[20px] border outline-none focus:border-orange-400 ${
//                                             codeNotFound && formData.type_projet === 'en_cours'
//                                                 ? 'border-red-400 bg-red-50'
//                                                 : 'border-gray-300'
//                                         }`}
//                                     />
//                                     {searchingCode && (
//                                         <div className="absolute right-3 top-1/2 -translate-y-1/2">
//                                             <svg className="animate-spin h-4 w-4 text-orange-500" viewBox="0 0 24 24">
//                                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//                                             </svg>
//                                         </div>
//                                     )}
//                                 </div>
//                                 {codeNotFound && formData.type_projet === 'en_cours' && (
//                                     <p className="text-xs text-red-500 mt-1">Code division introuvable</p>
//                                 )}
//                                 {!codeNotFound && formData.type_projet === 'en_cours' && formData.code_division && !searchingCode && (
//                                     <p className="text-xs text-green-600 mt-1">✓ Projet trouvé - Informations chargées</p>
//                                 )}
//                             </div>

//                             {/* Libellé */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Libellé du projet</label>
//                                 <input
//                                     type="text"
//                                     name="libelle"
//                                     value={formData.libelle}
//                                     onChange={handleInputChange}
//                                     className="w-full h-10 px-3 rounded-[20px] border border-gray-300 outline-none focus:border-orange-400"
//                                     placeholder="Nom du projet"
//                                 />
//                             </div>

//                             {/* Période PMT */}
//                             <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">📅 Période PMT</label>
//                                 <div className="grid grid-cols-2 gap-4">
//                                     <div>
//                                         <label className="text-xs text-gray-500">Année début</label>
//                                         <input
//                                             type="number"
//                                             name="annee_debut_pmt"
//                                             value={formData.annee_debut_pmt}
//                                             onChange={handleInputChange}
//                                             className="w-full h-10 px-3 rounded-[20px] border border-blue-200 outline-none focus:border-orange-400"
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="text-xs text-gray-500">Année fin</label>
//                                         <input
//                                             type="number"
//                                             name="annee_fin_pmt"
//                                             value={formData.annee_fin_pmt}
//                                             readOnly
//                                             className="w-full h-10 px-3 rounded-[20px] border border-blue-200 outline-none focus:border-orange-400 bg-gray-50"
//                                         />
//                                         <p className="text-xs text-gray-400 mt-1">Auto-calculé: année début + 4</p>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Localisation - Région, Périmètre, Famille */}
//                             <div className="grid grid-cols-3 gap-4">
//                                 {/* Région */}
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">Région</label>
//                                     {formData.type_projet === 'en_cours' && formData.code_division && !codeNotFound && formData.region_id ? (
//                                         <select
//                                             value={formData.region_id}
//                                             disabled
//                                             className="w-full h-10 px-3 rounded-[20px] bg-gray-100 border border-gray-300 cursor-not-allowed"
//                                         >
//                                             <option value={existingProjetInfo.region_code}>
//                                                 {existingProjetInfo.region_nom}
//                                             </option>
//                                         </select>
//                                     ) : (
//                                         <select
//                                             name="region_id"
//                                             value={formData.region_id}
//                                             onChange={handleInputChange}
//                                             disabled={userRole === 'responsable_structure'}
//                                             className={`w-full h-10 px-3 rounded-[20px] border border-gray-300 outline-none focus:border-orange-400 ${
//                                                 userRole === 'responsable_structure' ? 'bg-gray-100 cursor-not-allowed' : ''
//                                             }`}
//                                         >
//                                             <option value="">Sélectionner</option>
//                                             {regions.map(r => (
//                                                 <option key={r._id} value={r._id}>
//                                                     {r.nom_region}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                     )}
//                                 </div>

//                                 {/* Périmètre */}
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">Périmètre</label>
//                                     {formData.type_projet === 'en_cours' && formData.code_division && !codeNotFound && formData.perimetre ? (
//                                         <select
//                                             value={formData.perimetre}
//                                             disabled
//                                             className="w-full h-10 px-3 rounded-[20px] bg-gray-100 border border-gray-300 cursor-not-allowed"
//                                         >
//                                             <option value={existingProjetInfo.perimetre_code}>
//                                                 {existingProjetInfo.perimetre_nom}
//                                             </option>
//                                         </select>
//                                     ) : (
//                                         <select
//                                             name="perimetre"
//                                             value={formData.perimetre}
//                                             onChange={handleInputChange}
//                                             disabled={!formData.region_id}
//                                             className={`w-full h-10 px-3 rounded-[20px] border border-gray-300 outline-none focus:border-orange-400 ${
//                                                 !formData.region_id ? 'bg-gray-100 cursor-not-allowed' : ''
//                                             }`}
//                                         >
//                                             <option value="">Sélectionner</option>
//                                             {perimetres.map(p => (
//                                                 <option key={p.code_perimetre} value={p.code_perimetre}>
//                                                     {p.nom_perimetre}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                     )}
//                                 </div>

//                                 {/* Famille */}
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">Famille</label>
//                                     {formData.type_projet === 'en_cours' && formData.code_division && !codeNotFound && formData.famille ? (
//                                         <select
//                                             value={formData.famille}
//                                             disabled
//                                             className="w-full h-10 px-3 rounded-[20px] bg-gray-100 border border-gray-300 cursor-not-allowed"
//                                         >
//                                             <option value={existingProjetInfo.famille_code}>
//                                                 {existingProjetInfo.famille_nom}
//                                             </option>
//                                         </select>
//                                     ) : (
//                                         <select
//                                             name="famille"
//                                             value={formData.famille}
//                                             onChange={handleInputChange}
//                                             disabled={!formData.perimetre}
//                                             className={`w-full h-10 px-3 rounded-[20px] border border-gray-300 outline-none focus:border-orange-400 ${
//                                                 !formData.perimetre ? 'bg-gray-100 cursor-not-allowed' : ''
//                                             }`}
//                                         >
//                                             <option value="">Sélectionner</option>
//                                             {familles.map(f => (
//                                                 <option key={f.code_famille} value={f.code_famille}>
//                                                     {f.nom_famille}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                     )}
//                                 </div>
//                             </div>

//                             {/* Activité - désactivé si projet trouvé */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Activité</label>
//                                 {formData.type_projet === 'en_cours' && formData.code_division && !codeNotFound && existingProjetInfo.activite_code ? (
//                                     <select
//                                         value={existingProjetInfo.activite_code}
//                                         disabled
//                                         className="w-full h-10 px-3 rounded-[20px] bg-gray-100 border border-gray-300 cursor-not-allowed"
//                                     >
//                                         <option value={existingProjetInfo.activite_code}>
//                                             {existingProjetInfo.activite_nom}
//                                         </option>
//                                     </select>
//                                 ) : (
//                                     <select
//                                         name="activite"
//                                         value={formData.activite}
//                                         onChange={handleInputChange}
//                                         className="w-full h-10 px-3 rounded-[20px] border border-gray-300 outline-none focus:border-orange-400"
//                                     >
//                                         <option value="">Sélectionner</option>
//                                         {activites.map(a => <option key={a.code} value={a.code}>{a.nom}</option>)}
//                                     </select>
//                                 )}
//                             </div>

//                             {/* Description technique */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Description technique</label>
//                                 <textarea
//                                     name="description_technique"
//                                     value={formData.description_technique}
//                                     onChange={handleInputChange}
//                                     rows="2"
//                                     className="w-full px-3 py-2 rounded-2xl border border-gray-300 outline-none resize-none focus:border-orange-400"
//                                     placeholder="Description du projet..."
//                                 />
//                             </div>

//                             {/* Opportunité */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Opportunité du projet</label>
//                                 <textarea
//                                     name="opportunite_projet"
//                                     value={formData.opportunite_projet}
//                                     onChange={handleInputChange}
//                                     rows="2"
//                                     className="w-full px-3 py-2 rounded-2xl border border-gray-300 outline-none resize-none focus:border-orange-400"
//                                     placeholder="Opportunité stratégique..."
//                                 />
//                             </div>

//                             {/* Durée de réalisation */}
//                             <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                         Durée de réalisation <span className="text-red-500">*</span>
//                                     </label>
//                                     <div className="relative">
//                                         <input
//                                             type="text"
//                                             name="duree_realisation"
//                                             value={formData.duree_realisation}
//                                             onChange={handleInputChange}
//                                             placeholder="Ex: 24"
//                                             maxLength="2"
//                                             className="w-full h-10 px-3 rounded-[20px] border border-gray-300 outline-none focus:border-orange-400"
//                                         />
//                                         <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
//                                             mois
//                                         </span>
//                                     </div>
//                                     <p className="text-xs text-gray-500 mt-1">
//                                         ⏱️ Durée prévisionnelle en mois (max 99 mois)
//                                     </p>
//                                     {formData.duree_realisation && !validateDureeRealisation(formData.duree_realisation) && (
//                                         <p className="text-xs text-red-500 mt-1">
//                                             ❌ La durée doit être comprise entre 1 et 99 mois
//                                         </p>
//                                     )}
//                                 </div>
//                             </div>

//                             {/* Point de situation */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Point de situation
//                                 </label>
//                                 <textarea
//                                     name="point_situation"
//                                     value={formData.point_situation}
//                                     onChange={handleInputChange}
//                                     rows="3"
//                                     className="w-full px-3 py-2 rounded-2xl border border-gray-300 outline-none resize-none focus:border-orange-400"
//                                     placeholder="Décrivez l'état d'avancement du projet, les étapes clés, les difficultés rencontrées..."
//                                 />
//                                 <p className="text-xs text-gray-500 mt-1">
//                                     📊 Situation actuelle du projet, jalons importants, avancement...
//                                 </p>
//                             </div>

//                             {/* SECTION PROJET EN COURS - Réalisations */}
//                             {formData.type_projet === 'en_cours' && (
//                                 <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 space-y-4">
//                                     <div className="grid grid-cols-2 gap-4">
//                                         <div>
//                                             <label className="text-sm font-medium text-gray-700">Réalisations Cumulées à fin {anneeBase - 1} (Total)</label>
//                                             <input
//                                                 type="number"
//                                                 name="realisation_cumul_n_mins1_total"
//                                                 value={formData.realisation_cumul_n_mins1_total}
//                                                 onChange={handleInputChange}
//                                                 className="w-full h-10 px-3 rounded-[20px] border border-purple-200 outline-none focus:border-orange-400"
//                                                 step="any"
//                                             />
//                                         </div>
//                                         <div>
//                                             <label className="text-sm font-medium text-gray-700">Réalisations Cumulées à fin {anneeBase - 1} (Dont Dev)</label>
//                                             <input
//                                                 type="number"
//                                                 name="realisation_cumul_n_mins1_dont_dex"
//                                                 value={formData.realisation_cumul_n_mins1_dont_dex}
//                                                 onChange={handleInputChange}
//                                                 className={`w-full h-10 px-3 rounded-[20px] border outline-none focus:border-orange-400 transition-all duration-200 ${
//                                                     fieldErrors['realisation_cumul_n_mins1_dont_dex'] 
//                                                         ? 'border-red-500 bg-red-50' 
//                                                         : 'border-purple-200'
//                                                 }`}
//                                                 step="any"
//                                             />
//                                             {fieldErrors['realisation_cumul_n_mins1_dont_dex'] && (
//                                                 <div className="flex items-center gap-2 mt-1">
//                                                     <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                                     </svg>
//                                                     <p className="text-xs text-red-500 font-medium">
//                                                         {fieldErrors['realisation_cumul_n_mins1_dont_dex']}
//                                                     </p>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>

//                                     <div className="border-t border-purple-200 pt-4">
//                                         <label className="text-sm font-semibold text-purple-700 block mb-3">Prévisions de clôture {anneeBase} (Année en cours)</label>
//                                         <div className="grid grid-cols-2 gap-4">
//                                             <div>
//                                                 <label className="text-xs text-gray-600">Réalisation S1 (Total)</label>
//                                                 <input
//                                                     type="number"
//                                                     name="real_s1_n_total"
//                                                     value={formData.real_s1_n_total}
//                                                     onChange={handleInputChange}
//                                                     className="w-full h-10 px-3 rounded-[20px] border border-purple-200 outline-none focus:border-orange-400"
//                                                     step="any"
//                                                 />
//                                             </div>
//                                             <div>
//                                                 <label className="text-xs text-gray-600">Réalisation S1 (Dont Dev)</label>
//                                                 <input
//                                                     type="number"
//                                                     name="real_s1_n_dont_dex"
//                                                     value={formData.real_s1_n_dont_dex}
//                                                     onChange={handleInputChange}
//                                                     className={`w-full h-10 px-3 rounded-[20px] border outline-none focus:border-orange-400 transition-all duration-200 ${
//                                                         fieldErrors['real_s1_n_dont_dex'] 
//                                                             ? 'border-red-500 bg-red-50' 
//                                                             : 'border-purple-200'
//                                                     }`}
//                                                     step="any"
//                                                 />
//                                                 {fieldErrors['real_s1_n_dont_dex'] && (
//                                                     <div className="flex items-center gap-2 mt-1">
//                                                         <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                                         </svg>
//                                                         <p className="text-xs text-red-500 font-medium">{fieldErrors['real_s1_n_dont_dex']}</p>
//                                                     </div>
//                                                 )}
//                                             </div>
                                            
//                                             <div>
//                                                 <label className="text-xs text-gray-600">Prévision S2 (Total)</label>
//                                                 <input
//                                                     type="number"
//                                                     name="prev_s2_n_total"
//                                                     value={formData.prev_s2_n_total}
//                                                     onChange={handleInputChange}
//                                                     className="w-full h-10 px-3 rounded-[20px] border border-purple-200 outline-none focus:border-orange-400"
//                                                     step="any"
//                                                 />
//                                             </div>
//                                             <div>
//                                                 <label className="text-xs text-gray-600">Prévision S2 (Dont Dev)</label>
//                                                 <input
//                                                     type="number"
//                                                     name="prev_s2_n_dont_dex"
//                                                     value={formData.prev_s2_n_dont_dex}
//                                                     onChange={handleInputChange}
//                                                     className={`w-full h-10 px-3 rounded-[20px] border outline-none focus:border-orange-400 transition-all duration-200 ${
//                                                         fieldErrors['prev_s2_n_dont_dex'] 
//                                                             ? 'border-red-500 bg-red-50' 
//                                                             : 'border-purple-200'
//                                                     }`}
//                                                     step="any"
//                                                 />
//                                                 {fieldErrors['prev_s2_n_dont_dex'] && (
//                                                     <div className="flex items-center gap-2 mt-1">
//                                                         <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                                         </svg>
//                                                         <p className="text-xs text-red-500 font-medium">{fieldErrors['prev_s2_n_dont_dex']}</p>
//                                                     </div>
//                                                 )}
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="bg-white rounded-lg p-3 border border-purple-200">
//                                         <div className="grid grid-cols-2 gap-4">
//                                             <div>
//                                                 <label className="text-sm font-medium text-purple-700">Prévision Clôture {anneeBase} (Total)</label>
//                                                 <input
//                                                     type="text"
//                                                     value={formatCurrency(formData.prev_cloture_n_total)}
//                                                     readOnly
//                                                     className="w-full h-10 px-3 rounded-[20px] bg-purple-100 text-purple-800 font-semibold"
//                                                 />
//                                                 <p className="text-xs text-gray-500 mt-1">(Réal. S1 + Prév. S2)</p>
//                                             </div>
//                                             <div>
//                                                 <label className="text-sm font-medium text-purple-700">Prévision Clôture {anneeBase} (Dont Dev)</label>
//                                                 <input
//                                                     type="text"
//                                                     value={formatCurrency(formData.prev_cloture_n_dont_dex)}
//                                                     readOnly
//                                                     className="w-full h-10 px-3 rounded-[20px] bg-purple-100 text-purple-800 font-semibold"
//                                                 />
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     )}

//                     {/* ÉTAPE 2 : Budget mensuel N+1 - Affichage en colonnes */}
//                     {currentStep === 2 && (
//                         <div className="space-y-3">
//                             <div className="flex items-center justify-between flex-wrap gap-2">
//                                 <p className="text-sm text-gray-600">
//                                     📊 Répartition mensuelle pour l'année <strong className="text-orange-600">{formData.annee_debut_pmt}</strong>
//                                 </p>
//                                 <div className="bg-gradient-to-r from-amber-100 to-yellow-100 border border-amber-300 px-4 py-1.5 rounded-full shadow-sm">
//                                     <span className="text-sm font-medium text-amber-800">
//                                         Total Prévisions {anneeBase + 1} : <span className="font-bold text-amber-900">{formatCurrency(totalMensuel())}</span>
//                                     </span>
//                                 </div>
//                             </div>

//                             {/* Affichage en colonnes (vertical) */}
//                             <div className="flex flex-col gap-3">
//                                 {moisList.map(mois => {
//                                     const devError = fieldErrors[`${mois.key}_dont_dex`];
//                                     return (
//                                         <div key={mois.key} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
//                                             <div className="flex items-center gap-4">
//                                                 <div className="w-24">
//                                                     <label className="text-sm font-semibold text-gray-700">
//                                                         {mois.label}
//                                                     </label>
//                                                 </div>
//                                                 <div className="flex-1">
//                                                     <label className="text-xs text-gray-500 block mb-1">Total (DA)</label>
//                                                     <input
//                                                         type="number"
//                                                         name={`${mois.key}_total`}
//                                                         value={formData[`${mois.key}_total`] || ''}
//                                                         onChange={handleInputChange}
//                                                         className="w-full h-10 px-3 rounded-[20px] border border-gray-200 outline-none text-sm focus:border-orange-400"
//                                                         placeholder="0"
//                                                         step="any"
//                                                     />
//                                                 </div>
//                                                 <div className="flex-1">
//                                                     <label className="text-xs text-gray-500 block mb-1">Dont Dev (DA)</label>
//                                                     <input
//                                                         type="number"
//                                                         name={`${mois.key}_dont_dex`}
//                                                         value={formData[`${mois.key}_dont_dex`] || ''}
//                                                         onChange={handleInputChange}
//                                                         className={`w-full h-10 px-3 rounded-[20px] border outline-none text-sm focus:border-orange-400 transition-all duration-200 ${
//                                                             devError ? 'border-red-500 bg-red-50' : 'border-gray-200'
//                                                         }`}
//                                                         placeholder="0"
//                                                         step="any"
//                                                     />
//                                                     {devError && (
//                                                         <div className="flex items-center gap-1 mt-1">
//                                                             <svg className="w-3 h-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                                             </svg>
//                                                             <p className="text-xs text-red-500">{devError}</p>
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     );
//                                 })}
//                             </div>

//                             <div className="bg-green-50 border border-green-200 rounded-xl p-4">
//                                 <div className="grid grid-cols-2 gap-4">
//                                     <div className="text-center">
//                                         <span className="text-xs text-green-600">Total Annuel {anneeBase + 1}</span>
//                                         <p className="text-lg font-bold text-green-700">{formatCurrency(totalMensuel())}</p>
//                                     </div>
//                                     <div className="text-center">
//                                         <span className="text-xs text-green-600">Total Dev {anneeBase + 1}</span>
//                                         <p className="text-lg font-bold text-green-700">{formatCurrency(totalMensuelDex())}</p>
//                                     </div>
//                                 </div>
//                             </div>

//                             {formData.type_projet === 'en_cours' && (
//                                 <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
//                                     <div className="grid grid-cols-2 gap-4">
//                                         <div>
//                                             <label className="text-sm font-medium text-blue-700">Prévision {anneeBase + 1} (Total)</label>
//                                             <input
//                                                 type="text"
//                                                 value={formatCurrency(formData.prev_n_plus1_total)}
//                                                 readOnly
//                                                 className="w-full h-10 px-3 rounded-[20px] bg-blue-100 text-blue-800 font-semibold"
//                                             />
//                                             <p className="text-xs text-gray-500 mt-1">(Somme des mois)</p>
//                                         </div>
//                                         <div>
//                                             <label className="text-sm font-medium text-blue-700">Prévision {anneeBase + 1} (Dont Dev)</label>
//                                             <input
//                                                 type="text"
//                                                 value={formatCurrency(formData.prev_n_plus1_dont_dex)}
//                                                 readOnly
//                                                 className="w-full h-10 px-3 rounded-[20px] bg-blue-100 text-blue-800 font-semibold"
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     )}

//                     {/* ÉTAPE 3 : Prévisions N+2 à N+5 */}
//                     {currentStep === 3 && (
//                         <div className="space-y-3">
//                             <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
//                                 <div className="flex justify-between items-center">
//                                     <span className="font-semibold text-amber-800">Total prévisions pluriannuelles ({anneeBase + 2} à {anneeBase + 5})</span>
//                                     <div className="text-right">
//                                         <span className="text-xl font-bold text-amber-900">{formatCurrency(totalPrevisionsPluri())}</span>
//                                         <p className="text-xs text-amber-600">Dont Dev: {formatCurrency(totalPrevisionsPluriDex())}</p>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="bg-white border border-gray-200 rounded-xl p-4">
//                                 <label className="block text-sm font-medium text-gray-700 mb-3">Prévisions pluriannuelles</label>
                                
//                                 {[
//                                     { year: anneeBase + 2, total: 'prev_n_plus2_total', dev: 'prev_n_plus2_dont_dex' },
//                                     { year: anneeBase + 3, total: 'prev_n_plus3_total', dev: 'prev_n_plus3_dont_dex' },
//                                     { year: anneeBase + 4, total: 'prev_n_plus4_total', dev: 'prev_n_plus4_dont_dex' },
//                                     { year: anneeBase + 5, total: 'prev_n_plus5_total', dev: 'prev_n_plus5_dont_dex' }
//                                 ].map((item) => (
//                                     <div key={item.year} className="mb-4 pb-3 border-b border-gray-100 last:border-0">
//                                         <label className="text-sm font-medium text-gray-600 block mb-2">{item.year}</label>
//                                         <div className="grid grid-cols-2 gap-4">
//                                             <div>
//                                                 <label className="text-xs text-gray-400 block mb-1">Total (DA)</label>
//                                                 <input
//                                                     type="number"
//                                                     name={item.total}
//                                                     value={formData[item.total]}
//                                                     onChange={handleInputChange}
//                                                     className="w-full h-10 px-3 rounded-[20px] border border-gray-200 outline-none focus:border-orange-400"
//                                                     step="any"
//                                                 />
//                                             </div>
//                                             <div>
//                                                 <label className="text-xs text-gray-400 block mb-1">Dont Dev (DA)</label>
//                                                 <input
//                                                     type="number"
//                                                     name={item.dev}
//                                                     value={formData[item.dev]}
//                                                     onChange={handleInputChange}
//                                                     className={`w-full h-10 px-3 rounded-[20px] border outline-none focus:border-orange-400 ${
//                                                         fieldErrors[item.dev] ? 'border-red-500 bg-red-50' : 'border-gray-200'
//                                                     }`}
//                                                     step="any"
//                                                 />
//                                                 {fieldErrors[item.dev] && (
//                                                     <p className="text-xs text-red-500 mt-1">{fieldErrors[item.dev]}</p>
//                                                 )}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>

//                             {formData.type_projet === 'en_cours' && (
//                                 <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
//                                     <div className="grid grid-cols-2 gap-4">
//                                         <div>
//                                             <label className="text-sm font-medium text-indigo-700">Reste à Réaliser (Total)</label>
//                                             <input
//                                                 type="text"
//                                                 value={formatCurrency(formData.reste_a_realiser_total)}
//                                                 readOnly
//                                                 className="w-full h-10 px-3 rounded-[20px] bg-indigo-100 text-indigo-800 font-semibold"
//                                             />
//                                         </div>
//                                         <div>
//                                             <label className="text-sm font-medium text-indigo-700">Reste à Réaliser (Dont Dev)</label>
//                                             <input
//                                                 type="text"
//                                                 value={formatCurrency(formData.reste_a_realiser_dont_dex)}
//                                                 readOnly
//                                                 className="w-full h-10 px-3 rounded-[20px] bg-indigo-100 text-indigo-800 font-semibold"
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     )}

//                     {/* ÉTAPE 4 : Récapitulatif */}
//                   {currentStep === 4 && (
//     <div className="space-y-4">
//         {/* Informations de réalisation */}
//         <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
//             <h4 className="font-semibold text-green-800 mb-3"> Informations de réalisation</h4>
//             <div className="grid grid-cols-2 gap-4">
//                 <div>
//                     <p className="text-xs text-green-600">Durée de réalisation</p>
//                     <p className="text-lg font-bold text-green-700">
//                         {formData.duree_realisation} mois
//                     </p>
//                 </div>
//                 <div>
//                     <p className="text-xs text-green-600"> PMT</p>
//                     <p className="text-lg font-bold text-green-700">
//                         {formData.annee_debut_pmt} → {formData.annee_fin_pmt}
//                     </p>
//                 </div>
//             </div>
//             {formData.point_situation && (
//                 <div className="mt-3 pt-3 border-t border-green-200">
//                     <p className="text-xs text-green-600 mb-1">Point de situation</p>
//                     <p className="text-sm text-gray-700">{formData.point_situation}</p>
//                 </div>
//             )}
//         </div>

//         {/* Cartes récapitulatives */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             {/* Carte Coût Global */}
//             <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200 shadow-sm">
//                 <p className="text-xs text-emerald-600 font-medium"> Coût Global</p>
//                 <p className="text-2xl font-bold text-emerald-700 mt-1">{formatCurrency(coutGlobal())}</p>
//                    <p className="text-xs text-emerald-600 font-medium">Dont Dev:
//                                 {formatCurrency(
//                                     formData.type_projet === 'en_cours' 
//                                         ? (parseFloat(formData.cout_initial_dont_dex) || 0)
//                                         : totalPrevisionsPluriDex() + totalMensuelDex()
//                                 )}
//                              </p>
//             </div>

//             {/* Carte Prévisions Année N+1 (2026) */}
//             <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200 shadow-sm">
//                 <p className="text-xs text-amber-600 font-medium">Prévisions {anneeBase + 1}</p>
//                 <p className="text-lg font-bold text-amber-700 mt-1">{formatCurrency(totalMensuel())}</p>
//                 <p className="text-xs text-amber-600">Dont Dev: {formatCurrency(totalMensuelDex())}</p>
//             </div>

//             {/* Carte Prévisions Pluriannuelles */}
//             <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200 shadow-sm">
//                 <p className="text-xs text-blue-600 font-medium"> Prévisions {anneeBase + 2} → {anneeBase + 5}</p>
//                 <p className="text-lg font-bold text-blue-700 mt-1">{formatCurrency(totalPrevisionsPluri())}</p>
//                 <p className="text-xs text-blue-600">Dont Dev: {formatCurrency(totalPrevisionsPluriDex())}</p>
//             </div>
//         </div>

//         {/* Tableau détaillé des prévisions */}
//         <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
//             <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
//                 <h4 className="font-semibold text-gray-700"> Détail des prévisions financières</h4>
//             </div>
//             <div className="overflow-x-auto">
//                 <table className="w-full text-sm">
//                     <thead>
//                         <tr className="bg-gray-100">
//                             <th className="px-4 py-3 text-left text-gray-600 font-semibold">Période</th>
//                             <th className="px-4 py-3 text-right text-gray-600 font-semibold">Total (DA)</th>
//                             <th className="px-4 py-3 text-right text-gray-600 font-semibold">Dont Dev (DA)</th>
//                         </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-100">
                        
//                         {/* Ligne: Prévisions {anneeBase + 1} (2026) */}
//                         <tr className="bg-amber-50">
//                             <td className="px-4 py-3 font-medium text-gray-800">
//                                  Prévisions {anneeBase + 1}
//                                 {/* <p className="text-xs text-gray-500 mt-0.5">(Budget annuel)</p> */}
//                             </td>
//                             <td className="px-4 py-3 text-right font-bold">{formatCurrency(totalMensuel())}</td>
//                             <td className="px-4 py-3 text-right font-bold text-orange-600">{formatCurrency(totalMensuelDex())}</td>
//                         </tr>

//                         {/* Ligne: Prévision {anneeBase + 2} */}
//                         <tr className="hover:bg-gray-50">
//                             <td className="px-4 py-3 font-medium text-gray-700">Prévision {anneeBase + 2}</td>
//                             <td className="px-4 py-3 text-right">{formatCurrency(formData.prev_n_plus2_total)}</td>
//                             <td className="px-4 py-3 text-right text-orange-600">{formatCurrency(formData.prev_n_plus2_dont_dex)}</td>
//                         </tr>

//                         {/* Ligne: Prévision {anneeBase + 3} */}
//                         <tr className="hover:bg-gray-50">
//                             <td className="px-4 py-3 font-medium text-gray-700">Prévision {anneeBase + 3}</td>
//                             <td className="px-4 py-3 text-right">{formatCurrency(formData.prev_n_plus3_total)}</td>
//                             <td className="px-4 py-3 text-right text-orange-600">{formatCurrency(formData.prev_n_plus3_dont_dex)}</td>
//                         </tr>

//                         {/* Ligne: Prévision {anneeBase + 4} */}
//                         <tr className="hover:bg-gray-50">
//                             <td className="px-4 py-3 font-medium text-gray-700">Prévision {anneeBase + 4}</td>
//                             <td className="px-4 py-3 text-right">{formatCurrency(formData.prev_n_plus4_total)}</td>
//                             <td className="px-4 py-3 text-right text-orange-600">{formatCurrency(formData.prev_n_plus4_dont_dex)}</td>
//                         </tr>

//                         {/* Ligne: Prévision {anneeBase + 5} */}
//                         <tr className="hover:bg-gray-50">
//                             <td className="px-4 py-3 font-medium text-gray-700">Prévision {anneeBase + 5}</td>
//                             <td className="px-4 py-3 text-right">{formatCurrency(formData.prev_n_plus5_total)}</td>
//                             <td className="px-4 py-3 text-right text-orange-600">{formatCurrency(formData.prev_n_plus5_dont_dex)}</td>
//                         </tr>

//                         {/* Ligne: Sous-total pluriannuel */}
//                         <tr className="bg-blue-50">
//                             <td className="px-4 py-3 font-semibold text-gray-800">
//                                 rest a realiser  {anneeBase + 2} → {anneeBase + 5}
//                             </td>
//                             <td className="px-4 py-3 text-right font-bold text-blue-700">{formatCurrency(totalPrevisionsPluri())}</td>
//                             <td className="px-4 py-3 text-right font-bold text-orange-600">{formatCurrency(totalPrevisionsPluriDex())}</td>
//                         </tr>

//                         {/* Ligne: TOTAL GÉNÉRAL */}
//                         <tr className="bg-orange-100">
//                             <td className="px-4 py-3 font-bold text-gray-900 text-base">
//                               Coût Global Initial  {anneeBase + 1} → {anneeBase + 5}
//                                 {/* <p className="text-xs text-gray-500 font-normal mt-0.5">Coût Global Initial</p> */}
//                              </td>
//                             <td className="px-4 py-3 text-right font-bold text-xl text-orange-700">
//                                 {formatCurrency(coutGlobal())}
//                              </td>
//                             <td className="px-4 py-3 text-right font-bold text-lg text-orange-600">
//                                 {formatCurrency(
//                                     formData.type_projet === 'en_cours' 
//                                         ? (parseFloat(formData.cout_initial_dont_dex) || 0)
//                                         : totalPrevisionsPluriDex() + totalMensuelDex()
//                                 )}
//                              </td>
//                          </tr>
//                     </tbody>
//                  </table>
//             </div>
//         </div>

//         {/* Descriptions */}
//         {formData.description_technique && (
//             <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
//                 <h5 className="font-semibold text-gray-700 mb-2"> Description technique</h5>
//                 <p className="text-sm text-gray-600">{formData.description_technique}</p>
//             </div>
//         )}
//         {formData.opportunite_projet && (
//             <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
//                 <h5 className="font-semibold text-gray-700 mb-2"> Opportunité du projet</h5>
//                 <p className="text-sm text-gray-600">{formData.opportunite_projet}</p>
//             </div>
//         )}
//     </div>
// )}
//                 </div>

//                 {/* Pied de page */}
//                 <div className="border-t border-gray-100 px-6 py-4 bg-white flex justify-between items-center">
//                     <button
//                         onClick={currentStep === 1 ? onClose : prevStep}
//                         className="px-5 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition text-sm font-medium"
//                     >
//                         {currentStep === 1 ? 'Annuler' : '← Précédent'}
//                     </button>

//                     {currentStep < 4 ? (
//                         <button
//                             onClick={nextStep}
//                             className="px-6 py-2 bg-[#FF8500] text-white rounded-full hover:bg-[#e67800] transition text-sm font-medium shadow-md shadow-orange-200"
//                         >
//                             Suivant →
//                         </button>
//                     ) : (
//                         <button
//                             onClick={handleSubmit}
//                             disabled={loading}
//                             className="px-6 py-2 bg-[#FF8500] text-white rounded-full hover:bg-[#e67800] transition disabled:opacity-50 flex items-center gap-2 text-sm font-medium shadow-md shadow-orange-200"
//                         >
//                             {loading && (
//                                 <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
//                                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//                                 </svg>
//                             )}
//                             {loading ? 'Enregistrement...' : '✓ Créer le projet'}
//                         </button>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AjouterProjetModal;
import React, { useState, useEffect } from 'react';
// import { axiosInstance } from '../../../../axios';

// ============================================================
// LOGIQUE MÉTIER : Calcul des mois/années autorisés
// ============================================================
//
// Règles :
// - PMT = annee_debut_pmt → annee_fin_pmt (ex: 2027→2031)
// - Début projet = annee_debut_projet + mois_debut_projet (ex: 2027, Mai)
// - Durée réalisation = N mois (ex: 14 mois)
// - Fin projet calculée = début + durée - 1 mois
//
// Étape 2 (mois en détail) : UNIQUEMENT annee_debut_pmt
//   - Si annee_debut_pmt == annee_debut_projet → autoriser mois >= mois_debut_projet
//   - Sinon → tous les 12 mois autorisés (mais vérifier si dans la plage projet)
//
// Étape 3 (années globales) : annee_debut_pmt+1 → annee_fin_pmt
//   - Une année est autorisée si elle est dans [début_projet, fin_projet]
//   - L'année annee_debut_pmt est gérée en étape 2 uniquement
// ============================================================

const MOIS_LIST = [
    { key: 'janvier', label: 'Janvier', index: 1 },
    { key: 'fevrier', label: 'Février', index: 2 },
    { key: 'mars', label: 'Mars', index: 3 },
    { key: 'avril', label: 'Avril', index: 4 },
    { key: 'mai', label: 'Mai', index: 5 },
    { key: 'juin', label: 'Juin', index: 6 },
    { key: 'juillet', label: 'Juillet', index: 7 },
    { key: 'aout', label: 'Août', index: 8 },
    { key: 'septembre', label: 'Septembre', index: 9 },
    { key: 'octobre', label: 'Octobre', index: 10 },
    { key: 'novembre', label: 'Novembre', index: 11 },
    { key: 'decembre', label: 'Décembre', index: 12 },
];

const MOIS_LABELS = ['', 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

/**
 * Calcule la date de fin du projet (année + mois)
 * @param {number} anneeDebut - Année de début du projet
 * @param {number} moisDebut - Mois de début (1=Jan, 12=Dec)
 * @param {number} duree - Durée en mois
 * @returns {{ annee: number, mois: number }}
 */
const calcFinProjet = (anneeDebut, moisDebut, duree) => {
    if (!anneeDebut || !moisDebut || !duree) return null;
    const totalMois = (anneeDebut - 1) * 12 + moisDebut + duree - 1;
    const annee = Math.floor((totalMois - 1) / 12) + 1;
    const mois = ((totalMois - 1) % 12) + 1;
    return { annee, mois };
};

/**
 * Détermine si un mois d'une année donnée est dans la plage projet
 */
const isMoisDansPlageProjet = (annee, moisIndex, anneeDebProjet, moisDebProjet, finProjet) => {
    if (!finProjet) return false;
    const dateRef = annee * 12 + moisIndex;
    const dateDebut = anneeDebProjet * 12 + moisDebProjet;
    const dateFin = finProjet.annee * 12 + finProjet.mois;
    return dateRef >= dateDebut && dateRef <= dateFin;
};

/**
 * Pour l'étape 2 : détermine quels mois sont autorisés dans annee_debut_pmt
 * Retourne un objet { moisKey: boolean }
 */
const getMoisAutorises = (anneeDebPmt, anneeDebProjet, moisDebProjet, finProjet) => {
    const result = {};
    MOIS_LIST.forEach(m => {
        result[m.key] = isMoisDansPlageProjet(anneeDebPmt, m.index, anneeDebProjet, moisDebProjet, finProjet);
    });
    return result;
};

/**
 * Pour l'étape 3 : détermine si une année (annee_debut_pmt+1 à annee_fin_pmt) est autorisée
 */
const isAnneeAutorisee = (annee, anneeDebProjet, moisDebProjet, finProjet) => {
    if (!finProjet) return false;
    // L'année est dans la plage si au moins un mois de cette année est dans le projet
    // i.e. l'année chevauche [début_projet, fin_projet]
    const debutAnnee = annee * 12 + 1;      // janvier de l'année
    const finAnnee = annee * 12 + 12;        // décembre de l'année
    const debutProjet = anneeDebProjet * 12 + moisDebProjet;
    const finProjetTotal = finProjet.annee * 12 + finProjet.mois;
    return finAnnee >= debutProjet && debutAnnee <= finProjetTotal;
};

// ============================================================
// COMPOSANT PRINCIPAL
// ============================================================

const AjouterProjetModal = ({ isOpen, onClose, onSuccess, projet, axiosInstance: customAxiosInstance }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [regions, setRegions] = useState([]);
    const [perimetres, setPerimetres] = useState([]);
    const [familles, setFamilles] = useState([]);
    const [searchingCode, setSearchingCode] = useState(false);
    const [codeNotFound, setCodeNotFound] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [userRegionId, setUserRegionId] = useState(null);
    const [userRegionName, setUserRegionName] = useState(null);
    const [fieldErrors, setFieldErrors] = useState({});

    const [existingProjetInfo, setExistingProjetInfo] = useState({
        region_nom: '', region_code: '',
        perimetre_nom: '', perimetre_code: '',
        famille_nom: '', famille_code: '',
        activite_nom: '', activite_code: ''
    });

    // const axiosInst = customAxiosInstance || axiosInstance;
    const axiosInst = customAxiosInstance || { get: async () => ({ data: {} }), post: async () => ({ data: {} }) };

    const activites = [
        { code: 'PETROLE', nom: 'Pétrole' },
        { code: 'GAZ', nom: 'Gaz' },
        { code: 'PETROLE_GAZ', nom: 'Pétrole & Gaz' }
    ];

    const [formData, setFormData] = useState({
        type_projet: 'nouveau',
        code_division: '',
        libelle: '',
        region_id: '',
        perimetre: '',
        famille: '',
        activite: '',

        // PMT (plage globale du plan)
        annee_debut_pmt: new Date().getFullYear(),
        annee_fin_pmt: new Date().getFullYear() + 4,

        // Début et durée du PROJET (distinct du PMT)
        annee_debut_projet: new Date().getFullYear(),
        mois_debut_projet: 1,
        duree_realisation: '',

        description_technique: '',
        opportunite_projet: '',
        point_situation: '',

        // Financiers projet en cours
        cout_initial_total: '', cout_initial_dont_dex: '',
        realisation_cumul_n_mins1_total: '', realisation_cumul_n_mins1_dont_dex: '',
        real_s1_n_total: '', real_s1_n_dont_dex: '',
        prev_s2_n_total: '', prev_s2_n_dont_dex: '',
        prev_cloture_n_total: '', prev_cloture_n_dont_dex: '',
        prev_n_plus1_total: '', prev_n_plus1_dont_dex: '',
        reste_a_realiser_total: '', reste_a_realiser_dont_dex: '',
        prev_n_plus2_total: '', prev_n_plus2_dont_dex: '',
        prev_n_plus3_total: '', prev_n_plus3_dont_dex: '',
        prev_n_plus4_total: '', prev_n_plus4_dont_dex: '',
        prev_n_plus5_total: '', prev_n_plus5_dont_dex: '',

        // Mois détaillés (étape 2)
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
    });

    // ============================================================
    // CALCULS DÉRIVÉS : Fin projet + autorisations
    // ============================================================

    const finProjet = calcFinProjet(
        parseInt(formData.annee_debut_projet),
        parseInt(formData.mois_debut_projet),
        parseInt(formData.duree_realisation)
    );

    const anneeDebPmt = parseInt(formData.annee_debut_pmt) || new Date().getFullYear();
    const anneeFinPmt = parseInt(formData.annee_fin_pmt) || anneeDebPmt + 4;

    const moisAutorises = getMoisAutorises(
        anneeDebPmt,
        parseInt(formData.annee_debut_projet),
        parseInt(formData.mois_debut_projet),
        finProjet
    );

    // Années pour l'étape 3 : annee_debut_pmt+1 → annee_fin_pmt
    const anneesStep3 = [];
    for (let a = anneeDebPmt + 1; a <= anneeFinPmt; a++) {
        anneesStep3.push({
            annee: a,
            autorisee: isAnneeAutorisee(a, parseInt(formData.annee_debut_projet), parseInt(formData.mois_debut_projet), finProjet),
            totalKey: `prev_annee_${a}_total`,
            devKey: `prev_annee_${a}_dont_dex`,
        });
    }

    // Les keys dynamiques pour les années step3 (stockées dans formData)
    // On utilise les clés existantes: prev_n_plus2, prev_n_plus3, prev_n_plus4, prev_n_plus5
    // mappées sur anneeDebPmt+2, +3, +4, +5
    const anneesStep3Mapped = anneesStep3.map((item, idx) => ({
        ...item,
        totalKey: ['prev_n_plus2_total', 'prev_n_plus3_total', 'prev_n_plus4_total', 'prev_n_plus5_total'][idx] || `prev_extra_${idx}_total`,
        devKey: ['prev_n_plus2_dont_dex', 'prev_n_plus3_dont_dex', 'prev_n_plus4_dont_dex', 'prev_n_plus5_dont_dex'][idx] || `prev_extra_${idx}_dont_dex`,
    }));

    const anneeBase = anneeDebPmt - 1; // Pour compatibilité avec le code existant

    // ============================================================
    // EFFETS
    // ============================================================

    useEffect(() => {
        const role = localStorage.getItem('role');
        const regionId = localStorage.getItem('region_id');
        const regionName = localStorage.getItem('region_name');
        setUserRole(role);
        setUserRegionId(regionId);
        setUserRegionName(regionName);
    }, []);

    // annee_fin_pmt = annee_debut_pmt + 4
    useEffect(() => {
        if (formData.annee_debut_pmt) {
            const debut = parseInt(formData.annee_debut_pmt);
            if (!isNaN(debut)) {
                setFormData(prev => ({ ...prev, annee_fin_pmt: debut + 4 }));
            }
        }
    }, [formData.annee_debut_pmt]);

    // Calculs automatiques projet en cours
    useEffect(() => {
        if (formData.type_projet === 'en_cours') {
            const t = (parseFloat(formData.real_s1_n_total) || 0) + (parseFloat(formData.prev_s2_n_total) || 0);
            const d = (parseFloat(formData.real_s1_n_dont_dex) || 0) + (parseFloat(formData.prev_s2_n_dont_dex) || 0);
            setFormData(prev => ({ ...prev, prev_cloture_n_total: t.toString(), prev_cloture_n_dont_dex: d.toString() }));
        }
    }, [formData.real_s1_n_total, formData.real_s1_n_dont_dex, formData.prev_s2_n_total, formData.prev_s2_n_dont_dex]);

    useEffect(() => {
        if (formData.type_projet === 'en_cours') {
            const t = MOIS_LIST.reduce((s, m) => s + (parseFloat(formData[`${m.key}_total`]) || 0), 0);
            const d = MOIS_LIST.reduce((s, m) => s + (parseFloat(formData[`${m.key}_dont_dex`]) || 0), 0);
            setFormData(prev => ({ ...prev, prev_n_plus1_total: t.toString(), prev_n_plus1_dont_dex: d.toString() }));
        }
    }, [MOIS_LIST.map(m => formData[`${m.key}_total`] + formData[`${m.key}_dont_dex`]).join(',')]);

    useEffect(() => {
        if (formData.type_projet === 'en_cours') {
            const t = (parseFloat(formData.prev_n_plus2_total) || 0) + (parseFloat(formData.prev_n_plus3_total) || 0)
                + (parseFloat(formData.prev_n_plus4_total) || 0) + (parseFloat(formData.prev_n_plus5_total) || 0);
            const d = (parseFloat(formData.prev_n_plus2_dont_dex) || 0) + (parseFloat(formData.prev_n_plus3_dont_dex) || 0)
                + (parseFloat(formData.prev_n_plus4_dont_dex) || 0) + (parseFloat(formData.prev_n_plus5_dont_dex) || 0);
            setFormData(prev => ({ ...prev, reste_a_realiser_total: t.toString(), reste_a_realiser_dont_dex: d.toString() }));
        }
    }, [formData.prev_n_plus2_total, formData.prev_n_plus2_dont_dex, formData.prev_n_plus3_total, formData.prev_n_plus3_dont_dex,
        formData.prev_n_plus4_total, formData.prev_n_plus4_dont_dex, formData.prev_n_plus5_total, formData.prev_n_plus5_dont_dex]);

    useEffect(() => {
        if (formData.type_projet === 'en_cours') {
            const t = (parseFloat(formData.realisation_cumul_n_mins1_total) || 0) + (parseFloat(formData.prev_cloture_n_total) || 0)
                + (parseFloat(formData.prev_n_plus1_total) || 0) + (parseFloat(formData.reste_a_realiser_total) || 0);
            const d = (parseFloat(formData.realisation_cumul_n_mins1_dont_dex) || 0) + (parseFloat(formData.prev_cloture_n_dont_dex) || 0)
                + (parseFloat(formData.prev_n_plus1_dont_dex) || 0) + (parseFloat(formData.reste_a_realiser_dont_dex) || 0);
            setFormData(prev => ({ ...prev, cout_initial_total: t.toString(), cout_initial_dont_dex: d.toString() }));
        }
    }, [formData.realisation_cumul_n_mins1_total, formData.realisation_cumul_n_mins1_dont_dex,
        formData.prev_cloture_n_total, formData.prev_cloture_n_dont_dex,
        formData.prev_n_plus1_total, formData.prev_n_plus1_dont_dex,
        formData.reste_a_realiser_total, formData.reste_a_realiser_dont_dex]);

    // Remettre à zéro les mois non autorisés quand la plage change
    useEffect(() => {
        if (!finProjet) return;
        const updates = {};
        MOIS_LIST.forEach(m => {
            if (!moisAutorises[m.key]) {
                updates[`${m.key}_total`] = '';
                updates[`${m.key}_dont_dex`] = '';
            }
        });
        if (Object.keys(updates).length > 0) {
            setFormData(prev => ({ ...prev, ...updates }));
        }
    }, [formData.annee_debut_projet, formData.mois_debut_projet, formData.duree_realisation, formData.annee_debut_pmt]);

    // Remettre à zéro les années non autorisées
    useEffect(() => {
        if (!finProjet) return;
        const updates = {};
        anneesStep3Mapped.forEach(item => {
            if (!item.autorisee) {
                updates[item.totalKey] = '';
                updates[item.devKey] = '';
            }
        });
        if (Object.keys(updates).length > 0) {
            setFormData(prev => ({ ...prev, ...updates }));
        }
    }, [formData.annee_debut_projet, formData.mois_debut_projet, formData.duree_realisation]);

    // ============================================================
    // FONCTIONS API
    // ============================================================

    const fetchRegions = async () => {
        try {
            let allRegions = [];
            if (userRole === 'responsable_structure' && userRegionId) {
                // Responsable : récupérer SA région par ID et l'auto-sélectionner
                const response = await axiosInst.get(`/params/regions/id/${userRegionId}`);
                if (response.data && response.data.data) {
                    allRegions = [response.data.data];
                    const regionData = response.data.data;
                    // Auto-sélectionner la région dans le formulaire
                    setFormData(prev => ({ ...prev, region_id: regionData._id }));
                    if (!userRegionName && regionData.nom_region) {
                        setUserRegionName(regionData.nom_region);
                    }
                }
            } else {
                // Admin : toutes les régions
                const response = await axiosInst.get('/params/regions');
                allRegions = response.data.data || [];
            }
            setRegions(allRegions);
        } catch (err) {
            console.error("Erreur chargement régions:", err);
            setRegions([]);
        }
    };

    const fetchPerimetres = async () => {
        try {
            if (!formData.region_id) { setPerimetres([]); return; }
            const response = await axiosInst.get(`/params/perimetres/region/${formData.region_id}`);
            setPerimetres(response.data.data || []);
        } catch (err) {
            console.error("Erreur chargement périmètres:", err);
            setPerimetres([]);
        }
    };

    const fetchFamilles = async () => {
        try {
            if (!formData.region_id || !formData.perimetre) { setFamilles([]); return; }
            const response = await axiosInst.get(`/params/familles/`);
            setFamilles(response.data.data || []);
        } catch (err) {
            console.error("Erreur chargement familles:", err);
            setFamilles([]);
        }
    };

    const getRegionDetailsByCode = async (regionCode) => {
        try {
            const response = await axiosInst.get(`/params/regions/${regionCode}`);
            return response.data?.data || null;
        } catch (err) {
            console.error("Erreur récupération région:", err);
            return null;
        }
    };

    // Chargement initial des régions dès que userRole est connu
    useEffect(() => {
        if (userRole !== null) fetchRegions();
    }, [userRole, userRegionId]);

    // Chargement des périmètres quand la région change (nouveau projet uniquement)
    useEffect(() => {
        if (formData.region_id && formData.type_projet === 'nouveau') {
            fetchPerimetres();
            setFormData(prev => ({ ...prev, perimetre: '', famille: '' }));
            setFamilles([]);
        }
    }, [formData.region_id, formData.type_projet]);

    // Chargement des familles quand le périmètre change (nouveau projet uniquement)
    useEffect(() => {
        if (formData.perimetre && formData.region_id && formData.type_projet === 'nouveau') {
            fetchFamilles();
            setFormData(prev => ({ ...prev, famille: '' }));
        }
    }, [formData.perimetre, formData.region_id, formData.type_projet]);

    // Recherche automatique projet en cours (debounce 500ms)
    useEffect(() => {
        const timer = setTimeout(() => {
            if (formData.type_projet === 'en_cours' && formData.code_division && formData.code_division.length >= 3) {
                searchProjetByCode(formData.code_division);
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [formData.code_division, formData.type_projet]);

    const searchProjetByCode = async (codeDivision) => {
        setSearchingCode(true);
        setCodeNotFound(false);
        try {
            const response = await axiosInst.get(`/recap/budget/historique/${codeDivision}/actif/`);
            if (response.data && response.data.version_active) {
                const projetData = response.data.version_active;
                const regionCode = projetData.region || projetData.region_id || '';
                const perimetreCode = projetData.perimetre || projetData.perm || '';
                const familleCode = projetData.famille || '';
                const activiteCode = projetData.activite || '';

                if (userRole === 'responsable_structure' && userRegionId) {
                    const regionDetails = await getRegionDetailsByCode(regionCode);
                    if (regionDetails && regionDetails._id !== userRegionId) {
                        setError("Vous n'avez pas accès aux projets de cette région");
                        setCodeNotFound(true);
                        setSearchingCode(false);
                        return;
                    }
                }

                let regionNom = '', perimetreNom = '', familleNom = '', activiteNom = '';
                if (regionCode) {
                    const rd = await getRegionDetailsByCode(regionCode);
                    regionNom = rd?.nom_region || regionCode;
                }
                if (perimetreCode) {
                    const pf = perimetres.find(p => p.code_perimetre === perimetreCode);
                    perimetreNom = pf?.nom_perimetre || perimetreCode;
                }
                if (familleCode) {
                    const ff = familles.find(f => f.code_famille === familleCode);
                    familleNom = ff?.nom_famille || familleCode;
                }
                if (activiteCode) {
                    const af = [{ code: 'PETROLE', nom: 'Pétrole' }, { code: 'GAZ', nom: 'Gaz' }, { code: 'PETROLE_GAZ', nom: 'Pétrole & Gaz' }].find(a => a.code === activiteCode);
                    activiteNom = af?.nom || activiteCode;
                }

                setExistingProjetInfo({ region_nom: regionNom, region_code: regionCode, perimetre_nom: perimetreNom, perimetre_code: perimetreCode, famille_nom: familleNom, famille_code: familleCode, activite_nom: activiteNom, activite_code: activiteCode });

                setFormData(prev => ({
                    ...prev,
                    libelle: projetData.libelle || '',
                    region_id: regionCode,
                    perimetre: perimetreCode,
                    famille: familleCode,
                    activite: activiteCode,
                    annee_debut_pmt: projetData.annee_debut_pmt || new Date().getFullYear(),
                    annee_fin_pmt: projetData.annee_fin_pmt || new Date().getFullYear() + 4,
                    annee_debut_projet: projetData.annee_debut_projet || projetData.annee_debut_pmt || new Date().getFullYear(),
                    mois_debut_projet: projetData.mois_debut_projet || 1,
                    duree_realisation: projetData.duree_realisation || '',
                    description_technique: projetData.description_technique || '',
                    opportunite_projet: projetData.opportunite_projet || '',
                    point_situation: projetData.point_situation || '',
                    cout_initial_total: '', cout_initial_dont_dex: '',
                    realisation_cumul_n_mins1_total: '', realisation_cumul_n_mins1_dont_dex: '',
                    real_s1_n_total: '', real_s1_n_dont_dex: '',
                    prev_s2_n_total: '', prev_s2_n_dont_dex: '',
                    prev_cloture_n_total: '', prev_cloture_n_dont_dex: '',
                    prev_n_plus1_total: '', prev_n_plus1_dont_dex: '',
                    reste_a_realiser_total: '', reste_a_realiser_dont_dex: '',
                    prev_n_plus2_total: '', prev_n_plus2_dont_dex: '',
                    prev_n_plus3_total: '', prev_n_plus3_dont_dex: '',
                    prev_n_plus4_total: '', prev_n_plus4_dont_dex: '',
                    prev_n_plus5_total: '', prev_n_plus5_dont_dex: '',
                    ...Object.fromEntries(MOIS_LIST.flatMap(m => [[`${m.key}_total`, ''], [`${m.key}_dont_dex`, '']]))
                }));
                setCodeNotFound(false);
            } else {
                setCodeNotFound(true);
                setExistingProjetInfo({ region_nom: '', region_code: '', perimetre_nom: '', perimetre_code: '', famille_nom: '', famille_code: '', activite_nom: '', activite_code: '' });
            }
        } catch (err) {
            console.error("Erreur recherche projet:", err);
            setCodeNotFound(true);
        } finally {
            setSearchingCode(false);
        }
    };

    // ============================================================
    // HANDLERS
    // ============================================================

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'duree_realisation') {
            const v = value.replace(/[^0-9]/g, '').slice(0, 2);
            setFormData(prev => ({ ...prev, [name]: v }));
            return;
        }

        if (name.includes('_dont_dex')) {
            const totalField = name.replace('_dont_dex', '_total');
            const totalVal = parseFloat(formData[totalField]) || 0;
            const testVal = parseFloat(value);
            if (!isNaN(testVal) && totalVal > 0 && testVal > totalVal) {
                setFieldErrors(prev => ({ ...prev, [name]: `⛔ ${testVal} > ${totalVal}. "Dont Dev" ne peut pas dépasser le Total.` }));
                e.target.classList.add('shake');
                setTimeout(() => e.target.classList.remove('shake'), 500);
                return;
            } else {
                setFieldErrors(prev => { const n = { ...prev }; delete n[name]; return n; });
            }
        }

        setFormData(prev => ({ ...prev, [name]: value }));

        if (name.includes('_total')) {
            const devField = name.replace('_total', '_dont_dex');
            const devVal = parseFloat(formData[devField]);
            const newTotal = parseFloat(value);
            if (!isNaN(devVal) && !isNaN(newTotal) && devVal > newTotal) {
                setFieldErrors(prev => ({ ...prev, [devField]: `⚠️ "Dont Dev" (${devVal}) > "Total" (${newTotal})` }));
            } else {
                setFieldErrors(prev => { const n = { ...prev }; delete n[devField]; return n; });
            }
        }
    };

    const handleTypeProjetChange = (type) => {
        setFormData(prev => ({
            ...prev,
            type_projet: type,
            code_division: type === 'nouveau' ? '' : prev.code_division,
            region_id: type === 'nouveau' && userRole === 'responsable_structure' ? userRegionId : (type === 'nouveau' ? '' : prev.region_id),
            perimetre: type === 'nouveau' ? '' : prev.perimetre,
            famille: type === 'nouveau' ? '' : prev.famille,
        }));
        setCodeNotFound(false);
        setFieldErrors({});
        setExistingProjetInfo({ region_nom: '', region_code: '', perimetre_nom: '', perimetre_code: '', famille_nom: '', famille_code: '', activite_nom: '', activite_code: '' });
    };

    // ============================================================
    // VALIDATION
    // ============================================================

    const validateStep = () => {
        if (currentStep === 1) {
            if (!formData.libelle) { setError("Veuillez saisir le libellé"); return false; }
            if (!formData.code_division) { setError("Veuillez saisir le code division"); return false; }
            if (formData.type_projet === 'en_cours' && codeNotFound) { setError("Code division introuvable"); return false; }
            if (!formData.region_id) { setError("Veuillez sélectionner une région"); return false; }
            if (!formData.perimetre) { setError("Veuillez sélectionner un périmètre"); return false; }
            if (!formData.famille) { setError("Veuillez sélectionner une famille"); return false; }
            if (!formData.annee_debut_projet) { setError("Veuillez saisir l'année de début du projet"); return false; }
            if (!formData.mois_debut_projet) { setError("Veuillez sélectionner le mois de début du projet"); return false; }
            if (!formData.duree_realisation) { setError("Veuillez saisir la durée de réalisation"); return false; }
            const dur = parseInt(formData.duree_realisation);
            if (isNaN(dur) || dur < 1 || dur > 99) { setError("La durée doit être entre 1 et 99 mois"); return false; }

            // Vérifier cohérence avec PMT
            const debProjet = parseInt(formData.annee_debut_projet);
            if (debProjet < anneeDebPmt || debProjet > anneeFinPmt) {
                setError(`L'année de début du projet (${debProjet}) doit être dans la plage PMT (${anneeDebPmt}→${anneeFinPmt})`);
                return false;
            }
        }
        if (currentStep === 2) {
            if (Object.keys(fieldErrors).length > 0) {
                setError("Veuillez corriger les erreurs de validation avant de continuer.");
                return false;
            }
        }
        setError('');
        return true;
    };

    const nextStep = () => { if (validateStep()) { setCurrentStep(s => s + 1); setError(''); } };
    const prevStep = () => { setCurrentStep(s => s - 1); setError(''); };

    // ============================================================
    // UTILITAIRES
    // ============================================================

    const formatCurrency = (value) => {
        if (!value && value !== 0) return '0 DA';
        const num = parseFloat(value);
        if (isNaN(num)) return '0 DA';
        return new Intl.NumberFormat('fr-DZ').format(num) + ' DA';
    };

    const totalMensuel = () => MOIS_LIST.reduce((s, m) => s + (parseFloat(formData[`${m.key}_total`]) || 0), 0);
    const totalMensuelDex = () => MOIS_LIST.reduce((s, m) => s + (parseFloat(formData[`${m.key}_dont_dex`]) || 0), 0);

    const totalPrevisionsPluri = () => anneesStep3Mapped.reduce((s, item) => s + (parseFloat(formData[item.totalKey]) || 0), 0);
    const totalPrevisionsPluriDex = () => anneesStep3Mapped.reduce((s, item) => s + (parseFloat(formData[item.devKey]) || 0), 0);

    const coutGlobal = () => {
        if (formData.type_projet === 'en_cours') return parseFloat(formData.cout_initial_total) || 0;
        return totalPrevisionsPluri() + totalMensuel();
    };

    const STEPS = [
        'Identification',
        `Prévisions ${anneeDebPmt}`,
        `Prévisions ${anneeDebPmt + 1}→${anneeFinPmt}`,
        'Récapitulatif'
    ];

    // ============================================================
    // HANDLESUBMIT (stub - connecter à l'API réelle)
    // ============================================================

    const handleSubmit = async () => {
        if (!validateStep()) return;
        if (Object.keys(fieldErrors).length > 0) {
            setError("❌ Veuillez corriger les erreurs de validation avant de soumettre.");
            return;
        }
        setLoading(true);
        setError('');

        const toFloat = (val) => { const n = parseFloat(val); return isNaN(n) ? 0 : n; };

        let regionCode = formData.region_id;
        if (formData.region_id && regions.length > 0 && formData.type_projet === 'nouveau') {
            const sel = regions.find(r => r._id === formData.region_id);
            if (sel) regionCode = sel.code_region;
        }

        const payload = {
            activite: formData.activite || "PETROLE",
            perimetre: formData.perimetre,
            famille: formData.famille,
            code_division: formData.code_division,
            libelle: formData.libelle,
            type_projet: formData.type_projet,
            annee_debut_pmt: parseInt(formData.annee_debut_pmt),
            annee_fin_pmt: parseInt(formData.annee_fin_pmt),
            annee_debut_projet: parseInt(formData.annee_debut_projet),
            mois_debut_projet: parseInt(formData.mois_debut_projet),
            duree_realisation: parseInt(formData.duree_realisation),
            fin_projet: finProjet,
            intervalle_pmt: [parseInt(formData.annee_debut_pmt), parseInt(formData.annee_fin_pmt)],
            description_technique: formData.description_technique,
            opportunite_projet: formData.opportunite_projet,
            point_situation: formData.point_situation,
            region: regionCode,

            // Mois (étape 2) - uniquement les mois autorisés
            ...Object.fromEntries(MOIS_LIST.flatMap(m => [
                [`${m.key}_total`, moisAutorises[m.key] ? toFloat(formData[`${m.key}_total`]) : 0],
                [`${m.key}_dont_dex`, moisAutorises[m.key] ? toFloat(formData[`${m.key}_dont_dex`]) : 0],
            ])),

            // Années (étape 3) - uniquement les années autorisées
            ...Object.fromEntries(anneesStep3Mapped.flatMap(item => [
                [item.totalKey, item.autorisee ? toFloat(formData[item.totalKey]) : 0],
                [item.devKey, item.autorisee ? toFloat(formData[item.devKey]) : 0],
            ])),

            // Champs projet en cours
            cout_initial_total: toFloat(formData.cout_initial_total),
            cout_initial_dont_dex: toFloat(formData.cout_initial_dont_dex),
            realisation_cumul_n_mins1_total: toFloat(formData.realisation_cumul_n_mins1_total),
            realisation_cumul_n_mins1_dont_dex: toFloat(formData.realisation_cumul_n_mins1_dont_dex),
            real_s1_n_total: toFloat(formData.real_s1_n_total),
            real_s1_n_dont_dex: toFloat(formData.real_s1_n_dont_dex),
            prev_s2_n_total: toFloat(formData.prev_s2_n_total),
            prev_s2_n_dont_dex: toFloat(formData.prev_s2_n_dont_dex),
            prev_cloture_n_total: toFloat(formData.prev_cloture_n_total),
            prev_cloture_n_dont_dex: toFloat(formData.prev_cloture_n_dont_dex),
            prev_n_plus1_total: toFloat(formData.prev_n_plus1_total),
            prev_n_plus1_dont_dex: toFloat(formData.prev_n_plus1_dont_dex),
            reste_a_realiser_total: toFloat(formData.reste_a_realiser_total),
            reste_a_realiser_dont_dex: toFloat(formData.reste_a_realiser_dont_dex),
        };

        try {
            let response;
            if (formData.type_projet === 'nouveau') {
                response = await axiosInst.post('/recap/budget/nouveau-projet/', payload);
            } else {
                response = await axiosInst.post(`/recap/budget/responsable/modifier-projet/${formData.code_division}/`, payload);
            }
            if (response.data.success || response.data.status === 'success') {
                onSuccess && onSuccess(projet ? 'Projet modifié avec succès' : 'Projet créé avec succès');
                onClose && onClose();
            }
        } catch (err) {
            const errData = err.response?.data;
            if (errData?.errors) setError(Object.values(errData.errors).join('\n'));
            else setError(errData?.error || errData?.message || "Erreur lors de l'enregistrement");
        } finally {
            setLoading(false);
        }
    };

    const shakeAnimation = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        .shake { animation: shake 0.3s ease-in-out; border-color: #ef4444 !important; background-color: #fef2f2 !important; }
    `;

    if (!isOpen) return null;

    // ============================================================
    // RENDU : Indicateur de plage autorisée
    // ============================================================

    const renderInfoPlage = () => {
        if (!finProjet) return null;
        return (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-start gap-2">
                <span className="text-lg">📐</span>
                <div className="text-sm text-blue-800">
                    <strong>Plage de réalisation calculée :</strong>{' '}
                    {MOIS_LABELS[parseInt(formData.mois_debut_projet)]} {formData.annee_debut_projet}
                    {' '} → {' '}
                    {MOIS_LABELS[finProjet.mois]} {finProjet.annee}
                    <br />
                    <span className="text-blue-600 text-xs">
                        Seules les périodes incluses dans cette plage peuvent être remplies.
                    </span>
                </div>
            </div>
        );
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <style>{shakeAnimation}</style>
            <div className="w-[950px] max-h-[92vh] flex flex-col bg-white shadow-2xl rounded-2xl overflow-hidden">

                {/* EN-TÊTE */}
                <div className="px-6 pt-5 pb-4 border-b border-gray-100 bg-white">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">{projet ? 'Modifier le Projet' : 'Nouveau Projet'}</h2>
                            {userRole === 'responsable_structure' && userRegionName && formData.type_projet === 'nouveau' && (
                                <p className="text-sm text-blue-600 font-medium mt-1">📍 Région : <strong>{userRegionName}</strong></p>
                            )}
                        </div>
                        <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-full">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M18 6L6 18M6 6L18 18" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>
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
                                        <span className={`text-[10px] mt-0.5 whitespace-nowrap ${active ? 'text-orange-500 font-semibold' : 'text-gray-400'}`}>{label}</span>
                                    </div>
                                    {idx < STEPS.length - 1 && (
                                        <div className={`flex-1 h-0.5 mx-1 mb-3 transition-all ${done ? 'bg-green-400' : 'bg-gray-200'}`} />
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>

                {/* CORPS */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl whitespace-pre-line">{error}</div>
                    )}

                    {/* ========== ÉTAPE 1 : Identification ========== */}
                    {currentStep === 1 && (
                        <div className="space-y-4">
                            {/* Type projet */}
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { val: 'nouveau', label: 'Nouveau projet', sub: 'Créer à partir de zéro', icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6' },
                                    { val: 'en_cours', label: 'Projet en cours', sub: 'Reprendre existant', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' }
                                ].map(t => (
                                    <div key={t.val} onClick={() => handleTypeProjetChange(t.val)}
                                        className={`cursor-pointer rounded-xl p-4 border-2 transition-all ${formData.type_projet === t.val ? 'border-orange-400 bg-orange-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${formData.type_projet === t.val ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={t.icon} />
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 className={`font-semibold ${formData.type_projet === t.val ? 'text-orange-600' : 'text-gray-800'}`}>{t.label}</h4>
                                                <p className="text-xs text-gray-500">{t.sub}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Code division */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">N°:Cpte Analytique <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <input type="text" name="code_division" value={formData.code_division} onChange={handleInputChange}
                                        placeholder={formData.type_projet === 'en_cours' ? "Rechercher par code..." : "ex: PROJ-2024-001"}
                                        className={`w-full h-10 px-3 rounded-[20px] border outline-none focus:border-orange-400 ${codeNotFound && formData.type_projet === 'en_cours' ? 'border-red-400 bg-red-50' : 'border-gray-300'}`} />
                                    {searchingCode && <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                        <svg className="animate-spin h-4 w-4 text-orange-500" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                    </div>}
                                </div>
                                {codeNotFound && formData.type_projet === 'en_cours' && <p className="text-xs text-red-500 mt-1">Code division introuvable</p>}
                                {!codeNotFound && formData.type_projet === 'en_cours' && formData.code_division && !searchingCode && <p className="text-xs text-green-600 mt-1">✓ Projet trouvé</p>}
                            </div>

                            {/* Libellé */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Libellé du projet</label>
                                <input type="text" name="libelle" value={formData.libelle} onChange={handleInputChange}
                                    className="w-full h-10 px-3 rounded-[20px] border border-gray-300 outline-none focus:border-orange-400" placeholder="Nom du projet" />
                            </div>

                            {/* Période PMT */}
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
                                <label className="block text-sm font-bold text-blue-700 mb-2">📅 Période PMT (Plan à Moyen Terme)</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-gray-500 block mb-1">Année début PMT</label>
                                        <input type="number" name="annee_debut_pmt" value={formData.annee_debut_pmt} onChange={handleInputChange}
                                            className="w-full h-10 px-3 rounded-[20px] border border-blue-200 outline-none focus:border-orange-400" />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 block mb-1">Année fin PMT</label>
                                        <input type="number" name="annee_fin_pmt" value={formData.annee_fin_pmt} readOnly
                                            className="w-full h-10 px-3 rounded-[20px] border border-blue-200 bg-gray-50 text-gray-500" />
                                        <p className="text-xs text-gray-400 mt-1">Auto-calculé: début + 4</p>
                                    </div>
                                </div>
                            </div>

                            {/* Début du PROJET + Durée */}
                            <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-4">
                                <label className="block text-sm font-bold text-orange-700 mb-3">🏗️ Début & Durée du Projet</label>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="text-xs text-gray-600 block mb-1">Année début projet <span className="text-red-500">*</span></label>
                                        <input type="number" name="annee_debut_projet" value={formData.annee_debut_projet} onChange={handleInputChange}
                                            min={anneeDebPmt} max={anneeFinPmt}
                                            className="w-full h-10 px-3 rounded-[20px] border border-orange-200 outline-none focus:border-orange-400" />
                                        <p className="text-xs text-gray-400 mt-1">Dans le PMT : {anneeDebPmt}→{anneeFinPmt}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-600 block mb-1">Mois début projet <span className="text-red-500">*</span></label>
                                        <select name="mois_debut_projet" value={formData.mois_debut_projet} onChange={handleInputChange}
                                            className="w-full h-10 px-3 rounded-[20px] border border-orange-200 outline-none focus:border-orange-400">
                                            {MOIS_LIST.map(m => <option key={m.key} value={m.index}>{m.label}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-600 block mb-1">Durée réalisation <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <input type="text" name="duree_realisation" value={formData.duree_realisation} onChange={handleInputChange}
                                                placeholder="Ex: 14" maxLength="2"
                                                className="w-full h-10 px-3 pr-12 rounded-[20px] border border-orange-200 outline-none focus:border-orange-400" />
                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">mois</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Résumé calculé */}
                                {finProjet && (
                                    <div className="mt-3 pt-3 border-t border-orange-200">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="text-xs text-orange-700 font-medium">📐 Plage projet :</span>
                                            <span className="bg-orange-100 text-orange-800 text-xs px-3 py-1 rounded-full font-bold">
                                                {MOIS_LABELS[parseInt(formData.mois_debut_projet)]} {formData.annee_debut_projet}
                                                {' → '}
                                                {MOIS_LABELS[finProjet.mois]} {finProjet.annee}
                                            </span>
                                            <span className="text-xs text-gray-500">({formData.duree_realisation} mois)</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Localisation */}
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Région</label>
                                    {formData.type_projet === 'en_cours' && !codeNotFound && formData.region_id ? (
                                        <select value={formData.region_id} disabled className="w-full h-10 px-3 rounded-[20px] bg-gray-100 border border-gray-300 cursor-not-allowed">
                                            <option value={existingProjetInfo.region_code}>{existingProjetInfo.region_nom}</option>
                                        </select>
                                    ) : (
                                        <select name="region_id" value={formData.region_id} onChange={handleInputChange}
                                            disabled={userRole === 'responsable_structure'}
                                            className={`w-full h-10 px-3 rounded-[20px] border border-gray-300 outline-none focus:border-orange-400 ${userRole === 'responsable_structure' ? 'bg-gray-100 cursor-not-allowed' : ''}`}>
                                            <option value="">Sélectionner</option>
                                            {regions.map(r => <option key={r._id} value={r._id}>{r.nom_region}</option>)}
                                        </select>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Périmètre</label>
                                    {formData.type_projet === 'en_cours' && !codeNotFound && formData.perimetre ? (
                                        <select value={formData.perimetre} disabled className="w-full h-10 px-3 rounded-[20px] bg-gray-100 border border-gray-300 cursor-not-allowed">
                                            <option value={existingProjetInfo.perimetre_code}>{existingProjetInfo.perimetre_nom}</option>
                                        </select>
                                    ) : (
                                        <select name="perimetre" value={formData.perimetre} onChange={handleInputChange}
                                            disabled={!formData.region_id}
                                            className={`w-full h-10 px-3 rounded-[20px] border border-gray-300 outline-none focus:border-orange-400 ${!formData.region_id ? 'bg-gray-100 cursor-not-allowed' : ''}`}>
                                            <option value="">Sélectionner</option>
                                            {perimetres.map(p => <option key={p.code_perimetre} value={p.code_perimetre}>{p.nom_perimetre}</option>)}
                                        </select>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Famille</label>
                                    {formData.type_projet === 'en_cours' && !codeNotFound && formData.famille ? (
                                        <select value={formData.famille} disabled className="w-full h-10 px-3 rounded-[20px] bg-gray-100 border border-gray-300 cursor-not-allowed">
                                            <option value={existingProjetInfo.famille_code}>{existingProjetInfo.famille_nom}</option>
                                        </select>
                                    ) : (
                                        <select name="famille" value={formData.famille} onChange={handleInputChange}
                                            disabled={!formData.perimetre}
                                            className={`w-full h-10 px-3 rounded-[20px] border border-gray-300 outline-none focus:border-orange-400 ${!formData.perimetre ? 'bg-gray-100 cursor-not-allowed' : ''}`}>
                                            <option value="">Sélectionner</option>
                                            {familles.map(f => <option key={f.code_famille} value={f.code_famille}>{f.nom_famille}</option>)}
                                        </select>
                                    )}
                                </div>
                            </div>

                            {/* Activité */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Activité</label>
                                {formData.type_projet === 'en_cours' && !codeNotFound && existingProjetInfo.activite_code ? (
                                    <select value={existingProjetInfo.activite_code} disabled className="w-full h-10 px-3 rounded-[20px] bg-gray-100 border border-gray-300 cursor-not-allowed">
                                        <option value={existingProjetInfo.activite_code}>{existingProjetInfo.activite_nom}</option>
                                    </select>
                                ) : (
                                    <select name="activite" value={formData.activite} onChange={handleInputChange}
                                        className="w-full h-10 px-3 rounded-[20px] border border-gray-300 outline-none focus:border-orange-400">
                                        <option value="">Sélectionner</option>
                                        {activites.map(a => <option key={a.code} value={a.code}>{a.nom}</option>)}
                                    </select>
                                )}
                            </div>

                            {/* Description + Opportunité + Point situation */}
                            {[
                                { name: 'description_technique', label: 'Description technique', placeholder: 'Description du projet...' },
                                { name: 'opportunite_projet', label: 'Opportunité du projet', placeholder: 'Opportunité stratégique...' },
                                { name: 'point_situation', label: 'Point de situation', placeholder: 'État d\'avancement, jalons, difficultés...' },
                            ].map(f => (
                                <div key={f.name}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                                    <textarea name={f.name} value={formData[f.name]} onChange={handleInputChange} rows="2"
                                        className="w-full px-3 py-2 rounded-2xl border border-gray-300 outline-none resize-none focus:border-orange-400"
                                        placeholder={f.placeholder} />
                                </div>
                            ))}

                            {/* Réalisations (projet en cours) */}
                            {formData.type_projet === 'en_cours' && (
                                <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            { name: 'realisation_cumul_n_mins1_total', label: `Réalisations Cumulées fin ${anneeBase - 1} (Total)` },
                                            { name: 'realisation_cumul_n_mins1_dont_dex', label: `Réalisations Cumulées fin ${anneeBase - 1} (Dont Dev)` },
                                        ].map(f => (
                                            <div key={f.name}>
                                                <label className="text-xs text-gray-600 block mb-1">{f.label}</label>
                                                <input type="number" name={f.name} value={formData[f.name]} onChange={handleInputChange} step="any"
                                                    className={`w-full h-10 px-3 rounded-[20px] border outline-none focus:border-orange-400 ${fieldErrors[f.name] ? 'border-red-500 bg-red-50' : 'border-purple-200'}`} />
                                                {fieldErrors[f.name] && <p className="text-xs text-red-500 mt-1">{fieldErrors[f.name]}</p>}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="border-t border-purple-200 pt-3">
                                        <p className="text-sm font-semibold text-purple-700 mb-2">Prévisions de clôture {anneeBase}</p>
                                        <div className="grid grid-cols-2 gap-4">
                                            {[
                                                { name: 'real_s1_n_total', label: 'Réalisation S1 (Total)' },
                                                { name: 'real_s1_n_dont_dex', label: 'Réalisation S1 (Dont Dev)' },
                                                { name: 'prev_s2_n_total', label: 'Prévision S2 (Total)' },
                                                { name: 'prev_s2_n_dont_dex', label: 'Prévision S2 (Dont Dev)' },
                                            ].map(f => (
                                                <div key={f.name}>
                                                    <label className="text-xs text-gray-600 block mb-1">{f.label}</label>
                                                    <input type="number" name={f.name} value={formData[f.name]} onChange={handleInputChange} step="any"
                                                        className={`w-full h-10 px-3 rounded-[20px] border outline-none focus:border-orange-400 ${fieldErrors[f.name] ? 'border-red-500 bg-red-50' : 'border-purple-200'}`} />
                                                    {fieldErrors[f.name] && <p className="text-xs text-red-500 mt-1">{fieldErrors[f.name]}</p>}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 mt-3 bg-white rounded-lg p-3 border border-purple-200">
                                            <div>
                                                <label className="text-xs text-purple-700 font-medium">Clôture {anneeBase} (Total)</label>
                                                <input type="text" value={formatCurrency(formData.prev_cloture_n_total)} readOnly className="w-full h-10 px-3 rounded-[20px] bg-purple-100 text-purple-800 font-semibold" />
                                                <p className="text-xs text-gray-400 mt-1">(S1 + S2)</p>
                                            </div>
                                            <div>
                                                <label className="text-xs text-purple-700 font-medium">Clôture {anneeBase} (Dont Dev)</label>
                                                <input type="text" value={formatCurrency(formData.prev_cloture_n_dont_dex)} readOnly className="w-full h-10 px-3 rounded-[20px] bg-purple-100 text-purple-800 font-semibold" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* ========== ÉTAPE 2 : Mois détaillés pour annee_debut_pmt ========== */}
                    {currentStep === 2 && (
                        <div className="space-y-3">
                            <div className="flex items-center justify-between flex-wrap gap-2">
                                <p className="text-sm text-gray-600">
                                    📊 Répartition mensuelle — Année <strong className="text-orange-600">{anneeDebPmt}</strong>
                                </p>
                                <div className="bg-amber-100 border border-amber-300 px-4 py-1.5 rounded-full">
                                    <span className="text-sm font-bold text-amber-800">Total : {formatCurrency(totalMensuel())}</span>
                                </div>
                            </div>

                            {renderInfoPlage()}

                            {/* Légende */}
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-green-400 inline-block"></span> Mois autorisé (dans la plage projet)</span>
                                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-gray-300 inline-block"></span> Mois non autorisé (hors plage)</span>
                            </div>

                            {/* Liste des mois en colonnes */}
                            <div className="flex flex-col gap-2">
                                {MOIS_LIST.map(mois => {
                                    const autorise = moisAutorises[mois.key];
                                    const devError = fieldErrors[`${mois.key}_dont_dex`];
                                    return (
                                        <div key={mois.key}
                                            className={`border rounded-xl p-3 transition-all ${autorise
                                                ? 'bg-white border-gray-200 hover:shadow-md'
                                                : 'bg-gray-50 border-gray-100 opacity-60'}`}>
                                            <div className="flex items-center gap-4">
                                                {/* Indicateur + Nom du mois */}
                                                <div className="flex items-center gap-2 w-36">
                                                    <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${autorise ? 'bg-green-400' : 'bg-gray-300'}`}></span>
                                                    <span className={`text-sm font-semibold ${autorise ? 'text-gray-800' : 'text-gray-400'}`}>{mois.label}</span>
                                                    {!autorise && <span className="text-xs text-gray-400 italic">Hors plage</span>}
                                                </div>

                                                {/* Champ Total */}
                                                <div className="flex-1">
                                                    <label className="text-xs text-gray-500 block mb-0.5">Total (DA)</label>
                                                    <input type="number"
                                                        name={`${mois.key}_total`}
                                                        value={formData[`${mois.key}_total`] || ''}
                                                        onChange={handleInputChange}
                                                        disabled={!autorise}
                                                        placeholder={autorise ? "0" : "—"}
                                                        className={`w-full h-9 px-3 rounded-[20px] border text-sm outline-none transition-all
                                                            ${autorise
                                                                ? 'border-gray-200 focus:border-orange-400 bg-white'
                                                                : 'border-gray-100 bg-gray-100 cursor-not-allowed text-gray-300'}`}
                                                        step="any" />
                                                </div>

                                                {/* Champ Dont Dev */}
                                                <div className="flex-1">
                                                    <label className="text-xs text-gray-500 block mb-0.5">Dont Dev (DA)</label>
                                                    <input type="number"
                                                        name={`${mois.key}_dont_dex`}
                                                        value={formData[`${mois.key}_dont_dex`] || ''}
                                                        onChange={handleInputChange}
                                                        disabled={!autorise}
                                                        placeholder={autorise ? "0" : "—"}
                                                        className={`w-full h-9 px-3 rounded-[20px] border text-sm outline-none transition-all
                                                            ${!autorise
                                                                ? 'border-gray-100 bg-gray-100 cursor-not-allowed text-gray-300'
                                                                : devError
                                                                    ? 'border-red-500 bg-red-50'
                                                                    : 'border-gray-200 focus:border-orange-400 bg-white'}`}
                                                        step="any" />
                                                    {devError && <p className="text-xs text-red-500 mt-0.5">{devError}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Total récap */}
                            <div className="bg-green-50 border border-green-200 rounded-xl p-4 grid grid-cols-2 gap-4">
                                <div className="text-center">
                                    <span className="text-xs text-green-600">Total Annuel {anneeDebPmt}</span>
                                    <p className="text-lg font-bold text-green-700">{formatCurrency(totalMensuel())}</p>
                                </div>
                                <div className="text-center">
                                    <span className="text-xs text-green-600">Total Dev {anneeDebPmt}</span>
                                    <p className="text-lg font-bold text-green-700">{formatCurrency(totalMensuelDex())}</p>
                                </div>
                            </div>

                            {formData.type_projet === 'en_cours' && (
                                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-blue-700">Prévision {anneeDebPmt} (Total)</label>
                                        <input type="text" value={formatCurrency(formData.prev_n_plus1_total)} readOnly className="w-full h-10 px-3 rounded-[20px] bg-blue-100 text-blue-800 font-semibold" />
                                        <p className="text-xs text-gray-400 mt-1">(Somme des mois)</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-blue-700">Prévision {anneeDebPmt} (Dont Dev)</label>
                                        <input type="text" value={formatCurrency(formData.prev_n_plus1_dont_dex)} readOnly className="w-full h-10 px-3 rounded-[20px] bg-blue-100 text-blue-800 font-semibold" />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* ========== ÉTAPE 3 : Années globales annee_debut_pmt+1 → annee_fin_pmt ========== */}
                    {currentStep === 3 && (
                        <div className="space-y-3">
                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex justify-between items-center">
                                <span className="font-semibold text-amber-800">Total prévisions ({anneeDebPmt + 1} → {anneeFinPmt})</span>
                                <div className="text-right">
                                    <span className="text-xl font-bold text-amber-900">{formatCurrency(totalPrevisionsPluri())}</span>
                                    <p className="text-xs text-amber-600">Dont Dev: {formatCurrency(totalPrevisionsPluriDex())}</p>
                                </div>
                            </div>

                            {renderInfoPlage()}

                            {/* Légende */}
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-green-400 inline-block"></span> Année autorisée (dans la plage projet)</span>
                                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-gray-300 inline-block"></span> Année non autorisée</span>
                            </div>

                            {anneesStep3Mapped.length === 0 && (
                                <div className="text-center py-8 text-gray-500">
                                    <p>Aucune année supplémentaire dans cette plage PMT.</p>
                                </div>
                            )}

                            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                                {anneesStep3Mapped.map((item, idx) => {
                                    const devError = fieldErrors[item.devKey];
                                    return (
                                        <div key={item.annee}
                                            className={`p-4 border-b border-gray-100 last:border-0 transition-all ${item.autorisee ? 'bg-white' : 'bg-gray-50 opacity-60'}`}>
                                            <div className="flex items-center gap-4">
                                                {/* Indicateur + Année */}
                                                <div className="flex items-center gap-2 w-36">
                                                    <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${item.autorisee ? 'bg-green-400' : 'bg-gray-300'}`}></span>
                                                    <div>
                                                        <span className={`text-sm font-bold ${item.autorisee ? 'text-gray-800' : 'text-gray-400'}`}>{item.annee}</span>
                                                        {!item.autorisee && <p className="text-xs text-gray-400 italic">Hors plage</p>}
                                                        {item.autorisee && <p className="text-xs text-green-600">12 mois</p>}
                                                    </div>
                                                </div>

                                                {/* Total */}
                                                <div className="flex-1">
                                                    <label className="text-xs text-gray-500 block mb-0.5">Total (DA)</label>
                                                    <input type="number"
                                                        name={item.totalKey}
                                                        value={formData[item.totalKey] || ''}
                                                        onChange={handleInputChange}
                                                        disabled={!item.autorisee}
                                                        placeholder={item.autorisee ? "0" : "—"}
                                                        className={`w-full h-9 px-3 rounded-[20px] border text-sm outline-none transition-all
                                                            ${item.autorisee
                                                                ? 'border-gray-200 focus:border-orange-400 bg-white'
                                                                : 'border-gray-100 bg-gray-100 cursor-not-allowed text-gray-300'}`}
                                                        step="any" />
                                                </div>

                                                {/* Dont Dev */}
                                                <div className="flex-1">
                                                    <label className="text-xs text-gray-500 block mb-0.5">Dont Dev (DA)</label>
                                                    <input type="number"
                                                        name={item.devKey}
                                                        value={formData[item.devKey] || ''}
                                                        onChange={handleInputChange}
                                                        disabled={!item.autorisee}
                                                        placeholder={item.autorisee ? "0" : "—"}
                                                        className={`w-full h-9 px-3 rounded-[20px] border text-sm outline-none transition-all
                                                            ${!item.autorisee
                                                                ? 'border-gray-100 bg-gray-100 cursor-not-allowed text-gray-300'
                                                                : devError
                                                                    ? 'border-red-500 bg-red-50'
                                                                    : 'border-gray-200 focus:border-orange-400 bg-white'}`}
                                                        step="any" />
                                                    {devError && <p className="text-xs text-red-500 mt-0.5">{devError}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {formData.type_projet === 'en_cours' && (
                                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-indigo-700">Reste à Réaliser (Total)</label>
                                        <input type="text" value={formatCurrency(formData.reste_a_realiser_total)} readOnly className="w-full h-10 px-3 rounded-[20px] bg-indigo-100 text-indigo-800 font-semibold" />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-indigo-700">Reste à Réaliser (Dont Dev)</label>
                                        <input type="text" value={formatCurrency(formData.reste_a_realiser_dont_dex)} readOnly className="w-full h-10 px-3 rounded-[20px] bg-indigo-100 text-indigo-800 font-semibold" />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* ========== ÉTAPE 4 : Récapitulatif ========== */}
                    {currentStep === 4 && (
                        <div className="space-y-4">
                            {/* Plage calculée */}
                            <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-4">
                                <h4 className="font-semibold text-orange-800 mb-2">📐 Plage de réalisation</h4>
                                <div className="flex flex-wrap gap-4">
                                    <div>
                                        <p className="text-xs text-gray-500">Début projet</p>
                                        <p className="font-bold text-gray-800">{MOIS_LABELS[parseInt(formData.mois_debut_projet)]} {formData.annee_debut_projet}</p>
                                    </div>
                                    {finProjet && <div>
                                        <p className="text-xs text-gray-500">Fin projet</p>
                                        <p className="font-bold text-gray-800">{MOIS_LABELS[finProjet.mois]} {finProjet.annee}</p>
                                    </div>}
                                    <div>
                                        <p className="text-xs text-gray-500">Durée</p>
                                        <p className="font-bold text-gray-800">{formData.duree_realisation} mois</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">PMT</p>
                                        <p className="font-bold text-gray-800">{anneeDebPmt} → {anneeFinPmt}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Cartes */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200">
                                    <p className="text-xs text-emerald-600 font-medium">Coût Global</p>
                                    <p className="text-2xl font-bold text-emerald-700 mt-1">{formatCurrency(coutGlobal())}</p>
                                </div>
                                <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200">
                                    <p className="text-xs text-amber-600 font-medium">Prévisions {anneeDebPmt}</p>
                                    <p className="text-lg font-bold text-amber-700 mt-1">{formatCurrency(totalMensuel())}</p>
                                    <p className="text-xs text-amber-600">Dont Dev: {formatCurrency(totalMensuelDex())}</p>
                                </div>
                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                                    <p className="text-xs text-blue-600 font-medium">Prévisions {anneeDebPmt + 1}→{anneeFinPmt}</p>
                                    <p className="text-lg font-bold text-blue-700 mt-1">{formatCurrency(totalPrevisionsPluri())}</p>
                                    <p className="text-xs text-blue-600">Dont Dev: {formatCurrency(totalPrevisionsPluriDex())}</p>
                                </div>
                            </div>

                            {/* Tableau */}
                            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                                    <h4 className="font-semibold text-gray-700">Détail des prévisions</h4>
                                </div>
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="px-4 py-3 text-left text-gray-600 font-semibold">Période</th>
                                            <th className="px-4 py-3 text-right text-gray-600 font-semibold">Total (DA)</th>
                                            <th className="px-4 py-3 text-right text-gray-600 font-semibold">Dont Dev (DA)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {formData.type_projet === 'en_cours' && <>
                                            <tr className="bg-gray-50">
                                                <td className="px-4 py-3 font-medium text-gray-800">Réalisation Cumul {anneeBase - 1}</td>
                                                <td className="px-4 py-3 text-right font-bold">{formatCurrency(formData.realisation_cumul_n_mins1_total)}</td>
                                                <td className="px-4 py-3 text-right text-orange-600">{formatCurrency(formData.realisation_cumul_n_mins1_dont_dex)}</td>
                                            </tr>
                                            <tr className="bg-amber-50">
                                                <td className="px-4 py-3 font-medium text-gray-800">Prévision Clôture {anneeBase}</td>
                                                <td className="px-4 py-3 text-right font-bold">{formatCurrency(formData.prev_cloture_n_total)}</td>
                                                <td className="px-4 py-3 text-right text-orange-600">{formatCurrency(formData.prev_cloture_n_dont_dex)}</td>
                                            </tr>
                                        </>}

                                        {/* Étape 2 : mois autorisés seulement */}
                                        <tr className="bg-green-50">
                                            <td className="px-4 py-3 font-medium text-gray-800">
                                                Prévisions {anneeDebPmt}
                                                {finProjet && (
                                                    <span className="text-xs text-gray-500 ml-2">
                                                        ({MOIS_LABELS[parseInt(formData.mois_debut_projet)]}
                                                        {parseInt(formData.annee_debut_projet) === anneeDebPmt
                                                            ? ` → ${finProjet.annee === anneeDebPmt ? MOIS_LABELS[finProjet.mois] : 'Décembre'}`
                                                            : ' → Décembre'})
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 text-right font-bold">{formatCurrency(totalMensuel())}</td>
                                            <td className="px-4 py-3 text-right text-orange-600">{formatCurrency(totalMensuelDex())}</td>
                                        </tr>

                                        {/* Étape 3 : années */}
                                        {anneesStep3Mapped.map(item => (
                                            <tr key={item.annee} className={item.autorisee ? 'hover:bg-gray-50' : 'bg-gray-50 opacity-50'}>
                                                <td className="px-4 py-3 font-medium text-gray-700">
                                                    {item.annee}
                                                    {!item.autorisee && <span className="text-xs text-gray-400 ml-2 italic">Hors plage</span>}
                                                </td>
                                                <td className="px-4 py-3 text-right">{item.autorisee ? formatCurrency(formData[item.totalKey]) : '—'}</td>
                                                <td className="px-4 py-3 text-right text-orange-600">{item.autorisee ? formatCurrency(formData[item.devKey]) : '—'}</td>
                                            </tr>
                                        ))}

                                        {/* Total */}
                                        <tr className="bg-orange-100">
                                            <td className="px-4 py-3 font-bold text-gray-900">Coût Global {anneeDebPmt}→{anneeFinPmt}</td>
                                            <td className="px-4 py-3 text-right font-bold text-xl text-orange-700">{formatCurrency(coutGlobal())}</td>
                                            <td className="px-4 py-3 text-right font-bold text-orange-600">
                                                {formatCurrency(formData.type_projet === 'en_cours'
                                                    ? (parseFloat(formData.cout_initial_dont_dex) || 0)
                                                    : totalPrevisionsPluriDex() + totalMensuelDex())}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {formData.description_technique && (
                                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                                    <h5 className="font-semibold text-gray-700 mb-2">Description technique</h5>
                                    <p className="text-sm text-gray-600">{formData.description_technique}</p>
                                </div>
                            )}
                            {formData.opportunite_projet && (
                                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                                    <h5 className="font-semibold text-gray-700 mb-2">Opportunité du projet</h5>
                                    <p className="text-sm text-gray-600">{formData.opportunite_projet}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* PIED DE PAGE */}
                <div className="border-t border-gray-100 px-6 py-4 bg-white flex justify-between items-center">
                    <button onClick={currentStep === 1 ? onClose : prevStep}
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
                            {loading && <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>}
                            {loading ? 'Enregistrement...' : '✓ Créer le projet'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AjouterProjetModal;