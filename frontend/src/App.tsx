import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Apply from "./pages/Apply";
import OwnerDashboard from "./pages/dashboard/OwnerDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import AmbassadorDashboard from "./pages/dashboard/AmbassadorDashboard";
import Employees from "./pages/dashboard/Employees";
import Salaries from "./pages/dashboard/Salaries";
import Policies from "./pages/dashboard/Policies";
import Messages from "./pages/dashboard/Messages";
import Ambassadors from "./pages/dashboard/Ambassadors";
import Reports from "./pages/dashboard/Reports";
import Settings from "./pages/dashboard/Settings";
import MyStudents from "./pages/dashboard/MyStudents";
import Earnings from "./pages/dashboard/Earnings";
import Leaderboard from "./pages/dashboard/Leaderboard";
import Tasks from "./pages/dashboard/Tasks";
import Verifications from "./pages/dashboard/Verifications";
import OfferLetters from "./pages/dashboard/OfferLetters";
import EmployeeDashboard from "./pages/dashboard/EmployeeDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/dashboard/owner" element={<OwnerDashboard />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/dashboard/ambassador" element={<AmbassadorDashboard />} />
          <Route path="/dashboard/employees" element={<Employees />} />
          <Route path="/dashboard/financials" element={<Salaries />} />
          <Route path="/dashboard/policies" element={<Policies />} />
          <Route path="/dashboard/messages" element={<Messages />} />
          <Route path="/dashboard/ambassadors" element={<Ambassadors />} />
          <Route path="/dashboard/reports" element={<Reports />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route path="/dashboard/students" element={<MyStudents />} />
          <Route path="/dashboard/earnings" element={<Earnings />} />
          <Route path="/dashboard/leaderboard" element={<Leaderboard />} />
          <Route path="/dashboard/tasks" element={<Tasks />} />
          <Route path="/dashboard/verifications" element={<Verifications />} />
          <Route path="/dashboard/offer-letters" element={<OfferLetters />} />
          <Route path="/dashboard/employee" element={<EmployeeDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
