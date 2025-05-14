
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Collaborators from "./pages/Collaborators";
import TrainingPaths from "./pages/TrainingPaths";
import Simulations from "./pages/Simulations";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

// Páginas da Empresa
import CompanyDashboard from "./pages/company/Index";
import CompanyCollaborators from "./pages/company/Collaborators";
import CompanyTrainingPaths from "./pages/company/TrainingPaths";
import CompanyInvites from "./pages/company/Invites";
import CompanyAISimulations from "./pages/company/AISimulations";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/collaborators" element={<Collaborators />} />
            <Route path="/training-paths" element={<TrainingPaths />} />
            <Route path="/simulations" element={<Simulations />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            
            {/* Rotas da Empresa */}
            <Route path="/empresa" element={<CompanyDashboard />} />
            <Route path="/empresa/colaboradores" element={<CompanyCollaborators />} />
            <Route path="/empresa/trilhas" element={<CompanyTrainingPaths />} />
            <Route path="/empresa/convites" element={<CompanyInvites />} />
            <Route path="/empresa/simulacoes" element={<CompanyAISimulations />} />
            
            {/* ADICIONE TODAS AS ROTAS PERSONALIZADAS ACIMA DA ROTA "*" */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
