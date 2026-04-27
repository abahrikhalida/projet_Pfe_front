import React, { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
import { ReactComponent as DashboardIcon } from "../Assets/Icons/dash.svg";
import { ReactComponent as ParametersIcon } from "../Assets/Icons/param.svg";
import { ReactComponent as ThemesIcon } from "../Assets/Icons/projetctl.svg";
import { ReactComponent as GroupesIcon } from "../Assets/Icons/equipe.svg";
import { ReactComponent as ClassificationIcon } from "../Assets/Icons/classification.svg";
import { ReactComponent as RisqueIcon } from "../Assets/Icons/risk.svg";
import { ReactComponent as RapportIcon } from "../Assets/Icons/rapport.svg";
import { ReactComponent as SettingIcon } from "../Assets/Icons/setting-2.svg";
import { ReactComponent as ProfileIcon } from "../Assets/Icons/profile.svg";
import { ReactComponent as NotifIcon } from "../Assets/Icons/notif.svg";
import { ReactComponent as DeconxxionIcon } from "../Assets/Icons/logout.svg";
import TopBar from "../Components/Partials/Components/TopBar";

export const DirecteurLayout = () => {
  const [activeMainMenu, setActiveMainMenu] = useState("Dashboard");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [directeurInfo, setDirecteurInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const nomComplet = localStorage.getItem('nom_complet');
    setDirecteurInfo({ nomComplet });
  }, []);

  const mainMenuItems = [
    { name: "Dashboard", icon: <DashboardIcon />, path: "/directeur/dashboard" },
    { name: "Régions", icon: <GroupesIcon />, path: "/directeur/regions" },
    { name: "Directeurs Région", icon: <GroupesIcon />, path: "/directeur/directeurs-region" },
    { name: "Paramètres", icon: <ParametersIcon />, path: "/directeur/parametres" },
  ];

  const projectMenuItems = [
    { name: "Projets", icon: <ThemesIcon />, path: "/directeur/projets" },
    { name: "Recap", icon: <ThemesIcon />, path: "/directeur/recap" },
    { name: "Classification", icon: <ClassificationIcon />, path: "/directeur/classification" },
    { name: "Risque Analyse", icon: <RisqueIcon />, path: "/directeur/risque" },
    { name: "Rapport", icon: <RapportIcon />, path: "/directeur/rapport" },
  ];

  const settingsMenuItems = [
    { name: "Profile", icon: <ProfileIcon />, path: "/directeur/profile" },
    { name: "Notification", icon: <NotifIcon />, path: "/directeur/notification" },
  ];

  const handleLogout = async () => {
    if (isLoggingOut) return;
    
    if (!window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
      return;
    }
    
    setIsLoggingOut(true);
    
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        await axiosInstance.post('/api/logout/', { refresh: refreshToken });
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    } finally {
      localStorage.clear();
      delete axiosInstance.defaults.headers['Authorization'];
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
          isActive || activeMainMenu === item.name ? 'bg-indigo-100 text-indigo-700 border-l-4 border-indigo-500' : ''
        }`
      }
      end
    >
      {({ isActive }) => (
        <>
          <span className={`w-5 h-5 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:fill-current ${
            isActive || activeMainMenu === item.name ? 'text-indigo-600' : 'text-gray-700'
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
      <aside className="bg-white text-gray-800 h-screen sticky top-0 flex flex-col border-r border-gray-200 shadow-sm">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-xl font-bold">
            <span className="text-indigo-600">Sonatrach</span>
            <span className="text-orange-500">Budget</span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Espace Directeur
          </p>
        </div>
        
        <nav className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300">
          <div className="flex flex-col py-2">
            {mainMenuItems.map((item, idx) => renderMenuItem(item, idx))}
          </div>

          <div className="flex flex-col py-2 mt-auto border-t border-gray-200 pt-4">
            {projectMenuItems.map((item, idx) => renderMenuItem(item, `project-${idx}`))}
          </div>
       
          <div className="flex flex-col py-2 mt-auto border-t border-gray-200 pt-4">
            {settingsMenuItems.map((item, idx) => renderMenuItem(item, `settings-${idx}`))}
          </div>

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