
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

const Navbar = () => {
  return (
    <header className="border-b sticky top-0 bg-white z-50">
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2">
          <Clock className="h-6 w-6 text-tc-blue" />
          <span className="text-lg font-bold text-tc-blue">TempoCerto</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
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
          <Link to="/login">
            <Button variant="outline" className="hidden sm:inline-flex">Entrar</Button>
          </Link>
          <Link to="/cadastro">
            <Button className="bg-tc-blue hover:bg-tc-blue-dark">Cadastrar</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
