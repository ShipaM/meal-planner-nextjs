"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  mealFiltersDefaultValues,
  mealFiltersSchema,
  MealFiltersSchema,
} from "../types/mealFilterSchema";
import { useMealsStore } from "../libs/useMealStore";
import { ControlledDatePicker } from "@/components/ui/ControlledDatePicker";

const MealFilters = () => {
  const form = useForm<MealFiltersSchema>({
    defaultValues: mealFiltersDefaultValues,
    resolver: zodResolver(mealFiltersSchema),
  });

  const { updateMealFilters } = useMealsStore();

  const onSubmit: SubmitHandler<MealFiltersSchema> = (data) => {
    updateMealFilters(data);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mb-4 flex items-center gap-3"
      >
        <ControlledDatePicker<MealFiltersSchema>
          name="dateTime"
          label="Filter by date"
        />
        <Button type="submit" size="sm">
          Apply
        </Button>
      </form>
    </FormProvider>
  );
};

export { MealFilters };
