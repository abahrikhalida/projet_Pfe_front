// // src/recapApi.js
// import apiInstance from "./axios";

// const getUploadId = () => localStorage.getItem("upload_id");

// export const fetchRecapRegion = () =>
//   apiInstance.get("/api/recap/region/", {
//     params: { upload_id: getUploadId() },
//   });
// src/recapApi.js
import { axiosInstance } from "./axios";

export const fetchRecapRegion = (uploadId = 1) =>
  axiosInstance.get("/recap/region/", {
    params: { upload_id: uploadId },
  });