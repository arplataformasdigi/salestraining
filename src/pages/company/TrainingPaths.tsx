
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Book,
  Plus,
  MoreVertical,
  Edit,
  Trash,
  CheckCircle,
  Users,
  Clock,
} from "lucide-react";

// Dados simulados para trilhas
const mockTrainingPaths = [
  {
    id: 1,
    title: "Fundamentos de Vendas",
    description: "Aprenda os princípios básicos de vendas eficazes",
    modules: 5,
    totalDuration: "4 horas",
    status: "active",
    createdAt: "2023-04-25T14:30:00",
    updatedAt: "2023-04-25T14:30:00",
    assignedUsers: 12,
    completionRate: 65,
    avgScore: 78
  },
  {
    id: 2,
    title: "Técnicas Avançadas de Objeções",
    description: "Domine estratégias para lidar com objeções comuns de clientes",
    modules: 8,
    totalDuration: "6 horas",
    status: "active",
    createdAt: "2023-04-28T11:15:00",
    updatedAt: "2023-05-10T09:20:00",
    assignedUsers: 8,
    completionRate: 45,
    avgScore: 72
  },
  {
    id: 3,
    title: "Vendas Consultivas B2B",
    description: "Estratégias para vendas complexas e de alto valor",
    modules: 10,
    totalDuration: "8 horas",
    status: "draft",
    createdAt: "2023-05-02T09:45:00",
    updatedAt: "2023-05-02T09:45:00",
    assignedUsers: 0,
    completionRate: 0,
    avgScore: 0
  },
  {
    id: 4,
    title: "Negociação e Fechamento",
    description: "Técnicas para negociar e fechar vendas de maneira efetiva",
    modules: 6,
    totalDuration: "5 horas",
    status: "active",
    createdAt: "2023-05-05T16:20:00",
    updatedAt: "2023-05-12T10:15:00",
    assignedUsers: 15,
    completionRate: 82,
    avgScore: 84
  }
];

// Dados simulados para módulos
const mockModules = {
  1: [
    { id: 101, title: "Introdução às Vendas", type: "lesson", duration: "45 min" },
    { id: 102, title: "Abordagem ao Cliente", type: "lesson", duration: "60 min" },
    { id: 103, title: "Simulação: Primeiro Contato", type: "simulation", duration: "30 min" },
    { id: 104, title: "Apresentação do Produto", type: "lesson", duration: "60 min" },
    { id: 105, title: "Avaliação Final", type: "assessment", duration: "45 min" }
  ],
  2: [
    { id: 201, title: "Tipos de Objeções", type: "lesson", duration: "45 min" },
    { id: 202, title: "Estratégias de Resposta", type: "lesson", duration: "60 min" },
    { id: 203, title: "Prática: Respostas a Objeções", type: "simulation", duration: "45 min" }
  ],
  4: [
    { id: 401, title: "Técnicas de Fechamento", type: "lesson", duration: "60 min" },
    { id: 402, title: "Negociação de Preço", type: "lesson", duration: "45 min" },
    { id: 403, title: "Simulação: Fechamento de Venda", type: "simulation", duration: "30 min" }
  ]
};

interface TrainingPathFormData {
  title: string;
  description: string;
  status: "active" | "draft" | "archived";
}

interface ModuleFormData {
  title: string;
  type: "lesson" | "simulation" | "assessment";
  duration: string;
}

const CompanyTrainingPaths: React.FC = () => {
  const { toast } = useToast();
  const [trainingPaths, setTrainingPaths] = useState(mockTrainingPaths);
  const [filter, setFilter] = useState("all");
  const [formData, setFormData] = useState<TrainingPathFormData>({
    title: "",
    description: "",
    status: "draft"
  });
  const [moduleFormData, setModuleFormData] = useState<ModuleFormData>({
    title: "",
    type: "lesson",
    duration: ""
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isModuleDialogOpen, setIsModuleDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [currentPathId, setCurrentPathId] = useState<number | null>(null);
  const [editingModuleId, setEditingModuleId] = useState<number | null>(null);
  const [viewingModules, setViewingModules] = useState<number | null>(null);

  const filteredPaths = filter === "all" 
    ? trainingPaths 
    : trainingPaths.filter(path => path.status === filter);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleModuleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setModuleFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      // Atualizar trilha existente
      setTrainingPaths(
        trainingPaths.map((path) =>
          path.id === editingId
            ? {
                ...path,
                ...formData,
                updatedAt: new Date().toISOString()
              }
            : path
        )
      );
      
      toast({
        title: "Trilha atualizada",
        description: `A trilha "${formData.title}" foi atualizada com sucesso.`,
      });
    } else {
      // Adicionar nova trilha
      const newPath = {
        id: Date.now(),
        ...formData,
        modules: 0,
        totalDuration: "0 horas",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        assignedUsers: 0,
        completionRate: 0,
        avgScore: 0
      };
      
      setTrainingPaths([...trainingPaths, newPath]);
      
      toast({
        title: "Trilha criada",
        description: `A trilha "${formData.title}" foi criada com sucesso.`,
      });
    }

    // Resetar formulário e fechar diálogo
    resetForm();
    setIsDialogOpen(false);
  };

  const handleModuleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentPathId) return;
    
    const pathModules = mockModules[currentPathId as keyof typeof mockModules] || [];
    
    if (editingModuleId) {
      // Atualizar módulo existente
      const updatedModules = pathModules.map(module => 
        module.id === editingModuleId 
          ? { ...module, ...moduleFormData }
          : module
      );
      
      mockModules[currentPathId as keyof typeof mockModules] = updatedModules;
      
      toast({
        title: "Módulo atualizado",
        description: `O módulo "${moduleFormData.title}" foi atualizado.`,
      });
    } else {
      // Adicionar novo módulo
      const newModule = {
        id: Date.now(),
        ...moduleFormData
      };
      
      if (!mockModules[currentPathId as keyof typeof mockModules]) {
        mockModules[currentPathId as keyof typeof mockModules] = [];
      }
      
      mockModules[currentPathId as keyof typeof mockModules].push(newModule);
      
      // Atualizar contagem de módulos na trilha
      setTrainingPaths(trainingPaths.map(path => 
        path.id === currentPathId
          ? { ...path, modules: path.modules + 1 }
          : path
      ));
      
      toast({
        title: "Módulo adicionado",
        description: `O módulo "${moduleFormData.title}" foi adicionado à trilha.`,
      });
    }

    // Resetar formulário e fechar diálogo
    resetModuleForm();
    setIsModuleDialogOpen(false);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      status: "draft"
    });
    setEditingId(null);
  };

  const resetModuleForm = () => {
    setModuleFormData({
      title: "",
      type: "lesson",
      duration: ""
    });
    setEditingModuleId(null);
  };

  const handleEdit = (id: number) => {
    const path = trainingPaths.find((p) => p.id === id);
    if (path) {
      setFormData({
        title: path.title,
        description: path.description,
        status: path.status as "active" | "draft" | "archived"
      });
      setEditingId(id);
      setIsDialogOpen(true);
    }
  };

  const handleEditModule = (pathId: number, moduleId: number) => {
    const pathModules = mockModules[pathId as keyof typeof mockModules] || [];
    const module = pathModules.find(m => m.id === moduleId);
    
    if (module) {
      setModuleFormData({
        title: module.title,
        type: module.type as "lesson" | "simulation" | "assessment",
        duration: module.duration
      });
      setCurrentPathId(pathId);
      setEditingModuleId(moduleId);
      setIsModuleDialogOpen(true);
    }
  };

  const handleAddModule = (pathId: number) => {
    setCurrentPathId(pathId);
    setEditingModuleId(null);
    resetModuleForm();
    setIsModuleDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    const path = trainingPaths.find((p) => p.id === id);
    setTrainingPaths(trainingPaths.filter((p) => p.id !== id));
    toast({
      title: "Trilha removida",
      description: `A trilha "${path?.title}" foi removida do sistema.`,
    });
  };

  const handleDeleteModule = (pathId: number, moduleId: number) => {
    const pathModules = mockModules[pathId as keyof typeof mockModules] || [];
    const module = pathModules.find(m => m.id === moduleId);
    
    if (module) {
      // Remover o módulo
      mockModules[pathId as keyof typeof mockModules] = pathModules.filter(m => m.id !== moduleId);
      
      // Atualizar contagem de módulos na trilha
      setTrainingPaths(trainingPaths.map(path => 
        path.id === pathId
          ? { ...path, modules: Math.max(0, path.modules - 1) }
          : path
      ));
      
      toast({
        title: "Módulo removido",
        description: `O módulo "${module.title}" foi removido da trilha.`,
      });
    }
  };

  const handleStatusChange = (id: number, status: "active" | "draft" | "archived") => {
    setTrainingPaths(
      trainingPaths.map((path) =>
        path.id === id
          ? {
              ...path,
              status,
              updatedAt: new Date().toISOString()
            }
          : path
      )
    );
    
    const path = trainingPaths.find((p) => p.id === id);
    toast({
      title: "Status alterado",
      description: `A trilha "${path?.title}" agora está ${
        status === "active" ? "ativa" : 
        status === "draft" ? "como rascunho" : 
        "arquivada"
      }.`,
    });
  };

  const handleOpenModules = (pathId: number) => {
    setViewingModules(viewingModules === pathId ? null : pathId);
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const translateStatus = (status: string) => {
    switch (status) {
      case "active":
        return "ativa";
      case "draft":
        return "rascunho";
      case "archived":
        return "arquivada";
      default:
        return status;
    }
  };

  const translateModuleType = (type: string) => {
    switch (type) {
      case "lesson":
        return "Aula";
      case "simulation":
        return "Simulação";
      case "assessment":
        return "Avaliação";
      default:
        return type;
    }
  };

  return (
    <CompanyLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Trilhas de Treinamento</h1>

          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Nova Trilha
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? "Editar Trilha" : "Criar Nova Trilha"}
                </DialogTitle>
                <DialogDescription>
                  {editingId
                    ? "Edite as informações da trilha de treinamento."
                    : "Adicione detalhes para criar uma nova trilha de treinamento."}
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
                    placeholder="Fundamentos de Vendas"
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
                    placeholder="Breve descrição da trilha de treinamento..."
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    name="status"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="draft">Rascunho</option>
                    <option value="active">Ativa</option>
                    <option value="archived">Arquivada</option>
                  </select>
                </div>

                <DialogFooter>
                  <Button type="submit">
                    {editingId ? "Atualizar" : "Criar"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* Modal para adicionar/editar módulos */}
          <Dialog open={isModuleDialogOpen} onOpenChange={(open) => {
            setIsModuleDialogOpen(open);
            if (!open) resetModuleForm();
          }}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingModuleId ? "Editar Módulo" : "Adicionar Novo Módulo"}
                </DialogTitle>
                <DialogDescription>
                  {editingModuleId
                    ? "Edite os detalhes deste módulo."
                    : "Preencha as informações para adicionar um novo módulo à trilha."}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleModuleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    name="title"
                    value={moduleFormData.title}
                    onChange={handleModuleInputChange}
                    placeholder="Nome do módulo"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo</Label>
                  <select
                    id="type"
                    name="type"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    value={moduleFormData.type}
                    onChange={handleModuleInputChange}
                    required
                  >
                    <option value="lesson">Aula</option>
                    <option value="simulation">Simulação</option>
                    <option value="assessment">Avaliação</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="duration">Duração</Label>
                  <Input
                    id="duration"
                    name="duration"
                    value={moduleFormData.duration}
                    onChange={handleModuleInputChange}
                    placeholder="ex: 45 min"
                    required
                  />
                </div>

                <DialogFooter>
                  <Button type="submit">
                    {editingModuleId ? "Atualizar" : "Adicionar"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex space-x-2">
          <Button 
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
          >
            Todas
          </Button>
          <Button 
            variant={filter === "active" ? "default" : "outline"}
            onClick={() => setFilter("active")}
          >
            Ativas
          </Button>
          <Button 
            variant={filter === "draft" ? "default" : "outline"}
            onClick={() => setFilter("draft")}
          >
            Rascunhos
          </Button>
          <Button 
            variant={filter === "archived" ? "default" : "outline"}
            onClick={() => setFilter("archived")}
          >
            Arquivadas
          </Button>
        </div>

        {filteredPaths.length === 0 ? (
          <Card className="p-8 text-center">
            <CardContent>
              <Book className="mx-auto h-12 w-12 text-gray-400 mb-3" />
              <h3 className="text-xl font-medium">Nenhuma trilha encontrada</h3>
              <p className="text-gray-500 mt-2">
                {filter === "all" 
                  ? "Nenhuma trilha foi criada ainda. Crie sua primeira trilha de treinamento." 
                  : `Nenhuma trilha com o status "${translateStatus(filter)}" foi encontrada.`}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredPaths.map((path) => (
              <Card key={path.id} className={viewingModules === path.id ? "border-primary" : ""}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{path.title}</CardTitle>
                      <CardDescription className="mt-1">{path.description}</CardDescription>
                    </div>
                    <div className="flex items-center">
                      <Badge className={statusColor(path.status)}>
                        {translateStatus(path.status)}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 ml-2">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Ações</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleEdit(path.id)}>
                            <Edit className="mr-2 h-4 w-4" /> Editar
                          </DropdownMenuItem>
                          {path.status !== "active" && (
                            <DropdownMenuItem onClick={() => handleStatusChange(path.id, "active")}>
                              <CheckCircle className="mr-2 h-4 w-4" /> Marcar como ativa
                            </DropdownMenuItem>
                          )}
                          {path.status !== "draft" && (
                            <DropdownMenuItem onClick={() => handleStatusChange(path.id, "draft")}>
                              <Edit className="mr-2 h-4 w-4" /> Marcar como rascunho
                            </DropdownMenuItem>
                          )}
                          {path.status !== "archived" && (
                            <DropdownMenuItem onClick={() => handleStatusChange(path.id, "archived")}>
                              <Book className="mr-2 h-4 w-4" /> Arquivar
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem 
                            onClick={() => handleDelete(path.id)}
                            className="text-red-600"
                          >
                            <Trash className="mr-2 h-4 w-4" /> Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Módulos</p>
                        <p className="font-medium">{path.modules}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Duração</p>
                        <p className="font-medium">{path.totalDuration}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Colaboradores</p>
                        <p className="font-medium flex items-center">
                          <Users size={14} className="mr-1" />
                          {path.assignedUsers}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Pontuação Média</p>
                        <p className="font-medium">
                          {path.avgScore > 0 ? `${path.avgScore}%` : 'N/A'}
                        </p>
                      </div>
                    </div>

                    {path.status === "active" && (
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Taxa de conclusão</span>
                          <span>{path.completionRate}%</span>
                        </div>
                        <Progress value={path.completionRate} className="h-2" />
                      </div>
                    )}

                    <div className="text-xs text-gray-500 flex items-center">
                      <Clock size={12} className="mr-1" />
                      <span>
                        Atualizado em {new Date(path.updatedAt).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    onClick={() => handleOpenModules(path.id)}
                    variant={viewingModules === path.id ? "secondary" : "default"}
                  >
                    {viewingModules === path.id ? "Fechar Módulos" : "Gerenciar Módulos"}
                  </Button>
                </CardFooter>
                {viewingModules === path.id && (
                  <div className="px-6 pb-6">
                    <div className="border rounded-md p-4 space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Módulos da Trilha</h3>
                        <Button size="sm" variant="outline" onClick={() => handleAddModule(path.id)}>
                          <Plus className="mr-1 h-4 w-4" /> Adicionar Módulo
                        </Button>
                      </div>
                      
                      {(!mockModules[path.id as keyof typeof mockModules] || mockModules[path.id as keyof typeof mockModules].length === 0) ? (
                        <div className="text-center py-8 text-gray-500">
                          <p>Esta trilha ainda não possui módulos.</p>
                          <p className="text-sm mt-1">Clique em "Adicionar Módulo" para começar.</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {(mockModules[path.id as keyof typeof mockModules] || []).map((module, index) => (
                            <div 
                              key={module.id} 
                              className="flex justify-between items-center p-3 border rounded-md bg-background hover:bg-accent"
                            >
                              <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                                  {index + 1}
                                </div>
                                <div>
                                  <p className="font-medium">{module.title}</p>
                                  <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <span>{translateModuleType(module.type)}</span>
                                    <span>•</span>
                                    <span>{module.duration}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                <Button variant="ghost" size="sm" onClick={() => handleEditModule(path.id, module.id)}>
                                  <Edit size={16} />
                                </Button>
                                <Button variant="ghost" size="sm" className="text-red-500" onClick={() => handleDeleteModule(path.id, module.id)}>
                                  <Trash size={16} />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </CompanyLayout>
  );
};

export default CompanyTrainingPaths;
