import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
} from "@/components/ui/sidebar";
import { navConfig } from "@/config/nav";
import { SidebarNavigation } from "./sidebar-navigation";
import { SiteHeader } from "./site-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider defaultOpen>
      <Sidebar collapsible="icon" className="border-r">
        <SidebarHeader className="p-4">
          <div className="flex items-center justify-center group-data-[collapsible=icon]:justify-center">
            
            <span className="font-headline text-xl font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
              RestoAdapt
            </span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarNavigation items={navConfig.sidebarNav} />
        </SidebarContent>
        <SidebarFooter className="p-4">
          <div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://placehold.co/40x40.png" alt="Usuario" data-ai-hint="user avatar" />
              <AvatarFallback>RA</AvatarFallback>
            </Avatar>
            <div className="flex flex-col group-data-[collapsible=icon]:hidden">
              <span className="text-sm font-medium text-sidebar-foreground">Usuario Administrador</span>
              <span className="text-xs text-sidebar-foreground/70">admin@restoadapt.com</span>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto group-data-[collapsible=icon]:hidden text-sidebar-foreground hover:text-sidebar-primary">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <SiteHeader />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
