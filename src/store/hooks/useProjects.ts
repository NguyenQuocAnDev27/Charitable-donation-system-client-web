import axios from 'axios';
import { useCallback } from 'react';
import { getCookie } from '@/utils/cookiesHandler';
import { create } from 'zustand';
import { COOKIE_KEYS } from '@/constant/cookieKey';
import { Project, ResponseState } from '@/interface';

/**
 * ProjectState extends the generic ResponseState to handle
 * the state for fetching an array of Project objects.
 */
interface ProjectState extends ResponseState<Project[]> {
  /**
   * Function to fetch the list of projects from the API.
   * @returns Promise<void>
   */
  getProjects: () => Promise<void>;
}

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_API_URL;

/**
 * Zustand store to manage project state including fetching
 * projects, loading state, error handling, and success status.
 */
const useProjectStore = create<ProjectState>((set) => ({
  data: null,       // Holds the fetched list of projects
  loading: false,   // Indicates the loading state during API call
  error: null,      // Holds any error messages from the API call
  success: null,    // Indicates whether the API call was successful

  /**
   * Fetch the list of projects from the server and manage the state.
   * Uses the access token from cookies for authorization.
   */
  getProjects: async () => {
    console.log("Fetching projects started..."); // Debugging start

    // Set loading state and reset error/success before fetching data
    set({ loading: true, error: null, success: null });

    const token = getCookie(COOKIE_KEYS.ACCESS_TOKEN);

    console.log("Access token:", token); // Debugging token value

    // If no token is found, set an error and stop the fetch
    if (!token) {
      console.log("No token found, stopping request."); // Debugging no token case
      set({ error: 'No token found', loading: false, success: false });
      return;
    }

    try {
      // Make the GET request to fetch projects with authorization header
      console.log("Making API request to:", `${BASE_URL}/api/projects`); // Debugging API call
      const JSONresponse = await axios.get(`${BASE_URL}/api/projects`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const response = JSONresponse.data;
      console.log("API Response:", response); // Debugging API response data

      // Update the store with the fetched project data
      set({ data: response.data, loading: false, success: true });
      console.log("Projects fetched successfully:", response.data); // Debugging success
    } catch (err: any) {
      // Update the state with error information if the request fails
      console.error("Error fetching projects:", err); // Debugging error response
      set({
        error: err.response?.data?.message || err.message,
        loading: false,
        success: false,
      });
    }
  },
}));

/**
 * Custom hook that wraps the Zustand project store to provide
 * easy access to project data and the fetchProjects function.
 */
export const useFetchProjects = () => {
  const { data, loading, error, success, getProjects } = useProjectStore();

  console.log("useFetchProjects hook called."); // Debugging hook call

  /**
   * Fetch projects using the getProjects method from the store.
   * The useCallback ensures the function is memoized and not
   * recreated on each render unless getProjects changes.
   */
  const fetchProjects = useCallback(() => {
    console.log("Calling getProjects..."); // Debugging fetchProjects call
    getProjects();
  }, [getProjects]);

  // Log state of fetched data
  console.log("Current data:", data); // Debugging current data
  console.log("Loading state:", loading); // Debugging loading state
  console.log("Error state:", error); // Debugging error state
  console.log("Success state:", success); // Debugging success state

  // Return the state and the fetch function to the component
  return { data, loading, error, success, fetchProjects };
};
