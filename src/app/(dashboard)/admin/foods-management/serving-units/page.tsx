import { ServingUnitCards } from "./_components/ServingUnitCards";
import { ServingUnitFormDialog } from "./_components/ServingUnitFormDialog";

const Page = () => {
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Serving Units List</h1>
        <ServingUnitFormDialog />
      </div>
      <ServingUnitCards />
    </>
  );
};

export default Page;
