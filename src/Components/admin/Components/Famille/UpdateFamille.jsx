import React, { useState, useEffect } from 'react';

const UpdateFamille = ({ famille, onCancel, onSuccess, axiosInstance }) => {
    const [formData, setFormData] = useState({
        nom_famille: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (famille) {
            setFormData({
                nom_famille: famille.nom_famille || ''
            });
        }
    }, [famille]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await axiosInstance.put(`/params/familles/${famille._id}`, {
                nom_famille: formData.nom_famille
            });
            onSuccess('Famille modifiée avec succès');
        } catch (err) {
            console.error("Erreur:", err);
            setError(err.response?.data?.message || "Erreur lors de la modification");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="w-[550px] bg-white shadow-2xl p-6 rounded-[20px]">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <h1 className="text-lg font-semibold text-gray-800">Modifier Famille</h1>
                    <button onClick={onCancel} className="p-1 hover:bg-gray-100 rounded-full transition">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18M6 6L18 18" stroke="#4F4F4F" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </button>
                </div>

                {error && (
                    <div className="mt-4 p-2 bg-red-50 text-red-600 text-sm rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Code</label>
                        <input 
                            type="text" 
                            value={famille.code_famille} 
                            disabled 
                            className="w-full h-10 px-3 rounded-[20px] border border-gray-300 bg-gray-100 text-gray-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom <span className="text-red-500">*</span></label>
                        <input 
                            type="text" 
                            name="nom_famille"
                            value={formData.nom_famille} 
                            onChange={handleInputChange} 
                            required 
                            className="w-full h-10 px-3 rounded-[20px] border border-gray-300 focus:border-[#FF8500] outline-none transition-colors"
                        />
                    </div>

                    <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
                        <button type="button" onClick={onCancel} className="px-5 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-[25px] hover:bg-gray-300 transition">
                            Annuler
                        </button>
                        <button type="submit" disabled={loading} className="px-5 py-2 bg-[#FF8500] text-white text-sm font-medium rounded-[25px] hover:bg-[#e67800] transition disabled:opacity-50 flex items-center gap-2">
                            {loading && <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>}
                            {loading ? 'Modification...' : 'Modifier'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateFamille;