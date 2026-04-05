
import React, { useState } from "react";
import RegionRecap from "./RegionRecap";
import FamilleRecap from "./FamilleRecap";
import ActiviteRecap from "./ActiviteRecap";
import useRegionRecap from "../../../../hooks/useRegionRecap";
import useFamilleRecap from "../../../../hooks/useFamilleRecap";
import useActiviteRecap from "../../../../hooks/useActiviteRecap";
                              

const fmt = (val) =>
  val != null ? Number(val).toLocaleString("fr-DZ") : "—";

// Mini badge Total Division réutilisable
const TotalBadge = ({ loading, value }) => (
  <div className="text-right">
    <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wide mb-0.5">
      Total Division
    </p>
    {loading ? (
      <div className="w-20 h-5 bg-gray-100 rounded animate-pulse" />
    ) : (
      <p className="text-sm font-bold text-[#FF8500] leading-tight">
        {fmt(value)}
      </p>
    )}
  </div>
);

const RecapDashboard = () => {
  const [activeSection, setActiveSection] = useState("region");

  const { totalDivision: regionTotal, loading: regionLoading }   = useRegionRecap();
  const { totalDivision: familleTotal, loading: familleLoading } = useFamilleRecap();
  const { totalDivision: activiteTotal, loading: activiteLoading } = useActiviteRecap();

  const cardClass = (key) =>
    `bg-white rounded-[20px] shadow-sm border-2 p-6 cursor-pointer transition-all hover:shadow-md ${
      activeSection === key
        ? "border-[#FF8500]"
        : "border-gray-100 hover:border-[#FF8500]/30"
    }`;

  return (
    <div className="h-[calc(100vh-65px)] overflow-y-auto scrollbar-none p-6">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard Recap</h1>
        <p className="text-gray-500 mt-1">Analyse des coûts et réalisations</p>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-3 gap-6 mb-8">

        {/* REGION */}
        <div onClick={() => setActiveSection("region")} className={cardClass("region")}>
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-[#FF8500]/10 rounded-full flex items-center justify-center text-xl">
              📍
            </div>
            <TotalBadge
              loading={regionLoading}
              value={regionTotal?.cout_initial_total}
            />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Régions</h3>
          <p className="text-sm text-gray-500 mt-1">Analyse par région</p>
        </div>

        {/* FAMILLE */}
        <div onClick={() => setActiveSection("famille")} className={cardClass("famille")}>
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-[#FF8500]/10 rounded-full flex items-center justify-center text-xl">
              📦
            </div>
            <TotalBadge
              loading={familleLoading}
              value={familleTotal?.cout_initial_total}
            />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Familles</h3>
          <p className="text-sm text-gray-500 mt-1">Analyse par famille</p>
        </div>

        {/* ACTIVITE */}
        <div onClick={() => setActiveSection("activite")} className={cardClass("activite")}>
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-[#FF8500]/10 rounded-full flex items-center justify-center text-xl">
              ⚡
            </div>
            <TotalBadge
              loading={activiteLoading}
              value={activiteTotal?.cout_initial_total}
            />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Activités</h3>
          <p className="text-sm text-gray-500 mt-1">Analyse par activité</p>
        </div>

      </div>

      {/* CONTENT */}
      {activeSection === "region"   && <RegionRecap />}
      {activeSection === "famille"  && <FamilleRecap />}
      {activeSection === "activite" && <ActiviteRecap />}

    </div>
  );
};

export default RecapDashboard;