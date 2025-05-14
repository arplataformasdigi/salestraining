
import React from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThumbsUp, AlertTriangle, CheckCircle, Calendar, Clock } from "lucide-react";

const TrainingResults: React.FC = () => {
  const mockResults = [
    {
      id: 1,
      title: "Fundamentos de Vendas",
      date: "15/05/2023",
      duration: "45 min",
      score: 85,
      strengths: ["Conhecimento do produto", "Comunicação clara", "Identificação de necessidades"],
      improvements: ["Fechamento de vendas", "Tratamento de objeções"],
    },
    {
      id: 2,
      title: "Técnicas Avançadas de Objeções",
      date: "22/04/2023",
      duration: "60 min",
      score: 72,
      strengths: ["Empatia", "Escuta ativa"],
      improvements: ["Negociação", "Demonstração de valor"],
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Resultados de Treinamentos</h1>
          <p className="text-gray-600">Veja seus resultados nos treinamentos realizados</p>
        </div>

        <div className="space-y-6">
          {mockResults.map((result) => (
            <Card key={result.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{result.title}</CardTitle>
                  <Badge 
                    variant={result.score >= 80 ? "default" : result.score >= 60 ? "secondary" : "destructive"}
                    className="text-sm"
                  >
                    {result.score}%
                  </Badge>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    <span>{result.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    <span>{result.duration}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-start gap-2">
                      <ThumbsUp size={18} className="text-green-500 mt-1" />
                      <div>
                        <h4 className="font-medium text-sm">Pontos fortes</h4>
                        <ul className="text-sm mt-1 list-disc list-inside">
                          {result.strengths.map((strength, idx) => (
                            <li key={idx}>{strength}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-start gap-2">
                      <AlertTriangle size={18} className="text-amber-500 mt-1" />
                      <div>
                        <h4 className="font-medium text-sm">Oportunidades de melhoria</h4>
                        <ul className="text-sm mt-1 list-disc list-inside">
                          {result.improvements.map((improvement, idx) => (
                            <li key={idx}>{improvement}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    <CheckCircle size={16} className="mr-2" /> Ver detalhes completos
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
