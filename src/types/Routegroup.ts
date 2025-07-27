import type { ReactNode } from "react";

export type TRouteGroup = {
  group: string;
  items: {
    href: string;
    label: string;
    icon: ReactNode;
  }[];
};
