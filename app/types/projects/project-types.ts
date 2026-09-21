export interface StoredProject {
  id: string;
  name: string;
  customer: string;
  initDate: string;
  endDate: string;
  coverImage: string;
  favorited?: boolean;
}

export type ProjectPayload = Omit<StoredProject, "id">;
