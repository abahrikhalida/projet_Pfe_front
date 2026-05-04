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
// import { axiosInstance } from "./axios";

// export const fetchRecapRegion = (uploadId = 1) =>
//   axiosInstance.get("/recap/region/", {
//     params: { upload_id: uploadId },
//   });