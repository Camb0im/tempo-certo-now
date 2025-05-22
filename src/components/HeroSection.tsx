
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-24">
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-tc-blue to-tc-green opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Economize tempo nos seus compromissos diários
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Chega de esperar em filas e perder tempo. Com o TempoCerto, você agenda pequenos compromissos com facilidade, paga uma taxa simbólica e garante seu atendimento no horário certo.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Link to="/cadastro">
              <Button className="bg-tc-blue hover:bg-tc-blue-dark px-8 py-6 text-lg">
                Comece agora
              </Button>
            </Link>
            <Link
              to="/como-funciona"
              className="text-base font-semibold leading-6 text-gray-900 hover:text-tc-blue"
            >
              Saiba mais <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="mt-16 sm:mt-24 lg:mt-16 lg:flex lg:justify-between">
          <div className="relative lg:w-1/2 lg:pr-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Para clientes
              </h2>
              <ul className="mt-6 space-y-4 text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Reserve horários em diversos serviços</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Economize tempo evitando filas</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Receba lembretes de compromissos</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Pague apenas uma taxa simbólica</span>
                </li>
              </ul>
              <Link to="/cadastro" className="mt-6 inline-block">
                <Button variant="outline" className="mt-4">
                  Criar conta
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative mt-10 lg:mt-0 lg:w-1/2 lg:pl-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Para prestadores
              </h2>
              <ul className="mt-6 space-y-4 text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Gerencie seus horários com facilidade</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Reduza faltas e cancelamentos</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Aumente a satisfação dos clientes</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Otimize sua agenda e ganhe mais</span>
                </li>
              </ul>
              <Link to="/provider/register" className="mt-6 inline-block">
                <Button variant="outline" className="mt-4">
                  Cadastrar negócio
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-tc-green to-tc-blue opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </section>
  );
};

export default HeroSection;
