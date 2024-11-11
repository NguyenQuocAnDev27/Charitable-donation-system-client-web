'use client';

import axios from 'axios';
import { useCallback } from 'react';
import createAPIState from './createAPIState';
import { APIState, SignUpBody, UserDetailInfo } from '@/interface';
import { getCookie } from '@/utils/cookiesHandler';
import { COOKIE_KEYS } from '@/constant/cookieKey';

// Create a Zustand store for the SignUp API
const useSignUpAPIState = createAPIState<UserDetailInfo>();

const useSignUp = () => {
  const { data, loading, error, success, setData, setLoading, setError, setSuccess } = useSignUpAPIState();

  const signUp = useCallback(
    async (body: SignUpBody) => {
      setLoading(true);
      setError(null);
      setSuccess(null);

      try {
        const response = await axios.post<APIState<UserDetailInfo>>(
          `${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/register`,
          {
            fullName: body?.fullName,
            email: body?.email,
            password: body?.password,
            phoneNumber: body?.phoneNumber,
          }
        );

        setData(response.data.data);
        setSuccess(true);
      } catch (error: any) {
        let errorMessage = 'An unexpected error occurred.';

        setError(errorMessage);
        setSuccess(false);
      } finally {
        setLoading(false);
      }
    },
    [setData, setLoading, setError, setSuccess]
  );

  return { data, loading, error, success, signUp };
};

export default useSignUp;
