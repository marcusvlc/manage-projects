import type { StoredProject } from "~/types/projects/project-types";

export type ProjectFilter = (projects: StoredProject[]) => StoredProject[];

export enum AvailableSorting {
  Alphabetical,
  MostRecentStarted,
  MostRecentDeadline,
}

export interface SortingOption {
  id: AvailableSorting;
  label: string;
}
