
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Header } from "./Header";

export function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex bg-muted/40">
        <AppSidebar /> {/* This sidebar is controlled by SidebarProvider */}
        <div className="flex flex-col flex-1">
          <Header />
          <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8 animate-fade-in">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
