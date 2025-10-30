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
          className="p-2.5 rounded-xl hover:bg-gray-100 transition-all duration-200 hover:shadow-md"
          aria-label="Opciones de tarea"
        >
          <MoreVertical className="w-5 h-5 text-gray-600" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="bg-white shadow-2xl rounded-xl py-2 w-44 border border-gray-100 z-50"
          sideOffset={8}
        >
          <DropdownMenu.Item
            onSelect={onEdit}
            className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-blue-50 text-gray-700 text-sm font-medium transition-colors duration-150 rounded-lg mx-1"
          >
            <Edit3 className="w-4 h-4 text-blue-600" />
            Editar
          </DropdownMenu.Item>

          <DropdownMenu.Item
            onSelect={onDelete}
            className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-red-50 text-red-600 text-sm font-medium transition-colors duration-150 rounded-lg mx-1"
          >
            <Trash2 className="w-4 h-4" />
            Eliminar
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
