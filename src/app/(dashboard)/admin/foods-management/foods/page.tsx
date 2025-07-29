import { FoodCards } from "./components/FoodCards";
import { FoodFiltersDrawer } from "./components/FoodFiltersDrawer";
import { FoodFormDialog } from "./components/FoodFormDialog";

const Page = () => {
  return (
    <div className="space-y-2">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Foods List</h1>
        <FoodFormDialog />
      </div>
      <FoodFiltersDrawer />
      <FoodCards />
    </div>
  );
};

export default Page;
