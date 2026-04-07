import React, { useState, useEffect, useRef } from 'react';
import { axiosInstance } from '../../axios';
import { ReactComponent as SearchIcon } from '../../Assets/Icons/Search.svg';
import { ReactComponent as UploadIcon } from '../../Assets/Icons/Arrow.svg';
import { ReactComponent as DownloadIcon } from '../../Assets/Icons/download-svgrepo-com.svg';
import { ReactComponent as EyeIcon } from '../../Assets/Icons/eye-svgrepo-com.svg';
import { ReactComponent as ArrowIcon } from '../../Assets/Icons/down-arrow-5-svgrepo-com.svg';
import { ReactComponent as EmptyIcon } from '../../Assets/Icons/notFound.svg';
import { ReactComponent as CloseIcon } from '../../Assets/Icons/close.svg';
import { ReactComponent as ExcelIcon } from '../../Assets/Icons/Account.svg';

const BudgetListe = () => {
    const [uploads, setUploads] = useState([]);
    const [filteredUploads, setFilteredUploads] = useState([]);
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const dynamicListRef = useRef(null);
    
    // États pour les modals
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [selectedUploadId, setSelectedUploadId] = useState(null);
    
    // États pour l'upload
    const [selectedFile, setSelectedFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [uploadLoading, setUploadLoading] = useState(false);
    
    // États pour les messages
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    
    // États pour la recherche
    const [searchTerm, setSearchTerm] = useState('');

    // 🔥 FONCTION DE FILTRAGE POUR EXCLURE "Version à transmettre"
    const filterUploads = (uploadsList) => {
        if (!uploadsList || uploadsList.length === 0) return [];
        
        // Mots-clés à exclure
        const excludeKeywords = [
            'version à transmettre', 
            'version a transmettre', 
            'version', 
            'transmettre',
            'à transmettre',
            'a transmettre'
        ];
        
        return uploadsList.filter(upload => {
            const fileName = upload.file_name?.toLowerCase() || '';
            
            // Vérifier si le fichier contient des mots à exclure
            const hasExcludeKeyword = excludeKeywords.some(keyword => 
                fileName.includes(keyword.toLowerCase())
            );
            
            // Garder uniquement les fichiers qui n'ont PAS les mots exclus
            return !hasExcludeKeyword;
        });
    };

    // Récupérer les uploads
    const fetchUploads = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/recap//uploads/');
            console.log("Uploads reçus:", response.data);
            setUploads(response.data);
            
            // Appliquer le filtre
            const filtered = filterUploads(response.data);
            setFilteredUploads(filtered);
            console.log("Uploads filtrés:", filtered);
        } catch (err) {
            console.error("Erreur:", err);
            setError("Impossible de charger les uploads");
            setTimeout(() => setError(''), 3000);
        } finally {
            setLoading(false);
        }
    };

    // Récupérer les records par upload
    const fetchRecords = async (uploadId) => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`/recap/records/?upload_id=${uploadId}`);
            console.log("Records reçus:", response.data);
            setRecords(response.data);
            setSelectedUploadId(uploadId);
            
            // Sauvegarder l'upload_id dans localStorage
            localStorage.setItem('current_upload_id', uploadId);
        } catch (err) {
            console.error("Erreur:", err);
            setError("Impossible de charger les données");
            setTimeout(() => setError(''), 3000);
        } finally {
            setLoading(false);
        }
    };

    // Télécharger PDF
    const handleDownloadPDF = async (recordId) => {
        try {
            const response = await axiosInstance.get(`/recap/export/pdf/${recordId}/`, {
                responseType: 'blob'
            });
            
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `budget_${recordId}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
            
            setSuccessMessage("PDF téléchargé avec succès");
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (err) {
            console.error("Erreur:", err);
            setError("Erreur lors du téléchargement");
            setTimeout(() => setError(''), 3000);
        }
    };

    // Upload de fichier
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

        setUploadLoading(true);
        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axiosInstance.post('/recap/upload/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            const uploadId = response.data.upload_id;
            if (uploadId) {
                localStorage.setItem('current_upload_id', uploadId);
                console.log("Upload ID stocké:", uploadId);
            }
            
            setSuccessMessage(response.data.message || 'Fichier importé avec succès');
            setShowSuccess(true);
            setShowUploadModal(false);
            setSelectedFile(null);
            setFilePreview(null);
            
            // Recharger la liste des uploads
            await fetchUploads();
            
            // Auto-sélectionner le nouvel upload
            if (uploadId) {
                await fetchRecords(uploadId);
            }
            
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (err) {
            console.error("Erreur:", err);
            setError(err.response?.data?.error || "Erreur lors de l'import");
            setTimeout(() => setError(''), 3000);
        } finally {
            setUploadLoading(false);
        }
    };

    const handleDeleteFile = () => {
        setSelectedFile(null);
        setFilePreview(null);
        if (document.getElementById('file-upload-budget')) {
            document.getElementById('file-upload-budget').value = '';
        }
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

    // Chargement initial
    useEffect(() => {
        const init = async () => {
            await fetchUploads();
            
            const savedUploadId = localStorage.getItem('current_upload_id');
            if (savedUploadId) {
                console.log("Chargement de l'upload sauvegardé:", savedUploadId);
                await fetchRecords(savedUploadId);
            }
        };
        
        init();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('fr-FR').format(value || 0) + ' DA';
    };

    const truncateText = (text, maxLength = 60) => {
        if (!text) return '-';
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    // Filtrage des projets
    const filteredRecords = records.filter(record => {
        const search = searchTerm.toLowerCase();
        return (
            (record.libelle?.toLowerCase().includes(search) || false) ||
            (record.region_nom?.toLowerCase().includes(search) || record.region?.toLowerCase().includes(search) || false) ||
            (record.famille_nom?.toLowerCase().includes(search) || record.famille?.toLowerCase().includes(search) || false) ||
            (record.activite_nom?.toLowerCase().includes(search) || record.activite?.toLowerCase().includes(search) || false)
        );
    });

    const getActiviteColor = (activite) => {
        const colors = {
            'Pétrole': 'bg-blue-100 text-blue-700',
            'Gaz': 'bg-green-100 text-green-700',
            'Pétrole & Gaz': 'bg-purple-100 text-purple-700'
        };
        return colors[activite] || 'bg-gray-100 text-gray-600';
    };

    const getRegionColor = (region) => {
        const colors = {
            'Hassi Messaoud': 'bg-orange-100 text-orange-700',
            'Hassi R\'Mel': 'bg-yellow-100 text-yellow-700',
            'In Amenas': 'bg-red-100 text-red-700'
        };
        return colors[region] || 'bg-gray-100 text-gray-600';
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
                            onClick={() => setShowUploadModal(true)}
                            className="font-kumbh text-sm font-medium px-3 py-2.5 rounded-[22px] text-white bg-[#FF8500] hover:bg-[#0E47C8] transition flex items-center gap-2"
                        >
                            <UploadIcon className="w-4 h-4" />
                            Importer Excel
                        </button>
                    </div>
                    <div className="flex gap-3">
                        {selectedUploadId && (
                            <span className="text-sm text-gray-500">
                                {records.length} projet(s)
                            </span>
                        )}
                        <span className="text-sm text-gray-400">
                            {filteredUploads.length} import(s)
                        </span>
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
                                placeholder="Rechercher par libellé, région, famille, activité..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full h-full border-0 outline-none px-4 font-kumbh placeholder:text-[#8A8A8A]"
                            />
                        </div>
                    </div>
                </div>

                {/* Uploads récents - FILTRÉS */}
                <div className="w-full mt-2 mb-6">
                    {/* <h3 className="text-sm font-medium text-gray-600 mb-2 px-2">Imports récen</h3> */}
                    <div className="flex gap-3 overflow-x-auto pb-2 px-2">
                        {filteredUploads.length > 0 ? (
                            filteredUploads.slice(0, 5).map((upload) => (
                                <button
                                    key={upload.id}
                                    onClick={() => fetchRecords(upload.id)}
                                    className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition ${
                                        selectedUploadId === upload.id
                                            ? 'bg-[#FF8500] text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {upload.file_name.length > 25 ? upload.file_name.substring(0, 22) + '...' : upload.file_name}
                                    <span className="text-xs ml-2 opacity-75">
                                        {formatDate(upload.uploaded_at)}
                                    </span>
                                </button>
                            ))
                        ) : (
                            <span className="text-sm text-gray-400 px-2">Aucun import récent</span>
                        )}
                    </div>
                </div>

                {/* Tableau des projets */}
                <div className="w-full mt-1">
                    <table className="w-full border-separate border-spacing-y-[7px]">
                        <thead className="w-full sticky top-0 z-10">
                            <tr>
                                <th className="font-medium text-sm text-[#727272] py-4 bg-[#F9F9F9] border border-[#E4E4E4] border-l border-r-0 rounded-l-lg text-left pl-4 w-[30%]">
                                    Libellé / Activité
                                </th>
                                <th className="font-medium text-sm text-[#727272] py-4 bg-[#F9F9F9] border border-[#E4E4E4] border-l-0 border-r-0 w-[15%]">
                                    Région
                                </th>
                                <th className="font-medium text-sm text-[#727272] py-4 bg-[#F9F9F9] border border-[#E4E4E4] border-l-0 border-r-0 w-[20%]">
                                    Famille
                                </th>
                                <th className="font-medium text-sm text-[#727272] py-4 bg-[#F9F9F9] border border-[#E4E4E4] border-l-0 border-r-0 w-[15%]">
                                    Coût initial
                                </th>
                                <th className="font-medium text-sm text-[#727272] py-4 bg-[#F9F9F9] border border-[#E4E4E4] border-l-0 border-r rounded-r-lg text-right pr-4 w-[20%]">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        {selectedUploadId && records.length > 0 && (
                            <tbody>
                                {filteredRecords.map((record) => (
                                    <tr key={record.id} className="hover:bg-gray-50 transition">
                                        <td className="font-normal text-sm text-[#060606] py-3 px-4 border border-[#E4E4E4] border-l border-r-0 rounded-l-lg">
                                            <div>
                                                <div className="font-medium">{truncateText(record.libelle, 50)}</div>
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${getActiviteColor(record.activite_nom || record.activite)}`}>
                                                    {record.activite_nom || record.activite || '-'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="font-normal text-sm text-[#060606] py-3 border border-[#E4E4E4] border-l-0 border-r-0 text-center">
                                            <span className={`text-xs px-2 py-0.5 rounded-full ${getRegionColor(record.region_nom || record.region)}`}>
                                                {record.region_nom || record.region || '-'}
                                            </span>
                                        </td>
                                        <td className="font-normal text-sm text-[#060606] py-3 border border-[#E4E4E4] border-l-0 border-r-0 text-center">
                                            {record.famille_nom || record.famille || '-'}
                                        </td>
                                        <td className="font-normal text-sm text-[#060606] py-3 border border-[#E4E4E4] border-l-0 border-r-0 text-center">
                                            <span className="font-bold text-[#FF8500]">
                                                {formatCurrency(record.cout_initial_total)}
                                            </span>
                                        </td>
                                        <td className="py-3 border border-[#E4E4E4] border-l-0 border-r rounded-r-lg text-right pr-4">
                                            <div className="flex gap-2 justify-end">
                                                <button 
                                                    onClick={() => {
                                                        setSelectedRecord(record);
                                                        setShowDetailModal(true);
                                                    }}
                                                    className="px-3 py-1.5 rounded-[20px] bg-[#E2E4E5]/40 hover:bg-[#E2E4E5] flex items-center gap-1.5 text-xs transition"
                                                >
                                                    <EyeIcon className="w-4 h-4" />
                                                    Voir plus
                                                </button>
                                                <button 
                                                    onClick={() => handleDownloadPDF(record.id)}
                                                    className="px-3 py-1.5 rounded-[20px] bg-[#E2E4E5]/40 hover:bg-[#E2E4E5] flex items-center gap-1.5 text-xs transition"
                                                >
                                                    <DownloadIcon className="w-4 h-4" />
                                                    PDF
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        )}
                    </table>

                    {/* Aucun projet */}
                    {selectedUploadId && records.length === 0 && !loading && (
                        <div className="w-full h-[calc(100vh-400px)] bg-[#F9F9F9] rounded-lg border-3 border-[#E4E4E4] flex flex-col justify-center items-center gap-6">
                            <EmptyIcon className="w-[200px] h-[170px]" />
                            <div className="flex flex-col gap-1 items-center">
                                <h1 className="text-2xl font-bold text-[#060606]">Aucun projet trouvé</h1>
                                <span className="text-center text-[#4F4F4F] font-medium">
                                    Importez un fichier Excel pour commencer
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Aucun upload sélectionné */}
                    {!selectedUploadId && !loading && (
                        <div className="w-full h-[calc(100vh-400px)] bg-[#F9F9F9] rounded-lg border-3 border-[#E4E4E4] flex flex-col justify-center items-center gap-6">
                            <EmptyIcon className="w-[200px] h-[170px]" />
                            <div className="flex flex-col gap-1 items-center">
                                <h1 className="text-2xl font-bold text-[#060606]">Aucun import sélectionné</h1>
                                <span className="text-center text-[#4F4F4F] font-medium">
                                    Sélectionnez un import récent ou importez un nouveau fichier
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

            {/* Modal Upload */}
            {showUploadModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="w-[550px] bg-white shadow-lg p-6">
                        <div className="flex justify-between items-center pb-3 mb-4 border-b border-gray-200">
                            <h1 className="text-lg font-semibold text-gray-800">Importer Excel</h1>
                            <button 
                                onClick={() => {
                                    setShowUploadModal(false);
                                    setSelectedFile(null);
                                    setFilePreview(null);
                                }} 
                                className="p-1 hover:bg-gray-100 rounded-full"
                            >
                                <CloseIcon className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <form onSubmit={handleFileUpload} className="space-y-4">
                            <div className="w-full h-40 bg-gray-50 border-2 border-dashed border-gray-300 rounded-[20px] flex flex-col justify-center items-center transition hover:border-[#FF8500]">
                                <ExcelIcon className="w-12 h-12 text-gray-400" />
                                <p className="text-sm text-gray-600 mt-2">Glissez votre fichier Excel ici ou</p>
                                <button
                                    type="button"
                                    onClick={() => document.getElementById('file-upload-budget').click()}
                                    className="mt-2 px-4 py-1.5 bg-[#FF8500] text-white text-sm font-medium rounded-[25px] hover:bg-[#e67800] transition"
                                >
                                    Choisir un fichier
                                </button>
                                <input
                                    type="file"
                                    id="file-upload-budget"
                                    accept=".xlsx,.xls"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </div>

                            {selectedFile && (
                                <div className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-[25px]">
                                    <div className="flex items-center gap-2">
                                        <ExcelIcon className="w-4 h-4 text-[#FF8500]" />
                                        <p className="text-xs text-gray-700 truncate max-w-[300px]">{filePreview}</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleDeleteFile}
                                        className="p-1 hover:bg-gray-200 rounded-full"
                                    >
                                        <CloseIcon className="w-4 h-4 text-gray-500" />
                                    </button>
                                </div>
                            )}

                            <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowUploadModal(false);
                                        setSelectedFile(null);
                                        setFilePreview(null);
                                    }}
                                    className="px-5 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-[25px] hover:bg-gray-300 transition"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    disabled={!selectedFile || uploadLoading}
                                    className={`px-5 py-2 text-white text-sm font-medium rounded-[25px] transition flex items-center gap-2 ${
                                        selectedFile && !uploadLoading
                                            ? 'bg-[#FF8500] hover:bg-[#e67800]' 
                                            : 'bg-gray-300 cursor-not-allowed'
                                    }`}
                                >
                                    {uploadLoading && (
                                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                                        </svg>
                                    )}
                                    {uploadLoading ? 'Import...' : 'Importer'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Détails */}

            {/* Modal Détails - Scroll invisible */}
{showDetailModal && selectedRecord && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="w-[900px] max-h-[90vh] bg-white shadow-2xl rounded-xl flex flex-col">
            
            {/* Header - Fixe */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-white rounded-t-3xl flex-shrink-0">
                <div>
                    <h2 className="text-l font-bold text-gray-800">Détails du projet</h2>
                    <p className="text-sm text-gray-500 mt-1">{selectedRecord.libelle || 'Projet'}</p>
                </div>
                <button 
                    onClick={() => setShowDetailModal(false)} 
                    className="p-2 hover:bg-gray-100 rounded-full transition"
                >
                    <CloseIcon className="w-5 h-5 text-gray-500" />
                </button>
            </div>

            {/* Contenu - Scrollable avec barre invisible */}
            <div className="flex-1 overflow-y-auto scrollbar-none p-6">
                <div className="space-y-6">
                    
                    {/* Info générale */}
                    <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 bg-[#FF8500] rounded-full"></span>
                            Informations générales
                        </h3>
                        <div className="grid grid-cols-2 gap-5">
                            <div className="bg-white rounded-xl p-3 border border-gray-100">
                                <span className="text-xs text-gray-400 block">Libellé</span>
                                <p className="font-medium text-gray-800 mt-1">{selectedRecord.libelle || '-'}</p>
                            </div>
                            <div className="bg-white rounded-xl p-3 border border-gray-100">
                                <span className="text-xs text-gray-400 block">Activité</span>
                                <p className="font-medium text-gray-800 mt-1">{selectedRecord.activite_nom || selectedRecord.activite || '-'}</p>
                            </div>
                            <div className="bg-white rounded-xl p-3 border border-gray-100">
                                <span className="text-xs text-gray-400 block">Région</span>
                                <p className="font-medium text-gray-800 mt-1">{selectedRecord.region_nom || selectedRecord.region || '-'}</p>
                            </div>
                            <div className="bg-white rounded-xl p-3 border border-gray-100">
                                <span className="text-xs text-gray-400 block">Famille</span>
                                <p className="font-medium text-gray-800 mt-1">{selectedRecord.famille_nom || selectedRecord.famille || '-'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Coûts */}
                    <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 bg-[#FF8500] rounded-full"></span>
                            Coûts
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white rounded-xl p-3 border border-gray-100">
                                <span className="text-xs text-gray-400 block">Coût initial total</span>
                                <p className="font-bold text-[#FF8500] text-lg mt-1">{formatCurrency(selectedRecord.cout_initial_total)}</p>
                            </div>
                            <div className="bg-white rounded-xl p-3 border border-gray-100">
                                <span className="text-xs text-gray-400 block">Coût initial DEX</span>
                                <p className="font-medium text-gray-700 mt-1">{formatCurrency(selectedRecord.cout_initial_dont_dex)}</p>
                            </div>
                            <div className="bg-white rounded-xl p-3 border border-gray-100">
                                <span className="text-xs text-gray-400 block">Réalisation S1 total</span>
                                <p className="font-medium text-gray-700 mt-1">{formatCurrency(selectedRecord.real_s1_n_total)}</p>
                            </div>
                            <div className="bg-white rounded-xl p-3 border border-gray-100">
                                <span className="text-xs text-gray-400 block">Réalisation S1 DEX</span>
                                <p className="font-medium text-gray-700 mt-1">{formatCurrency(selectedRecord.real_s1_n_dont_dex)}</p>
                            </div>
                            <div className="bg-white rounded-xl p-3 border border-gray-100">
                                <span className="text-xs text-gray-400 block">Prévision S2 total</span>
                                <p className="font-medium text-gray-700 mt-1">{formatCurrency(selectedRecord.prev_s2_n_total)}</p>
                            </div>
                            <div className="bg-white rounded-xl p-3 border border-gray-100">
                                <span className="text-xs text-gray-400 block">Prévision S2 DEX</span>
                                <p className="font-medium text-gray-700 mt-1">{formatCurrency(selectedRecord.prev_s2_n_dont_dex)}</p>
                            </div>
                            <div className="bg-white rounded-xl p-3 border border-gray-100 col-span-2">
                                <span className="text-xs text-gray-400 block">Reste à réaliser</span>
                                <p className="font-bold text-red-500 text-lg mt-1">{formatCurrency(selectedRecord.reste_a_realiser_total)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Prévisions futures */}
                    <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 bg-[#FF8500] rounded-full"></span>
                            Prévisions futures
                        </h3>
                        <div className="grid grid-cols-5 gap-3">
                            <div className="bg-white rounded-xl p-3 text-center border border-gray-100">
                                <span className="text-xs text-gray-400 block">N+1</span>
                                <p className="font-semibold text-gray-800 mt-1">{formatCurrency(selectedRecord.prev_n_plus1_total)}</p>
                            </div>
                            <div className="bg-white rounded-xl p-3 text-center border border-gray-100">
                                <span className="text-xs text-gray-400 block">N+2</span>
                                <p className="font-semibold text-gray-800 mt-1">{formatCurrency(selectedRecord.prev_n_plus2_total)}</p>
                            </div>
                            <div className="bg-white rounded-xl p-3 text-center border border-gray-100">
                                <span className="text-xs text-gray-400 block">N+3</span>
                                <p className="font-semibold text-gray-800 mt-1">{formatCurrency(selectedRecord.prev_n_plus3_total)}</p>
                            </div>
                            <div className="bg-white rounded-xl p-3 text-center border border-gray-100">
                                <span className="text-xs text-gray-400 block">N+4</span>
                                <p className="font-semibold text-gray-800 mt-1">{formatCurrency(selectedRecord.prev_n_plus4_total)}</p>
                            </div>
                            <div className="bg-white rounded-xl p-3 text-center border border-gray-100">
                                <span className="text-xs text-gray-400 block">N+5</span>
                                <p className="font-semibold text-gray-800 mt-1">{formatCurrency(selectedRecord.prev_n_plus5_total)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Répartition mensuelle */}
                    <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 bg-[#FF8500] rounded-full"></span>
                            Répartition mensuelle
                        </h3>
                        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                            {[
                                { mois: 'Jan', val: selectedRecord.janvier_total },
                                { mois: 'Fév', val: selectedRecord.fevrier_total },
                                { mois: 'Mar', val: selectedRecord.mars_total },
                                { mois: 'Avr', val: selectedRecord.avril_total },
                                { mois: 'Mai', val: selectedRecord.mai_total },
                                { mois: 'Juin', val: selectedRecord.juin_total },
                                { mois: 'Juil', val: selectedRecord.juillet_total },
                                { mois: 'Aoû', val: selectedRecord.aout_total },
                                { mois: 'Sep', val: selectedRecord.septembre_total },
                                { mois: 'Oct', val: selectedRecord.octobre_total },
                                { mois: 'Nov', val: selectedRecord.novembre_total },
                                { mois: 'Déc', val: selectedRecord.decembre_total },
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white rounded-xl p-3 text-center border border-gray-100 hover:shadow-md transition">
                                    <span className="text-xs font-semibold text-gray-500 block">{item.mois}</span>
                                    <p className="text-sm font-medium text-gray-800 mt-1">{formatCurrency(item.val)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer - Fixe */}
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-3xl flex-shrink-0">
                <button
                    onClick={() => setShowDetailModal(false)}
                    className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition font-medium"
                >
                    Fermer
                </button>
                <button
                    onClick={() => handleDownloadPDF(selectedRecord.id)}
                    className="px-6 py-2.5 bg-[#FF8500] text-white rounded-full hover:bg-[#e67800] transition flex items-center gap-2 font-medium shadow-md"
                >
                    <DownloadIcon className="w-4 h-4" />
                    Télécharger PDF
                </button>
            </div>
        </div>
    </div>
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

            {/* Message d'erreur */}
            {error && (
                <div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[300px] bg-red-500 text-white py-3 px-4 rounded-lg shadow-lg z-50">
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className="font-medium">{error}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BudgetListe;