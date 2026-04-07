import { useState } from "react";
import useRegionFamille from "../../../../hooks/useRegionFamille";

const currentYear = new Date().getFullYear();

const fmt = (val) =>
  val != null ? Number(val).toLocaleString("fr-DZ") : "—";

const baseColumns = [
  { label: "Coût Global Initial", sub: `${currentYear + 1}/${currentYear + 5}`, key: "cout_initial_total" },
  { label: "Réalisation Cumulée", sub: `${currentYear - 1}`,                    key: "realisation_cumul_n_mins1_total" },
  { label: "Réalisation S1",      sub: `${currentYear}`,                        key: "real_s1_n_total" },
  { label: "Prévision S2",        sub: `${currentYear}`,                        key: "prev_s2_n_total" },
  { label: "Prévision Clôture",   sub: `${currentYear}`,                        key: "prev_cloture_n_total" },
];

const modalSections = [
  {
    title: "Coûts & Réalisations",
    columns: [
      { label: "Coût Global Initial", sub: `${currentYear + 1}/${currentYear + 5}`, key: "cout_initial_total" },
      { label: "Réalisation Cumulée", sub: `${currentYear - 1}`,                    key: "realisation_cumul_n_mins1_total" },
      { label: "Réalisation S1",      sub: `${currentYear}`,                        key: "real_s1_n_total" },
      { label: "Prévision S2",        sub: `${currentYear}`,                        key: "prev_s2_n_total" },
      { label: "Prévision Clôture",   sub: `${currentYear}`,                        key: "prev_cloture_n_total" },
      { label: "Reste à Réaliser",    sub: "",                                       key: "reste_a_realiser_total" },
    ],
  },
  {
    title: "Prévisions Futures",
    columns: [
      { label: "Prévision", sub: `${currentYear + 1}`, key: "prev_n_plus1_total" },
      { label: "Prévision", sub: `${currentYear + 2}`, key: "prev_n_plus2_total" },
      { label: "Prévision", sub: `${currentYear + 3}`, key: "prev_n_plus3_total" },
      { label: "Prévision", sub: `${currentYear + 4}`, key: "prev_n_plus4_total" },
      { label: "Prévision", sub: `${currentYear + 5}`, key: "prev_n_plus5_total" },
    ],
  },
  {
    title: `Détail Mensuel ${currentYear}`,
    columns: [
      { label: "Janvier",   key: "janvier_total" },
      { label: "Février",   key: "fevrier_total" },
      { label: "Mars",      key: "mars_total" },
      { label: "Avril",     key: "avril_total" },
      { label: "Mai",       key: "mai_total" },
      { label: "Juin",      key: "juin_total" },
      { label: "Juillet",   key: "juillet_total" },
      { label: "Août",      key: "aout_total" },
      { label: "Septembre", key: "septembre_total" },
      { label: "Octobre",   key: "octobre_total" },
      { label: "Novembre",  key: "novembre_total" },
      { label: "Décembre",  key: "decembre_total" },
    ],
  },
];

// ─── Modal ─────────────────────────────────────────────────────────────────────
const FamilleModal = ({ famille, regionNom, onClose }) => {
  if (!famille) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-2xl flex justify-between items-center z-10">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">{regionNom}</p>
            <h3 className="text-lg font-bold text-gray-800">Famille</h3>
            <p className="text-[#FF8500] font-semibold">{famille.famille_nom}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:bg-gray-100 rounded-full p-2 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-5 space-y-6">
          {modalSections.map((section) => (
            <div key={section.title}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-5 bg-[#FF8500] rounded-full" />
                <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{section.title}</h4>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {section.columns.map((col) => (
                  <div key={col.key} className="bg-[#FAFAFA] border border-gray-100 rounded-xl px-4 py-3 hover:border-[#FF8500]/30 hover:bg-[#FFF9F0] transition-colors">
                    <p className="text-xs text-gray-400 mb-1">{col.label}{col.sub ? ` (${col.sub})` : ""}</p>
                    <p className="text-sm font-semibold text-gray-800">{fmt(famille[col.key])}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 px-6 py-4 flex justify-end">
          <button onClick={onClose} className="px-5 py-2 rounded-lg bg-[#FF8500] text-white text-sm font-medium hover:bg-[#e07600] transition-colors">
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Region Row (collapsible) ──────────────────────────────────────────────────
const RegionRow = ({ region, onFamilleClick }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <tr
        className="border-b border-gray-200 bg-[#FFF9F0] hover:bg-[#FFF4E0] cursor-pointer transition-colors"
        onClick={() => setExpanded((p) => !p)}
      >
        <td className="py-2 px-4 align-middle">
          <div className="flex items-center gap-2 min-h-[32px]">
            <svg
              className={`w-4 h-4 text-[#FF8500] transition-transform duration-200 ${expanded ? "rotate-90" : ""}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-sm font-semibold text-gray-800">{region.region_nom}</span>
            <span className="text-xs text-gray-400">({region.familles.length} familles)</span>
          </div>
        </td>
        {baseColumns.map((col) => (
          <td key={col.key} className="py-2 px-4 align-middle text-center">
            <span className="text-sm font-semibold text-gray-700">{fmt(region.total_region[col.key])}</span>
          </td>
        ))}
        <td />
      </tr>

      {expanded && region.familles.map((f, i) => (
        <tr key={i} className="border-b border-gray-100 bg-white hover:bg-[#FFF9F0] transition-colors">
          <td className="py-1.5 pl-12 pr-4 align-middle">
            <span className="text-[#FF8500] text-sm font-medium">{f.famille_nom}</span>
          </td>
          {baseColumns.map((col) => (
            <td key={col.key} className="py-1.5 px-4 align-middle text-center">
              <span className="text-sm text-gray-700">{fmt(f[col.key])}</span>
            </td>
          ))}
          <td className="py-1.5 px-2 align-middle text-center">
            <button
              onClick={() => onFamilleClick(f, region.region_nom)}
              className="inline-flex items-center justify-center w-7 h-7 text-[#FF8500] hover:bg-[#FFF4E8] rounded-full transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </td>
        </tr>
      ))}
    </>
  );
};

// ─── Main ──────────────────────────────────────────────────────────────────────
const RegionFamilleRecap = () => {
  const { regions, totalGlobal, loading, error } = useRegionFamille();
  const [selectedFamille, setSelectedFamille]    = useState(null);
  const [selectedRegion, setSelectedRegion]      = useState("");

  if (loading)
    return (
      <div className="flex justify-center py-16">
        <div className="w-8 h-8 border-4 border-[#FF8500] border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center p-10 text-red-400">
        Erreur : {error}
      </div>
    );

  return (
    <>
      <div className="h-[calc(100vh-65px)] overflow-y-auto scrollbar-none p-6">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">Classification</h1>
          <p className="text-gray-500 mt-1">Analyse par Région et Famille</p>
        </div>

        <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Détail par Région / Famille</h2>
            <span className="text-sm text-gray-500">{regions.length} régions</span>
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-100">
            <table className="w-full table-fixed">
              <thead>
                <tr className="bg-gradient-to-r from-[#F9F9F9] to-[#F0F0F0] border-b border-[#E4E4E4]">
                  <th className="w-[16%] py-2 px-4 text-left text-sm font-semibold text-[#4A4A4A] rounded-tl-lg">
                    Région / Famille
                  </th>
                  {baseColumns.map((col) => (
                    <th key={col.key} className="w-[15%] py-2 px-4 text-center text-sm font-semibold text-[#4A4A4A]">
                      {col.label}
                      {col.sub && <><br /><span className="text-xs font-normal text-gray-400">{col.sub}</span></>}
                    </th>
                  ))}
                  <th className="w-[5%] rounded-tr-lg" />
                </tr>
              </thead>

              <tbody>
                {regions.map((region, i) => (
                  <RegionRow
                    key={i}
                    region={region}
                    onFamilleClick={(f, nom) => { setSelectedFamille(f); setSelectedRegion(nom); }}
                  />
                ))}
              </tbody>

              <tfoot>
                <tr className="border-t-2 border-[#FF8500]/30 bg-[#FFF9F0]">
                  <td className="py-1.5 px-4 align-middle">
                    <span className="text-[#FF8500] text-sm font-semibold">Total Global</span>
                  </td>
                  {baseColumns.map((col) => (
                    <td key={col.key} className="py-1.5 px-4 align-middle text-right">
                      <span className="text-sm font-semibold text-[#FF8500]">{fmt(totalGlobal[col.key])}</span>
                    </td>
                  ))}
                  <td />
                </tr>
              </tfoot>
            </table>

            {regions.length === 0 && (
              <div className="text-center py-12 text-gray-400">Aucune donnée trouvée</div>
            )}
          </div>
        </div>
      </div>

      {selectedFamille && (
        <FamilleModal
          famille={selectedFamille}
          regionNom={selectedRegion}
          onClose={() => { setSelectedFamille(null); setSelectedRegion(""); }}
        />
      )}
    </>
  );
};

export default RegionFamilleRecap;