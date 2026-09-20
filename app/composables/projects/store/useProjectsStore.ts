import type { StoredProject } from "~/types/projects/project-types";

export const useProjectsStore = () => {
  const projects = useState<StoredProject[]>("projects", () => []);

  const addProject = (project: StoredProject) => {
    projects.value.push(project);
  };

  const setProjects = (storedProjects: StoredProject[]) => {
    projects.value = storedProjects;
  };

  return {
    projects,
    addProject,
    setProjects,
  };
};
