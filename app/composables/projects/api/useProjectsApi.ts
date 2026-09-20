import localforage from "localforage";
import type { StoredProject } from "~/types/projects/project-types";

const INDEXED_DB_PROJECTS_KEY = "projects_key";

export const useProjectsApi = () => {
  const saveProject = async (projectPayload: StoredProject) => {
    try {
      const currentProjects = await getProjects();
      currentProjects.push(projectPayload);

      await localforage.setItem(INDEXED_DB_PROJECTS_KEY, currentProjects);

      return projectPayload;
    } catch {
      console.error("Erro ao salvar.");
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
    getProjects,
  };
};
