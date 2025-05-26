
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import DashboardHomePage from "./pages/DashboardHomePage";
import HoneyPage from "./pages/business/HoneyPage";
import WeedPage from "./pages/business/WeedPage";
import FishPage from "./pages/business/FishPage";
import MushroomsPage from "./pages/business/MushroomsPage";

// PlaceholderPage component is no longer used, so it's removed.

import SuppliersPage from "./pages/SuppliersPage";
import CustomersPage from "./pages/CustomersPage";
import EquipmentPage from "./pages/EquipmentPage";
import CompliancePage from "./pages/CompliancePage";
import CalendarPage from "./pages/CalendarPage";
import TasksPage from "./pages/TasksPage";
import ReportingPage from "./pages/ReportingPage";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<DashboardHomePage />} />
            <Route path="/business/honey" element={<HoneyPage />} />
            <Route path="/business/weed" element={<WeedPage />} />
            <Route path="/business/fish" element={<FishPage />} />
            <Route path="/business/mushrooms" element={<MushroomsPage />} />
            
            <Route path="/suppliers" element={<SuppliersPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/equipment" element={<EquipmentPage />} />
            <Route path="/compliance" element={<CompliancePage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/reports" element={<ReportingPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
