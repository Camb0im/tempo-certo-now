
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
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

    // Create Supabase client using anon key for auth
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    );

    // Get the user from the auth header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("Authorization header is required");
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError || !userData.user) {
      throw new Error("Invalid user token");
    }
    const user = userData.user;

    // Get booking data from request
    const { bookingId } = await req.json();
    if (!bookingId) {
      throw new Error("bookingId is required");
    }

    // Get the booking from Supabase
    const { data: bookingData, error: bookingError } = await supabaseClient
      .from("bookings")
      .select("*, time_slots(*, services(*, service_providers(business_name)))")
      .eq("id", bookingId)
      .single();

    if (bookingError || !bookingData) {
      throw new Error("Booking not found");
    }

    // Get Stripe customer or create a new one
    let customerId: string;
    const { data: customers } = await stripe.customers.search({
      query: `email:'${user.email}'`,
    });

    if (customers && customers.length > 0) {
      customerId = customers[0].id;
    } else {
      const newCustomer = await stripe.customers.create({
        email: user.email,
        name: user.user_metadata?.full_name || user.email,
      });
      customerId = newCustomer.id;
    }

    // Create Stripe checkout session
    const service = bookingData.time_slots.services;
    const provider = service.service_providers;
    
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "brl",
            product_data: {
              name: service.name,
              description: `Agendamento com ${provider.business_name} para ${new Date(bookingData.time_slots.start_time).toLocaleString("pt-BR")}`,
            },
            unit_amount: Math.round(bookingData.payment_amount * 100), // Stripe works with cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/dashboard`,
    });

    // Update the booking with the checkout session ID
    const { error: updateError } = await supabaseClient
      .from("bookings")
      .update({
        payment_status: "pending_confirmation",
        updated_at: new Date().toISOString(),
      })
      .eq("id", bookingId);

    if (updateError) {
      throw new Error("Failed to update booking");
    }

    return new Response(
      JSON.stringify({
        sessionId: session.id,
        url: session.url,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in create-checkout function:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
