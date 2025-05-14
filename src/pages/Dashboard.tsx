
import React from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Users,
  FileText,
  Book,
} from "lucide-react";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin" || user?.role === "manager";

  // Dados simulados para métricas do painel
  const metrics = {
    completedSimulations: 28,
    inProgressPaths: 3,
    avgScore: 82,
    improvementRate: 12,
  };

  // Dados simulados para atividades recentes
  const recentActivities = [
    {
      id: 1,
      type: "simulation",
      title: "Simulação de Cold Call",
      date: "2023-05-14T10:30:00",
      score: 85,
    },
    {
      id: 2,
      type: "training",
      title: "Tratando Objeções",
      date: "2023-05-12T14:45:00",
      score: 78,
    },
    {
      id: 3,
      type: "assessment",
      title: "Técnicas SPIN de Vendas",
      date: "2023-05-10T11:15:00",
      score: 92,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Bem-vindo(a), {user?.name}</h1>
          <p className="text-gray-600">Aqui está uma visão geral do seu progresso no treinamento de vendas</p>
        </div>

        {/* Cards de Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Simulações Concluídas</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.completedSimulations}</div>
              <p className="text-xs text-muted-foreground">
                +5 desde a semana passada
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Trilhas em Andamento</CardTitle>
              <Book className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.inProgressPaths}</div>
              <p className="text-xs text-muted-foreground">
                1 trilha próxima da conclusão
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
                +3% de melhoria
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Taxa de Melhoria</CardTitle>
              <LineChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{metrics.improvementRate}%</div>
              <p className="text-xs text-muted-foreground">
                Em relação à avaliação inicial
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Atividades Recentes */}
        <Card>
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      activity.type === "simulation" 
                        ? "bg-blue-100 text-blue-600" 
                        : activity.type === "training" 
                        ? "bg-green-100 text-green-600" 
                        : "bg-purple-100 text-purple-600"
                    }`}>
                      {activity.type === "simulation" && <FileText size={16} />}
                      {activity.type === "training" && <Book size={16} />}
                      {activity.type === "assessment" && <LineChart size={16} />}
                    </div>
                    <div>
                      <h3 className="font-medium">{activity.title}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(activity.date).toLocaleDateString('pt-BR', { 
                          day: 'numeric', 
                          month: 'short', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      activity.score >= 90 
                        ? "bg-green-100 text-green-800" 
                        : activity.score >= 75 
                        ? "bg-blue-100 text-blue-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {activity.score}% pontuação
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Seção específica para administradores */}
        {isAdmin && (
          <Card>
            <CardHeader>
              <CardTitle>Visão Geral da Equipe</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-6">
                <Users size={40} className="mx-auto text-gray-400 mb-2" />
                <h3 className="font-medium">Gerenciamento de Equipe</h3>
                <p className="text-gray-500 mb-4">
                  Acesse o desempenho da sua equipe e gerencie colaboradores
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="font-semibold">15 Colaboradores Ativos</h4>
                    <p className="text-sm text-gray-500">3 aguardando integração</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="font-semibold">4 Trilhas de Treinamento</h4>
                    <p className="text-sm text-gray-500">1 trilha precisa de revisão</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
