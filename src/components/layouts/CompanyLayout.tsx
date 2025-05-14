
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import CompanySidebar from "@/components/company/CompanySidebar";
import Navbar from "@/components/dashboard/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

interface CompanyLayoutProps {
  children: React.ReactNode;
}

const CompanyLayout: React.FC<CompanyLayoutProps> = ({ children }) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (user?.userType !== "company") {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <CompanySidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
      <Toaster />
    </div>
  );
};

export default CompanyLayout;
