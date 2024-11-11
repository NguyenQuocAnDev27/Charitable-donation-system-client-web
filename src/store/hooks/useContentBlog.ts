import axios from 'axios';
import { useCallback } from 'react';
import createAPIState from './createAPIState';
import { getCookie } from '@/utils/cookiesHandler';
import { COOKIE_KEYS } from '@/constant/cookieKey';
import { APIState, ContentBlogResponse } from '@/interface';
import { useTokenStore } from './useRefreshToken';

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_API_URL;

// Create a Zustand store specifically for Project Detail
const useContentBlogAPIState = createAPIState<ContentBlogResponse>();

const useContentBlog = (projectId: number) => {
  const { data, loading, error, success, setData, setLoading, setError, setSuccess } = useContentBlogAPIState();
  const { refreshAccessToken } = useTokenStore();

  const fetchContentBlog = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    let token = getCookie(COOKIE_KEYS.ACCESS_TOKEN);

    const fetchData = async () => {
      if(token === null || token === undefined) {
        setError("Access token not found");
        setSuccess(false);
        setLoading(false);
        return;
      }

      try {
        const JSONresponse = await axios.get<APIState<ContentBlogResponse>>(
          `${BASE_URL}/api/project_detail/show_v2`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              projectId,
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
  }, [projectId, refreshAccessToken, setData, setLoading, setError, setSuccess]);

  return { data, loading, error, success, fetchContentBlog };
};

export default useContentBlog;
