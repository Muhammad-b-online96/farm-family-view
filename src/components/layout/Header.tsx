
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Bell, UserCircle } from "lucide-react";
import { AppSidebar } from "./AppSidebar"; // Import AppSidebar for mobile drawer

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 lg:px-8 py-4">
      {/* Desktop sidebar trigger - part of shadcn/ui/sidebar */}
      <div className="hidden lg:block">
        <SidebarTrigger>
          <Button size="icon" variant="outline" className="h-8 w-8">
            <Menu className="h-4 w-4" />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        </SidebarTrigger>
      </div>

      {/* Mobile sidebar trigger */}
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="lg:hidden h-8 w-8">
            <Menu className="h-4 w-4" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="lg:hidden p-0 w-[280px]">
          <AppSidebar />
        </SheetContent>
      </Sheet>
      
      <div className="relative ml-auto flex-1 md:grow-0">
        {/* Search bar placeholder if needed */}
      </div>
      <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
        <Bell className="h-4 w-4" />
        <span className="sr-only">Toggle notifications</span>
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
        <UserCircle className="h-5 w-5" />
        <span className="sr-only">User menu</span>
      </Button>
    </header>
  );
}
