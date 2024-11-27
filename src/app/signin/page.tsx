"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { getCookie, setCookie, eraseCookie } from "@/utils/cookiesHandler";
import { COOKIE_KEYS } from "@/constant/cookieKey";
import useAuthenticate from "@/store/hooks/useAuthenticate";
import useGetInfoDetail from "@/store/hooks/useGetInfoDetail";
import StorageUtil from "@/utils/storageUtil";
import { User } from "@/interface";
import { LOCAL_STORAGE_KEY } from "@/constant/localStorageKey";
import { global } from "@/constant/global";
import useSignInGoogle from "@/store/hooks/useSignInGoogle";

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingLoginAPI, setLoadingLoginAPI] = useState(false);
  const [isLoginDone, setIsLoiginDone] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const access_token = getCookie(COOKIE_KEYS.ACCESS_TOKEN);

  const {
    data: dataAuth,
    loading: loadingAuth,
    success: successAuth,
    error: errorAuth,
    login: fetchAuth,
  } = useAuthenticate();

  const {
    data: dataUserDetail,
    loading: loadingGetInfo,
    error: errorGetInfo,
    success: successGetInfo,
    fetchInfoDetail: fetchInfo,
  } = useGetInfoDetail();

  const {
    data: dataAuthGoogle,
    loading: loadingSignInGoogle,
    error: errorSignInGoogle,
    success: successSignInGoogle,
    fetchSignInGoogle,
  } = useSignInGoogle();

  useEffect(() => {
    if (access_token) {
      router.push("/");
    }
  }, [access_token]);

  useEffect(() => {
    if (successAuth) {
      setCookie(COOKIE_KEYS.ACCESS_TOKEN, dataAuth.accessToken, 1);
      if (rememberMe) {
        setCookie(COOKIE_KEYS.REFRESH_TOKEN, dataAuth.refreshToken, 7 * 24);
      }
      fetchInfo(email);
    } else if (errorAuth) {
      setLoadingLoginAPI(false);
      setErrorMessage(errorAuth);
    }
  }, [loadingAuth, successAuth, errorAuth, rememberMe]);

  useEffect(() => {
    if (successGetInfo) {
      const expTime = rememberMe ? 7824 : 1;
      if (dataUserDetail.roleName !== global.ROLE_NAME.NORMAL_USER) {
        window.location.href = process.env.NEXT_PUBLIC_ADMIN_LOGIN_URL;
        eraseCookie(COOKIE_KEYS.ACCESS_TOKEN);
        eraseCookie(COOKIE_KEYS.REFRESH_TOKEN);
        return;
      }
      setCookie(COOKIE_KEYS.USER_EMAIL, dataUserDetail.email, expTime);
      setCookie(COOKIE_KEYS.USER_ID, `${dataUserDetail.userId}`, expTime);
      StorageUtil.save<User>(LOCAL_STORAGE_KEY.USER, dataUserDetail);
      setIsLoiginDone(true);
    } else if (errorGetInfo) {
      setErrorMessage(errorGetInfo);
    }
    setLoadingLoginAPI(false);
  }, [loadingGetInfo, successGetInfo, errorGetInfo]);

  useEffect(() => {
    if (isLoginDone) {
      router.push("/");
    }
  }, [isLoginDone]);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingLoginAPI(true);
    fetchAuth(email, password);
  };

  // Handle Google login success
  const handleGoogleLoginSuccess = async (response: any) => {
    const { credential } = response;
    console.log("Google login success:", response);
    // Send token to backend or handle Google login directly in the app
    await fetchAuthWithGoogle(credential);
  };

  const handleGoogleLoginFailure = () => {
    console.error("Google login failed");
    setErrorMessage("Google login failed. Please try again.");
  };

  const fetchAuthWithGoogle = async (googleToken: string) => {
    // Send Google token to backend for validation or handle directly
    console.log("Google token:", googleToken);
    fetchSignInGoogle(googleToken);
  };

  useEffect(() => {
    if (successSignInGoogle) {
      setCookie(COOKIE_KEYS.ACCESS_TOKEN, dataAuthGoogle.accessToken, 1);
      if (rememberMe) {
        setCookie(
          COOKIE_KEYS.REFRESH_TOKEN,
          dataAuthGoogle.refreshToken,
          7 * 24,
        );
      }
      fetchInfo(dataAuthGoogle.email);
    } else if (errorSignInGoogle) {
      setLoadingLoginAPI(false);
      setErrorMessage("Đăng nhập thất bại!");
    }
  }, [
    loadingSignInGoogle,
    successSignInGoogle,
    errorSignInGoogle,
    fetchSignInGoogle,
  ]);

  return (
    <>
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[500px] rounded bg-white px-6 py-10 shadow-three dark:bg-dark sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Đăng nhập
                </h3>
                <p className="mb-11 text-center text-base font-medium text-body-color">
                  Đăng nhập để sử dụng các chức năng hữu ích hơn nhé!
                </p>

                {/* Display error message if login fails */}
                {errorMessage && (
                  <div className="mb-6 text-center text-red-500">
                    {errorMessage}
                  </div>
                )}

                {/* Sign-in Form */}
                <form onSubmit={handleSignIn}>
                  <div className="mb-8">
                    <label
                      htmlFor="email"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="example@gmail.com"
                      className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-8">
                    <label
                      htmlFor="password"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      Mật khẩu
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Nhập mật khẩu của bạn"
                      className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  {/* Remember Me Checkbox */}
                  <div className="mb-8 flex flex-col justify-between sm:flex-row sm:items-center">
                    <div className="mb-4 sm:mb-0">
                      <label
                        htmlFor="checkboxLabel"
                        className="flex cursor-pointer select-none items-center text-sm font-medium text-body-color"
                      >
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="checkboxLabel"
                            className="sr-only"
                            checked={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)} // Toggle "Remember Me" checkbox
                          />
                          <div className="box mr-4 flex h-5 w-5 items-center justify-center rounded border border-body-color border-opacity-20 dark:border-white dark:border-opacity-10">
                            <span className="opacity-0">
                              <svg
                                width="11"
                                height="8"
                                viewBox="0 0 11 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                                  fill="#3056D3"
                                  stroke="#3056D3"
                                  strokeWidth="0.4"
                                />
                              </svg>
                            </span>
                          </div>
                        </div>
                        Ghi nhớ cho lần đăng nhập sau
                      </label>
                    </div>
                    <div>
                      <a
                        href="#0"
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        Quên mật khẩu?
                      </a>
                    </div>
                  </div>

                  <div className="mb-6">
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark"
                      disabled={loadingLoginAPI}
                    >
                      {loadingLoginAPI ? "Đang đăng nhập..." : "Đăng nhập"}
                    </button>
                  </div>

                  {/* Google Sign-In Button */}
                  <div className="mb-6 mt-10">
                    <GoogleOAuthProvider
                      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
                    >
                      {/* Replace with your Google Client ID */}
                      <GoogleLogin
                        onSuccess={handleGoogleLoginSuccess}
                        onError={handleGoogleLoginFailure}
                        useOneTap
                        shape="pill"
                        text="signin_with"
                        theme="outline"
                        width="100%"
                      />
                    </GoogleOAuthProvider>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SigninPage;
