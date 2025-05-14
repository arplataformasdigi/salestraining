
import React, { useState } from "react";
import CompanyLayout from "@/components/layouts/CompanyLayout";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  Plus, 
  Search, 
  Edit,
  Clock
} from "lucide-react";

// Dados simulados para trilhas
const mockTrainingPaths = [
  { id: 1, title: "Fundamentos de Vendas" },
  { id: 2, title: "Técnicas Avançadas de Objeções" },
  { id: 3, title: "Vendas Consultivas B2B" },
  { id: 4, title: "Negociação e Fechamento" }
];

// Dados simulados para convites/treinamentos
const mockTrainings = [
  {
    id: 1,
    email: "roberto.alves@exemplo.com",
    name: "Roberto Alves",
    role: "collaborator",
    status: "pending",
    sentDate: "2023-05-10T10:30:00",
    trainingPaths: ["Fundamentos de Vendas", "Negociação e Fechamento"],
    questionCount: 10
  },
  {
    id: 2,
    email: "julia.santos@exemplo.com",
    name: "Julia Santos",
    role: "admin",
    status: "accepted",
    sentDate: "2023-05-08T15:45:00",
    acceptedDate: "2023-05-09T09:20:00",
    trainingPaths: ["Vendas Consultivas B2B"],
    questionCount: 15
  },
  {
    id: 3,
    email: "pedro.costa@exemplo.com",
    name: "Pedro Costa",
    role: "collaborator",
    status: "expired",
    sentDate: "2023-04-25T14:30:00",
    trainingPaths: ["Técnicas Avançadas de Objeções"],
    questionCount: 8
  },
  {
    id: 4,
    email: "carla.oliveira@exemplo.com",
    name: "Carla Oliveira",
    role: "collaborator",
    status: "completed",
    sentDate: "2023-05-05T11:15:00",
    declinedDate: "2023-05-06T10:30:00",
    trainingPaths: ["Fundamentos de Vendas"],
    questionCount: 12
  }
];

// Dados simulados para colaboradores disponíveis
const mockCollaborators = [
  { id: 1, name: "Roberto Alves", email: "roberto.alves@exemplo.com", role: "collaborator" },
  { id: 2, name: "Julia Santos", email: "julia.santos@exemplo.com", role: "admin" },
  { id: 3, name: "Pedro Costa", email: "pedro.costa@exemplo.com", role: "collaborator" },
  { id: 4, name: "Carla Oliveira", email: "carla.oliveira@exemplo.com", role: "collaborator" },
  { id: 5, name: "Miguel Pereira", email: "miguel.p@exemplo.com", role: "collaborator" },
];

interface TrainingFormData {
  collaboratorId: number;
  trainingPaths: number[];
  questionCount: number;
}

const CompanyTrainings: React.FC = () => {
  const { toast } = useToast();
  const { sendInvite } = useAuth();
  const [trainings, setTrainings] = useState(mockTrainings);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTrainingPaths, setSelectedTrainingPaths] = useState<number[]>([]);
  const [formData, setFormData] = useState<TrainingFormData>({
    collaboratorId: 0,
    trainingPaths: [],
    questionCount: 10
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const filteredTrainings = trainings.filter((training) =>
    training.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    training.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTrainingPathToggle = (pathId: number) => {
    setSelectedTrainingPaths(prev => {
      if (prev.includes(pathId)) {
        return prev.filter(id => id !== pathId);
      } else {
        return [...prev, pathId];
      }
    });
    
    setFormData(prev => ({
      ...prev,
      trainingPaths: prev.trainingPaths.includes(pathId) 
        ? prev.trainingPaths.filter(id => id !== pathId)
        : [...prev.trainingPaths, pathId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Encontrar o colaborador selecionado
      const selectedCollaborator = mockCollaborators.find(c => c.id === formData.collaboratorId);
      
      if (!selectedCollaborator) {
        toast({
          title: "Erro",
          description: "Selecione um colaborador válido.",
          variant: "destructive"
        });
        return;
      }
      
      // Obter os nomes das trilhas selecionadas
      const selectedPathTitles = formData.trainingPaths.map(id => 
        mockTrainingPaths.find(path => path.id === id)?.title || "");
      
      if (editingId) {
        // Atualizar treinamento existente
        setTrainings(trainings.map(training => 
          training.id === editingId ? {
            ...training,
            trainingPaths: selectedPathTitles,
            questionCount: Number(formData.questionCount)
          } : training
        ));
        
        toast({
          title: "Treinamento atualizado",
          description: `O treinamento para ${selectedCollaborator.name} foi atualizado com sucesso.`,
        });
      } else {
        // Adicionar novo treinamento
        const newTraining = {
          id: Date.now(),
          email: selectedCollaborator.email,
          name: selectedCollaborator.name,
          role: selectedCollaborator.role,
          status: "pending",
          sentDate: new Date().toISOString(),
          trainingPaths: selectedPathTitles,
          questionCount: Number(formData.questionCount)
        };
        
        setTrainings([...trainings, newTraining]);
        
        toast({
          title: "Treinamento adicionado",
          description: `Um novo treinamento foi designado para ${selectedCollaborator.name}.`,
        });
      }

      // Resetar formulário e fechar diálogo
      resetForm();
      setIsDialogOpen(false);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao processar sua solicitação.",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setFormData({
      collaboratorId: 0,
      trainingPaths: [],
      questionCount: 10
    });
    setSelectedTrainingPaths([]);
    setEditingId(null);
  };

  const handleEdit = (id: number) => {
    const training = trainings.find(t => t.id === id);
    if (training) {
      // Encontrar o ID do colaborador pelo nome/email
      const collaborator = mockCollaborators.find(c => 
        c.name === training.name && c.email === training.email
      );
      
      // Mapear nomes de trilhas para IDs
      const pathIds = training.trainingPaths.map(pathName => {
        const path = mockTrainingPaths.find(p => p.title === pathName);
        return path ? path.id : -1;
      }).filter(id => id !== -1);
      
      setFormData({
        collaboratorId: collaborator?.id || 0,
        trainingPaths: pathIds,
        questionCount: training.questionCount || 10
      });
      setSelectedTrainingPaths(pathIds);
      setEditingId(id);
      setIsDialogOpen(true);
    }
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "expired":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const translateStatus = (status: string) => {
    switch (status) {
      case "pending":
        return "pendente";
      case "accepted":
        return "aceito";
      case "completed":
        return "concluído";
      case "expired":
        return "expirado";
      default:
        return status;
    }
  };

  return (
    <CompanyLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Adicionar Treinamentos</h1>

          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Adicionar
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? "Editar Treinamento" : "Adicionar Novo Treinamento"}
                </DialogTitle>
                <DialogDescription>
                  {editingId
                    ? "Edite as informações do treinamento."
                    : "Selecione um colaborador e as trilhas de treinamento."}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="collaboratorId">Colaborador</Label>
                  <select
                    id="collaboratorId"
                    name="collaboratorId"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    value={formData.collaboratorId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="0">Selecione um colaborador</option>
                    {mockCollaborators.map(collab => (
                      <option key={collab.id} value={collab.id}>
                        {collab.name} ({collab.email})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="questionCount">Quantidade de Perguntas por Simulação</Label>
                  <Input
                    id="questionCount"
                    name="questionCount"
                    type="number"
                    min={1}
                    max={50}
                    value={formData.questionCount}
                    onChange={handleInputChange}
                    placeholder="10"
                    required
                  />
                  <p className="text-sm text-gray-500">Número de perguntas geradas pela IA em cada simulação</p>
                </div>

                <div className="space-y-2">
                  <Label>Trilhas de Treinamento</Label>
                  <div className="border rounded-md p-3 space-y-2 max-h-40 overflow-y-auto">
                    {mockTrainingPaths.map(path => (
                      <div key={path.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`path-${path.id}`}
                          checked={selectedTrainingPaths.includes(path.id)}
                          onCheckedChange={() => handleTrainingPathToggle(path.id)}
                        />
                        <label 
                          htmlFor={`path-${path.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {path.title}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <DialogFooter>
                  <Button type="submit">
                    {editingId ? "Atualizar" : "Adicionar"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Treinamentos Designados</CardTitle>
            <CardDescription>
              Gerencie e monitore os treinamentos designados aos colaboradores.
            </CardDescription>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input
                placeholder="Buscar por nome ou email..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Colaborador</TableHead>
                    <TableHead>Função</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Perguntas</TableHead>
                    <TableHead>Trilhas</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTrainings.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        Nenhum treinamento encontrado
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTrainings.map((training) => (
                      <TableRow key={training.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{training.name}</div>
                            <div className="text-sm text-gray-500">{training.email}</div>
                          </div>
                        </TableCell>
                        <TableCell className="capitalize">
                          {training.role === "collaborator" ? "Colaborador" : "Administrador"}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor(
                              training.status
                            )}`}
                          >
                            {translateStatus(training.status)}
                          </span>
                        </TableCell>
                        <TableCell>
                          {training.questionCount || 10}
                        </TableCell>
                        <TableCell>
                          {training.trainingPaths.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {training.trainingPaths.map((path, index) => (
                                <span 
                                  key={index}
                                  className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-blue-50 text-blue-700"
                                >
                                  {path}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-gray-500 text-xs">Nenhuma</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(training.id)}
                            >
                              <Edit size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex items-center text-sm text-gray-500">
              <Clock size={14} className="mr-1" />
              <span>Os treinamentos expiram após 30 dias se não forem concluídos.</span>
            </div>
          </CardFooter>
        </Card>
      </div>
    </CompanyLayout>
  );
};

export default CompanyTrainings;
