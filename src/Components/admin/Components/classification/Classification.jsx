import React, { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import RegionFamille from "./RegionFamille";
import DirectionFamille from "./DirectionFamille";

const ORANGE_COLOR = '#FF8500';
const ORANGE_GRADIENT = 'from-orange-500 to-amber-500';

const Classification = () => {
  const [activeSection, setActiveSection] = useState("region");
  const [hoveredCard, setHoveredCard] = useState(null);

  const cards = [
    {
      id: 'region',
      title: 'Régions',
      description: 'Analyse par Région par Famille',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      component: <RegionFamille />
    },
    {
      id: 'direction',
      title: 'Directions',
      description: 'Analyse  Direction par Famille',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      component: <DirectionFamille />
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
              <h1 className="text-2xl font-bold text-gray-800">Classification</h1>
              <p className="text-gray-500 mt-1">
                Analyse par Famille
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="p-8">
        {/* Cards */}
        <motion.div 
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10"
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

        {/* Content */}
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

export default Classification;