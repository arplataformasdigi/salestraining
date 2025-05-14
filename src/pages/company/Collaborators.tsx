
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
import { Label } from "@/components/ui/label";
import { Plus, Search, Edit, Trash, Mail } from "lucide-react";

// Dados simulados para colaboradores
const mockCollaborators = [
  {
    id: "user-1",
    name: "João Silva",
    email: "joao.silva@exemplo.com",
    company: "Sales Pro Inc.",
    role: "collaborator",
    phone: "+55 (11) 98765-4321",
    status: "active",
    joinedDate: "2023-01-15",
    trainingPaths: ["Fundamentos de Vendas", "Negociação e Fechamento"]
  },
  {
    id: "user-2",
    name: "Maria Souza",
    email: "maria.s@exemplo.com",
    company: "Sales Pro Inc.",
    role: "collaborator",
    phone: "+55 (11) 91234-5678",
    status: "active",
    joinedDate: "2023-02-03",
    trainingPaths: ["Fundamentos de Vendas"]
  },
  {
    id: "user-3",
    name: "Carlos Oliveira",
    email: "c.oliveira@exemplo.com",
    company: "Sales Pro Inc.",
    role: "admin",
    phone: "+55 (11) 92468-1357",
    status: "active",
    joinedDate: "2023-01-10",
    trainingPaths: ["Técnicas Avançadas de Objeções", "Vendas Consultivas B2B"]
  },
  {
    id: "user-4",
    name: "Ana Ferreira",
    email: "ana.f@exemplo.com",
    company: "Sales Pro Inc.",
    role: "collaborator",
    phone: "+55 (11) 93698-5214",
    status: "inactive",
    joinedDate: "2023-03-22",
    trainingPaths: []
  },
  {
    id: "user-5",
    name: "Roberto Santos",
    email: "r.santos@exemplo.com",
    company: "Sales Pro Inc.",
    role: "collaborator",
    phone: "+55 (11) 97531-4628",
    status: "pending",
    joinedDate: "2023-04-15",
    trainingPaths: ["Negociação e Fechamento"]
  },
];

interface CollaboratorFormData {
  name: string;
  email: string;
  phone: string;
  role: "admin" | "collaborator";
}

const CompanyCollaborators: React.FC = () => {
  const { toast } = useToast();
  const { sendInvite } = useAuth();
  const [collaborators, setCollaborators] = useState(mockCollaborators);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState<CollaboratorFormData>({
    name: "",
    email: "",
    phone: "",
    role: "collaborator"
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const filteredCollaborators = collaborators.filter((collab) =>
    collab.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    collab.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingId) {
        // Atualizar colaborador existente
        setCollaborators(
          collaborators.map((collab) =>
            collab.id === editingId
              ? {
                  ...collab,
                  name: formData.name,
                  email: formData.email,
                  phone: formData.phone,
                  role: formData.role
                }
              : collab
          )
        );
        toast({
          title: "Colaborador atualizado",
          description: `As informações de ${formData.name} foram atualizadas.`,
        });
      } else {
        // Adicionar novo colaborador através de convite
        await sendInvite(formData.email, formData.role, []);
        
        // Adicionar à lista simulada
        const newCollaborator = {
          id: `user-${Date.now()}`,
          name: formData.name,
          email: formData.email,
          company: "Sales Pro Inc.",
          role: formData.role,
          phone: formData.phone,
          status: "pending",
          joinedDate: new Date().toISOString().split("T")[0],
          trainingPaths: []
        };
        
        setCollaborators([...collaborators, newCollaborator]);
        
        toast({
          title: "Convite enviado",
          description: `Um email de convite foi enviado para ${formData.email}.`,
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
      name: "",
      email: "",
      phone: "",
      role: "collaborator"
    });
    setEditingId(null);
  };

  const handleEdit = (id: string) => {
    const collaborator = collaborators.find((c) => c.id === id);
    if (collaborator) {
      setFormData({
        name: collaborator.name,
        email: collaborator.email,
        phone: collaborator.phone || "",
        role: collaborator.role as "admin" | "collaborator"
      });
      setEditingId(id);
      setIsDialogOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    const collaborator = collaborators.find((c) => c.id === id);
    setCollaborators(collaborators.filter((c) => c.id !== id));
    toast({
      title: "Colaborador removido",
      description: `${collaborator?.name} foi removido do sistema.`,
    });
  };

  const handleInvite = (id: string) => {
    const collaborator = collaborators.find((c) => c.id === id);
    toast({
      title: "Convite reenviado",
      description: `Um novo convite foi enviado para ${collaborator?.email}.`,
    });
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const translateStatus = (status: string) => {
    switch (status) {
      case "active":
        return "ativo";
      case "inactive":
        return "inativo";
      case "pending":
        return "pendente";
      default:
        return status;
    }
  };

  return (
    <CompanyLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Gerenciar Colaboradores</h1>

          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Adicionar Colaborador
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? "Editar Colaborador" : "Adicionar Novo Colaborador"}
                </DialogTitle>
                <DialogDescription>
                  {editingId
                    ? "Edite as informações do colaborador abaixo."
                    : "Adicione detalhes para convidar um novo colaborador para a plataforma."}
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
                  <Label htmlFor="phone">Número de Telefone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+55 (11) 98765-4321"
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

                <DialogFooter>
                  <Button type="submit">
                    {editingId ? "Atualizar" : "Enviar Convite"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Colaboradores</CardTitle>
            <CardDescription>
              Gerencie membros da equipe e seus acessos à plataforma.
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
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Função</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCollaborators.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        Nenhum colaborador encontrado
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredCollaborators.map((collaborator) => (
                      <TableRow key={collaborator.id}>
                        <TableCell className="font-medium">{collaborator.name}</TableCell>
                        <TableCell>{collaborator.email}</TableCell>
                        <TableCell className="capitalize">
                          {collaborator.role === "collaborator" ? "Colaborador" : 
                           collaborator.role === "admin" ? "Administrador" : 
                           collaborator.role === "manager" ? "Gerente" : "Empresa"}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor(
                              collaborator.status
                            )}`}
                          >
                            {translateStatus(collaborator.status)}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {collaborator.status === "pending" && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleInvite(collaborator.id)}
                                title="Reenviar Convite"
                              >
                                <Mail size={16} />
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(collaborator.id)}
                            >
                              <Edit size={16} />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(collaborator.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash size={16} />
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
        </Card>
      </div>
    </CompanyLayout>
  );
};

export default CompanyCollaborators;
