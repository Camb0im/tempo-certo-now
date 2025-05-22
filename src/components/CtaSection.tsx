
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CtaSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-tc-blue to-tc-blue-dark rounded-2xl overflow-hidden shadow-xl">
          <div className="px-6 py-12 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Comece a economizar tempo hoje
              </h2>
              <p className="text-white text-opacity-90 text-lg max-w-2xl">
                Junte-se a milhares de pessoas que já economizam tempo em seus pequenos compromissos diários.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center md:justify-end">
              <Link to="/cadastro">
                <Button className="bg-white hover:bg-gray-100 text-tc-blue font-bold text-lg px-8 py-3">
                  Comece Agora
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
