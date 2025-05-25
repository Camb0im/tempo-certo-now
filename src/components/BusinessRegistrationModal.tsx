
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Building, Phone, Mail, MapPin, Clock, CreditCard } from "lucide-react";

interface BusinessRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
}

const BusinessRegistrationModal = ({ isOpen, onClose, planName }: BusinessRegistrationModalProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    category: "",
    description: "",
    paymentMethod: ""
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    toast({
      title: "Cadastro realizado com sucesso!",
      description: `Bem-vindo ao plano ${planName}! Você receberá um e-mail de confirmação em breve.`,
    });
    onClose();
    setStep(1);
    setFormData({
      businessName: "",
      ownerName: "",
      email: "",
      phone: "",
      address: "",
      category: "",
      description: "",
      paymentMethod: ""
    });
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building className="h-5 w-5 text-tc-blue" />
            Cadastro do Negócio - {planName}
          </DialogTitle>
          <DialogDescription>
            Etapa {step} de 3 - {step === 1 ? "Informações básicas" : step === 2 ? "Detalhes do negócio" : "Pagamento"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {step === 1 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="businessName">Nome do Negócio</Label>
                <Input
                  id="businessName"
                  placeholder="Ex: Barbearia Central"
                  value={formData.businessName}
                  onChange={(e) => updateFormData("businessName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ownerName">Nome do Responsável</Label>
                <Input
                  id="ownerName"
                  placeholder="Seu nome completo"
                  value={formData.ownerName}
                  onChange={(e) => updateFormData("ownerName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  placeholder="(11) 99999-9999"
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Input
                  id="address"
                  placeholder="Rua, número, bairro, cidade"
                  value={formData.address}
                  onChange={(e) => updateFormData("address", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Categoria do Negócio</Label>
                <Select value={formData.category} onValueChange={(value) => updateFormData("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="barbearia">Barbearia</SelectItem>
                    <SelectItem value="salao">Salão de Beleza</SelectItem>
                    <SelectItem value="clinica">Clínica</SelectItem>
                    <SelectItem value="restaurante">Restaurante</SelectItem>
                    <SelectItem value="oficina">Oficina</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição do Negócio</Label>
                <Textarea
                  id="description"
                  placeholder="Descreva seu negócio e serviços oferecidos"
                  value={formData.description}
                  onChange={(e) => updateFormData("description", e.target.value)}
                />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <h3 className="font-semibold text-tc-blue mb-2">Resumo do Plano {planName}</h3>
                <p className="text-sm text-gray-600">
                  {planName === "Iniciante" && "R$ 29,90/mês - Até 50 agendamentos"}
                  {planName === "Profissional" && "R$ 69,90/mês - Agendamentos ilimitados"}
                  {planName === "Empresarial" && "R$ 149,90/mês - Múltiplas unidades"}
                </p>
              </div>
              <div className="space-y-2">
                <Label>Método de Pagamento</Label>
                <Select value={formData.paymentMethod} onValueChange={(value) => updateFormData("paymentMethod", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o método de pagamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="credit">Cartão de Crédito</SelectItem>
                    <SelectItem value="debit">Cartão de Débito</SelectItem>
                    <SelectItem value="pix">PIX</SelectItem>
                    <SelectItem value="boleto">Boleto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="bg-gray-50 p-3 rounded text-sm text-gray-600">
                <p>✓ Primeiro mês gratuito</p>
                <p>✓ Cancelamento a qualquer momento</p>
                <p>✓ Suporte técnico incluído</p>
              </div>
            </>
          )}
        </div>

        <div className="flex gap-2 pt-4">
          {step > 1 && (
            <Button variant="outline" onClick={() => setStep(step - 1)} className="flex-1">
              Voltar
            </Button>
          )}
          <Button onClick={handleNext} className="flex-1 bg-tc-blue hover:bg-tc-blue-dark">
            {step === 3 ? "Finalizar Cadastro" : "Próximo"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BusinessRegistrationModal;
