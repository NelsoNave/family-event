import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleX, Ellipsis, PencilLine } from "lucide-react";

export function ActionDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuItem className="flex justify-between">
          <span className="font-medium">Edit Activity</span>
          <PencilLine />
        </DropdownMenuItem>
        <DropdownMenuItem className="flex justify-between">
          <span className="font-medium">Delete Activity</span>
          <CircleX />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
