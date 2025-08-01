import { auth } from "@/lib/auth";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

type LayoutProps = { children: ReactNode };
const Layout = async ({ children }: LayoutProps) => {
  const session = await auth();
  console.log(session);
  if (!session) redirect("/sign-in");
  if (session.user?.role === Role.USER) redirect("/client");
  return <div className="mx-auto max-w-7xl p-6">{children}</div>;
};

export default Layout;
