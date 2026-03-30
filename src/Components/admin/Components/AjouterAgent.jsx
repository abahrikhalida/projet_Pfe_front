import React, { useState } from 'react';

const AjouterAgent = ({ onCancel, onSuccess, axiosInstance }) => {
    const [activeTab, setActiveTab] = useState('manuel');
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        date_naissance: '',
        sexe: '',
        telephone: '',
        matricule: '',
        poste: '',
        adresse: '',
        mot_de_passe: '',
        role: 'agent',
        en_brouillon: false
    });
    
    const [selectedFile, setSelectedFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [loading, setLoading] = useState(false);

    // Gestion formulaire manuel
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

const handleSubmitManuel = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
        const formDataToSend = new FormData();
        
        const fields = [
            'nom', 'prenom', 'email', 'date_naissance', 
            'sexe', 'telephone', 'matricule', 'poste', 
            'adresse', 'mot_de_passe', 'role', 'en_brouillon'
        ];
        
        fields.forEach(field => {
            if (formData[field] !== null && formData[field] !== '') {
                formDataToSend.append(field, formData[field]);
            }
        });

        if (formData.en_brouillon && !formData.mot_de_passe) {
            formDataToSend.delete('mot_de_passe');
        }

        const response = await axiosInstance.post('/api/agents/create/', formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        
        if (response.data) {
            onSuccess();
        }
    } catch (err) {
        console.error("Erreur lors de l'ajout:", err);
        
        if (err.response) {
            console.log("Status:", err.response.status);
            console.log("Data:", err.response.data);
            
            // Gestion spécifique des erreurs
            if (err.response.status === 500) {
                // Vérifier si c'est une erreur de duplication d'email
                if (err.response.data?.includes('Duplicate entry')) {
                    alert("Cet email est déjà utilisé. Veuillez en choisir un autre.");
                } else {
                    alert("Erreur serveur. Veuillez réessayer.");
                }
            } else {
                alert(err.response.data?.message || "Erreur lors de l'ajout de l'agent");
            }
        } else {
            alert("Erreur réseau");
        }
    } finally {
        setLoading(false);
    }
};
    // Gestion fichier Excel
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const extension = file.name.split('.').pop().toLowerCase();
            if (extension !== 'xlsx' && extension !== 'xls') {
                alert('Format de fichier non supporté. Veuillez choisir un fichier Excel (.xlsx ou .xls)');
                return;
            }
            setSelectedFile(file);
            setFilePreview(file.name);
        }
    };

const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    setLoading(true);
    const formDataExcel = new FormData();
    formDataExcel.append('file', selectedFile);

    // DEBUG
    const token = localStorage.getItem('access_token');
    console.log("Token utilisé:", token ? token.substring(0, 20) + "..." : "AUCUN");
    console.log("Fichier:", selectedFile.name);

    try {
        const response = await axiosInstance.post('/api/agents/excel/', formDataExcel, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`  // FORCER
            }
        });
        
        console.log("Succès import:", response.data);
        
        if (response.data) {
            onSuccess('Agents importés avec succès');
        }
    } catch (err) {
        console.error("Erreur complète:", err);
        
        if (err.response) {
            console.log("Status:", err.response.status);
            console.log("Headers envoyés:", err.config.headers);
            console.log("Réponse serveur:", err.response.data);
            
            if (err.response.status === 401) {
                alert("Session expirée - Veuillez vous reconnecter");
                localStorage.clear();
                window.location.href = '/login';
            } else {
                alert(err.response.data?.message || "Erreur lors de l'import");
            }
        } else {
            alert("Erreur réseau");
        }
    } finally {
        setLoading(false);
    }
};
    const handleDeleteFile = () => {
        setSelectedFile(null);
        setFilePreview(null);
        document.getElementById('file-upload').value = '';
    };

    const handleDownloadTemplate = () => {
        const templateData = [
            ['Nom', 'Prénom', 'Email', 'Matricule', 'Téléphone', 'Poste', 'Adresse', 'Date Naissance', 'Sexe'],
            ['Dupont', 'Jean', 'jean.dupont@email.com', 'EMP001', '0612345678', 'Développeur', '123 Rue Exemple', '1990-01-01', 'M']
        ];
        
        let csvContent = templateData.map(row => row.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'template_agents.xlsx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            {/* MODAL TAILLE MOYENNE - 700px de large */}
            <div className="w-[700px] h-auto overflow-y-auto bg-white shadow-lg p-6 font-poppins ">
                
                {/* En-tête */}
                <div className="flex justify-between items-center pb-3 mb-4 border-b border-gray-200">
                    <h1 className="text-xl font-semibold text-gray-800">Ajouter Agent</h1>
                    <button 
                        onClick={onCancel}
                        className="p-1 hover:bg-gray-100 rounded-full transition"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18M6 6L18 18" stroke="#4F4F4F" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </button>
                </div>

                {/* Onglets */}
                <div className="flex gap-4 mb-4 border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab('manuel')}
                        className={`pb-2 text-sm font-medium transition ${
                            activeTab === 'manuel' 
                                ? 'text-[#FF8500] border-b-2 border-[#FF8500]' 
                                : 'text-gray-600 hover:text-[#FF8500]'
                        }`}
                    >
                        Manuel
                    </button>
                    <button
                        onClick={() => setActiveTab('excel')}
                        className={`pb-2 text-sm font-medium transition ${
                            activeTab === 'excel' 
                                ? 'text-[#FF8500] border-b-2 border-[#FF8500]' 
                                : 'text-gray-600 hover:text-[#FF8500]'
                        }`}
                    >
                        Importer Excel
                    </button>
                </div>

                {/* Formulaire Manuel */}
                {activeTab === 'manuel' && (
                    <form id="formManuel" onSubmit={handleSubmitManuel} className="space-y-3">
                        {/* Ligne 1: Nom et Prénom */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs text-gray-600 mb-1">Nom</label>
                                <input
                                    type="text"
                                    name="nom"
                                    value={formData.nom}
                                    onChange={handleInputChange}
                                    required={!formData.en_brouillon}
                                    className="w-full h-9 px-3 rounded-[25px] border border-gray-300 focus:border-[#FF8500] outline-none text-sm"
                                    placeholder="Nom"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-600 mb-1">Prénom</label>
                                <input
                                    type="text"
                                    name="prenom"
                                    value={formData.prenom}
                                    onChange={handleInputChange}
                                    required={!formData.en_brouillon}
                                    className="w-full h-9 px-3 rounded-[25px] border border-gray-300 focus:border-[#FF8500] outline-none text-sm"
                                    placeholder="Prénom"
                                />
                            </div>
                        </div>

                        {/* Ligne 2: Email et Date naissance */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs text-gray-600 mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required={!formData.en_brouillon}
                                    className="w-full h-9 px-3 rounded-[25px] border border-gray-300 focus:border-[#FF8500] outline-none text-sm"
                                    placeholder="email@exemple.com"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-600 mb-1">Date naissance</label>
                                <input
                                    type="date"
                                    name="date_naissance"
                                    value={formData.date_naissance}
                                    onChange={handleInputChange}
                                    className="w-full h-9 px-3 rounded-[25px] border border-gray-300 focus:border-[#FF8500] outline-none text-sm"
                                />
                            </div>
                        </div>

                        {/* Ligne 3: Sexe et Téléphone */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs text-gray-600 mb-1">Sexe</label>
                                <select
                                    name="sexe"
                                    value={formData.sexe}
                                    onChange={handleInputChange}
                                    className="w-full h-9 px-3 rounded-[25px] border border-gray-300 focus:border-[#FF8500] outline-none text-sm bg-white"
                                >
                                    <option value="">Sélectionner</option>
                                    <option value="M">Masculin</option>
                                    <option value="F">Féminin</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-600 mb-1">Téléphone</label>
                                <input
                                    type="tel"
                                    name="telephone"
                                    value={formData.telephone}
                                    onChange={handleInputChange}
                                    className="w-full h-9 px-3 rounded-[25px] border border-gray-300 focus:border-[#FF8500] outline-none text-sm"
                                    placeholder="0612345678"
                                />
                            </div>
                        </div>

                        {/* Ligne 4: Matricule et Poste */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs text-gray-600 mb-1">Matricule</label>
                                <input
                                    type="text"
                                    name="matricule"
                                    value={formData.matricule}
                                    onChange={handleInputChange}
                                    className="w-full h-9 px-3 rounded-[25px] border border-gray-300 focus:border-[#FF8500] outline-none text-sm"
                                    placeholder="EMP001"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-600 mb-1">Poste</label>
                                <input
                                    type="text"
                                    name="poste"
                                    value={formData.poste}
                                    onChange={handleInputChange}
                                    className="w-full h-9 px-3 rounded-[25px] border border-gray-300 focus:border-[#FF8500] outline-none text-sm"
                                    placeholder="Développeur"
                                />
                            </div>
                        </div>

                        {/* Ligne 5: Adresse */}
                        <div>
                            <label className="block text-xs text-gray-600 mb-1">Adresse</label>
                            <input
                                type="text"
                                name="adresse"
                                value={formData.adresse}
                                onChange={handleInputChange}
                                className="w-full h-9 px-3 rounded-[25px] border border-gray-300 focus:border-[#FF8500] outline-none text-sm"
                                placeholder="Adresse complète"
                            />
                        </div>

                        {/* Ligne 6: Mot de passe */}
                        {/* <div>
                            <label className="block text-xs text-gray-600 mb-1">Mot de passe</label>
                            <input
                                type="password"
                                name="mot_de_passe"
                                value={formData.mot_de_passe}
                                onChange={handleInputChange}
                                required={!formData.en_brouillon}
                                className="w-full h-9 px-3 rounded-[25px] border border-gray-300 focus:border-[#FF8500] outline-none text-sm"
                                placeholder="********"
                            />
                        </div> */}

                        {/* Checkbox Brouillon */}
                        <div className="flex items-center gap-2 pt-2">
                            <input
                                type="checkbox"
                                name="en_brouillon"
                                id="en_brouillon"
                                checked={formData.en_brouillon}
                                onChange={handleInputChange}
                                className="w-4 h-4 accent-[#FF8500]"
                            />
                            <label htmlFor="en_brouillon" className="text-sm text-gray-700">
                                Mettre en brouillon
                            </label>
                        </div>
                    </form>
                )}

                {/* Formulaire Import Excel */}
                {activeTab === 'excel' && (
                    <form id="formExcel" onSubmit={handleFileUpload} className="space-y-4">
                        <div 
                            className="w-full h-48 bg-gray-50 border-2 border-dashed border-gray-300 rounded-[25px] flex flex-col justify-center items-center transition hover:border-[#FF8500]"
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                                e.preventDefault();
                                const file = e.dataTransfer.files[0];
                                if (file) {
                                    const extension = file.name.split('.').pop().toLowerCase();
                                    if (extension === 'xlsx' || extension === 'xls') {
                                        setSelectedFile(file);
                                        setFilePreview(file.name);
                                    } else {
                                        alert('Format de fichier non supporté');
                                    }
                                }
                            }}
                        >
                            <svg width="40" height="40" viewBox="0 0 60 60" fill="none">
                                <path d="M30 10V30M30 30V50M30 30H50M30 30H10" stroke="#FF8500" strokeWidth="4" strokeLinecap="round"/>
                                <circle cx="30" cy="30" r="28" stroke="#FF8500" strokeWidth="4" strokeDasharray="4 4"/>
                            </svg>
                            
                            <p className="text-sm text-gray-600 mt-2">
                                Glissez votre fichier Excel ici ou
                            </p>
                            
                            <button
                                type="button"
                                onClick={() => document.getElementById('file-upload').click()}
                                className="mt-2 px-4 py-1.5 bg-[#FF8500] text-white text-sm font-medium rounded-[25px] hover:bg-[#e67800] transition"
                            >
                                Choisir un fichier
                            </button>

                            <input
                                type="file"
                                id="file-upload"
                                accept=".xlsx,.xls"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>

                        {/* Prévisualisation fichier */}
                        {selectedFile && (
                            <div className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-[25px] border border-gray-300">
                                <div className="flex items-center gap-2">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#FF8500" strokeWidth="2"/>
                                        <path d="M14 2V8H20" stroke="#FF8500" strokeWidth="2"/>
                                    </svg>
                                    <p className="text-xs text-gray-700 truncate max-w-[250px]">{filePreview}</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleDeleteFile}
                                    className="p-1 hover:bg-gray-200 rounded-full transition"
                                >
                                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                                        <path d="M15 5L5 15M5 5L15 15" stroke="#FF8500" strokeWidth="2"/>
                                    </svg>
                                </button>
                            </div>
                        )}

                        <div className="text-center">
                            <button
                                type="button"
                                onClick={handleDownloadTemplate}
                                className="text-[#FF8500] hover:text-[#e67800] text-xs font-medium underline"
                            >
                                Télécharger le modèle Excel
                            </button>
                        </div>
                    </form>
                )}

                {/* Boutons d'action - ARRONDIS COMME LES INPUTS */}
                <div className="flex gap-3 justify-end mt-4 pt-3 border-t border-gray-200">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-5 py-1.5 bg-gray-200 text-gray-700 text-sm font-medium rounded-[25px] hover:bg-gray-300 transition disabled:opacity-50"
                        disabled={loading}
                    >
                        Annuler
                    </button>
                    
                    {activeTab === 'manuel' ? (
                        <button
                            type="submit"
                            form="formManuel"
                            disabled={loading}
                            className="px-5 py-1.5 bg-[#FF8500] text-white text-sm font-medium rounded-[25px] hover:bg-[#e67800] transition disabled:opacity-50 flex items-center gap-2"
                        >
                            {loading && (
                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                                </svg>
                            )}
                            {loading ? 'Ajout...' : 'Ajouter'}
                        </button>
                    ) : (
                        <button
                            type="submit"
                            form="formExcel"
                            disabled={!selectedFile || loading}
                            className={`px-5 py-1.5 text-white text-sm font-medium rounded-[25px] transition flex items-center gap-2 ${
                                selectedFile && !loading
                                    ? 'bg-[#FF8500] hover:bg-[#e67800]' 
                                    : 'bg-gray-300 cursor-not-allowed'
                            }`}
                        >
                            {loading && (
                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                                </svg>
                            )}
                            {loading ? 'Import...' : 'Importer'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AjouterAgent;