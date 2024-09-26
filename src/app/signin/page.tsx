'use client'; // Required for client-side logic

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { setCookie } from "@/utils/cookiesHandler";
import { DataUser } from "./DataUser";
import { COOKIE_KEYS } from "@/constant/cookieKey";
import { User } from "@/types/user";
import Loading from "@/components/Loading/Loading";

const SigninPage = () => {
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const [loading, setLoading] = useState(false); // State for loading state
  const [rememberMe, setRememberMe] = useState(false); // State for "Remember Me" checkbox
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      // Simulate a fake fetch request that returns a User object with a jwt_token
      const user: User = await fakeFetchData(email, password);

      // Determine cookie expiration based on "Remember Me" checkbox
      const expirationDays = rememberMe ? 30 : 1; // 30 days if "Remember Me" is checked, otherwise 1 day

      // Set cookies using the constants from cookieKey.tsx
      setCookie(COOKIE_KEYS.JWT_TOKEN, user.jwt_token, expirationDays);
      setCookie(COOKIE_KEYS.USER_ID, user.user_id, expirationDays);
      setCookie(COOKIE_KEYS.USER_EMAIL, user.email, expirationDays);
      setCookie(COOKIE_KEYS.USER_NAME, user.full_name, expirationDays);
      setCookie(COOKIE_KEYS.USER_ROLE, user.role, expirationDays);

      // Redirect to the homepage after successful login
      router.push("/");
    } catch (error) {
      setErrorMessage(error as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="shadow-three mx-auto max-w-[500px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Đăng nhập
                </h3>
                <p className="mb-11 text-center text-base font-medium text-body-color">
                  Đăng nhập để sử dụng các chức năng hữu ích hơn nhé!
                </p>

                {/* Show error message if login fails */}
                {errorMessage && (
                  <div className="mb-6 text-center text-red-500">
                    {errorMessage}
                  </div>
                )}

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
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
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
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
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
                      className="shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white duration-300 hover:bg-primary/90"
                      disabled={loading}
                    >
                      {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                    </button>
                  </div>
                </form>

                <p className="text-center text-base font-medium text-body-color">
                  Bạn chưa có tài khoản?{" "}
                  <Link href="/signup" className="text-primary hover:underline">
                    Đăng kí ở đây
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-0 top-0 z-[-1]">
          <svg
            width="1440"
            height="969"
            viewBox="0 0 1440 969"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_95:1005"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1440"
              height="969"
            >
              <rect width="1440" height="969" fill="#090E34" />
            </mask>
            <g mask="url(#mask0_95:1005)">
              <path
                opacity="0.1"
                d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                fill="url(#paint0_linear_95:1005)"
              />
              <path
                opacity="0.1"
                d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                fill="url(#paint1_linear_95:1005)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_95:1005"
                x1="1178.4"
                y1="151.853"
                x2="780.959"
                y2="453.581"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_95:1005"
                x1="160.5"
                y1="220"
                x2="1099.45"
                y2="1192.04"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
    </>
  );
};

export default SigninPage;

const fakeFetchData = (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate login with DataUser for successful login
      if (email === DataUser.email && password === "password123") {
        resolve(DataUser); // This will match the User class structure
      } else {
        reject("Invalid credentials");
      }
    }, 1000);
  });
};
