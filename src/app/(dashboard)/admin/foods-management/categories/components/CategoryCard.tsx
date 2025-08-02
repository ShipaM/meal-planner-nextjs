import { Button } from "@/components/ui/button";
import { Category } from "@prisma/client";
import { Edit, Loader2, Trash } from "lucide-react";

type CategoryCardProps = {
  item: Category;
  onEdit: () => void;
  onDelete: () => void;
  isDeleting: boolean;
};
const CategoryCard = ({
  item,
  onEdit,
  onDelete,
  isDeleting,
}: CategoryCardProps) => (
  <div className="flex flex-col justify-between gap-3 rounded-lg border p-6">
    <p className="truncate">{item.name}</p>
    <div className="flex gap-1">
      <Button className="size-6" variant="ghost" size="icon" onClick={onEdit}>
        <Edit />
      </Button>
      <Button
        className="flex size-6 items-center justify-center"
        variant="ghost"
        size="icon"
        onClick={onDelete}
      >
        {isDeleting ? <Loader2 className="animate-spin" /> : <Trash />}
      </Button>
    </div>
  </div>
);

export { CategoryCard };
