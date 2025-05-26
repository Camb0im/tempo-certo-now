
import React from "react";
import { Link } from "react-router-dom";
import { Palette, Layout } from "lucide-react";

const BrandIdentityLink = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      <Link
        to="/wireframes"
        className="flex items-center gap-2 px-4 py-2 bg-brand-secondary text-brand-primary rounded-lg shadow-brand hover:bg-brand-primary hover:text-white transition-all duration-200 font-medium"
      >
        <Layout className="h-4 w-4" />
        Ver Wireframes UX
      </Link>
      <Link
        to="/brand-identity"
        className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-lg shadow-brand hover:bg-brand-secondary hover:text-brand-primary transition-all duration-200 font-medium"
      >
        <Palette className="h-4 w-4" />
        Ver Identidade Visual
      </Link>
    </div>
  );
};

export default BrandIdentityLink;
