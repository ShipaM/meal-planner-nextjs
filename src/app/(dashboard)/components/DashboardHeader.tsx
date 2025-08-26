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
import * as Collapsible from "@radix-ui/react-collapsible";
import { LogOut, Menu } from "lucide-react";
import { Session } from "next-auth";
import { FC } from "react";

type DashboardHeaderProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  session: Session;
  handleLogout: () => void;
};

const DashboardHeader: FC<DashboardHeaderProps> = ({
  open,
  setOpen,
  session,
  handleLogout,
}) => {
  return (
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
  );
};

export default DashboardHeader;
