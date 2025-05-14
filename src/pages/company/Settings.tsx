
import React, { useState } from "react";
import CompanyLayout from "@/components/layouts/CompanyLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogOut, Shield, TwoFactorAuthentication } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Dialog,
  DialogContent, 
  DialogDescription, 
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const profileSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  companyName: z.string().min(2, { message: "Nome da empresa é obrigatório" }),
  jobTitle: z.string().optional(),
  phone: z.string().optional(),
  cnpj: z.string().optional(),
  address: z.string().optional(),
});

const securitySchema = z.object({
  currentPassword: z.string().min(6, { message: "Senha atual é obrigatória" }),
  newPassword: z.string().min(6, { message: "Senha deve ter pelo menos 6 caracteres" }),
  confirmPassword: z.string().min(6, { message: "Confirme sua senha" }),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

type ProfileFormValues = z.infer<typeof profileSchema>;
type SecurityFormValues = z.infer<typeof securitySchema>;

const CompanySettings: React.FC = () => {
  const { logout, user } = useAuth();
  const { toast } = useToast();
  const [twoFactorDialogOpen, setTwoFactorDialogOpen] = useState(false);
  const [twoFactorStep, setTwoFactorStep] = useState<'qrcode' | 'verify'>('qrcode');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      companyName: user?.companyName || "",
      jobTitle: "",
      phone: "",
      cnpj: "",
      address: "",
    },
  });

  const securityForm = useForm<SecurityFormValues>({
    resolver: zodResolver(securitySchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleLogout = () => {
    logout();
    toast({
      title: "Logout realizado",
      description: "Você saiu da sua conta com sucesso.",
    });
  };

  const onProfileSubmit = (data: ProfileFormValues) => {
    console.log(data);
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram atualizadas com sucesso.",
    });
  };

  const onSecuritySubmit = (data: SecurityFormValues) => {
    console.log(data);
    toast({
      title: "Senha alterada",
      description: "Sua senha foi alterada com sucesso.",
    });
  };

  const handleOpenTwoFactor = () => {
    setTwoFactorStep('qrcode');
    setTwoFactorDialogOpen(true);
  };

  const handleVerifyTwoFactor = () => {
    if (verificationCode.length === 6) {
      // This would call an API in a real implementation
      setTwoFactorEnabled(true);
      setTwoFactorDialogOpen(false);
      toast({
        title: "Autenticação de dois fatores ativada",
        description: "Sua conta agora está protegida com autenticação de dois fatores.",
      });
    } else {
      toast({
        title: "Código inválido",
        description: "Por favor, insira um código válido de 6 dígitos.",
        variant: "destructive"
      });
    }
  };

  return (
    <CompanyLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Configurações</h1>
          <p className="text-gray-600">Gerencie suas preferências e configurações do sistema</p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList>
            <TabsTrigger value="profile">Informações Pessoais</TabsTrigger>
            <TabsTrigger value="security">Segurança</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Perfil da Empresa</CardTitle>
                <CardDescription>
                  Atualize suas informações de perfil e contato
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                    <FormField
                      control={profileForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={profileForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={profileForm.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome da Empresa</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={profileForm.control}
                      name="jobTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cargo</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={profileForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={profileForm.control}
                      name="cnpj"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CNPJ</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={profileForm.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Endereço</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit">Salvar Alterações</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Segurança da Conta</CardTitle>
                <CardDescription>
                  Atualize sua senha e configurações de segurança
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Form {...securityForm}>
                  <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)} className="space-y-4">
                    <FormField
                      control={securityForm.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Senha Atual</FormLabel>
                          <FormControl>
                            <Input {...field} type="password" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={securityForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nova Senha</FormLabel>
                          <FormControl>
                            <Input {...field} type="password" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={securityForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirmar Nova Senha</FormLabel>
                          <FormControl>
                            <Input {...field} type="password" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit">Alterar Senha</Button>
                  </form>
                </Form>

                <Separator className="my-6" />

                <div className="space-y-6">
                  <CardHeader className="px-0">
                    <CardTitle>Privacidade & Segurança</CardTitle>
                    <CardDescription>
                      Gerencie configurações de privacidade e segurança
                    </CardDescription>
                  </CardHeader>

                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-3">
                      <TwoFactorAuthentication className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <div className="font-medium">Autenticação de Dois Fatores</div>
                        <p className="text-sm text-gray-500">
                          Adicione uma camada extra de segurança à sua conta
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={handleOpenTwoFactor}
                    >
                      Configurar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Ações</CardTitle>
            <CardDescription>Ações rápidas para sua conta</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="destructive" 
              className="w-full flex items-center justify-center gap-2"
              onClick={handleLogout}
            >
              <LogOut size={16} />
              Sair da Conta
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Two-Factor Authentication Dialog */}
      <Dialog open={twoFactorDialogOpen} onOpenChange={setTwoFactorDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Autenticação de Dois Fatores</DialogTitle>
            <DialogDescription>
              {twoFactorStep === 'qrcode' 
                ? "Escaneie o QR code abaixo com seu aplicativo autenticador." 
                : "Digite o código de verificação do seu aplicativo autenticador."}
            </DialogDescription>
          </DialogHeader>
          
          {twoFactorStep === 'qrcode' ? (
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="border border-gray-300 p-4 rounded-md bg-white">
                {/* This would be a real QR code in a real application */}
                <div className="w-48 h-48 bg-gray-100 flex items-center justify-center">
                  <Shield className="w-24 h-24 text-gray-400" />
                </div>
              </div>
              <p className="text-sm text-gray-500 text-center">
                Também pode digitar esta chave secreta no seu aplicativo:
                <br />
                <span className="font-mono bg-gray-100 px-2 py-1 rounded">ABCD EFGH IJKL MNOP</span>
              </p>
              <Button onClick={() => setTwoFactorStep('verify')}>Continuar</Button>
            </div>
          ) : (
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-2 items-center">
                <p className="text-sm text-gray-500">Digite o código de 6 dígitos do seu aplicativo autenticador</p>
                <InputOTP maxLength={6} value={verificationCode} onChange={setVerificationCode}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setTwoFactorStep('qrcode')}>Voltar</Button>
                <Button onClick={handleVerifyTwoFactor}>Verificar</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </CompanyLayout>
  );
};

export default CompanySettings;
