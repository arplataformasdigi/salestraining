import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { User, Users, Settings, FileText, LineChart, Book, ArrowLeft, ArrowRight } from "lucide-react";
const Sidebar: React.FC = () => {
  const {
    user
  } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const isAdmin = user?.role === "admin" || user?.role === "manager";
  const navItems = [{
    name: "Dashboard",
    path: "/dashboard",
    icon: LineChart
  }, ...(isAdmin ? [{
    name: "Colaboradores",
    path: "/collaborators",
    icon: Users
  }] : []), {
    name: "Trilhas de Treinamento",
    path: "/training-paths",
    icon: Book
  }, {
    name: "Simulações",
    path: "/simulations",
    icon: FileText
  }, {
    name: "Meu Perfil",
    path: "/profile",
    icon: User
  }, {
    name: "Configurações",
    path: "/settings",
    icon: Settings
  }];
  return <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b">
          {!collapsed && <h1 className="text-lg font-bold text-primary">SalesTraining</h1>}
          <button onClick={() => setCollapsed(!collapsed)} className="p-1 rounded-full hover:bg-gray-100">
            {collapsed ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
          </button>
        </div>

        <nav className="flex-1 py-4">
          <ul className="space-y-1">
            {navItems.map(item => <li key={item.path}>
                <NavLink to={item.path} className={({
              isActive
            }) => `flex items-center px-4 py-3 ${isActive ? "bg-primary/10 text-primary border-r-2 border-primary" : "text-gray-700 hover:bg-gray-100"}`}>
                  <item.icon size={20} className="flex-shrink-0" />
                  {!collapsed && <span className="ml-3 whitespace-nowrap">{item.name}</span>}
                </NavLink>
              </li>)}
          </ul>
        </nav>

        <div className="p-4 border-t">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            {!collapsed && <div className="ml-3 overflow-hidden">
                <p className="text-sm font-medium truncate">{user?.name}</p>
                <p className="text-xs text-gray-500 truncate capitalize">
                  {user?.role === "admin" ? "Administrador" : user?.role === "manager" ? "Gerente" : "Colaborador"}
                </p>
              </div>}
          </div>
        </div>
      </div>
    </div>;
};
export default Sidebar;