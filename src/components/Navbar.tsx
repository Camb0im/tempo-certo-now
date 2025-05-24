
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import TempoCertoLogo from "@/components/TempoCertoLogo";
import {
  Menu,
  X,
  UserCircle,
  Calendar,
  Store,
  ChevronDown,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <header className="border-b sticky top-0 bg-white z-50">
      <div className="container mx-auto flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>
                  <TempoCertoLogo size="lg" />
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-muted-foreground">Menu</h3>
                  <div className="space-y-2">
                    <Link
                      to="/explore"
                      className="flex items-center rounded-md px-2 py-2 hover:bg-muted"
                    >
                      Explorar Serviços
                    </Link>
                    <Link
                      to="/como-funciona"
                      className="flex items-center rounded-md px-2 py-2 hover:bg-muted"
                    >
                      Como funciona
                    </Link>
                    <Link
                      to="/para-negocios"
                      className="flex items-center rounded-md px-2 py-2 hover:bg-muted"
                    >
                      Para negócios
                    </Link>
                    <Link
                      to="/precos"
                      className="flex items-center rounded-md px-2 py-2 hover:bg-muted"
                    >
                      Preços
                    </Link>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          
          <TempoCertoLogo />
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <Link to="/explore" className="text-gray-600 hover:text-tc-blue transition-colors">
            Explorar Serviços
          </Link>
          <Link to="/como-funciona" className="text-gray-600 hover:text-tc-blue transition-colors">
            Como funciona
          </Link>
          <Link to="/para-negocios" className="text-gray-600 hover:text-tc-blue transition-colors">
            Para negócios
          </Link>
          <Link to="/precos" className="text-gray-600 hover:text-tc-blue transition-colors">
            Preços
          </Link>
        </div>
        
        <div className="flex items-center gap-3">
          {user ? (
            <Link to="/dashboard">
              <Button variant="outline" className="flex items-center gap-2">
                <UserCircle className="h-4 w-4" />
                Minha Conta
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" className="hidden sm:inline-flex">Entrar</Button>
              </Link>
              <Link to="/cadastro">
                <Button className="bg-tc-blue hover:bg-tc-blue-dark">Cadastrar</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
