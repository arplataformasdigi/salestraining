
import React, { useState } from "react";
import CompanyLayout from "@/components/layouts/CompanyLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Award, Star, Trophy, TrendingUp } from "lucide-react";

// Mock data for training rankings
const trainingRankingData = [
  { id: 1, name: "João Silva", company: "ABC Tech", score: 98, completedTrainings: 12, averageTime: "8 dias" },
  { id: 2, name: "Maria Oliveira", company: "XYZ Corp", score: 95, completedTrainings: 10, averageTime: "6 dias" },
  { id: 3, name: "Carlos Santos", company: "TechSoft", score: 91, completedTrainings: 15, averageTime: "10 dias" },
  { id: 4, name: "Ana Pereira", company: "Inovaty", score: 89, completedTrainings: 8, averageTime: "12 dias" },
  { id: 5, name: "Pedro Costa", company: "DataSys", score: 85, completedTrainings: 9, averageTime: "7 dias" },
  { id: 6, name: "Juliana Lima", company: "SoftTech", score: 82, completedTrainings: 7, averageTime: "9 dias" },
  { id: 7, name: "Lucas Mendes", company: "InnoSoft", score: 80, completedTrainings: 11, averageTime: "13 dias" },
  { id: 8, name: "Camila Rocha", company: "TechData", score: 78, completedTrainings: 6, averageTime: "8 dias" },
  { id: 9, name: "Marcelo Alves", company: "CodeTech", score: 75, completedTrainings: 5, averageTime: "11 dias" },
  { id: 10, name: "Fernanda Dias", company: "InnovData", score: 73, completedTrainings: 8, averageTime: "15 dias" },
];

// Mock data for simulations rankings
const simulationRankingData = [
  { id: 1, name: "Maria Oliveira", company: "XYZ Corp", score: 96, completedSimulations: 18, bestScenario: "Negociação de Preço" },
  { id: 2, name: "João Silva", company: "ABC Tech", score: 94, completedSimulations: 15, bestScenario: "Objeções de Vendas" },
  { id: 3, name: "Ana Pereira", company: "Inovaty", score: 91, completedSimulations: 12, bestScenario: "Demonstração de Produto" },
  { id: 4, name: "Carlos Santos", company: "TechSoft", score: 88, completedSimulations: 20, bestScenario: "Cold Call" },
  { id: 5, name: "Lucas Mendes", company: "InnoSoft", score: 85, completedSimulations: 14, bestScenario: "Fechamento de Venda" },
  { id: 6, name: "Juliana Lima", company: "SoftTech", score: 83, completedSimulations: 10, bestScenario: "Cold Call" },
  { id: 7, name: "Pedro Costa", company: "DataSys", score: 79, completedSimulations: 16, bestScenario: "Negociação de Preço" },
  { id: 8, name: "Fernanda Dias", company: "InnovData", score: 77, completedSimulations: 9, bestScenario: "Follow-up" },
  { id: 9, name: "Camila Rocha", company: "TechData", score: 75, completedSimulations: 11, bestScenario: "Objeções de Vendas" },
  { id: 10, name: "Marcelo Alves", company: "CodeTech", score: 72, completedSimulations: 13, bestScenario: "Demonstração de Produto" },
];

const Ranking: React.FC = () => {
  return (
    <CompanyLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Ranking de Desempenho</h1>
            <p className="text-gray-600">Veja os melhores desempenhos em treinamentos e simulações</p>
          </div>
          <Award className="h-10 w-10 text-primary" />
        </div>

        <Tabs defaultValue="training">
          <TabsList className="mb-4">
            <TabsTrigger value="training">
              <Trophy className="h-4 w-4 mr-2" />
              Trilhas de Treinamento
            </TabsTrigger>
            <TabsTrigger value="simulation">
              <Star className="h-4 w-4 mr-2" />
              Simulações IA
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="training">
            <Card>
              <CardHeader>
                <CardTitle>Top 10 - Trilhas de Treinamento</CardTitle>
                <CardDescription>
                  Classificação baseada no desempenho geral em trilhas de treinamento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">Posição</TableHead>
                      <TableHead>Colaborador</TableHead>
                      <TableHead>Empresa</TableHead>
                      <TableHead>Pontuação Média</TableHead>
                      <TableHead>Treinamentos Concluídos</TableHead>
                      <TableHead>Tempo Médio de Conclusão</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {trainingRankingData.map((user, index) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            {index < 3 ? (
                              <Trophy className={`h-5 w-5 mr-2 ${
                                index === 0 ? 'text-yellow-500' : 
                                index === 1 ? 'text-gray-400' : 'text-amber-700'
                              }`} />
                            ) : (
                              <span className="w-5 mr-2 text-center">{index + 1}</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.company}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span className={`font-bold ${
                              user.score >= 90 ? 'text-green-600' : 
                              user.score >= 80 ? 'text-blue-600' : 
                              user.score >= 70 ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                              {user.score}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{user.completedTrainings}</TableCell>
                        <TableCell>{user.averageTime}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="simulation">
            <Card>
              <CardHeader>
                <CardTitle>Top 10 - Simulações IA</CardTitle>
                <CardDescription>
                  Classificação baseada no desempenho geral em simulações de IA
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">Posição</TableHead>
                      <TableHead>Colaborador</TableHead>
                      <TableHead>Empresa</TableHead>
                      <TableHead>Pontuação Média</TableHead>
                      <TableHead>Simulações Concluídas</TableHead>
                      <TableHead>Melhor Cenário</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {simulationRankingData.map((user, index) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            {index < 3 ? (
                              <Trophy className={`h-5 w-5 mr-2 ${
                                index === 0 ? 'text-yellow-500' : 
                                index === 1 ? 'text-gray-400' : 'text-amber-700'
                              }`} />
                            ) : (
                              <span className="w-5 mr-2 text-center">{index + 1}</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.company}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span className={`font-bold ${
                              user.score >= 90 ? 'text-green-600' : 
                              user.score >= 80 ? 'text-blue-600' : 
                              user.score >= 70 ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                              {user.score}%
                            </span>
                            <TrendingUp className="h-4 w-4 ml-2 text-green-600" />
                          </div>
                        </TableCell>
                        <TableCell>{user.completedSimulations}</TableCell>
                        <TableCell>{user.bestScenario}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </CompanyLayout>
  );
};

export default Ranking;
