import React, { useState } from 'react';

const AjouterPerimetre = ({ onCancel, onSuccess, axiosInstance, regions }) => {
    const [formData, setFormData] = useState({
        region: '',
        code_perimetre: '',
        nom_perimetre: '',
        description: ''
    });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const response = await axiosInstance.post('/params/perimetres', formData, {
                headers: { 'Content-Type': 'application/json' }
            });
            
            if (response.data.success) {
                onSuccess('Périmètre ajouté avec succès');
            }
        } catch (err) {
            console.error("Erreur:", err);
            alert(err.response?.data?.message || "Erreur lors de l'ajout");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            {/* MODAL TAILLE MOYENNE - 550px */}
            <div className="w-[550px] bg-white shadow-lg p-6 font-poppins">
                
                {/* En-tête */}
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <h1 className="text-lg font-semibold text-gray-800">Ajouter Périmètre</h1>
                    <button onClick={onCancel} className="p-1 hover:bg-gray-100 rounded-full transition">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18M6 6L18 18" stroke="#4F4F4F" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    {/* Sélection Région */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                            Région <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="region"
                            value={formData.region}
                            onChange={handleInputChange}
                            required
                            className="w-full h-10 px-3 rounded-[20px] border border-gray-300 focus:border-[#FF8500] focus:ring-1 focus:ring-[#FF8500] outline-none bg-white text-left"
                        >
                            <option value="">-- Sélectionner une région --</option>
                            {regions.map(region => (
                                <option key={region.code_region} value={region.code_region}>
                                    {region.nom_region} ({region.code_region})
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Grille pour Code et Nom sur 2 colonnes */}
                    <div className="grid grid-cols-2 gap-3">
                        {/* Code périmètre */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                                Code <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="code_perimetre"
                                value={formData.code_perimetre}
                                onChange={handleInputChange}
                                required
                                className="w-full h-10 px-3 rounded-[20px] border border-gray-300 focus:border-[#FF8500] focus:ring-1 focus:ring-[#FF8500] outline-none text-left"
                                placeholder="PER001"
                            />
                        </div>

                        {/* Nom périmètre */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                                Nom <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="nom_perimetre"
                                value={formData.nom_perimetre}
                                onChange={handleInputChange}
                                required
                                className="w-full h-10 px-3 rounded-[20px] border border-gray-300 focus:border-[#FF8500] focus:ring-1 focus:ring-[#FF8500] outline-none text-left"
                                placeholder="Périmètre Nord"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows="3"
                            className="w-full px-3 py-2 rounded-[20px] border border-gray-300 focus:border-[#FF8500] focus:ring-1 focus:ring-[#FF8500] outline-none resize-none text-left"
                            placeholder="Description du périmètre (optionnelle)..."
                        />
                    </div>

                    {/* Boutons */}
                    <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-5 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-[20px] hover:bg-gray-300 transition"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-5 py-2 bg-[#FF8500] text-white text-sm font-medium rounded-[20px] hover:bg-[#e67800] transition disabled:opacity-50 flex items-center gap-2"
                        >
                            {loading && (
                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                                </svg>
                            )}
                            {loading ? 'Ajout en cours...' : 'Ajouter le périmètre'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AjouterPerimetre;