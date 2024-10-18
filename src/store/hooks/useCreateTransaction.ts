import axios from 'axios';
import { useCallback } from 'react';
import createAPIState from './createAPIState';
import { APIState, TransactionResponse } from '@/interface';
import { getCookie } from '@/utils/cookiesHandler';
import { useTokenStore } from './useRefreshToken';
import { COOKIE_KEYS } from '@/constant/cookieKey';

// Create a Zustand store for the Transaction API
const useTransactionAPIState = createAPIState<TransactionResponse>();

const useCreateTransaction = () => {
  const { data, loading, error, success, setData, setLoading, setError, setSuccess } = useTransactionAPIState();
  const { refreshAccessToken } = useTokenStore();

  const createTransaction = useCallback(
    async (amount: number, message: string, projectId: string, userId: number) => {
      setLoading(true);
      setError(null);
      setSuccess(null);

      let token = getCookie(COOKIE_KEYS.ACCESS_TOKEN);

      const postData = async () => {
        try {
          const response = await axios.post<APIState<TransactionResponse>>(
            `${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/transaction/create`,
            {},
            {
              params: {
                amount,
                message,
                project_id: projectId,
                user_id: userId,
              },
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setData(response.data.data);
          setSuccess(true);
        } catch (error) {
          let errorMessage = 'An unexpected error occurred.';

          if (axios.isAxiosError(error) && error.response) {
            const status = error.response.status;

            if (status === 600) {
              errorMessage = 'Expired Access Token. Refreshing...';
              await refreshAccessToken();
              token = getCookie(COOKIE_KEYS.ACCESS_TOKEN);

              if (token) {
                await postData(); // Retry with new token
                return;
              } else {
                errorMessage = 'Failed to refresh token.';
              }
            } else if (status === 601) {
              errorMessage = 'Custom message for status 601';
            } else if (status === 602) {
              errorMessage = 'Custom message for status 602';
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

      await postData();
    },
    [refreshAccessToken, setData, setLoading, setError, setSuccess]
  );

  return { data, loading, error, success, createTransaction };
};

export default useCreateTransaction;