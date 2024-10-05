import axios from 'axios';
import { useCallback } from 'react';
import { getCookie } from '@/utils/cookiesHandler';
import { create } from 'zustand';
import { COOKIE_KEYS } from "../../constant/cookieKey";
import { User } from '@/interface';

interface InfoState {
  data: User;
  loading: boolean;
  error: string | null;
  success: boolean | null;
  getInfoDetail: (email: string) => Promise<void>;
}

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_API_URL;

const useInfoStore = create<InfoState>((set) => ({
  data: null,
  loading: false,
  error: null,
  success: null,
  getInfoDetail: async (email: string) => {
    console.log(`Get InfoDetail from email ${email}`)
    set({ loading: true, error: null, success: null });

    // Get the token from cookies
    const token = getCookie(COOKIE_KEYS.ACCESS_TOKEN);

    if (!token) {
      set({ error: 'No token found', loading: false, success: false });
      return;
    }

    try {
      const JSONresponse = await axios.get(`${BASE_URL}/api/getInfoDetail`, {
        params: { email },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const response = JSONresponse.data;
      // console.log(`Data fetch: ${JSON.stringify(response.data)}`);
      set({ data: response.data, loading: false, success: true });
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false, success: false });
    }
  },
}));

export const useGetInfoDetail = () => {
  const { data, loading, error, success, getInfoDetail } = useInfoStore();

  const fetchInfo = useCallback((email: string) => {
    getInfoDetail(email);
  }, [getInfoDetail]);

  return { data, loading, error, success, fetchInfo };
};
