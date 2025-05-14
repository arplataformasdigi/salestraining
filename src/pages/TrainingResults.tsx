
import React from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ThumbsUp, 
  AlertTriangle, 
  CheckCircle, 
  Calendar, 
  Clock,
  ArrowRight
} from "lucide-react";

const TrainingResults: React.FC = () => {
  const mockResults = [
    {
      id: 1,
      name: "João Silva",
      email: "joao.silva@exemplo.com",
      title: "Cold Call para Produto SaaS",
      date: "12/05/2023",
      time: "12:45",
      score: 85,
      strengths: ["Abordagem inicial", "Qualificação", "Estabelecimento de rapport"],
      improvements: ["Lidar com objeções", "Fechamento"],
    },
    {
      id: 2,
      name: "Maria Souza",
      email: "maria.s@exemplo.com",
      title: "Objeção de Preço",
      date: "11/05/2023",
      time: "09:20",
      score: 72,
      strengths: ["Empatia", "Conhecimento do produto"],
      improvements: ["Negociação", "Diferenciação de valor"],
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Resultados de Treinamentos</h1>
          <p className="text-gray-600">Veja os resultados das trilhas de treinamento realizadas</p>
        </div>

        <div className="space-y-6">
          {mockResults.map((result) => (
            <Card key={result.id} className="overflow-hidden shadow-sm">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold">{result.name}</h3>
                      <Badge 
                        className={`${
                          result.score >= 80 
                            ? "bg-green-100 text-green-800" 
                            : result.score >= 60 
                              ? "bg-yellow-100 text-yellow-800" 
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {result.score}%
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">{result.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Cenário</p>
                    <p className="font-medium">{result.title}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Data e Duração</p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        <span>{result.date}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        <span>{result.time}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <div className="flex items-start gap-2">
                      <ThumbsUp size={18} className="text-green-500 mt-1" />
                      <div>
                        <p className="font-medium text-sm">Pontos fortes</p>
                        <ul className="text-sm mt-1 list-disc list-inside">
                          {result.strengths.map((strength, idx) => (
                            <li key={idx} className="text-gray-700">{strength}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-start gap-2">
                      <AlertTriangle size={18} className="text-amber-500 mt-1" />
                      <div>
                        <p className="font-medium text-sm">Oportunidades de melhoria</p>
                        <ul className="text-sm mt-1 list-disc list-inside">
                          {result.improvements.map((improvement, idx) => (
                            <li key={idx} className="text-gray-700">{improvement}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-3 border-t">
                  <Button variant="outline" className="text-primary hover:text-primary hover:bg-primary/5 transition-colors">
                    <span>Ver detalhes completos</span>
                    <ArrowRight size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TrainingResults;
