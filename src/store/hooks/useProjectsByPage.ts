import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import createAPIState from './createAPIState';
import { getCookie } from '@/utils/cookiesHandler';
import { COOKIE_KEYS } from '@/constant/cookieKey';
import { ProjectPageResponse, APIState } from '@/interface';
import { useTokenStore } from './useRefreshToken';

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_API_URL;

// Create a Zustand store for paginated Project API responses
const useProjectAPIState = createAPIState<ProjectPageResponse>();

const useFetchProjectsByPage = () => {
  const { data, loading, error, success, setData, setLoading, setError, setSuccess } = useProjectAPIState();
  const { refreshAccessToken } = useTokenStore();

  // State for pagination and query string
  const [numberPage, setNumberPage] = useState(0);
  const [searchKey, setSearchKey] = useState('');

  const fetchProjectsPage = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    let token = getCookie(COOKIE_KEYS.ACCESS_TOKEN);

    const fetchData = async () => {
      try {
        const JSONresponse = await axios.get<APIState<ProjectPageResponse>>(
          `${BASE_URL}/api/projects/page`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              number: numberPage,
              searchKey: searchKey,
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
              await fetchData();
              return;
            } else {
              errorMessage = 'Failed to refresh token.';
            }
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
  }, [numberPage, searchKey, refreshAccessToken, setData, setLoading, setError, setSuccess]);

  // Fetch data whenever numberPage or queryString changes
  useEffect(() => {
    fetchProjectsPage();
  }, [numberPage, searchKey, fetchProjectsPage]);

  // Only update the page number or query string
  const changePageNumber = (page: number) => {
    setNumberPage(page);
  };

  const updateSearchString = (key: string) => {
    setSearchKey(key);
  };

  return { data, loading, error, success, fetchProjectsPage, changePageNumber, updateSearchString };
};

export default useFetchProjectsByPage;
