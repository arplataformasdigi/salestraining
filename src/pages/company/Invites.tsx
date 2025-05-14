
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
  Mail, 
  Clock, 
  CheckCircle, 
  XCircle,
  RefreshCw
} from "lucide-react";

// Dados simulados para trilhas
const mockTrainingPaths = [
  { id: 1, title: "Fundamentos de Vendas" },
  { id: 2, title: "Técnicas Avançadas de Objeções" },
  { id: 3, title: "Vendas Consultivas B2B" },
  { id: 4, title: "Negociação e Fechamento" }
];

// Dados simulados para convites
const mockInvites = [
  {
    id: 1,
    email: "roberto.alves@exemplo.com",
    name: "Roberto Alves",
    role: "collaborator",
    status: "pending",
    sentDate: "2023-05-10T10:30:00",
    trainingPaths: ["Fundamentos de Vendas", "Negociação e Fechamento"]
  },
  {
    id: 2,
    email: "julia.santos@exemplo.com",
    name: "Julia Santos",
    role: "admin",
    status: "accepted",
    sentDate: "2023-05-08T15:45:00",
    acceptedDate: "2023-05-09T09:20:00",
    trainingPaths: ["Vendas Consultivas B2B"]
  },
  {
    id: 3,
    email: "pedro.costa@exemplo.com",
    name: "Pedro Costa",
    role: "collaborator",
    status: "expired",
    sentDate: "2023-04-25T14:30:00",
    trainingPaths: ["Técnicas Avançadas de Objeções"]
  },
  {
    id: 4,
    email: "carla.oliveira@exemplo.com",
    name: "Carla Oliveira",
    role: "collaborator",
    status: "declined",
    sentDate: "2023-05-05T11:15:00",
    declinedDate: "2023-05-06T10:30:00",
    trainingPaths: ["Fundamentos de Vendas"]
  }
];

interface InviteFormData {
  email: string;
  name: string;
  role: "admin" | "collaborator";
  trainingPaths: number[];
  questionCount: number;
}

const CompanyInvites: React.FC = () => {
  const { toast } = useToast();
  const { sendInvite } = useAuth();
  const [invites, setInvites] = useState(mockInvites);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTrainingPaths, setSelectedTrainingPaths] = useState<number[]>([]);
  const [formData, setFormData] = useState<InviteFormData>({
    email: "",
    name: "",
    role: "collaborator",
    trainingPaths: [],
    questionCount: 10
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredInvites = invites.filter((invite) =>
    invite.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invite.name.toLowerCase().includes(searchTerm.toLowerCase())
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
      const selectedPathTitles = formData.trainingPaths.map(id => 
        mockTrainingPaths.find(path => path.id === id)?.title || "");
      
      await sendInvite(formData.email, formData.role, selectedPathTitles);
      
      // Adicionar à lista simulada
      const newInvite = {
        id: Date.now(),
        email: formData.email,
        name: formData.name,
        role: formData.role,
        status: "pending",
        sentDate: new Date().toISOString(),
        trainingPaths: selectedPathTitles
      };
      
      setInvites([newInvite, ...invites]);
      
      toast({
        title: "Convite enviado",
        description: `Um email de convite foi enviado para ${formData.email}.`,
      });

      // Resetar formulário e fechar diálogo
      resetForm();
      setIsDialogOpen(false);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao enviar o convite.",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setFormData({
      email: "",
      name: "",
      role: "collaborator",
      trainingPaths: [],
      questionCount: 10
    });
    setSelectedTrainingPaths([]);
  };

  const handleResendInvite = (id: number) => {
    const invite = invites.find(i => i.id === id);
    if (invite) {
      setInvites(invites.map(i => 
        i.id === id 
          ? { ...i, status: "pending", sentDate: new Date().toISOString() }
          : i
      ));
      
      toast({
        title: "Convite reenviado",
        description: `Um novo convite foi enviado para ${invite.email}.`,
      });
    }
  };

  const handleDeleteInvite = (id: number) => {
    const invite = invites.find(i => i.id === id);
    setInvites(invites.filter(i => i.id !== id));
    toast({
      title: "Convite removido",
      description: `O convite para ${invite?.email} foi removido.`,
    });
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "declined":
        return "bg-red-100 text-red-800";
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
      case "declined":
        return "recusado";
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
          <h1 className="text-2xl font-bold">Gerenciar Convites</h1>

          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Novo Convite
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Enviar Novo Convite</DialogTitle>
                <DialogDescription>
                  Preencha os detalhes para convidar um novo usuário para a plataforma.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="João Silva"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Endereço de Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="joao.silva@exemplo.com"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="role">Função</Label>
                  <select
                    id="role"
                    name="role"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="collaborator">Colaborador</option>
                    <option value="admin">Administrador</option>
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
                    Enviar Convite
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Histórico de Convites</CardTitle>
            <CardDescription>
              Gerencie e monitore os convites enviados aos usuários.
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
                    <TableHead>Nome / Email</TableHead>
                    <TableHead>Função</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data de Envio</TableHead>
                    <TableHead>Trilhas</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvites.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        Nenhum convite encontrado
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredInvites.map((invite) => (
                      <TableRow key={invite.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{invite.name}</div>
                            <div className="text-sm text-gray-500">{invite.email}</div>
                          </div>
                        </TableCell>
                        <TableCell className="capitalize">
                          {invite.role === "collaborator" ? "Colaborador" : "Administrador"}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor(
                              invite.status
                            )}`}
                          >
                            {translateStatus(invite.status)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Clock size={14} className="mr-1 text-gray-400" />
                            <span className="text-sm">
                              {new Date(invite.sentDate).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                          {invite.status === "accepted" && invite.acceptedDate && (
                            <div className="text-xs text-green-600 flex items-center mt-1">
                              <CheckCircle size={12} className="mr-1" />
                              Aceito em {new Date(invite.acceptedDate).toLocaleDateString('pt-BR')}
                            </div>
                          )}
                          {invite.status === "declined" && invite.declinedDate && (
                            <div className="text-xs text-red-600 flex items-center mt-1">
                              <XCircle size={12} className="mr-1" />
                              Recusado em {new Date(invite.declinedDate).toLocaleDateString('pt-BR')}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          {invite.trainingPaths.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {invite.trainingPaths.map((path, index) => (
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
                            {(invite.status === "pending" || invite.status === "expired") && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleResendInvite(invite.id)}
                                title="Reenviar Convite"
                              >
                                <RefreshCw size={16} />
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteInvite(invite.id)}
                              className="text-red-500 hover:text-red-700"
                              title="Remover Convite"
                            >
                              <XCircle size={16} />
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
            <p className="text-sm text-gray-500">
              Os convites expiram após 7 dias se não forem aceitos.
            </p>
          </CardFooter>
        </Card>
      </div>
    </CompanyLayout>
  );
};

export default CompanyInvites;
