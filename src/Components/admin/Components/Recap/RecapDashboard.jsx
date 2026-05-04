
import React, { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import RegionRecap from "./RegionRecap";
import FamilleRecap from "./FamilleRecap";
import ActiviteRecap from "./ActiviteRecap";
import DirectionRecap from "./DirectionRecap";
import useRegionRecap from "../../../../hooks/useRegionRecap";
import useFamilleRecap from "../../../../hooks/useFamilleRecap";
import useActiviteRecap from "../../../../hooks/useActiviteRecap";
import useDirectionRecap from "../../../../hooks/useDirectionRecap";

const fmt = (val) =>
  val != null ? Number(val).toLocaleString("fr-DZ") : "—";

const ORANGE_COLOR = '#FF8500';
const ORANGE_GRADIENT = 'from-orange-500 to-amber-500';

// Mini badge Total Division réutilisable
const TotalBadge = ({ loading, value }) => (
  <div className="text-right">
    <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wide mb-0.5">
      Total
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

// Icônes SVG
const Icons = {
  direction: ({ isActive }) => (
    <svg className={`w-6 h-6 transition-colors duration-200 ${isActive ? "text-[#FF8500]" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  region: ({ isActive }) => (
    <svg className={`w-6 h-6 transition-colors duration-200 ${isActive ? "text-[#FF8500]" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  famille: ({ isActive }) => (
    <svg className={`w-6 h-6 transition-colors duration-200 ${isActive ? "text-[#FF8500]" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v3m0 0v3m0-3h3m-3 0H9" />
    </svg>
  ),
  activite: ({ isActive }) => (
    <svg className={`w-6 h-6 transition-colors duration-200 ${isActive ? "text-[#FF8500]" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
};

const RecapDashboard = () => {
  const [activeSection, setActiveSection] = useState("direction");
  const [hoveredCard, setHoveredCard] = useState(null);

  const { totalDivision: regionTotal, loading: regionLoading } = useRegionRecap();
  const { totalDivision: familleTotal, loading: familleLoading } = useFamilleRecap();
  const { totalDivision: activiteTotal, loading: activiteLoading } = useActiviteRecap();
  const { totalDivision: directionTotal, loading: directionLoading } = useDirectionRecap();

  // Cartes pour les onglets
  const cards = [
    {
      id: 'direction',
      title: 'Directions',
      description: 'Analyse par direction',
      count: null,
      total: directionTotal?.cout_initial_total,
      loading: directionLoading,
      icon: <Icons.direction isActive={activeSection === 'direction'} />,
      component: <DirectionRecap />
    },
    {
      id: 'region',
      title: 'Régions',
      description: 'Analyse par région',
      count: null,
      total: regionTotal?.cout_initial_total,
      loading: regionLoading,
      icon: <Icons.region isActive={activeSection === 'region'} />,
      component: <RegionRecap />
    },
    {
      id: 'famille',
      title: 'Familles',
      description: 'Analyse par famille',
      count: null,
      total: familleTotal?.cout_initial_total,
      loading: familleLoading,
      icon: <Icons.famille isActive={activeSection === 'famille'} />,
      component: <FamilleRecap />
    },
    {
      id: 'activite',
      title: 'Activités',
      description: 'Analyse par activité',
      count: null,
      total: activiteTotal?.cout_initial_total,
      loading: activiteLoading,
      icon: <Icons.activite isActive={activeSection === 'activite'} />,
      component: <ActiviteRecap />
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }),
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15
      }
    },
    tap: {
      scale: 0.98,
      transition: {
        type: "spring",
        stiffness: 600,
        damping: 20
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -30, scale: 0.98 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: {
      opacity: 0,
      x: 30,
      scale: 0.98,
      transition: { duration: 0.3 }
    }
  };

  const currentCard = cards.find(c => c.id === activeSection);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white border-b border-gray-200 sticky top-0 z-10 backdrop-blur-sm bg-white/95"
      >
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Dashboard Recap</h1>
              <p className="text-gray-500 mt-1">
                Analyse des coûts et réalisations
              </p>
            </div>
            
            {(regionLoading || familleLoading || activiteLoading || directionLoading) && (
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2"
              >
                <div className="w-2 h-2 bg-[#FF8500] rounded-full animate-pulse" />
                <span className="text-sm text-gray-500">Chargement...</span>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      <div className="p-8">
        {/* Cartes des sections */}
        <motion.div 
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
        >
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              onHoverStart={() => setHoveredCard(card.id)}
              onHoverEnd={() => setHoveredCard(null)}
              onClick={() => setActiveSection(card.id)}
              className={`
                relative bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer
                transition-shadow duration-300
                ${activeSection === card.id ? 'shadow-2xl ring-2 ring-[#FF8500]' : 'hover:shadow-xl'}
              `}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                  x: hoveredCard === card.id ? '100%' : '-100%'
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
              
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-br ${ORANGE_GRADIENT} opacity-0`}
                animate={{
                  opacity: hoveredCard === card.id ? 0.05 : 0
                }}
                transition={{ duration: 0.3 }}
              />
              
              <div className="relative p-6">
                <div className="flex items-start justify-between mb-4">
                  <motion.div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{
                      background: activeSection === card.id ? `${ORANGE_COLOR}20` : `${ORANGE_COLOR}10`,
                      color: ORANGE_COLOR
                    }}
                    animate={{
                      scale: hoveredCard === card.id ? 1.1 : 1,
                      rotate: hoveredCard === card.id ? [0, -5, 5, 0] : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {card.icon}
                  </motion.div>
                  
                  <TotalBadge
                    loading={card.loading}
                    value={card.total}
                  />
                </div>

                <div>
                  <h3 className={`text-lg font-bold mb-2 text-left transition-colors duration-200 ${
                    activeSection === card.id ? 'text-[#FF8500]' : 'text-gray-800'
                  }`}>
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-500 text-left leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contenu actif */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {currentCard?.component}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RecapDashboard;