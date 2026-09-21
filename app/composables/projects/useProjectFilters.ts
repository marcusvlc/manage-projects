import type { StoredProject } from "~/types/projects/project-types";
import { projectSorters, sortingOptions } from "~/utils/project-filters";
import type { ProjectFilter, SortingOption } from "~/types/projects/filters";

export const useProjectFilters = (projects: Ref<StoredProject[]> = ref([])) => {
  const onlyFavorites = useState<boolean>(
    "projects-filter-only-favorites",
    () => false,
  );

  const sortingBy = useState<SortingOption>(
    "projects-sorting",
    () => sortingOptions[0]!,
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

  const filteredProjects = computed(() => {
    const filtered = filters.value.reduce(
      (projectsToFilter, filter) => filter(projectsToFilter),
      projects.value,
    );

    return projectSorters[sortingBy.value.id](filtered);
  });

  return {
    filteredProjects,
    onlyFavorites,
    sortingBy,
    sortingOptions,
  };
};
