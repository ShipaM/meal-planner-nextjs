import { Button } from "@/components/ui/button";
import { ControlledSelect } from "@/components/ui/ControlledSelect";
import { CirclePlus, Trash2, UtensilsCrossed } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { ServingUnitFormDialog } from "../../serving-units/components/ServingUnitFormDialog";
import { FoodSchema } from "../types/FoodSchema";
import { ControlledInput } from "@/components/ui/ControlledInput";
import { useServingUnits } from "../../serving-units/services/useQueries";

const SpecifyFoodServingUnits = () => {
  const { control } = useFormContext<FoodSchema>();
  const foodServingUnits = useFieldArray({ control, name: "foodServingUnits" });

  const servingUnitsQuery = useServingUnits();

  return (
    <div className="flex flex-col gap-4 rounded-md border p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Serving Units</h3>
        <Button
          size="sm"
          type="button"
          variant="outline"
          className="flex items-center gap-1"
          onClick={() => {
            foodServingUnits.append({ foodServingUnitId: "", grams: "0" });
          }}
        >
          <CirclePlus className="size-4" /> Add Serving Unit
        </Button>
      </div>

      {foodServingUnits.fields.length === 0 ? (
        <div className="text-muted-foreground flex flex-col items-center justify-center rounded-md border border-dashed py-6 text-center">
          <UtensilsCrossed className="mb-2 size-10 opacity-50" />
          <p>No serving units added yet</p>
          <p className="text-sm">
            Add serving units to help users measure this food
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {foodServingUnits.fields.map((field, index) => (
            <div
              className="grid grid-cols-[1fr_1fr_auto] items-end gap-3"
              key={field.id}
            >
              <div className="col-span-1 flex items-end">
                <ControlledSelect<FoodSchema>
                  label="Food Serving Unit"
                  name={`foodServingUnits.${index}.foodServingUnitId`}
                  options={servingUnitsQuery.data?.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))}
                  placeholder="Select unit..."
                />
                <ServingUnitFormDialog smallTrigger />
              </div>

              <div>
                <ControlledInput<FoodSchema>
                  name={`foodServingUnits.${index}.grams`}
                  label="Grams per Unit"
                  type="number"
                  placeholder="0"
                />
              </div>
              <Button
                size="icon"
                variant="outline"
                type="button"
                onClick={() => {
                  foodServingUnits.remove(index);
                }}
              >
                <Trash2 />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { SpecifyFoodServingUnits };
