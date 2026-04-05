
import { useState } from "react";
import useRegionRecap from "../../../../hooks/useRegionRecap";

const currentYear = new Date().getFullYear();

const fmt = (val) =>
  val != null ? Number(val).toLocaleString("fr-DZ") : "—";

// Toutes les colonnes du modal (sans _dont_dex)
const modalSections = [
  {
    title: "Coûts & Réalisations",
    columns: [
      { label: "Coût Global Initial", sub: `${currentYear + 1}/${currentYear + 5}`, key: "cout_initial_total" },
      { label: "Réalisation Cumulée", sub: `${currentYear - 1}`, key: "realisation_cumul_n_mins1_total" },
      { label: "Réalisation S1", sub: `${currentYear}`, key: "real_s1_n_total" },
      { label: "Prévision S2", sub: `${currentYear}`, key: "prev_s2_n_total" },
      { label: "Prévision Clôture", sub: `${currentYear}`, key: "prev_cloture_n_total" },
      { label: "Reste à Réaliser", sub: "", key: "reste_a_realiser_total" },
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

// Colonnes du tableau principal
const baseColumns = [
  { label: "Coût Global Initial", sub: `${currentYear + 1}/${currentYear + 5}`, key: "cout_initial_total" },
  { label: "Réalisation Cumulée", sub: `${currentYear - 1}`, key: "realisation_cumul_n_mins1_total" },
  { label: "Réalisation S1", sub: `${currentYear}`, key: "real_s1_n_total" },
  { label: "Prévision S2", sub: `${currentYear}`, key: "prev_s2_n_total" },
  { label: "Prévision Clôture", sub: `${currentYear}`, key: "prev_cloture_n_total" },
];

// Modal Component
const RegionModal = ({ region, onClose }) => {
  if (!region) return null;
  const regionName = region.region_nom || region.region;

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
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-2xl flex justify-between items-center z-10">
          <div>
            <h3 className="text-lg font-bold text-gray-800">Détails — Région</h3>
            <p className="text-[#FF8500] font-semibold text-base">{regionName}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-6 py-5 space-y-6">
          {modalSections.map((section) => (
            <div key={section.title}>
              {/* Section Title */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-5 bg-[#FF8500] rounded-full" />
                <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  {section.title}
                </h4>
              </div>

              {/* Cards grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {section.columns.map((col) => (
                  <div
                    key={col.key}
                    className="bg-[#FAFAFA] border border-gray-100 rounded-xl px-4 py-3 hover:border-[#FF8500]/30 hover:bg-[#FFF9F0] transition-colors"
                  >
                    <p className="text-xs text-gray-400 mb-1">
                      {col.label}
                      {col.sub ? ` (${col.sub})` : ""}
                    </p>
                    <p className="text-sm font-semibold text-gray-800">
                      {fmt(region[col.key])}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="border-t border-gray-100 px-6 py-4 flex justify-end rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#FF8500] text-white text-sm font-medium hover:bg-[#e07600] transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Component
const RegionRecap = () => {
  const { regions, totalDivision, loading, error } = useRegionRecap();
  const [selectedRegion, setSelectedRegion] = useState(null);

  if (loading)
    return (
      <div className="flex justify-center py-8">
        <div className="w-8 h-8 border-4 border-[#FF8500] border-t-transparent rounded-full animate-spin"></div>
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
      <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 p-6 font-kumbh">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Détail par Région</h2>
          <span className="text-sm text-gray-500">{regions.length} régions</span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-100">
          <table className="w-full table-fixed">
            <thead>
              <tr className="bg-gradient-to-r from-[#F9F9F9] to-[#F0F0F0] border-b border-[#E4E4E4]">
                <th className="w-[16%] py-2 px-4 text-left text-sm font-semibold text-[#4A4A4A] rounded-tl-lg">
                  Région
                </th>
                {baseColumns.map((col) => (
                  <th key={col.key} className="w-[15%] py-2 px-4 text-center text-sm font-semibold text-[#4A4A4A]">
                    {col.label}
                    {col.sub && (
                      <>
                        <br />
                        <span className="text-xs font-normal text-gray-400">{col.sub}</span>
                      </>
                    )}
                  </th>
                ))}
                {/* Colonne action */}
                <th className="w-[5%] py-2 px-2 rounded-tr-lg" />
              </tr>
            </thead>

            <tbody>
              {regions.map((r, i) => (
                <tr
                  key={i}
                  className={`border-b border-gray-100 hover:bg-[#FFF9F0] transition-colors duration-150 ${
                    i % 2 === 0 ? "bg-white" : "bg-[#FCFCFC]"
                  }`}
                >
                  <td className="py-1.5 px-4 align-middle">
                    <div className="flex items-center min-h-[32px]">
                      <span className="text-[#FF8500] text-sm font-medium text-left break-words whitespace-normal">
                        {r.region_nom || r.region}
                      </span>
                    </div>
                  </td>

                  {baseColumns.map((col) => (
                    <td key={col.key} className="py-1.5 px-4 align-middle">
                      <div className="flex items-center justify-center min-h-[32px] text-sm text-gray-800">
                        {fmt(r[col.key])}
                      </div>
                    </td>
                  ))}

                  {/* Bouton flèche */}
                  <td className="py-1.5 px-2 align-middle text-center">
                    <button
                      onClick={() => setSelectedRegion(r)}
                      className="inline-flex items-center justify-center w-7 h-7 text-[#FF8500] hover:bg-[#FFF4E8] rounded-full transition-colors duration-150"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

            {/* Total */}
            <tfoot>
              <tr className="border-t-2 border-[#FF8500]/30 bg-[#FFF9F0]">
                <td className="py-1.5 px-4 align-middle">
                  <div className="flex items-center min-h-[32px]">
                    <span className="text-[#FF8500] text-sm font-semibold">Total Division</span>
                  </div>
                </td>
                {baseColumns.map((col) => (
                  <td key={col.key} className="py-1.5 px-4 align-middle">
                    <div className="flex items-center justify-end min-h-[32px] text-sm font-semibold text-[#FF8500]">
                      {fmt(totalDivision[col.key])}
                    </div>
                  </td>
                ))}
                <td />
              </tr>
            </tfoot>
          </table>

          {/* Empty state */}
          {regions.length === 0 && (
            <div className="text-center py-12 px-4">
              <svg className="w-16 h-16 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                  d="M9 20l-5.447-2.724A2 2 0 013 15.382V6.618a2 2 0 011.553-1.894l6-2a2 2 0 011.894 0l6 2A2 2 0 0119 6.618v8.764a2 2 0 01-1.447 1.894L15 18.5" />
              </svg>
              <p className="text-gray-500 text-lg">Aucune région trouvée</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedRegion && (
        <RegionModal
          region={selectedRegion}
          onClose={() => setSelectedRegion(null)}
        />
      )}
    </>
  );
};

export default RegionRecap;