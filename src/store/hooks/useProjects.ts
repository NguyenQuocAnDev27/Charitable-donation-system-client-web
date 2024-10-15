import axios from 'axios';
import { useCallback } from 'react';
import createAPIState from './createAPIState';
import { getCookie } from '@/utils/cookiesHandler';
import { COOKIE_KEYS } from '@/constant/cookieKey';
import { Project, APIState } from '@/interface';
import { useTokenStore } from './useRefreshToken';

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_API_URL;

// Create a Zustand store for the Project API
const useProjectAPIState = createAPIState<Project[]>();

const useGetProjectList = () => {
  const { data, loading, error, success, setData, setLoading, setError, setSuccess } = useProjectAPIState();
  const { refreshAccessToken } = useTokenStore();

  const fetchProjectList = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    let token = getCookie(COOKIE_KEYS.ACCESS_TOKEN);

    const fetchData = async () => {
      try {
        const JSONresponse = await axios.get<APIState<Project[]>>(
          `${BASE_URL}/api/projects`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const response = JSONresponse.data.data;
        setData(response);
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
              await fetchData(); // Retry with new token
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

    await fetchData();
  }, [refreshAccessToken, setData, setLoading, setError, setSuccess]);

  return { data, loading, error, success, fetchProjectList };
};

export default useGetProjectList;
