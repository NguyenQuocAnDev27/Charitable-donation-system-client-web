'use client'; // Required for client-side rendering

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Use useParams for dynamic routes in Next.js 13+
import { getCookie } from "@/utils/cookiesHandler";
import Breadcrumb from "@/components/Common/Breadcrumb";

const UserPage = () => {
  const { user_id } = useParams(); // Get the user_id from the dynamic route

  const [userData, setUserData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
  });

  useEffect(() => {
    // Simulate fetching user details based on user_id
    if (user_id) {
      const storedUserName = getCookie("user_name");
      const storedUserEmail = getCookie("user_email");
      const storedUserPhone = getCookie("user_phone");

      setUserData({
        full_name: storedUserName || "No name found",
        email: storedUserEmail || "No email found",
        phone_number: storedUserPhone || "No phone number found",
      });
    }
  }, [user_id]);

  if (!user_id) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Breadcrumb pageName="Tài khoản của tôi" description="" />

    <section className="pb-[120px] pt-[20px] bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="mt-5">
          <p>
            <strong>Full Name: </strong> {userData.full_name}
          </p> <br/>
          <p>
            <strong>Email: </strong> {userData.email}
          </p> <br/>
          <p>
            <strong>Phone Number: </strong> {userData.phone_number}
          </p> <br/>
        </div>
      </div>
    </section>
    </>
  );
};

export default UserPage;
