// hooks/useDataFilter.js
export const useDataFilter = () => {
  const role = localStorage.getItem('role');
  const regionId = localStorage.getItem('region_id');
  const structureId = localStorage.getItem('structure_id');
  const userId = localStorage.getItem('user_id');

  const filterByRole = (data, filters = {}) => {
    if (!data || !Array.isArray(data)) return [];

    switch (role) {
      case 'admin':
      case 'chef':
      case 'directeur':
      case 'divisionnaire':
        // Ces rôles voient toutes les données
        return data;
      
      case 'directeur_region':
        // Directeur région voit uniquement sa région
        return data.filter(item => 
          item.region_id === regionId || 
          item.region?._id === regionId ||
          item.region?.id === regionId ||
          item.region === regionId
        );
      
      case 'responsable_structure':
        // Responsable structure voit uniquement sa structure
        return data.filter(item => 
          item.structure_id === structureId ||
          item.structure?._id === structureId ||
          item.structure?.id === structureId ||
          item.structure === structureId
        );
      
      case 'agent':
        // Agent voit uniquement ses propres données
        return data.filter(item => 
          item.user_id === userId || 
          item.agent_id === userId ||
          item.created_by === userId ||
          item.assigned_to === userId
        );
      
      default:
        return data;
    }
  };

  const getQueryParams = () => {
    const params = {};
    
    switch (role) {
      case 'directeur_region':
        if (regionId) params.region_id = regionId;
        break;
      case 'responsable_structure':
        if (structureId) params.structure_id = structureId;
        break;
      case 'agent':
        params.user_id = userId;
        break;
    }
    
    return params;
  };

  const getUserInfo = () => ({
    role,
    regionId,
    structureId,
    userId,
    // Permissions de création - seul responsable_structure peut créer
    canCreate: role === 'responsable_structure',
    // Permissions de modification - seul admin peut modifier
    canEdit: (projet) => {
      return role === 'admin';
    },
    // Permissions de consultation
    canView: ['admin', 'chef', 'directeur', 'divisionnaire', 'directeur_region', 'responsable_structure', 'agent'].includes(role),
    // Rôles qui voient tout (consultation)
    canViewAll: ['admin', 'chef', 'directeur', 'divisionnaire'].includes(role),
    // Rôles qui voient par région
    canViewRegion: ['admin', 'chef', 'directeur', 'directeur_region', 'divisionnaire'].includes(role),
    // Rôles qui voient par structure
    canViewStructure: ['admin', 'chef', 'directeur', 'directeur_region', 'responsable_structure', 'divisionnaire'].includes(role)
  });

  return { filterByRole, getQueryParams, getUserInfo };
};