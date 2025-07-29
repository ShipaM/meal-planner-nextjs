import { useQuery } from "@tanstack/react-query";
import { useServingUnitsStore } from "../libs/useServingUnitStore";
import { getServingUnit, getServingUnits } from "./services";

const useServingUnits = () => {
  return useQuery({
    queryKey: ["servingUnits"],
    queryFn: getServingUnits,
  });
};

const useServingUnit = () => {
  const { selectedServingUnitId } = useServingUnitsStore();

  return useQuery({
    queryKey: ["servingUnits", { selectedServingUnitId }],
    queryFn: () => getServingUnit(selectedServingUnitId!),
    enabled: !!selectedServingUnitId,
  });
};

export { useServingUnits, useServingUnit };
