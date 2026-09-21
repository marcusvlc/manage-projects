import { AvailableSorting, type SortingOption } from "~/types/projects/filters";
import type { StoredProject } from "~/types/projects/project-types";
import { parseDateOnly } from "~/utils/date-utils";

export const sortingOptions: SortingOption[] = [
  {
    id: AvailableSorting.Alphabetical,
    label: "Ordem alfabética",
  },
  {
    id: AvailableSorting.MostRecentStarted,
    label: "Iniciados mais recentes",
  },
  {
    id: AvailableSorting.MostRecentDeadline,
    label: "Prazo mais próximo",
  },
];

type ProjectSorter = (projects: StoredProject[]) => StoredProject[];

export const projectSorters: Record<AvailableSorting, ProjectSorter> = {
  [AvailableSorting.Alphabetical]: (projects) =>
    [...projects].sort((firstProject, secondProject) =>
      firstProject.name.localeCompare(secondProject.name, "pt-BR"),
    ),
  [AvailableSorting.MostRecentStarted]: (projects) =>
    [...projects].sort(
      (firstProject, secondProject) =>
        parseDateOnly(secondProject.initDate).getTime() -
        parseDateOnly(firstProject.initDate).getTime(),
    ),
  [AvailableSorting.MostRecentDeadline]: (projects) =>
    [...projects].sort(
      (firstProject, secondProject) =>
        parseDateOnly(firstProject.endDate).getTime() -
        parseDateOnly(secondProject.endDate).getTime(),
    ),
};
