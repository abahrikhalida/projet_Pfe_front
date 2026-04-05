import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ResetPassword from './Components/Login/ResetPassword';
import ForgotPassword from './Components/Login/ForgotPassword';
import Login from './Components/Login/Login';
import Pagedacceuille from './Components/Login/Pagedacceuille';
import { ChefLayout } from "./Layouts/ChefLayout";
import AgentListe from "./Components/admin/Components/AgentListe";
import RecapDashboard from './Components/admin/Components/Recap/RecapDashboard';
import Parametres from "./Components/admin/Components/parametres/Parametres";
import BudgetListe from "./Components/Budget/BudgetList";
import RegionFamilleRecap from "./Components/admin/Components/classification/familleRegion";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
      <Routes>
        <Route path="/mot-de-passe-oublie" element={<ForgotPassword />} />
        <Route path="/reset-confirm/:uid/:token" element={<ResetPassword />} />
        <Route index element={<Pagedacceuille />} />
        <Route path="/login" element={<Login />} />
       
        {/* <Route path="*" element={<NotFound />} /> */}

        {/* Admin routes */}
        <Route path="/chef" element={<ChefLayout />}>
        {/* <Route index element={<Dashboard />} /> */}
         <Route path="equipe" element={<AgentListe />} />
          <Route path="recap" element={<RecapDashboard />} />
          <Route path="parametres" element={<Parametres />} />
          <Route path="projets" element={<BudgetListe/>} />
          <Route path="classification" element={<RegionFamilleRecap/>} />
         
        </Route>

        {/* Directeur routes */}
      
        {/* divisionner routes */}
       

       
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
