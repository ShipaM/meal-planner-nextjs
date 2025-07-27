"use client";
import { Button } from "@/components/ui/button";
import { alert } from "@/lib/useGlobalStore";
import { Edit, Trash } from "lucide-react";
import { useCategoriesStore } from "../_libs/use-category-store";
import { useCategories } from "../_services/useQueries";
import { useDeleteCategory } from "../_services/useMutations";
import { CategoryCardsSkeleton } from "./CategoryCardsSkeleton";
import { NoItemsFound } from "@/components/NoItemsFound";

const CategoryCards = () => {
  const { updateSelectedCategoryId, updateCategoryDialogOpen } =
    useCategoriesStore();

  const categoriesQuery = useCategories();
  const deleteCategoryMutation = useDeleteCategory();

  if (categoriesQuery.data?.length === 0) {
    return <NoItemsFound onClick={() => updateCategoryDialogOpen(true)} />;
  }

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
      {categoriesQuery.isLoading ? (
        <CategoryCardsSkeleton />
      ) : (
        <>
          {categoriesQuery.data?.map((item) => (
            <div
              className="flex flex-col justify-between gap-3 rounded-lg border p-6"
              key={item.id}
            >
              <p className="truncate">{item.name}</p>
              <div className="flex gap-1">
                <Button
                  className="size-6"
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    updateSelectedCategoryId(item.id);
                    updateCategoryDialogOpen(true);
                  }}
                >
                  <Edit />
                </Button>
                <Button
                  className="size-6"
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    alert({
                      onConfirm: () => deleteCategoryMutation.mutate(item.id),
                    });
                  }}
                >
                  <Trash />
                </Button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export { CategoryCards };
