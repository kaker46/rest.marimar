"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/config/nav";
import { cn } from "@/lib/utils";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Home, UtensilsCrossed, CalendarDays, CalendarClock, UsersRound, Settings, Workflow, type LucideIcon } from 'lucide-react';

interface SidebarNavigationProps {
  items: NavItem[];
}

const iconMap: { [key: string]: LucideIcon } = {
  Home,
  UtensilsCrossed,
  CalendarDays,
  CalendarClock,
  UsersRound,
  Workflow, 
  Settings,
};

export function SidebarNavigation({ items }: SidebarNavigationProps) {
  const pathname = usePathname();

  if (!items?.length) {
    return null;
  }

  return (
    <SidebarMenu>
      {items.map((item, index) => {
        const IconComponent = iconMap[item.iconName];
        return (
          item.href && IconComponent && (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton
                asChild
                variant="default"
                size="default"
                isActive={pathname === item.href}
                className={cn(
                  "justify-start",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
                tooltip={item.title}
              >
                <Link href={item.disabled ? "#" : item.href}>
                  <IconComponent />
                  <span>{item.title}</span>
                  {item.label && (
                    <span className="ml-auto rounded-lg bg-muted px-2 py-0.5 text-xs leading-none text-muted-foreground">
                      {item.label}
                    </span>
                  )}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        );
      })}
    </SidebarMenu>
  );
}
