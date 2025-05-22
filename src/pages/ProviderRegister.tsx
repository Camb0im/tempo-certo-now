
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const providerSchema = z.object({
  businessName: z.string().min(2, "Nome do negócio deve ter pelo menos 2 caracteres"),
  category: z.string().min(1, "Selecione uma categoria"),
  description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres"),
  address: z.string().min(5, "Endereço deve ter pelo menos 5 caracteres"),
  city: z.string().min(2, "Cidade deve ter pelo menos 2 caracteres"),
  state: z.string().min(2, "Estado deve ter pelo menos 2 caracteres"),
  postalCode: z.string().min(8, "CEP deve ter pelo menos 8 caracteres"),
});

type ProviderFormValues = z.infer<typeof providerSchema>;

const categories = [
  { id: "beauty", name: "Beleza e Estética" },
  { id: "health", name: "Saúde" },
  { id: "legal", name: "Serviços Jurídicos" },
  { id: "education", name: "Educação" },
  { id: "auto", name: "Automotivo" },
  { id: "home", name: "Serviços Domésticos" },
  { id: "professional", name: "Serviços Profissionais" },
  { id: "food", name: "Alimentação" },
  { id: "other", name: "Outros" },
];

const ProviderRegister = () => {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm<ProviderFormValues>({
    resolver: zodResolver(providerSchema),
    defaultValues: {
      businessName: "",
      category: "",
      description: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
    },
  });

  const onSubmit = async (data: ProviderFormValues) => {
    if (!user) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para se cadastrar como prestador.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      
      // Insere os dados do prestador de serviço
      const { data: providerData, error } = await supabase
        .from('service_providers')
        .insert({
          user_id: user.id,
          business_name: data.businessName,
          category: data.category,
          description: data.description,
          address: data.address,
          city: data.city,
          state: data.state,
          postal_code: data.postalCode,
        })
        .select()
        .single();
      
      if (error) throw error;
      
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Seu negócio foi cadastrado na plataforma.",
      });
      
      navigate("/provider/dashboard");
    } catch (error: any) {
      toast({
        title: "Erro no cadastro",
        description: error.message || "Ocorreu um erro ao cadastrar seu negócio.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Cadastre seu Negócio
            </h2>
            <p className="mt-2 text-lg text-gray-600">
              Junte-se à plataforma TempoCerto e gerencie seus agendamentos de forma eficiente
            </p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Negócio</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Salão Beleza Perfeita" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Descreva seu negócio e os serviços oferecidos" 
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Endereço</FormLabel>
                      <FormControl>
                        <Input placeholder="Rua, número, complemento" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cidade</FormLabel>
                      <FormControl>
                        <Input placeholder="Sua cidade" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado</FormLabel>
                      <FormControl>
                        <Input placeholder="Seu estado" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CEP</FormLabel>
                      <FormControl>
                        <Input placeholder="00000-000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full bg-tc-blue hover:bg-tc-blue-dark"
                  disabled={loading || authLoading}
                >
                  {loading ? "Cadastrando..." : "Cadastrar Negócio"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProviderRegister;
