import { useQuery } from "@tanstack/react-query";
import { getMeal, getMeals } from "./mealQueries";
import { useMealsStore } from "../libs/useMealStore";

const useMeals = () => {
  const { mealFilters } = useMealsStore();

  return useQuery({
    queryKey: ["meals", mealFilters],
    queryFn: () => getMeals(mealFilters),
  });
};

const useMeal = () => {
  const { selectedMealId } = useMealsStore();

  return useQuery({
    queryKey: ["meals", { selectedMealId }],
    queryFn: () => getMeal(selectedMealId!),
    enabled: !!selectedMealId,
  });
};

export { useMeals, useMeal };
