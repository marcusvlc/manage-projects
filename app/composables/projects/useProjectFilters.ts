import type { StoredProject } from "~/types/projects/project-types";

export const useProjectFilters = (projects: Ref<StoredProject[]>) => {
  return {
    filteredProjects: projects,
  };
};
