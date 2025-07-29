"use client";
import { useSignOut } from "@/app/(auth)/sign-in/services/useMutations";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { ROUTE_GROUPS } from "@/config/routeGroups";
import { customErrorMap } from "@/lib/customErrorMap";
import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronLeft, LogOut, Menu } from "lucide-react";
import { Session } from "next-auth";
import { ReactNode, useState } from "react";
import { z } from "zod";
import { RouteGroup } from "./RouteGroup";

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
      <div className="bg-background fixed z-10 flex h-13 w-screen items-center justify-between border px-2">
        <Collapsible.Root className="h-full" open={open} onOpenChange={setOpen}>
          <Collapsible.Trigger className="m-2" asChild>
            <Button size="icon" variant="outline">
              <Menu />
            </Button>
          </Collapsible.Trigger>
        </Collapsible.Root>
        <div className="flex">
          <ThemeToggle />
          {session && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex h-9 items-center gap-2 px-2"
                >
                  <Avatar className="size-8">
                    <AvatarFallback>{session.user?.name?.[0]}</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline">{session.user?.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="flex items-center gap-3 px-2 py-1.5">
                  <Avatar className="size-10">
                    <AvatarFallback>{session.user?.name?.[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{session.user?.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {session.user?.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} variant="destructive">
                  <LogOut className="size-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

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
