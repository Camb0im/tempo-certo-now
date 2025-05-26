
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Settings, 
  Heart, 
  Bell, 
  Shield, 
  Edit,
  Camera,
  ChevronRight,
  Star,
  MapPin
} from 'lucide-react';

const UserProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [notifications, setNotifications] = useState({
    push: true,
    email: false,
    sms: true
  });

  // Mock user data
  const userData = {
    name: "Maria Silva",
    email: "maria.silva@email.com",
    phone: "(11) 99999-9999",
    avatar: "/placeholder.svg",
    joinDate: "Janeiro 2024",
    totalBookings: 23,
    favorites: 5
  };

  const favoriteEstablishments = [
    {
      id: 1,
      name: "Barbearia do João",
      category: "Barbearia",
      rating: 4.8,
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Restaurante Sabor & Arte",
      category: "Restaurante",
      rating: 4.9,
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Pet Shop Amor Animal",
      category: "Pet Shop",
      rating: 4.7,
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-brand-ice">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-primary to-brand-secondary p-6 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <User className="h-10 w-10" />
              </div>
              <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-brand-secondary rounded-full flex items-center justify-center">
                <Camera className="h-3 w-3 text-brand-primary" />
              </button>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{userData.name}</h1>
              <p className="text-white/80">Membro desde {userData.joinDate}</p>
              <div className="flex items-center space-x-4 mt-2">
                <Badge variant="secondary" className="bg-white/20 text-white">
                  {userData.totalBookings} agendamentos
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white">
                  {userData.favorites} favoritos
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6 -mt-4">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-minimal">
            <TabsTrigger value="profile" className="data-[state=active]:bg-brand-secondary data-[state=active]:text-brand-primary">
              <User className="h-4 w-4 mr-2" />
              Perfil
            </TabsTrigger>
            <TabsTrigger value="favorites" className="data-[state=active]:bg-brand-secondary data-[state=active]:text-brand-primary">
              <Heart className="h-4 w-4 mr-2" />
              Favoritos
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-brand-secondary data-[state=active]:text-brand-primary">
              <Settings className="h-4 w-4 mr-2" />
              Configurações
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="brand-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="brand-text-hierarchy-2">Informações Pessoais</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  {isEditing ? 'Cancelar' : 'Editar'}
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="brand-text-hierarchy-3">Nome Completo</Label>
                    {isEditing ? (
                      <Input 
                        defaultValue={userData.name}
                        className="brand-input"
                      />
                    ) : (
                      <p className="brand-text-body">{userData.name}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="brand-text-hierarchy-3">E-mail</Label>
                    {isEditing ? (
                      <Input 
                        defaultValue={userData.email}
                        className="brand-input"
                      />
                    ) : (
                      <p className="brand-text-body">{userData.email}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="brand-text-hierarchy-3">Telefone</Label>
                    {isEditing ? (
                      <Input 
                        defaultValue={userData.phone}
                        className="brand-input"
                      />
                    ) : (
                      <p className="brand-text-body">{userData.phone}</p>
                    )}
                  </div>
                </div>
                
                {isEditing && (
                  <div className="flex justify-end space-x-3 pt-4">
                    <Button 
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      className="border-brand-gray-soft text-brand-gray-medium"
                    >
                      Cancelar
                    </Button>
                    <Button 
                      className="brand-button-primary"
                      onClick={() => setIsEditing(false)}
                    >
                      Salvar Alterações
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites">
            <Card className="brand-card">
              <CardHeader>
                <CardTitle className="brand-text-hierarchy-2">Estabelecimentos Favoritos</CardTitle>
              </CardHeader>
              <CardContent>
                {favoriteEstablishments.length > 0 ? (
                  <div className="space-y-4">
                    {favoriteEstablishments.map((establishment) => (
                      <div key={establishment.id} className="flex items-center space-x-4 p-4 rounded-lg border border-brand-gray-soft hover:border-brand-secondary transition-colors">
                        <div className="w-16 h-16 bg-brand-gray-soft rounded-lg flex items-center justify-center">
                          <MapPin className="h-8 w-8 text-brand-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="brand-text-hierarchy-3">{establishment.name}</h3>
                          <p className="brand-text-caption">{establishment.category}</p>
                          <div className="flex items-center mt-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="brand-text-caption ml-1">{establishment.rating}</span>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-brand-gray-soft" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Heart className="h-12 w-12 text-brand-gray-soft mx-auto mb-4" />
                    <h3 className="brand-text-hierarchy-3 mb-2">Nenhum favorito ainda</h3>
                    <p className="brand-text-body mb-4">Favorite estabelecimentos para encontrá-los rapidamente aqui.</p>
                    <Button className="brand-button-secondary">
                      Explorar Estabelecimentos
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="space-y-6">
              {/* Notifications */}
              <Card className="brand-card">
                <CardHeader>
                  <CardTitle className="brand-text-hierarchy-2 flex items-center">
                    <Bell className="h-5 w-5 mr-2" />
                    Notificações
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="brand-text-hierarchy-3">Notificações Push</Label>
                      <p className="brand-text-caption">Receba lembretes sobre seus agendamentos</p>
                    </div>
                    <Switch 
                      checked={notifications.push}
                      onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="brand-text-hierarchy-3">E-mail</Label>
                      <p className="brand-text-caption">Receba confirmações por e-mail</p>
                    </div>
                    <Switch 
                      checked={notifications.email}
                      onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="brand-text-hierarchy-3">SMS</Label>
                      <p className="brand-text-caption">Receba lembretes por SMS</p>
                    </div>
                    <Switch 
                      checked={notifications.sms}
                      onCheckedChange={(checked) => setNotifications({...notifications, sms: checked})}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Privacy & Security */}
              <Card className="brand-card">
                <CardHeader>
                  <CardTitle className="brand-text-hierarchy-2 flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Privacidade e Segurança
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    variant="outline" 
                    className="w-full justify-between border-brand-gray-soft"
                  >
                    Alterar Senha
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-between border-brand-gray-soft"
                  >
                    Política de Privacidade
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-between border-brand-gray-soft"
                  >
                    Termos de Uso
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfilePage;
