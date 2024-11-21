"use client"; // Required for client-side rendering

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Use useParams for dynamic routes in Next.js 13+
import { getCookie } from "@/utils/cookiesHandler";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { COOKIE_KEYS } from "@/constant/cookieKey";
import { useRouter } from "next/navigation";
import useGetInfoDetail from "@/store/hooks/useGetInfoDetail";

const UserPage = () => {
  const { user_id } = useParams(); // Get the user_id from the dynamic route
  const router = useRouter();
  const access_token = getCookie(COOKIE_KEYS.ACCESS_TOKEN);
  const email = getCookie(COOKIE_KEYS.USER_EMAIL);
  const {
    data,
    loading: loadingGetInfo,
    error: errorGetInfo,
    success: successGetInfo,
    fetchInfoDetail: fetchInfo,
  } = useGetInfoDetail();

  const [userData, setUserData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
  });

  useEffect(() => {
    if (access_token) {
      fetchInfo(email);
    }
  }, []);

  useEffect(() => {
    if (user_id && access_token) {
      setUserData({
        full_name: data?.fullName || "No name found",
        email: data?.email || "No email found",
        phone_number: data?.phoneNumber || "No phone number found",
      });
    } else {
      router.push("/signin");
    }
  }, [successGetInfo]);

  if (!user_id) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Breadcrumb pageName="Tài khoản của tôi" description="" />

      <section className="bg-gray-100 pb-[120px] pt-[20px] dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="mt-5">
            <p>
              <strong>Họ tên: </strong> {userData.full_name}
            </p>{" "}
            <br />
            <p>
              <strong>Email: </strong> {userData.email}
            </p>{" "}
            <br />
            <p>
              <strong>Số điện thoại: </strong> {userData.phone_number}
            </p>{" "}
            <br />
          </div>
        </div>
      </section>
    </>
  );
};

export default UserPage;
