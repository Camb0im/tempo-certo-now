
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY");
    if (!STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }

    const stripe = new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: "2023-10-16",
    });

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const { sessionId } = await req.json();
    if (!sessionId) {
      throw new Error("sessionId is required");
    }

    // Get the session details from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (!session) {
      throw new Error("Session not found");
    }

    // Update the booking payment status
    let paymentStatus;
    if (session.payment_status === "paid") {
      paymentStatus = "paid";
    } else if (session.payment_status === "unpaid") {
      paymentStatus = "pending";
    } else {
      paymentStatus = "failed";
    }

    // Update booking and get details in one query
    const { data: booking, error: updateError } = await supabaseClient
      .from("bookings")
      .update({
        payment_status: paymentStatus,
        updated_at: new Date().toISOString(),
      })
      .eq("stripe_session_id", sessionId)
      .select(`
        id, 
        payment_status,
        status,
        time_slots!inner(
          id,
          start_time,
          end_time,
          services!inner(
            id,
            name,
            duration,
            service_providers!inner(
              id,
              business_name,
              address
            )
          )
        )
      `)
      .single();

    if (updateError) {
      throw new Error("Failed to update booking: " + updateError.message);
    }

    if (!booking) {
      throw new Error("Booking not found");
    }

    // Flatten the response structure
    const timeSlot = booking.time_slots;
    const service = timeSlot.services;
    const provider = service.service_providers;

    const bookingDetails = {
      id: booking.id,
      payment_status: booking.payment_status,
      status: booking.status,
      service_name: service.name,
      service_duration: service.duration,
      provider_business_name: provider.business_name,
      provider_address: provider.address,
      time_slot_start_time: timeSlot.start_time,
      time_slot_end_time: timeSlot.end_time,
    };

    return new Response(
      JSON.stringify({
        success: true,
        paymentStatus,
        bookingDetails
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in verify-payment function:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
