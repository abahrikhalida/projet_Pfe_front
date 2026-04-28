import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ChefLayout } from './Layouts/ChefLayout';
import { DirecteurRegionLayout } from './Layouts/DirecteurRegionLayout';
import { ResponsableStructureLayout } from './Layouts/ResponsableStructureLayout';
import { AgentLayout } from './Layouts/AgentLayout';
import { DirecteurLayout } from './Layouts/DirecteurLayout';
import { DivisionnaireLayout } from './Layouts/DivisionnaireLayout';
import AffectationResponsable from './Components/directeur_region/AffectationResponsable';
import ProjetsListe  from './Components/admin/Components/Projets/ProjetsListe';
import Parametres from './Components/admin/Components/parametres/Parametres'
import ParametresCentral from './Components/admin/Components/parametres/ParametresCentral'

import Login from './Components/Login/Login';
import {AdminLayout} from './Layouts/AdminLayout';
import UsersListe from "./Components/admin/Components/utilisateurs/UsersListe"
import UsersAjout from "./Components/admin/Components/utilisateurs/AjouterUtilisateurModal"
import Affectation from "./Components/admin/Components/Affectations"
import  ProjetsDirecteurRegion from "./Components/admin/Components/Projets/ProjetsDirecteurRegion"
import  ProjetsAgent from "./Components/admin/Components/Projets/ProjetsAgent"
import  ProjetsChef from "./Components/admin/Components/Projets/ProjetsChef"

import RecapDashboard from "./Components/admin/Components/Recap/RecapDashboard"
import ProjetsDirecteur from "./Components/admin/Components/Projets/ProjetsDirecteur"
import ProjetsDivisionnaire from "./Components/admin/Components/Projets/ProjetsDivisionnaire"
import ProjetsAdmin from './Components/admin/Components/Projets/Projetsadmin';
import ProjetsResponsable from './Components/admin/Components/Projets/ProjetsResponsable';





const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
    {
  path: "/admin",
  element: <AdminLayout />,
  children: [
    { index: true, element: <div>Dashboard admin</div> },
    { path: "dashboard",element:<div>Dashboard admin</div> },
    { path: "recap", element: <RecapDashboard/> },


    // { path: "dashboard", element: <UsersAjout/> },
    { path: "utilisateurs", element:<UsersListe/> },
    { path: "affectation", element: <Affectation/> },
    // { path: "structures", element: <div>Dashboard Chef</div> },
 
        { path: "parametres", element: <Parametres /> },
    { path: "parametres-centraux", element: <ParametresCentral /> },
        {path: 'projets', element: <ProjetsAdmin />},

    { path: "profile", element:<div>Dashboard Chef</div> },
    { path: "notifications", element:<div>Dashboard Chef</div> },
  ]
},
  {
    path: '/chef',
    element: <ChefLayout />,
    children: [
      { index: true, element: <div>Dashboard Chef</div> },
      { path: 'dashboard', element: <div>Dashboard Chef</div> },
      {path: 'projets', element: <ProjetsChef/>},
      { path: 'parametres', element: <Parametres/> },
      { path: 'equipe', element: <RecapDashboard/>},
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
      { path: 'projets', element: <ProjetsDirecteur/>},
     

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
      { path: 'projets',  element: <ProjetsDirecteurRegion /> },
      { path: 'affectation', element: <AffectationResponsable /> },
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
         {path: 'projets', element: <ProjetsDivisionnaire/>},

    ]
  },
  {
    path: '/agent',
    element: <AgentLayout />,
    children: [
      { index: true, element: <div>Dashboard Agent</div> },
      { path: 'dashboard', element: <div>Dashboard Agent</div> },
      {path: 'projets', element: <ProjetsAgent/>},

      { path: 'taches', element: <div>Mes Tâches</div> },
      { path: 'profile', element: <div>Mon Profil</div> },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;