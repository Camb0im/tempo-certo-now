
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Mail, Phone, Send } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ContactSalesModalProps {
  children: React.ReactNode;
}

const ContactSalesModal = ({ children }: ContactSalesModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simular envio de email
    const emailData = {
      to: 'lucaslevicamboim002@gmail.com',
      subject: `Novo contato de vendas - ${formData.company || formData.name}`,
      body: `
Nome: ${formData.name}
Email: ${formData.email}
Telefone: ${formData.phone}
Empresa: ${formData.company}

Mensagem:
${formData.message}
      `
    };

    console.log('Enviando email para:', emailData);

    toast({
      title: "Mensagem Enviada!",
      description: "Nossa equipe de vendas entrará em contato em breve.",
    });

    setIsOpen(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      message: ''
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-brand-primary text-xl">
            Fale com Nosso Time de Vendas
          </DialogTitle>
          <DialogDescription className="text-brand-gray-medium">
            Conte-nos sobre seu negócio e como podemos ajudar você a crescer.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-brand-primary">Nome *</Label>
              <Input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="border-brand-gray-soft focus:border-brand-secondary"
                placeholder="Seu nome completo"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-brand-primary">Email *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="border-brand-gray-soft focus:border-brand-secondary"
                placeholder="seu@email.com"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone" className="text-brand-primary">Telefone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="border-brand-gray-soft focus:border-brand-secondary"
                placeholder="(11) 99999-9999"
              />
            </div>
            <div>
              <Label htmlFor="company" className="text-brand-primary">Empresa</Label>
              <Input
                id="company"
                type="text"
                value={formData.company}
                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                className="border-brand-gray-soft focus:border-brand-secondary"
                placeholder="Nome da sua empresa"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="message" className="text-brand-primary">Mensagem *</Label>
            <Textarea
              id="message"
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              className="border-brand-gray-soft focus:border-brand-secondary resize-none"
              placeholder="Conte-nos sobre seu negócio e como podemos ajudar..."
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="border-brand-gray-soft text-brand-gray-medium hover:bg-brand-gray-soft/20"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-brand-primary hover:bg-brand-secondary text-white flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              Enviar Mensagem
            </Button>
          </div>
        </form>

        <div className="border-t border-brand-gray-soft pt-4 mt-4">
          <div className="flex items-center justify-center space-x-6 text-sm text-brand-gray-medium">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>vendas@tempocerto.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>(11) 9999-9999</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactSalesModal;
