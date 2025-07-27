import {
  createServingUnit,
  deleteServingUnit,
  updateServingUnit,
} from "@/app/(dashboard)/admin/foods-management/serving-units/_services/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ServingUnitSchema } from "../_types/ServingUnitSchema";

const useCreateServingUnit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ServingUnitSchema) => {
      await createServingUnit(data);
    },
    onSuccess: () => {
      toast.success("Serving Unit created successfully.");
      queryClient.invalidateQueries({ queryKey: ["servingUnits"] });
    },
  });
};

const useUpdateServingUnit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ServingUnitSchema) => {
      await updateServingUnit(data);
    },
    onSuccess: () => {
      toast.success("Serving Unit updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["servingUnits"] });
    },
  });
};

const useDeleteServingUnit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await deleteServingUnit(id);
    },
    onSuccess: () => {
      toast.success("Serving Unit deleted successfully.");
      queryClient.invalidateQueries({ queryKey: ["servingUnits"] });
    },
  });
};

export { useCreateServingUnit, useDeleteServingUnit, useUpdateServingUnit };
