
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Users, Settings, 
  FileText, LineChart, Book,
  ArrowLeft, ArrowRight, Brain,
  Award
} from "lucide-react";

const CompanySidebar: React.FC = () => {
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/empresa", icon: LineChart },
    { name: "Colaboradores", path: "/empresa/colaboradores", icon: Users },
    { name: "Trilhas de Treinamento", path: "/empresa/trilhas", icon: Book },
    { name: "Simulações IA", path: "/empresa/simulacoes", icon: Brain },
    { name: "Treinamentos Criados", path: "/empresa/convites", icon: FileText },
    { name: "Ranking", path: "/empresa/ranking", icon: Award },
    { name: "Configurações", path: "/empresa/configuracoes", icon: Settings },
  ];

  return (
    <div 
      className={`bg-sidebar transition-all duration-300 h-full ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          {!collapsed && (
            <h1 className="text-lg font-bold text-white">SalesTrainAI</h1>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-full text-white hover:bg-sidebar-accent"
          >
            {collapsed ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
          </button>
        </div>

        <nav className="flex-1 py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => 
                    `flex items-center px-4 py-3 rounded-md transition-colors ${
                      isActive 
                        ? "bg-sidebar-accent text-white" 
                        : "text-white/80 hover:bg-sidebar-accent/70 hover:text-white"
                    }`
                  }
                >
                  <item.icon size={20} className="flex-shrink-0" />
                  {!collapsed && (
                    <span className="ml-3 whitespace-nowrap">{item.name}</span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-white font-medium">
              {user?.name?.charAt(0).toUpperCase() || "E"}
            </div>
            {!collapsed && (
              <div className="ml-3 overflow-hidden">
                <p className="text-sm font-medium text-white truncate">{user?.name}</p>
                <p className="text-xs text-white/70 truncate">
                  {user?.companyName || "Empresa"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanySidebar;
