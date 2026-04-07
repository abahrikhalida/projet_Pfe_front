// // src/recapApi.js
import axiosInstance from "./axios";

const getUploadId = () => localStorage.getItem("current_upload_id");

export const fetchRecapRegion = () =>
 axiosInstance.get("/recap/region/", {
    params: { upload_id: getUploadId() },
  });
  export const fetchRecapFamille = () =>
 axiosInstance.get("/recap/famille/", {
    params: { upload_id: getUploadId() },
  });
  export const fetchRecapAct = () =>
 axiosInstance.get("/recap/activite/", {
    params: { upload_id: getUploadId() },
  });
   export const fetchRecaperegionfamille = () =>
 axiosInstance.get("/recap/region-famille/", {
    params: { upload_id: getUploadId() },
  });
// src/recapApi.js
// import { axiosInstance } from "./axios";

// export const fetchRecapRegion = (uploadId = 1) =>
//   axiosInstance.get("/recap/region/", {
//     params: { upload_id: uploadId },
//   });