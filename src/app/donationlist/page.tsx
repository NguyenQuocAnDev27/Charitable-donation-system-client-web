"use client";

import { useEffect, useState } from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";
import useSearchTransactions from "@/store/hooks/useSearchTransactions";
import Loading from "@/components/Loading/Loading";

const DonationListPage = () => {
  const [currentPage, setCurrentPage] = useState(1); // Tracks the current page
  const donationsPerPage = 20; // Number of donations per page

  // Filter state
  const [transactionId, setTransactionId] = useState("");
  const [projectId, setProjectId] = useState("");
  const [startDay, setStartDay] = useState("");
  const [endDay, setEndDay] = useState("");

  const [showLoading, setShowLoading] = useState(false); // State to handle 2-second loading
  const loadingDelay = 1000;

  // Validation state
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { data, loading, error, searchTransactions } = useSearchTransactions();

  // Fetch all transactions by default on first load
  useEffect(() => {
    searchTransactions({
      pageNumber: currentPage - 1,
      pageSize: donationsPerPage,
      transactionId: null,
      projectId: null,
      startDate: null,
      endDate: null,
    });
  }, [currentPage, donationsPerPage]);

  const validateFilters = () => {
    const validationErrors: { [key: string]: string } = {};

    if (startDay && endDay && new Date(startDay) > new Date(endDay)) {
      validationErrors.dateRange =
        "Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSearch = () => {
    if (!validateFilters()) return;

    setCurrentPage(1); // Reset to the first page when filters are applied
    searchTransactions({
      pageNumber: 0,
      pageSize: donationsPerPage,
      transactionId: transactionId || null,
      projectId: projectId || null,
      startDate: startDay || null,
      endDate: endDay || null,
    });
  };

  const handlReset = () => {
    // Clear filter values
    setTransactionId("");
    setProjectId("");
    setStartDay(""); // Optionally set to default like today's date
    setEndDay(""); // Optionally set to default like today's date
    setErrors({}); // Clear validation errors

    // Fetch all transactions with default values
    setCurrentPage(1);
    searchTransactions({
      pageNumber: 0,
      pageSize: donationsPerPage,
      transactionId: null,
      projectId: null,
      startDate: null,
      endDate: null,
    });
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const totalPages = data?.totalPages || 1;

  useEffect(() => {
    if (loading) {
      setShowLoading(true);
      setTimeout(() => {
        setShowLoading(false);
      }, loadingDelay);
    }
  }, [loading]);

  // Show loading spinner when loading state is true
  if (showLoading) {
    return (
      <>
        <Breadcrumb pageName="Danh sách các giao dịch ủng hộ" description="" />
        <section className="pb-[120px] pt-[20px]">
          <div className="container mx-auto p-4">
            <Loading />
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Breadcrumb pageName="Danh sách các giao dịch ủng hộ" description="" />
      <section className="pb-[120px] pt-[20px]">
        <div className="container mx-auto p-4">
          {/* Filter Box */}
          <div className="mb-6 rounded-md bg-gray-100 p-4 shadow-md dark:bg-gray-900">
            <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
              Tìm kiếm
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {/* Transaction ID */}
              <div>
                <label
                  htmlFor="transactionId"
                  className="block text-sm font-medium text-gray-700 dark:text-white"
                >
                  Mã giao dịch
                </label>
                <input
                  id="transactionId"
                  type="text"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  className="mt-1 w-full rounded-md border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Nhập mã giao dịch"
                />
              </div>

              {/* Project ID */}
              <div>
                <label
                  htmlFor="projectId"
                  className="block text-sm font-medium text-gray-700 dark:text-white"
                >
                  Mã chiến dịch
                </label>
                <input
                  id="projectId"
                  type="text"
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  className="mt-1 w-full rounded-md border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Nhập mã chiến dịch"
                />
              </div>

              {/* Start Date */}
              <div>
                <label
                  htmlFor="startDay"
                  className="block text-sm font-medium text-gray-700 dark:text-white"
                >
                  Ngày bắt đầu
                </label>
                <input
                  id="startDay"
                  type="date"
                  value={startDay}
                  onChange={(e) => setStartDay(e.target.value)}
                  className="mt-1 w-full rounded-md border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.dateRange && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.dateRange}
                  </p>
                )}
              </div>

              {/* End Date */}
              <div>
                <label
                  htmlFor="endDay"
                  className="block text-sm font-medium text-gray-700 dark:text-white"
                >
                  Ngày kết thúc
                </label>
                <input
                  id="endDay"
                  type="date"
                  value={endDay}
                  onChange={(e) => setEndDay(e.target.value)}
                  className="mt-1 w-full rounded-md border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Search Button */}
            <div className="mt-4 flex justify-end space-x-4">
              {/* Reset Button */}
              <button
                onClick={handlReset}
                className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              >
                Đặt lại
              </button>

              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="rounded-md bg-blue2 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Tìm kiếm
              </button>
            </div>
          </div>

          {/* Rest of the table and pagination */}
          {error && (
            <div className="text-center text-red-500">
              <p>Lỗi: {error}</p>
            </div>
          )}
          {data && (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full rounded-lg border border-black bg-white text-xs shadow-md dark:bg-black sm:text-sm md:text-sm lg:text-base">
                  <thead>
                    <tr>
                      <th className="border px-2 py-3 text-center sm:px-6">
                        Mã giao dịch
                      </th>
                      <th className="border px-2 py-3 text-center sm:px-6">
                        Người gửi
                      </th>
                      <th className="border px-2 py-3 text-center sm:px-6">
                        Thời gian giao dịch
                      </th>
                      <th className="border px-2 py-3 text-center sm:px-6">
                        Chiến dịch
                      </th>
                      <th className="border px-2 py-3 text-center sm:px-6">
                        Số tiền ủng hộ
                      </th>
                      <th className="border px-2 py-3 text-center sm:px-6">
                        Nội dung chuyển khoản
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.content?.length > 0 ? (
                      data.content.map((donation) => (
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
                            {`${donation.projectName} - Mã ${donation.projectId}` ||
                              "Không biết"}
                          </td>
                          <td className="border px-2 py-3 sm:px-6">
                            {donation.value.toLocaleString()} VND
                          </td>
                          <td className="border px-2 py-3 sm:px-6">
                            {donation.description}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
                          className="border px-2 py-3 text-center sm:px-6"
                        >
                          Không có dữ liệu
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-center space-x-2">
                <button
                  onClick={() => {
                    scrollToTop();
                    handlePageChange(currentPage - 1);
                  }}
                  disabled={currentPage === 1}
                  className="rounded bg-gray-200 px-3 py-1 text-gray-600 disabled:opacity-50"
                >
                  &lt;
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      scrollToTop();
                      handlePageChange(i + 1);
                    }}
                    className={`rounded px-3 py-1 ${
                      i + 1 === currentPage
                        ? "bg-blue2 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => {
                    scrollToTop();
                    handlePageChange(currentPage + 1);
                  }}
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
