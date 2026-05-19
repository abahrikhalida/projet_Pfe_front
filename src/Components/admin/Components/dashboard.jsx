
import React, { useRef, useCallback, useState } from "react";
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
  Loader2
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

// ⭐ COMPOSANT DONUT CHART AVEC SEGMENTS COLORÉS
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

  const pValides  = total > 0 ? valides / total : 0;
  const pSoumis   = total > 0 ? totalSoumis / total : 0;
  const pRejetes  = total > 0 ? totalRejetes / total : 0;
  const pRestant  = Math.max(0, 1 - pValides - pSoumis - pRejetes);

  const dashValides = pValides  * circumference;
  const dashSoumis  = pSoumis   * circumference;
  const dashRejetes = pRejetes  * circumference;
  const dashRestant = pRestant  * circumference;

  const offValides = 0;
  const offSoumis  = -(dashValides);
  const offRejetes = -(dashValides + dashSoumis);
  const offRestant = -(dashValides + dashSoumis + dashRejetes);

  const legendItems = [
    { color: COLORS.primary,   label: 'Validés',  count: valides,      pct: Math.round(pValides * 100) },
    { color: COLORS.secondary, label: 'Soumis',   count: totalSoumis,  pct: Math.round(pSoumis  * 100) },
    { color: COLORS.danger,    label: 'Rejetés',  count: totalRejetes, pct: Math.round(pRejetes * 100) },
  ];

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle cx={cx} cy={cy} r={radius} fill="none" stroke="#E5E7EB" strokeWidth={strokeWidth} />

          {pRestant > 0.005 && (
            <motion.circle
              cx={cx} cy={cy} r={radius} fill="none" stroke="#D1D5DB"
              strokeWidth={strokeWidth} strokeLinecap="butt"
              style={{ strokeDasharray: `${dashRestant} ${circumference}`, strokeDashoffset: offRestant }}
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
          {pValides > 0.005 && (
            <motion.circle
              cx={cx} cy={cy} r={radius} fill="none" stroke={COLORS.primary}
              strokeWidth={strokeWidth} strokeLinecap="butt"
              style={{ strokeDashoffset: offValides }}
              transform={`rotate(-90 ${cx} ${cy})`}
              initial={{ strokeDasharray: `0 ${circumference}` }}
              animate={{ strokeDasharray: `${dashValides} ${circumference}` }}
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
            <span className="text-4xl font-bold" style={{ color: COLORS.primary }}>{value}%</span>
            <p className="text-xs text-gray-500 mt-1 leading-tight">
              {valides} / {total}<br />projets validés
            </p>
          </motion.div>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-4 w-full px-2">
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
  const bgLight   = isPrimary ? COLORS.primaryLight : COLORS.secondaryLight;
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={onClick}
      className="relative bg-white rounded-2xl shadow-sm border border-gray-100 p-6 cursor-pointer transition-all duration-300 hover:shadow-xl overflow-hidden group"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(135deg, ${bgLight} 0%, transparent 100%)` }} />
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
  const bgLight   = isPrimary ? COLORS.primaryLight : COLORS.secondaryLight;
  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.01 }} whileTap={{ scale: 0.98 }} onClick={onClick}
      className="relative bg-white rounded-xl shadow-sm border border-gray-100 p-5 cursor-pointer transition-all duration-300 hover:shadow-md overflow-hidden group"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(135deg, ${bgLight} 0%, transparent 100%)` }} />
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
  if (loading) return (
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

  if (!regions || regions.length === 0) return (
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
      <div className="h-64 flex items-center justify-center text-gray-400">Aucune région trouvée</div>
    </div>
  );

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
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }} className="group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-3">
                <span className={`text-sm font-bold w-6 ${index === 0 ? 'text-yellow-500' : index === 1 ? 'text-gray-400' : index === 2 ? 'text-amber-600' : 'text-gray-400'}`}>
                  #{index + 1}
                </span>
                <span className="text-sm font-medium text-gray-700">{region.name}</span>
              </div>
              <span className="text-sm font-semibold text-gray-800">{region.budget.toLocaleString('fr-DZ')} kDA</span>
            </div>
            <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }} animate={{ width: `${(region.budget / maxValue) * 100}%` }}
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
  if (loading) return (
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

  if (!data || data.length === 0) return (
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
      <div className="h-64 flex items-center justify-center text-gray-400">Aucun projet trouvé</div>
    </div>
  );

  const maxCount = Math.max(...data.map(d => d.count), 1);
  const debutPMT = pmtYear;
  const finPMT   = debutPMT ? debutPMT + 4 : null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Projets pour PMT {debutPMT && finPMT && `(${debutPMT} → ${finPMT})`}
          </h3>
          <p className="text-sm text-gray-500 mt-1">Nombre de projets par année</p>
        </div>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: COLORS.primaryLight }}>
          <Calendar className="w-5 h-5" style={{ color: COLORS.primary, strokeWidth: 1.5 }} />
        </div>
      </div>
      <div className="flex items-end justify-between gap-4 h-64">
        {data.map((item, index) => (
          <motion.div
            key={item.year} className="flex-1 flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(item.count / maxCount) * 200}px` }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="w-full rounded-t-lg cursor-pointer hover:opacity-80 transition-opacity group relative"
              style={{ background: `linear-gradient(180deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`, height: `${(item.count / maxCount) * 200}px` }}
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

// ============================================================
// COMPOSANT PRINCIPAL DASHBOARD
// ============================================================
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

  // ✅ Toutes les variables dérivées AVANT les hooks (useRef / useCallback)
  const totalProjets         = dashboardStats?.projets_total || 0;
  const valides              = dashboardStats?.projets_valides || 0;
  const soumisStructure      = dashboardStats?.soumis?.structure || 0;
  const soumisDepartement    = dashboardStats?.soumis?.departement || 0;
  const totalSoumis          = dashboardStats?.soumis?.total || 0;
  const rejetesRegion        = dashboardStats?.rejetes?.directeur_region || 0;
  const rejetesDirection     = dashboardStats?.rejetes?.directeur_direction || 0;
  const rejetesDivisionnaire = dashboardStats?.rejetes?.divisionnaire || 0;
  const totalRejetes         = dashboardStats?.rejetes?.total || 0;
  const budgetTotal          = dashboardStats?.budget_total || 0;
  const pmtYear              = dashboardStats?.pmt_year || new Date().getFullYear() + 1;
  const tauxValidation       = totalProjets > 0 ? Math.round((valides / totalProjets) * 100) : 0;

  // Ref pour le contenu du dashboard
  const dashboardRef = useRef(null);
  const [exporting, setExporting] = useState(false);

  // ✅ EXPORT PDF CORRIGÉ - Garde les bonnes proportions
  const handleExport = useCallback(async () => {
    const element = dashboardRef.current;
    if (!element) return;

    setExporting(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).default;

      // Attendre que les animations soient terminées
      await new Promise(resolve => setTimeout(resolve, 200));

      // Capturer l'élément avec une haute résolution
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
        logging: false,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
      });

      const imgData = canvas.toDataURL('image/png');
      
      // Calculer les dimensions pour garder les proportions
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      // Dimensions A4 en mm
      const pdfWidth = 210;
      const pdfHeight = (imgHeight * pdfWidth) / imgWidth;
      
      const pdf = new jsPDF({
        orientation: pdfHeight > 297 ? 'portrait' : 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      // Ajouter l'image en pleine largeur A4
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
      
      // Gérer le dépassement de page
      let heightLeft = pdfHeight;
      let pageNum = 1;
      
      while (heightLeft > 297) {
        heightLeft -= 297;
        pageNum++;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, -(pageNum - 1) * 297, pdfWidth, pdfHeight);
      }
      
      const dateStr = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      pdf.save(`Dashboard_PMT_${pmtYear}_${dateStr}.pdf`);
      
    } catch (err) {
      console.error('Erreur export PDF:', err);
      alert("Une erreur est survenue lors de l'export du PDF. Veuillez réessayer.");
    } finally {
      setExporting(false);
    }
  }, [pmtYear]);

  // --- États de chargement / erreur ---
  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"
          style={{ borderColor: `${COLORS.secondary} transparent transparent transparent` }} />
        <p className="text-gray-500">Chargement du dashboard...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-800 mb-2">Erreur de chargement</h2>
        <p className="text-gray-500">{error}</p>
        <button onClick={refreshData} className="mt-4 px-4 py-2 rounded-xl text-white" style={{ backgroundColor: COLORS.secondary }}>
          Réessayer
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">

      {/* ── HEADER sticky (exclu de la capture PDF) ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b sticky top-0 z-10 backdrop-blur-sm bg-white/95"
        style={{ borderBottomColor: `${COLORS.primary}20` }}
      >
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold" style={{ color: COLORS.primary }}>Dashboard</h1>
              <p className="text-gray-500 mt-1">
                Vue d'ensemble des projets et indicateurs clés - PMT  [{pmtYear}-{pmtYear + 4}]
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
                className="px-3 py-1.5 rounded-lg text-white transition-all flex items-center gap-1.5 disabled:opacity-70 disabled:cursor-not-allowed text-sm"
                style={{ backgroundColor: COLORS.secondary }}
              >
                {exporting
                  ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Génération...</>
                  : <><Download className="w-3.5 h-3.5" /> PDF</>
                }
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ✅ Conteneur capturé par html2canvas */}
      <div ref={dashboardRef} className="p-8 bg-gradient-to-br from-gray-50 to-gray-100" style={{ width: '100%', overflowX: 'visible' }}>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard title="Utilisateurs" value={totalUsers}          icon={Users}      colorType="primary"   />
          <KPICard title="Régions"      value={counters.regions}    icon={MapPin}     colorType="secondary" />
          <KPICard title="Directions"   value={counters.directions} icon={Building2}  colorType="primary"   />
          <KPICard title="Familles"     value={totalFamilles}       icon={FolderTree} colorType="secondary" />
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <StatCard title="Périmètres"     value={counters.perimetres}   icon={Layers}          colorType="primary"   />
          <StatCard title="Départements"   value={counters.departements} icon={GitBranch}       colorType="secondary" />
          <StatCard title="Projets Totaux" value={totalProjets}          icon={Package}         colorType="primary"   />
          <StatCard title="Coût Total"     value={budgetTotal}           icon={BadgeDollarSign} colorType="secondary" suffix="kDA" />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <TopRegionsChart    regions={topRegions}   loading={loadingTopRegions}    />
          <ProjectsByYearChart data={projetsByYear}  loading={loadingProjetsByYear} pmtYear={pmtYear} />

          {/* Donut Chart */}
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
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
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
              <span>Voir détails</span><ChevronRight className="w-4 h-4" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
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
              <span>Voir détails</span><ChevronRight className="w-4 h-4" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
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
                <div className="h-full rounded-full"
                  style={{ width: `${tauxValidation}%`, background: `linear-gradient(90deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)` }} />
              </div>
              <p className="text-xs text-gray-400 mt-2">{tauxValidation}% des projets validés</p>
            </div>
          </motion.div>
        </div>

        {/* Pied de page pour le PDF
        <div className="text-center text-xs text-gray-400 pt-6 mt-4 border-t border-gray-100">
          Document généré le {new Date().toLocaleDateString('fr-FR')} à {new Date().toLocaleTimeString('fr-FR')}
        </div> */}

      </div>{/* fin dashboardRef */}
    </div>
  );
};

export default Dashboard;