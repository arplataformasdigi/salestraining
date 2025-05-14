
import React, { useState } from "react";
import CompanyLayout from "@/components/layouts/CompanyLayout";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Brain,
  Plus,
  Play,
  Settings,
  LineChart,
  Users,
  MessageSquare,
  Sparkles,
} from "lucide-react";

// Dados simulados para cenários
const mockScenarios = [
  {
    id: 1,
    title: "Cold Call para Produto SaaS",
    description: "Simulação de uma ligação inicial para um potencial cliente de um software de gestão de vendas",
    type: "cold-call",
    difficulty: "intermediate",
    context: "Você está fazendo uma primeira ligação para um diretor de vendas de uma empresa que poderia se beneficiar do seu software de CRM. O prospect não conhece seu produto e está ocupado.",
    createdAt: "2023-04-25T14:30:00",
    usageCount: 24,
    avgScore: 76
  },
  {
    id: 2,
    title: "Objeção de Preço",
    description: "Simulação para lidar com objeções comuns sobre preço durante uma apresentação de vendas",
    type: "objection-handling",
    difficulty: "advanced",
    context: "Você está em uma reunião de vendas com um cliente que demonstrou interesse no seu produto, mas está resistente devido ao preço, dizendo que um concorrente oferece algo similar por menos.",
    createdAt: "2023-04-28T11:15:00",
    usageCount: 36,
    avgScore: 68
  },
  {
    id: 3,
    title: "Descoberta de Necessidades",
    description: "Simulação de uma reunião de descoberta para entender as necessidades do cliente",
    type: "discovery",
    difficulty: "beginner",
    context: "Você conseguiu uma reunião de 30 minutos com um potencial cliente que mostrou interesse inicial no seu produto. Seu objetivo é descobrir suas principais dores e necessidades.",
    createdAt: "2023-05-02T09:45:00",
    usageCount: 18,
    avgScore: 82
  },
  {
    id: 4,
    title: "Fechamento de Venda Complexa",
    description: "Simulação de uma reunião final de fechamento para um contrato B2B de alto valor",
    type: "closing",
    difficulty: "advanced",
    context: "Você está na fase final do ciclo de vendas de um contrato anual de alto valor. O cliente já passou por demonstrações e validações técnicas, mas ainda está indeciso entre sua solução e a de um concorrente.",
    createdAt: "2023-05-05T16:20:00",
    usageCount: 12,
    avgScore: 74
  }
];

// Dados simulados para resultados de simulações
const mockResults = [
  {
    id: 1,
    name: "João Silva",
    email: "joao.silva@exemplo.com",
    scenarioTitle: "Cold Call para Produto SaaS",
    date: "2023-05-12T14:30:00",
    score: 85,
    duration: "12:45",
    strengths: ["Abordagem inicial", "Qualificação", "Estabelecimento de rapport"],
    improvements: ["Lidar com objeções", "Fechamento"]
  },
  {
    id: 2,
    name: "Maria Souza",
    email: "maria.s@exemplo.com",
    scenarioTitle: "Objeção de Preço",
    date: "2023-05-11T10:15:00",
    score: 72,
    duration: "09:20",
    strengths: ["Empatia", "Conhecimento do produto"],
    improvements: ["Negociação", "Diferenciação de valor"]
  },
  {
    id: 3,
    name: "Carlos Oliveira",
    email: "c.oliveira@exemplo.com",
    scenarioTitle: "Descoberta de Necessidades",
    date: "2023-05-10T16:45:00",
    score: 92,
    duration: "15:10",
    strengths: ["Perguntas estratégicas", "Escuta ativa", "Síntese das necessidades"],
    improvements: ["Conexão com soluções"]
  }
];

interface ScenarioFormData {
  title: string;
  description: string;
  type: "cold-call" | "objection-handling" | "discovery" | "closing";
  difficulty: "beginner" | "intermediate" | "advanced";
  context: string;
}

const CompanyAISimulations: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("scenarios");
  const [scenarios, setScenarios] = useState(mockScenarios);
  const [results, setResults] = useState(mockResults);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<ScenarioFormData>({
    title: "",
    description: "",
    type: "cold-call",
    difficulty: "intermediate",
    context: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newScenario = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString(),
      usageCount: 0,
      avgScore: 0
    };
    
    setScenarios([newScenario, ...scenarios]);
    toast({
      title: "Cenário criado",
      description: "O novo cenário de simulação foi criado com sucesso.",
    });
    
    setIsDialogOpen(false);
    setFormData({
      title: "",
      description: "",
      type: "cold-call",
      difficulty: "intermediate",
      context: ""
    });
  };

  const difficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-blue-100 text-blue-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const translateDifficulty = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "iniciante";
      case "intermediate":
        return "intermediário";
      case "advanced":
        return "avançado";
      default:
        return difficulty;
    }
  };

  const translateType = (type: string) => {
    switch (type) {
      case "cold-call":
        return "Cold Call";
      case "objection-handling":
        return "Tratamento de Objeções";
      case "discovery":
        return "Descoberta";
      case "closing":
        return "Fechamento";
      default:
        return type;
    }
  };

  return (
    <CompanyLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Simulações com IA</h1>
            <p className="text-gray-600">Crie e gerencie cenários de simulação de vendas com Inteligência Artificial</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Novo Cenário
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Criar Novo Cenário</DialogTitle>
                <DialogDescription>
                  Defina os detalhes do cenário de simulação de vendas.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Cold Call para Produto SaaS"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Breve descrição do cenário de simulação..."
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo</Label>
                  <Select 
                    onValueChange={(value) => handleSelectChange("type", value)}
                    defaultValue={formData.type}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cold-call">Cold Call</SelectItem>
                      <SelectItem value="objection-handling">Tratamento de Objeções</SelectItem>
                      <SelectItem value="discovery">Descoberta</SelectItem>
                      <SelectItem value="closing">Fechamento</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Nível de Dificuldade</Label>
                  <Select 
                    onValueChange={(value) => handleSelectChange("difficulty", value)}
                    defaultValue={formData.difficulty}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o nível de dificuldade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Iniciante</SelectItem>
                      <SelectItem value="intermediate">Intermediário</SelectItem>
                      <SelectItem value="advanced">Avançado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="context">Contexto do Cenário</Label>
                  <Textarea
                    id="context"
                    name="context"
                    value={formData.context}
                    onChange={handleInputChange}
                    placeholder="Descreva o contexto e situação para esta simulação..."
                    className="min-h-[100px]"
                    required
                  />
                </div>

                <DialogFooter>
                  <Button type="submit">
                    Criar Cenário
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="scenarios" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="scenarios">
              <div className="flex items-center">
                <Brain className="mr-2 h-4 w-4" />
                <span>Cenários</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="results">
              <div className="flex items-center">
                <LineChart className="mr-2 h-4 w-4" />
                <span>Resultados</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="settings">
              <div className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                <span>Configurações</span>
              </div>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="scenarios" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scenarios.map((scenario) => (
                <Card key={scenario.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{scenario.title}</CardTitle>
                        <CardDescription>{scenario.description}</CardDescription>
                      </div>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${difficultyColor(
                          scenario.difficulty
                        )}`}
                      >
                        {translateDifficulty(scenario.difficulty)}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Tipo</h4>
                      <p className="mt-1">{translateType(scenario.type)}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Contexto</h4>
                      <p className="mt-1 text-sm">{scenario.context}</p>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Users size={14} className="mr-1 text-gray-400" />
                        <span>{scenario.usageCount} usos</span>
                      </div>
                      <div className="flex items-center">
                        <LineChart size={14} className="mr-1 text-gray-400" />
                        <span>Pontuação média: {scenario.avgScore > 0 ? `${scenario.avgScore}%` : 'N/A'}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="default" className="w-full">
                      <Play size={16} className="mr-2" />
                      Executar Simulação
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="results" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Resultados de Simulações Recentes</CardTitle>
                <CardDescription>
                  Veja os resultados das simulações realizadas pelos colaboradores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {results.map((result) => (
                    <Card key={result.id} className="border">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-base">{result.name}</CardTitle>
                            <CardDescription>{result.email}</CardDescription>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                            result.score >= 90 ? 'bg-green-100 text-green-800' :
                            result.score >= 75 ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {result.score}%
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Cenário</h4>
                            <p className="mt-1 text-sm">{result.scenarioTitle}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Data e Duração</h4>
                            <p className="mt-1 text-sm">
                              {new Date(result.date).toLocaleDateString('pt-BR')} • {result.duration}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-green-600 flex items-center">
                              <Sparkles size={14} className="mr-1" /> Pontos fortes
                            </h4>
                            <ul className="mt-1 text-sm list-disc list-inside">
                              {result.strengths.map((strength, index) => (
                                <li key={index}>{strength}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-amber-600 flex items-center">
                              <MessageSquare size={14} className="mr-1" /> Oportunidades de melhoria
                            </h4>
                            <ul className="mt-1 text-sm list-disc list-inside">
                              {result.improvements.map((improvement, index) => (
                                <li key={index}>{improvement}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm">Ver detalhes completos</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Simulação IA</CardTitle>
                <CardDescription>
                  Ajuste as configurações globais para as simulações de IA
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="defaultQuestions">Número Padrão de Perguntas</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="defaultQuestions"
                      type="number"
                      min="3"
                      max="20"
                      defaultValue="10"
                      className="max-w-[100px]"
                    />
                    <span className="text-sm text-gray-500">
                      Número de perguntas a serem geradas em cada simulação
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="aiModel">Modelo de IA</Label>
                  <Select defaultValue="gpt-4">
                    <SelectTrigger id="aiModel" className="max-w-[300px]">
                      <SelectValue placeholder="Selecione o modelo de IA" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4">GPT-4 (Alta precisão, mais lento)</SelectItem>
                      <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo (Rápido, bom equilíbrio)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-500">
                    O modelo de IA utilizado afeta a qualidade e velocidade das simulações
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="language">Idioma Padrão</Label>
                  <Select defaultValue="pt-BR">
                    <SelectTrigger id="language" className="max-w-[300px]">
                      <SelectValue placeholder="Selecione o idioma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                      <SelectItem value="en-US">Inglês (EUA)</SelectItem>
                      <SelectItem value="es-ES">Espanhol</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="feedback">Estilo de Feedback</Label>
                  <Select defaultValue="detailed">
                    <SelectTrigger id="feedback" className="max-w-[300px]">
                      <SelectValue placeholder="Selecione o estilo de feedback" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="detailed">Detalhado</SelectItem>
                      <SelectItem value="concise">Conciso</SelectItem>
                      <SelectItem value="coaching">Estilo Coaching</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-500">
                    Como o feedback será fornecido aos colaboradores após a simulação
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Salvar Configurações</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </CompanyLayout>
  );
};

export default CompanyAISimulations;
