// data/iconMap.ts
import {
  Briefcase,
  GraduationCap,
  Home,
  Flag,
  Flame,
  Clock,
  CheckCircle,
  Circle,
  Loader,
} from "lucide-react";

export const iconMap = {
  // Proyectos
  work: Briefcase,
  university: GraduationCap,
  personal: Home,

  // Prioridades
  high: Flame,
  medium: Flag,
  low: Clock,

  // Estados
  todo: Circle,
  in_progress: Loader,
  done: CheckCircle,
};
