// AdminLayout.jsx
import React, { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
import { ReactComponent as DashboardIcon } from "../Assets/Icons/dash.svg";
import { ReactComponent as ParametersIcon } from "../Assets/Icons/param.svg";
import { ReactComponent as ThemesIcon } from "../Assets/Icons/projetctl.svg";
import { ReactComponent as GroupesIcon } from "../Assets/Icons/equipe.svg";
import { ReactComponent as ChainIcon } from "../Assets/Icons/Affectation.svg";
import { ReactComponent as ClassificationIcon } from "../Assets/Icons/classification.svg";
import { ReactComponent as RisqueIcon } from "../Assets/Icons/risk.svg";
import { ReactComponent as RapportIcon } from "../Assets/Icons/rapport.svg";
import { ReactComponent as SettingIcon } from "../Assets/Icons/setting-2.svg";
import { ReactComponent as ProfileIcon } from "../Assets/Icons/profile.svg";
import { ReactComponent as NotifIcon } from "../Assets/Icons/notif.svg";
import { ReactComponent as DeconxxionIcon } from "../Assets/Icons/logout.svg";
import { ReactComponent as AuditIcon } from "../Assets/Icons/rapport.svg";
import { ReactComponent as ArrowDownIcon } from "../Assets/Icons/Account.svg";
import TopBar from "../Components/Partials/Components/TopBar";

export const AdminLayout = () => {
  const [activeMainMenu, setActiveMainMenu] = useState("Dashboard");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [adminInfo, setAdminInfo] = useState({});
  const [openDropdown, setOpenDropdown] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const nomComplet = localStorage.getItem('nom_complet');
    setAdminInfo({ nomComplet });
    
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      navigate('/unauthorized');
    }
  }, [navigate]);

  const toggleDropdown = (menuName) => {
    setOpenDropdown(prev => ({ ...prev, [menuName]: !prev[menuName] }));
  };

  // Menu Principal Admin
  const mainMenuItems = [
    { name: "Dashboard", icon: <DashboardIcon />, path: "/admin/dashboard" },
    { name: "Utilisateurs", icon: <GroupesIcon />, path: "/admin/utilisateurs" },
    { name: "Affectations", icon: <ChainIcon />, path: "/admin/affectation" },
  ];

  // Menu Projets
  const projectMenuItems = [
    { name: "Projets", icon: <ThemesIcon />, path: "/admin/projets" },
    { name: "comparaison projet", icon: <ThemesIcon />, path: "/admin/comparison" },
    { name: "Recap", icon: <ThemesIcon />, path: "/admin/recap" },
    { name: "Classification", icon: <ClassificationIcon />, path: "/admin/classification" },
    { name: "Risque Analyse", icon: <RisqueIcon />, path: "/admin/risque" },
    { name: "Rapport", icon: <RapportIcon />, path: "/admin/rapport" },
  ];

  // Menu Paramètres avec sous-menus
  const settingsMenuItems = [
    { name: "Régionaux", icon: <ParametersIcon />, path: "/admin/parametres" },
    { name: "Centraux", icon: <SettingIcon />, path: "/admin/parametres-centraux" },
  ];

  // Autres paramètres (Profile, Notification, etc.)
  const otherSettingsItems = [
    { name: "Profile", icon: <ProfileIcon />, path: "/admin/profile" },
    { name: "Notification", icon: <NotifIcon />, path: "/admin/notification" },
    { name: "Journal d'audit", icon: <AuditIcon />, path: "/admin/audit" },
    { name: "Configuration", icon: <SettingIcon />, path: "/admin/config" },
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

  // Composant pour un item avec dropdown
  const DropdownMenuItem = ({ title, icon, items }) => {
    const isOpen = openDropdown[title];
    
    return (
      <div>
        <div
          className="flex items-center justify-between px-6 py-3 text-gray-600 hover:bg-[#FF8500] hover:text-white transition-all duration-200 cursor-pointer"
          onClick={() => toggleDropdown(title)}
        >
          <div className="flex items-center gap-3">
            <span className="w-5 h-5 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:fill-current text-gray-700">
              {icon}
            </span>
            <span className="text-sm font-medium">{title}</span>
          </div>
          <svg 
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        {isOpen && (
          <div className="ml-4">
            {items.map((item, idx) => (
              <NavLink
                key={idx}
                to={item.path}
                onClick={() => setActiveMainMenu(item.name)}
                className={({ isActive }) => 
                  `flex items-center gap-3 px-6 py-2.5 text-gray-500 hover:bg-[#FF8500] hover:text-white transition-all duration-200 ${
                    isActive || activeMainMenu === item.name ? 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-500' : ''
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className={`w-5 h-5 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:fill-current ${
                      isActive || activeMainMenu === item.name ? 'text-indigo-600' : 'text-gray-500'
                    }`}>
                      {item.icon}
                    </span>
                    <span className="text-sm">{item.name}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-[220px_1fr] min-h-screen">
      {/* Sidebar */}
      <aside className="bg-white text-gray-800 h-screen sticky top-0 flex flex-col border-r border-gray-200 shadow-sm">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-xl font-bold">
            <span className="text-indigo-600">Sonatrach</span>
            <span className="text-orange-500">Budget</span>
          </h2>
        </div>
        
        <nav className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hidden">
          
          {/* Menu Principal */}
          <div className="flex flex-col py-2">
            <div className="px-6 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Principal
            </div>
             
            
            {/* Dropdown pour Paramètres (Régionaux et Centraux) */}
          
            {mainMenuItems.map((item, idx) => renderMenuItem(item, idx))}
              <DropdownMenuItem 
              title="Paramètres" 
              icon={<ParametersIcon />}
              items={settingsMenuItems}
            />
          </div>

          {/* Section Projets */}
          <div className="flex flex-col py-2 mt-2">
            <div className="px-6 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Projets
            </div>
            {projectMenuItems.map((item, idx) => renderMenuItem(item, `project-${idx}`))}
          </div>
       
          {/* Section Paramètres avec sous-menu */}
          <div className="flex flex-col py-2 mt-2">
            <div className="px-6 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Paramètres
            </div>
            
         
            
            {/* Autres paramètres */}
            {otherSettingsItems.map((item, idx) => renderMenuItem(item, `other-${idx}`))}
          </div>

          {/* Déconnexion */}
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

      <style jsx>{`
        .scrollbar-hidden {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        
        .scrollbar-hidden::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};