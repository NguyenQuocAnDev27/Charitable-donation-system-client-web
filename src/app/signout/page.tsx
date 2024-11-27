"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { eraseCookie } from "@/utils/cookiesHandler";
import { COOKIE_KEYS } from "@/constant/cookieKey";
import Loading from "@/components/Loading/Loading";
import StorageUtil from "@/utils/storageUtil";

const SignOutPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Perform sign-out logic
    eraseCookie(COOKIE_KEYS.USER_ID);
    eraseCookie(COOKIE_KEYS.USER_EMAIL);
    eraseCookie(COOKIE_KEYS.USER_NAME);
    eraseCookie(COOKIE_KEYS.ACCESS_TOKEN);
    eraseCookie(COOKIE_KEYS.REFRESH_TOKEN);

    // Clear local storage
    StorageUtil.clear();
  }, [router]);

  setTimeout(() => {
    router.push("/signin");
  }, 2000);

  return (
    <>
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full h-96 px-4 flex items-center justify-center">
              <Loading />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignOutPage;
