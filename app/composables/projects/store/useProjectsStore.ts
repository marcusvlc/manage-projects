import type { StoredProject } from "~/types/projects/project-types";

export const useProjectsStore = () => {
  const projects = useState<StoredProject[]>("projects", () => []);

  const addProject = (project: StoredProject) => {
    projects.value.push(project);
  };

  const setProjects = (storedProjects: StoredProject[]) => {
    projects.value = storedProjects;
  };

  const toggleProjectFavorited = (projectId: string) => {
    const project = projects.value.find((project) => project.id === projectId);

    if (!project) {
      throw new Error("ID não encontrado");
    }

    project.favorited = !project.favorited;

    return project.favorited;
  };

  return {
    projects,
    toggleProjectFavorited,
    addProject,
    setProjects,
  };
};
