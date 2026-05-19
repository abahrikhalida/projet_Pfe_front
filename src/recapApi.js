// // src/recapApi.js
// import axiosInstance from "./axios";

// const getUploadId = () => localStorage.getItem("current_upload_id");

// export const fetchRecapRegion = () =>
//  axiosInstance.get("/recap/region/", {
//     params: { upload_id: getUploadId() },
//   });
//   export const fetchRecapFamille = () =>
//  axiosInstance.get("/recap/famille/", {
//     params: { upload_id: getUploadId() },
//   });
//   export const fetchRecapAct = () =>
//  axiosInstance.get("/recap/activite/", {
//     params: { upload_id: getUploadId() },
//   });
//    export const fetchRecaperegionfamille = () =>
//  axiosInstance.get("/recap/region-famille/", {
//     params: { upload_id: getUploadId() },
//   });

import axiosInstance from "./axios";

export const fetchRecapRegion = () =>
  axiosInstance.get("/recap/region/");

export const fetchRecapDirection = () =>
  axiosInstance.get("/recap/direction/");


export const fetchRecapFamille = () =>
  axiosInstance.get("/recap/toutes-familles/");

export const fetchRecapAct = () =>
  axiosInstance.get("/recap/toutes-activites/");

export const fetchRecaperegionfamille = () =>
  axiosInstance.get("/recap/region-famille/");

export const fetchRecapeDirectionFamille = () =>
  axiosInstance.get("/recap/direction-famille/");
export const fetchComparaisonProjet = (codeDivision) =>
  axiosInstance.get(`recap/budget/projet/${codeDivision}/with-previous/`);
// recapApi.js
export const fetchChampsModifiables = (codeDivision) =>
  axiosInstance.get(`/recap/budget/projet/${codeDivision}/champs-modifiables/`);
export const fetchDashboardCounters = (codeDivision) =>
  axiosInstance.get(`/recap/dashboard/counters/`);
export const fetchDashboardProjetsPmt = (codeDivision) =>
  axiosInstance.get(`/recap/dashboard/projets-pmt/`);
export const fetchUsers = (codeDivision) =>
  axiosInstance.get(`/api/users/`);
export const fetchDashboardProjetsByYear = (codeDivision) =>
  axiosInstance.get(`/recap/dashboard/projects-by-pmt-year/`);
export const fetchDashboardTopRegion = (codeDivision) =>
  axiosInstance.get(`/recap/dashboard/top-5-regions/`);
export const fetchDashboardStats = () =>
  axiosInstance.get('/recap/ProjetsDashboard');

// recapApi.js - AJOUTER CES DEUX NOUVELLES FONCTIONS

// Dashboard pour Directeur Direction
export const fetchDirectionDirectorDashboard = () =>
  axiosInstance.get("recap/dashboard/direction-director/");

// Dashboard pour Directeur Région
export const fetchRegionalDirectorDashboard = () =>
  axiosInstance.get("recap/dashboard/regional-director/");
// import { axiosInstance } from "./axios";

// export const fetchRecapRegion = (uploadId = 1) =>
//   axiosInstance.get("/recap/region/", {
//     params: { upload_id: uploadId },
//   });