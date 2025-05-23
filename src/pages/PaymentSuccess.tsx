
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PaymentSuccessCard from "@/components/PaymentSuccessCard";
import PaymentLoadingCard from "@/components/PaymentLoadingCard";
import { usePaymentVerification } from "@/hooks/usePaymentVerification";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const navigate = useNavigate();
  const { user } = useAuth();
  const { verifying, bookingDetails } = usePaymentVerification(sessionId, user?.id || null);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-16 px-4 bg-gray-50">
        {verifying ? (
          <PaymentLoadingCard />
        ) : (
          <div className="max-w-md w-full">
            <PaymentSuccessCard bookingDetails={bookingDetails} />
            <CardFooter className="flex flex-col gap-2 mt-4">
              <Button 
                className="w-full bg-tc-blue hover:bg-tc-blue-dark"
                onClick={() => navigate("/dashboard")}
              >
                Ir para o Dashboard
              </Button>
              <Button 
                variant="outline"
                className="w-full"
                onClick={() => navigate("/explore")}
              >
                Agendar Outro Serviço
              </Button>
            </CardFooter>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
