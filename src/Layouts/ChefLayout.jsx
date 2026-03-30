import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import axiosInstance from "../axios"; // IMPORTANT: importer axiosInstance
import { ReactComponent as DashboardIcon } from "../Assets/Icons/dash.svg";
import { ReactComponent as ParametersIcon } from "../Assets/Icons/param.svg";
import { ReactComponent as ThemesIcon } from "../Assets/Icons/projetctl.svg";
import { ReactComponent as GroupesIcon } from "../Assets/Icons/equipe.svg";
import { ReactComponent as ClassificationIcon } from "../Assets/Icons/classification.svg";
import { ReactComponent as RisqueIcon  } from "../Assets/Icons/risk.svg";
import { ReactComponent as RapportIcon  } from "../Assets/Icons/rapport.svg";
import { ReactComponent as SettingIcon } from "../Assets/Icons/setting-2.svg";
import { ReactComponent as ProfileIcon } from "../Assets/Icons/profile.svg";
import { ReactComponent as NotifIcon} from "../Assets/Icons/notif.svg";
import { ReactComponent as DeconxxionIcon } from "../Assets/Icons/logout.svg";
import TopBar from "../Components/Partials/Components/TopBar";

export const ChefLayout = () => {
  const [activeMainMenu, setActiveMainMenu] = useState("Dashboard");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const mainMenuItems = [
    { name: "Dashboard", icon: <DashboardIcon />, path: "/chef/dashboard" },
    { name: "Paramètres", icon: <ParametersIcon />, path: "/chef/parametres" },
    { name: "Equipe", icon: <GroupesIcon />, path: "/chef/equipe" },
  ];

  const projectMenuItems = [
    { name: "Projets", icon: <ThemesIcon />, path: "/chef/projets" },
    { name: "Classification", icon: <ClassificationIcon />, path: "/chef/classification" },
    { name: "Risque Analyse", icon: <RisqueIcon />, path: "/chef/risque" },
    { name: "Rapport", icon: <RapportIcon />, path: "/chef/rapport" },
  ];

  const settingsMenuItems = [
    { name: "Setting", icon: <SettingIcon />, path: "/chef/setting" },
    { name: "Profile", icon: <ProfileIcon />, path: "/chef/profile" },
    { name: "Notification", icon: <NotifIcon />, path: "/chef/notification" },
  ];

  // Fonction de déconnexion avec appel API
  const handleLogout = async () => {
    if (isLoggingOut) return; // Empêcher les clics multiples
    
    // Demander confirmation
    if (!window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
      return;
    }
    
    setIsLoggingOut(true);
    
    try {
      // Récupérer le refresh token du localStorage
      const refreshToken = localStorage.getItem('refresh_token');
      
      if (refreshToken) {
        // Appel à l'API de déconnexion pour blacklister le token
        await axiosInstance.post('/api/logout/', { refresh: refreshToken });
        console.log("Déconnexion API réussie");
      }
      
    } catch (error) {
      console.error("Erreur lors de la déconnexion API:", error);
      // On continue malgré l'erreur pour déconnecter l'utilisateur côté frontend
    } finally {
      // Nettoyer TOUTES les données du localStorage
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('role');
      localStorage.removeItem('nom_complet');
      localStorage.removeItem('photo_profil');
      
      // Supprimer le header Authorization pour les futures requêtes
      delete axiosInstance.defaults.headers['Authorization'];
      
      // Rediriger vers la page de connexion
      navigate('/login');
      
      setIsLoggingOut(false);
    }
  };

  const renderMenuItem = (item, index) => (
    <NavLink
      key={index}
      to={item.path}
      onClick={() => setActiveMainMenu(item.name)}
      className={({ isActive }) => 
        `flex items-center gap-3 px-6 py-3 text-gray-600 hover:bg-[#FF8500] hover:text-white transition-all duration-200 ${
          isActive || activeMainMenu === item.name ? 'bg-blue-200 text-black border-l-4 border-blue-500' : ''
        }`
      }
      end
    >
      {({ isActive }) => (
        <>
          <span className={`w-5 h-5 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:fill-current ${
            isActive || activeMainMenu === item.name ? 'text-blue-600' : 'text-gray-700'
          }`}>
            {item.icon}
          </span>
          <span className="text-sm font-medium">{item.name}</span>
        </>
      )}
    </NavLink>
  );

  return (
    <div className="grid grid-cols-[220px_1fr] min-h-screen">
      {/* Sidebar Blanche */}
      <aside className="bg-white text-gray-800 h-screen sticky top-0 flex flex-col border-r border-gray-200 shadow-sm">
        <h2 className="text-xl font-bold px-6 py-5">
          <span className="text-blue-600">Dev</span>
          <span className="text-orange-500">Stack</span>
        </h2>
        
        <nav className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300">
          {/* Main Menu */}
          <div className="flex flex-col py-2">
            {mainMenuItems.map((item, idx) => renderMenuItem(item, idx))}
          </div>

          {/* Projects Section */}
          <div className="flex flex-col py-2 mt-auto border-t border-gray-200 pt-4">
            {projectMenuItems.map((item, idx) => renderMenuItem(item, `project-${idx}`))}
          </div>
       
          {/* Settings Section */}
          <div className="flex flex-col py-2 mt-auto border-t border-gray-200 pt-4">
            {settingsMenuItems.map((item, idx) => renderMenuItem(item, `settings-${idx}`))}
          </div>

          {/* Déconnexion Section - Bouton avec état de chargement */}
          <div className="flex flex-col py-2 mt-auto border-t border-gray-200 pt-4">
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={`flex items-center gap-3 px-6 py-3 w-full text-left text-gray-600 hover:bg-[#FF8500] hover:text-white transition-all duration-200 ${
                isLoggingOut ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <span className="w-5 h-5 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:fill-current text-gray-700">
                <DeconxxionIcon />
              </span>
              <span className="text-sm font-medium">
                {isLoggingOut ? 'Déconnexion...' : 'Déconnexion'}
              </span>
              {isLoggingOut && (
                <svg className="animate-spin h-4 w-4 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
            </button>
          </div>
        </nav>
      </aside>

      {/* Content */}
      <div className="bg-gray-50 flex flex-col">
        <header className="bg-white sticky top-0 z-50">
          <TopBar />
        </header>
        <main className="p-8 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};