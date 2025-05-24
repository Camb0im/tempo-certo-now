
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Plus, Trash2, Shield, Calendar } from "lucide-react";

interface PaymentMethod {
  id: string;
  type: 'card' | 'pix' | 'bank';
  brand?: string;
  last4?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
  name: string;
}

interface PaymentMethodsModalProps {
  trigger: React.ReactNode;
}

const PaymentMethodsModal = ({ trigger }: PaymentMethodsModalProps) => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      type: "card",
      brand: "visa",
      last4: "4242",
      expiryMonth: 12,
      expiryYear: 2028,
      isDefault: true,
      name: "Cartão Principal"
    },
    {
      id: "2",
      type: "card",
      brand: "mastercard",
      last4: "8888",
      expiryMonth: 6,
      expiryYear: 2027,
      isDefault: false,
      name: "Cartão Secundário"
    }
  ]);

  const handleSetDefault = (id: string) => {
    setPaymentMethods(methods =>
      methods.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
  };

  const handleRemove = (id: string) => {
    setPaymentMethods(methods =>
      methods.filter(method => method.id !== id)
    );
  };

  const getCardIcon = (brand?: string) => {
    return <CreditCard className="h-5 w-5" />;
  };

  const formatExpiryDate = (month?: number, year?: number) => {
    if (!month || !year) return '';
    return `${month.toString().padStart(2, '0')}/${year.toString().slice(-2)}`;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl minimal-card shadow-modal">
        <DialogHeader className="pb-6">
          <DialogTitle className="text-hierarchy-1 flex items-center gap-3">
            <Shield className="h-6 w-6 text-tc-blue" />
            Gerenciar Formas de Pagamento
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Add New Payment Method Button */}
          <Button 
            className="w-full minimal-button bg-tc-blue hover:bg-tc-blue-dark text-white border-2 border-dashed border-tc-blue hover:border-tc-blue-dark"
            variant="outline"
          >
            <Plus className="h-5 w-5 mr-2" />
            Adicionar Nova Forma de Pagamento
          </Button>

          {/* Payment Methods List */}
          <div className="space-y-4">
            <h3 className="text-hierarchy-3">Seus Métodos de Pagamento</h3>
            
            {paymentMethods.length === 0 ? (
              <Card className="minimal-card">
                <CardContent className="py-12 text-center">
                  <CreditCard className="h-12 w-12 text-tc-gray-400 mx-auto mb-4" />
                  <p className="text-body">Nenhuma forma de pagamento cadastrada</p>
                  <p className="text-caption mt-2">Adicione um cartão ou método de pagamento para continuar</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <Card key={method.id} className="minimal-card hover:shadow-card transition-all duration-200">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-tc-gray-50 dark:bg-tc-dark-accent rounded-lg">
                            {getCardIcon(method.brand)}
                          </div>
                          
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-hierarchy-3">{method.name}</h4>
                              {method.isDefault && (
                                <Badge variant="secondary" className="bg-tc-blue/10 text-tc-blue border-tc-blue/20">
                                  Padrão
                                </Badge>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-4 text-caption">
                              <span>•••• •••• •••• {method.last4}</span>
                              {method.expiryMonth && method.expiryYear && (
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {formatExpiryDate(method.expiryMonth, method.expiryYear)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {!method.isDefault && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleSetDefault(method.id)}
                              className="minimal-button h-9 px-4"
                            >
                              Tornar Padrão
                            </Button>
                          )}
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRemove(method.id)}
                            className="minimal-button h-9 px-3 text-tc-red hover:text-tc-red-dark hover:border-tc-red/30"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Security Note */}
          <Card className="minimal-card bg-tc-gray-50 dark:bg-tc-dark-accent border-tc-gray-200 dark:border-tc-gray-700">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-tc-green mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-tc-gray-900 dark:text-tc-gray-100 mb-1">
                    Seus dados estão seguros
                  </h4>
                  <p className="text-caption">
                    Utilizamos criptografia de ponta e não armazenamos informações sensíveis do seu cartão.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentMethodsModal;
