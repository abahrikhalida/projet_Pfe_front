
// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   Users, 
//   MapPin, 
//   Building2, 
//   Layers, 
//   GitBranch, 
//   DollarSign, 
//   Calendar,
//   TrendingUp,
//   TrendingDown,
//   BarChart3,
//   PieChart,
//   ChevronRight,
//   Download,
//   RefreshCw,
//   Eye,
//   Clock,
//   CheckCircle,
//   AlertCircle,
//   Activity,
//   Globe,
//   Briefcase,
//   FolderTree,
//   Landmark,
//   Package,
//   BadgeDollarSign,
//   TrendingUp as TrendingUpIcon,
//   Target,
//   Zap,
//   Shield,
//   Award
// } from "lucide-react";

// // Couleurs principales
// const COLORS = {
//   primary: '#0E47C8',
//   secondary: '#FF8500',
//   primaryLight: '#0E47C820',
//   secondaryLight: '#FF850020',
// };

// // Composant Circular Progress
// const CircularProgress = ({ value, size = 120, strokeWidth = 8, color }) => {
//   const radius = (size - strokeWidth) / 2;
//   const circumference = radius * 2 * Math.PI;
//   const offset = circumference - (value / 100) * circumference;
  
//   return (
//     <div className="relative" style={{ width: size, height: size }}>
//       <svg width={size} height={size} className="transform -rotate-90">
//         {/* Cercle de fond */}
//         <circle
//           cx={size / 2}
//           cy={size / 2}
//           r={radius}
//           fill="none"
//           stroke="#E5E7EB"
//           strokeWidth={strokeWidth}
//         />
//         {/* Cercle de progression */}
//         <motion.circle
//           cx={size / 2}
//           cy={size / 2}
//           r={radius}
//           fill="none"
//           stroke={color}
//           strokeWidth={strokeWidth}
//           strokeLinecap="round"
//           initial={{ strokeDashoffset: circumference }}
//           animate={{ strokeDashoffset: offset }}
//           transition={{ duration: 1.5, ease: "easeOut" }}
//           style={{
//             strokeDasharray: circumference,
//           }}
//         />
//       </svg>
//       <div className="absolute inset-0 flex items-center justify-center">
//         <motion.span
//           initial={{ opacity: 0, scale: 0 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5, delay: 0.5 }}
//           className="text-2xl font-bold"
//           style={{ color: color }}
//         >
//           {value}%
//         </motion.span>
//       </div>
//     </div>
//   );
// };

// // Composant KPI Card
// const KPICard = ({ title, value, subValue, icon: Icon, trend, colorType, onClick }) => {
//   const isPositive = trend && trend > 0;
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
//       <div 
//         className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//         style={{ background: `linear-gradient(135deg, ${bgLight} 0%, transparent 100%)` }}
//       />
      
//       <div className="relative z-10">
//         <div className="flex items-center justify-between mb-4">
//           <div 
//             className="w-12 h-12 rounded-xl flex items-center justify-center"
//             style={{ backgroundColor: bgLight }}
//           >
//             <Icon 
//               className="w-6 h-6" 
//               style={{ color: mainColor, strokeWidth: 1.5 }}
//               stroke="currentColor"
//               fill="none"
//             />
//           </div>
//           {trend !== undefined && (
//             <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
//               isPositive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
//             }`}>
//               {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
//               <span>{Math.abs(trend)}%</span>
//             </div>
//           )}
//         </div>
        
//         <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
//         <div className="flex items-baseline gap-2">
//           <span className="text-3xl font-bold text-gray-800">{value}</span>
//           {subValue && <span className="text-sm text-gray-400">{subValue}</span>}
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
//       <div 
//         className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//         style={{ background: `linear-gradient(135deg, ${bgLight} 0%, transparent 100%)` }}
//       />
      
//       <div className="relative z-10">
//         <div className="flex items-center justify-between mb-3">
//           <div 
//             className="w-10 h-10 rounded-xl flex items-center justify-center"
//             style={{ backgroundColor: bgLight }}
//           >
//             <Icon 
//               className="w-5 h-5" 
//               style={{ color: mainColor, strokeWidth: 1.5 }}
//               stroke="currentColor"
//               fill="none"
//             />
//           </div>
//           <div className="w-8 h-8 rounded-full bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//             <ChevronRight className="w-4 h-4 text-gray-400" />
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

// // Composant InfoItem
// const InfoItem = ({ label, value, icon: Icon, color }) => {
//   return (
//     <motion.div 
//       className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
//       whileHover={{ x: 5 }}
//     >
//       <div className="flex items-center gap-3">
//         <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}10` }}>
//           <Icon className="w-4 h-4" style={{ color }} strokeWidth={1.5} />
//         </div>
//         <span className="text-sm text-gray-600">{label}</span>
//       </div>
//       <span className="text-sm font-semibold" style={{ color }}>{value}</span>
//     </motion.div>
//   );
// };

// // Composant Top 5 Regions
// const TopRegionsChart = ({ regions }) => {
//   const maxValue = Math.max(...regions.map(r => r.budget));
  
//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h3 className="text-lg font-semibold text-gray-800">Top 5 Régions par Budget</h3>
//           <p className="text-sm text-gray-500 mt-1">Coût global initial en milliers DA</p>
//         </div>
//         <div 
//           className="w-10 h-10 rounded-xl flex items-center justify-center"
//           style={{ backgroundColor: COLORS.secondaryLight }}
//         >
//           <Globe className="w-5 h-5" style={{ color: COLORS.secondary, strokeWidth: 1.5 }} />
//         </div>
//       </div>
      
//       <div className="space-y-4">
//         {regions.map((region, index) => (
//           <motion.div
//             key={region.name}
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: index * 0.1 }}
//             className="group cursor-pointer"
//           >
//             <div className="flex items-center justify-between mb-1">
//               <div className="flex items-center gap-3">
//                 <span className={`text-sm font-bold w-6 ${
//                   index === 0 ? 'text-yellow-500' : 
//                   index === 1 ? 'text-gray-400' : 
//                   index === 2 ? 'text-amber-600' : 'text-gray-400'
//                 }`}>
//                   #{index + 1}
//                 </span>
//                 <span className="text-sm font-medium text-gray-700">{region.name}</span>
//               </div>
//               <span className="text-sm font-semibold text-gray-800">
//                 {region.budget.toLocaleString('fr-DZ')} kDA
//               </span>
//             </div>
//             <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
//               <motion.div
//                 initial={{ width: 0 }}
//                 animate={{ width: `${(region.budget / maxValue) * 100}%` }}
//                 transition={{ duration: 0.8, delay: index * 0.1 }}
//                 className="absolute inset-y-0 left-0 rounded-full"
//                 style={{ background: `linear-gradient(90deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)` }}
//               />
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // Composant Projets par Année
// const ProjectsByYearChart = ({ data }) => {
//   const maxCount = Math.max(...data.map(d => d.count));
  
//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h3 className="text-lg font-semibold text-gray-800">Projets par Année</h3>
//           <p className="text-sm text-gray-500 mt-1">Nombre de projets par année PMT</p>
//         </div>
//         <div 
//           className="w-10 h-10 rounded-xl flex items-center justify-center"
//           style={{ backgroundColor: COLORS.primaryLight }}
//         >
//           <Calendar className="w-5 h-5" style={{ color: COLORS.primary, strokeWidth: 1.5 }} />
//         </div>
//       </div>
      
//       <div className="flex items-end justify-between gap-4 h-64">
//         {data.map((item, index) => (
//           <motion.div
//             key={item.year}
//             className="flex-1 flex flex-col items-center gap-2"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//           >
//             <motion.div
//               initial={{ height: 0 }}
//               animate={{ height: `${(item.count / maxCount) * 200}px` }}
//               transition={{ duration: 0.6, delay: index * 0.1 }}
//               className="w-full rounded-t-lg cursor-pointer hover:opacity-80 transition-opacity"
//               style={{ 
//                 background: `linear-gradient(180deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`,
//                 height: `${(item.count / maxCount) * 200}px`
//               }}
//             />
//             <span className="text-xs text-gray-500 font-medium">{item.year}</span>
//             <span className="text-sm font-bold text-gray-700">{item.count}</span>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // Nouveau composant Circular Stats Card
// const CircularStatsCard = () => {
//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h3 className="text-lg font-semibold text-gray-800">Taux d'Avancement Global</h3>
//           <p className="text-sm text-gray-500 mt-1">Progression des projets</p>
//         </div>
//         <div 
//           className="w-10 h-10 rounded-xl flex items-center justify-center"
//           style={{ backgroundColor: COLORS.primaryLight }}
//         >
//           <Target className="w-5 h-5" style={{ color: COLORS.primary, strokeWidth: 1.5 }} />
//         </div>
//       </div>
      
//       <div className="flex flex-col items-center">
//         <CircularProgress value={45} size={140} strokeWidth={10} color={COLORS.primary} />
//         <div className="mt-6 w-full">
//           <InfoItem 
//             label="Projets en cours" 
//             value="124" 
//             icon={Activity} 
//             color={COLORS.primary}
//           />
//           <InfoItem 
//             label="Projets terminés" 
//             value="42" 
//             icon={CheckCircle} 
//             color={COLORS.secondary}
//           />
//           <InfoItem 
//             label="Budget utilisé" 
//             value="937.5M DA" 
//             icon={DollarSign} 
//             color="#10B981"
//           />
//           <InfoItem 
//             label="Budget restant" 
//             value="312.5M DA" 
//             icon={Target} 
//             color="#F59E0B"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// // Composant Principal Dashboard
// const Dashboard = () => {
//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState({
//     regions: 0,
//     directions: 0,
//     perimetres: 0,
//     familles: 0,
//     departements: 0,
//     coutTotal: 0,
//     projetsTotal: 0,
//     projetsValides: 0,
//     projetsSoumis: 0,
//   });
//   const [topRegions, setTopRegions] = useState([]);
//   const [projectsByYear, setProjectsByYear] = useState([]);
//   const [lastUpdate, setLastUpdate] = useState(null);
  
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
      
//       setTimeout(() => {
//         setStats({
//           regions: 12,
//           directions: 8,
//           perimetres: 32,
//           familles: 24,
//           departements: 187,
//           coutTotal: 1250000,
//           projetsTotal: 187,
//           projetsValides: 124,
//           projetsSoumis: 42,
//         });
        
//         setTopRegions([
//           { name: "Région Nord", budget: 425000 },
//           { name: "Région Sud", budget: 312000 },
//           { name: "Région Est", budget: 287000 },
//           { name: "Région Ouest", budget: 198000 },
//           { name: "Région Centre", budget: 156000 },
//         ]);
        
//         setProjectsByYear([
//           { year: 2024, count: 42 },
//           { year: 2025, count: 58 },
//           { year: 2026, count: 67 },
//           { year: 2027, count: 53 },
//           { year: 2028, count: 38 },
//         ]);
        
//         setLastUpdate(new Date());
//         setLoading(false);
//       }, 1000);
//     };
    
//     fetchData();
//   }, []);
  
//   const handleRefresh = () => {
//     setLoading(true);
//     setTimeout(() => setLoading(false), 500);
//   };
  
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
//         <div className="text-center">
//           <div 
//             className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"
//             style={{ borderColor: `${COLORS.secondary} transparent transparent transparent` }}
//           />
//           <p className="text-gray-500">Chargement du dashboard...</p>
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
//               <h1 className="text-2xl font-bold" style={{ color: COLORS.primary }}>Dashboard</h1>
//               <p className="text-gray-500 mt-1">
//                 Vue d'ensemble des projets et indicateurs clés
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
//                 onClick={handleRefresh}
//                 className="px-4 py-2 rounded-xl text-gray-600 transition-colors flex items-center gap-2"
//                 style={{ backgroundColor: `${COLORS.primary}10` }}
//               >
//                 <RefreshCw className="w-4 h-4" />
//                 Rafraîchir
//               </button>
//               <button 
//                 className="px-4 py-2 rounded-xl text-white transition-colors flex items-center gap-2"
//                 style={{ backgroundColor: COLORS.secondary }}
//               >
//                 <Download className="w-4 h-4" />
//                 Exporter
//               </button>
//             </div>
//           </div>
//         </div>
//       </motion.div>
      
//       <div className="p-8">
//         {/* Grandes cartes KPIs */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <KPICard
//             title="Utilisateurs"
//             value="14k"
//             subValue="+25%"
//             icon={Users}
//             trend={25}
//             colorType="primary"
//           />
//           <KPICard
//             title="Régions"
//             value={stats.regions}
//             subValue=""
//             icon={MapPin}
//             trend={12}
//             colorType="secondary"
//           />
//           <KPICard
//             title="Directions"
//             value={stats.directions}
//             subValue=""
//             icon={Building2}
//             trend={8}
//             colorType="primary"
//           />
//           <KPICard
//             title="Familles"
//             value={stats.familles}
//             subValue=""
//             icon={FolderTree}
//             trend={5}
//             colorType="secondary"
//           />
//         </div>
        
//         {/* Grille des cartes stats */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
//           <StatCard
//             title="Périmètres"
//             value={stats.perimetres}
//             icon={Layers}
//             colorType="primary"
//           />
//           <StatCard
//             title="Départements"
//             value={stats.departements}
//             icon={GitBranch}
//             colorType="secondary"
//           />
//           <StatCard
//             title="Projets Totaux"
//             value={stats.projetsTotal}
//             icon={Package}
//             colorType="primary"
//           />
//           <StatCard
//             title="Coût Total"
//             value={stats.coutTotal}
//             icon={BadgeDollarSign}
//             colorType="secondary"
//             suffix="Milliers DA"
//           />
//         </div>
        
//         {/* Charts Section avec nouvelle carte circulaire */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
//           <TopRegionsChart regions={topRegions} />
//           <ProjectsByYearChart data={projectsByYear} />
//           <CircularStatsCard />
//         </div>
        
//         {/* Footer Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="rounded-2xl p-6 text-white cursor-pointer hover:shadow-xl transition-all hover:scale-[1.02]"
//             style={{ background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primary}CC 100%)` }}
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
//                 <CheckCircle className="w-6 h-6" strokeWidth={1.5} />
//               </div>
//               <span className="text-3xl font-bold">{stats.projetsValides}</span>
//             </div>
//             <h4 className="text-lg font-semibold mb-1">Projets Validés</h4>
//             <p className="text-blue-100 text-sm">Approuvés par le divisionnaire</p>
//             <div className="mt-4 flex items-center gap-1 text-blue-100 text-sm">
//               <span>Voir détails</span>
//               <ChevronRight className="w-4 h-4" />
//             </div>
//           </motion.div>
          
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className="rounded-2xl p-6 text-white cursor-pointer hover:shadow-xl transition-all hover:scale-[1.02]"
//             style={{ background: `linear-gradient(135deg, ${COLORS.secondary} 0%, ${COLORS.secondary}CC 100%)` }}
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
//                 <AlertCircle className="w-6 h-6" strokeWidth={1.5} />
//               </div>
//               <span className="text-3xl font-bold">{stats.projetsSoumis}</span>
//             </div>
//             <h4 className="text-lg font-semibold mb-1">Projets Soumis</h4>
//             <p className="text-orange-100 text-sm">En attente de validation</p>
//             <div className="mt-4 flex items-center gap-1 text-orange-100 text-sm">
//               <span>Voir détails</span>
//               <ChevronRight className="w-4 h-4" />
//             </div>
//           </motion.div>
          
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4 }}
//             className="bg-white rounded-2xl p-6 border cursor-pointer hover:shadow-xl transition-all hover:scale-[1.02] group"
//             style={{ borderColor: `${COLORS.primary}20` }}
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div 
//                 className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors"
//                 style={{ backgroundColor: `${COLORS.primary}10` }}
//               >
//                 <Landmark className="w-6 h-6" style={{ color: COLORS.primary, strokeWidth: 1.5 }} />
//               </div>
//               <span className="text-3xl font-bold text-gray-800">
//                 {(stats.coutTotal / 1000).toFixed(1)}M
//               </span>
//             </div>
//             <h4 className="text-lg font-semibold text-gray-800 mb-1">Budget Total</h4>
//             <p className="text-gray-500 text-sm">Milliers DA</p>
//             <div className="mt-4">
//               <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
//                 <div 
//                   className="h-full rounded-full"
//                   style={{ width: '75%', background: `linear-gradient(90deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)` }}
//                 />
//               </div>
//               <p className="text-xs text-gray-400 mt-2">75% du budget alloué</p>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Dashboard;




// import React, { useState } from "react";
// import { motion } from 'framer-motion';
// import { 
//   Users, 
//   MapPin, 
//   Building2, 
//   Layers, 
//   GitBranch, 
//   DollarSign, 
//   Calendar,
//   TrendingUp,
//   TrendingDown,
//   ChevronRight,
//   Download,
//   RefreshCw,
//   Clock,
//   CheckCircle,
//   AlertCircle,
//   Activity,
//   Globe,
//   FolderTree,
//   Landmark,
//   Package,
//   BadgeDollarSign,
//   Target
// } from "lucide-react";
// import useDashboardStats from "../../../hooks/useDashboardStats";

// // Couleurs principales
// const COLORS = {
//   primary: '#0E47C8',
//   secondary: '#FF8500',
//   primaryLight: '#0E47C820',
//   secondaryLight: '#FF850020',
// };

// // Composant Circular Progress
// const CircularProgress = ({ value, size = 120, strokeWidth = 8, color }) => {
//   const radius = (size - strokeWidth) / 2;
//   const circumference = radius * 2 * Math.PI;
//   const offset = circumference - (value / 100) * circumference;
  
//   return (
//     <div className="relative" style={{ width: size, height: size }}>
//       <svg width={size} height={size} className="transform -rotate-90">
//         <circle
//           cx={size / 2}
//           cy={size / 2}
//           r={radius}
//           fill="none"
//           stroke="#E5E7EB"
//           strokeWidth={strokeWidth}
//         />
//         <motion.circle
//           cx={size / 2}
//           cy={size / 2}
//           r={radius}
//           fill="none"
//           stroke={color}
//           strokeWidth={strokeWidth}
//           strokeLinecap="round"
//           initial={{ strokeDashoffset: circumference }}
//           animate={{ strokeDashoffset: offset }}
//           transition={{ duration: 1.5, ease: "easeOut" }}
//           style={{
//             strokeDasharray: circumference,
//           }}
//         />
//       </svg>
//       <div className="absolute inset-0 flex items-center justify-center">
//         <motion.span
//           initial={{ opacity: 0, scale: 0 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5, delay: 0.5 }}
//           className="text-2xl font-bold"
//           style={{ color: color }}
//         >
//           {value}%
//         </motion.span>
//       </div>
//     </div>
//   );
// };

// // Composant KPI Card
// const KPICard = ({ title, value, icon: Icon, colorType, onClick }) => {
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
//       <div 
//         className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//         style={{ background: `linear-gradient(135deg, ${bgLight} 0%, transparent 100%)` }}
//       />
      
//       <div className="relative z-10">
//         <div className="flex items-center justify-between mb-4">
//           <div 
//             className="w-12 h-12 rounded-xl flex items-center justify-center"
//             style={{ backgroundColor: bgLight }}
//           >
//             <Icon 
//               className="w-6 h-6" 
//               style={{ color: mainColor, strokeWidth: 1.5 }}
//               stroke="currentColor"
//               fill="none"
//             />
//           </div>
//         </div>
        
//         <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
//         <div className="flex items-baseline gap-2">
//           <span className="text-3xl font-bold text-gray-800">{value?.toLocaleString() || 0}</span>
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
//       <div 
//         className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//         style={{ background: `linear-gradient(135deg, ${bgLight} 0%, transparent 100%)` }}
//       />
      
//       <div className="relative z-10">
//         <div className="flex items-center justify-between mb-3">
//           <div 
//             className="w-10 h-10 rounded-xl flex items-center justify-center"
//             style={{ backgroundColor: bgLight }}
//           >
//             <Icon 
//               className="w-5 h-5" 
//               style={{ color: mainColor, strokeWidth: 1.5 }}
//               stroke="currentColor"
//               fill="none"
//             />
//           </div>
//           <div className="w-8 h-8 rounded-full bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//             <ChevronRight className="w-4 h-4 text-gray-400" />
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

// // Composant InfoItem
// const InfoItem = ({ label, value, icon: Icon, color }) => {
//   return (
//     <motion.div 
//       className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
//       whileHover={{ x: 5 }}
//     >
//       <div className="flex items-center gap-3">
//         <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}10` }}>
//           <Icon className="w-4 h-4" style={{ color }} strokeWidth={1.5} />
//         </div>
//         <span className="text-sm text-gray-600">{label}</span>
//       </div>
//       <span className="text-sm font-semibold" style={{ color }}>{value}</span>
//     </motion.div>
//   );
// };

// // Composant Principal Dashboard
// const Dashboard = () => {
//   const {
//     counters,
//     projetsStats,
//     loading,
//     error,
//     lastUpdate,
//     refreshData,
//     totalFamilles,
//     budgetTotalMilliers,
//     tauxAvancement,
//     budgetUtilise,
//     budgetRestant,
//     totalUsers,
//   } = useDashboardStats();

//   // Top régions (à remplacer par un vrai endpoint plus tard)
//   const topRegions = [
//     { name: "Région Nord", budget: 425000 },
//     { name: "Région Sud", budget: 312000 },
//     { name: "Région Est", budget: 287000 },
//     { name: "Région Ouest", budget: 198000 },
//     { name: "Région Centre", budget: 156000 },
//   ];

//   // Projets par année (à remplacer par un vrai endpoint plus tard)
//   const projectsByYear = [
//     { year: 2024, count: 42 },
//     { year: 2025, count: 58 },
//     { year: 2026, count: 67 },
//     { year: projetsStats.annee_pmt || 2027, count: projetsStats.projets_total || 53 },
//     { year: 2028, count: 38 },
//   ];

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
//         <div className="text-center">
//           <div 
//             className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"
//             style={{ borderColor: `${COLORS.secondary} transparent transparent transparent` }}
//           />
//           <p className="text-gray-500">Chargement du dashboard...</p>
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
//               <h1 className="text-2xl font-bold" style={{ color: COLORS.primary }}>Dashboard</h1>
//               <p className="text-gray-500 mt-1">
//                 Vue d'ensemble des projets et indicateurs clés - PMT {projetsStats.annee_pmt || new Date().getFullYear() + 1}
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
//                 className="px-4 py-2 rounded-xl text-gray-600 transition-colors flex items-center gap-2"
//                 style={{ backgroundColor: `${COLORS.primary}10` }}
//               >
//                 <RefreshCw className="w-4 h-4" />
//                 Rafraîchir
//               </button>
//               <button 
//                 className="px-4 py-2 rounded-xl text-white transition-colors flex items-center gap-2"
//                 style={{ backgroundColor: COLORS.secondary }}
//               >
//                 <Download className="w-4 h-4" />
//                 Exporter
//               </button>
//             </div>
//           </div>
//         </div>
//       </motion.div>
      
//       <div className="p-8">
//         {/* Grandes cartes KPIs */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <KPICard
//             title="Utilisateurs"
//             value={totalUsers}
//             icon={Users}
//             colorType="primary"
//           />
//           <KPICard
//             title="Régions"
//             value={counters.regions}
//             icon={MapPin}
//             colorType="secondary"
//           />
//           <KPICard
//             title="Directions"
//             value={counters.directions}
//             icon={Building2}
//             colorType="primary"
//           />
//           <KPICard
//             title="Familles"
//             value={totalFamilles}
//             icon={FolderTree}
//             colorType="secondary"
//           />
//         </div>
        
//         {/* Grille des cartes stats */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
//           <StatCard
//             title="Périmètres"
//             value={counters.perimetres}
//             icon={Layers}
//             colorType="primary"
//           />
//           <StatCard
//             title="Départements"
//             value={counters.departements}
//             icon={GitBranch}
//             colorType="secondary"
//           />
//           <StatCard
//             title="Projets Totaux"
//             value={projetsStats.projets_total}
//             icon={Package}
//             colorType="primary"
//           />
//           <StatCard
//             title="Coût Total"
//             value={budgetTotalMilliers}
//             icon={BadgeDollarSign}
//             colorType="secondary"
//             suffix="kDA"
//           />
//         </div>
        
//         {/* Charts Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
//           {/* Top 5 Régions par Budget */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">Top 5 Régions par Budget</h3>
//                 <p className="text-sm text-gray-500 mt-1">Coût global initial en milliers DA</p>
//               </div>
//               <div 
//                 className="w-10 h-10 rounded-xl flex items-center justify-center"
//                 style={{ backgroundColor: COLORS.secondaryLight }}
//               >
//                 <Globe className="w-5 h-5" style={{ color: COLORS.secondary, strokeWidth: 1.5 }} />
//               </div>
//             </div>
//             <div className="space-y-4">
//               {topRegions.map((region, index) => {
//                 const maxValue = Math.max(...topRegions.map(r => r.budget));
//                 return (
//                   <motion.div
//                     key={region.name}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: index * 0.1 }}
//                     className="group cursor-pointer"
//                   >
//                     <div className="flex items-center justify-between mb-1">
//                       <div className="flex items-center gap-3">
//                         <span className={`text-sm font-bold w-6 ${
//                           index === 0 ? 'text-yellow-500' : 
//                           index === 1 ? 'text-gray-400' : 
//                           index === 2 ? 'text-amber-600' : 'text-gray-400'
//                         }`}>
//                           #{index + 1}
//                         </span>
//                         <span className="text-sm font-medium text-gray-700">{region.name}</span>
//                       </div>
//                       <span className="text-sm font-semibold text-gray-800">
//                         {region.budget.toLocaleString('fr-DZ')} kDA
//                       </span>
//                     </div>
//                     <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
//                       <motion.div
//                         initial={{ width: 0 }}
//                         animate={{ width: `${(region.budget / maxValue) * 100}%` }}
//                         transition={{ duration: 0.8, delay: index * 0.1 }}
//                         className="absolute inset-y-0 left-0 rounded-full"
//                         style={{ background: `linear-gradient(90deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)` }}
//                       />
//                     </div>
//                   </motion.div>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Projets par Année */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">Projets par Année</h3>
//                 <p className="text-sm text-gray-500 mt-1">Nombre de projets par année PMT</p>
//               </div>
//               <div 
//                 className="w-10 h-10 rounded-xl flex items-center justify-center"
//                 style={{ backgroundColor: COLORS.primaryLight }}
//               >
//                 <Calendar className="w-5 h-5" style={{ color: COLORS.primary, strokeWidth: 1.5 }} />
//               </div>
//             </div>
//             <div className="flex flex-col items-center justify-center h-64">
//               <div className="text-center">
//                 <div className="text-5xl font-bold text-gray-800">{projetsStats.projets_total}</div>
//                 <p className="text-gray-500 mt-2">Projets pour l'année {projetsStats.annee_pmt}</p>
//                 <div className="mt-4 flex gap-4 justify-center">
//                   <div className="text-center">
//                     <div className="text-green-600 font-bold">{projetsStats.projets_valides}</div>
//                     <div className="text-xs text-gray-500">Validés</div>
//                   </div>
//                   <div className="text-center">
//                     <div className="text-orange-600 font-bold">{projetsStats.projets_soumis}</div>
//                     <div className="text-xs text-gray-500">Soumis</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Taux d'Avancement Global */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">Taux d'Avancement Global</h3>
//                 <p className="text-sm text-gray-500 mt-1">Progression des projets</p>
//               </div>
//               <div 
//                 className="w-10 h-10 rounded-xl flex items-center justify-center"
//                 style={{ backgroundColor: COLORS.primaryLight }}
//               >
//                 <Target className="w-5 h-5" style={{ color: COLORS.primary, strokeWidth: 1.5 }} />
//               </div>
//             </div>
            
//             <div className="flex flex-col items-center">
//               <CircularProgress value={tauxAvancement} size={140} strokeWidth={10} color={COLORS.primary} />
//               <div className="mt-6 w-full">
//                 <InfoItem 
//                   label="Projets en cours" 
//                   value={projetsStats.projets_soumis - projetsStats.projets_valides} 
//                   icon={Activity} 
//                   color={COLORS.primary}
//                 />
//                 <InfoItem 
//                   label="Projets terminés" 
//                   value={projetsStats.projets_valides} 
//                   icon={CheckCircle} 
//                   color={COLORS.secondary}
//                 />
//                 <InfoItem 
//                   label="Budget utilisé" 
//                   value={`${Math.round(budgetUtilise)} kDA`} 
//                   icon={DollarSign} 
//                   color="#10B981"
//                 />
//                 <InfoItem 
//                   label="Budget restant" 
//                   value={`${Math.round(budgetRestant)} kDA`} 
//                   icon={Target} 
//                   color="#F59E0B"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* Footer Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="rounded-2xl p-6 text-white cursor-pointer hover:shadow-xl transition-all hover:scale-[1.02]"
//             style={{ background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primary}CC 100%)` }}
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
//                 <CheckCircle className="w-6 h-6" strokeWidth={1.5} />
//               </div>
//               <span className="text-3xl font-bold">{projetsStats.projets_valides}</span>
//             </div>
//             <h4 className="text-lg font-semibold mb-1">Projets Validés</h4>
//             <p className="text-blue-100 text-sm">Approuvés par le divisionnaire</p>
//             <div className="mt-4 flex items-center gap-1 text-blue-100 text-sm">
//               <span>Voir détails</span>
//               <ChevronRight className="w-4 h-4" />
//             </div>
//           </motion.div>
          
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className="rounded-2xl p-6 text-white cursor-pointer hover:shadow-xl transition-all hover:scale-[1.02]"
//             style={{ background: `linear-gradient(135deg, ${COLORS.secondary} 0%, ${COLORS.secondary}CC 100%)` }}
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
//                 <AlertCircle className="w-6 h-6" strokeWidth={1.5} />
//               </div>
//               <span className="text-3xl font-bold">{projetsStats.projets_soumis}</span>
//             </div>
//             <h4 className="text-lg font-semibold mb-1">Projets Soumis</h4>
//             <p className="text-orange-100 text-sm">En attente de validation</p>
//             <div className="mt-4 flex items-center gap-1 text-orange-100 text-sm">
//               <span>Voir détails</span>
//               <ChevronRight className="w-4 h-4" />
//             </div>
//           </motion.div>
          
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4 }}
//             className="bg-white rounded-2xl p-6 border cursor-pointer hover:shadow-xl transition-all hover:scale-[1.02] group"
//             style={{ borderColor: `${COLORS.primary}20` }}
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div 
//                 className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors"
//                 style={{ backgroundColor: `${COLORS.primary}10` }}
//               >
//                 <Landmark className="w-6 h-6" style={{ color: COLORS.primary, strokeWidth: 1.5 }} />
//               </div>
//               <span className="text-3xl font-bold text-gray-800">
//                 {budgetTotalMilliers.toFixed(0)}M
//               </span>
//             </div>
//             <h4 className="text-lg font-semibold text-gray-800 mb-1">Budget Total</h4>
//             <p className="text-gray-500 text-sm">Milliers DA</p>
//             <div className="mt-4">
//               <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
//                 <div 
//                   className="h-full rounded-full"
//                   style={{ width: `${tauxAvancement}%`, background: `linear-gradient(90deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)` }}
//                 />
//               </div>
//               <p className="text-xs text-gray-400 mt-2">{tauxAvancement}% des projets validés</p>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;









// import React from "react";
// import { motion } from 'framer-motion';
// import { 
//   Users, 
//   MapPin, 
//   Building2, 
//   Layers, 
//   GitBranch, 
//   DollarSign, 
//   Calendar,
//   ChevronRight,
//   Download,
//   RefreshCw,
//   Clock,
//   CheckCircle,
//   AlertCircle,
//   Activity,
//   Globe,
//   FolderTree,
//   Landmark,
//   Package,
//   BadgeDollarSign,
//   Target
// } from "lucide-react";
// import useDashboardStats from "../../../hooks/useDashboardStats";

// // Couleurs principales
// const COLORS = {
//   primary: '#0E47C8',
//   secondary: '#FF8500',
//   primaryLight: '#0E47C820',
//   secondaryLight: '#FF850020',
// };

// // Composant Circular Progress
// const CircularProgress = ({ value, size = 120, strokeWidth = 8, color }) => {
//   const radius = (size - strokeWidth) / 2;
//   const circumference = radius * 2 * Math.PI;
//   const offset = circumference - (value / 100) * circumference;
  
//   return (
//     <div className="relative" style={{ width: size, height: size }}>
//       <svg width={size} height={size} className="transform -rotate-90">
//         <circle
//           cx={size / 2}
//           cy={size / 2}
//           r={radius}
//           fill="none"
//           stroke="#E5E7EB"
//           strokeWidth={strokeWidth}
//         />
//         <motion.circle
//           cx={size / 2}
//           cy={size / 2}
//           r={radius}
//           fill="none"
//           stroke={color}
//           strokeWidth={strokeWidth}
//           strokeLinecap="round"
//           initial={{ strokeDashoffset: circumference }}
//           animate={{ strokeDashoffset: offset }}
//           transition={{ duration: 1.5, ease: "easeOut" }}
//           style={{
//             strokeDasharray: circumference,
//           }}
//         />
//       </svg>
//       <div className="absolute inset-0 flex items-center justify-center">
//         <motion.span
//           initial={{ opacity: 0, scale: 0 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5, delay: 0.5 }}
//           className="text-2xl font-bold"
//           style={{ color: color }}
//         >
//           {value}%
//         </motion.span>
//       </div>
//     </div>
//   );
// };

// // Composant KPI Card
// const KPICard = ({ title, value, icon: Icon, colorType, onClick }) => {
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
//       <div 
//         className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//         style={{ background: `linear-gradient(135deg, ${bgLight} 0%, transparent 100%)` }}
//       />
      
//       <div className="relative z-10">
//         <div className="flex items-center justify-between mb-4">
//           <div 
//             className="w-12 h-12 rounded-xl flex items-center justify-center"
//             style={{ backgroundColor: bgLight }}
//           >
//             <Icon 
//               className="w-6 h-6" 
//               style={{ color: mainColor, strokeWidth: 1.5 }}
//               stroke="currentColor"
//               fill="none"
//             />
//           </div>
//         </div>
        
//         <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
//         <div className="flex items-baseline gap-2">
//           <span className="text-3xl font-bold text-gray-800">{value?.toLocaleString() || 0}</span>
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
//       <div 
//         className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//         style={{ background: `linear-gradient(135deg, ${bgLight} 0%, transparent 100%)` }}
//       />
      
//       <div className="relative z-10">
//         <div className="flex items-center justify-between mb-3">
//           <div 
//             className="w-10 h-10 rounded-xl flex items-center justify-center"
//             style={{ backgroundColor: bgLight }}
//           >
//             <Icon 
//               className="w-5 h-5" 
//               style={{ color: mainColor, strokeWidth: 1.5 }}
//               stroke="currentColor"
//               fill="none"
//             />
//           </div>
//           <div className="w-8 h-8 rounded-full bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//             <ChevronRight className="w-4 h-4 text-gray-400" />
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

// // Composant InfoItem
// const InfoItem = ({ label, value, icon: Icon, color }) => {
//   return (
//     <motion.div 
//       className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
//       whileHover={{ x: 5 }}
//     >
//       <div className="flex items-center gap-3">
//         <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}10` }}>
//           <Icon className="w-4 h-4" style={{ color }} strokeWidth={1.5} />
//         </div>
//         <span className="text-sm text-gray-600">{label}</span>
//       </div>
//       <span className="text-sm font-semibold" style={{ color }}>{value}</span>
//     </motion.div>
//   );
// };

// // Composant Top 5 Regions
// const TopRegionsChart = ({ regions }) => {
//   const maxValue = Math.max(...regions.map(r => r.budget));
  
//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h3 className="text-lg font-semibold text-gray-800">Top 5 Régions par Budget</h3>
//           <p className="text-sm text-gray-500 mt-1">Coût global initial en milliers DA</p>
//         </div>
//         <div 
//           className="w-10 h-10 rounded-xl flex items-center justify-center"
//           style={{ backgroundColor: COLORS.secondaryLight }}
//         >
//           <Globe className="w-5 h-5" style={{ color: COLORS.secondary, strokeWidth: 1.5 }} />
//         </div>
//       </div>
      
//       <div className="space-y-4">
//         {regions.map((region, index) => {
//           const maxValue = Math.max(...regions.map(r => r.budget));
//           return (
//             <motion.div
//               key={region.name}
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: index * 0.1 }}
//               className="group cursor-pointer"
//             >
//               <div className="flex items-center justify-between mb-1">
//                 <div className="flex items-center gap-3">
//                   <span className={`text-sm font-bold w-6 ${
//                     index === 0 ? 'text-yellow-500' : 
//                     index === 1 ? 'text-gray-400' : 
//                     index === 2 ? 'text-amber-600' : 'text-gray-400'
//                   }`}>
//                     #{index + 1}
//                   </span>
//                   <span className="text-sm font-medium text-gray-700">{region.name}</span>
//                 </div>
//                 <span className="text-sm font-semibold text-gray-800">
//                   {region.budget.toLocaleString('fr-DZ')} kDA
//                 </span>
//               </div>
//               <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
//                 <motion.div
//                   initial={{ width: 0 }}
//                   animate={{ width: `${(region.budget / maxValue) * 100}%` }}
//                   transition={{ duration: 0.8, delay: index * 0.1 }}
//                   className="absolute inset-y-0 left-0 rounded-full"
//                   style={{ background: `linear-gradient(90deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)` }}
//                 />
//               </div>
//             </motion.div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// // ⭐ COMPOSANT PROJETS PAR ANNÉE - GRAPHIQUE EN BARRES (STATIQUE POUR LE MOMENT)
// const ProjectsByYearChart = ({ data }) => {
//   const maxCount = Math.max(...data.map(d => d.count));
  
//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h3 className="text-lg font-semibold text-gray-800">Projets par PMT</h3>
//           <p className="text-sm text-gray-500 mt-1">Nombre de projets par PMT</p>
//         </div>
//         <div 
//           className="w-10 h-10 rounded-xl flex items-center justify-center"
//           style={{ backgroundColor: COLORS.primaryLight }}
//         >
//           <Calendar className="w-5 h-5" style={{ color: COLORS.primary, strokeWidth: 1.5 }} />
//         </div>
//       </div>
      
//       <div className="flex items-end justify-between gap-4 h-64">
//         {data.map((item, index) => (
//           <motion.div
//             key={item.year}
//             className="flex-1 flex flex-col items-center gap-2"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//           >
//             <motion.div
//               initial={{ height: 0 }}
//               animate={{ height: `${(item.count / maxCount) * 200}px` }}
//               transition={{ duration: 0.6, delay: index * 0.1 }}
//               className="w-full rounded-t-lg cursor-pointer hover:opacity-80 transition-opacity"
//               style={{ 
//                 background: `linear-gradient(180deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`,
//                 height: `${(item.count / maxCount) * 200}px`
//               }}
//             />
//             <span className="text-xs text-gray-500 font-medium">{item.year}</span>
//             <span className="text-sm font-bold text-gray-700">{item.count}</span>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // Composant Principal Dashboard
// const Dashboard = () => {
//   const {
//     counters,
//     projetsStats,
//     loading,
//     error,
//     lastUpdate,
//     refreshData,
//     totalFamilles,
//     budgetTotalMilliers,
//     tauxAvancement,
//     budgetUtilise,
//     budgetRestant,
//     totalUsers,
//   } = useDashboardStats();

//   // Top régions (STATIQUE pour le moment - à remplacer par API plus tard)
//   const topRegions = [
//     { name: "Région Nord", budget: 425000 },
//     { name: "Région Sud", budget: 312000 },
//     { name: "Région Est", budget: 287000 },
//     { name: "Région Ouest", budget: 198000 },
//     { name: "Région Centre", budget: 156000 },
//   ];

//   // ⭐ Projets par année (STATIQUE pour le moment - à remplacer par API plus tard)
//   const projectsByYear = [
//     { year: 2024, count: 42 },
//     { year: 2025, count: 58 },
//     { year: 2026, count: 67 },
//     { year: projetsStats.annee_pmt || 2027, count: projetsStats.projets_total || 53 },
//     { year: 2028, count: 38 },
//   ];

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
//         <div className="text-center">
//           <div 
//             className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"
//             style={{ borderColor: `${COLORS.secondary} transparent transparent transparent` }}
//           />
//           <p className="text-gray-500">Chargement du dashboard...</p>
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
//               <h1 className="text-2xl font-bold" style={{ color: COLORS.primary }}>Dashboard</h1>
//               <p className="text-gray-500 mt-1">
//                 Vue d'ensemble des projets et indicateurs clés - PMT {projetsStats.annee_pmt || new Date().getFullYear() + 1}
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
//                 className="px-4 py-2 rounded-xl text-gray-600 transition-colors flex items-center gap-2"
//                 style={{ backgroundColor: `${COLORS.primary}10` }}
//               >
//                 <RefreshCw className="w-4 h-4" />
//                 Rafraîchir
//               </button>
//               <button 
//                 className="px-4 py-2 rounded-xl text-white transition-colors flex items-center gap-2"
//                 style={{ backgroundColor: COLORS.secondary }}
//               >
//                 <Download className="w-4 h-4" />
//                 Exporter
//               </button>
//             </div>
//           </div>
//         </div>
//       </motion.div>
      
//       <div className="p-8">
//         {/* Grandes cartes KPIs */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <KPICard
//             title="Utilisateurs"
//             value={totalUsers}
//             icon={Users}
//             colorType="primary"
//           />
//           <KPICard
//             title="Régions"
//             value={counters.regions}
//             icon={MapPin}
//             colorType="secondary"
//           />
//           <KPICard
//             title="Directions"
//             value={counters.directions}
//             icon={Building2}
//             colorType="primary"
//           />
//           <KPICard
//             title="Familles"
//             value={totalFamilles}
//             icon={FolderTree}
//             colorType="secondary"
//           />
//         </div>
        
//         {/* Grille des cartes stats */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
//           <StatCard
//             title="Périmètres"
//             value={counters.perimetres}
//             icon={Layers}
//             colorType="primary"
//           />
//           <StatCard
//             title="Départements"
//             value={counters.departements}
//             icon={GitBranch}
//             colorType="secondary"
//           />
//           <StatCard
//             title="Projets Totaux"
//             value={projetsStats.projets_total}
//             icon={Package}
//             colorType="primary"
//           />
//           <StatCard
//             title="Coût Total"
//             value={budgetTotalMilliers}
//             icon={BadgeDollarSign}
//             colorType="secondary"
//             suffix="kDA"
//           />
//         </div>
        
//         {/* Charts Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
//           {/* Top 5 Régions par Budget */}
//           <TopRegionsChart regions={topRegions} />

//           {/* ⭐ Projets par Année - GRAPHIQUE EN BARRES STATIQUE */}
//           <ProjectsByYearChart data={projectsByYear} />

//           {/* Taux d'Avancement Global */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">Taux d'Avancement Global</h3>
//                 <p className="text-sm text-gray-500 mt-1">Progression des projets</p>
//               </div>
//               <div 
//                 className="w-10 h-10 rounded-xl flex items-center justify-center"
//                 style={{ backgroundColor: COLORS.primaryLight }}
//               >
//                 <Target className="w-5 h-5" style={{ color: COLORS.primary, strokeWidth: 1.5 }} />
//               </div>
//             </div>
            
//             <div className="flex flex-col items-center">
//               <CircularProgress value={tauxAvancement} size={140} strokeWidth={10} color={COLORS.primary} />
//               <div className="mt-6 w-full">
//                 <InfoItem 
//                   label="Projets en cours" 
//                   value={projetsStats.projets_soumis - projetsStats.projets_valides} 
//                   icon={Activity} 
//                   color={COLORS.primary}
//                 />
//                 <InfoItem 
//                   label="Projets terminés" 
//                   value={projetsStats.projets_valides} 
//                   icon={CheckCircle} 
//                   color={COLORS.secondary}
//                 />
//                 <InfoItem 
//                   label="Budget utilisé" 
//                   value={`${Math.round(budgetUtilise)} kDA`} 
//                   icon={DollarSign} 
//                   color="#10B981"
//                 />
//                 <InfoItem 
//                   label="Budget restant" 
//                   value={`${Math.round(budgetRestant)} kDA`} 
//                   icon={Target} 
//                   color="#F59E0B"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* Footer Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="rounded-2xl p-6 text-white cursor-pointer hover:shadow-xl transition-all hover:scale-[1.02]"
//             style={{ background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primary}CC 100%)` }}
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
//                 <CheckCircle className="w-6 h-6" strokeWidth={1.5} />
//               </div>
//               <span className="text-3xl font-bold">{projetsStats.projets_valides}</span>
//             </div>
//             <h4 className="text-lg font-semibold mb-1">Projets Validés</h4>
//             <p className="text-blue-100 text-sm">Approuvés par le divisionnaire</p>
//             <div className="mt-4 flex items-center gap-1 text-blue-100 text-sm">
//               <span>Voir détails</span>
//               <ChevronRight className="w-4 h-4" />
//             </div>
//           </motion.div>
          
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className="rounded-2xl p-6 text-white cursor-pointer hover:shadow-xl transition-all hover:scale-[1.02]"
//             style={{ background: `linear-gradient(135deg, ${COLORS.secondary} 0%, ${COLORS.secondary}CC 100%)` }}
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
//                 <AlertCircle className="w-6 h-6" strokeWidth={1.5} />
//               </div>
//               <span className="text-3xl font-bold">{projetsStats.projets_soumis}</span>
//             </div>
//             <h4 className="text-lg font-semibold mb-1">Projets Soumis</h4>
//             <p className="text-orange-100 text-sm">En attente de validation</p>
//             <div className="mt-4 flex items-center gap-1 text-orange-100 text-sm">
//               <span>Voir détails</span>
//               <ChevronRight className="w-4 h-4" />
//             </div>
//           </motion.div>
          
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4 }}
//             className="bg-white rounded-2xl p-6 border cursor-pointer hover:shadow-xl transition-all hover:scale-[1.02] group"
//             style={{ borderColor: `${COLORS.primary}20` }}
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div 
//                 className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors"
//                 style={{ backgroundColor: `${COLORS.primary}10` }}
//               >
//                 <Landmark className="w-6 h-6" style={{ color: COLORS.primary, strokeWidth: 1.5 }} />
//               </div>
//               <span className="text-3xl font-bold text-gray-800">
//                 {budgetTotalMilliers.toFixed(0)}M
//               </span>
//             </div>
//             <h4 className="text-lg font-semibold text-gray-800 mb-1">Budget Total</h4>
//             <p className="text-gray-500 text-sm">Milliers DA</p>
//             <div className="mt-4">
//               <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
//                 <div 
//                   className="h-full rounded-full"
//                   style={{ width: `${tauxAvancement}%`, background: `linear-gradient(90deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)` }}
//                 />
//               </div>
//               <p className="text-xs text-gray-400 mt-2">{tauxAvancement}% des projets validés</p>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// import React from "react";
// import { motion } from 'framer-motion';
// import { 
//   Users, 
//   MapPin, 
//   Building2, 
//   Layers, 
//   GitBranch, 
//   DollarSign, 
//   Calendar,
//   ChevronRight,
//   Download,
//   RefreshCw,
//   Clock,
//   CheckCircle,
//   AlertCircle,
//   Activity,
//   Globe,
//   FolderTree,
//   Landmark,
//   Package,
//   BadgeDollarSign,
//   Target
// } from "lucide-react";
// import useDashboardStats from "../../../hooks/useDashboardStats";

// // Couleurs principales
// const COLORS = {
//   primary: '#0E47C8',
//   secondary: '#FF8500',
//   primaryLight: '#0E47C820',
//   secondaryLight: '#FF850020',
// };

// // Composant Circular Progress
// const CircularProgress = ({ value, size = 120, strokeWidth = 8, color }) => {
//   const radius = (size - strokeWidth) / 2;
//   const circumference = radius * 2 * Math.PI;
//   const offset = circumference - (value / 100) * circumference;
  
//   return (
//     <div className="relative" style={{ width: size, height: size }}>
//       <svg width={size} height={size} className="transform -rotate-90">
//         <circle
//           cx={size / 2}
//           cy={size / 2}
//           r={radius}
//           fill="none"
//           stroke="#E5E7EB"
//           strokeWidth={strokeWidth}
//         />
//         <motion.circle
//           cx={size / 2}
//           cy={size / 2}
//           r={radius}
//           fill="none"
//           stroke={color}
//           strokeWidth={strokeWidth}
//           strokeLinecap="round"
//           initial={{ strokeDashoffset: circumference }}
//           animate={{ strokeDashoffset: offset }}
//           transition={{ duration: 1.5, ease: "easeOut" }}
//           style={{
//             strokeDasharray: circumference,
//           }}
//         />
//       </svg>
//       <div className="absolute inset-0 flex items-center justify-center">
//         <motion.span
//           initial={{ opacity: 0, scale: 0 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5, delay: 0.5 }}
//           className="text-2xl font-bold"
//           style={{ color: color }}
//         >
//           {value}%
//         </motion.span>
//       </div>
//     </div>
//   );
// };

// // Composant KPI Card
// const KPICard = ({ title, value, icon: Icon, colorType, onClick }) => {
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
//       <div 
//         className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//         style={{ background: `linear-gradient(135deg, ${bgLight} 0%, transparent 100%)` }}
//       />
      
//       <div className="relative z-10">
//         <div className="flex items-center justify-between mb-4">
//           <div 
//             className="w-12 h-12 rounded-xl flex items-center justify-center"
//             style={{ backgroundColor: bgLight }}
//           >
//             <Icon 
//               className="w-6 h-6" 
//               style={{ color: mainColor, strokeWidth: 1.5 }}
//               stroke="currentColor"
//               fill="none"
//             />
//           </div>
//         </div>
        
//         <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
//         <div className="flex items-baseline gap-2">
//           <span className="text-3xl font-bold text-gray-800">{value?.toLocaleString() || 0}</span>
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
//       <div 
//         className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//         style={{ background: `linear-gradient(135deg, ${bgLight} 0%, transparent 100%)` }}
//       />
      
//       <div className="relative z-10">
//         <div className="flex items-center justify-between mb-3">
//           <div 
//             className="w-10 h-10 rounded-xl flex items-center justify-center"
//             style={{ backgroundColor: bgLight }}
//           >
//             <Icon 
//               className="w-5 h-5" 
//               style={{ color: mainColor, strokeWidth: 1.5 }}
//               stroke="currentColor"
//               fill="none"
//             />
//           </div>
//           <div className="w-8 h-8 rounded-full bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//             <ChevronRight className="w-4 h-4 text-gray-400" />
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

// // Composant InfoItem
// const InfoItem = ({ label, value, icon: Icon, color }) => {
//   return (
//     <motion.div 
//       className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
//       whileHover={{ x: 5 }}
//     >
//       <div className="flex items-center gap-3">
//         <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}10` }}>
//           <Icon className="w-4 h-4" style={{ color }} strokeWidth={1.5} />
//         </div>
//         <span className="text-sm text-gray-600">{label}</span>
//       </div>
//       <span className="text-sm font-semibold" style={{ color }}>{value}</span>
//     </motion.div>
//   );
// };

// // Composant Top 5 Regions (statique pour le moment)
// const TopRegionsChart = ({ regions }) => {
//   if (!regions || regions.length === 0) {
//     return (
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//         <div className="text-center text-gray-500">Aucune donnée de région disponible</div>
//       </div>
//     );
//   }
  
//   const maxValue = Math.max(...regions.map(r => r.budget));
  
//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h3 className="text-lg font-semibold text-gray-800">Top 5 Régions par Budget</h3>
//           <p className="text-sm text-gray-500 mt-1">Coût global initial en milliers DA</p>
//         </div>
//         <div 
//           className="w-10 h-10 rounded-xl flex items-center justify-center"
//           style={{ backgroundColor: COLORS.secondaryLight }}
//         >
//           <Globe className="w-5 h-5" style={{ color: COLORS.secondary, strokeWidth: 1.5 }} />
//         </div>
//       </div>
      
//       <div className="space-y-4">
//         {regions.map((region, index) => (
//           <motion.div
//             key={region.name}
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: index * 0.1 }}
//             className="group cursor-pointer"
//           >
//             <div className="flex items-center justify-between mb-1">
//               <div className="flex items-center gap-3">
//                 <span className={`text-sm font-bold w-6 ${
//                   index === 0 ? 'text-yellow-500' : 
//                   index === 1 ? 'text-gray-400' : 
//                   index === 2 ? 'text-amber-600' : 'text-gray-400'
//                 }`}>
//                   #{index + 1}
//                 </span>
//                 <span className="text-sm font-medium text-gray-700">{region.name}</span>
//               </div>
//               <span className="text-sm font-semibold text-gray-800">
//                 {region.budget.toLocaleString('fr-DZ')} kDA
//               </span>
//             </div>
//             <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
//               <motion.div
//                 initial={{ width: 0 }}
//                 animate={{ width: `${(region.budget / maxValue) * 100}%` }}
//                 transition={{ duration: 0.8, delay: index * 0.1 }}
//                 className="absolute inset-y-0 left-0 rounded-full"
//                 style={{ background: `linear-gradient(90deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)` }}
//               />
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // ⭐ COMPOSANT PROJETS PAR PMT - GRAPHIQUE EN BARRES AVEC DONNÉES RÉELLES
// const ProjectsByYearChart = ({ data, loading }) => {
//   if (loading) {
//     return (
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h3 className="text-lg font-semibold text-gray-800">Projets par PMT</h3>
//             <p className="text-sm text-gray-500 mt-1">Chargement...</p>
//           </div>
//           <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: COLORS.primaryLight }}>
//             <Calendar className="w-5 h-5" style={{ color: COLORS.primary, strokeWidth: 1.5 }} />
//           </div>
//         </div>
//         <div className="h-64 flex items-center justify-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//         </div>
//       </div>
//     );
//   }
  
//   if (!data || data.length === 0) {
//     return (
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h3 className="text-lg font-semibold text-gray-800">Projets par PMT</h3>
//             <p className="text-sm text-gray-500 mt-1">Aucune donnée disponible</p>
//           </div>
//           <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: COLORS.primaryLight }}>
//             <Calendar className="w-5 h-5" style={{ color: COLORS.primary, strokeWidth: 1.5 }} />
//           </div>
//         </div>
//         <div className="h-64 flex items-center justify-center text-gray-400">
//           Aucun projet trouvé
//         </div>
//       </div>
//     );
//   }
  
//   const maxCount = Math.max(...data.map(d => d.count));
  
//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h3 className="text-lg font-semibold text-gray-800">Projets par PMT</h3>
//           <p className="text-sm text-gray-500 mt-1">Nombre de projets par période PMT</p>
//         </div>
//         <div 
//           className="w-10 h-10 rounded-xl flex items-center justify-center"
//           style={{ backgroundColor: COLORS.primaryLight }}
//         >
//           <Calendar className="w-5 h-5" style={{ color: COLORS.primary, strokeWidth: 1.5 }} />
//         </div>
//       </div>
      
//       <div className="flex items-end justify-between gap-4 h-64">
//         {data.map((item, index) => (
//           <motion.div
//             key={item.year}
//             className="flex-1 flex flex-col items-center gap-2"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//           >
//             <motion.div
//               initial={{ height: 0 }}
//               animate={{ height: `${(item.count / maxCount) * 200}px` }}
//               transition={{ duration: 0.6, delay: index * 0.1 }}
//               className="w-full rounded-t-lg cursor-pointer hover:opacity-80 transition-opacity"
//               style={{ 
//                 background: `linear-gradient(180deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`,
//                 height: `${(item.count / maxCount) * 200}px`
//               }}
//             />
//             <span className="text-xs text-gray-500 font-medium">{item.year}</span>
//             <span className="text-sm font-bold text-gray-700">{item.count}</span>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // Composant Principal Dashboard
// const Dashboard = () => {
//   const {
//     counters,
//     projetsStats,
//     projectsByYear,
//     loadingProjectsByYear,
//     loading,
//     error,
//     lastUpdate,
//     refreshData,
//     totalFamilles,
//     budgetTotalMilliers,
//     tauxAvancement,
//     budgetUtilise,
//     budgetRestant,
//     totalUsers,
//   } = useDashboardStats();

//   // Top régions (STATIQUE pour le moment - à remplacer par API plus tard)
//   const topRegions = [
//     { name: "Région Nord", budget: 425000 },
//     { name: "Région Sud", budget: 312000 },
//     { name: "Région Est", budget: 287000 },
//     { name: "Région Ouest", budget: 198000 },
//     { name: "Région Centre", budget: 156000 },
//   ];

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
//         <div className="text-center">
//           <div 
//             className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"
//             style={{ borderColor: `${COLORS.secondary} transparent transparent transparent` }}
//           />
//           <p className="text-gray-500">Chargement du dashboard...</p>
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
//               <h1 className="text-2xl font-bold" style={{ color: COLORS.primary }}>Dashboard</h1>
//               <p className="text-gray-500 mt-1">
//                 Vue d'ensemble des projets et indicateurs clés - PMT {projetsStats.annee_pmt || new Date().getFullYear() + 1}
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
//                 className="px-4 py-2 rounded-xl text-gray-600 transition-colors flex items-center gap-2"
//                 style={{ backgroundColor: `${COLORS.primary}10` }}
//               >
//                 <RefreshCw className="w-4 h-4" />
//                 Rafraîchir
//               </button>
//               <button 
//                 className="px-4 py-2 rounded-xl text-white transition-colors flex items-center gap-2"
//                 style={{ backgroundColor: COLORS.secondary }}
//               >
//                 <Download className="w-4 h-4" />
//                 Exporter
//               </button>
//             </div>
//           </div>
//         </div>
//       </motion.div>
      
//       <div className="p-8">
//         {/* Grandes cartes KPIs */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <KPICard
//             title="Utilisateurs"
//             value={totalUsers}
//             icon={Users}
//             colorType="primary"
//           />
//           <KPICard
//             title="Régions"
//             value={counters.regions}
//             icon={MapPin}
//             colorType="secondary"
//           />
//           <KPICard
//             title="Directions"
//             value={counters.directions}
//             icon={Building2}
//             colorType="primary"
//           />
//           <KPICard
//             title="Familles"
//             value={totalFamilles}
//             icon={FolderTree}
//             colorType="secondary"
//           />
//         </div>
        
//         {/* Grille des cartes stats */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
//           <StatCard
//             title="Périmètres"
//             value={counters.perimetres}
//             icon={Layers}
//             colorType="primary"
//           />
//           <StatCard
//             title="Départements"
//             value={counters.departements}
//             icon={GitBranch}
//             colorType="secondary"
//           />
//           <StatCard
//             title="Projets Totaux"
//             value={projetsStats.projets_total}
//             icon={Package}
//             colorType="primary"
//           />
//           <StatCard
//             title="Coût Total"
//             value={budgetTotalMilliers}
//             icon={BadgeDollarSign}
//             colorType="secondary"
//             suffix="kDA"
//           />
//         </div>
        
//         {/* Charts Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
//           {/* Top 5 Régions par Budget */}
//           <TopRegionsChart regions={topRegions} />

//           {/* ⭐ Projets par PMT - GRAPHIQUE EN BARRES AVEC DONNÉES RÉELLES */}
//           <ProjectsByYearChart data={projectsByYear} loading={loadingProjectsByYear} />

//           {/* Taux d'Avancement Global */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">Taux d'Avancement Global</h3>
//                 <p className="text-sm text-gray-500 mt-1">Progression des projets</p>
//               </div>
//               <div 
//                 className="w-10 h-10 rounded-xl flex items-center justify-center"
//                 style={{ backgroundColor: COLORS.primaryLight }}
//               >
//                 <Target className="w-5 h-5" style={{ color: COLORS.primary, strokeWidth: 1.5 }} />
//               </div>
//             </div>
            
//             <div className="flex flex-col items-center">
//               <CircularProgress value={tauxAvancement} size={140} strokeWidth={10} color={COLORS.primary} />
//               <div className="mt-6 w-full">
//                 <InfoItem 
//                   label="Projets en cours" 
//                   value={projetsStats.projets_soumis - projetsStats.projets_valides} 
//                   icon={Activity} 
//                   color={COLORS.primary}
//                 />
//                 <InfoItem 
//                   label="Projets terminés" 
//                   value={projetsStats.projets_valides} 
//                   icon={CheckCircle} 
//                   color={COLORS.secondary}
//                 />
//                 <InfoItem 
//                   label="Budget utilisé" 
//                   value={`${Math.round(budgetUtilise)} kDA`} 
//                   icon={DollarSign} 
//                   color="#10B981"
//                 />
//                 <InfoItem 
//                   label="Budget restant" 
//                   value={`${Math.round(budgetRestant)} kDA`} 
//                   icon={Target} 
//                   color="#F59E0B"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* Footer Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="rounded-2xl p-6 text-white cursor-pointer hover:shadow-xl transition-all hover:scale-[1.02]"
//             style={{ background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primary}CC 100%)` }}
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
//                 <CheckCircle className="w-6 h-6" strokeWidth={1.5} />
//               </div>
//               <span className="text-3xl font-bold">{projetsStats.projets_valides}</span>
//             </div>
//             <h4 className="text-lg font-semibold mb-1">Projets Validés</h4>
//             <p className="text-blue-100 text-sm">Approuvés par le divisionnaire</p>
//             <div className="mt-4 flex items-center gap-1 text-blue-100 text-sm">
//               <span>Voir détails</span>
//               <ChevronRight className="w-4 h-4" />
//             </div>
//           </motion.div>
          
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className="rounded-2xl p-6 text-white cursor-pointer hover:shadow-xl transition-all hover:scale-[1.02]"
//             style={{ background: `linear-gradient(135deg, ${COLORS.secondary} 0%, ${COLORS.secondary}CC 100%)` }}
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
//                 <AlertCircle className="w-6 h-6" strokeWidth={1.5} />
//               </div>
//               <span className="text-3xl font-bold">{projetsStats.projets_soumis}</span>
//             </div>
//             <h4 className="text-lg font-semibold mb-1">Projets Soumis</h4>
//             <p className="text-orange-100 text-sm">En attente de validation</p>
//             <div className="mt-4 flex items-center gap-1 text-orange-100 text-sm">
//               <span>Voir détails</span>
//               <ChevronRight className="w-4 h-4" />
//             </div>
//           </motion.div>
          
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4 }}
//             className="bg-white rounded-2xl p-6 border cursor-pointer hover:shadow-xl transition-all hover:scale-[1.02] group"
//             style={{ borderColor: `${COLORS.primary}20` }}
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div 
//                 className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors"
//                 style={{ backgroundColor: `${COLORS.primary}10` }}
//               >
//                 <Landmark className="w-6 h-6" style={{ color: COLORS.primary, strokeWidth: 1.5 }} />
//               </div>
//               <span className="text-3xl font-bold text-gray-800">
//                 {budgetTotalMilliers.toFixed(0)}M
//               </span>
//             </div>
//             <h4 className="text-lg font-semibold text-gray-800 mb-1">Budget Total</h4>
//             <p className="text-gray-500 text-sm">Milliers DA</p>
//             <div className="mt-4">
//               <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
//                 <div 
//                   className="h-full rounded-full"
//                   style={{ width: `${tauxAvancement}%`, background: `linear-gradient(90deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)` }}
//                 />
//               </div>
//               <p className="text-xs text-gray-400 mt-2">{tauxAvancement}% des projets validés</p>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


















// import React from "react";
// import { motion } from 'framer-motion';
// import { 
//   Users, 
//   MapPin, 
//   Building2, 
//   Layers, 
//   GitBranch, 
//   DollarSign, 
//   Calendar,
//   ChevronRight,
//   Download,
//   RefreshCw,
//   Clock,
//   CheckCircle,
//   AlertCircle,
//   Activity,
//   Globe,
//   FolderTree,
//   Landmark,
//   Package,
//   BadgeDollarSign,
//   Target
// } from "lucide-react";
// import useDashboardStats from "../../../hooks/useDashboardStats";

// // Couleurs principales
// const COLORS = {
//   primary: '#0E47C8',
//   secondary: '#FF8500',
//   primaryLight: '#0E47C820',
//   secondaryLight: '#FF850020',
// };

// // Composant Circular Progress
// const CircularProgress = ({ value, size = 120, strokeWidth = 8, color }) => {
//   const radius = (size - strokeWidth) / 2;
//   const circumference = radius * 2 * Math.PI;
//   const offset = circumference - (value / 100) * circumference;
  
//   return (
//     <div className="relative" style={{ width: size, height: size }}>
//       <svg width={size} height={size} className="transform -rotate-90">
//         <circle
//           cx={size / 2}
//           cy={size / 2}
//           r={radius}
//           fill="none"
//           stroke="#E5E7EB"
//           strokeWidth={strokeWidth}
//         />
//         <motion.circle
//           cx={size / 2}
//           cy={size / 2}
//           r={radius}
//           fill="none"
//           stroke={color}
//           strokeWidth={strokeWidth}
//           strokeLinecap="round"
//           initial={{ strokeDashoffset: circumference }}
//           animate={{ strokeDashoffset: offset }}
//           transition={{ duration: 1.5, ease: "easeOut" }}
//           style={{
//             strokeDasharray: circumference,
//           }}
//         />
//       </svg>
//       <div className="absolute inset-0 flex items-center justify-center">
//         <motion.span
//           initial={{ opacity: 0, scale: 0 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5, delay: 0.5 }}
//           className="text-2xl font-bold"
//           style={{ color: color }}
//         >
//           {value}%
//         </motion.span>
//       </div>
//     </div>
//   );
// };

// // Composant KPI Card
// const KPICard = ({ title, value, icon: Icon, colorType, onClick }) => {
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
//       <div 
//         className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//         style={{ background: `linear-gradient(135deg, ${bgLight} 0%, transparent 100%)` }}
//       />
      
//       <div className="relative z-10">
//         <div className="flex items-center justify-between mb-4">
//           <div 
//             className="w-12 h-12 rounded-xl flex items-center justify-center"
//             style={{ backgroundColor: bgLight }}
//           >
//             <Icon 
//               className="w-6 h-6" 
//               style={{ color: mainColor, strokeWidth: 1.5 }}
//               stroke="currentColor"
//               fill="none"
//             />
//           </div>
//         </div>
        
//         <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
//         <div className="flex items-baseline gap-2">
//           <span className="text-3xl font-bold text-gray-800">{value?.toLocaleString() || 0}</span>
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
//       <div 
//         className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//         style={{ background: `linear-gradient(135deg, ${bgLight} 0%, transparent 100%)` }}
//       />
      
//       <div className="relative z-10">
//         <div className="flex items-center justify-between mb-3">
//           <div 
//             className="w-10 h-10 rounded-xl flex items-center justify-center"
//             style={{ backgroundColor: bgLight }}
//           >
//             <Icon 
//               className="w-5 h-5" 
//               style={{ color: mainColor, strokeWidth: 1.5 }}
//               stroke="currentColor"
//               fill="none"
//             />
//           </div>
//           <div className="w-8 h-8 rounded-full bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//             <ChevronRight className="w-4 h-4 text-gray-400" />
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

// // Composant InfoItem
// const InfoItem = ({ label, value, icon: Icon, color }) => {
//   return (
//     <motion.div 
//       className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
//       whileHover={{ x: 5 }}
//     >
//       <div className="flex items-center gap-3">
//         <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}10` }}>
//           <Icon className="w-4 h-4" style={{ color }} strokeWidth={1.5} />
//         </div>
//         <span className="text-sm text-gray-600">{label}</span>
//       </div>
//       <span className="text-sm font-semibold" style={{ color }}>{value}</span>
//     </motion.div>
//   );
// };

// // Composant Top 5 Regions (statique pour le moment)
// const TopRegionsChart = ({ regions }) => {
//   if (!regions || regions.length === 0) {
//     return (
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//         <div className="text-center text-gray-500">Aucune donnée de région disponible</div>
//       </div>
//     );
//   }
  
//   const maxValue = Math.max(...regions.map(r => r.budget));
  
//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h3 className="text-lg font-semibold text-gray-800">Top 5 Régions par Budget</h3>
//           <p className="text-sm text-gray-500 mt-1">Coût global initial en milliers DA</p>
//         </div>
//         <div 
//           className="w-10 h-10 rounded-xl flex items-center justify-center"
//           style={{ backgroundColor: COLORS.secondaryLight }}
//         >
//           <Globe className="w-5 h-5" style={{ color: COLORS.secondary, strokeWidth: 1.5 }} />
//         </div>
//       </div>
      
//       <div className="space-y-4">
//         {regions.map((region, index) => (
//           <motion.div
//             key={region.name}
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: index * 0.1 }}
//             className="group cursor-pointer"
//           >
//             <div className="flex items-center justify-between mb-1">
//               <div className="flex items-center gap-3">
//                 <span className={`text-sm font-bold w-6 ${
//                   index === 0 ? 'text-yellow-500' : 
//                   index === 1 ? 'text-gray-400' : 
//                   index === 2 ? 'text-amber-600' : 'text-gray-400'
//                 }`}>
//                   #{index + 1}
//                 </span>
//                 <span className="text-sm font-medium text-gray-700">{region.name}</span>
//               </div>
//               <span className="text-sm font-semibold text-gray-800">
//                 {region.budget.toLocaleString('fr-DZ')} kDA
//               </span>
//             </div>
//             <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
//               <motion.div
//                 initial={{ width: 0 }}
//                 animate={{ width: `${(region.budget / maxValue) * 100}%` }}
//                 transition={{ duration: 0.8, delay: index * 0.1 }}
//                 className="absolute inset-y-0 left-0 rounded-full"
//                 style={{ background: `linear-gradient(90deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)` }}
//               />
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // ⭐ COMPOSANT PROJETS PAR PMT - GRAPHIQUE EN BARRES AVEC DONNÉES RÉELLES
// const ProjectsByYearChart = ({ data, loading }) => {
//   if (loading) {
//     return (
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h3 className="text-lg font-semibold text-gray-800">Projets par PMT</h3>
//             <p className="text-sm text-gray-500 mt-1">Chargement...</p>
//           </div>
//           <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: COLORS.primaryLight }}>
//             <Calendar className="w-5 h-5" style={{ color: COLORS.primary, strokeWidth: 1.5 }} />
//           </div>
//         </div>
//         <div className="h-64 flex items-center justify-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//         </div>
//       </div>
//     );
//   }
  
//   if (!data || data.length === 0) {
//     return (
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h3 className="text-lg font-semibold text-gray-800">Projets par PMT</h3>
//             <p className="text-sm text-gray-500 mt-1">Aucune donnée disponible</p>
//           </div>
//           <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: COLORS.primaryLight }}>
//             <Calendar className="w-5 h-5" style={{ color: COLORS.primary, strokeWidth: 1.5 }} />
//           </div>
//         </div>
//         <div className="h-64 flex items-center justify-center text-gray-400">
//           Aucun projet trouvé
//         </div>
//       </div>
//     );
//   }
  
//   const maxCount = Math.max(...data.map(d => d.count));
  
//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h3 className="text-lg font-semibold text-gray-800">Projets par PMT</h3>
//           <p className="text-sm text-gray-500 mt-1">Nombre de projets par période PMT</p>
//         </div>
//         <div 
//           className="w-10 h-10 rounded-xl flex items-center justify-center"
//           style={{ backgroundColor: COLORS.primaryLight }}
//         >
//           <Calendar className="w-5 h-5" style={{ color: COLORS.primary, strokeWidth: 1.5 }} />
//         </div>
//       </div>
      
//       <div className="flex items-end justify-between gap-4 h-64">
//         {data.map((item, index) => (
//           <motion.div
//             key={item.year}
//             className="flex-1 flex flex-col items-center gap-2"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//           >
//             <motion.div
//               initial={{ height: 0 }}
//               animate={{ height: `${(item.count / maxCount) * 200}px` }}
//               transition={{ duration: 0.6, delay: index * 0.1 }}
//               className="w-full rounded-t-lg cursor-pointer hover:opacity-80 transition-opacity"
//               style={{ 
//                 background: `linear-gradient(180deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`,
//                 height: `${(item.count / maxCount) * 200}px`
//               }}
//             />
//             <span className="text-xs text-gray-500 font-medium">{item.year}</span>
//             <span className="text-sm font-bold text-gray-700">{item.count}</span>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // Composant Principal Dashboard
// const Dashboard = () => {
//   const {
//     counters,
//     projetsStats,
//     projectsByYear,
//     loadingProjectsByYear,
//     loading,
//     error,
//     lastUpdate,
//     refreshData,
//     totalFamilles,
//     budgetTotalMilliers,
//     tauxAvancement,
//     budgetUtilise,
//     budgetRestant,
//     totalUsers,
//   } = useDashboardStats();

//   // Top régions (STATIQUE pour le moment - à remplacer par API plus tard)
//   const topRegions = [
//     { name: "Région Nord", budget: 425000 },
//     { name: "Région Sud", budget: 312000 },
//     { name: "Région Est", budget: 287000 },
//     { name: "Région Ouest", budget: 198000 },
//     { name: "Région Centre", budget: 156000 },
//   ];

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
//         <div className="text-center">
//           <div 
//             className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"
//             style={{ borderColor: `${COLORS.secondary} transparent transparent transparent` }}
//           />
//           <p className="text-gray-500">Chargement du dashboard...</p>
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
//               <h1 className="text-2xl font-bold" style={{ color: COLORS.primary }}>Dashboard</h1>
//               <p className="text-gray-500 mt-1">
//                 Vue d'ensemble des projets et indicateurs clés - PMT {projetsStats.annee_pmt || new Date().getFullYear() + 1}
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
//                 className="px-4 py-2 rounded-xl text-gray-600 transition-colors flex items-center gap-2"
//                 style={{ backgroundColor: `${COLORS.primary}10` }}
//               >
//                 <RefreshCw className="w-4 h-4" />
//                 Rafraîchir
//               </button>
//               <button 
//                 className="px-4 py-2 rounded-xl text-white transition-colors flex items-center gap-2"
//                 style={{ backgroundColor: COLORS.secondary }}
//               >
//                 <Download className="w-4 h-4" />
//                 Exporter
//               </button>
//             </div>
//           </div>
//         </div>
//       </motion.div>
      
//       <div className="p-8">
//         {/* Grandes cartes KPIs */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <KPICard
//             title="Utilisateurs"
//             value={totalUsers}
//             icon={Users}
//             colorType="primary"
//           />
//           <KPICard
//             title="Régions"
//             value={counters.regions}
//             icon={MapPin}
//             colorType="secondary"
//           />
//           <KPICard
//             title="Directions"
//             value={counters.directions}
//             icon={Building2}
//             colorType="primary"
//           />
//           <KPICard
//             title="Familles"
//             value={totalFamilles}
//             icon={FolderTree}
//             colorType="secondary"
//           />
//         </div>
        
//         {/* Grille des cartes stats */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
//           <StatCard
//             title="Périmètres"
//             value={counters.perimetres}
//             icon={Layers}
//             colorType="primary"
//           />
//           <StatCard
//             title="Départements"
//             value={counters.departements}
//             icon={GitBranch}
//             colorType="secondary"
//           />
//           <StatCard
//             title="Projets Totaux"
//             value={projetsStats.projets_total}
//             icon={Package}
//             colorType="primary"
//           />
//           <StatCard
//             title="Coût Total"
//             value={budgetTotalMilliers}
//             icon={BadgeDollarSign}
//             colorType="secondary"
//             suffix="kDA"
//           />
//         </div>
        
//         {/* Charts Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
//           {/* Top 5 Régions par Budget */}
//           <TopRegionsChart regions={topRegions} />

//           {/* ⭐ Projets par PMT - GRAPHIQUE EN BARRES AVEC DONNÉES RÉELLES */}
//           <ProjectsByYearChart data={projectsByYear} loading={loadingProjectsByYear} />

//           {/* Taux d'Avancement Global */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">Taux d'Avancement Global</h3>
//                 <p className="text-sm text-gray-500 mt-1">Progression des projets</p>
//               </div>
//               <div 
//                 className="w-10 h-10 rounded-xl flex items-center justify-center"
//                 style={{ backgroundColor: COLORS.primaryLight }}
//               >
//                 <Target className="w-5 h-5" style={{ color: COLORS.primary, strokeWidth: 1.5 }} />
//               </div>
//             </div>
            
//             <div className="flex flex-col items-center">
//               <CircularProgress value={tauxAvancement} size={140} strokeWidth={10} color={COLORS.primary} />
//               <div className="mt-6 w-full">
//                 <InfoItem 
//                   label="Projets en cours" 
//                   value={projetsStats.projets_soumis - projetsStats.projets_valides} 
//                   icon={Activity} 
//                   color={COLORS.primary}
//                 />
//                 <InfoItem 
//                   label="Projets terminés" 
//                   value={projetsStats.projets_valides} 
//                   icon={CheckCircle} 
//                   color={COLORS.secondary}
//                 />
//                 <InfoItem 
//                   label="Budget utilisé" 
//                   value={`${Math.round(budgetUtilise)} kDA`} 
//                   icon={DollarSign} 
//                   color="#10B981"
//                 />
//                 <InfoItem 
//                   label="Budget restant" 
//                   value={`${Math.round(budgetRestant)} kDA`} 
//                   icon={Target} 
//                   color="#F59E0B"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* Footer Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="rounded-2xl p-6 text-white cursor-pointer hover:shadow-xl transition-all hover:scale-[1.02]"
//             style={{ background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primary}CC 100%)` }}
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
//                 <CheckCircle className="w-6 h-6" strokeWidth={1.5} />
//               </div>
//               <span className="text-3xl font-bold">{projetsStats.projets_valides}</span>
//             </div>
//             <h4 className="text-lg font-semibold mb-1">Projets Validés</h4>
//             <p className="text-blue-100 text-sm">Approuvés par le divisionnaire</p>
//             <div className="mt-4 flex items-center gap-1 text-blue-100 text-sm">
//               <span>Voir détails</span>
//               <ChevronRight className="w-4 h-4" />
//             </div>
//           </motion.div>
          
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className="rounded-2xl p-6 text-white cursor-pointer hover:shadow-xl transition-all hover:scale-[1.02]"
//             style={{ background: `linear-gradient(135deg, ${COLORS.secondary} 0%, ${COLORS.secondary}CC 100%)` }}
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
//                 <AlertCircle className="w-6 h-6" strokeWidth={1.5} />
//               </div>
//               <span className="text-3xl font-bold">{projetsStats.projets_soumis}</span>
//             </div>
//             <h4 className="text-lg font-semibold mb-1">Projets Soumis</h4>
//             <p className="text-orange-100 text-sm">En attente de validation</p>
//             <div className="mt-4 flex items-center gap-1 text-orange-100 text-sm">
//               <span>Voir détails</span>
//               <ChevronRight className="w-4 h-4" />
//             </div>
//           </motion.div>
          
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4 }}
//             className="bg-white rounded-2xl p-6 border cursor-pointer hover:shadow-xl transition-all hover:scale-[1.02] group"
//             style={{ borderColor: `${COLORS.primary}20` }}
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div 
//                 className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors"
//                 style={{ backgroundColor: `${COLORS.primary}10` }}
//               >
//                 <Landmark className="w-6 h-6" style={{ color: COLORS.primary, strokeWidth: 1.5 }} />
//               </div>
//               <span className="text-3xl font-bold text-gray-800">
//                 {budgetTotalMilliers.toFixed(0)}M
//               </span>
//             </div>
//             <h4 className="text-lg font-semibold text-gray-800 mb-1">Budget Total</h4>
//             <p className="text-gray-500 text-sm">Milliers DA</p>
//             <div className="mt-4">
//               <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
//                 <div 
//                   className="h-full rounded-full"
//                   style={{ width: `${tauxAvancement}%`, background: `linear-gradient(90deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)` }}
//                 />
//               </div>
//               <p className="text-xs text-gray-400 mt-2">{tauxAvancement}% des projets validés</p>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;











// import React from "react";
// import { motion } from 'framer-motion';
// import { 
//   Users, 
//   MapPin, 
//   Building2, 
//   Layers, 
//   GitBranch, 
//   DollarSign, 
//   Calendar,
//   ChevronRight,
//   Download,
//   RefreshCw,
//   Clock,
//   CheckCircle,
//   AlertCircle,
//   Activity,
//   Globe,
//   FolderTree,
//   Landmark,
//   Package,
//   BadgeDollarSign,
//   Target
// } from "lucide-react";
// import useDashboardStats from "../../../hooks/useDashboardStats";

// // Couleurs principales
// const COLORS = {
//   primary: '#0E47C8',
//   secondary: '#FF8500',
//   primaryLight: '#0E47C820',
//   secondaryLight: '#FF850020',
// };

// // Composant Circular Progress
// const CircularProgress = ({ value, size = 120, strokeWidth = 8, color }) => {
//   const radius = (size - strokeWidth) / 2;
//   const circumference = radius * 2 * Math.PI;
//   const offset = circumference - (value / 100) * circumference;
  
//   return (
//     <div className="relative" style={{ width: size, height: size }}>
//       <svg width={size} height={size} className="transform -rotate-90">
//         <circle
//           cx={size / 2}
//           cy={size / 2}
//           r={radius}
//           fill="none"
//           stroke="#E5E7EB"
//           strokeWidth={strokeWidth}
//         />
//         <motion.circle
//           cx={size / 2}
//           cy={size / 2}
//           r={radius}
//           fill="none"
//           stroke={color}
//           strokeWidth={strokeWidth}
//           strokeLinecap="round"
//           initial={{ strokeDashoffset: circumference }}
//           animate={{ strokeDashoffset: offset }}
//           transition={{ duration: 1.5, ease: "easeOut" }}
//           style={{
//             strokeDasharray: circumference,
//           }}
//         />
//       </svg>
//       <div className="absolute inset-0 flex items-center justify-center">
//         <motion.span
//           initial={{ opacity: 0, scale: 0 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5, delay: 0.5 }}
//           className="text-2xl font-bold"
//           style={{ color: color }}
//         >
//           {value}%
//         </motion.span>
//       </div>
//     </div>
//   );
// };

// // Composant KPI Card
// const KPICard = ({ title, value, icon: Icon, colorType, onClick }) => {
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
//       <div 
//         className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//         style={{ background: `linear-gradient(135deg, ${bgLight} 0%, transparent 100%)` }}
//       />
      
//       <div className="relative z-10">
//         <div className="flex items-center justify-between mb-4">
//           <div 
//             className="w-12 h-12 rounded-xl flex items-center justify-center"
//             style={{ backgroundColor: bgLight }}
//           >
//             <Icon 
//               className="w-6 h-6" 
//               style={{ color: mainColor, strokeWidth: 1.5 }}
//               stroke="currentColor"
//               fill="none"
//             />
//           </div>
//         </div>
        
//         <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
//         <div className="flex items-baseline gap-2">
//           <span className="text-3xl font-bold text-gray-800">{value?.toLocaleString() || 0}</span>
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
//       <div 
//         className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//         style={{ background: `linear-gradient(135deg, ${bgLight} 0%, transparent 100%)` }}
//       />
      
//       <div className="relative z-10">
//         <div className="flex items-center justify-between mb-3">
//           <div 
//             className="w-10 h-10 rounded-xl flex items-center justify-center"
//             style={{ backgroundColor: bgLight }}
//           >
//             <Icon 
//               className="w-5 h-5" 
//               style={{ color: mainColor, strokeWidth: 1.5 }}
//               stroke="currentColor"
//               fill="none"
//             />
//           </div>
//           <div className="w-8 h-8 rounded-full bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//             <ChevronRight className="w-4 h-4 text-gray-400" />
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

// // Composant InfoItem
// const InfoItem = ({ label, value, icon: Icon, color }) => {
//   return (
//     <motion.div 
//       className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
//       whileHover={{ x: 5 }}
//     >
//       <div className="flex items-center gap-3">
//         <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}10` }}>
//           <Icon className="w-4 h-4" style={{ color }} strokeWidth={1.5} />
//         </div>
//         <span className="text-sm text-gray-600">{label}</span>
//       </div>
//       <span className="text-sm font-semibold" style={{ color }}>{value}</span>
//     </motion.div>
//   );
// };

// // Composant Top 5 Regions (statique pour le moment)
// const TopRegionsChart = ({ regions }) => {
//   if (!regions || regions.length === 0) {
//     return (
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//         <div className="text-center text-gray-500">Aucune donnée de région disponible</div>
//       </div>
//     );
//   }
  
//   const maxValue = Math.max(...regions.map(r => r.budget));
  
//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h3 className="text-lg font-semibold text-gray-800">Top 5 Régions par Budget</h3>
//           <p className="text-sm text-gray-500 mt-1">Coût global initial en milliers DA</p>
//         </div>
//         <div 
//           className="w-10 h-10 rounded-xl flex items-center justify-center"
//           style={{ backgroundColor: COLORS.secondaryLight }}
//         >
//           <Globe className="w-5 h-5" style={{ color: COLORS.secondary, strokeWidth: 1.5 }} />
//         </div>
//       </div>
      
//       <div className="space-y-4">
//         {regions.map((region, index) => (
//           <motion.div
//             key={region.name}
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: index * 0.1 }}
//             className="group cursor-pointer"
//           >
//             <div className="flex items-center justify-between mb-1">
//               <div className="flex items-center gap-3">
//                 <span className={`text-sm font-bold w-6 ${
//                   index === 0 ? 'text-yellow-500' : 
//                   index === 1 ? 'text-gray-400' : 
//                   index === 2 ? 'text-amber-600' : 'text-gray-400'
//                 }`}>
//                   #{index + 1}
//                 </span>
//                 <span className="text-sm font-medium text-gray-700">{region.name}</span>
//               </div>
//               <span className="text-sm font-semibold text-gray-800">
//                 {region.budget.toLocaleString('fr-DZ')} kDA
//               </span>
//             </div>
//             <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
//               <motion.div
//                 initial={{ width: 0 }}
//                 animate={{ width: `${(region.budget / maxValue) * 100}%` }}
//                 transition={{ duration: 0.8, delay: index * 0.1 }}
//                 className="absolute inset-y-0 left-0 rounded-full"
//                 style={{ background: `linear-gradient(90deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)` }}
//               />
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // ⭐ COMPOSANT PROJETS PAR ANNÉE - GRAPHIQUE EN BARRES AVEC DONNÉES RÉELLES
// const ProjectsByYearChart = ({ data, loading }) => {
//   if (loading) {
//     return (
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h3 className="text-lg font-semibold text-gray-800">Projets par année de début</h3>
//             <p className="text-sm text-gray-500 mt-1">Chargement...</p>
//           </div>
//           <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: COLORS.primaryLight }}>
//             <Calendar className="w-5 h-5" style={{ color: COLORS.primary, strokeWidth: 1.5 }} />
//           </div>
//         </div>
//         <div className="h-64 flex items-center justify-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//         </div>
//       </div>
//     );
//   }
  
//   if (!data || data.length === 0) {
//     return (
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h3 className="text-lg font-semibold text-gray-800">Projets par année de début</h3>
//             <p className="text-sm text-gray-500 mt-1">Aucune donnée disponible</p>
//           </div>
//           <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: COLORS.primaryLight }}>
//             <Calendar className="w-5 h-5" style={{ color: COLORS.primary, strokeWidth: 1.5 }} />
//           </div>
//         </div>
//         <div className="h-64 flex items-center justify-center text-gray-400">
//           Aucun projet trouvé
//         </div>
//       </div>
//     );
//   }
  
//   const maxCount = Math.max(...data.map(d => d.count), 1);
  
//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h3 className="text-lg font-semibold text-gray-800">Projets pour PMT</h3>
//           <p className="text-sm text-gray-500 mt-1">Nombre de projets pour PMT</p>
//         </div>
//         <div 
//           className="w-10 h-10 rounded-xl flex items-center justify-center"
//           style={{ backgroundColor: COLORS.primaryLight }}
//         >
//           <Calendar className="w-5 h-5" style={{ color: COLORS.primary, strokeWidth: 1.5 }} />
//         </div>
//       </div>
      
//       <div className="flex items-end justify-between gap-4 h-64">
//         {data.map((item, index) => (
//           <motion.div
//             key={item.year}
//             className="flex-1 flex flex-col items-center gap-2"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//           >
//             <motion.div
//               initial={{ height: 0 }}
//               animate={{ height: `${(item.count / maxCount) * 200}px` }}
//               transition={{ duration: 0.6, delay: index * 0.1 }}
//               className="w-full rounded-t-lg cursor-pointer hover:opacity-80 transition-opacity group relative"
//               style={{ 
//                 background: `linear-gradient(180deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`,
//                 height: `${(item.count / maxCount) * 200}px`
//               }}
//             >
//               {/* Tooltip au survol */}
//               <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
//                 {item.count} projet{item.count > 1 ? 's' : ''}
//               </div>
//             </motion.div>
//             <span className="text-xs text-gray-500 font-medium">{item.year}</span>
//             <span className="text-sm font-bold text-gray-700">{item.count}</span>
//           </motion.div>
//         ))}
//       </div>
      
//       {/* Légende */}
//       <div className="mt-6 pt-4 border-t border-gray-100">
//         <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
//           <div className="flex items-center gap-2">
//             <div className="w-3 h-3 rounded" style={{ background: COLORS.primary }}></div>
//             <span>Nombre de projets</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <Calendar className="w-3 h-3" />
//             <span>Année de début du projet</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Composant Principal Dashboard
// const Dashboard = () => {
//   const {
//     counters,
//     projetsStats,
//     projetsByYear,           // ✅ Variable corrigée
//     loadingProjetsByYear,
//     topRegions,           // ← Données du Top 5
//     loadingTopRegions,    // ← Loading state    // ✅ Variable corrigée
//     loading,
//     error,
//     lastUpdate,
//     refreshData,
//     totalFamilles,
//     budgetTotalMilliers,
//     tauxAvancement,
//     budgetUtilise,
//     budgetRestant,
//     totalUsers,
//   } = useDashboardStats();

//   // Top régions (STATIQUE pour le moment - à remplacer par API plus tard)
//   // const topRegions = [
//   //   { name: "Région Nord", budget: 425000 },
//   //   { name: "Région Sud", budget: 312000 },
//   //   { name: "Région Est", budget: 287000 },
//   //   { name: "Région Ouest", budget: 198000 },
//   //   { name: "Région Centre", budget: 156000 },
//   // ];

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
//         <div className="text-center">
//           <div 
//             className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"
//             style={{ borderColor: `${COLORS.secondary} transparent transparent transparent` }}
//           />
//           <p className="text-gray-500">Chargement du dashboard...</p>
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
//               <h1 className="text-2xl font-bold" style={{ color: COLORS.primary }}>Dashboard</h1>
//               <p className="text-gray-500 mt-1">
//                 Vue d'ensemble des projets et indicateurs clés - PMT {projetsStats.annee_pmt || new Date().getFullYear() + 1}
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
//                 className="px-4 py-2 rounded-xl text-gray-600 transition-colors flex items-center gap-2"
//                 style={{ backgroundColor: `${COLORS.primary}10` }}
//               >
//                 <RefreshCw className="w-4 h-4" />
//                 Rafraîchir
//               </button>
//               <button 
//                 className="px-4 py-2 rounded-xl text-white transition-colors flex items-center gap-2"
//                 style={{ backgroundColor: COLORS.secondary }}
//               >
//                 <Download className="w-4 h-4" />
//                 Exporter
//               </button>
//             </div>
//           </div>
//         </div>
//       </motion.div>
      
//       <div className="p-8">
//         {/* Grandes cartes KPIs */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <KPICard
//             title="Utilisateurs"
//             value={totalUsers}
//             icon={Users}
//             colorType="primary"
//           />
//           <KPICard
//             title="Régions"
//             value={counters.regions}
//             icon={MapPin}
//             colorType="secondary"
//           />
//           <KPICard
//             title="Directions"
//             value={counters.directions}
//             icon={Building2}
//             colorType="primary"
//           />
//           <KPICard
//             title="Familles"
//             value={totalFamilles}
//             icon={FolderTree}
//             colorType="secondary"
//           />
//         </div>
        
//         {/* Grille des cartes stats */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
//           <StatCard
//             title="Périmètres"
//             value={counters.perimetres}
//             icon={Layers}
//             colorType="primary"
//           />
//           <StatCard
//             title="Départements"
//             value={counters.departements}
//             icon={GitBranch}
//             colorType="secondary"
//           />
//           <StatCard
//             title="Projets Totaux"
//             value={projetsStats.projets_total}
//             icon={Package}
//             colorType="primary"
//           />
//           <StatCard
//             title="Coût Total"
//             value={budgetTotalMilliers}
//             icon={BadgeDollarSign}
//             colorType="secondary"
//             suffix="kDA"
//           />
//         </div>
        
//         {/* Charts Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
//           {/* Top 5 Régions par Budget */}
//           <TopRegionsChart 
//             regions={topRegions} 
//             loading={loadingTopRegions}
//            />

//           {/* ⭐ Projets par Année - GRAPHIQUE EN BARRES AVEC DONNÉES RÉELLES */}
//           <ProjectsByYearChart 
//             data={projetsByYear} 
//             loading={loadingProjetsByYear} 
//           />

//           {/* Taux d'Avancement Global */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">Taux d'Avancement Global</h3>
//                 <p className="text-sm text-gray-500 mt-1">Progression des projets</p>
//               </div>
//               <div 
//                 className="w-10 h-10 rounded-xl flex items-center justify-center"
//                 style={{ backgroundColor: COLORS.primaryLight }}
//               >
//                 <Target className="w-5 h-5" style={{ color: COLORS.primary, strokeWidth: 1.5 }} />
//               </div>
//             </div>
            
//             <div className="flex flex-col items-center">
//               <CircularProgress value={tauxAvancement} size={140} strokeWidth={10} color={COLORS.primary} />
//               <div className="mt-6 w-full">
//                 <InfoItem 
//                   label="Projets en cours" 
//                   value={projetsStats.projets_soumis - projetsStats.projets_valides} 
//                   icon={Activity} 
//                   color={COLORS.primary}
//                 />
//                 <InfoItem 
//                   label="Projets terminés" 
//                   value={projetsStats.projets_valides} 
//                   icon={CheckCircle} 
//                   color={COLORS.secondary}
//                 />
//                 <InfoItem 
//                   label="Budget utilisé" 
//                   value={`${Math.round(budgetUtilise)} kDA`} 
//                   icon={DollarSign} 
//                   color="#10B981"
//                 />
//                 <InfoItem 
//                   label="Budget restant" 
//                   value={`${Math.round(budgetRestant)} kDA`} 
//                   icon={Target} 
//                   color="#F59E0B"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* Footer Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="rounded-2xl p-6 text-white cursor-pointer hover:shadow-xl transition-all hover:scale-[1.02]"
//             style={{ background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primary}CC 100%)` }}
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
//                 <CheckCircle className="w-6 h-6" strokeWidth={1.5} />
//               </div>
//               <span className="text-3xl font-bold">{projetsStats.projets_valides}</span>
//             </div>
//             <h4 className="text-lg font-semibold mb-1">Projets Validés</h4>
//             <p className="text-blue-100 text-sm">Approuvés par le divisionnaire</p>
//             <div className="mt-4 flex items-center gap-1 text-blue-100 text-sm">
//               <span>Voir détails</span>
//               <ChevronRight className="w-4 h-4" />
//             </div>
//           </motion.div>
          
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className="rounded-2xl p-6 text-white cursor-pointer hover:shadow-xl transition-all hover:scale-[1.02]"
//             style={{ background: `linear-gradient(135deg, ${COLORS.secondary} 0%, ${COLORS.secondary}CC 100%)` }}
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
//                 <AlertCircle className="w-6 h-6" strokeWidth={1.5} />
//               </div>
//               <span className="text-3xl font-bold">{projetsStats.projets_soumis}</span>
//             </div>
//             <h4 className="text-lg font-semibold mb-1">Projets Soumis</h4>
//             <p className="text-orange-100 text-sm">En attente de validation</p>
//             <div className="mt-4 flex items-center gap-1 text-orange-100 text-sm">
//               <span>Voir détails</span>
//               <ChevronRight className="w-4 h-4" />
//             </div>
//           </motion.div>
          
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4 }}
//             className="bg-white rounded-2xl p-6 border cursor-pointer hover:shadow-xl transition-all hover:scale-[1.02] group"
//             style={{ borderColor: `${COLORS.primary}20` }}
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div 
//                 className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors"
//                 style={{ backgroundColor: `${COLORS.primary}10` }}
//               >
//                 <Landmark className="w-6 h-6" style={{ color: COLORS.primary, strokeWidth: 1.5 }} />
//               </div>
//               <span className="text-3xl font-bold text-gray-800">
//                 {budgetTotalMilliers.toFixed(0)}M
//               </span>
//             </div>
//             <h4 className="text-lg font-semibold text-gray-800 mb-1">Budget Total</h4>
//             <p className="text-gray-500 text-sm">Milliers DA</p>
//             <div className="mt-4">
//               <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
//                 <div 
//                   className="h-full rounded-full"
//                   style={{ width: `${tauxAvancement}%`, background: `linear-gradient(90deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)` }}
//                 />
//               </div>
//               <p className="text-xs text-gray-400 mt-2">{tauxAvancement}% des projets validés</p>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;




























// import React from "react";
// import { motion } from 'framer-motion';
// import { 
//   Users, 
//   MapPin, 
//   Building2, 
//   Layers, 
//   GitBranch, 
//   DollarSign, 
//   Calendar,
//   ChevronRight,
//   Download,
//   RefreshCw,
//   Clock,
//   CheckCircle,
//   AlertCircle,
//   Activity,
//   Globe,
//   FolderTree,
//   Landmark,
//   Package,
//   BadgeDollarSign,
//   Target,
//   Send,
//   XCircle
// } from "lucide-react";
// import useDashboardStats from "../../../hooks/useDashboardStats";

// const COLORS = {
//   primary: '#0E47C8',
//   secondary: '#FF8500',
//   primaryLight: '#0E47C820',
//   secondaryLight: '#FF850020',
// };

// const CircularProgress = ({ value, size = 120, strokeWidth = 8, color }) => {
//   const radius = (size - strokeWidth) / 2;
//   const circumference = radius * 2 * Math.PI;
//   const offset = circumference - (value / 100) * circumference;
  
//   return (
//     <div className="relative" style={{ width: size, height: size }}>
//       <svg width={size} height={size} className="transform -rotate-90">
//         <circle
//           cx={size / 2}
//           cy={size / 2}
//           r={radius}
//           fill="none"
//           stroke="#E5E7EB"
//           strokeWidth={strokeWidth}
//         />
//         <motion.circle
//           cx={size / 2}
//           cy={size / 2}
//           r={radius}
//           fill="none"
//           stroke={color}
//           strokeWidth={strokeWidth}
//           strokeLinecap="round"
//           initial={{ strokeDashoffset: circumference }}
//           animate={{ strokeDashoffset: offset }}
//           transition={{ duration: 1.5, ease: "easeOut" }}
//           style={{
//             strokeDasharray: circumference,
//           }}
//         />
//       </svg>
//       <div className="absolute inset-0 flex items-center justify-center">
//         <motion.span
//           initial={{ opacity: 0, scale: 0 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5, delay: 0.5 }}
//           className="text-2xl font-bold"
//           style={{ color: color }}
//         >
//           {value}%
//         </motion.span>
//       </div>
//     </div>
//   );
// };

// const KPICard = ({ title, value, icon: Icon, colorType, onClick }) => {
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
//       <div 
//         className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//         style={{ background: `linear-gradient(135deg, ${bgLight} 0%, transparent 100%)` }}
//       />
//       <div className="relative z-10">
//         <div className="flex items-center justify-between mb-4">
//           <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: bgLight }}>
//             <Icon className="w-6 h-6" style={{ color: mainColor, strokeWidth: 1.5 }} stroke="currentColor" fill="none" />
//           </div>
//         </div>
//         <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
//         <div className="flex items-baseline gap-2">
//           <span className="text-3xl font-bold text-gray-800">{value?.toLocaleString() || 0}</span>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

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
//       <div 
//         className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//         style={{ background: `linear-gradient(135deg, ${bgLight} 0%, transparent 100%)` }}
//       />
//       <div className="relative z-10">
//         <div className="flex items-center justify-between mb-3">
//           <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: bgLight }}>
//             <Icon className="w-5 h-5" style={{ color: mainColor, strokeWidth: 1.5 }} stroke="currentColor" fill="none" />
//           </div>
//           <div className="w-8 h-8 rounded-full bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//             <ChevronRight className="w-4 h-4 text-gray-400" />
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

// const InfoItem = ({ label, value, icon: Icon, color, subValue }) => {
//   return (
//     <motion.div 
//       className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
//       whileHover={{ x: 5 }}
//     >
//       <div className="flex items-center gap-3">
//         <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}10` }}>
//           <Icon className="w-4 h-4" style={{ color }} strokeWidth={1.5} />
//         </div>
//         <div>
//           <span className="text-sm text-gray-600">{label}</span>
//           {subValue && <p className="text-xs text-gray-400 mt-0.5">{subValue}</p>}
//         </div>
//       </div>
//       <span className="text-sm font-semibold" style={{ color }}>{value}</span>
//     </motion.div>
//   );
// };

// const TopRegionsChart = ({ regions, loading }) => {
//   if (loading) {
//     return (
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h3 className="text-lg font-semibold text-gray-800">Top 5 Régions par Budget</h3>
//             <p className="text-sm text-gray-500 mt-1">Chargement...</p>
//           </div>
//           <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: COLORS.secondaryLight }}>
//             <Globe className="w-5 h-5" style={{ color: COLORS.secondary, strokeWidth: 1.5 }} />
//           </div>
//         </div>
//         <div className="h-64 flex items-center justify-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//         </div>
//       </div>
//     );
//   }

//   if (!regions || regions.length === 0) {
//     return (
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h3 className="text-lg font-semibold text-gray-800">Top 5 Régions par Budget</h3>
//             <p className="text-sm text-gray-500 mt-1">Aucune donnée disponible</p>
//           </div>
//           <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: COLORS.secondaryLight }}>
//             <Globe className="w-5 h-5" style={{ color: COLORS.secondary, strokeWidth: 1.5 }} />
//           </div>
//         </div>
//         <div className="h-64 flex items-center justify-center text-gray-400">
//           Aucune région trouvée
//         </div>
//       </div>
//     );
//   }
  
//   const maxValue = Math.max(...regions.map(r => r.budget));
  
//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h3 className="text-lg font-semibold text-gray-800">Top 5 Régions par Budget</h3>
//           <p className="text-sm text-gray-500 mt-1">Coût global initial en milliers DA</p>
//         </div>
//         <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: COLORS.secondaryLight }}>
//           <Globe className="w-5 h-5" style={{ color: COLORS.secondary, strokeWidth: 1.5 }} />
//         </div>
//       </div>
      
//       <div className="space-y-4">
//         {regions.map((region, index) => (
//           <motion.div
//             key={region.name}
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: index * 0.1 }}
//             className="group cursor-pointer"
//           >
//             <div className="flex items-center justify-between mb-1">
//               <div className="flex items-center gap-3">
//                 <span className={`text-sm font-bold w-6 ${
//                   index === 0 ? 'text-yellow-500' : 
//                   index === 1 ? 'text-gray-400' : 
//                   index === 2 ? 'text-amber-600' : 'text-gray-400'
//                 }`}>
//                   #{index + 1}
//                 </span>
//                 <span className="text-sm font-medium text-gray-700">{region.name}</span>
//               </div>
//               <span className="text-sm font-semibold text-gray-800">
//                 {region.budget.toLocaleString('fr-DZ')} kDA
//               </span>
//             </div>
//             <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
//               <motion.div
//                 initial={{ width: 0 }}
//                 animate={{ width: `${(region.budget / maxValue) * 100}%` }}
//                 transition={{ duration: 0.8, delay: index * 0.1 }}
//                 className="absolute inset-y-0 left-0 rounded-full"
//                 style={{ background: `linear-gradient(90deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)` }}
//               />
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const ProjectsByYearChart = ({ data, loading, pmtYear }) => {
//   if (loading) {
//     return (
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h3 className="text-lg font-semibold text-gray-800">Projets pour PMT</h3>
//             <p className="text-sm text-gray-500 mt-1">Chargement...</p>
//           </div>
//           <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: COLORS.primaryLight }}>
//             <Calendar className="w-5 h-5" style={{ color: COLORS.primary, strokeWidth: 1.5 }} />
//           </div>
//         </div>
//         <div className="h-64 flex items-center justify-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//         </div>
//       </div>
//     );
//   }
  
//   if (!data || data.length === 0) {
//     return (
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h3 className="text-lg font-semibold text-gray-800">Projets pour PMT</h3>
//             <p className="text-sm text-gray-500 mt-1">Aucune donnée disponible</p>
//           </div>
//           <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: COLORS.primaryLight }}>
//             <Calendar className="w-5 h-5" style={{ color: COLORS.primary, strokeWidth: 1.5 }} />
//           </div>
//         </div>
//         <div className="h-64 flex items-center justify-center text-gray-400">
//           Aucun projet trouvé
//         </div>
//       </div>
//     );
//   }
  
//   const maxCount = Math.max(...data.map(d => d.count), 1);
//   const debutPMT = pmtYear;
//   const finPMT = debutPMT ? debutPMT + 4 : null;
  
//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h3 className="text-lg font-semibold text-gray-800">
//             Projets pour PMT {debutPMT && finPMT && `(${debutPMT} → ${finPMT})`}
//           </h3>
//           <p className="text-sm text-gray-500 mt-1">
//             Nombre de projets pour la période PMT {debutPMT && finPMT && `[${debutPMT} - ${finPMT}]`}
//           </p>
//         </div>
//         <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: COLORS.primaryLight }}>
//           <Calendar className="w-5 h-5" style={{ color: COLORS.primary, strokeWidth: 1.5 }} />
//         </div>
//       </div>
      
//       <div className="flex items-end justify-between gap-4 h-64">
//         {data.map((item, index) => (
//           <motion.div
//             key={item.year}
//             className="flex-1 flex flex-col items-center gap-2"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//           >
//             <motion.div
//               initial={{ height: 0 }}
//               animate={{ height: `${(item.count / maxCount) * 200}px` }}
//               transition={{ duration: 0.6, delay: index * 0.1 }}
//               className="w-full rounded-t-lg cursor-pointer hover:opacity-80 transition-opacity group relative"
//               style={{ 
//                 background: `linear-gradient(180deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`,
//                 height: `${(item.count / maxCount) * 200}px`
//               }}
//             >
//               <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
//                 {item.count} projet{item.count > 1 ? 's' : ''}
//               </div>
//             </motion.div>
//             <span className="text-xs text-gray-500 font-medium">{item.year}</span>
//             <span className="text-sm font-bold text-gray-700">{item.count}</span>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const Dashboard = () => {
//   const {
//     counters,
//     projetsByYear,
//     loadingProjetsByYear,
//     topRegions,
//     loadingTopRegions,
//     dashboardStats,
//     loading,
//     error,
//     lastUpdate,
//     refreshData,
//     totalFamilles,
//     totalUsers,
//   } = useDashboardStats();

//   // Extraction des données du dashboardStats
//   const totalProjets = dashboardStats?.projets_total || 0;
//   const valides = dashboardStats?.projets_valides || 0;
//   const soumisStructure = dashboardStats?.soumis?.structure || 0;
//   const soumisDepartement = dashboardStats?.soumis?.departement || 0;
//   const totalSoumis = dashboardStats?.soumis?.total || 0;
//   const rejetesRegion = dashboardStats?.rejetes?.directeur_region || 0;
//   const rejetesDirection = dashboardStats?.rejetes?.directeur_direction || 0;
//   const rejetesDivisionnaire = dashboardStats?.rejetes?.divisionnaire || 0;
//   const totalRejetes = dashboardStats?.rejetes?.total || 0;
//   const enCours = dashboardStats?.en_cours || 0;
//   const budgetTotal = dashboardStats?.budget_total || 0;
//   const pmtYear = dashboardStats?.pmt_year || new Date().getFullYear() + 1;
  
//   const tauxValidation = totalProjets > 0 ? Math.round((valides / totalProjets) * 100) : 0;
//   const budgetValides = (valides / totalProjets) * budgetTotal || 0;
//   const tauxBudgetUtilise = budgetTotal > 0 ? Math.round((budgetValides / budgetTotal) * 100) : 0;

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4" style={{ borderColor: `${COLORS.secondary} transparent transparent transparent` }} />
//           <p className="text-gray-500">Chargement du dashboard...</p>
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
//           <button onClick={refreshData} className="mt-4 px-4 py-2 rounded-xl text-white" style={{ backgroundColor: COLORS.secondary }}>
//             Réessayer
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-white border-b sticky top-0 z-10 backdrop-blur-sm bg-white/95"
//         style={{ borderBottomColor: `${COLORS.primary}20` }}
//       >
//         <div className="px-8 py-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-2xl font-bold" style={{ color: COLORS.primary }}>Dashboard</h1>
//               <p className="text-gray-500 mt-1">Vue d'ensemble des projets et indicateurs clés - PMT {pmtYear}</p>
//             </div>
//             <div className="flex items-center gap-4">
//               {lastUpdate && (
//                 <div className="text-sm text-gray-400 flex items-center gap-2">
//                   <Clock className="w-4 h-4" />
//                   Dernière mise à jour: {lastUpdate.toLocaleTimeString('fr-FR')}
//                 </div>
//               )}
//               <button onClick={refreshData} className="px-4 py-2 rounded-xl text-gray-600 transition-colors flex items-center gap-2" style={{ backgroundColor: `${COLORS.primary}10` }}>
//                 <RefreshCw className="w-4 h-4" />
//                 Rafraîchir
//               </button>
//               <button className="px-4 py-2 rounded-xl text-white transition-colors flex items-center gap-2" style={{ backgroundColor: COLORS.secondary }}>
//                 <Download className="w-4 h-4" />
//                 Exporter
//               </button>
//             </div>
//           </div>
//         </div>
//       </motion.div>
      
//       <div className="p-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <KPICard title="Utilisateurs" value={totalUsers} icon={Users} colorType="primary" />
//           <KPICard title="Régions" value={counters.regions} icon={MapPin} colorType="secondary" />
//           <KPICard title="Directions" value={counters.directions} icon={Building2} colorType="primary" />
//           <KPICard title="Familles" value={totalFamilles} icon={FolderTree} colorType="secondary" />
//         </div>
        
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
//           <StatCard title="Périmètres" value={counters.perimetres} icon={Layers} colorType="primary" />
//           <StatCard title="Départements" value={counters.departements} icon={GitBranch} colorType="secondary" />
//           <StatCard title="Projets Totaux" value={totalProjets} icon={Package} colorType="primary" />
//           <StatCard title="Coût Total" value={budgetTotal} icon={BadgeDollarSign} colorType="secondary" suffix="kDA" />
//         </div>
        
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
//           <TopRegionsChart regions={topRegions} loading={loadingTopRegions} />
//           <ProjectsByYearChart data={projetsByYear} loading={loadingProjetsByYear} pmtYear={pmtYear} />

//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">Statut des Projets</h3>
//                 <p className="text-sm text-gray-500 mt-1">Répartition par statut</p>
//               </div>
//               <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: COLORS.primaryLight }}>
//                 <Target className="w-5 h-5" style={{ color: COLORS.primary, strokeWidth: 1.5 }} />
//               </div>
//             </div>
            
//             <div className="flex flex-col items-center">
//               <CircularProgress value={tauxValidation} size={140} strokeWidth={10} color={COLORS.primary} />
//               <div className="mt-2 text-center">
//                 <p className="text-xs text-gray-400">{valides} / {totalProjets} projets validés</p>
//               </div>
              
//               <div className="mt-6 w-full">
//                 <InfoItem 
//                   label="Projets Soumis" 
//                   value={totalSoumis} 
//                   icon={Send} 
//                   color={COLORS.secondary}
//                   subValue={`🏢 Structure: ${soumisStructure} | 🏛️ Département: ${soumisDepartement}`}
//                 />
                
//                 <InfoItem 
//                   label="Projets Validés" 
//                   value={valides} 
//                   icon={CheckCircle} 
//                   color={COLORS.primary}
//                   subValue="Validés par divisionnaire"
//                 />
                
//                 <InfoItem 
//                   label="Projets Rejetés" 
//                   value={totalRejetes} 
//                   icon={XCircle} 
//                   color="#EF4444"
//                   subValue={`👤 Dir.Région: ${rejetesRegion} | 🏢 Dir.Direction: ${rejetesDirection} | 📋 Divisionnaire: ${rejetesDivisionnaire}`}
//                 />
                
//                 <InfoItem 
//                   label="Projets en cours" 
//                   value={enCours} 
//                   icon={Activity} 
//                   color="#6B7280"
//                   subValue="En attente de validation"
//                 />
                
//                 <div className="mt-4 pt-2">
//                   <div className="flex justify-between text-xs text-gray-500 mb-1">
//                     <span>Budget utilisé</span>
//                     <span>{tauxBudgetUtilise}%</span>
//                   </div>
//                   <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
//                     <motion.div
//                       initial={{ width: 0 }}
//                       animate={{ width: `${tauxBudgetUtilise}%` }}
//                       transition={{ duration: 0.8 }}
//                       className="h-full rounded-full"
//                       style={{ background: `linear-gradient(90deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)` }}
//                     />
//                   </div>
//                   <div className="flex justify-between mt-2 text-xs">
//                     <span className="text-green-600">Utilisé: {Math.round(budgetValides)} kDA</span>
//                     <span className="text-orange-500">Restant: {Math.round(budgetTotal - budgetValides)} kDA</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="rounded-2xl p-6 text-white cursor-pointer hover:shadow-xl transition-all hover:scale-[1.02]"
//             style={{ background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primary}CC 100%)` }}
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
//                 <CheckCircle className="w-6 h-6" strokeWidth={1.5} />
//               </div>
//               <span className="text-3xl font-bold">{valides}</span>
//             </div>
//             <h4 className="text-lg font-semibold mb-1">Projets Validés</h4>
//             <p className="text-blue-100 text-sm">Approuvés par le divisionnaire</p>
//             <div className="mt-4 flex items-center gap-1 text-blue-100 text-sm">
//               <span>Voir détails</span>
//               <ChevronRight className="w-4 h-4" />
//             </div>
//           </motion.div>
          
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className="rounded-2xl p-6 text-white cursor-pointer hover:shadow-xl transition-all hover:scale-[1.02]"
//             style={{ background: `linear-gradient(135deg, ${COLORS.secondary} 0%, ${COLORS.secondary}CC 100%)` }}
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
//                 <Send className="w-6 h-6" strokeWidth={1.5} />
//               </div>
//               <span className="text-3xl font-bold">{totalSoumis}</span>
//             </div>
//             <h4 className="text-lg font-semibold mb-1">Projets Soumis</h4>
//             <p className="text-orange-100 text-sm">En attente de validation</p>
//             <div className="mt-4 flex items-center gap-1 text-orange-100 text-sm">
//               <span>Voir détails</span>
//               <ChevronRight className="w-4 h-4" />
//             </div>
//           </motion.div>
          
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4 }}
//             className="bg-white rounded-2xl p-6 border cursor-pointer hover:shadow-xl transition-all hover:scale-[1.02] group"
//             style={{ borderColor: `${COLORS.primary}20` }}
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors" style={{ backgroundColor: `${COLORS.primary}10` }}>
//                 <Landmark className="w-6 h-6" style={{ color: COLORS.primary, strokeWidth: 1.5 }} />
//               </div>
//               <span className="text-3xl font-bold text-gray-800">{Math.round(budgetTotal / 1000)}M</span>
//             </div>
//             <h4 className="text-lg font-semibold text-gray-800 mb-1">Budget Total</h4>
//             <p className="text-gray-500 text-sm">Millions DA</p>
//             <div className="mt-4">
//               <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
//                 <div className="h-full rounded-full" style={{ width: `${tauxValidation}%`, background: `linear-gradient(90deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)` }} />
//               </div>
//               <p className="text-xs text-gray-400 mt-2">{tauxValidation}% des projets validés</p>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;







import React from "react";
import { motion } from 'framer-motion';
import { 
  Users, 
  MapPin, 
  Building2, 
  Layers, 
  GitBranch, 
  Calendar,
  ChevronRight,
  Download,
  RefreshCw,
  Clock,
  CheckCircle,
  AlertCircle,
  Globe,
  FolderTree,
  Landmark,
  Package,
  BadgeDollarSign,
  Target,
  Send,
  XCircle
} from "lucide-react";
import useDashboardStats from "../../../hooks/useDashboardStats";

// Couleurs principales
const COLORS = {
  primary: '#0E47C8',
  secondary: '#FF8500',
  danger: '#EF4444',
  primaryLight: '#0E47C820',
  secondaryLight: '#FF850020',
};

// ⭐ COMPOSANT DONUT CHART AVEC SEGMENTS COLORÉS (style email performance)
const CircularProgressWithStats = ({ 
  value, 
  total, 
  valides, 
  totalSoumis, 
  soumisStructure, 
  soumisDepartement,
  totalRejetes,
  rejetesRegion,
  rejetesDirection,
  rejetesDivisionnaire,
  size = 260,
}) => {
  const strokeWidth = 38;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const cx = size / 2;
  const cy = size / 2;

  // Calcul des pourcentages
  const pValides  = total > 0 ? valides / total : 0;
  const pSoumis   = total > 0 ? totalSoumis / total : 0;
  const pRejetes  = total > 0 ? totalRejetes / total : 0;
  const pRestant  = Math.max(0, 1 - pValides - pSoumis - pRejetes);

  const dashValides  = pValides  * circumference;
  const dashSoumis   = pSoumis   * circumference;
  const dashRejetes  = pRejetes  * circumference;
  const dashRestant  = pRestant  * circumference;

  // Offsets cumulatifs (dans le sens -90° = départ haut)
  const offValides = 0;
  const offSoumis  = -(dashValides);
  const offRejetes = -(dashValides + dashSoumis);
  const offRestant = -(dashValides + dashSoumis + dashRejetes);

  const legendItems = [
    { color: COLORS.primary,    label: 'Validés',   count: valides,      pct: Math.round(pValides * 100) },
    { color: COLORS.secondary,  label: 'Soumis',    count: totalSoumis,  pct: Math.round(pSoumis  * 100) },
    { color: COLORS.danger,     label: 'Rejetés',   count: totalRejetes, pct: Math.round(pRejetes * 100) },
  ];

  return (
    <div className="flex flex-col items-center w-full">
      {/* Donut SVG */}
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Fond gris neutre */}
          <circle
            cx={cx} cy={cy} r={radius}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth={strokeWidth}
          />

          {/* Segment restant (non soumis) - gris clair */}
          {pRestant > 0.005 && (
            <motion.circle
              cx={cx} cy={cy} r={radius}
              fill="none"
              stroke="#D1D5DB"
              strokeWidth={strokeWidth}
              strokeLinecap="butt"
              style={{ strokeDasharray: `${dashRestant} ${circumference}`, strokeDashoffset: offRestant }}
              transform={`rotate(-90 ${cx} ${cy})`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          )}

          {/* Segment : Rejetés (rouge) */}
          {pRejetes > 0.005 && (
            <motion.circle
              cx={cx} cy={cy} r={radius}
              fill="none"
              stroke={COLORS.danger}
              strokeWidth={strokeWidth}
              strokeLinecap="butt"
              style={{ strokeDashoffset: offRejetes }}
              transform={`rotate(-90 ${cx} ${cy})`}
              initial={{ strokeDasharray: `0 ${circumference}` }}
              animate={{ strokeDasharray: `${dashRejetes} ${circumference}` }}
              transition={{ duration: 1.0, ease: "easeOut", delay: 0.4 }}
            />
          )}

          {/* Segment : Soumis (orange) */}
          {pSoumis > 0.005 && (
            <motion.circle
              cx={cx} cy={cy} r={radius}
              fill="none"
              stroke={COLORS.secondary}
              strokeWidth={strokeWidth}
              strokeLinecap="butt"
              style={{ strokeDashoffset: offSoumis }}
              transform={`rotate(-90 ${cx} ${cy})`}
              initial={{ strokeDasharray: `0 ${circumference}` }}
              animate={{ strokeDasharray: `${dashSoumis} ${circumference}` }}
              transition={{ duration: 1.0, ease: "easeOut", delay: 0.2 }}
            />
          )}

          {/* Segment : Validés (bleu) */}
          {pValides > 0.005 && (
            <motion.circle
              cx={cx} cy={cy} r={radius}
              fill="none"
              stroke={COLORS.primary}
              strokeWidth={strokeWidth}
              strokeLinecap="butt"
              style={{ strokeDashoffset: offValides }}
              transform={`rotate(-90 ${cx} ${cy})`}
              initial={{ strokeDasharray: `0 ${circumference}` }}
              animate={{ strokeDasharray: `${dashValides} ${circumference}` }}
              transition={{ duration: 1.0, ease: "easeOut", delay: 0.0 }}
            />
          )}
        </svg>

        {/* Texte central superposé */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-center"
          >
            <span className="text-4xl font-bold" style={{ color: COLORS.primary }}>
              {value}%
            </span>
            <p className="text-xs text-gray-500 mt-1 leading-tight">
              {valides} / {total}
              <br />projets validés
            </p>
          </motion.div>
        </div>
      </div>

      {/* Légende colorée */}
      <div className="flex flex-col gap-2 mt-4 w-full px-2">
        {legendItems.map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-sm flex-shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-gray-600">{item.label}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-800">{item.count}</span>
              <span
                className="text-xs px-1.5 py-0.5 rounded-full font-medium"
                style={{ backgroundColor: item.color + '20', color: item.color }}
              >
                {item.pct}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Détails soumis / rejetés */}
      <div className="mt-3 w-full border-t border-gray-100 pt-3 px-2 space-y-1">
        <p className="text-xs text-gray-400">🏢 Soumis structure: <span className="font-medium text-gray-600">{soumisStructure}</span></p>
        <p className="text-xs text-gray-400">🏛️ Soumis département: <span className="font-medium text-gray-600">{soumisDepartement}</span></p>
        <p className="text-xs text-gray-400">👤 Rejetés Dir.Région: <span className="font-medium text-red-400">{rejetesRegion}</span></p>
        <p className="text-xs text-gray-400">🏢 Rejetés Dir.Direction: <span className="font-medium text-red-400">{rejetesDirection}</span></p>
        <p className="text-xs text-gray-400">📋 Rejetés Divisionnaire: <span className="font-medium text-red-400">{rejetesDivisionnaire}</span></p>
      </div>
    </div>
  );
};

// Composant KPI Card
const KPICard = ({ title, value, icon: Icon, colorType, onClick }) => {
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
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(135deg, ${bgLight} 0%, transparent 100%)` }}
      />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: bgLight }}>
            <Icon className="w-6 h-6" style={{ color: mainColor, strokeWidth: 1.5 }} stroke="currentColor" fill="none" />
          </div>
        </div>
        <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-gray-800">{value?.toLocaleString() || 0}</span>
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
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(135deg, ${bgLight} 0%, transparent 100%)` }}
      />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: bgLight }}>
            <Icon className="w-5 h-5" style={{ color: mainColor, strokeWidth: 1.5 }} stroke="currentColor" fill="none" />
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <ChevronRight className="w-4 h-4 text-gray-400" />
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

// Composant Top 5 Regions
const TopRegionsChart = ({ regions, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Top 5 Régions par Budget</h3>
            <p className="text-sm text-gray-500 mt-1">Chargement...</p>
          </div>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: COLORS.secondaryLight }}>
            <Globe className="w-5 h-5" style={{ color: COLORS.secondary, strokeWidth: 1.5 }} />
          </div>
        </div>
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: COLORS.secondary }}></div>
        </div>
      </div>
    );
  }

  if (!regions || regions.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Top 5 Régions par Budget</h3>
            <p className="text-sm text-gray-500 mt-1">Aucune donnée disponible</p>
          </div>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: COLORS.secondaryLight }}>
            <Globe className="w-5 h-5" style={{ color: COLORS.secondary, strokeWidth: 1.5 }} />
          </div>
        </div>
        <div className="h-64 flex items-center justify-center text-gray-400">
          Aucune région trouvée
        </div>
      </div>
    );
  }
  
  const maxValue = Math.max(...regions.map(r => r.budget));
  
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Top 5 Régions par Budget</h3>
          <p className="text-sm text-gray-500 mt-1">Coût global initial en milliers DA</p>
        </div>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: COLORS.secondaryLight }}>
          <Globe className="w-5 h-5" style={{ color: COLORS.secondary, strokeWidth: 1.5 }} />
        </div>
      </div>
      
      <div className="space-y-4">
        {regions.map((region, index) => (
          <motion.div
            key={region.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-3">
                <span className={`text-sm font-bold w-6 ${
                  index === 0 ? 'text-yellow-500' : 
                  index === 1 ? 'text-gray-400' : 
                  index === 2 ? 'text-amber-600' : 'text-gray-400'
                }`}>
                  #{index + 1}
                </span>
                <span className="text-sm font-medium text-gray-700">{region.name}</span>
              </div>
              <span className="text-sm font-semibold text-gray-800">
                {region.budget.toLocaleString('fr-DZ')} kDA
              </span>
            </div>
            <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(region.budget / maxValue) * 100}%` }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ background: `linear-gradient(90deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)` }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Composant Projets par Année
const ProjectsByYearChart = ({ data, loading, pmtYear }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Projets pour PMT</h3>
            <p className="text-sm text-gray-500 mt-1">Chargement...</p>
          </div>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: COLORS.primaryLight }}>
            <Calendar className="w-5 h-5" style={{ color: COLORS.primary, strokeWidth: 1.5 }} />
          </div>
        </div>
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: COLORS.primary }}></div>
        </div>
      </div>
    );
  }
  
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Projets pour PMT</h3>
            <p className="text-sm text-gray-500 mt-1">Aucune donnée disponible</p>
          </div>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: COLORS.primaryLight }}>
            <Calendar className="w-5 h-5" style={{ color: COLORS.primary, strokeWidth: 1.5 }} />
          </div>
        </div>
        <div className="h-64 flex items-center justify-center text-gray-400">
          Aucun projet trouvé
        </div>
      </div>
    );
  }
  
  const maxCount = Math.max(...data.map(d => d.count), 1);
  const debutPMT = pmtYear;
  const finPMT = debutPMT ? debutPMT + 4 : null;
  
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Projets pour PMT {debutPMT && finPMT && `(${debutPMT} → ${finPMT})`}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Nombre de projets par année
          </p>
        </div>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: COLORS.primaryLight }}>
          <Calendar className="w-5 h-5" style={{ color: COLORS.primary, strokeWidth: 1.5 }} />
        </div>
      </div>
      
      <div className="flex items-end justify-between gap-4 h-64">
        {data.map((item, index) => (
          <motion.div
            key={item.year}
            className="flex-1 flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(item.count / maxCount) * 200}px` }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="w-full rounded-t-lg cursor-pointer hover:opacity-80 transition-opacity group relative"
              style={{ 
                background: `linear-gradient(180deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`,
                height: `${(item.count / maxCount) * 200}px`
              }}
            >
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {item.count} projet{item.count > 1 ? 's' : ''}
              </div>
            </motion.div>
            <span className="text-xs text-gray-500 font-medium">{item.year}</span>
            <span className="text-sm font-bold text-gray-700">{item.count}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Composant Principal Dashboard
const Dashboard = () => {
  const {
    counters,
    projetsByYear,
    loadingProjetsByYear,
    topRegions,
    loadingTopRegions,
    dashboardStats,
    loading,
    error,
    lastUpdate,
    refreshData,
    totalFamilles,
    totalUsers,
  } = useDashboardStats();

  // Extraction des données du dashboardStats
  const totalProjets       = dashboardStats?.projets_total || 0;
  const valides            = dashboardStats?.projets_valides || 0;
  const soumisStructure    = dashboardStats?.soumis?.structure || 0;
  const soumisDepartement  = dashboardStats?.soumis?.departement || 0;
  const totalSoumis        = dashboardStats?.soumis?.total || 0;
  const rejetesRegion      = dashboardStats?.rejetes?.directeur_region || 0;
  const rejetesDirection   = dashboardStats?.rejetes?.directeur_direction || 0;
  const rejetesDivisionnaire = dashboardStats?.rejetes?.divisionnaire || 0;
  const totalRejetes       = dashboardStats?.rejetes?.total || 0;
  const budgetTotal        = dashboardStats?.budget_total || 0;
  const pmtYear            = dashboardStats?.pmt_year || new Date().getFullYear() + 1;
  
  const tauxValidation = totalProjets > 0 ? Math.round((valides / totalProjets) * 100) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4" style={{ borderColor: `${COLORS.secondary} transparent transparent transparent` }} />
          <p className="text-gray-500">Chargement du dashboard...</p>
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
              <h1 className="text-2xl font-bold" style={{ color: COLORS.primary }}>Dashboard</h1>
              <p className="text-gray-500 mt-1">Vue d'ensemble des projets et indicateurs clés - PMT {pmtYear}</p>
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
                className="px-4 py-2 rounded-xl text-gray-600 transition-colors flex items-center gap-2"
                style={{ backgroundColor: `${COLORS.primary}10` }}
              >
                <RefreshCw className="w-4 h-4" />
                Rafraîchir
              </button>
              <button
                className="px-4 py-2 rounded-xl text-white transition-colors flex items-center gap-2"
                style={{ backgroundColor: COLORS.secondary }}
              >
                <Download className="w-4 h-4" />
                Exporter
              </button>
            </div>
          </div>
        </div>
      </motion.div>
      
      <div className="p-8">
        {/* Grandes cartes KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard title="Utilisateurs"  value={totalUsers}        icon={Users}     colorType="primary"   />
          <KPICard title="Régions"       value={counters.regions}  icon={MapPin}    colorType="secondary" />
          <KPICard title="Directions"    value={counters.directions} icon={Building2} colorType="primary" />
          <KPICard title="Familles"      value={totalFamilles}     icon={FolderTree} colorType="secondary" />
        </div>
        
        {/* Grille des cartes stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <StatCard title="Périmètres"    value={counters.perimetres}   icon={Layers}        colorType="primary"   />
          <StatCard title="Départements"  value={counters.departements} icon={GitBranch}     colorType="secondary" />
          <StatCard title="Projets Totaux" value={totalProjets}         icon={Package}       colorType="primary"   />
          <StatCard title="Coût Total"    value={budgetTotal}           icon={BadgeDollarSign} colorType="secondary" suffix="kDA" />
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Top 5 Régions par Budget */}
          <TopRegionsChart regions={topRegions} loading={loadingTopRegions} />
          
          {/* Projets par Année */}
          <ProjectsByYearChart data={projetsByYear} loading={loadingProjetsByYear} pmtYear={pmtYear} />

          {/* ⭐ Taux d'Avancement Global - DONUT CHART AVEC SEGMENTS */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Taux d'Avancement Global</h3>
                <p className="text-sm text-gray-500 mt-1">Progression des projets</p>
              </div>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: COLORS.primaryLight }}>
                <Target className="w-5 h-5" style={{ color: COLORS.primary, strokeWidth: 1.5 }} />
              </div>
            </div>
            
            <div className="flex justify-center">
              <CircularProgressWithStats 
                value={tauxValidation}
                total={totalProjets}
                valides={valides}
                totalSoumis={totalSoumis}
                soumisStructure={soumisStructure}
                soumisDepartement={soumisDepartement}
                totalRejetes={totalRejetes}
                rejetesRegion={rejetesRegion}
                rejetesDirection={rejetesDirection}
                rejetesDivisionnaire={rejetesDivisionnaire}
                size={240}
              />
            </div>
          </div>
        </div>
        
        {/* Footer Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl p-6 text-white cursor-pointer hover:shadow-xl transition-all hover:scale-[1.02]"
            style={{ background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primary}CC 100%)` }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <CheckCircle className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <span className="text-3xl font-bold">{valides}</span>
            </div>
            <h4 className="text-lg font-semibold mb-1">Projets Validés</h4>
            <p className="text-blue-100 text-sm">Approuvés par le divisionnaire</p>
            <div className="mt-4 flex items-center gap-1 text-blue-100 text-sm">
              <span>Voir détails</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl p-6 text-white cursor-pointer hover:shadow-xl transition-all hover:scale-[1.02]"
            style={{ background: `linear-gradient(135deg, ${COLORS.secondary} 0%, ${COLORS.secondary}CC 100%)` }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Send className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <span className="text-3xl font-bold">{totalSoumis}</span>
            </div>
            <h4 className="text-lg font-semibold mb-1">Projets Soumis</h4>
            <p className="text-orange-100 text-sm">En attente de validation</p>
            <div className="mt-4 flex items-center gap-1 text-orange-100 text-sm">
              <span>Voir détails</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-6 border cursor-pointer hover:shadow-xl transition-all hover:scale-[1.02] group"
            style={{ borderColor: `${COLORS.primary}20` }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors" style={{ backgroundColor: `${COLORS.primary}10` }}>
                <Landmark className="w-6 h-6" style={{ color: COLORS.primary, strokeWidth: 1.5 }} />
              </div>
              <span className="text-3xl font-bold text-gray-800">{Math.round(budgetTotal / 1000)}M</span>
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-1">Budget Total</h4>
            <p className="text-gray-500 text-sm">Millions DA</p>
            <div className="mt-4">
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${tauxValidation}%`,
                    background: `linear-gradient(90deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`
                  }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-2">{tauxValidation}% des projets validés</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
