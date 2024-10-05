import axios from 'axios';
import { useCallback } from 'react';
import { getCookie } from '@/utils/cookiesHandler';
import { create } from 'zustand';
import { COOKIE_KEYS } from '@/constant/cookieKey';
import { ProjectPageResponse, ResponseState } from '@/interface';

interface ProjectsPageState extends ResponseState<ProjectPageResponse> {
  numberPage: number;
  queryString: string;  // New state for the query string
  getProjectsPage: () => Promise<void>;  
  setPageNumber: (pageNumber: number) => void;  
  setQueryString: (query: string) => void;  // Function to update query string
}

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_API_URL;

const useProjectsPageStore = create<ProjectsPageState>((set, get) => ({
  data: null,       // Holds the fetched list of projects
  loading: false,   // Indicates the loading state during API call
  error: null,      // Holds any error messages from the API call
  success: null,    // Indicates whether the API call was successful
  numberPage: 0,    // Holds the current page number
  queryString: "",  // Holds the current query string for search

  // Function to set the page number
  setPageNumber: (pageNumber: number) => {
    set({ numberPage: pageNumber });
  },

  // Function to set the query string
  setQueryString: (query: string) => {
    set({ queryString: query });
  },

  getProjectsPage: async () => {
    console.log("Fetching projects started...");

    // Set loading state and reset error/success before fetching data
    set({ loading: true, error: null, success: null });

    const token = getCookie(COOKIE_KEYS.ACCESS_TOKEN);
    console.log("Access token:", token);

    try {
      const { numberPage, queryString } = get();  // Access page number and query string from store

      // Make the GET request to fetch projects with authorization header
      console.log(`Making API request to: ${BASE_URL}/api/projects/page`);
      const JSONresponse = await axios.get(`${BASE_URL}/api/projects/page`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          number: numberPage,   // Page number
          query: queryString,   // Query string
        },
      });

      const response = JSONresponse.data;
      console.log("API Response:", response);

      // Update the store with the fetched project data
      set({ data: response.data, loading: false, success: true });
      console.log("Projects fetched successfully:", response.data);
    } catch (err: any) {
      // Update the state with error information if the request fails
      console.error("Error fetching projects:", err);
      set({
        error: err.response?.data?.message || err.message,
        loading: false,
        success: false,
      });
    }
  },
}));

// Custom hook to fetch projects by page and manage state
export const useFetchProjectsByPage = () => {
  const { data, loading, error, success, getProjectsPage, setPageNumber, setQueryString } = useProjectsPageStore();

  console.log("useFetchProjectsByPage hook called.");

  const fetchProjectsByPage = useCallback(() => {
    console.log("Calling getProjectsPage...");
    getProjectsPage();  // Call API with current page number and query string from the store
  }, [getProjectsPage]);

  const changePageNumber = useCallback((pageNumber: number) => {
    console.log(`Changing page number to: ${pageNumber}`);
    setPageNumber(pageNumber);
    getProjectsPage();  // Fetch new data when page number changes
  }, [setPageNumber, getProjectsPage]);

  const updateQueryString = useCallback((query: string) => {
    console.log(`Updating query string to: ${query}`);
    setQueryString(query);  // Update query string in the store
    getProjectsPage();  // Fetch new data based on the query string
  }, [setQueryString, getProjectsPage]);

  // Return the state and the fetch functions to the component
  return { data, loading, error, success, fetchProjectsByPage, changePageNumber, updateQueryString };
};
