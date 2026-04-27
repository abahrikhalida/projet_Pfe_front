import React, { useState, useEffect, useCallback } from 'react';
import { Search, PlusCircle, CheckCircle, Loader2 } from 'lucide-react';
import axiosInstance from '../../axios'; // Importez votre instance axios

const AjouterProjet = () => {
  const [isNewProject, setIsNewProject] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    code_division: '',
    libelle: '',
    region_id: '',
    perimetre: '',
    famille: '',
    activite: '',
    annee_debut_pmt: '',
    description_technique: '',
    realisation_s2: '',
    cumul_realisation: '',
    previsions: ''
  });

  const [autoFilledFields, setAutoFilledFields] = useState([]);

  // Logique de recherche (Debounce)
  useEffect(() => {
    if (!isNewProject && formData.code_division.length >= 3) {
      const delayDebounceFn = setTimeout(() => {
        fetchProjectData(formData.code_division);
      }, 600);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [formData.code_division, isNewProject]);

  const fetchProjectData = async (code) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/recap/budget/historique/${code}/actif/`);
      const data = response.data.version_active;

      if (data) {
        setFormData(prev => ({
          ...prev,
          libelle: data.libelle || '',
          region_id: data.region_id || '',
          perimetre: data.perm || '',
          famille: data.famille || '',
          activite: data.activite || '',
          annee_debut_pmt: data.annee_debut_pmt || '',
          description_technique: data.description_technique || ''
        }));
        // Marquer les champs comme auto-remplis pour le style
        setAutoFilledFields(['libelle', 'region_id', 'perimetre', 'famille', 'activite']);
      }
    } catch (error) {
      console.error("Projet non trouvé", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (autoFilledFields.includes(name)) {
      setAutoFilledFields(autoFilledFields.filter(f => f !== name));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Logique POST vers votre backend ici
    console.log("Envoi des données:", formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Configuration du Projet</h2>
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button 
            onClick={() => setIsNewProject(true)}
            className={`px-4 py-2 rounded-md transition-all ${isNewProject ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}
          >
            Nouveau Projet
          </button>
          <button 
            onClick={() => setIsNewProject(false)}
            className={`px-4 py-2 rounded-md transition-all ${!isNewProject ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}
          >
            Projet en cours
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Champ Code Division (Déclencheur) */}
        <div className="md:col-span-2 relative">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Code Division</label>
          <div className="relative">
            <input
              name="code_division"
              value={formData.code_division}
              onChange={handleChange}
              placeholder="Ex: DIV-2024..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all outline-none"
            />
            {!isNewProject ? <Search className="absolute left-3 top-3.5 text-gray-400 size-5" /> : <PlusCircle className="absolute left-3 top-3.5 text-gray-400 size-5" />}
            {loading && <Loader2 className="absolute right-3 top-3.5 animate-spin text-blue-500" />}
          </div>
        </div>

        {/* Section Informations Générales */}
        <div className="space-y-4">
          <InputField 
            label="Libellé Projet" 
            name="libelle" 
            value={formData.libelle} 
            onChange={handleChange} 
            isAuto={autoFilledFields.includes('libelle')} 
          />
          <InputField 
            label="Périmètre" 
            name="perimetre" 
            value={formData.perimetre} 
            onChange={handleChange} 
            isAuto={autoFilledFields.includes('perimetre')} 
          />
          <InputField 
            label="Famille" 
            name="famille" 
            value={formData.famille} 
            onChange={handleChange} 
            isAuto={autoFilledFields.includes('famille')} 
          />
        </div>

        {/* Section Détails Techniques */}
        <div className="space-y-4">
          <InputField 
            label="Région" 
            name="region_id" 
            value={formData.region_id} 
            onChange={handleChange} 
            isAuto={autoFilledFields.includes('region_id')} 
          />
          <InputField 
            label="Activité" 
            name="activite" 
            value={formData.activite} 
            onChange={handleChange} 
            isAuto={autoFilledFields.includes('activite')} 
          />
          <InputField 
            label="Année Début" 
            name="annee_debut_pmt" 
            value={formData.annee_debut_pmt} 
            onChange={handleChange} 
          />
        </div>

        {/* Champs spécifiques "Projet en cours" */}
        {!isNewProject && (
          <div className="md:col-span-2 grid grid-cols-2 gap-6 p-4 bg-blue-50 rounded-lg border border-blue-100 animate-in fade-in duration-500">
            <InputField label="Réalisation S2" name="realisation_s2" value={formData.realisation_s2} onChange={handleChange} />
            <InputField label="Cumul Réalisation" name="cumul_realisation" value={formData.cumul_realisation} onChange={handleChange} />
          </div>
        )}

        <div className="md:col-span-2 mt-4">
          <button 
            type="submit" 
            className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg"
          >
            Enregistrer le Projet
          </button>
        </div>
      </form>
    </div>
  );
};

// Sous-composant pour les champs d'entrée avec feedback visuel
const InputField = ({ label, name, value, onChange, isAuto }) => (
  <div>
    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 ml-1">{label}</label>
    <div className="relative">
      <input
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2.5 border rounded-lg transition-all outline-none text-gray-700 ${
          isAuto ? 'border-green-300 bg-green-50 ring-1 ring-green-200' : 'border-gray-200 focus:border-blue-400'
        }`}
      />
      {isAuto && <CheckCircle className="absolute right-3 top-3 size-4 text-green-500" />}
    </div>
  </div>
);

export default AjouterProjet;