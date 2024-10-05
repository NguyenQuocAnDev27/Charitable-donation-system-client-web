// src/store/hooks/useAuthenticate.ts
import useAuthStore from './useAuthStore';
import { useCallback } from 'react';

const useAuthenticate = () => {
  const { accessToken, refreshToken, loading, error, success, authenticate } = useAuthStore();
  const login = useCallback((email: string, password: string) => {
    authenticate(email, password);
  }, [authenticate]);

  return { accessToken, refreshToken, loading, error, success, login };
};

export default useAuthenticate;
