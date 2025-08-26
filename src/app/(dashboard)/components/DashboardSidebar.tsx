import { ChevronLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { RouteGroup } from "./RouteGroup";
import * as Collapsible from "@radix-ui/react-collapsible";
import { Button } from "@/components/ui/button";
import { TRouteGroup } from "@/types/Routegroup";
import type { FC } from "react";

type DashboardSidebarProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  filteredRouteGroups: TRouteGroup[];
};

const DashboardSidebar: FC<DashboardSidebarProps> = ({
  open,
  setOpen,
  filteredRouteGroups,
}) => {
  return (
    <Collapsible.Root
      className="fixed top-0 left-0 z-20 h-dvh"
      open={open}
      onOpenChange={setOpen}
    >
      <Collapsible.Content forceMount>
        <div
          className={`bg-background fixed top-0 left-0 h-screen w-64 border p-4 transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <h1 className="font-semibold">Admin Dashboard</h1>
            <Collapsible.Trigger asChild>
              <Button size="icon" variant="outline">
                <ChevronLeft />
              </Button>
            </Collapsible.Trigger>
          </div>

          <Separator className="my-2" />

          <div className="mt-4 flex flex-col">
            {filteredRouteGroups.map((routeGroup) => (
              <RouteGroup {...routeGroup} key={routeGroup.group} />
            ))}
          </div>
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

export default DashboardSidebar;
