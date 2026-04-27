// hooks/useUserContext.js
import { useOutletContext } from 'react-router-dom';

export const useUserContext = () => {
  const context = useOutletContext();
  return {
    role: localStorage.getItem('role'),
    regionId: localStorage.getItem('region_id'),
    structureId: localStorage.getItem('structure_id'),
    userId: localStorage.getItem('user_id'),
    ...context
  };
};