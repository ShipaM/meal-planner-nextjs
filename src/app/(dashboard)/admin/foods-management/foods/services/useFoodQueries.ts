import {
  getFood,
  getFoods,
} from "@/app/(dashboard)/admin/foods-management/foods/services/queries";
import { useQuery } from "@tanstack/react-query";
import { useFoodsStore } from "../libs/useFoodStore";

const useFoods = () => {
  const { foodFilters } = useFoodsStore();

  return useQuery({
    queryKey: ["foods", foodFilters],
    queryFn: () => getFoods(foodFilters),
  });
};

const useFood = () => {
  const { selectedFoodId } = useFoodsStore();

  return useQuery({
    queryKey: ["foods", { selectedFoodId }],
    queryFn: () => getFood(selectedFoodId!),
    enabled: !!selectedFoodId,
  });
};

export { useFoods, useFood };
