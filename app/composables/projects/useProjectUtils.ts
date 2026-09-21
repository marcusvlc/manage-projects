import type { StoredProject } from "~/types/projects/project-types";

export const useProjectUtils = () => {
  const buildEmptyProject = () => ({
    name: "",
    customer: "",
    initDate: null,
    endDate: null,
    coverImage: "",
  });

  const getInitialProject = (project?: StoredProject) => {
    if (project) {
      return {
        name: project.name,
        customer: project.customer,
        initDate: project.initDate,
        endDate: project.endDate,
        coverImage: project.coverImage,
      };
    }

    return buildEmptyProject();
  };

  return {
    buildEmptyProject,
    getInitialProject,
  };
};
