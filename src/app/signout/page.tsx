'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { eraseCookie } from "@/utils/cookiesHandler";
import { COOKIE_KEYS } from "@/constant/cookieKey"; // Import COOKIE_KEYS
import Loading from "@/components/Loading/Loading";

const SignOutPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Erase user-related cookies using COOKIE_KEYS
    eraseCookie(COOKIE_KEYS.USER_NAME);
    eraseCookie(COOKIE_KEYS.USER_EMAIL);
    eraseCookie(COOKIE_KEYS.USER_ID);
    eraseCookie(COOKIE_KEYS.JWT_TOKEN);
    eraseCookie(COOKIE_KEYS.USER_ROLE);

    // Navigate to homepage after sign-out
    router.push("/signin");
  }, [router]);

  return (
    <>
      <Loading/>
    </>
  )
};

export default SignOutPage;
