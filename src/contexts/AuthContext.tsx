
import React, { createContext, useState, useContext, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "collaborator" | "company";
  company?: string;
  phone?: string;
  status?: "active" | "inactive" | "pending";
  companyName?: string;
  userType?: "collaborator" | "company";
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string, userType?: string, companyName?: string) => Promise<void>;
  sendInvite: (email: string, role: string, trainingPaths?: string[]) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // For now, simulate login with mock data
    setIsLoading(true);
    try {
      // In a real implementation, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user for demonstration purposes
      const mockUser = {
        id: "user-123",
        name: "Demo User",
        email,
        role: email.includes("admin") ? "admin" : email.includes("company") ? "company" : "collaborator",
        userType: email.includes("company") ? "company" : "collaborator",
      } as User;
      
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(mockUser));
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  const register = async (name: string, email: string, password: string, userType: string = "collaborator", companyName?: string) => {
    setIsLoading(true);
    try {
      // In a real implementation, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user registration
      const newUser = {
        id: `user-${Date.now()}`,
        name,
        email,
        role: userType === "company" ? "company" : "collaborator",
        userType: userType as "collaborator" | "company",
        companyName,
      } as User;
      
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(newUser));
      
      // Here you would typically make an API call to register the user
      console.log("User registered:", { name, email, userType, companyName });
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const sendInvite = async (email: string, role: string, trainingPaths?: string[]) => {
    try {
      // Simulação de envio do convite
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`Convite enviado para ${email} com função ${role}`, trainingPaths ? `e trilhas: ${trainingPaths.join(', ')}` : '');
      return Promise.resolve();
    } catch (error) {
      console.error("Falha ao enviar convite:", error);
      throw error;
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    register,
    sendInvite
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
