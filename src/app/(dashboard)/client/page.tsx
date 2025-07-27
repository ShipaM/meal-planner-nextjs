import { auth } from "@/lib/auth";
import { MealFormDialog } from "./components/MealFormDialog";
import { MealCards } from "./components/MealCards";
import { MealFilters } from "./components/MealFilters";

const Page = async () => {
  const session = await auth();
  if (!session) return null;

  return (
    <>
      <div className="flex justify-between">
        <MealFilters />
        <MealFormDialog session={session} />
      </div>
      <MealCards />
    </>
  );
};

export default Page;
