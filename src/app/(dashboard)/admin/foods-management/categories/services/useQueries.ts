import {
  getCategory,
  getCategories,
} from "@/app/(dashboard)/admin/foods-management/categories/services/services";
import { useQuery } from "@tanstack/react-query";
import { useCategoriesStore } from "../libs/use-category-store";
import { categoriesQueryKeys } from "./queryKeys.constants";

const useCategories = () => {
  return useQuery({
    queryKey: [categoriesQueryKeys.getCategories],
    queryFn: getCategories,
  });
};

const useCategory = () => {
  const { selectedCategoryId } = useCategoriesStore();

  return useQuery({
    queryKey: [categoriesQueryKeys.getCategories, { selectedCategoryId }],
    queryFn: () => getCategory(selectedCategoryId!),
    enabled: !!selectedCategoryId,
  });
};

export { useCategories, useCategory };
