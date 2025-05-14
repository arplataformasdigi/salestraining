
import React, { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Play, Clock, User, BarChart } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

// Dados fictícios para simulações
const mockSimulations = [
  {
    id: 1,
    title: "Demonstração de Produto",
    description: "Simulação de demonstração de produto para cliente potencial",
    category: "Demonstração",
    duration: "15 min",
    difficulty: "Intermediário",
    completed: true,
    score: 82,
    lastAttempt: "2023-04-28T14:30:00",
  },
  {
    id: 2,
    title: "Cold Call",
    description: "Abordagem inicial para prospecção de clientes",
    category: "Prospecção",
    duration: "10 min",
    difficulty: "Iniciante",
    completed: true,
    score: 76,
    lastAttempt: "2023-05-02T10:15:00",
  },
  {
    id: 3,
    title: "Negociação de Preço",
    description: "Lidar com objeções relacionadas a preço",
    category: "Negociação",
    duration: "20 min",
    difficulty: "Avançado",
    completed: false,
    score: null,
    lastAttempt: null,
  },
  {
    id: 4,
    title: "Fechamento de Venda",
    description: "Técnicas para fechamento de negócio",
    category: "Fechamento",
    duration: "15 min",
    difficulty: "Intermediário",
    completed: true,
    score: 92,
    lastAttempt: "2023-05-08T16:45:00",
  },
  {
    id: 5,
    title: "Follow-up Pós-Venda",
    description: "Acompanhamento com cliente após fechamento",
    category: "Relacionamento",
    duration: "10 min",
    difficulty: "Iniciante",
    completed: false,
    score: null,
    lastAttempt: null,
  }
];

// Dados fictícios para histórico
const mockHistory = [
  { 
    id: 1,
    simulationId: 1, 
    date: "2023-04-28T14:30:00", 
    score: 82, 
    duration: "14:22" 
  },
  { 
    id: 2,
    simulationId: 1, 
    date: "2023-04-15T11:20:00", 
    score: 75, 
    duration: "15:05" 
  },
  { 
    id: 3,
    simulationId: 2, 
    date: "2023-05-02T10:15:00", 
    score: 76, 
    duration: "8:47" 
  },
  { 
    id: 4,
    simulationId: 4, 
    date: "2023-05-08T16:45:00", 
    score: 92, 
    duration: "13:51" 
  }
];

const Simulations: React.FC = () => {
  const [view, setView] = useState<"available" | "history">("available");
  const { toast } = useToast();

  const handleStartSimulation = (simulation: typeof mockSimulations[0]) => {
    toast({
      title: "Simulação iniciada",
      description: `Você iniciou a simulação "${simulation.title}"`,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Simulações</h1>
          <p className="text-gray-600">Pratique suas habilidades em cenários reais de vendas</p>
        </div>

        <div className="flex space-x-2 mb-6">
          <Button 
            variant={view === "available" ? "default" : "outline"} 
            onClick={() => setView("available")}
          >
            Simulações Disponíveis
          </Button>
          <Button 
            variant={view === "history" ? "default" : "outline"} 
            onClick={() => setView("history")}
          >
            Histórico
          </Button>
        </div>

        {view === "available" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockSimulations.map((simulation) => (
              <Card key={simulation.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg flex items-center">
                        <FileText size={18} className="mr-2" />
                        {simulation.title}
                      </CardTitle>
                      <CardDescription className="mt-1">{simulation.description}</CardDescription>
                    </div>
                    <Badge variant={
                      simulation.difficulty === "Iniciante" 
                        ? "default" 
                        : simulation.difficulty === "Intermediário" 
                        ? "secondary" 
                        : "destructive"
                    }>
                      {simulation.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center">
                        <Clock size={14} className="mr-2 text-gray-500" />
                        <span>{simulation.duration}</span>
                      </div>
                      <div className="flex items-center justify-end">
                        <Badge variant="outline">{simulation.category}</Badge>
                      </div>
                    </div>
                    
                    {simulation.completed && (
                      <div className="bg-gray-50 p-3 rounded-lg flex items-center justify-between">
                        <div className="flex items-center">
                          <BarChart size={16} className="mr-2 text-gray-500" />
                          <span className="font-medium">Última pontuação:</span>
                        </div>
                        <span className={`font-bold ${
                          simulation.score! >= 90 
                            ? "text-green-600" 
                            : simulation.score! >= 75 
                            ? "text-blue-600" 
                            : "text-yellow-600"
                        }`}>
                          {simulation.score}%
                        </span>
                      </div>
                    )}
                    
                    <Button 
                      className="w-full" 
                      onClick={() => handleStartSimulation(simulation)}
                    >
                      <Play size={16} className="mr-2" /> 
                      {simulation.completed ? "Refazer Simulação" : "Iniciar Simulação"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Simulações</CardTitle>
              <CardDescription>
                Veja seu histórico completo de simulações realizadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              {mockHistory.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Simulação</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Pontuação</TableHead>
                      <TableHead>Duração</TableHead>
                      <TableHead className="text-right">Ação</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockHistory.map((entry) => {
                      const simulation = mockSimulations.find(s => s.id === entry.simulationId)!;
                      return (
                        <TableRow key={entry.id}>
                          <TableCell className="font-medium">{simulation.title}</TableCell>
                          <TableCell>
                            {new Date(entry.date).toLocaleDateString('pt-BR', { 
                              day: 'numeric', 
                              month: 'short', 
                              year: 'numeric' 
                            })}
                          </TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              entry.score >= 90 
                                ? "bg-green-100 text-green-800" 
                                : entry.score >= 75 
                                ? "bg-blue-100 text-blue-800" 
                                : "bg-yellow-100 text-yellow-800"
                            }`}>
                              {entry.score}%
                            </span>
                          </TableCell>
                          <TableCell>{entry.duration}</TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                toast({
                                  title: "Relatório aberto",
                                  description: `Visualizando relatório detalhado da simulação "${simulation.title}"`,
                                });
                              }}
                            >
                              Ver Relatório
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8">
                  <FileText className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                  <h3 className="text-lg font-medium">Nenhuma simulação concluída</h3>
                  <p className="text-gray-500 mt-2">
                    Você ainda não completou nenhuma simulação. Comece uma simulação para ver seu histórico.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Simulations;
