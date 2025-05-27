
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  User, 
  Settings, 
  Bell, 
  Calendar, 
  Heart, 
  LogOut,
  ChevronDown 
} from 'lucide-react';
import UserProfileAvatar from '@/components/UserProfileAvatar';

const UserMenu = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleMenuAction = (action: string) => {
    switch (action) {
      case 'profile':
        navigate('/perfil');
        break;
      case 'dashboard':
        navigate('/dashboard');
        break;
      case 'notifications':
        navigate('/notificacoes');
        break;
      case 'favorites':
        navigate('/perfil');
        break;
      case 'settings':
        navigate('/perfil');
        break;
      case 'logout':
        signOut();
        navigate('/');
        break;
      default:
        break;
    }
  };

  if (!user) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="flex items-center space-x-2 hover:bg-brand-secondary/20 p-2 rounded-lg"
        >
          <UserProfileAvatar name={user.email} size="sm" />
          <span className="hidden md:block text-brand-primary font-medium">
            {user.email?.split('@')[0]}
          </span>
          <ChevronDown className="h-4 w-4 text-brand-gray-medium" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="end" 
        className="w-56 bg-white shadow-brand border border-brand-gray-soft rounded-lg p-2"
      >
        <div className="px-3 py-2 border-b border-brand-gray-soft mb-2">
          <p className="text-sm font-medium text-brand-primary">
            {user.email}
          </p>
          <p className="text-xs text-brand-gray-medium">
            Minha Conta
          </p>
        </div>

        <DropdownMenuItem 
          onClick={() => handleMenuAction('profile')}
          className="flex items-center space-x-3 px-3 py-2 cursor-pointer hover:bg-brand-secondary/20 rounded-md"
        >
          <User className="h-4 w-4 text-brand-primary" />
          <span className="text-brand-primary">Meu Perfil</span>
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={() => handleMenuAction('dashboard')}
          className="flex items-center space-x-3 px-3 py-2 cursor-pointer hover:bg-brand-secondary/20 rounded-md"
        >
          <Calendar className="h-4 w-4 text-brand-primary" />
          <span className="text-brand-primary">Meus Agendamentos</span>
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={() => handleMenuAction('notifications')}
          className="flex items-center space-x-3 px-3 py-2 cursor-pointer hover:bg-brand-secondary/20 rounded-md"
        >
          <Bell className="h-4 w-4 text-brand-primary" />
          <span className="text-brand-primary">Notificações</span>
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={() => handleMenuAction('favorites')}
          className="flex items-center space-x-3 px-3 py-2 cursor-pointer hover:bg-brand-secondary/20 rounded-md"
        >
          <Heart className="h-4 w-4 text-brand-primary" />
          <span className="text-brand-primary">Favoritos</span>
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={() => handleMenuAction('settings')}
          className="flex items-center space-x-3 px-3 py-2 cursor-pointer hover:bg-brand-secondary/20 rounded-md"
        >
          <Settings className="h-4 w-4 text-brand-primary" />
          <span className="text-brand-primary">Configurações</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-2 bg-brand-gray-soft" />

        <DropdownMenuItem 
          onClick={() => handleMenuAction('logout')}
          className="flex items-center space-x-3 px-3 py-2 cursor-pointer hover:bg-red-50 rounded-md"
        >
          <LogOut className="h-4 w-4 text-red-500" />
          <span className="text-red-500">Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
