import { Button } from "@/components/ui/button";
import * as Collapsible from "@radix-ui/react-collapsible";
import { TRouteGroup } from "@/types/Routegroup";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useState } from "react";

type RouteGroupProps = TRouteGroup;

const RouteGroup: FC<RouteGroupProps> = ({ group, items }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Collapsible.Root open={isOpen} onOpenChange={setIsOpen}>
      <Collapsible.Trigger asChild>
        <Button
          className="text-foreground/80 flex w-full justify-between font-normal"
          variant="ghost"
        >
          {group}
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
            <ChevronDown />
          </motion.div>
        </Button>
      </Collapsible.Trigger>
      <Collapsible.Content forceMount>
        <motion.div
          className={`flex flex-col gap-2 ${
            !isOpen ? "pointer-events-none" : ""
          }`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          {items.map((item) => (
            <Button
              className="w-full justify-start font-normal"
              variant="link"
              asChild
              key={item.href}
            >
              <Link
                href={item.href}
                className={`flex items-center rounded-md px-5 py-1 transition-all ${
                  pathname === item.href
                    ? "bg-foreground/10 hover:bg-foreground/5"
                    : "hover:bg-foreground/10"
                }`}
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </Link>
            </Button>
          ))}
        </motion.div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

export { RouteGroup };
