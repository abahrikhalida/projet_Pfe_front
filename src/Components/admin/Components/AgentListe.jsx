import React, { useState, useEffect, useRef } from 'react';
import axiosInstance from '../../../axios'; // IMPORTANT: importer axiosInstance
import { ReactComponent as SearchIcon } from '../../../Assets/Icons/Search.svg';
import { ReactComponent as EditIcon } from '../../../Assets/Icons/edit.svg';
import { ReactComponent as DeleteIcon } from '../../../Assets/Icons/Delete.svg';
import { ReactComponent as ArrowIcon } from '../../../Assets/Icons/Arrow.svg';
import { ReactComponent as EmptyIcon } from '../../../Assets/Icons/notFound.svg';
import AjouterAgent from './AjouterAgent';

function AgentListe() {
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const dynamicListRef = useRef(null);
    const [ajouterAgentClicked, setAjouterAgentClicked] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [modifierAgentState, setModifierAgentState] = useState({
        clicked: false,
        agent: null
    });
    const [deleteAgentState, setDeleteAgentState] = useState({
        clicked: false,
        id: null
    });
    const [successMessage, setSuccessMessage] = useState('');
    useEffect(() => {
    if (ajouterAgentClicked || modifierAgentState.clicked || deleteAgentState.clicked) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'unset';
    }
    return () => {
        document.body.style.overflow = 'unset';
    };
}, [ajouterAgentClicked, modifierAgentState.clicked, deleteAgentState.clicked]);

    // Récupérer les agents avec axiosInstance
    useEffect(() => {
        fetchAgents();
    }, []);

     const fetchAgents = () => {
        setLoading(true);
        axiosInstance.get('/api/agents/')
            .then(res => {
                console.log("Réponse API agents:", res.data); // Pour debug
                
                // Normaliser la réponse en tableau
                let agentsArray = [];
                
                if (Array.isArray(res.data)) {
                    agentsArray = res.data;
                } else if (res.data && typeof res.data === 'object') {
                    // Chercher le tableau dans différentes structures possibles
                    if (res.data.results && Array.isArray(res.data.results)) {
                        agentsArray = res.data.results; // Format paginé DRF
                    } else if (res.data.data && Array.isArray(res.data.data)) {
                        agentsArray = res.data.data; // Format avec clé 'data'
                    } else if (res.data.agents && Array.isArray(res.data.agents)) {
                        agentsArray = res.data.agents; // Format avec clé 'agents'
                    } else {
                        // Si c'est un objet mais pas un tableau, on le met dans un tableau
                        agentsArray = Object.values(res.data).filter(item => typeof item === 'object');
                        if (agentsArray.length === 0) {
                            agentsArray = [res.data];
                        }
                    }
                }
                
                setAgents(agentsArray);
                setLoading(false);
            })
            .catch(err => {
                console.error("Erreur lors du chargement des agents:", err);
                setAgents([]); // Tableau vide en cas d'erreur
                setLoading(false);
            });
    };
    // Gestion du scroll
    const toggleVisibility = () => {
        if (dynamicListRef.current) {
            const scrollY = dynamicListRef.current.scrollTop;
            setIsVisible(scrollY > 5);
        }
    };

    useEffect(() => {
        const currentRef = dynamicListRef.current;
        if (currentRef) {
            currentRef.addEventListener("scroll", toggleVisibility);
        }
        return () => {
            if (currentRef) {
                currentRef.removeEventListener("scroll", toggleVisibility);
            }
        };
    }, []);

    const scrollToTop = () => {
        if (dynamicListRef.current) {
            dynamicListRef.current.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    };

    const cancelAjouter = () => setAjouterAgentClicked(false);

    const handleSuccess = (message = 'Agent ajouté avec succès') => {
        setAjouterAgentClicked(false);
        setSuccessMessage(message);
        setShowSuccess(true);
        fetchAgents();
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const cancelModifier = () => {
        setModifierAgentState({
            clicked: false,
            agent: null
        });
    };

    const handleModifySuccess = () => {
        setModifierAgentState({ clicked: false, agent: null });
        setSuccessMessage('Agent modifié avec succès');
        setShowSuccess(true);
        fetchAgents();
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const handleDeleteSuccess = () => {
        setDeleteAgentState({ clicked: false, id: null });
        setSuccessMessage('Agent supprimé avec succès');
        setShowSuccess(true);
        fetchAgents();
        setTimeout(() => setShowSuccess(false), 3000);
    };

    // Filtrage
    const filteredAgents = agents.filter(agent => {
        const search = searchTerm.toLowerCase();
        return (
            agent.nom_complet?.toLowerCase().includes(search) ||
           // agent.prenom?.toLowerCase().includes(search) ||
            agent.email?.toLowerCase().includes(search) ||
            agent.matricule?.toLowerCase().includes(search)
        );
    });

    // Couleurs par rôle
    const getRoleStyle = (role) => {
        const styles = {
            'agent': 'text-[#17BEBB] bg-[#17BEBB20] border-[#17BEBB]',
            'chef': 'text-[#FF8F0D] bg-[#FF8F0D20] border-[#FF8F0D]',
            'directeur': 'text-[#884DFF] bg-[#884DFF20] border-[#884DFF]',
            'visionnaire': 'text-[#0095FF] bg-[#0095FF20] border-[#0095FF]'
        };
        return styles[role] || 'text-[#FF8500] bg-[#FF850020] border-[#FF8500]';
    };

    // Export Excel avec axiosInstance
    const exportToExcel = (e) => {
        e.preventDefault();
        axiosInstance({
            url: '/api/export/agents/excel/',
            method: 'GET',
            responseType: 'blob',
        })
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'agents.xlsx');
                document.body.appendChild(link);
                link.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(link);
            })
            .catch((err) => {
                console.error('Erreur de téléchargement:', err);
            });
    };

    return (
        <div 
            ref={dynamicListRef}
            className="h-[calc(100vh-65px)] overflow-y-auto scrollbar-none relative"
        >
            <div className="w-full h-full flex flex-col px-3">
                {/* Boutons */}
                <div className="w-full px-4 flex justify-between items-center">
                    <div className="flex gap-3">
                        <button 
                            onClick={exportToExcel}
                            className="font-kumbh text-sm font-medium px-3 py-2.5 rounded-[22px] text-[#FF8500] border border-[#FF8500] hover:bg-[#FF8500] hover:text-white transition"
                        >
                            Exporter Excel
                        </button>
                        <button
                            onClick={() => setAjouterAgentClicked(true)}
                            className="font-kumbh text-sm font-medium px-3 py-2.5 rounded-[22px] text-white bg-[#FF8500] hover:bg-[#0E47C8] transition"
                        >
                            + Ajouter Agent
                        </button>
                    </div>
                    <div>
                        <button className="font-kumbh text-sm font-medium px-3 py-2.5 rounded-[22px] text-white bg-[#D9534F] hover:bg-[#c9302c] transition">
                            Désactiver
                        </button>
                    </div>
                </div>

                {/* Barre de recherche */}
                <div className="w-full px-2 min-h-[43px] my-4">
                    <div className="w-full h-full rounded-[20px] border-2 border-[#D9E1E7] flex">
                        <button className="h-full px-6 font-kumbh text-sm font-medium text-myorange border-r-2 border-[#D9E1E7] flex items-center gap-4 bg-transparent hover:bg-gray-50 transition">
                            Filtrer
                            <svg width="14" height="8" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.742 6.05489L12.971 0.863892C13.1571 0.678984 13.4087 0.575195 13.671 0.575195C13.9333 0.575195 14.185 0.678984 14.371 0.863892C14.4627 0.954642 14.5354 1.06265 14.585 1.18169C14.6347 1.30072 14.6602 1.42842 14.6602 1.55739C14.6602 1.68636 14.6347 1.81406 14.585 1.93309C14.5354 2.05212 14.4627 2.16014 14.371 2.25089L8.44293 8.13589C8.25689 8.32079 8.00529 8.42458 7.74298 8.42458C7.48068 8.42458 7.22908 8.32079 7.04303 8.13589L1.11493 2.25089C1.02329 2.16014 0.950587 2.05212 0.90094 1.93309C0.851293 1.81406 0.825745 1.68636 0.825745 1.55739C0.825745 1.42842 0.851293 1.30072 0.90094 1.18169C0.950587 1.06265 1.02329 0.954642 1.11493 0.863892C1.3011 0.679226 1.55278 0.575607 1.815 0.575607C2.07723 0.575607 2.32878 0.679226 2.51495 0.863892L7.742 6.05489Z" fill="#FF8500" />
                            </svg>
                        </button>
                        <div className="w-full h-full flex items-center px-4">
                            <SearchIcon />
                            <input
                                type="text"
                                placeholder="Rechercher par nom, prénom, email ou matricule..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full h-full border-0 outline-none px-4 font-kumbh placeholder:text-[#8A8A8A]"
                            />
                        </div>
                    </div>
                </div>

                {/* Tableau */}
                <div className="w-full mt-1">
                    <table className="w-full border-separate border-spacing-y-[7px]">
                        <thead className="w-full sticky top-0 z-10">
                            <tr>
                                <th className="font-medium text-sm text-[#727272] py-4 bg-[#F9F9F9] border border-[#E4E4E4] border-l border-r-0 rounded-l-lg text-left pl-4 w-[15%]">
                                    Nom & Prénom
                                </th>
                                <th className="font-medium text-sm text-[#727272] py-4 bg-[#F9F9F9] border border-[#E4E4E4] border-l-0 border-r-0 w-[10%]">
                                    Matricule
                                </th>
                                <th className="font-medium text-sm text-[#727272] py-4 bg-[#F9F9F9] border border-[#E4E4E4] border-l-0 border-r-0 w-[20%]">
                                    Email
                                </th>
                                {/* <th className="font-medium text-sm text-[#727272] py-4 bg-[#F9F9F9] border border-[#E4E4E4] border-l-0 border-r-0 w-[10%]">
                                    Rôle
                                </th> */}
                                <th className="font-medium text-sm text-[#727272] py-4 bg-[#F9F9F9] border border-[#E4E4E4] border-l-0 border-r-0 w-[10%]">
                                    Poste
                                </th>
                                <th className="font-medium text-sm text-[#727272] py-4 bg-[#F9F9F9] border border-[#E4E4E4] border-l-0 border-r-0 w-[15%]">
                                    Téléphone
                                </th>
                                <th className="font-medium text-sm text-[#727272] py-4 bg-[#F9F9F9] border border-[#E4E4E4] border-l-0 border-r rounded-r-lg text-right pr-4 w-[20%]">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        {agents.length > 0 && (
                            <tbody>
                                {filteredAgents.map((agent) => (
                                    <tr key={agent.id} className="hover:bg-gray-50 transition">
                                        <td className="font-normal text-sm text-[#060606] py-3 px-4 border border-[#E4E4E4] border-l border-r-0 rounded-l-lg text-left">
                                            {/* {agent.nom} {agent.prenom} */}
                                            {agent.nom_complet}
                                        </td>
                                        <td className="font-normal text-sm text-[#060606] py-3 border border-[#E4E4E4] border-l-0 border-r-0 text-center">
                                            {agent.matricule || '-'}
                                        </td>
                                        <td className="font-normal text-sm text-[#060606] py-3 border border-[#E4E4E4] border-l-0 border-r-0 text-center">
                                            {agent.email}
                                        </td>
                                        {/* <td className="font-normal text-sm text-[#060606] py-3 border border-[#E4E4E4] border-l-0 border-r-0 text-center">
                                            <span className={`px-3 py-1 rounded-[20px] text-xs font-medium border capitalize ${getRoleStyle(agent.role)}`}>
                                                {agent.role}
                                            </span>
                                        </td> */}
                                        <td className="font-normal text-sm text-[#060606] py-3 border border-[#E4E4E4] border-l-0 border-r-0 text-center">
                                            {agent.poste || '-'}
                                        </td>
                                        <td className="font-normal text-sm text-[#060606] py-3 border border-[#E4E4E4] border-l-0 border-r-0 text-center">
                                            {agent.telephone || '-'}
                                        </td>
                                        <td className="py-3 border border-[#E4E4E4] border-l-0 border-r rounded-r-lg text-right pr-4">
                                            <div className="flex gap-2 justify-end">
                                                <button 
                                                    onClick={() => setModifierAgentState({ clicked: true, agent })}
                                                    className="px-3 py-1.5 rounded-[20px] bg-[#E2E4E5]/40 hover:bg-[#E2E4E5] flex items-center gap-1.5 text-xs transition"
                                                >
                                                    <EditIcon className="w-4 h-4" />
                                                    Modifier
                                                </button>
                                                <button 
                                                    onClick={() => setDeleteAgentState({ clicked: true, id: agent.id })}
                                                    className="px-3 py-1.5 rounded-[20px] bg-[#E2E4E5]/40 hover:bg-[#E2E4E5] flex items-center gap-1.5 text-xs transition"
                                                >
                                                    <DeleteIcon className="w-4 h-4" />
                                                    Supprimer
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        )}
                    </table>

                    {/* Aucun agent */}
                    {agents.length === 0 && !loading && (
                        <div className="w-full h-[calc(100vh-280px)] bg-[#F9F9F9] rounded-lg border-3 border-[#E4E4E4] flex flex-col justify-center items-center gap-6">
                            <EmptyIcon className="w-[200px] h-[170px]" />
                            <div className="flex flex-col gap-1 items-center">
                                <h1 className="text-2xl font-bold text-[#060606]">Aucun agent trouvé</h1>
                                <span className="text-center text-[#4F4F4F] font-medium">
                                    Commencez par ajouter un agent
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Loader */}
                    {loading && (
                        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
                            <div className="flex flex-col items-center bg-white p-8 rounded-[30px] shadow-lg w-[400px]">
                                <div className="flex justify-center items-center gap-2">
                                    {[1, 2, 3].map((dot) => (
                                        <div
                                            key={dot}
                                            className="w-3 h-3 bg-[#FF8500] rounded-full animate-bounce"
                                            style={{ animationDelay: `${dot * 0.16 - 0.48}s` }}
                                        />
                                    ))}
                                </div>
                                <p className="mt-5 text-[#333] text-lg font-semibold">
                                    Chargement...
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Bouton retour haut */}
                {isVisible && (
                    <button
                        onClick={scrollToTop}
                        className="fixed bottom-5 right-5 w-[50px] h-[50px] rounded-full bg-[#FF8500] text-white flex justify-center items-center shadow-lg hover:bg-[#8045d6] transition z-40"
                    >
                        <ArrowIcon className="transform rotate-180" />
                    </button>
                )}
            </div>

            {/* Modal Ajouter Agent */}
            {ajouterAgentClicked && (
                <AjouterAgent 
                    onCancel={cancelAjouter} 
                    onSuccess={handleSuccess}
                    axiosInstance={axiosInstance} // Passer axiosInstance en prop
                />
            )}

            {/* Modal Modifier Agent */}
            {modifierAgentState.clicked && (
                <ModifierAgent 
                    onCancel={cancelModifier}
                    agent={modifierAgentState.agent}
                    onSuccess={handleModifySuccess}
                    axiosInstance={axiosInstance} // Passer axiosInstance en prop
                />
            )}

            {/* Modal Supprimer Agent */}
            {deleteAgentState.clicked && (
                <DeleteAgent 
                    onCancel={() => setDeleteAgentState({ clicked: false, id: null })}
                    id={deleteAgentState.id}
                    onSuccess={handleDeleteSuccess}
                    axiosInstance={axiosInstance} // Passer axiosInstance en prop
                />
            )}

            {/* Message de succès */}
            {showSuccess && (
                <div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[300px] bg-green-500 text-white py-3 px-4 rounded-lg shadow-lg z-50 animate-fadeIn">
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-medium">{successMessage}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AgentListe;

// Composant ModifierAgent avec axiosInstance

const ModifierAgent = ({ onCancel, agent, onSuccess, axiosInstance }) => {
    const [formData, setFormData] = useState({
        nom: agent.nom || '',
        prenom: agent.prenom || '',
        email: agent.email || '',
        adresse: agent.adresse || '',
        date_naissance: agent.date_naissance || '',
        sexe: agent.sexe || '',
        telephone: agent.telephone || '',
        matricule: agent.matricule || '',
        poste: agent.poste || '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const userRole = localStorage.getItem('userRole') || 'chef';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const formDataToSend = new FormData();
            
            Object.keys(formData).forEach(key => {
                if (formData[key] != null && formData[key] !== '') {
                    formDataToSend.append(key, formData[key]);
                }
            });

            const response = await axiosInstance.put(`/api/agents/update/${agent.id}/`, formDataToSend, {
                headers: { 
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            onSuccess();
            
        } catch (err) {
            console.error("Erreur:", err);
            if (err.response) {
                alert(`Erreur: ${err.response.data.message || 'Erreur serveur'}`);
            } else {
                alert("Erreur de communication avec le serveur");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const isFieldDisabled = (fieldName) => {
        if (userRole === 'agent') {
            const allowedFields = ['nom', 'prenom', 'adresse', 'telephone'];
            return !allowedFields.includes(fieldName);
        }
        return false;
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            {/* MODAL SANS SCROLL - hauteur fixe et pas de overflow */}
            <div className="w-[600px] bg-[#FCFAFA] shadow-2xl p-8 rounded-none max-h-[90vh] flex flex-col">
                {/* Header fixe */}
                <div className="flex justify-between items-center mb-6 flex-shrink-0">
                    <h2 className="text-2xl font-semibold">Modifier Agent</h2>
                    <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-full">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4F4F4F" strokeWidth="2">
                            <path d="M18 6L6 18M6 6L18 18" />
                        </svg>
                    </button>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg flex-shrink-0">
                        {error}
                    </div>
                )}

                {/* Formulaire SANS SCROLL - tout est visible sans avoir à scroller */}
                <form onSubmit={handleSubmit} className="space-y-3 overflow-visible">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium mb-1">Nom</label>
                            <input
                                type="text"
                                name="nom"
                                value={formData.nom}
                                onChange={handleInputChange}
                                disabled={isFieldDisabled('nom')}
                                className={`w-full h-9 px-3 rounded-[20px] border border-gray-300 text-sm ${
                                    isFieldDisabled('nom') ? 'bg-gray-100 cursor-not-allowed' : ''
                                }`}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Prénom</label>
                            <input
                                type="text"
                                name="prenom"
                                value={formData.prenom}
                                onChange={handleInputChange}
                                disabled={isFieldDisabled('prenom')}
                                className={`w-full h-9 px-3 rounded-[20px] border border-gray-300 text-sm ${
                                    isFieldDisabled('prenom') ? 'bg-gray-100 cursor-not-allowed' : ''
                                }`}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            disabled={isFieldDisabled('email')}
                            className={`w-full h-9 px-3 rounded-[20px] border border-gray-300 text-sm ${
                                isFieldDisabled('email') ? 'bg-gray-100 cursor-not-allowed' : ''
                            }`}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Adresse</label>
                        <input
                            type="text"
                            name="adresse"
                            value={formData.adresse}
                            onChange={handleInputChange}
                            disabled={isFieldDisabled('adresse')}
                            className={`w-full h-9 px-3 rounded-[20px] border border-gray-300 text-sm ${
                                isFieldDisabled('adresse') ? 'bg-gray-100 cursor-not-allowed' : ''
                            }`}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium mb-1">Date naissance</label>
                            <input
                                type="date"
                                name="date_naissance"
                                value={formData.date_naissance}
                                onChange={handleInputChange}
                                disabled={isFieldDisabled('date_naissance')}
                                className={`w-full h-9 px-3 rounded-[20px] border border-gray-300 text-sm ${
                                    isFieldDisabled('date_naissance') ? 'bg-gray-100 cursor-not-allowed' : ''
                                }`}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Sexe</label>
                            <select
                                name="sexe"
                                value={formData.sexe}
                                onChange={handleInputChange}
                                disabled={isFieldDisabled('sexe')}
                                className={`w-full h-9 px-3 rounded-[20px] border border-gray-300 text-sm ${
                                    isFieldDisabled('sexe') ? 'bg-gray-100 cursor-not-allowed' : ''
                                }`}
                            >
                                <option value="">Sélectionner</option>
                                <option value="M">Masculin</option>
                                <option value="F">Féminin</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium mb-1">Téléphone</label>
                            <input
                                type="tel"
                                name="telephone"
                                value={formData.telephone}
                                onChange={handleInputChange}
                                disabled={isFieldDisabled('telephone')}
                                className={`w-full h-9 px-3 rounded-[20px] border border-gray-300 text-sm ${
                                    isFieldDisabled('telephone') ? 'bg-gray-100 cursor-not-allowed' : ''
                                }`}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Matricule</label>
                            <input
                                type="text"
                                name="matricule"
                                value={formData.matricule}
                                onChange={handleInputChange}
                                disabled={isFieldDisabled('matricule')}
                                className={`w-full h-9 px-3 rounded-[20px] border border-gray-300 text-sm ${
                                    isFieldDisabled('matricule') ? 'bg-gray-100 cursor-not-allowed' : ''
                                }`}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Poste</label>
                        <input
                            type="text"
                            name="poste"
                            value={formData.poste}
                            onChange={handleInputChange}
                            disabled={isFieldDisabled('poste')}
                            className={`w-full h-9 px-3 rounded-[20px] border border-gray-300 text-sm ${
                                isFieldDisabled('poste') ? 'bg-gray-100 cursor-not-allowed' : ''
                            }`}
                        />
                    </div>

                    {/* Boutons fixes en bas */}
                    <div className="flex justify-end gap-3 pt-3 border-t border-gray-200 mt-3 flex-shrink-0">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-6 py-2 rounded-[25px] bg-gray-200 hover:bg-gray-300 transition text-sm"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 rounded-[25px] bg-[#FF8500] text-white hover:bg-[#0E47C8] transition disabled:opacity-50 text-sm"
                        >
                            {loading ? 'Modification...' : 'Modifier'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
// Composant DeleteAgent avec axiosInstance
const DeleteAgent = ({ onCancel, id, onSuccess, axiosInstance }) => {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            await axiosInstance.delete(`/api/agents/delete/${id}/`);
            onSuccess();
        } catch (err) {
            console.error("Erreur:", err);
            alert("Erreur lors de la suppression");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="w-[500px] bg-[#FCFAFA] shadow-2xl p-8 rounded-none">
                <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FFD21E" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 8v4M12 16h.01" />
                        </svg>
                    </div>
                </div>
                <h2 className="text-xl font-semibold text-center mb-2">Confirmation</h2>
                <p className="text-center text-gray-600 mb-6">
                    Êtes-vous sûr de vouloir supprimer cet agent ?
                </p>
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={onCancel}
                        className="px-6 py-2 rounded-[25px] bg-gray-200 hover:bg-gray-300 transition"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={loading}
                        className="px-6 py-2 rounded-[25px] bg-red-500 text-white hover:bg-red-600 transition disabled:opacity-50"
                    >
                        {loading ? 'Suppression...' : 'Supprimer'}
                    </button>
                </div>
            </div>
        </div>
    );
};