'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { eraseCookie } from "@/utils/cookiesHandler";
import { COOKIE_KEYS } from "@/constant/cookieKey"; // Import COOKIE_KEYS
import Loading from "@/components/Loading/Loading";
import StorageUtil from "@/utils/storageUtil";

const SignOutPage = () => {
  const router = useRouter();

  
  location.reload();
  
  useEffect(() => {
    // Erase user-related cookies using COOKIE_KEYS
    eraseCookie(COOKIE_KEYS.USER_ID);
    eraseCookie(COOKIE_KEYS.ACCESS_TOKEN);
    eraseCookie(COOKIE_KEYS.REFRESH_TOKEN);
    StorageUtil.clear();
    router.push("/signin");
  }, [router]);

  return (
    <>
      <Loading/>
    </>
  )
};

export default SignOutPage;
