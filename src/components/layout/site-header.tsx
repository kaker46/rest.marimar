import { SidebarTrigger } from "@/components/ui/sidebar";
import { Leaf } from "lucide-react"; 
// import Image from "next/image"; // Comentado o eliminado si no se usa

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="md:hidden" />
          <Leaf className="h-6 w-6 text-primary" /> 
          {/* <Image src="/logo.png" alt="RestoAdapt Logo" width={32} height={32} data-ai-hint="company logo" /> */}
          <span className="font-headline text-lg font-semibold text-foreground">
            RestoAdapt
          </span>
        </div>
      </div>
    </header>
  );
}
