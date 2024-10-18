// useSearchTransactions.ts
import axios from 'axios';
import { useCallback } from 'react';
import { APIState, TransactionSearchResponse } from '@/interface';
import { getCookie } from '@/utils/cookiesHandler';
import { COOKIE_KEYS } from '@/constant/cookieKey';
import { useTokenStore } from './useRefreshToken';
import createAPIState from './createAPIState';

const useTransactionSearchAPIState = createAPIState<TransactionSearchResponse>();

const useSearchTransactions = () => {
  const { data, loading, error, success, setData, setLoading, setError, setSuccess } = useTransactionSearchAPIState();
  const { refreshAccessToken } = useTokenStore();

  const searchTransactions = useCallback(
    async (pageNumber: number = 0, pageSize: number = 10, transactionId?: number | null) => {
      setLoading(true);
      setError(null);
      setSuccess(null);

      let token = getCookie(COOKIE_KEYS.ACCESS_TOKEN);

      const fetchTransactions = async () => {
        try {
          const response = await axios.get<APIState<TransactionSearchResponse>>(
            `${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/transaction/search`,
            {
              params: {
                page: pageNumber,      // API expects "page" for page number
                size: pageSize,        // API expects "size" for page size
                transactionId: transactionId || undefined,  // Include transactionId if provided
              },
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setData(response.data.data);  // Set full API response (pagination + content)
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
                await fetchTransactions(); // Retry with new token
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

      await fetchTransactions();
    },
    [refreshAccessToken, setData, setLoading, setError, setSuccess]
  );

  return { data, loading, error, success, searchTransactions };
};

export default useSearchTransactions;
