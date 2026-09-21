import type { StoredProject } from "~/types/projects/project-types";

type ProjectFilter = (projects: StoredProject[]) => StoredProject[];

export const useProjectFilters = (projects: Ref<StoredProject[]> = ref([])) => {
  const onlyFavorites = useState<boolean>(
    "projects-filter-only-favorites",
    () => false,
  );

  const filters = computed<ProjectFilter[]>(() => {
    const enabledFilters: ProjectFilter[] = [];

    if (onlyFavorites.value) {
      enabledFilters.push((projectsToFilter) =>
        projectsToFilter.filter((project) => project.favorited),
      );
    }

    return enabledFilters;
  });

  const filteredProjects = computed(() =>
    filters.value.reduce(
      (projectsToFilter, filter) => filter(projectsToFilter),
      projects.value,
    ),
  );

  return {
    filteredProjects,
    onlyFavorites,
  };
};
