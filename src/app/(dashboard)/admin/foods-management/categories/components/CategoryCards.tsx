"use client";
import { alert } from "@/lib/useGlobalStore";
import { useCategoriesStore } from "../libs/use-category-store";
import { CategoryCardsSkeleton } from "./CategoryCardsSkeleton";
import { NoItemsFound } from "@/components/NoItemsFound";
import { useDeleteCategory } from "../services/useMutations";
import { useCategories } from "../services/useQueries";
import { CategoryCard } from "./CategoryCard";
import { useState } from "react";

const CategoryCards = () => {
  const [deletingId, setDeletingId] = useState<string | number | null>(null);

  const { updateSelectedCategoryId, updateCategoryDialogOpen } =
    useCategoriesStore();

  const categoriesQuery = useCategories();
  const { mutate: deleteCategoryMutation } = useDeleteCategory();

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
            <CategoryCard
              key={item.id}
              item={item}
              onEdit={() => {
                updateSelectedCategoryId(item.id);
                updateCategoryDialogOpen(true);
              }}
              onDelete={() =>
                alert({
                  onConfirm: () => {
                    setDeletingId(item.id);
                    deleteCategoryMutation(item.id, {
                      onSettled: () => {
                        setDeletingId(null);
                      },
                    });
                  },
                  description: `Are you sure you want to delete '${item.name}' category?`,
                })
              }
              isDeleting={deletingId === item.id}
            />
          ))}
        </>
      )}
    </div>
  );
};

export { CategoryCards };
