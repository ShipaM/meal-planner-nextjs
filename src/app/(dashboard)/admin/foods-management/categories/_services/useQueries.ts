import {
  getCategory,
  getCategories,
} from "@/app/(dashboard)/admin/foods-management/categories/_services/services";
import { useQuery } from "@tanstack/react-query";
import { useCategoriesStore } from "../_libs/use-category-store";

const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};

const useCategory = () => {
  const { selectedCategoryId } = useCategoriesStore();

  return useQuery({
    queryKey: ["categories", { selectedCategoryId }],
    queryFn: () => getCategory(selectedCategoryId!),
    enabled: !!selectedCategoryId,
  });
};

export { useCategories, useCategory };
