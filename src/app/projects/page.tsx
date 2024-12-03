"use client";

import { Suspense, useEffect, useState } from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";
import SingleProjectMini from "@/components/Projects/SingleProjectMini";
import ScrollUp from "@/components/Common/ScrollUp";
import SearchBar from "@/components/Projects/SearchBar";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading/Loading";
import useFetchProjectsByPage from "@/store/hooks/useProjectsByPage";
import MessageBox from "@/components/MessageBox";
import { getCookie } from "@/utils/cookiesHandler";
import { COOKIE_KEYS } from "@/constant/cookieKey";
import StorageUtil from "@/utils/storageUtil";
import { LOCAL_STORAGE_KEY } from "@/constant/localStorageKey";
import { User } from "@/interface";
import useCreateTransaction from "@/store/hooks/useCreateTransaction";

const Projects = () => {
  const [currentPage, setCurrentPage] = useState(0); // Zero-based current page
  const projectsPerPage = 15; // Number of projects per page
  const [searchKey, setSearchKey] = useState(""); // For search
  const router = useRouter();

  const [showLoading, setShowLoading] = useState(true); // State to handle 2-second loading
  const loadingDelay = 1000;

  const [isLoadingMsgBox, setIsLoadingMsgBox] = useState(true);
  const [isCloseMsgBox, setIsCloseMsgBox] = useState(true);
  const [message, setMessage] = useState("");
  const [projectIdSelected, setProjectIdSelected] = useState(null);

  const [qrContent, setQrContent] = useState(null);

  const isLogedIn =
    getCookie(COOKIE_KEYS.ACCESS_TOKEN) !== undefined &&
    getCookie(COOKIE_KEYS.ACCESS_TOKEN) !== null;

  // Fetch projects from the hook, pass page number and query
  const {
    data: projectsData,
    loading,
    error,
    changePageNumber,
    updateSearchString,
  } = useFetchProjectsByPage();

  const {
    data: transInfo,
    loading: loadingCreateTrans,
    error: errorCreateTrans,
    success: successCreateTrans,
    createTransaction,
  } = useCreateTransaction();

  // Effect to fetch projects when the page changes
  useEffect(() => {
    changePageNumber(currentPage); // Fetch projects based on current page
  }, [currentPage, changePageNumber]);

  // Effect to fetch projects when the search query changes
  useEffect(() => {
    setCurrentPage(0); // Reset to the first page when a new search is performed
    updateSearchString(searchKey); // Fetch projects based on the new search query, even if it's empty
  }, [searchKey, updateSearchString]);

  // Effect to handle the 2-second loading simulation when `loading` is false
  useEffect(() => {
    if (loading) {
      setShowLoading(true);
    } else {
      // Set a delay before turning off the loading spinner
      const timer = setTimeout(() => {
        setShowLoading(false);
      }, loadingDelay);

      // Clean up the timer on unmount or state change
      return () => clearTimeout(timer);
    }
  }, [loading]);
  
  useEffect(() => {
    if(successCreateTrans) {
      setIsLoadingMsgBox(false)
      setQrContent(transInfo.qrContent)
    } else if (errorCreateTrans) {
      window.alert(errorCreateTrans);
    }
  }, [loadingCreateTrans, successCreateTrans, errorCreateTrans]);

  // Render loading state
  if (showLoading) {
    return (
      <section className="pb-[120px] pt-[60px]">
        <div className="container flex h-screen items-center justify-center">
          <Loading />
        </div>
      </section>
    );
  }

  // Error handling (directly in the render phase)
  if (error) {
    if (error === "No token found") {
      window.alert(
        "Phiên người dùng đăng nhập đã hết hạn. Vui lòng đăng nhập lại!",
      );
      return router.push("signout");
    }
  }

  // Calculate total pages from the API response
  const totalPages = projectsData?.totalPages ?? 0;

  // Scroll to top of page when pagination changes
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling effect
    });
  };

  // Handle page change, adjust for zero-based index
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber - 1); // Convert to zero-based index
    scrollToTop(); // Scroll up when changing pages
  };

  const handleCloseMsgBox = () => {
    setIsCloseMsgBox(true);
  };

  const handleCreatePayment = (msg, project_id, amount) => {
    let user_id;
    if (isLogedIn) {
      const user: User = StorageUtil.get(LOCAL_STORAGE_KEY.USER);
      user_id = user.userId;
    } else {
      user_id = 0; // for guest
    }

    setIsLoadingMsgBox(true);
    createTransaction(amount, msg, project_id, user_id);
  };

  return (
    <>
      <MessageBox
        isLoading={isLoadingMsgBox}
        isClose={isCloseMsgBox}
        project_id={projectIdSelected}
        message={message}
        onClose={handleCloseMsgBox}
        onCreatePayment={handleCreatePayment}
        isGuest={!isLogedIn}
        qrContent={qrContent}
      />
      <ScrollUp />
      <Breadcrumb pageName="Các chiến dịch" description="" />

      <section className="pb-[20px] pt-[20px]">
        <div className="container">
          <Suspense fallback={<p>Đang tải thanh tìm kiếm...</p>}>
            <SearchBar
              placeholder="Tìm kiếm bằng Tên chiến dịch"
              onSearch={(query) => {
                setSearchKey(query); // Update search query
              }}
            />
          </Suspense>
        </div>
      </section>

      <section className="pb-[120px] pt-[60px]">
        <div className="container">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {!error &&
              projectsData?.list.map((project) => {
                const handleClickInfo = () => {
                  router.push(`/projects/${project.projectId}/project`);
                };

                const handleClickDonate = () => {
                  setProjectIdSelected(project.projectId);
                  setIsLoadingMsgBox(false);
                  setIsCloseMsgBox(false);
                };

                return (
                  <SingleProjectMini
                    key={project.projectId}
                    project={project}
                    onClickInfo={handleClickInfo}
                    onClickDonate={handleClickDonate}
                  />
                );
              })}

            {(!projectsData || projectsData.list.length === 0) && (
              <p>Không có chiến dịch nào như vậy!</p>
            )}
          </div>

          {/* Pagination Controls */}
          <div className="mt-8 flex justify-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage)} // Adjust for zero-based index
              disabled={currentPage === 0} // Disable when on the first page
              className="rounded bg-gray-200 px-3 py-1 text-gray-600 disabled:opacity-50"
            >
              &lt;
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)} // Show pages as one-based in UI
                className={`rounded px-3 py-1 ${i === currentPage ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"}`}
              >
                {i + 1} {/* Display page number as one-based */}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 2)} // Adjust for zero-based index
              disabled={currentPage + 1 === totalPages} // Disable when on the last page
              className="rounded bg-gray-200 px-3 py-1 text-gray-600 disabled:opacity-50"
            >
              &gt;
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
