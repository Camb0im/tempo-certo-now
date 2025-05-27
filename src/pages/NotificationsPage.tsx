
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell, 
  BellOff, 
  Clock, 
  Calendar, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  Star,
  Trash2,
  Mail
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'reminder',
      title: 'Lembrete de Agendamento',
      message: 'Seu agendamento na Barbearia do João é amanhã às 14h30',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: false,
      category: 'agendamentos'
    },
    {
      id: 2,
      type: 'confirmation',
      title: 'Agendamento Confirmado',
      message: 'Seu agendamento no Restaurante Sabor & Arte foi confirmado para sexta-feira',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      read: true,
      category: 'agendamentos'
    },
    {
      id: 3,
      type: 'cancellation',
      title: 'Agendamento Cancelado',
      message: 'Infelizmente, seu agendamento no Pet Shop foi cancelado pelo estabelecimento',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      read: false,
      category: 'agendamentos'
    },
    {
      id: 4,
      type: 'review',
      title: 'Avalie seu Atendimento',
      message: 'Como foi sua experiência na Barbearia do João? Sua opinião é importante!',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      read: true,
      category: 'avaliacoes'
    },
    {
      id: 5,
      type: 'promotion',
      title: 'Oferta Especial!',
      message: '20% de desconto na Barbearia do João até o final do mês',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      read: false,
      category: 'promocoes'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'reminder':
        return <Clock className="h-5 w-5 text-brand-secondary" />;
      case 'confirmation':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'cancellation':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'review':
        return <Star className="h-5 w-5 text-yellow-500" />;
      case 'promotion':
        return <AlertCircle className="h-5 w-5 text-brand-primary" />;
      default:
        return <Bell className="h-5 w-5 text-brand-gray-medium" />;
    }
  };

  const getNotificationBadge = (type: string) => {
    switch (type) {
      case 'reminder':
        return <Badge className="bg-brand-secondary/20 text-brand-primary">Lembrete</Badge>;
      case 'confirmation':
        return <Badge className="bg-green-100 text-green-700">Confirmação</Badge>;
      case 'cancellation':
        return <Badge className="bg-red-100 text-red-700">Cancelamento</Badge>;
      case 'review':
        return <Badge className="bg-yellow-100 text-yellow-700">Avaliação</Badge>;
      case 'promotion':
        return <Badge className="bg-brand-primary/20 text-brand-primary">Promoção</Badge>;
      default:
        return null;
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const filterNotifications = (category?: string) => {
    if (!category) return notifications;
    return notifications.filter(n => n.category === category);
  };

  const EmptyState = ({ message }: { message: string }) => (
    <div className="text-center py-12">
      <BellOff className="h-16 w-16 text-brand-gray-soft mx-auto mb-4" />
      <h3 className="brand-text-hierarchy-3 mb-2">Nenhuma notificação</h3>
      <p className="brand-text-body">{message}</p>
    </div>
  );

  const NotificationItem = ({ notification }: { notification: any }) => (
    <Card 
      className={`brand-card transition-all duration-200 hover:shadow-md cursor-pointer ${
        !notification.read ? 'border-l-4 border-l-brand-secondary bg-brand-secondary/5' : ''
      }`}
      onClick={() => !notification.read && markAsRead(notification.id)}
    >
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-1">
            {getNotificationIcon(notification.type)}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className={`font-medium ${!notification.read ? 'text-brand-primary' : 'brand-text-hierarchy-3'}`}>
                {notification.title}
              </h3>
              {getNotificationBadge(notification.type)}
            </div>
            
            <p className="brand-text-body text-sm mb-2">
              {notification.message}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="brand-text-caption">
                {formatDistanceToNow(notification.timestamp, { 
                  addSuffix: true, 
                  locale: ptBR 
                })}
              </span>
              
              <div className="flex items-center space-x-2">
                {!notification.read && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      markAsRead(notification.id);
                    }}
                    className="h-8 px-2 text-brand-primary hover:bg-brand-secondary/20"
                  >
                    <Mail className="h-3 w-3" />
                  </Button>
                )}
                
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(notification.id);
                  }}
                  className="h-8 px-2 text-red-500 hover:bg-red-50"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-brand-ice">
      {/* Header */}
      <div className="bg-white shadow-minimal border-b border-brand-gray-soft">
        <div className="max-w-4xl mx-auto p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="h-6 w-6 text-brand-primary" />
              <h1 className="brand-text-hierarchy-1">Notificações</h1>
              {unreadCount > 0 && (
                <Badge className="bg-brand-secondary text-brand-primary">
                  {unreadCount} não lidas
                </Badge>
              )}
            </div>
            
            {unreadCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={markAllAsRead}
                className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
              >
                Marcar todas como lidas
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6">
        {notifications.length === 0 ? (
          <EmptyState message="Você não possui notificações no momento." />
        ) : (
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white shadow-minimal">
              <TabsTrigger value="all" className="data-[state=active]:bg-brand-secondary data-[state=active]:text-brand-primary">
                Todas ({notifications.length})
              </TabsTrigger>
              <TabsTrigger value="agendamentos" className="data-[state=active]:bg-brand-secondary data-[state=active]:text-brand-primary">
                Agendamentos
              </TabsTrigger>
              <TabsTrigger value="avaliacoes" className="data-[state=active]:bg-brand-secondary data-[state=active]:text-brand-primary">
                Avaliações
              </TabsTrigger>
              <TabsTrigger value="promocoes" className="data-[state=active]:bg-brand-secondary data-[state=active]:text-brand-primary">
                Promoções
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <NotificationItem key={notification.id} notification={notification} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="agendamentos">
              <div className="space-y-4">
                {filterNotifications('agendamentos').length > 0 ? (
                  filterNotifications('agendamentos').map((notification) => (
                    <NotificationItem key={notification.id} notification={notification} />
                  ))
                ) : (
                  <EmptyState message="Nenhuma notificação sobre agendamentos." />
                )}
              </div>
            </TabsContent>

            <TabsContent value="avaliacoes">
              <div className="space-y-4">
                {filterNotifications('avaliacoes').length > 0 ? (
                  filterNotifications('avaliacoes').map((notification) => (
                    <NotificationItem key={notification.id} notification={notification} />
                  ))
                ) : (
                  <EmptyState message="Nenhuma solicitação de avaliação." />
                )}
              </div>
            </TabsContent>

            <TabsContent value="promocoes">
              <div className="space-y-4">
                {filterNotifications('promocoes').length > 0 ? (
                  filterNotifications('promocoes').map((notification) => (
                    <NotificationItem key={notification.id} notification={notification} />
                  ))
                ) : (
                  <EmptyState message="Nenhuma promoção disponível." />
                )}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
