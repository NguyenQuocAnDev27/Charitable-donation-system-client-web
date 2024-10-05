'use client';

import { Suspense, useEffect, useState } from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";
import SingleProjectMini from "@/components/Projects/SingleProjectMini";
import ScrollUp from "@/components/Common/ScrollUp";
import SearchBar from "@/components/Projects/SearchBar";
import { useFetchProjects } from "@/store/hooks"; // Import the hook
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading/Loading";

const Projects = () => {
  const [currentPage, setCurrentPage] = useState(1); // Tracks the current page
  const projectsPerPage = 20; // Number of projects per page
  const [searchQuery, setSearchQuery] = useState(""); // For search
  const router = useRouter();
  const [isCallingAPIDone, setIsLoadingAPIDone] = useState(false);

  // Fetch projects from the hook
  const { data: projectsData, loading, error, fetchProjects } = useFetchProjects(); // Use hook to fetch projects

  useEffect(() => {
    fetchProjects(); // Fetch projects when the component mounts
  }, [fetchProjects]);

  // Filter projects based on search query
  const filteredProjects = projectsData?.filter((project) => 
    project.projectName.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  // Get current projects to display based on the page
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  // Scroll to top of page when pagination changes
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scrolling effect
    });
  };

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    scrollToTop(); // Scroll up when changing pages
  };

  useEffect(() => {
    
  }, [loading, projectsData]);

  // Render loading state
  if (loading && isCallingAPIDone) {
    return (
      <>
        <Loading/>
      </>
    )
  }

  // Render error state
  if (error) {
    router.push('/error');
  }

  return (
    <>
      <ScrollUp/>
      <Breadcrumb pageName="Các chiến dịch" description="" />
      
      <section className="pb-[20px] pt-[20px]">
        <div className="container">
          <Suspense fallback={<p>Đang tải thanh tìm kiếm...</p>}>
            <SearchBar 
              placeholder="Tìm kiếm bằng Tên chiến dịch"
              onSearch={(query) => setSearchQuery(query)} // Update search query
            />
          </Suspense>
        </div>
      </section>

      <section className="pb-[120px] pt-[60px]">
        <div className="container">
          {currentProjects.length === 0 ? (
            <p>No projects found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentProjects.map((project) => (
                <SingleProjectMini key={project.projectId} project={project} />
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          <div className="mt-8 flex justify-center space-x-2">
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
                className={`px-3 py-1 rounded ${i + 1 === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
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

export default Projects;
