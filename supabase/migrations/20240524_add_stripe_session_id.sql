
-- Adiciona a coluna stripe_session_id para armazenar o ID da sessão do Stripe
ALTER TABLE public.bookings 
ADD COLUMN IF NOT EXISTS stripe_session_id TEXT;
