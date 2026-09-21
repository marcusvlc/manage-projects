import type { StoredProject } from "~/types/projects/project-types";

export const useProjectsStore = () => {
  const projects = useState<StoredProject[]>("projects", () => []);

  const addProject = (project: StoredProject) => {
    projects.value.push(project);
  };

  const updateProject = (updatedProject: StoredProject) => {
    const projectIndex = projects.value.findIndex(
      (project) => project.id === updatedProject.id,
    );

    if (projectIndex === -1) {
      throw new Error("ID não encontrado");
    }

    projects.value[projectIndex] = updatedProject;
  };

  const setProjects = (storedProjects: StoredProject[]) => {
    projects.value = storedProjects;
  };

  const getProjectById = (projectId: string) => {
    return projects.value.find((project) => project.id === projectId);
  };

  const toggleProjectFavorited = (projectId: string) => {
    const project = getProjectById(projectId);

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
    updateProject,
    getProjectById,
    setProjects,
  };
};
