'use client';

import { useEffect, useState } from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";

// Your 50 transactions from DataDonationList.tsx
import DataDonationList from './DataDonationList';

const DonationList = () => {
  const [donations, setDonations] = useState([]); // Stores the list of donations
  const [currentPage, setCurrentPage] = useState(1); // Tracks the current page
  const donationsPerPage = 20; // Number of donations per page

  const [searchQuery, setSearchQuery] = useState(""); // Search filter
  const [filters, setFilters] = useState({
    payment_method: "",
    status: "",
    start_date: "",
    end_date: ""
  });

  const [appliedFilters, setAppliedFilters] = useState(filters); // For applied filters
  const [showFilters, setShowFilters] = useState(false); // Tracks whether filters are shown or hidden

  useEffect(() => {
    setDonations(DataDonationList); // Initially load all donations from the dataset
  }, []);

  // Calculate the number of pages
  const totalPages = Math.ceil(donations.length / donationsPerPage);

  // Get current donations to display on the page
  const indexOfLastDonation = currentPage * donationsPerPage;
  const indexOfFirstDonation = indexOfLastDonation - donationsPerPage;
  const currentDonations = donations.slice(indexOfFirstDonation, indexOfLastDonation);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const applyFilters = () => {
    setAppliedFilters(filters); // Apply the filters
    setCurrentPage(1); // Reset to the first page after filtering
  };

  const resetFilters = () => {
    setFilters({
      payment_method: "",
      status: "",
      start_date: "",
      end_date: ""
    });
    setSearchQuery(""); // Clear search query
    setCurrentPage(1); // Reset to first page
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters); // Toggle the visibility of the filters
  };

  // Function to translate status
  const translateStatus = (status) => {
    switch (status) {
      case 'completed':
        return 'Hoàn thành';
      case 'processing':
        return 'Đang xử lí';
      case 'failed':
        return 'Thất bại';
      default:
        return status;
    }
  };

  const filteredDonations = donations.filter((donation) => {
    const matchesSearch = 
      donation.transaction_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donation.donor_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donation.transaction_project?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPaymentMethod = 
      appliedFilters.payment_method === "" || donation.payment_method === appliedFilters.payment_method;

    const matchesStatus = 
      appliedFilters.status === "" || donation.status === appliedFilters.status;

    // Date range filtering
    const donationDate = new Date(donation.donation_date);
    const startDate = appliedFilters.start_date ? new Date(appliedFilters.start_date) : null;
    const endDate = appliedFilters.end_date ? new Date(appliedFilters.end_date) : null;
    
    const matchesDateRange = 
      (!startDate || donationDate >= startDate) &&
      (!endDate || donationDate <= endDate);

    return matchesSearch && matchesPaymentMethod && matchesStatus && matchesDateRange;
  });

  // Update current page donations based on filtered donations
  const paginatedDonations = filteredDonations.slice(indexOfFirstDonation, indexOfLastDonation);

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
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Tìm kiếm bằng Mã giao dịch, Người gửi hoặc Tên chiến dịch"
            value={searchQuery}
            onChange={handleSearch}
            className="w-full p-2 border rounded mb-4"
          />

          {/* Show/Hide Filter Button */}
          <div className="mb-4">
            <button
              onClick={toggleFilters}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
            >
              {showFilters ? "Ẩn bộ lọc" : "Hiện bộ lọc"}
            </button>
          </div>

          {/* Filter Section - Show/Hide based on state */}
          {showFilters && (
            <div className="filter-section bg-gray-100 dark:bg-black1 p-4 rounded-lg shadow-md dark:shadow-black2 mb-6">
              <h2 className="text-lg font-semibold mb-4">Bộ lọc</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <label htmlFor="payment_method" className="block text-sm font-medium mb-2">Phương thức ủng hộ</label>
                  <select
                    name="payment_method"
                    value={filters.payment_method}
                    onChange={handleFilterChange}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Tất cả</option>
                    <option value="VNPAY">VNPAY</option>
                    <option value="Zalopay">Zalopay</option>
                    <option value="Momo">Momo</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="status" className="block text-sm font-medium mb-2">Trạng thái giao dịch</label>
                  <select
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Tất cả</option>
                    <option value="completed">Hoàn thành</option>
                    <option value="processing">Đang xử lí</option>
                    <option value="failed">Thất bại</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="start_date" className="block text-sm font-medium mb-2">Từ ngày</label>
                  <input
                    type="date"
                    name="start_date"
                    value={filters.start_date}
                    onChange={handleFilterChange}
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div>
                  <label htmlFor="end_date" className="block text-sm font-medium mb-2">Đến ngày</label>
                  <input
                    type="date"
                    name="end_date"
                    value={filters.end_date}
                    onChange={handleFilterChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>

              {/* Filter and Reset Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={applyFilters}
                  className="px-4 py-2 bg-blue2 text-white rounded hover:bg-blue2"
                >
                  Lọc
                </button>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                >
                  Làm mới
                </button>
              </div>
            </div>
          )}

          {/* Donation List Table */}
          <div className="overflow-x-auto w-full">
            <table className="min-w-full bg-white dark:bg-black border rounded-lg shadow-md text-xs sm:text-sm md:text-sm lg:text-base">
              <thead>
                <tr>
                  <th className="px-2 sm:px-6 py-3 text-left">Mã giao dịch</th>
                  <th className="px-2 sm:px-6 py-3 text-left">Số tiền</th>
                  <th className="px-2 sm:px-6 py-3 text-left">Tên người gửi</th>
                  <th className="px-2 sm:px-6 py-3 text-left">Chiến dịch</th>
                  <th className="px-2 sm:px-6 py-3 text-left">Phương thức</th>
                  <th className="px-2 sm:px-6 py-3 text-left">Ngày gửi</th>
                  <th className="px-2 sm:px-6 py-3 text-left">Tình trạng</th>
                </tr>
              </thead>
              <tbody>
                {paginatedDonations.map((donation) => (
                  <tr key={donation.donation_id} className="border-t">
                    <td className="px-2 sm:px-6 py-3">{donation.transaction_id}</td>
                    <td className="px-2 sm:px-6 py-3">{donation.amount.toLocaleString()} VND</td>
                    <td className="px-2 sm:px-6 py-3">{donation.donor_name || 'Không biết'}</td>
                    <td className="px-2 sm:px-6 py-3">{donation.transaction_project}</td>
                    <td className="px-2 sm:px-6 py-3">{donation.payment_method}</td>
                    <td className="px-2 sm:px-6 py-3">{new Date(donation.donation_date).toLocaleDateString()}</td>
                    <td className="px-2 sm:px-6 py-3">{translateStatus(donation.status)}</td>
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
