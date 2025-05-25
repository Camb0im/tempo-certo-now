
import { useState, useCallback } from 'react';

interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export const useLoadingState = (initialLoading = false) => {
  const [state, setState] = useState<LoadingState>({
    isLoading: initialLoading,
    error: null,
  });

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, isLoading: loading, error: null }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error, isLoading: false }));
  }, []);

  const reset = useCallback(() => {
    setState({ isLoading: false, error: null });
  }, []);

  const execute = useCallback(async <T>(
    asyncFn: () => Promise<T>
  ): Promise<T | null> => {
    try {
      setLoading(true);
      const result = await asyncFn();
      setState({ isLoading: false, error: null });
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      setError(errorMessage);
      return null;
    }
  }, [setLoading, setError]);

  return {
    ...state,
    setLoading,
    setError,
    reset,
    execute,
  };
};
