import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { MealSchema } from "../types/mealSchema";
import { createMeal, deleteMeal, updateMeal } from "./mealMutations";

const useCreateMeal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: MealSchema) => {
      await createMeal(data);
    },
    onSuccess: () => {
      toast.success("Meal created successfully.");
      queryClient.invalidateQueries({ queryKey: ["meals"] });
    },
  });
};

const useUpdateMeal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: MealSchema) => {
      await updateMeal(data);
    },
    onSuccess: () => {
      toast.success("Meal updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["meals"] });
    },
  });
};

const useDeleteMeal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await deleteMeal(id);
    },
    onSuccess: () => {
      toast.success("Meal deleted successfully.");
      queryClient.invalidateQueries({ queryKey: ["meals"] });
    },
  });
};

export { useCreateMeal, useDeleteMeal, useUpdateMeal };
