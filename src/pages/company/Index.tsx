
import React from "react";
import CompanyLayout from "@/components/layouts/CompanyLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  FileText,
  Book,
  LineChart,
  UserCheck,
  Clock,
  Brain
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const CompanyDashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Dados simulados para métricas do painel
  const metrics = {
    totalCollaborators: 15,
    activeTrainings: 4,
    completedSimulations: 78,
    avgScore: 76,
    pendingInvites: 3
  };

  // Desempenho por colaborador (dados simulados)
  const collaboratorPerformance = [
    { id: 1, name: "Ana Silva", completedTrainings: 3, progress: 85, lastActivity: "2023-05-14T10:30:00" },
    { id: 2, name: "Carlos Oliveira", completedTrainings: 2, progress: 68, lastActivity: "2023-05-13T15:45:00" },
    { id: 3, name: "Beatriz Santos", completedTrainings: 4, progress: 92, lastActivity: "2023-05-14T09:15:00" },
    { id: 4, name: "Diego Pereira", completedTrainings: 1, progress: 45, lastActivity: "2023-05-10T14:20:00" },
  ];

  return (
    <CompanyLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Painel Administrativo</h1>
          <p className="text-gray-600">Bem-vindo(a) ao painel de gerenciamento da {user?.companyName || "sua empresa"}</p>
        </div>

        {/* Cards de Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Colaboradores</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.totalCollaborators}</div>
              <p className="text-xs text-muted-foreground">
                +3 novos este mês
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Trilhas Ativas</CardTitle>
              <Book className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.activeTrainings}</div>
              <p className="text-xs text-muted-foreground">
                2 concluídas recentemente
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Simulações</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.completedSimulations}</div>
              <p className="text-xs text-muted-foreground">
                +12 na última semana
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Pontuação Média</CardTitle>
              <LineChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.avgScore}%</div>
              <p className="text-xs text-muted-foreground">
                +4% este mês
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Convites Pendentes</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.pendingInvites}</div>
              <p className="text-xs text-muted-foreground">
                5 aceitos este mês
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Visão geral do desempenho */}
        <Card>
          <CardHeader>
            <CardTitle>Desempenho de Colaboradores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {collaboratorPerformance.map((collab) => (
                <div key={collab.id} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{collab.name}</span>
                    <span className="text-sm text-gray-500">
                      {collab.completedTrainings} trilhas concluídas
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progresso geral</span>
                    <span>{collab.progress}%</span>
                  </div>
                  <Progress value={collab.progress} className="h-2" />
                  
                  <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      <span>
                        Última atividade: {new Date(collab.lastActivity).toLocaleDateString('pt-BR', { 
                          day: 'numeric', 
                          month: 'short', 
                          year: 'numeric' 
                        })}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <UserCheck size={14} className="mr-1" />
                      <span>{collab.progress > 80 ? "Excelente" : collab.progress > 60 ? "Bom" : "Precisa melhorar"}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </CompanyLayout>
  );
};

export default CompanyDashboard;
