import { type ReactNode } from "react";

export type RouteGroupType = {
  group: string;
  items: {
    href: string;
    label: string;
    icon: ReactNode;
  }[];
};
