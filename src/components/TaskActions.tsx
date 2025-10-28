import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Edit3, Trash2, MoreVertical } from "lucide-react";

type TaskActionsProps = {
  onEdit: () => void;
  onDelete: () => void;
};

export default function TaskActions({ onEdit, onDelete }: TaskActionsProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="p-2 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Opciones de tarea"
        >
          <MoreVertical className="w-5 h-5 text-slate-600" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="bg-white shadow-xl rounded-lg py-2 w-40 border border-slate-200"
          sideOffset={6}
        >
          <DropdownMenu.Item
            onSelect={onEdit}
            className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-blue-100 text-slate-700 text-sm"
          >
            <Edit3 className="w-4 h-4 text-blue-600" />
            Editar
          </DropdownMenu.Item>

          <DropdownMenu.Item
            onSelect={onDelete}
            className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-pink-100 text-pink-600 text-sm"
          >
            <Trash2 className="w-4 h-4" />
            Eliminar
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
