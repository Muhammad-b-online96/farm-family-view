import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"; // Assuming these are custom/shadcn components
import { 
  LayoutDashboard, Home, Package, Cannabis, FishIcon, Sprout, Users, ShoppingCart, Truck, FileText, CalendarDays, ListChecks, BarChart3, Settings, LogOut, LifeBuoy, UserCircle, Store
} from "lucide-react";
import { cn } from "@/lib/utils";

const businessItems = [
  { title: "Honey", url: "/business/honey", icon: Package, color: "text-business-honey-DEFAULT" },
  { title: "Legal Weed", url: "/business/weed", icon: Cannabis, color: "text-business-weed-DEFAULT" },
  { title: "Fish", url: "/business/fish", icon: FishIcon, color: "text-business-fish-DEFAULT" },
  { title: "Exotic Mushrooms", url: "/business/mushrooms", icon: Sprout, color: "text-business-mushrooms-DEFAULT" },
];

const mainMenuItems = [
  { title: "Global Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Suppliers", url: "/suppliers", icon: Truck },
  { title: "Customers", url: "/customers", icon: Users },
  { title: "Equipment", url: "/equipment", icon: Settings }, // Placeholder icon
  { title: "Compliance", url: "/compliance", icon: FileText },
  { title: "Calendar & Events", url: "/calendar", icon: CalendarDays },
  { title: "Tasks", url: "/tasks", icon: ListChecks },
  { title: "Reporting", url: "/reports", icon: BarChart3 },
];

export function AppSidebar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path || (path !== "/" && location.pathname.startsWith(path));

  return (
    <Sidebar className="border-r bg-card text-card-foreground">
      <SidebarHeader className="p-4 border-b">
        <Link to="/" className="flex items-center gap-2">
          <Store className="h-8 w-8 text-primary" />
          {/* Replaced SidebarTitle with a span */}
          <span className="text-xl font-semibold text-primary">BizDash</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-4 space-y-6">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase text-muted-foreground">Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title} className={cn(isActive(item.url) && "bg-primary/10 text-primary")}>
                  {/* Changed variant from "ghost" to "default" */}
                  <SidebarMenuButton asChild variant="default" className="w-full justify-start">
                    <Link to={item.url} className="flex items-center gap-3">
                      <item.icon className={cn("h-5 w-5", isActive(item.url) ? "text-primary" : "text-muted-foreground")} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase text-muted-foreground">Businesses</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {businessItems.map((item) => (
                <SidebarMenuItem key={item.title} className={cn(isActive(item.url) && `bg-business-${item.color.split('-')[2]}/10`)}>
                  {/* Changed variant from "ghost" to "default" */}
                  <SidebarMenuButton asChild variant="default" className="w-full justify-start">
                    <Link to={item.url} className="flex items-center gap-3">
                      <item.icon className={cn("h-5 w-5", isActive(item.url) ? item.color : "text-muted-foreground", item.color)} />
                      <span className={cn(isActive(item.url) ? item.color : "")}>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {/* <SidebarFooter className="p-4 border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild variant="ghost" className="w-full justify-start">
              <Link to="/profile" className="flex items-center gap-3">
                <UserCircle className="h-5 w-5 text-muted-foreground" />
                <span>Sam Lee</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild variant="ghost" className="w-full justify-start">
              <Link to="/logout" className="flex items-center gap-3">
                <LogOut className="h-5 w-5 text-muted-foreground" />
                <span>Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter> */}
    </Sidebar>
  );
}
