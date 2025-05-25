
import { toast } from "@/hooks/use-toast";

export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const handleApiError = (error: unknown, defaultMessage: string = 'Ocorreu um erro inesperado') => {
  console.error('API Error:', error);
  
  if (error instanceof AppError) {
    toast({
      title: "Erro",
      description: error.message,
      variant: "destructive",
    });
    return error.message;
  }
  
  if (error instanceof Error) {
    toast({
      title: "Erro",
      description: error.message || defaultMessage,
      variant: "destructive",
    });
    return error.message;
  }
  
  toast({
    title: "Erro",
    description: defaultMessage,
    variant: "destructive",
  });
  return defaultMessage;
};

export const withRetry = async <T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000
): Promise<T> => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
    }
  }
  throw new Error('Max retries exceeded');
};
