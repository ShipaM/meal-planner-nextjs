"use client";
import { useSignOut } from "@/app/(auth)/sign-in/services/useMutations";

import { ROUTE_GROUPS } from "@/config/routeGroups";
import { customErrorMap } from "@/lib/customErrorMap";

import { Session } from "next-auth";
import { ReactNode, useState } from "react";
import { z } from "zod";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";

z.setErrorMap(customErrorMap);

type DashboardLayoutProps = { children: ReactNode; session: Session };

const DashboardLayout = ({ children, session }: DashboardLayoutProps) => {
  const [open, setOpen] = useState(false);
  const signOutMutation = useSignOut();
  const userRole = session.user?.role || "user";
  console.log(userRole);

  const filteredRouteGroups = ROUTE_GROUPS.filter((group) => {
    if (userRole === "ADMIN") {
      return group.group === "Foods Management";
    } else {
      return group.group === "Meals Management";
    }
  });

  const handleLogout = () => {
    signOutMutation.mutate();
  };

  return (
    <div className="flex">
      <DashboardHeader
        open={open}
        setOpen={setOpen}
        session={session}
        handleLogout={handleLogout}
      />
      <DashboardSidebar
        open={open}
        setOpen={setOpen}
        filteredRouteGroups={filteredRouteGroups}
      />
      <main
        className={`transition-margin mt-13 flex-1 p-4 duration-300 ${
          open ? "ml-64" : "ml-0"
        }`}
      >
        {children}
      </main>
    </div>
  );
};

export { DashboardLayout };
