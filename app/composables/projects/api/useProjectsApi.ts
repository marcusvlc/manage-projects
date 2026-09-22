import localforage from "localforage";
import { toRaw } from "vue";
import type {
  ProjectPayload,
  StoredProject,
} from "~/types/projects/project-types";

const INDEXED_DB_PROJECTS_KEY = "projects_key";

const addProjectId = (projectPayload: ProjectPayload): StoredProject => ({
  ...projectPayload,
  id: generateRandomId(),
});

export const useProjectsApi = () => {
  const saveProject = async (projectPayload: ProjectPayload) => {
    try {
      const project = addProjectId(projectPayload);
      const currentProjects = await getProjects();
      currentProjects.push(project);

      await localforage.setItem(INDEXED_DB_PROJECTS_KEY, currentProjects);

      return project;
    } catch {
      console.error("Erro ao salvar.");
    }
  };

  const updateProject = async (project: StoredProject) => {
    try {
      const plainProject = { ...toRaw(project) };
      const currentProjects = await getProjects();
      const projectIndex = currentProjects.findIndex(
        (currentProject) => currentProject.id === plainProject.id,
      );

      if (projectIndex === -1) {
        throw new Error("Projeto não encontrado");
      }

      currentProjects[projectIndex] = plainProject;
      await localforage.setItem(INDEXED_DB_PROJECTS_KEY, currentProjects);

      return plainProject;
    } catch (erro) {
      console.error("Erro ao atualizar:", erro);
      throw erro;
    }
  };

  const removeProject = async (projectId: string) => {
    try {
      const currentProjects = await getProjects();
      const projectIndex = currentProjects.findIndex(
        (project) => project.id === projectId,
      );

      if (projectIndex === -1) {
        throw new Error("Projeto não encontrado");
      }

      currentProjects.splice(projectIndex, 1);
      await localforage.setItem(INDEXED_DB_PROJECTS_KEY, currentProjects);
    } catch (erro) {
      console.error("Erro ao remover:", erro);
      throw erro;
    }
  };

  const getProjects = async (): Promise<StoredProject[]> => {
    try {
      const projects = await localforage.getItem(INDEXED_DB_PROJECTS_KEY);
      return (projects as StoredProject[]) || [];
    } catch (erro) {
      console.error("Erro ao carregar:", erro);
      return [];
    }
  };

  return {
    saveProject,
    updateProject,
    removeProject,
    getProjects,
  };
};
