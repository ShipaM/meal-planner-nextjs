import { CategoryCards } from "./_components/CategoryCards";
import { CategoryFormDialog } from "./_components/CategoryFormDialog";

const Page = () => {
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Categories List</h1>
        <CategoryFormDialog />
      </div>
      <CategoryCards />
    </>
  );
};

export default Page;
