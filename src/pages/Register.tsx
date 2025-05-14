import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
interface RegisterFormValues {
  userType: "collaborator" | "company";
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  companyName?: string;
}
const Register: React.FC = () => {
  const {
    register: registerUser,
    isAuthenticated,
    isLoading
  } = useAuth();
  const {
    toast
  } = useToast();
  const [isRegistering, setIsRegistering] = useState(false);
  const [userType, setUserType] = useState<"collaborator" | "company">("collaborator");
  const form = useForm<RegisterFormValues>({
    defaultValues: {
      userType: "collaborator",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      companyName: ""
    }
  });
  const onSubmit = async (data: RegisterFormValues) => {
    if (data.password !== data.confirmPassword) {
      form.setError("confirmPassword", {
        type: "manual",
        message: "As senhas não coincidem"
      });
      return;
    }
    setIsRegistering(true);
    try {
      await registerUser(data.name, data.email, data.password, data.userType, data.companyName);
      toast({
        title: "Cadastro realizado com sucesso",
        description: "Sua conta foi criada."
      });
    } catch (error) {
      toast({
        title: "Falha no cadastro",
        description: "Ocorreu um problema ao criar sua conta.",
        variant: "destructive"
      });
    } finally {
      setIsRegistering(false);
    }
  };
  if (isAuthenticated) {
    // Verificamos o tipo de usuário e redirecionamos adequadamente
    return userType === "company" ? <Navigate to="/empresa" /> : <Navigate to="/dashboard" />;
  }
  return <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary">SalesTraining</h1>
          <p className="mt-2 text-sm text-gray-600">Crie uma conta para iniciar seu treinamento de vendas</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Crie sua conta</CardTitle>
            <CardDescription>
              Digite suas informações para se cadastrar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="userType" render={({
                field
              }) => <FormItem>
                      <FormLabel>Tipo de Usuário</FormLabel>
                      <Select onValueChange={(value: "collaborator" | "company") => {
                  field.onChange(value);
                  setUserType(value);
                }} defaultValue={field.value} disabled={isLoading || isRegistering}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo de usuário" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="collaborator">Colaborador</SelectItem>
                          <SelectItem value="company">Empresa</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>} />

                <FormField control={form.control} name="name" render={({
                field
              }) => <FormItem>
                      <FormLabel>Nome Completo</FormLabel>
                      <FormControl>
                        <Input placeholder="João Silva" {...field} required disabled={isLoading || isRegistering} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />

                {userType === "company" && <FormField control={form.control} name="companyName" render={({
                field
              }) => <FormItem>
                        <FormLabel>Nome da Empresa</FormLabel>
                        <FormControl>
                          <Input placeholder="Empresa S.A." {...field} required={userType === "company"} disabled={isLoading || isRegistering} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />}

                <FormField control={form.control} name="email" render={({
                field
              }) => <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input placeholder="voce@exemplo.com" type="email" {...field} required disabled={isLoading || isRegistering} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />

                <FormField control={form.control} name="password" render={({
                field
              }) => <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input placeholder="••••••••" type="password" {...field} required minLength={8} disabled={isLoading || isRegistering} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />

                <FormField control={form.control} name="confirmPassword" render={({
                field
              }) => <FormItem>
                      <FormLabel>Confirmar Senha</FormLabel>
                      <FormControl>
                        <Input placeholder="••••••••" type="password" {...field} required disabled={isLoading || isRegistering} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />

                <Button type="submit" className="w-full" disabled={isLoading || isRegistering}>
                  {isRegistering ? <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                      Criando Conta...
                    </div> : "Cadastrar"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="text-center text-sm">
              Já tem uma conta? &nbsp;
              <Link to="/login" className="text-primary hover:underline">
                Entrar
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>;
};
export default Register;