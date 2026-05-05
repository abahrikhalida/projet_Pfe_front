import { createBrowserRouter, RouterProvider,Navigate } from 'react-router-dom';
import { ChefLayout } from './Layouts/ChefLayout';
import { DirecteurRegionLayout } from './Layouts/DirecteurRegionLayout';
import { DirecteurDirectionLayout } from './Layouts/DirecteurDirectionLayout';
import { ResponsableDepartementLayout } from './Layouts/Responsabledepartement';
import { ResponsableStructureLayout } from './Layouts/ResponsableStructureLayout';
import { AgentLayout } from './Layouts/AgentLayout';
import { DirecteurLayout } from './Layouts/DirecteurLayout';
import { DivisionnaireLayout } from './Layouts/DivisionnaireLayout';
import AffectationResponsable from './Components/directeur_region/AffectationResponsable';
import ProjetsListe from './Components/admin/Components/Projets/ProjetsListe';
import Parametres from './Components/admin/Components/parametres/Parametres';
import ParametresCentral from './Components/admin/Components/parametres/ParametresCentral';
import Login from './Components/Login/Login';
import { AdminLayout } from './Layouts/AdminLayout';
import UsersListe from "./Components/admin/Components/utilisateurs/UsersListe";
import UsersAjout from "./Components/admin/Components/utilisateurs/AjouterUtilisateurModal";
import Affectation from "./Components/admin/Components/Affectations";
import ProjetsDirecteurRegion from "./Components/admin/Components/Projets/ProjetsDirecteurRegion";
import ProjetsAgent from "./Components/admin/Components/Projets/ProjetsAgent";
import ProjetsChef from "./Components/admin/Components/Projets/ProjetsChef";
import RecapDashboard from "./Components/admin/Components/Recap/RecapDashboard";
import ProjetsDirecteur from "./Components/admin/Components/Projets/ProjetsDirecteur";
import ProjetsDivisionnaire from "./Components/admin/Components/Projets/ProjetsDivisionnaire";






import Classification from "./Components/admin/Components/classification/Classification";


import ProjetsAdmin from './Components/admin/Components/Projets/Projetsadmin';
import ProjetsResponsable from './Components/admin/Components/Projets/ProjetsResponsable';
import AffectationResponsableDepartement from './Components/admin/Components/DirecteurdeDirection/AffectationResponsableDepartemen';
import ProjetsResponsableDepartement from './Components/admin/Components/projet-direction/ProjetsResponsableDepartement';
import ProjetsDirecteurDirection from './Components/admin/Components/projet-direction/ProjetsDirecteurDirection';
import ProjetChampsModifiables from './Components/admin/Components/Comparaison/ProjetChampsModifiables';
// import ProjetVersionComparison from './Components/admin/Components/Comparaison/ComparisonProjet';

// 🔥 Import des composants de notification
import NotificationsPage from './Components/Notification/NotificationsPage';

const router = createBrowserRouter([
   {
    path: '/',
    element: <Navigate to="/login" replace />  // 🔥 Redirection vers login
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <div>Dashboard admin</div> },
      { path: "dashboard", element: <div>Dashboard admin</div> },
      // { path: "dashboard", element: <RecapDashboardversion/>},
      { path: "recap", element: <RecapDashboard /> },
      { path: "utilisateurs", element: <UsersListe /> },
      { path: "affectation", element: <Affectation /> },
      { path: "parametres", element: <Parametres /> },
      { path: "parametres-centraux", element: <ParametresCentral /> },
      { path: 'projets', element: <ProjetsAdmin /> },
      { path: "profile", element: <div>Profile</div> },
      // 🔥 Route notifications pour admin
      { path: "notification", element: <NotificationsPage /> },
      { path: "classification", element: <Classification/> },
       {path: 'comparison', element: <ProjetChampsModifiables/>},
    ]
  },
//     {
//   path: "/admin",
//   element: <AdminLayout />,
//   children: [
//     { index: true, element: <div>Dashboard admin</div> },
//     { path: "dashboard",element:<div>Dashboard admin</div> },
//     { path: "recap", element: <RecapDashboard/> },
//     { path: "classification", element: <Classification/> },


//     // { path: "dashboard", element: <UsersAjout/> },
//     { path: "utilisateurs", element:<UsersListe/> },
//     { path: "affectation", element: <Affectation/> },
//     // { path: "structures", element: <div>Dashboard Chef</div> },
 
//         { path: "parametres", element: <Parametres /> },
//     { path: "parametres-centraux", element: <ParametresCentral /> },
//         {path: 'projets', element: <ProjetsAdmin />},
//         // {path: 'comparison', element: <ProjetVersionComparison />},
//         {path: 'comparison', element: <ProjetChampsModifiables/>},


//     { path: "profile", element:<div>Dashboard Chef</div> },
//     { path: "notifications", element:<div>Dashboard Chef</div> },
//   ]
// },
  {
    path: '/chef',
    element: <ChefLayout />,
    children: [
      { index: true, element: <div>Dashboard Chef</div> },
      { path: 'dashboard', element: <div>Dashboard Chef</div> },
      { path: 'projets', element: <ProjetsChef /> },
      { path: 'parametres', element: <Parametres /> },
      { path: 'equipe', element: <RecapDashboard /> },
      // 🔥 Route notifications pour chef
      { path: 'notifications', element: <NotificationsPage /> },
    ]
  },
  {
    path: '/directeur',
    element: <DirecteurLayout />,
    children: [
      { index: true, element: <div>Dashboard Directeur</div> },
      { path: 'dashboard', element: <div>Dashboard Directeur</div> },
      { path: 'regions', element: <div>Gestion Régions</div> },
      { path: 'directeurs-region', element: <div>Gestion Directeurs Région</div> },
      { path: 'projets', element: <ProjetsDirecteur /> },
      // 🔥 Route notifications pour directeur
      { path: 'notifications', element: <NotificationsPage /> },
    ]
  },
  {
    path: '/directeur-region',
    element: <DirecteurRegionLayout />,
    children: [
      { index: true, element: <div>Dashboard Directeur Région</div> },
      { path: 'dashboard', element: <div>Dashboard Directeur Région</div> },
      { path: 'structures', element: <div>Structures</div> },
      { path: 'responsables', element: <div>Responsables</div> },
      { path: 'projets', element: <ProjetsDirecteurRegion /> },
      { path: 'affectation', element: <AffectationResponsable /> },
      // 🔥 Route notifications pour directeur région
      { path: 'notifications', element: <NotificationsPage /> },
    ]
  },
  {
    path: '/responsable-structure',
    element: <ResponsableStructureLayout />,
    children: [
      { index: true, element: <div>Dashboard Responsable structure</div> },
      { path: 'dashboard', element: <ProjetsListe /> },
      { path: 'projets', element: <ProjetsResponsable /> },
      { path: 'equipe', element: <div>Mon Equipe</div> },
      { path: 'activites', element: <div>Activités</div> },
      // 🔥 Route notifications pour responsable structure
      { path: 'notifications', element: <NotificationsPage /> },
    ]
  },
  {
    path: '/divisionnaire',
    element: <DivisionnaireLayout />,
    children: [
      { index: true, element: <div>Dashboard Divisionnaire</div> },
      { path: 'dashboard', element: <div>Dashboard Divisionnaire</div> },
      { path: 'rapports', element: <div>Rapports</div> },
      { path: 'statistiques', element: <div>Statistiques</div> },
      { path: 'projets', element: <ProjetsDivisionnaire /> },
      // 🔥 Route notifications pour divisionnaire
      { path: 'notifications', element: <NotificationsPage /> },
    ]
  },
  {
    path: '/responsable-departement',
    element: <ResponsableDepartementLayout />,
    children: [
      { index: true, element: <div>responsable_departement</div> },
      { path: 'dashboard', element: <div>Dashboard Divisionnaire</div> },
      { path: 'rapports', element: <div>Rapports</div> },
      { path: 'statistiques', element: <div>Statistiques</div> },
      { path: 'projets', element: <ProjetsResponsableDepartement /> },
      // 🔥 Route notifications pour responsable département
      { path: 'notifications', element: <NotificationsPage /> },
    ]
  },
  {
    path: '/directeur-direction',
    element: <DirecteurDirectionLayout />,
    children: [
      { index: true, element: <div>directeur_direction</div> },
      { path: 'dashboard', element: <div>Dashboard Directeur Direction</div> },
      { path: 'affectation', element: <AffectationResponsableDepartement /> },
      { path: 'projets', element: <ProjetsDirecteurDirection /> },
      // 🔥 Route notifications pour directeur direction
      { path: 'notifications', element: <NotificationsPage /> },
    ]
  },
  {
    path: '/agent',
    element: <AgentLayout />,
    children: [
      { index: true, element: <div>Dashboard Agent</div> },
      { path: 'dashboard', element: <div>Dashboard Agent</div> },
      { path: 'projets', element: <ProjetsAgent /> },
      { path: 'taches', element: <div>Mes Tâches</div> },
      { path: 'profile', element: <div>Mon Profil</div> },
      // 🔥 Route notifications pour agent
      { path: 'notifications', element: <NotificationsPage /> },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;