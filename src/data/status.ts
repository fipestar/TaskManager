import type { Status } from "../types";

export const STATUS_IDS = {
  PENDING: "s1",
  IN_PROGRESS: "s2",
  COMPLETED: "s3"
}

export const statuses : Status[] = [
  { id: STATUS_IDS.PENDING, name: "Pendiente", iconKey: "circle" },
  { id: STATUS_IDS.IN_PROGRESS, name: "En progreso", iconKey: "loader" },
  { id: STATUS_IDS.COMPLETED, name: "Completada", iconKey: "check-circle" },
];