// import React, { useRef, useState, useCallback } from "react";
// import { motion } from 'framer-motion';
// import { 
//   MapPin, 
//   Building2, 
//   Layers, 
//   FolderTree,
//   Package, 
//   BadgeDollarSign,
//   ChevronRight,
//   Download,
//   RefreshCw,
//   Clock,
//   CheckCircle,
//   AlertCircle,
//   Send,
//   Loader2,
//   Globe,
//   Target,
//   Landmark,
//   TrendingUp,
//   PieChart,
//   BarChart3
// } from "lucide-react";
// import useRegionalDirectorDashboard from "../../../hooks/useRegionalDirectorDashboard";

// // Couleurs principales
// const COLORS = {
//   primary: '#0E47C8',
//   secondary: '#FF8500',
//   danger: '#EF4444',
//   success: '#10B981',
//   warning: '#F59E0B',
//   info: '#3B82F6',
//   primaryLight: '#0E47C820',
//   secondaryLight: '#FF850020',
// };

// // Composant KPI Card
// const KPICard = ({ title, value, icon: Icon, colorType, suffix, onClick }) => {
//   const isPrimary = colorType === 'primary';
//   const mainColor = isPrimary ? COLORS.primary : COLORS.secondary;
//   const bgLight = isPrimary ? COLORS.primaryLight : COLORS.secondaryLight;
  
//   return (
//     <motion.div
//       whileHover={{ y: -5, scale: 1.02 }}
//       whileTap={{ scale: 0.98 }}
//       onClick={onClick}
//       className="relative bg-white rounded-2xl shadow-sm border border-gray-100 p-6 cursor-pointer transition-all duration-300 hover:shadow-xl overflow-hidden group"
//     >
//       <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//         style={{ background: `linear-gradient(135deg, ${bgLight} 0%, transparent 100%)` }} />
//       <div className="relative z-10">
//         <div className="flex items-center justify-between mb-4">
//           <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: bgLight }}>
//             <Icon className="w-6 h-6" style={{ color: mainColor, strokeWidth: 1.5 }} />
//           </div>
//           <ChevronRight className="w-5 h-5 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
//         </div>
//         <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
//         <div className="flex items-baseline gap-2">
//           <span className="text-3xl font-bold text-gray-800">{value?.toLocaleString() || 0}</span>
//           {suffix && <span className="text-sm text-gray-400">{suffix}</span>}
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // Composant StatCard
// const StatCard = ({ title, value, icon: Icon, colorType, suffix, onClick }) => {
//   const isPrimary = colorType === 'primary';
//   const mainColor = isPrimary ? COLORS.primary : COLORS.secondary;
//   const bgLight = isPrimary ? COLORS.primaryLight : COLORS.secondaryLight;
  
//   return (
//     <motion.div
//       whileHover={{ y: -3, scale: 1.01 }}
//       whileTap={{ scale: 0.98 }}
//       onClick={onClick}
//       className="relative bg-white rounded-xl shadow-sm border border-gray-100 p-5 cursor-pointer transition-all duration-300 hover:shadow-md overflow-hidden group"
//     >
//       <div className="relative z-10">
//         <div className="flex items-center justify-between mb-3">
//           <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: bgLight }}>
//             <Icon className="w-5 h-5" style={{ color: mainColor, strokeWidth: 1.5 }} />
//           </div>
//         </div>
//         <div>
//           <h4 className="text-2xl font-bold text-gray-800">{value?.toLocaleString() || 0}</h4>
//           <p className="text-xs text-gray-500 mt-1 font-medium">{title}</p>
//           {suffix && <p className="text-xs text-gray-400 mt-0.5">{suffix}</p>}
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // Composant Donut Chart pour les stats de région
// const RegionalProgressChart = ({ regionStats }) => {
//   const size = 220;
//   const strokeWidth = 35;
//   const radius = (size - strokeWidth) / 2;
//   const circumference = 2 * Math.PI * radius;
//   const cx = size / 2;
//   const cy = size / 2;

//   const total = regionStats.projets || 0;
//   const valides = regionStats.valides || 0;
//   const soumis = regionStats.soumis?.total || 0;
//   const rejetes = regionStats.rejetes?.total || 0;
//   const en_cours = regionStats.en_cours || 0;

//   const pValides = total > 0 ? valides / total : 0;
//   const pSoumis = total > 0 ? soumis / total : 0;
//   const pRejetes = total > 0 ? rejetes / total : 0;
//   const pEnCours = total > 0 ? en_cours / total : 0;

//   const dashValides = pValides * circumference;
//   const dashSoumis = pSoumis * circumference;
//   const dashRejetes = pRejetes * circumference;
//   const dashEnCours = pEnCours * circumference;

//   const offValides = 0;
//   const offSoumis = -(dashValides);
//   const offRejetes = -(dashValides + dashSoumis);
//   const offEnCours = -(dashValides + dashSoumis + dashRejetes);

//   const legendItems = [
//     { color: COLORS.success, label: 'Validés', count: valides, pct: Math.round(pValides * 100) },
//     { color: COLORS.secondary, label: 'Soumis', count: soumis, pct: Math.round(pSoumis * 100) },
//     { color: COLORS.warning, label: 'En cours', count: en_cours, pct: Math.round(pEnCours * 100) },
//     { color: COLORS.danger, label: 'Rejetés', count: rejetes, pct: Math.round(pRejetes * 100) },
//   ];

//   const tauxValidation = total > 0 ? Math.round((valides / total) * 100) : 0;

//   return (
//     <div className="flex flex-col items-center w-full">
//       <div className="relative" style={{ width: size, height: size }}>
//         <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
//           <circle cx={cx} cy={cy} r={radius} fill="none" stroke="#E5E7EB" strokeWidth={strokeWidth} />

//           {pEnCours > 0.005 && (
//             <motion.circle
//               cx={cx} cy={cy} r={radius} fill="none" stroke={COLORS.warning}
//               strokeWidth={strokeWidth} strokeLinecap="butt"
//               style={{ strokeDasharray: `${dashEnCours} ${circumference}`, strokeDashoffset: offEnCours }}
//               transform={`rotate(-90 ${cx} ${cy})`}
//               initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
//             />
//           )}
//           {pRejetes > 0.005 && (
//             <motion.circle
//               cx={cx} cy={cy} r={radius} fill="none" stroke={COLORS.danger}
//               strokeWidth={strokeWidth} strokeLinecap="butt"
//               style={{ strokeDashoffset: offRejetes }}
//               transform={`rotate(-90 ${cx} ${cy})`}
//               initial={{ strokeDasharray: `0 ${circumference}` }}
//               animate={{ strokeDasharray: `${dashRejetes} ${circumference}` }}
//               transition={{ duration: 1.0, ease: "easeOut", delay: 0.4 }}
//             />
//           )}
//           {pSoumis > 0.005 && (
//             <motion.circle
//               cx={cx} cy={cy} r={radius} fill="none" stroke={COLORS.secondary}
//               strokeWidth={strokeWidth} strokeLinecap="butt"
//               style={{ strokeDashoffset: offSoumis }}
//               transform={`rotate(-90 ${cx} ${cy})`}
//               initial={{ strokeDasharray: `0 ${circumference}` }}
//               animate={{ strokeDasharray: `${dashSoumis} ${circumference}` }}
//               transition={{ duration: 1.0, ease: "easeOut", delay: 0.2 }}
//             />
//           )}
//           {pValides > 0.005 && (
//             <motion.circle
//               cx={cx} cy={cy} r={radius} fill="none" stroke={COLORS.success}
//               strokeWidth={strokeWidth} strokeLinecap="butt"
//               style={{ strokeDashoffset: offValides }}
//               transform={`rotate(-90 ${cx} ${cy})`}
//               initial={{ strokeDasharray: `0 ${circumference}` }}
//               animate={{ strokeDasharray: `${dashValides} ${circumference}` }}
//               transition={{ duration: 1.0, ease: "easeOut", delay: 0.0 }}
//             />
//           )}
//         </svg>

//         <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5, delay: 0.8 }}
//             className="text-center"
//           >
//             <span className="text-3xl font-bold" style={{ color: COLORS.primary }}>{tauxValidation}%</span>
//             <p className="text-xs text-gray-500 mt-1 leading-tight">
//               {valides} / {total}<br />projets validés
//             </p>
//           </motion.div>
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-2 mt-4 w-full px-2">
//         {legendItems.map((item) => (
//           <div key={item.label} className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: item.color }} />
//               <span className="text-xs text-gray-600">{item.label}</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <span className="text-xs font-semibold text-gray-800">{item.count}</span>
//               <span className="text-xs px-1.5 py-0.5 rounded-full font-medium" style={{ backgroundColor: item.color + '20', color: item.color }}>
//                 {item.pct}%
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // Composant Top Périmètres
// const TopPerimetresChart = ({ perimetres }) => {
//   if (!perimetres || perimetres.length === 0) {
//     return (
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//         <p className="text-center text-gray-400">Aucune donnée disponible</p>
//       </div>
//     );
//   }
  
//   const maxBudget = Math.max(...perimetres.map(p => p.budget_total));
  
//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h3 className="text-lg font-semibold text-gray-800">Top Périmètres</h3>
//           <p className="text-sm text-gray-500 mt-1">Budget par activité</p>
//         </div>
//         <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: COLORS.info + '20' }}>
//           <Layers className="w-5 h-5" style={{ color: COLORS.info }} />
//         </div>
//       </div>
//       <div className="space-y-4">
//         {perimetres.slice(0, 5).map((perimetre, idx) => (
//           <div key={perimetre.activite} className="group">
//             <div className="flex items-center justify-between mb-1">
//               <div className="flex items-center gap-2">
//                 <span className="text-xs font-bold text-gray-400 w-5">#{idx + 1}</span>
//                 <span className="text-sm text-gray-700">{perimetre.nom || perimetre.activite}</span>
//               </div>
//               <span className="text-sm font-semibold text-gray-800">
//                 {(perimetre.budget_total / 1000).toFixed(1)} M DA
//               </span>
//             </div>
//             <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
//               <motion.div
//                 initial={{ width: 0 }}
//                 animate={{ width: `${(perimetre.budget_total / maxBudget) * 100}%` }}
//                 transition={{ duration: 0.8, delay: idx * 0.1 }}
//                 className="absolute inset-y-0 left-0 rounded-full"
//                 style={{ background: `linear-gradient(90deg, ${COLORS.primary} 0%, ${COLORS.info} 100%)` }}
//               />
//             </div>
//             <p className="text-xs text-gray-400 mt-1">{perimetre.total} projet(s)</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // Composant Tableau des structures
// const StructuresTable = ({ structures, onSelectStructure }) => {
//   if (!structures || structures.length === 0) {
//     return (
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
//         <p className="text-gray-500">Aucune structure trouvée</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//       <div className="px-6 py-4 border-b border-gray-100">
//         <h3 className="text-lg font-semibold text-gray-800">Structures de la région</h3>
//         <p className="text-sm text-gray-500 mt-1">Statistiques par structure</p>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Structure</th>
//               <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
//               <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Soumis</th>
//               <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Validés</th>
//               <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Rejetés</th>
//               <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Budget (kDA)</th>
//               <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Taux</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {structures.map((struct, idx) => (
//               <motion.tr
//                 key={struct.code}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: idx * 0.05 }}
//                 className="hover:bg-gray-50 cursor-pointer transition-colors"
//                 onClick={() => onSelectStructure?.(struct)}
//               >
//                 <td className="px-6 py-4">
//                   <div className="flex items-center gap-2">
//                     <Building2 className="w-4 h-4 text-gray-400" />
//                     <span className="text-sm font-medium text-gray-800">{struct.nom}</span>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 text-center text-sm text-gray-600">{struct.total}</td>
//                 <td className="px-6 py-4 text-center text-sm text-orange-600 font-medium">{struct.soumis}</td>
//                 <td className="px-6 py-4 text-center text-sm text-green-600 font-medium">{struct.valides}</td>
//                 <td className="px-6 py-4 text-center text-sm text-red-600 font-medium">{struct.rejetes?.total || 0}</td>
//                 <td className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
//                   {(struct.budget_total / 1000).toFixed(1)} M
//                 </td>
//                 <td className="px-6 py-4 text-center">
//                   <div className="flex items-center justify-center gap-2">
//                     <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
//                       <div 
//                         className="h-full rounded-full"
//                         style={{ width: `${struct.taux_validation}%`, backgroundColor: COLORS.success }}
//                       />
//                     </div>
//                     <span className="text-xs font-medium text-gray-600">{struct.taux_validation}%</span>
//                   </div>
//                 </td>
//               </motion.tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// // Composant principal
// const RegionalDirectorDashboard = () => {
//   const dashboardRef = useRef(null);
//   const [exporting, setExporting] = useState(false);
  
//   const {
//     region,
//     stats,
//     structures,
//     perimetres,
//     familles,
//     loading,
//     error,
//     lastUpdate,
//     refreshData,
//     totalProjets,
//     totalValides,
//     totalSoumis,
//     totalRejetes,
//     totalEnCours,
//     tauxValidation,
//     budgetTotal,
//     topPerimetres,
//     topFamilles
//   } = useRegionalDirectorDashboard();

//   const handleExport = async () => {
//     const element = dashboardRef.current;
//     if (!element) return;

//     setExporting(true);
//     try {
//       const html2canvas = (await import('html2canvas')).default;
//       const jsPDF = (await import('jspdf')).default;

//       await new Promise(resolve => setTimeout(resolve, 200));

//       const canvas = await html2canvas(element, {
//         scale: 2,
//         backgroundColor: '#ffffff',
//         useCORS: true,
//         logging: false,
//       });

//       const imgData = canvas.toDataURL('image/png');
//       const imgWidth = canvas.width;
//       const imgHeight = canvas.height;
//       const pdfWidth = 210;
//       const pdfHeight = (imgHeight * pdfWidth) / imgWidth;
      
//       const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
//       pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
      
//       const dateStr = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
//       pdf.save(`Dashboard_Region_${region.code || 'region'}_${dateStr}.pdf`);
      
//     } catch (err) {
//       console.error('Erreur export PDF:', err);
//       alert("Une erreur est survenue lors de l'export du PDF.");
//     } finally {
//       setExporting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"
//             style={{ borderColor: `${COLORS.secondary} transparent transparent transparent` }} />
//           <p className="text-gray-500">Chargement du dashboard région...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
//         <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
//           <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
//           <h2 className="text-xl font-bold text-gray-800 mb-2">Erreur de chargement</h2>
//           <p className="text-gray-500">{error}</p>
//           <button 
//             onClick={refreshData} 
//             className="mt-4 px-4 py-2 rounded-xl text-white" 
//             style={{ backgroundColor: COLORS.secondary }}
//           >
//             Réessayer
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       {/* Header */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-white border-b sticky top-0 z-10 backdrop-blur-sm bg-white/95"
//         style={{ borderBottomColor: `${COLORS.primary}20` }}
//       >
//         <div className="px-8 py-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <div className="flex items-center gap-3">
//                 <MapPin className="w-8 h-8" style={{ color: COLORS.primary }} />
//                 <h1 className="text-2xl font-bold" style={{ color: COLORS.primary }}>
//                   Dashboard Région
//                 </h1>
//               </div>
//               <p className="text-gray-500 mt-1">
//                 {region.nom || region.code} - Vue d'ensemble des projets structurants
//               </p>
//             </div>
//             <div className="flex items-center gap-4">
//               {lastUpdate && (
//                 <div className="text-sm text-gray-400 flex items-center gap-2">
//                   <Clock className="w-4 h-4" />
//                   Dernière mise à jour: {lastUpdate.toLocaleTimeString('fr-FR')}
//                 </div>
//               )}
//               <button
//                 onClick={refreshData}
//                 className="px-4 py-2 rounded-xl text-gray-600 transition-colors flex items-center gap-2 text-sm"
//                 style={{ backgroundColor: `${COLORS.primary}10` }}
//               >
//                 <RefreshCw className="w-3.5 h-3.5" />
//                 Rafraîchir
//               </button>
//               <button
//                 onClick={handleExport}
//                 disabled={exporting}
//                 className="px-3 py-1.5 rounded-lg text-white transition-all flex items-center gap-1.5 disabled:opacity-70 text-sm"
//                 style={{ backgroundColor: COLORS.secondary }}
//               >
//                 {exporting ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Génération...</> : <><Download className="w-3.5 h-3.5" /> PDF</>}
//               </button>
//             </div>
//           </div>
//         </div>
//       </motion.div>

//       {/* Contenu principal */}
//       <div ref={dashboardRef} className="p-8">
//         {/* KPI Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <KPICard title="Structures" value={structures.length} icon={Building2} colorType="primary" />
//           <KPICard title="Familles" value={familles.count || 0} icon={FolderTree} colorType="secondary" />
//           <KPICard title="Projets Totaux" value={totalProjets} icon={Package} colorType="primary" />
//           <KPICard title="Budget Total" value={Math.round(budgetTotal / 1000)} icon={BadgeDollarSign} colorType="secondary" suffix="M DA" />
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
//           <StatCard title="Projets Soumis" value={totalSoumis} icon={Send} colorType="secondary" />
//           <StatCard title="Projets Validés" value={totalValides} icon={CheckCircle} colorType="primary" />
//           <StatCard title="Projets Rejetés" value={totalRejetes} icon={AlertCircle} colorType="danger" />
//           <StatCard title="En Cours" value={totalEnCours} icon={TrendingUp} colorType="primary" />
//         </div>

//         {/* Charts Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
//           {/* Graphique en donut */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">Avancement des projets</h3>
//                 <p className="text-sm text-gray-500 mt-1">État d'avancement global</p>
//               </div>
//               <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: COLORS.primaryLight }}>
//                 <PieChart className="w-5 h-5" style={{ color: COLORS.primary }} />
//               </div>
//             </div>
//             <RegionalProgressChart regionStats={stats} />
//           </div>

//           {/* Top Périmètres */}
//           <TopPerimetresChart perimetres={topPerimetres} />
//         </div>



        
//       </div>
//     </div>
//   );
// };

// export default RegionalDirectorDashboard;
import React, { useRef, useState, useCallback } from "react";
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Building2, 
  Layers, 
  FolderTree,
  Package, 
  BadgeDollarSign,
  ChevronRight,
  Download,
  RefreshCw,
  Clock,
  CheckCircle,
  AlertCircle,
  Send,
  Loader2,
  Globe,
  Target,
  Landmark,
  TrendingUp,
  PieChart,
  BarChart3
} from "lucide-react";
import useRegionalDirectorDashboard from "../../../hooks/useRegionalDirectorDashboard";

// Couleurs principales
const COLORS = {
  primary: '#0E47C8',
  secondary: '#FF8500',
  danger: '#EF4444',
  success: '#10B981',
  warning: '#F59E0B',
  info: '#3B82F6',
  primaryLight: '#0E47C820',
  secondaryLight: '#FF850020',
};

// Composant KPI Card
const KPICard = ({ title, value, icon: Icon, colorType, suffix, onClick }) => {
  const isPrimary = colorType === 'primary';
  const mainColor = isPrimary ? COLORS.primary : COLORS.secondary;
  const bgLight = isPrimary ? COLORS.primaryLight : COLORS.secondaryLight;
  
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="relative bg-white rounded-2xl shadow-sm border border-gray-100 p-6 cursor-pointer transition-all duration-300 hover:shadow-xl overflow-hidden group"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(135deg, ${bgLight} 0%, transparent 100%)` }} />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: bgLight }}>
            <Icon className="w-6 h-6" style={{ color: mainColor, strokeWidth: 1.5 }} />
          </div>
          <ChevronRight className="w-5 h-5 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-gray-800">{value?.toLocaleString() || 0}</span>
          {suffix && <span className="text-sm text-gray-400">{suffix}</span>}
        </div>
      </div>
    </motion.div>
  );
};

// Composant StatCard
const StatCard = ({ title, value, icon: Icon, colorType, suffix, onClick }) => {
  const isPrimary = colorType === 'primary';
  const mainColor = isPrimary ? COLORS.primary : COLORS.secondary;
  const bgLight = isPrimary ? COLORS.primaryLight : COLORS.secondaryLight;
  
  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="relative bg-white rounded-xl shadow-sm border border-gray-100 p-5 cursor-pointer transition-all duration-300 hover:shadow-md overflow-hidden group"
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: bgLight }}>
            <Icon className="w-5 h-5" style={{ color: mainColor, strokeWidth: 1.5 }} />
          </div>
        </div>
        <div>
          <h4 className="text-2xl font-bold text-gray-800">{value?.toLocaleString() || 0}</h4>
          <p className="text-xs text-gray-500 mt-1 font-medium">{title}</p>
          {suffix && <p className="text-xs text-gray-400 mt-0.5">{suffix}</p>}
        </div>
      </div>
    </motion.div>
  );
};

// Composant Donut Chart pour les stats de région
const RegionalProgressChart = ({ regionStats }) => {
  const size = 220;
  const strokeWidth = 35;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const cx = size / 2;
  const cy = size / 2;

  const total = regionStats.projets || 0;
  const validesDR = regionStats.valides?.directeur_region || 0;
  const validesDivisionnaire = regionStats.valides?.divisionnaire || 0;
  const soumis = regionStats.soumis || 0;
  const rejetes = regionStats.rejetes?.total || 0;
  const en_cours = regionStats.en_cours || 0;

  const pValidesDR = total > 0 ? validesDR / total : 0;
  const pValidesDivisionnaire = total > 0 ? validesDivisionnaire / total : 0;
  const pSoumis = total > 0 ? soumis / total : 0;
  const pRejetes = total > 0 ? rejetes / total : 0;
  const pEnCours = total > 0 ? en_cours / total : 0;

  const dashValidesDR = pValidesDR * circumference;
  const dashValidesDivisionnaire = pValidesDivisionnaire * circumference;
  const dashSoumis = pSoumis * circumference;
  const dashRejetes = pRejetes * circumference;
  const dashEnCours = pEnCours * circumference;

  const offValidesDR = 0;
  const offValidesDivisionnaire = -(dashValidesDR);
  const offSoumis = -(dashValidesDR + dashValidesDivisionnaire);
  const offRejetes = -(dashValidesDR + dashValidesDivisionnaire + dashSoumis);
  const offEnCours = -(dashValidesDR + dashValidesDivisionnaire + dashSoumis + dashRejetes);

  const legendItems = [
    { color: COLORS.success, label: 'Validés DR', count: validesDR, pct: Math.round(pValidesDR * 100) },
    { color: COLORS.info, label: 'Validés Divisionnaire', count: validesDivisionnaire, pct: Math.round(pValidesDivisionnaire * 100) },
    { color: COLORS.secondary, label: 'Soumis', count: soumis, pct: Math.round(pSoumis * 100) },
    { color: COLORS.warning, label: 'En cours', count: en_cours, pct: Math.round(pEnCours * 100) },
    { color: COLORS.danger, label: 'Rejetés', count: rejetes, pct: Math.round(pRejetes * 100) },
  ];

  const tauxValidationDR = total > 0 ? Math.round((validesDR / total) * 100) : 0;

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle cx={cx} cy={cy} r={radius} fill="none" stroke="#E5E7EB" strokeWidth={strokeWidth} />

          {pEnCours > 0.005 && (
            <motion.circle
              cx={cx} cy={cy} r={radius} fill="none" stroke={COLORS.warning}
              strokeWidth={strokeWidth} strokeLinecap="butt"
              style={{ strokeDasharray: `${dashEnCours} ${circumference}`, strokeDashoffset: offEnCours }}
              transform={`rotate(-90 ${cx} ${cy})`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            />
          )}
          {pRejetes > 0.005 && (
            <motion.circle
              cx={cx} cy={cy} r={radius} fill="none" stroke={COLORS.danger}
              strokeWidth={strokeWidth} strokeLinecap="butt"
              style={{ strokeDashoffset: offRejetes }}
              transform={`rotate(-90 ${cx} ${cy})`}
              initial={{ strokeDasharray: `0 ${circumference}` }}
              animate={{ strokeDasharray: `${dashRejetes} ${circumference}` }}
              transition={{ duration: 1.0, ease: "easeOut", delay: 0.4 }}
            />
          )}
          {pSoumis > 0.005 && (
            <motion.circle
              cx={cx} cy={cy} r={radius} fill="none" stroke={COLORS.secondary}
              strokeWidth={strokeWidth} strokeLinecap="butt"
              style={{ strokeDashoffset: offSoumis }}
              transform={`rotate(-90 ${cx} ${cy})`}
              initial={{ strokeDasharray: `0 ${circumference}` }}
              animate={{ strokeDasharray: `${dashSoumis} ${circumference}` }}
              transition={{ duration: 1.0, ease: "easeOut", delay: 0.2 }}
            />
          )}
          {pValidesDivisionnaire > 0.005 && (
            <motion.circle
              cx={cx} cy={cy} r={radius} fill="none" stroke={COLORS.info}
              strokeWidth={strokeWidth} strokeLinecap="butt"
              style={{ strokeDashoffset: offValidesDivisionnaire }}
              transform={`rotate(-90 ${cx} ${cy})`}
              initial={{ strokeDasharray: `0 ${circumference}` }}
              animate={{ strokeDasharray: `${dashValidesDivisionnaire} ${circumference}` }}
              transition={{ duration: 1.0, ease: "easeOut", delay: 0.1 }}
            />
          )}
          {pValidesDR > 0.005 && (
            <motion.circle
              cx={cx} cy={cy} r={radius} fill="none" stroke={COLORS.success}
              strokeWidth={strokeWidth} strokeLinecap="butt"
              style={{ strokeDashoffset: offValidesDR }}
              transform={`rotate(-90 ${cx} ${cy})`}
              initial={{ strokeDasharray: `0 ${circumference}` }}
              animate={{ strokeDasharray: `${dashValidesDR} ${circumference}` }}
              transition={{ duration: 1.0, ease: "easeOut", delay: 0.0 }}
            />
          )}
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-center"
          >
            <span className="text-3xl font-bold" style={{ color: COLORS.primary }}>{tauxValidationDR}%</span>
            <p className="text-xs text-gray-500 mt-1 leading-tight">
              {validesDR} / {total}<br />projets validés DR
            </p>
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4 w-full px-2">
        {legendItems.map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: item.color }} />
              <span className="text-xs text-gray-600">{item.label}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-800">{item.count}</span>
              <span className="text-xs px-1.5 py-0.5 rounded-full font-medium" style={{ backgroundColor: item.color + '20', color: item.color }}>
                {item.pct}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Composant Top Périmètres
const TopPerimetresChart = ({ perimetres }) => {
  if (!perimetres || perimetres.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <p className="text-center text-gray-400">Aucune donnée disponible</p>
      </div>
    );
  }
  
  const maxBudget = Math.max(...perimetres.map(p => p.budget_total));
  
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Top Périmètres</h3>
          <p className="text-sm text-gray-500 mt-1">Budget par activité</p>
        </div>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: COLORS.info + '20' }}>
          <Layers className="w-5 h-5" style={{ color: COLORS.info }} />
        </div>
      </div>
      <div className="space-y-4">
        {perimetres.slice(0, 5).map((perimetre, idx) => (
          <div key={perimetre.activite} className="group">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-400 w-5">#{idx + 1}</span>
                <span className="text-sm text-gray-700">{perimetre.nom || perimetre.activite}</span>
              </div>
              <span className="text-sm font-semibold text-gray-800">
                {(perimetre.budget_total / 1000000).toFixed(1)} M DA
              </span>
            </div>
            <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(perimetre.budget_total / maxBudget) * 100}%` }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ background: `linear-gradient(90deg, ${COLORS.primary} 0%, ${COLORS.info} 100%)` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">{perimetre.total} projet(s)</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Composant Tableau des structures
const StructuresTable = ({ structures, onSelectStructure }) => {
  if (!structures || structures.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
        <p className="text-gray-500">Aucune structure trouvée</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800">Structures de la région</h3>
        <p className="text-sm text-gray-500 mt-1">Statistiques par structure</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Structure</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Soumis</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Validés DR</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Validés Div</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Rejetés</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Budget (M DA)</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Taux DR</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {structures.map((struct, idx) => (
              <motion.tr
                key={struct.code}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => onSelectStructure?.(struct)}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-800">{struct.nom}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center text-sm text-gray-600">{struct.total}</td>
                <td className="px-6 py-4 text-center text-sm text-orange-600 font-medium">{struct.soumis}</td>
                <td className="px-6 py-4 text-center text-sm text-green-600 font-medium">{struct.valides?.directeur_region || 0}</td>
                <td className="px-6 py-4 text-center text-sm text-blue-600 font-medium">{struct.valides?.divisionnaire || 0}</td>
                <td className="px-6 py-4 text-center text-sm text-red-600 font-medium">{struct.rejetes?.total || 0}</td>
                <td className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                  {(struct.budget_total / 1000000).toFixed(1)}
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full"
                        style={{ width: `${struct.taux_validation_dr || 0}%`, backgroundColor: COLORS.success }}
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-600">{struct.taux_validation_dr || 0}%</span>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Composant principal
const RegionalDirectorDashboard = () => {
  const dashboardRef = useRef(null);
  const [exporting, setExporting] = useState(false);
  
  const {
    region,
    stats,
    structures,
    perimetres,
    familles,
    loading,
    error,
    lastUpdate,
    refreshData,
    totalProjets,
    totalValidesDR,
    totalValidesDivisionnaire,
    totalSoumis,
    totalRejetes,
    totalEnCours,
    tauxValidationDR,
    tauxValidationGlobal,
    budgetTotal,
    topPerimetres,
    topFamilles
  } = useRegionalDirectorDashboard();

  const handleExport = async () => {
    const element = dashboardRef.current;
    if (!element) return;

    setExporting(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).default;

      await new Promise(resolve => setTimeout(resolve, 200));

      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const pdfWidth = 210;
      const pdfHeight = (imgHeight * pdfWidth) / imgWidth;
      
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
      
      const dateStr = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      pdf.save(`Dashboard_Region_${region.code || 'region'}_${dateStr}.pdf`);
      
    } catch (err) {
      console.error('Erreur export PDF:', err);
      alert("Une erreur est survenue lors de l'export du PDF.");
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"
            style={{ borderColor: `${COLORS.secondary} transparent transparent transparent` }} />
          <p className="text-gray-500">Chargement du dashboard région...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Erreur de chargement</h2>
          <p className="text-gray-500">{error}</p>
          <button 
            onClick={refreshData} 
            className="mt-4 px-4 py-2 rounded-xl text-white" 
            style={{ backgroundColor: COLORS.secondary }}
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b sticky top-0 z-10 backdrop-blur-sm bg-white/95"
        style={{ borderBottomColor: `${COLORS.primary}20` }}
      >
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <MapPin className="w-8 h-8" style={{ color: COLORS.primary }} />
                <h1 className="text-2xl font-bold" style={{ color: COLORS.primary }}>
                  Dashboard Région
                </h1>
              </div>
              <p className="text-gray-500 mt-1">
                {region.nom || region.code} - Vue d'ensemble des projets structurants
              </p>
            </div>
            <div className="flex items-center gap-4">
              {lastUpdate && (
                <div className="text-sm text-gray-400 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Dernière mise à jour: {lastUpdate.toLocaleTimeString('fr-FR')}
                </div>
              )}
              <button
                onClick={refreshData}
                className="px-4 py-2 rounded-xl text-gray-600 transition-colors flex items-center gap-2 text-sm"
                style={{ backgroundColor: `${COLORS.primary}10` }}
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Rafraîchir
              </button>
              <button
                onClick={handleExport}
                disabled={exporting}
                className="px-3 py-1.5 rounded-lg text-white transition-all flex items-center gap-1.5 disabled:opacity-70 text-sm"
                style={{ backgroundColor: COLORS.secondary }}
              >
                {exporting ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Génération...</> : <><Download className="w-3.5 h-3.5" /> PDF</>}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Contenu principal */}
      <div ref={dashboardRef} className="p-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <KPICard title="Structures" value={structures.length} icon={Building2} colorType="primary" />
          <KPICard title="Familles" value={familles.count || 0} icon={FolderTree} colorType="secondary" />
          <KPICard title="Projets Totaux" value={totalProjets} icon={Package} colorType="primary" />
          <KPICard title="Budget Total" value={Math.round(budgetTotal / 1000000)} icon={BadgeDollarSign} colorType="secondary" suffix="M DA" />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <StatCard title="Projets Soumis" value={totalSoumis} icon={Send} colorType="secondary" />
          <StatCard title="Validés DR" value={totalValidesDR} icon={CheckCircle} colorType="success" />
          <StatCard title="Validés Divisionnaire" value={totalValidesDivisionnaire} icon={CheckCircle} colorType="info" />
          <StatCard title="Projets Rejetés" value={totalRejetes} icon={AlertCircle} colorType="danger" />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Graphique en donut */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Avancement des projets</h3>
                <p className="text-sm text-gray-500 mt-1">État d'avancement global</p>
              </div>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: COLORS.primaryLight }}>
                <PieChart className="w-5 h-5" style={{ color: COLORS.primary }} />
              </div>
            </div>
            <RegionalProgressChart regionStats={stats} />
          </div>

          {/* Top Périmètres */}
          <TopPerimetresChart perimetres={topPerimetres} />
        </div>



        {/* Footer */}
        <div className="text-center text-xs text-gray-400 pt-6 mt-4 border-t border-gray-100">
          Document généré le {new Date().toLocaleDateString('fr-FR')} à {new Date().toLocaleTimeString('fr-FR')}
        </div>
      </div>
    </div>
  );
};

export default RegionalDirectorDashboard;