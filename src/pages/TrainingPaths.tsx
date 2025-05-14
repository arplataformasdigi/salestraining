import React, { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Book, CheckCircle, Clock, Play, ChartBar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const mockTrainingPaths = [
  {
    id: 1,
    title: "Fundamentos de Vendas",
    description: "Aprenda os princípios básicos de vendas eficazes",
    modules: 5,
    completedModules: 3,
    totalDuration: "4 horas",
    level: "Iniciante",
    category: "Fundamentos",
    tags: ["básico", "introdução", "vendas"]
  },
  {
    id: 2,
    title: "Técnicas Avançadas de Objeções",
    description: "Domine estratégias para lidar com objeções comuns de clientes",
    modules: 8,
    completedModules: 2,
    totalDuration: "6 horas",
    level: "Intermediário",
    category: "Técnicas",
    tags: ["objeções", "negociação", "conversão"]
  },
  {
    id: 3,
    title: "Vendas Consultivas B2B",
    description: "Estratégias para vendas complexas e de alto valor",
    modules: 10,
    completedModules: 0,
    totalDuration: "8 horas",
    level: "Avançado",
    category: "B2B",
    tags: ["consultiva", "empresarial", "ciclo longo"]
  },
  {
    id: 4,
    title: "Negociação e Fechamento",
    description: "Técnicas para negociar e fechar vendas de maneira efetiva",
    modules: 6,
    completedModules: 5,
    totalDuration: "5 horas",
    level: "Intermediário",
    category: "Negociação",
    tags: ["fechamento", "negociação", "persuasão"]
  }
];

const TrainingPaths: React.FC = () => {
  const [filter, setFilter] = useState("all");
  const { toast } = useToast();
  
  const filteredPaths = filter === "all" 
    ? mockTrainingPaths 
    : filter === "in-progress" 
      ? mockTrainingPaths.filter(path => path.completedModules > 0 && path.completedModules < path.modules)
      : mockTrainingPaths.filter(path => path.completedModules === path.modules);
  
  const handleStartTraining = (id: number) => {
    toast({
      title: "Treinamento iniciado",
      description: `Você começou o treinamento ${mockTrainingPaths.find(p => p.id === id)?.title}`,
    });
  };

  const handleContinueTraining = (id: number) => {
    toast({
      title: "Treinamento continuado",
      description: `Você retomou o treinamento ${mockTrainingPaths.find(p => p.id === id)?.title}`,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Trilhas de Treinamento</h1>
          <p className="text-gray-600">Explore nossas trilhas de treinamento para desenvolver suas habilidades de vendas</p>
        </div>

        <div className="flex space-x-2 mb-6">
          <Button 
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
          >
            Todos
          </Button>
          <Button 
            variant={filter === "in-progress" ? "default" : "outline"}
            onClick={() => setFilter("in-progress")}
          >
            Em Progresso
          </Button>
          <Button 
            variant={filter === "completed" ? "default" : "outline"}
            onClick={() => setFilter("completed")}
          >
            Concluídos
          </Button>
        </div>

        {filteredPaths.length === 0 ? (
          <Card className="p-8 text-center">
            <CardContent>
              <Book className="mx-auto h-12 w-12 text-gray-400 mb-3" />
              <h3 className="text-xl font-medium">Nenhum treinamento encontrado</h3>
              <p className="text-gray-500 mt-2">
                Nenhum treinamento foi encontrado para esta categoria.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPaths.map((path) => (
              <Card key={path.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{path.title}</CardTitle>
                      <CardDescription className="mt-1">{path.description}</CardDescription>
                    </div>
                    <Badge variant={
                      path.level === "Iniciante" 
                        ? "default" 
                        : path.level === "Intermediário" 
                        ? "secondary" 
                        : "destructive"
                    }>
                      {path.level}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progresso</span>
                        <span>{path.completedModules} de {path.modules} módulos</span>
                      </div>
                      <Progress 
                        value={(path.completedModules / path.modules) * 100} 
                        className="h-2"
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        <span>{path.totalDuration}</span>
                      </div>
                      <div>
                        <Badge variant="outline">{path.category}</Badge>
                      </div>
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => path.completedModules === 0 
                        ? handleStartTraining(path.id) 
                        : handleContinueTraining(path.id)}
                    >
                      {path.completedModules === 0 ? (
                        <>
                          <Play size={16} className="mr-2" /> 
                          Iniciar Treinamento
                        </>
                      ) : path.completedModules === path.modules ? (
                        <>
                          <CheckCircle size={16} className="mr-2" /> 
                          Concluído
                        </>
                      ) : (
                        <>
                          <Play size={16} className="mr-2" /> 
                          Continuar Treinamento
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TrainingPaths;
