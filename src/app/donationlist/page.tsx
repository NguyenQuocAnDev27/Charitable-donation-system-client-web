"use client";

import { useEffect, useState } from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";
import useSearchTransactions from "@/store/hooks/useSearchTransactions";
import Loading from "@/components/Loading/Loading";

const DonationListPage = () => {
  const [currentPage, setCurrentPage] = useState(1); // Tracks the current page
  const donationsPerPage = 20; // Number of donations per page
  const [transactionId, setTransactionId] = useState(null); // Optional transactionId for filtering
  const [loadingScreen, setLoadingScreen] = useState(false);

  const { data, loading, error, searchTransactions } = useSearchTransactions(); // Fetching data from API

  // Fetch transactions when the page changes
  useEffect(() => {
    searchTransactions(currentPage - 1, donationsPerPage, transactionId); // Fetch real data from the API with pagination
  }, [currentPage, donationsPerPage, transactionId]);

  // Calculate the number of pages based on the total number of elements
  const totalPages = data?.totalPages || 1;

  // Scroll to top of page when pagination changes
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling effect
    });
  };

  // Pagination logic
  const handlePageChange = (pageNumber) => {
    setLoadingScreen(true);
    scrollToTop();
    setCurrentPage(pageNumber);
    setTimeout(() => {
      setLoadingScreen(false);
    }, 1000);
  };

  return (
    <>
      <Breadcrumb pageName="Danh sách các giao dịch ủng hộ" description="" />
      <section className="pb-[120px] pt-[20px]">
        <div className="container mx-auto p-4">
          {loadingScreen && (
            <>
              <div className="flex h-screen w-full items-center justify-center">
                <Loading />
              </div>
            </>
          )}

          {error && (
            <>
              <p>Error: {error}</p>
            </>
          )}

          {!loadingScreen && (
            <>
              <div className="w-full overflow-x-auto">
                <table className="min-w-full rounded-lg border border-black bg-white text-xs shadow-md dark:bg-black sm:text-sm md:text-sm lg:text-base">
                  <thead>
                    <tr>
                      <th className="border px-2 py-3 text-left sm:px-6">
                        Mã giao dịch
                      </th>
                      <th className="border px-2 py-3 text-left sm:px-6">
                        Người gửi
                      </th>
                      <th className="border px-2 py-3 text-left sm:px-6">
                        Thời gian giao dịch
                      </th>
                      <th className="border px-2 py-3 text-left sm:px-6">
                        Chiến dịch
                      </th>
                      <th className="border px-2 py-3 text-left sm:px-6">
                        Số tiền ủng hộ
                      </th>
                      <th className="border px-2 py-3 text-left sm:px-6">
                        Nội dung chuyển khoản
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.content?.map((donation) => (
                      <tr key={donation.id} className="border-t">
                        <td className="border px-2 py-3 sm:px-6">
                          {donation.id}
                        </td>
                        <td className="border px-2 py-3 sm:px-6">
                          {donation.donorName || "Không biết"}
                        </td>
                        <td className="border px-2 py-3 sm:px-6">
                          {new Date(donation.date).toLocaleString()}
                        </td>
                        <td className="border px-2 py-3 sm:px-6">
                          {donation.projectName || "Không biết"}
                        </td>
                        <td className="border px-2 py-3 sm:px-6">
                          {donation.value.toLocaleString()} VND
                        </td>
                        <td className="border px-2 py-3 sm:px-6">
                          {donation.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex justify-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="rounded bg-gray-200 px-3 py-1 text-gray-600 disabled:opacity-50"
                >
                  &lt;
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`rounded px-3 py-1 ${i + 1 === currentPage ? "bg-blue2 text-white" : "bg-gray-200 text-gray-600"}`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="rounded bg-gray-200 px-3 py-1 text-gray-600 disabled:opacity-50"
                >
                  &gt;
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default DonationListPage;
