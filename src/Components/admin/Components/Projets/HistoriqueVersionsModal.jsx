import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HistoriqueVersionsModal = ({ isOpen, onClose, projet, axiosInstance }) => {
    const [versions, setVersions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen && projet) {
            fetchVersions();
        }
    }, [isOpen, projet]);

    const fetchVersions = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/recap/budget/projet/${projet.code_division}/versions/`);
            setVersions(response.data.versions || []);
        } catch (err) {
            console.error("Erreur chargement versions:", err);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen || !projet) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, y: 30 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.95, y: 30 }}
                        className="bg-white rounded-2xl shadow-2xl w-[700px] max-w-[90vw] max-h-[80vh] overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="bg-gradient-to-r from-[#FF8500] to-[#FFA500] px-6 py-4">
                            <h3 className="text-white font-bold text-lg">Historique des versions</h3>
                            <p className="text-white/80 text-sm">{projet.code_division} - {projet.libelle}</p>
                        </div>
                        <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
                            {loading ? (
                                <div className="flex justify-center py-8"><div className="w-8 h-8 border-4 border-[#FF8500] border-t-transparent rounded-full animate-spin" /></div>
                            ) : versions.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">Aucune version antérieure</div>
                            ) : (
                                <div className="space-y-3">
                                    {versions.map((version, idx) => (
                                        <div key={idx} className="border rounded-xl p-4 hover:bg-gray-50">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <div className="font-medium text-gray-800">Version {version.numero}</div>
                                                    <div className="text-xs text-gray-400">Créée le {new Date(version.date_creation).toLocaleDateString()}</div>
                                                </div>
                                                <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">{version.statut}</span>
                                            </div>
                                            <div className="mt-2 text-sm text-gray-600">{version.modifications}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default HistoriqueVersionsModal;