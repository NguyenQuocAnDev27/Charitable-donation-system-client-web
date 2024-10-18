'use client';

import { useEffect, useState } from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";
import useSearchTransactions from "@/store/hooks/useSearchTransactions";

const DonationList = () => {
  const [currentPage, setCurrentPage] = useState(1); // Tracks the current page
  const donationsPerPage = 20; // Number of donations per page

  const { data, loading, error, searchTransactions } = useSearchTransactions(); // Fetching data from API

  // Fetch transactions when the page changes
  useEffect(() => {
    searchTransactions(currentPage - 1, donationsPerPage); // Fetch real data from the API
  }, [currentPage, donationsPerPage]);

  if (loading) {
    return <p>Loading transactions...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Calculate the number of pages based on the total number of elements
  const totalPages = data?.totalPages || 1;

  // Scroll to top of page when pagination changes
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scrolling effect
    });
  };

  // Pagination logic
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    scrollToTop();
  };

  return (
    <>
      <Breadcrumb pageName="Danh sách các giao dịch ủng hộ" description="" />
      <section className="pb-[120px] pt-[20px]">
        <div className="container mx-auto p-4">

          {/* Donation List Table */}
          <div className="overflow-x-auto w-full">
            <table className="min-w-full bg-white dark:bg-black border border-black rounded-lg shadow-md text-xs sm:text-sm md:text-sm lg:text-base">
              <thead>
                <tr>
                  <th className="px-2 sm:px-6 py-3 text-left border">Mã giao dịch</th>
                  <th className="px-2 sm:px-6 py-3 text-left border">Người gửi</th>
                  <th className="px-2 sm:px-6 py-3 text-left border">Thời gian giao dịch</th>
                  <th className="px-2 sm:px-6 py-3 text-left border">Chiến dịch</th>
                  <th className="px-2 sm:px-6 py-3 text-left border">Số tiền ủng hộ</th>
                  <th className="px-2 sm:px-6 py-3 text-left border">Nội dung chuyển khoản</th>
                </tr>
              </thead>
              <tbody>
                {data?.content.map((donation) => (
                  <tr key={donation.id} className="border-t">
                    <td className="px-2 sm:px-6 py-3 border">{donation.id}</td>
                    <td className="px-2 sm:px-6 py-3 border">{donation.donorName || 'Không biết'}</td>
                    <td className="px-2 sm:px-6 py-3 border">{new Date(donation.date).toLocaleString()}</td>
                    <td className="px-2 sm:px-6 py-3 border">{donation.projectName || 'Không biết'}</td>
                    <td className="px-2 sm:px-6 py-3 border">{donation.value.toLocaleString()} VND</td>
                    <td className="px-2 sm:px-6 py-3 border">{donation.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="mt-4 flex justify-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 text-gray-600 rounded disabled:opacity-50"
            >
              &lt;
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 rounded ${i + 1 === currentPage ? 'bg-blue2 text-white' : 'bg-gray-200 text-gray-600'}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-200 text-gray-600 rounded disabled:opacity-50"
            >
              &gt;
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default DonationList;
