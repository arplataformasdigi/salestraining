
import React, { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
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

// Mock data for collaborators
const mockCollaborators = [
  {
    id: "user-1",
    name: "John Smith",
    email: "john.smith@example.com",
    company: "Sales Pro Inc.",
    role: "collaborator",
    phone: "+1 (555) 123-4567",
    status: "active",
    joinedDate: "2023-01-15",
  },
  {
    id: "user-2",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    company: "Sales Pro Inc.",
    role: "collaborator",
    phone: "+1 (555) 987-6543",
    status: "active",
    joinedDate: "2023-02-03",
  },
  {
    id: "user-3",
    name: "Michael Wong",
    email: "m.wong@example.com",
    company: "Sales Pro Inc.",
    role: "manager",
    phone: "+1 (555) 246-8102",
    status: "active",
    joinedDate: "2023-01-10",
  },
  {
    id: "user-4",
    name: "Emily Davis",
    email: "emily.d@example.com",
    company: "Sales Pro Inc.",
    role: "collaborator",
    phone: "+1 (555) 369-8520",
    status: "inactive",
    joinedDate: "2023-03-22",
  },
  {
    id: "user-5",
    name: "Robert Chen",
    email: "r.chen@example.com",
    company: "Sales Pro Inc.",
    role: "collaborator",
    phone: "+1 (555) 741-9632",
    status: "pending",
    joinedDate: "2023-04-15",
  },
];

interface CollaboratorFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  role: "admin" | "manager" | "collaborator";
}

const Collaborators: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [collaborators, setCollaborators] = useState(mockCollaborators);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState<CollaboratorFormData>({
    name: "",
    email: "",
    company: "Sales Pro Inc.",
    phone: "",
    role: "collaborator",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  if (user?.role !== "admin" && user?.role !== "manager") {
    return <Navigate to="/dashboard" />;
  }

  const filteredCollaborators = collaborators.filter((collab) =>
    collab.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    collab.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      // Update existing collaborator
      setCollaborators(
        collaborators.map((collab) =>
          collab.id === editingId
            ? {
                ...collab,
                ...formData,
              }
            : collab
        )
      );
      toast({
        title: "Collaborator updated",
        description: `${formData.name}'s information has been updated.`,
      });
    } else {
      // Add new collaborator
      const newCollaborator = {
        id: `user-${Date.now()}`,
        ...formData,
        status: "pending",
        joinedDate: new Date().toISOString().split("T")[0],
      };
      setCollaborators([...collaborators, newCollaborator]);
      toast({
        title: "Invitation sent",
        description: `Invitation email has been sent to ${formData.email}.`,
      });
    }

    // Reset form and close dialog
    setFormData({
      name: "",
      email: "",
      company: "Sales Pro Inc.",
      phone: "",
      role: "collaborator",
    });
    setEditingId(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (id: string) => {
    const collaborator = collaborators.find((c) => c.id === id);
    if (collaborator) {
      setFormData({
        name: collaborator.name,
        email: collaborator.email,
        company: collaborator.company,
        phone: collaborator.phone,
        role: collaborator.role as "admin" | "manager" | "collaborator",
      });
      setEditingId(id);
      setIsDialogOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    const collaborator = collaborators.find((c) => c.id === id);
    setCollaborators(collaborators.filter((c) => c.id !== id));
    toast({
      title: "Collaborator removed",
      description: `${collaborator?.name} has been removed from the system.`,
    });
  };

  const handleInvite = (id: string) => {
    const collaborator = collaborators.find((c) => c.id === id);
    toast({
      title: "Invitation resent",
      description: `A new invitation has been sent to ${collaborator?.email}.`,
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Collaborators</h1>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditingId(null);
                setFormData({
                  name: "",
                  email: "",
                  company: "Sales Pro Inc.",
                  phone: "",
                  role: "collaborator",
                });
              }}>
                <Plus className="mr-2 h-4 w-4" /> Add Collaborator
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingId ? "Edit Collaborator" : "Add New Collaborator"}
                </DialogTitle>
                <DialogDescription>
                  {editingId
                    ? "Edit the collaborator's information below."
                    : "Add details to invite a new collaborator to the platform."}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Smith"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john.smith@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <select
                    id="role"
                    name="role"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="collaborator">Collaborator</option>
                    <option value="manager">Manager</option>
                    {user?.role === "admin" && <option value="admin">Admin</option>}
                  </select>
                </div>
                <DialogFooter>
                  <Button type="submit">
                    {editingId ? "Update" : "Send Invitation"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Manage Collaborators</CardTitle>
            <CardDescription>
              Manage team members and their access to the platform.
            </CardDescription>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input
                placeholder="Search by name or email..."
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
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCollaborators.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        No collaborators found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredCollaborators.map((collaborator) => (
                      <TableRow key={collaborator.id}>
                        <TableCell className="font-medium">{collaborator.name}</TableCell>
                        <TableCell>{collaborator.email}</TableCell>
                        <TableCell className="capitalize">{collaborator.role}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor(
                              collaborator.status
                            )}`}
                          >
                            {collaborator.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          {new Date(collaborator.joinedDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {collaborator.status === "pending" && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleInvite(collaborator.id)}
                                title="Resend Invitation"
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
    </DashboardLayout>
  );
};

export default Collaborators;
