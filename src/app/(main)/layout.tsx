
import { AppLayout } from "@/components/layout/app-layout";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return <AppLayout>{children}</AppLayout>;
}
