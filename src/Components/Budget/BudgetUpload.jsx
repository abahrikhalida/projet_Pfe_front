import React, { useState } from 'react';
import axiosApi from '../../axios';

const BudgetUpload = ({ onCancel, onSuccess }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && (selectedFile.name.endsWith('.xlsx') || selectedFile.name.endsWith('.xls'))) {
            setFile(selectedFile);
            setError('');
        } else {
            setError('Veuillez sélectionner un fichier Excel (.xlsx ou .xls)');
            setFile(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Veuillez sélectionner un fichier');
            return;
        }

        setLoading(true);
        setError('');

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axiosApi.post('/upload/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            onSuccess(response.data.message || 'Fichier importé avec succès');
        } catch (err) {
            console.error("Erreur:", err);
            setError(err.response?.data?.error || "Erreur lors de l'import");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="w-[500px] bg-white rounded-none shadow-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">Importer Excel</h2>
                    <button onClick={onCancel} className="p-1 hover:bg-gray-100 rounded-full">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18M6 6L18 18" stroke="#4F4F4F" strokeWidth="2" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <input
                            type="file"
                            accept=".xlsx,.xls"
                            onChange={handleFileChange}
                            className="hidden"
                            id="file-upload"
                        />
                        <label
                            htmlFor="file-upload"
                            className="cursor-pointer flex flex-col items-center gap-2"
                        >
                            <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span className="text-gray-600">
                                {file ? file.name : 'Cliquez pour sélectionner un fichier Excel'}
                            </span>
                            <span className="text-xs text-gray-400">Format accepté: .xlsx, .xls</span>
                        </label>
                    </div>

                    {error && (
                        <div className="mt-4 p-2 bg-red-50 text-red-600 text-sm rounded-lg">
                            {error}
                        </div>
                    )}

                    <div className="flex gap-3 justify-end mt-6">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-5 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            disabled={loading || !file}
                            className="px-5 py-2 bg-[#FF8500] text-white rounded-full hover:bg-[#e67800] transition disabled:opacity-50"
                        >
                            {loading ? 'Import en cours...' : 'Importer'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BudgetUpload;