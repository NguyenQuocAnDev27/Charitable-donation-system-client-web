import axios from 'axios';
import { useCallback } from 'react';
import createAPIState from './createAPIState';
import { APIState } from '@/interface';

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_API_URL;

interface SignInGoogleResponse {
  accessToken: string;
  refreshToken: string;
  email: string;
}

// Create a Zustand store for the Project API
const useSignInGoogleAPIState = createAPIState<SignInGoogleResponse>();

const useSignInGoogle = () => {
  const { data, loading, error, success, setData, setLoading, setError, setSuccess } = useSignInGoogleAPIState();

  const resetState = () => {
    setData(null)
    setError(null);
    setSuccess(null);
  };

  const fetchSignInGoogle = useCallback(async (idToken: string) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    const fetchData = async () => {
      try {
        const response = await axios.post<APIState<SignInGoogleResponse>>(
          `${BASE_URL}/api/authenticate/google`,
          { idToken },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const responseData = response.data.data;
        setData(responseData);
        setSuccess(true);
      } catch (error) {
        let errorMessage = 'An unexpected error occurred.';

        if (axios.isAxiosError(error) && error.response) {
          const status = error.response.status;

          // Handle specific HTTP status codes
          if (status === 401) {
            errorMessage = 'Invalid credentials or expired token.';
          } else if (status === 403) {
            errorMessage = 'Access forbidden. You do not have permission.';
          } else {
            errorMessage = error.response.data?.message || errorMessage;
          }
        }

        setError(errorMessage);
        setSuccess(false);
      } finally {
        setLoading(false);
      }
    };

    await fetchData();
  }, [setData, setLoading, setError, setSuccess]);

  return { data, loading, error, success, fetchSignInGoogle, resetState };
};

export default useSignInGoogle;
