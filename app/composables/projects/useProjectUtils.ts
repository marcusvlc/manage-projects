export const useProjectUtils = () => {
  const buildEmptyProject = () => ({
    name: "",
    customer: "",
    initDate: null,
    endDate: null,
    coverImage: "",
  });

  return {
    buildEmptyProject,
  };
};
